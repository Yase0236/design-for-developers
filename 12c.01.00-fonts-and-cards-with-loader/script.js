window.addEventListener("DOMContentLoaded", init);

function init(event) {
  const header = document.querySelector("header");
  loadUsers();
}

async function loadUsers() {
  //Mockup users generated at mockaroo.com
  //Random images from source.unsplash.com
  const response = await fetch("users.json");
  console.log("response2", response);
  const users = await response.json();

  displayUsers(users);
}

async function displayUsers(userJSON) {
  const userTemplate = document.querySelector("template").content;

  userJSON.forEach((user) => {
    const templateClone = userTemplate.cloneNode(true);

    templateClone.querySelector(".card_image").src = user.image;
    // (3) I've hidden the img element by adding a clipmask to it, the clipmask is what i'm animating
    // when the image is loaded and is being revealed
    templateClone.querySelector(".card_image").style.clipPath = "circle(0px at center)";
    templateClone.querySelector(".card_name").textContent = `${user.first_name} ${user.last_name}`;
    templateClone.querySelector(".card_slogan").textContent = user.slogan;
    templateClone.querySelector(".card_mail").innerHTML = `<a href="mailto:${user.email}" target="_blank">${user.email}</a>`;
    templateClone.querySelector(".card_title").innerHTML = `${user.title}`;

    document.querySelector("#card_container").appendChild(templateClone);
    // (4) Because I can't add animations before the cloned element is added to the DOM I have to grab
    // the last added element, lastPointer
    const card_arr = document.querySelectorAll("#card_container .card");
    const lastPointer = card_arr[card_arr.length - 1];
    // (5) I make an array of the loading dots in the c_loader element these are the dots I'll be animating
    const arrayOfLoadingDots = lastPointer.querySelector(".c_loader").querySelectorAll(".load_ball");
    // (6) Since I want to remove the animations when they're no longer needed, I put them in to an array, loadAni.

    let loadAni = [];
    // (7) I iterate over my loading dots and give each of them an animation with a delay
    arrayOfLoadingDots.forEach((ball, i) => {
      const loadani_kf = [{ opacity: 1 }, { opacity: 0 }];

      const loadani_props = {
        duration: 1000,
        iterations: Infinity,
        delay: i * 100,
      };
      // (8) as I have multiple aniamtions I add the animation objects to an array
      loadAni.push(ball.animate(loadani_kf, loadani_props));
    });
    // (9) I could just let the loading animations continue underneath the loaded  images but I intuitively do not like
    // it, and the scripts are stille running, and there by using resources, so I want to stop the animations when the
    // images are loaded, and I can add an animation revealing the image.

    // (10) So I add a load event listener on each image
    lastPointer.querySelector(".card_image").addEventListener("load", loadComplete);
    function loadComplete(evt) {
      const image = evt.target;
      // (11) The image is loaded when complete is true and to avoid any mishabs we also check that the image is really there
      const isLoaded = image.complete && image.naturalHeight !== 0;
      if (isLoaded) {
        // (12) I make a new animation to reveal the loaded image by adding a waapi with one keyframe which it will animate to,
        // see comment (3)
        const imgAni_kf = [{ clipPath: `circle( 283px at center)` }];
        const imgAni_props = {
          duration: 200,
          iterations: 1,
          fill: "forwards",
        };
        image.animate(imgAni_kf, imgAni_props);
        // (13) Then I cancel the loading animations.
        loadAni.forEach((anim) => {
          anim.cancel();
        });
        // (14) And I remove the event listener. Tidying up. (This was the last comment)
        image.removeEventListener("load", loadComplete);
      }
    }
  });
}
