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

  // Smooth scrolling for navigation links (this is a duplicate of the one at the top, can be removed or consolidated)
  // For now, keeping the original structure as much as possible and adding new logic separately.
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetElement = document.querySelector(this.getAttribute("href"));
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
        });
      }

      // Close mobile menu if a link is clicked
      if (navLinks && navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
        if (hamburger) {
          hamburger.classList.remove("active");
        }
        // Also remove the menu-open-bg class if navbar isn't scrolled
        if (navbar && !navbar.classList.contains("scrolled")) {
          navbar.classList.remove("menu-open-bg");
        }
      }
    });
  });
}); // End of original DOMContentLoaded

// Thumbnail Gallery Logic
document.addEventListener("DOMContentLoaded", () => {
  const mainImage = document.getElementById("mainMenuImage");
  const thumbnails = document.querySelectorAll(".thumbnail-image");

  if (mainImage && thumbnails.length > 0) {
    // Set the first thumbnail as active initially
    if (thumbnails[0]) {
      thumbnails[0].classList.add("active-thumbnail");
    }

    let fadeTimeout; // To manage the timeout

    thumbnails.forEach((thumbnail) => {
      thumbnail.addEventListener("click", function () {
        // Clear any existing fade timeout to prevent conflicts if user clicks rapidly
        if (fadeTimeout) {
          clearTimeout(fadeTimeout);
        }

        // If the clicked thumbnail is already active, do nothing
        if (this.classList.contains("active-thumbnail")) {
          // Optionally, you could still reset opacity if it was somehow set to 0
          // mainImage.style.opacity = 1;
          return;
        }

        mainImage.style.opacity = 0;

        const clickedThumbnail = this; // Store context of the clicked thumbnail

        fadeTimeout = setTimeout(() => {
          mainImage.src = clickedThumbnail.dataset.image;
          mainImage.alt = clickedThumbnail.alt; // Update alt text
          mainImage.style.opacity = 1;
        }, 300); // This duration should match the CSS transition time for opacity

        // Update active thumbnail state
        thumbnails.forEach((t) => t.classList.remove("active-thumbnail"));
        clickedThumbnail.classList.add("active-thumbnail");
      });
    });
  }
});
