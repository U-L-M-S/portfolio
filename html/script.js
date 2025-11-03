// Redirect visitors to language-specific entry point based on domain.
(function redirectByDomain() {
  const hostname = window.location.hostname;
  const path = window.location.pathname;
  if (path.includes("index-de.html") || path.includes("index-en.html")) {
    return;
  }
  if (hostname.endsWith(".de")) {
    window.location.replace("/index-de.html");
  } else {
    window.location.replace("/index-en.html");
  }
})();

let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");
let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

window.onscroll = () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach((links) => {
        links.classList.remove("active");
        document
          .querySelector("header nav a [href*=" + id + "]")
          .classList.add("active");
      });
    }
  });
};

menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};
