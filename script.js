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
  let slideshowInterval; // Variable to store the interval ID
  let currentThumbnailIndex = 0; // To keep track of the current image in the slideshow
  let userInteracted = false; // Flag to track user interaction

  if (mainImage && thumbnails.length > 0) {
    // Set the first thumbnail as active initially
    if (thumbnails[0]) {
      thumbnails[0].classList.add("active-thumbnail");
    }

    let fadeTimeout; // To manage the timeout for manual clicks

    function showImage(index) {
      if (index < 0 || index >= thumbnails.length) return;
      const thumbnail = thumbnails[index];

      mainImage.style.opacity = 0;

      // Use a local timeout for this specific image change, separate from user click fadeTimeout
      const imageChangeTimeout = setTimeout(() => {
        mainImage.src = thumbnail.dataset.image;
        mainImage.alt = thumbnail.alt;
        mainImage.style.opacity = 1;
      }, 300); // CSS transition time

      thumbnails.forEach((t) => t.classList.remove("active-thumbnail"));
      thumbnail.classList.add("active-thumbnail");
      currentThumbnailIndex = index;
    }

    function startSlideshow() {
      if (userInteracted) return; // Don't start if user has already interacted

      slideshowInterval = setInterval(() => {
        currentThumbnailIndex = (currentThumbnailIndex + 1) % thumbnails.length;
        showImage(currentThumbnailIndex);
      }, 5000); // Change image every 5 seconds
    }

    function stopSlideshow() {
      clearInterval(slideshowInterval);
      userInteracted = true; // Set flag so slideshow doesn't restart
    }

    thumbnails.forEach((thumbnail, index) => {
      thumbnail.addEventListener("click", function () {
        stopSlideshow(); // Stop slideshow on user interaction

        // Clear any existing fade timeout from manual clicks to prevent conflicts
        if (fadeTimeout) {
          clearTimeout(fadeTimeout);
        }

        if (this.classList.contains("active-thumbnail")) {
          return;
        }

        // Show clicked image immediately (which also updates currentThumbnailIndex)
        showImage(index);
      });
    });

    startSlideshow(); // Start the slideshow initially
  }
});
