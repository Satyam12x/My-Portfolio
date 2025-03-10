// Preloader
window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");
    setTimeout(() => preloader.classList.add("hidden"), 500);
});

// Typed.js for dynamic text
var typed = new Typed(".typed", {
    strings: ["Web Developer", "Problem Solver", "Tech Student", "Cricketer"],
    typeSpeed: 50,
    backSpeed: 50,
    loop: true,
    showCursor: false,
});

// Hamburger Menu Toggle
const hamburger = document.querySelector(".hamburger");
const navContainer = document.querySelector(".nav-links"); // Select the navigation container

hamburger.addEventListener("click", () => {
    navContainer.classList.toggle("active");
    hamburger.classList.toggle("active");
});

// Select all navbar links
const navLinks = document.querySelectorAll('.nav-links a');

// Add a click event listener to each link
navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault(); // Stop the default jump-to-section behavior
        const targetId = this.getAttribute('href'); // Get the section ID (e.g., "#section1")
        const targetSection = document.querySelector(targetId); // Find the target section

        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth', // Enable smooth scrolling animation
                block: 'start'      // Align the section to the top of the viewport
            });
            // Close the mobile menu after clicking a link
            navContainer.classList.remove("active");
            hamburger.classList.remove("active");
        }
    });
});

// Project Slider Functionality for Multiple Sliders
/*const projectSliders = document.querySelectorAll(".project-slider");
projectSliders.forEach((slider) => {
  const sliderImages = slider.querySelector(".slider-images");
  const images = slider.querySelectorAll(".slider-images img");
  const prevBtn = slider.querySelector(".slider-btn.prev");
  const nextBtn = slider.querySelector(".slider-btn.next");
  let index = 0;

  function updateSlider() {
    if (sliderImages && images.length > 0) {
      sliderImages.style.transform = `translateX(-${index * 100}%)`;
    }
  }

  prevBtn.addEventListener("click", () => {
    index = index === 0 ? images.length - 1 : index - 1;
    updateSlider();
  });

  nextBtn.addEventListener("click", () => {
    index = index === images.length - 1 ? 0 : index + 1;
    updateSlider();
  });
});*/
const prevButtons = document.querySelectorAll('.slider-btn.prev');
const nextButtons = document.querySelectorAll('.slider-btn.next');
const sliders = document.querySelectorAll('.slider-images');

// Function to slide images
function slideImage(slider, direction) {
    const images = Array.from(slider.children); // Convert to array for easy manipulation
    const firstImage = images[0];
    const lastImage = images[images.length - 1];

    // For smooth transition, adjust the transform property
    if (direction === 'next') {
        // Move the first image to the last position
        slider.style.transition = 'transform 0.5s ease-in-out';
        slider.style.transform = 'translateX(-100%)'; // Move the images to the left
        setTimeout(() => {
            slider.appendChild(firstImage); // Append the first image to the end
            slider.style.transition = 'none'; // Remove transition temporarily for instant move
            slider.style.transform = 'translateX(0)'; // Reset position
        }, 500); // Wait for the transition to complete
    } else if (direction === 'prev') {
        // Move the last image to the first position
        slider.style.transition = 'transform 0.5s ease-in-out';
        slider.style.transform = 'translateX(100%)'; // Move the images to the right
        setTimeout(() => {
            slider.insertBefore(lastImage, slider.firstChild); // Insert last image at the start
            slider.style.transition = 'none'; // Remove transition temporarily for instant move
            slider.style.transform = 'translateX(0)'; // Reset position
        }, 500); // Wait for the transition to complete
    }
}

// Adding event listeners for the prev and next buttons
prevButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        const slider = sliders[index];
        slideImage(slider, 'prev');
    });
});

nextButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        const slider = sliders[index];
        slideImage(slider, 'next');
    });
});


// Modal functionality for "View Project" button
const viewProjectBtns = document.querySelectorAll(".view-project-btn");
const modal = document.getElementById("projectModal");
const modalClose = document.querySelector(".modal-close");
viewProjectBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        if (modal) modal.classList.add("show");
    });
});
modalClose.addEventListener("click", () => {
    if (modal) modal.classList.remove("show");
});

/* // Contact Modal Functionality
 const openContactModal = document.getElementById("openContactModal");
 const contactModal = document.getElementById("contactModal");
 const contactClose = document.querySelector(".contact-close");
 openContactModal.addEventListener("click", (e) => {
   e.preventDefault();
   contactModal.classList.add("show");
 });
 contactClose.addEventListener("click", () => {
   contactModal.classList.remove("show");
 });
 contactModal.addEventListener("click", (e) => {
   if (e.target === contactModal) {
     contactModal.classList.remove("show");
   }
 });

 // Back to Top Button Functionality
 const backToTopBtn = document.getElementById("backToTop");
 window.addEventListener("scroll", () => {
   if (window.scrollY > 300) {
     backToTopBtn.style.display = "block";
   } else {
     backToTopBtn.style.display = "none";
   }
 });
 backToTopBtn.addEventListener("click", () => {
   window.scrollTo({ top: 0, behavior: "smooth" });
 });*/

// Skills Circular Progress Animation
const skillCards = document.querySelectorAll(".skill-card");
const circumference = 2 * Math.PI * 45; // Assuming a radius of 45 for the circle

if ("IntersectionObserver" in window) {
    const skillObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const circle = entry.target.querySelector(".circle-progress");
                    const progress = circle.getAttribute("data-progress");
                    const dashArray = (progress / 100) * circumference;
                    circle.style.strokeDasharray = `${dashArray} 283`;
                    skillObserver.unobserve(entry.target); // Stop observing once animated
                }
            });
        },
        { threshold: 0.5 } // Trigger when 50% of the skill card is visible
    );

    skillCards.forEach((card) => skillObserver.observe(card));
} else {
    // Fallback for browsers without IntersectionObserver support
    const progressCircles = document.querySelectorAll(".circle-progress");
    progressCircles.forEach((circle) => {
        const progress = circle.getAttribute("data-progress");
        const dashArray = (progress / 100) * circumference;
        circle.style.strokeDasharray = `${dashArray} 283`;
    });
}

// Scroll Reveal Animation for Sections
const scrollReveals = document.querySelectorAll(".scroll-reveal");
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.2 }
);
scrollReveals.forEach((el) => observer.observe(el));

// Glow Effect for Timeline Items
const timelineItems = document.querySelectorAll(".timeline-item");
const timelineObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("glow");
            } else {
                entry.target.classList.remove("glow");
            }
        });
    },
    { threshold: 0.5 }
);
timelineItems.forEach((item) => timelineObserver.observe(item));

// Interactive Story Decor with Popup
const floatingIcons = document.querySelectorAll(".floating-icon");
const iconDescPopup = document.querySelector(".icon-desc-popup");
const popupText = document.querySelector(".popup-text");
const popupClose = document.querySelector(".popup-close");
floatingIcons.forEach((icon) => {
    icon.addEventListener("click", (e) => {
        e.stopPropagation();
        const desc = icon.getAttribute("data-desc");
        popupText.textContent = desc;
        iconDescPopup.classList.add("active");
    });
});
popupClose.addEventListener("click", () => {
    iconDescPopup.classList.remove("active");
});
document.addEventListener("click", (e) => {
    if (!iconDescPopup.contains(e.target) && !e.target.classList.contains("floating-icon")) {
        iconDescPopup.classList.remove("active");
    }
});

// Timeline Hover Sync
timelineItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
        const decorType = item.getAttribute("data-decor");
        const relatedIcon = document.querySelector(`.floating-icon[data-type="${decorType}"]`);
        if (relatedIcon) {
            relatedIcon.style.transform = "scale(1.5)";
            relatedIcon.style.opacity = "1";
            relatedIcon.style.boxShadow = "0 0 20px rgba(107, 107, 255, 1)";
        }
    });
    item.addEventListener("mouseleave", () => {
        const decorType = item.getAttribute("data-decor");
        const relatedIcon = document.querySelector(`.floating-icon[data-type="${decorType}"]`);
        if (relatedIcon) {
            relatedIcon.style.transform = "scale(1)";
            relatedIcon.style.opacity = "0.8";
            relatedIcon.style.boxShadow = "none";
        }
    });
});