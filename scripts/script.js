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
  const username = document.getElementById("nickname").value;
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
    fetch('formular/register-form.html')
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
        document.getElementById("close-register-modal").addEventListener("click", () => {
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

document.getElementById("login-btn").addEventListener("click", () => {
  // Verificăm dacă formularul a fost deja încărcat
  if (!document.getElementById("login-modal")) {
    // Încărcăm fișierul HTML al formularului
    fetch('formular/login-form.html')
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to load login-form.html");
        }
        return response.text();
      })
      .then(html => {
        // Adăugăm formularul în body
        const modalContainer = document.createElement('div');
        modalContainer.innerHTML = html;
        document.body.appendChild(modalContainer);

        // Legăm evenimentul de închidere
        document.getElementById("close-login-modal").addEventListener("click", () => {
          document.getElementById("login-modal").classList.add("hidden");
        });

        // Afișăm formularul
        document.getElementById("login-modal").classList.remove("hidden");
      })
      .catch(error => console.error(error));
  } else {
    // Dacă formularul a fost deja încărcat, doar îl afișăm
    document.getElementById("login-modal").classList.remove("hidden");
  }
});
