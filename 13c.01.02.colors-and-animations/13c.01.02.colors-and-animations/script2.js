"use strict";
import { inView, animate, scroll, stagger } from "https://cdn.skypack.dev/motion";

document.addEventListener("DOMContentLoaded", checkTheme);
/* ******************* DARK THEME *******************************/

// Change theme to dark by adding the `dark` classname to html element.
const changeThemeToDark = () => {
  document.documentElement.setAttribute("data-theme", "dark"); // set theme to dark
  localStorage.setItem("data-theme", "dark"); // save theme to local storage
};

const changeThemeToLight = () => {
  // set theme light
  document.documentElement.setAttribute("data-theme", "light");
  // save theme to local storage
  localStorage.setItem("data-theme", "light");
};

const checkbox = document.querySelector("#switch");
// Apply retrived them to the website
checkbox.addEventListener("change", () => {
  let theme = localStorage.getItem("data-theme");
  // Retrieve saved them from local storage
  if (theme === "dark") {
    changeThemeToLight();
  } else {
    changeThemeToDark();
  }
});

function checkTheme() {
  let theme = localStorage.getItem("data-theme");

  if (theme === "dark") {
    changeThemeToDark();
    console.log(document.querySelector("#switch"));
    //document.querySelector("input:checked + label");
  } else {
    changeThemeToLight();
  }
}

/* scrolling animations */
//PROGRESS BAR
scroll(animate(".progress", { scaleY: [0, 1] }));

// Selector
inView(".highlight h2", (info) => {
  console.log("highlight has enetered the view port");
  const controls = animate(info.target, { opacity: [0, 1] }, { duration: 2 }, { repeat: 0 });
});

//animate articles
inView(".article", (info) => {
  console.log("article has enetered the view port");
  const controls = animate(info.target, { opacity: [0, 1] }, { duration: 2 });
});
