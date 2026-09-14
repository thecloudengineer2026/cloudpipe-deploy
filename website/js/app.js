"use strict";

document.documentElement.classList.add("js");

const menuButton = document.querySelector(".menu-button");
const navigationLinks = document.querySelector(".navigation-links");
const navigationAnchors = document.querySelectorAll(".navigation-links a");
const contactForm = document.querySelector("#contact-form");
const currentYear = document.querySelector("#current-year");

function closeMenu() {
  if (!menuButton || !navigationLinks) {
    return;
  }

  menuButton.setAttribute("aria-expanded", "false");
  navigationLinks.classList.remove("is-open");
  document.body.classList.remove("menu-open");
}

function toggleMenu() {
  if (!menuButton || !navigationLinks) {
    return;
  }

  const isOpen = menuButton.getAttribute("aria-expanded") === "true";

  menuButton.setAttribute("aria-expanded", String(!isOpen));
  navigationLinks.classList.toggle("is-open", !isOpen);
  document.body.classList.toggle("menu-open", !isOpen);
}

menuButton?.addEventListener("click", toggleMenu);

navigationAnchors.forEach((anchor) => {
  anchor.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
    menuButton?.focus();
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 704) {
    closeMenu();
  }
});

function setFieldError(field, message) {
  const errorElement = document.querySelector(`#${field.id}-error`);

  field.setAttribute("aria-invalid", "true");
  field.setAttribute("aria-describedby", `${field.id}-error`);

  if (errorElement) {
    errorElement.textContent = message;
  }
}

function clearFieldError(field) {
  const errorElement = document.querySelector(`#${field.id}-error`);

  field.removeAttribute("aria-invalid");
  field.removeAttribute("aria-describedby");

  if (errorElement) {
    errorElement.textContent = "";
  }
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateForm(form) {
  const name = form.elements.namedItem("name");
  const email = form.elements.namedItem("email");
  const message = form.elements.namedItem("message");
  const fields = [name, email, message];

  fields.forEach(clearFieldError);

  let firstInvalidField = null;

  if (name.value.trim().length < 2) {
    setFieldError(name, "Enter a name containing at least two characters.");
    firstInvalidField ??= name;
  }

  if (!validateEmail(email.value.trim())) {
    setFieldError(email, "Enter a valid business email address.");
    firstInvalidField ??= email;
  }

  if (message.value.trim().length < 20) {
    setFieldError(
      message,
      "Describe the requested improvement using at least 20 characters."
    );
    firstInvalidField ??= message;
  }

  if (firstInvalidField) {
    firstInvalidField.focus();
    return false;
  }

  return true;
}

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const formStatus = document.querySelector("#form-status");
  const isValid = validateForm(contactForm);

  if (!formStatus) {
    return;
  }

  if (!isValid) {
    formStatus.textContent = "";
    return;
  }

  formStatus.textContent =
    "Request validated successfully. This demonstration did not send or store your information.";
});

contactForm?.querySelectorAll("input, textarea").forEach((field) => {
  field.addEventListener("input", () => {
    clearFieldError(field);

    const formStatus = document.querySelector("#form-status");

    if (formStatus) {
      formStatus.textContent = "";
    }
  });
});

if (currentYear) {
  currentYear.textContent = String(new Date().getFullYear());
}