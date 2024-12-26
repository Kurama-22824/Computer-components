// Funcție pentru a verifica dacă utilizatorul este logat
function checkAuthStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const username = localStorage.getItem('username');

    if (isLoggedIn === 'true') {
        // Ascundem butoanele de Înregistrare și Logare
        document.getElementById('auth-buttons').style.display = 'none';

        // Afișăm butonul Account
        document.getElementById('account-menu').style.display = 'flex';
        document.getElementById('account-data').textContent = username || 'Account';
    } else {
        // Afișăm butoanele de Înregistrare și Logare
        document.getElementById('auth-buttons').style.display = 'flex';

        // Ascundem butonul Account
        document.getElementById('account-menu').style.display = 'none';
    }
}

// Simulăm funcția de logare
function login() {
    const username = prompt('Introdu username-ul tău:');
    if (username) {
        // Salvăm starea utilizatorului în localStorage
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', username);

        // Actualizăm interfața
        checkAuthStatus();
        alert(`Bun venit, ${username}!`);
    }
}

// Simulăm funcția de deconectare
function logout() {
    // Resetăm starea utilizatorului
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');

    // Actualizăm interfața
    checkAuthStatus();
    alert('Te-ai deconectat cu succes!');
}

// Funcție pentru a deschide meniul contului (opțional)
function toggleAccountMenu() {
    const dropdown = document.getElementById('account-dropdown');
    const isVisible = dropdown.style.display === 'block';

    if (isVisible) {
        dropdown.style.display = 'none';
    } else {
        dropdown.style.display = 'block';
        document.addEventListener('click', closeDropdownOnClickOutside);
    }
}

function closeDropdownOnClickOutside(event) {
    const dropdown = document.getElementById('account-dropdown');
    const accountButton = document.getElementById('account-btn');

    // Verificăm dacă clicul a fost în afara dropdown-ului și a butonului Account
    if (!dropdown.contains(event.target) && !accountButton.contains(event.target)) {
        dropdown.style.display = 'none';
        document.removeEventListener('click', closeDropdownOnClickOutside);
    }
}

// Apelăm funcția de verificare a stării la încărcarea paginii
checkAuthStatus();

document.getElementById("register-btn").addEventListener("click", () => {
    // Verificăm dacă formularul a fost deja încărcat
    if (!document.getElementById("register-modal")) {
        // Încărcăm fișierul HTML al formularului
        fetch('register-form.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to load register-form.html");
                }
                return response.text();
            })
            .then(html => {
                // Adăugăm formularul în body
                const modalContainer = document.createElement('div');
                modalContainer.innerHTML = html;
                document.body.appendChild(modalContainer);

                // Legăm evenimentul de închidere
                document.getElementById("close-modal").addEventListener("click", () => {
                    document.getElementById("register-modal").classList.add("hidden");
                });

                // Afișăm formularul
                document.getElementById("register-modal").classList.remove("hidden");
            })
            .catch(error => console.error(error));
    } else {
        // Dacă formularul a fost deja încărcat, doar îl afișăm
        document.getElementById("register-modal").classList.remove("hidden");
    }
});

// document.getElementById("register-form").addEventListener("submit", function (event) {
//     event.preventDefault(); // Previne reîncărcarea paginii

//     // Preia datele din formular
//     const nickname = document.getElementById("nickname").value;
//     const password = document.getElementById("password").value;
//     const confirmPassword = document.getElementById("confirm-password").value;
//     const email = document.getElementById("email").value;
//     const phone = document.getElementById("phone").value;

//     // Validează datele pe client
//     if (password !== confirmPassword) {
//         alert("Passwords do not match!");
//         return;
//     }

//     if (!/^\d{9}$/.test(phone)) {
//         alert("Phone number must be 9 digits!");
//         return;
//     }

//     // Creează un obiect cu datele utilizatorului
//     const userData = { nickname, password, role: "user", email, phone };

//     // Permite utilizatorului să selecteze un fișier existent dintr-un director
//     const fileInput = document.getElementById("fileInput");
//     const file = fileInput.files[0];

//     if (!file) {
//         alert("Please select a file to update.");
//         return;
//     }

//     const reader = new FileReader();
//     reader.onload = function (event) {
//         let existingData = [];
//         try {
//             existingData = JSON.parse(event.target.result); // Parsează fișierul JSON încărcat
//         } catch (e) {
//             console.log("No existing data or invalid JSON format.");
//         }

//         // Adaugă datele utilizatorului
//         existingData.push(userData);

//         // Crează fișierul JSON actualizat
//         const jsonBlob = new Blob([JSON.stringify(existingData, null, 2)], { type: "application/json" });

//         // Crează un link pentru descărcarea fișierului JSON actualizat
//         const link = document.createElement("a");
//         link.href = URL.createObjectURL(jsonBlob);
//         link.download = file.name; // Păstrează același nume de fișier
//         link.click();
//     };

//     // Citește fișierul selectat
//     reader.readAsText(file);
// });


