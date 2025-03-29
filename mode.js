function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closebtn = document.querySelectorAll(".content .close");
const closePopupbtn = document.getElementById("closePopup");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
closebtn.forEach((btn) => btn.addEventListener("click", closeModal));
closePopupbtn.addEventListener("click", closeModal);

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}
function closeModal() {
  modalbg.style.display = "none";
}
function validate(event) {
  event.preventDefault();//prevents default from submission
  let isValid = true;

  // Get form elements
  const firstName = document.getElementById("first");
  const lastName = document.getElementById("last");
  const email = document.getElementById("email");
  const birthdate = document.getElementById("birthdate");
  const quantity = document.getElementById("quantity");
  const terms = document.getElementById("terms");
  const location = document.querySelector("input[name='location']:checked");
  const popupcontent = document.getElementById("popup-content");
  const closePopup = document.getElementById("closePopup");

  // Validation messages
  function showError(input, message) {
    let error = input.nextElementSibling;
    if (!error || !error.classList.contains("error-message")) {
      error = document.createElement("div");
      error.classList.add("error-message");
      //Add error message styles directly
      error.style.color = "red";
      error.style.backgroundColor = "#ffe6e6";
      error.style.fontSize = "16px";
      const parent = input.parentNode;
      parent.appendChild(error);
    }
    error.textContent = message;
  //Add red border to the input field 
  input.classList.add("error-border");
    isValid = false;
  }

  function clearError(input) {
    let error = input.nextElementSibling;
    if (error && error.classList.contains("error-message")) {
      error.remove();
    }
  //Remove error border color
  input.classList.remove("error-border");
    input.style.borderColor = "";
  }
  // Validate First Name
  if (firstName.value.trim().length < 2) {
    showError(firstName, "Veuillez entrer 2 caractères ou plus pour le champ du prénom.");
  } else {
    clearError(firstName);
  }

  // Validate Last Name
  if (lastName.value.trim().length < 2) {
    showError(lastName, "Veuillez entrer 2 caractères ou plus pour le champ du nom.");
  } else {
    clearError(lastName);
  }


  // Validate Email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  console.log(!emailPattern.test(email.value))
  if (!emailPattern.test(email.value)) {
    showError(email, "Veuillez entrer une adresse e-mail valide.");
  } else {
    clearError(email);
  }

  // Validate Birthdate
  if (!birthdate.value) {
    showError(birthdate, "Vous devez entrer votre date de naissance.");
  } else {
    clearError(birthdate);
  }

  // Validate Quantity (must be a number)
  if (isNaN(quantity.value) || quantity.value === "") {
    showError(quantity, "Veuillez entrer un nombre valide.");
  } else {
    clearError(quantity);
  }

  // Validate Radio Selection (Location)
  if (!location) {
    showError(quantity, "Vous devez choisir une option.");
  }

  // Validate Terms and Conditions
  if (!terms.checked) {
    showError(terms, "Vous devez vérifier que vous acceptez les termes et conditions.");
  } else {
    clearError(terms);
  }

  // If all validations pass
  if (isValid) {
    document.getElementById("popup-content").style.display = "block";
    document.querySelector(".modal-body").style.display = "none";

  }

  return isValid; // Prevents form submission if false
}

