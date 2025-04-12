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
  event.preventDefault();//empêche la soumission par défaut
  let isValid = true;

  // Get form elements
  const firstName = document.getElementById("first");
  const lastName = document.getElementById("last");
  const email = document.getElementById("email");
  const birthdate = document.getElementById("birthdate");
  const quantity = document.getElementById("quantity");
  const locations = document.querySelectorAll('input[name="location"]');
const locationContainer = document.getElementById("location-container");
  const terms = document.getElementById("terms");
  const termsContainer= document.getElementById("terms-container");
  const popupcontent = document.getElementById("popup-content");
  const closePopup = document.getElementById("closePopup");

  // Validation messages
  function showError(input, message) {
    let error = input.nextElementSibling;
    if (!error || !error.classList.contains("error-message")) {
      error = document.createElement("div");
      error.classList.add("error-message");
      const parent = input.parentNode;
      parent.appendChild(error);
    }
    error.textContent = message;
  //Ajouter une bordure rouge au champ de saisie
  input.classList.add("error-border");
    isValid = false;
  }

  function clearError(input) {
    let error = input.nextElementSibling;
    if (error && error.classList.contains("error-message")) {
      error.remove();
    }
  //Supprimer la couleur de la bordure d'erreur
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

 // Validate Quantity (must be a number between 0 and 99)
if (
  quantity.value.trim() === "" ||
  isNaN(quantity.value) ||
  quantity.value < 0 ||
  quantity.value > 99
) {
  showError(quantity, "Veuillez entrer un nombre entre 0 et 99.");
  isValid = false;
} else {
  clearError(quantity);
}


  // Validate Radio Selection (Location)
  
  const oneChecked = Array.from(locations).some(radio => radio.checked);
  
  if (!oneChecked) {
    let error = locationContainer.querySelector(".error-message");
    if (!error) {
      error = document.createElement("div");
      error.classList.add("error-message");
      locationContainer.appendChild(error);
    }
    error.textContent = "Veuillez sélectionner un lieu.";
    isValid = false;
  } else {
    const error = locationContainer.querySelector(".error-message");
    if (error) error.remove();
  }
  
  // Validate Terms and Conditions 
  if (!terms.checked) {
    let error = termsContainer.querySelector(".error-message");
    if (!error) {
      error = document.createElement("div");
      error.classList.add("error-message");
      // Insert it right after the label
      const label = termsContainer.querySelector("label");
      label.insertAdjacentElement("afterend", error);
    }
    error.textContent = "Vous devez accepter les conditions.";
    isValid = false;
  } else {
    const error = termsContainer.querySelector(".error-message");
    if (error) error.remove();
  }
  
  

  // If all validations pass
  if (isValid) {
    document.getElementById("popup-content").style.display = "block";
    document.querySelector(".modal-body").style.display = "none";

  }

  return isValid; // Empêche la soumission du formulaire si la valeur est fausse
}

