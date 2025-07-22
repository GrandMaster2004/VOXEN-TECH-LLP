// Function to load the navigation bar
async function loadNavbar() {
    try {
        const response = await fetch('./components/navbar.html');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const html = await response.text();
        const navbarPlaceholder = document.getElementById('navbar-placeholder');
        if (navbarPlaceholder) {
            navbarPlaceholder.innerHTML = html;
            // Initialize mobile menu functionality after loading
            initializeMobileMenu();
        } else {
            console.error('Navbar placeholder not found');
        }
    } catch (error) {
        console.error('Error loading navigation:', error);
        // Fallback content in case of error
        const navbarPlaceholder = document.getElementById('navbar-placeholder');
        if (navbarPlaceholder) {
            navbarPlaceholder.innerHTML = `
                <header class="header">
                    <div class="nav-container">
                        <div class="logo-section">
                            <div class="logo-icon">
                                <img src="./assets/images/logos/logo.svg" alt="Voxen Tech Logo">
                            </div>
                            <div class="logo-text">VOXEN TECH LLP</div>
                        </div>
                        <nav class="nav-menu" id="navMenu">
                            <a href="#" class="nav-item active">Home</a>
                            <a href="#" class="nav-item">About</a>
                            <a href="#" class="nav-item">Services</a>
                            <a href="#" class="nav-item">Portfolio</a>
                            <a href="#" class="nav-item">Blog</a>
                            <a href="#" class="contact-btn">Contact Us</a>
                        </nav>
                        <button class="mobile-menu-btn" id="mobileMenuBtn">☰</button>
                    </div>
                </header>
            `;
            initializeMobileMenu();
        }
    }
}

// Function to initialize mobile menu
function initializeMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileMenuBtn.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                navMenu.classList.remove('active');
                mobileMenuBtn.textContent = '☰';
            }
        });

        // Close menu when clicking on nav items
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileMenuBtn.textContent = '☰';
            });
        });
    }
}

// Load the navigation when the DOM is ready
document.addEventListener('DOMContentLoaded', loadNavbar); 