document.addEventListener("DOMContentLoaded", () => {
  // CONTACT FORM JS
  const myForm = document.getElementById("form");

  myForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const nameError = document.querySelector(".name-error");
    const emailError = document.querySelector(".email-error");
    const messageError = document.querySelector(".message-error");

    // Clear previous error messages
    nameError.textContent = "";
    emailError.textContent = "";
    messageError.textContent = "";

    const formData = new FormData(this);
    const username = formData.get("name").trim();
    const email = formData.get("email").trim();
    const message = formData.get("message").trim();

    let hasError = false;

    if (username === "") {
      nameError.textContent = "Name is required.";
      hasError = true;
    } else if (username.length < 3 || username.length > 20) {
      nameError.textContent = "Username must be between 3 and 20 characters.";
      hasError = true;
    }

    if (email === "") {
      emailError.textContent = "Email is required.";
      hasError = true;
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
    ) {
      emailError.textContent = "Please enter a valid email address.";
      hasError = true;
    }

    if (message === "") {
      messageError.textContent = "Message is required.";
      hasError = true;
    } else if (message.length < 5) {
      messageError.textContent = "Message must be at least 5 characters.";
      hasError = true;
    }

    if (hasError) return;

    alert(
      `Thank you! Your data has been submitted.\n\nName: ${username}\nEmail: ${email}\nMessage: ${message}`
    );
  });

  // HEADER JS
  const navLinks = document.getElementById("nav-links");
  const openMenu = document.getElementById("openMenu");
  const closeMenu = document.getElementById("closeMenu");
  const header = document.getElementById("header");

  // open the navigation menu
  function openNav() {
    navLinks.classList.add("expanded"); // Expand nav menu
    navLinks.classList.remove("collapsed"); // Remove collapsed state
    openMenu.classList.add("hidden"); // Hide open menu icon
    closeMenu.classList.remove("hidden"); // Show close menu icon
    document.body.style.overflowY = "hidden"; // Disable scrolling
  }

  // close the navigation menu
  function closeNav() {
    navLinks.classList.remove("expanded"); // Remove expanded state
    navLinks.classList.add("collapsed"); // Collapse nav menu
    openMenu.classList.remove("hidden"); // Show open menu icon
    closeMenu.classList.add("hidden"); // Hide close menu icon
    document.body.style.overflowY = "scroll"; // Re-enable scrolling
  }

  // Add click event listeners for opening and closing the menu
  openMenu.addEventListener("click", openNav);
  closeMenu.addEventListener("click", closeNav);

  const links = navLinks.querySelectorAll("a");
  links.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        closeNav();
      }
    });
  });

  if (window.innerWidth > 768) {
    navLinks.classList.remove("collapsed", "expanded");
    navLinks.style.display = "flex";
    openMenu.classList.add("hidden");
    closeMenu.classList.add("hidden");
  } else {
    // Detect clicks outside the header
    document.addEventListener("click", function (event) {
      if (header && !header.contains(event.target)) {
        closeNav();
      }
    });
    // For smaller screenss
    navLinks.classList.add("collapsed");
    navLinks.classList.remove("expanded");
    openMenu.classList.remove("hidden");
    closeMenu.classList.add("hidden");
  }

  //   Slider JS
  const sliderTrack = document.getElementById("slider-track");
  const slideLeft = document.getElementById("slide-left");
  const slideRight = document.getElementById("slide-right");

  let currentIndex = 0;
  let itemsToShow = 3;
  const totalItems = sliderTrack.children.length;

  // slider responsiveness from js side
  let screenSize = window.innerWidth;

  if (screenSize <= 768) {
    itemsToShow = 2;
  }
  if (screenSize <= 500) {
    itemsToShow = 1;
  }

  slideRight.addEventListener("click", () => {
    if (currentIndex < totalItems - itemsToShow) {
      // updating Index
      currentIndex++;
      updateSlider();
    }
  });

  slideLeft.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateSlider();
    }
  });

  // check the left and right button access to perform the action ( disable or not )
  function checkCurrentIndex() {
    slideLeft.classList.toggle("disable", currentIndex === 0);
    slideRight.classList.toggle(
      "disable",
      currentIndex === totalItems - itemsToShow
    );
  }
  checkCurrentIndex();

  function updateSlider() {
    checkCurrentIndex();
    const slideWidth = sliderTrack.children[0].offsetWidth; //extract the slider width
    sliderTrack.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
  }

  //   Gallery JS
  const buttons = document.querySelectorAll(".filter-btn-group button");
  const items = document.querySelectorAll(
    ".gallery-posts-wrapper .gallery-image-wrapper"
  );

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      const selectedCategory = button.dataset.category;

      items.forEach((card) => {
        const cardCategory = card.dataset.category;

        if (selectedCategory === "all" || cardCategory === selectedCategory) {
          card.classList.remove("hidden");
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });

  //   FAQ JS
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const btn = item.querySelector(".faq-question");

    btn.addEventListener("click", () => {
      //TODO Auto Hide the open answer when click on other or itself
      //   faqItems.forEach((i) => {
      //     if (i !== item) {
      //       i.classList.remove("active");
      //       i.querySelector(".icon").textContent = "+";
      //     }
      //   });

      item.classList.toggle("active");
    });
  });
});
