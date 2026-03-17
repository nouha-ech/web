document.addEventListener('DOMContentLoaded', function() {
    const dateInput = document.getElementById('dateNaissance');
    const ageMessage = document.getElementById('ageMessage');
    const bioInput = document.getElementById('biographie');
    const charCount = document.getElementById('charCount');
    const passInput = document.getElementById('password');
    const confirmInput = document.getElementById('confirmPassword');
    const passError = document.getElementById('passwordError');
    const form = document.querySelector('form');

    const today = new Date();
    const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    dateInput.max = maxDate.toISOString().split('T')[0];

    dateInput.addEventListener('change', function() {
        if (this.value) {
            const birthYear = new Date(this.value).getFullYear();
            const age = today.getFullYear() - birthYear;
            if (age < 18) {
                ageMessage.textContent = "Vous devez avoir au moins 18 ans.";
                ageMessage.style.color = "#ef5350";
                this.setCustomValidity("Âge insuffisant");
            } else {
                ageMessage.textContent = "Âge validé (" + age + " ans).";
                ageMessage.style.color = "#66bb6a";
                this.setCustomValidity("");
            }
        }
    });

    if (bioInput) {
        bioInput.addEventListener('input', function() {
            charCount.textContent = this.value.length;
        });
    }

    if (confirmInput) {
        confirmInput.addEventListener('input', function() {
            if (passInput.value !== confirmInput.value) {
                passError.textContent = "Les mots de passe ne correspondent pas.";
                confirmInput.setCustomValidity("Mots de passe différents");
            } else {
                passError.textContent = "";
                confirmInput.setCustomValidity("");
            }
        });
        
        passInput.addEventListener('input', function() {
            if (confirmInput.value && passInput.value !== confirmInput.value) {
                passError.textContent = "Les mots de passe ne correspondent pas.";
                confirmInput.setCustomValidity("Mots de passe différents");
            } else {
                passError.textContent = "";
                confirmInput.setCustomValidity("");
            }
        });
    }
});