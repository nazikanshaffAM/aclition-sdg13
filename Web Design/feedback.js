
function resetStars() {
    stars.forEach(star => {
        star.classList.remove("active");
    });
}


const stars = document.querySelectorAll(".stars i");


stars.forEach((star, index1) => {
   
    star.addEventListener("click", () => {
        // Loop through the "stars" NodeList Again
        stars.forEach((star, index2) => {
            // Add the "active" class to the clicked star and any stars with a lower index
            // and remove the "active" class from any stars with a higher index
            index1 >= index2 ? star.classList.add("active") : star.classList.remove("active");
        });
    });
});

const form = document.querySelector("#feedbackForm");
const inputName = document.querySelector("#name");
const inputEmail = document.querySelector("#email");
const inputExp = document.querySelector("#exp");
const formContainer = document.querySelector(".container");
const thankYouMessage = document.querySelector("#confirmation");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("Form submitted");

    if (validateInputs()) {
        // Show confirmation dialog
        const confirmed = confirm("Are you sure you want to submit this feedback?");
        console.log("Confirmation status:", confirmed);

        if (confirmed) {
            console.log("User confirmed. Proceeding with submission.");

            // Clear the form fields first
            form.reset();

            // Clear the stars
            resetStars();

            // Construct the mailto link
            const subject = "Feedback Form Submission";
            const body = `Name: ${inputName.value}%0D%0AEmail: ${inputEmail.value}%0D%0AExperience: ${inputExp.value}`;
            const mailtoLink = `mailto:nazikanshaff5147@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

            // Open the mailto link
            window.location.href = mailtoLink;

            // Hide the form container
            formContainer.style.display = "none";

            // Display the thank you message
            thankYouMessage.style.display = "block";
        } else {
            console.log("User cancelled the submission.");
        }
    } else {
        // Scroll up to show the first unfilled required field
        const unfilledField = document.querySelector(".input-group.error");
        if (unfilledField) {
            unfilledField.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }
});

function validateInputs() {
    const nameVal = inputName.value.trim();
    const emailVal = inputEmail.value.trim();
    const expVal = inputExp.value.trim();

    let isValid = true;

    if (nameVal === "") {
        setError(inputName.parentElement, "Name is required");
        isValid = false;
    } else {
        setSuccess(inputName.parentElement);
    }

    if (emailVal === "") {
        setError(inputEmail.parentElement, "Email is required");
        isValid = false;
    } else if (!validateEmail(emailVal)) {
        setError(inputEmail.parentElement, "Please enter a valid email");
        isValid = false;
    } else {
        setSuccess(inputEmail.parentElement);
    }

    if (expVal === "") {
        setError(inputExp.parentElement, "Experience is required");
        isValid = false;
    } else {
        setSuccess(inputExp.parentElement);
    }

    return isValid;
}

function setError(inputGroup, message) {
    const errorElement = inputGroup.querySelector(".error");

    errorElement.innerText = message;
    inputGroup.classList.add("error");
    inputGroup.classList.remove("success");
}

function setSuccess(inputGroup) {
    const errorElement = inputGroup.querySelector(".error");

    errorElement.innerText = "";
    inputGroup.classList.add("success");
    inputGroup.classList.remove("error");
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Function to reset form fields and stars
// Function to clear only displayed error messages
function clearErrors() {
    // Clear error messages
    const errorElements = document.querySelectorAll(".input-group.error .error");
    errorElements.forEach(errorElement => {
        errorElement.innerText = ""; // Clear error text
    });
}

// Function to clear form fields, stars, and errors
function clearForm() {
    // Reset form fields
    form.reset();

    // Reset stars
    resetStars();

    // Clear error messages
    clearErrors();

    // Scroll to the top of the form
    form.scrollIntoView({ behavior: "smooth", block: "start" });
}

// Event listener for the "Clear" button
const clearButton = document.querySelector("button[type='reset']");
clearButton.addEventListener("click", clearForm);
