console.log("Perfekt Deli script loaded.");

// Basic smooth scroll for navigation links
document.querySelectorAll('nav a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});

window.addEventListener("scroll", function () {
  const navbar = document.getElementById("navbar");
  const navLinks = document.querySelector(".nav-links"); // Ensure navLinks is accessible

  if (window.scrollY > 50) {
    // Adjust 50 to when you want the background to appear
    navbar.classList.add("scrolled");
    navbar.classList.remove("menu-open-bg"); // Remove menu-specific bg when scrolled
  } else {
    navbar.classList.remove("scrolled");
    // If menu is active and we are at the top, re-apply menu-open-bg
    if (navLinks && navLinks.classList.contains("active")) {
      navbar.classList.add("menu-open-bg");
    }
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger-menu-button");
  const navLinks = document.querySelector(".nav-links");
  const navbar = document.getElementById("navbar"); // Get the navbar element

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      hamburger.classList.toggle("active");

      // Add/remove background class to navbar if not scrolled
      if (!navbar.classList.contains("scrolled")) {
        navbar.classList.toggle("menu-open-bg");
      }
    });
  }

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });

      // Close mobile menu if a link is clicked
      if (navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
        hamburger.classList.remove("active");
        // Also remove the menu-open-bg class if navbar isn't scrolled
        if (!navbar.classList.contains("scrolled")) {
          navbar.classList.remove("menu-open-bg");
        }
      }
    });
  });
});
