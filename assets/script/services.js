document.addEventListener('DOMContentLoaded', function() {
    // --- Dynamic Navbar Loading Logic ---
    const navbarPlaceholder = document.getElementById('navbar-placeholder');

if (navbarPlaceholder) {
  fetch('./Components/Navbar.html')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.text();
    })
    .then(html => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      // 1. Append styles from navbar.html to document.head
      doc.querySelectorAll('style').forEach(styleTag => {
        const newStyle = document.createElement('style');
        newStyle.textContent = styleTag.textContent;
        document.head.appendChild(newStyle);
      });

      // 2. Inject HTML content (without script/style tags)
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = html;
      tempDiv.querySelectorAll('style, script').forEach(el => el.remove());
      navbarPlaceholder.innerHTML = tempDiv.innerHTML;

      // 3. Inject external/internal scripts from navbar.html
      doc.querySelectorAll('script').forEach(scriptTag => {
        const newScript = document.createElement('script');
        if (scriptTag.src) {
          newScript.src = scriptTag.src;
          // Optionally add async=false to maintain order
          newScript.async = false;
        } else {
          newScript.textContent = scriptTag.textContent;
        }
        document.body.appendChild(newScript);
      });

      // 4. Now call the setup function to add event listeners & active link
      setupNavbar();
    })
    .catch(error => {
      console.error('Error loading navbar:', error);
      navbarPlaceholder.innerHTML = '<p style="color: red;">Error loading navigation.</p>';
    });
}

function setupNavbar() {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  const body = document.body;

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("active");
      body.classList.toggle("mobile-menu-open");
      const svg = mobileMenuBtn.querySelector("svg");
      svg.innerHTML = mobileMenu.classList.contains("active")
        ? '<path d="M6 18L18 6M6 6l12 12"></path>'
        : '<path d="M4 6h16M4 12h16M4 18h16"></path>';
    });
  }

  document.querySelectorAll(".mobile-nav-links a, .mobile-contact-btn").forEach(link => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("active");
      body.classList.remove("mobile-menu-open");
      if (mobileMenuBtn) {
        mobileMenuBtn.querySelector("svg").innerHTML =
          '<path d="M4 6h16M4 12h16M4 18h16"></path>';
      }
    });
  });

  const currentPath = window.location.pathname.split("/").pop() || "home.html";

  const navLinks = document.querySelectorAll(
    ".nav-links a, .contact-button-navbar, .mobile-nav-links a, .mobile-contact-btn"
  );

  navLinks.forEach(link => {
    const linkPath = link.getAttribute("href").split("/").pop();
    if (linkPath === currentPath) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

        const heroContentWrapper = document.querySelector('.hero-content-inner-wrapper');
    if (heroContentWrapper) {
        // Add a small delay to ensure CSS is fully rendered before animation starts
        // This makes the 'from left' effect more noticeable.
        setTimeout(() => {
            heroContentWrapper.classList.add('loaded');
        }, 100); // 100ms delay
    }
      const visionSection = document.querySelector('.vision-section');

    if (visionSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !visionSection.classList.contains('revealed')) {
                    visionSection.classList.add('revealed');
                    observer.unobserve(visionSection);
                }
            });
        }, { threshold: 0.3 });

        observer.observe(visionSection);
    }
});

 document.addEventListener('DOMContentLoaded', function() {
        fetch('./Components/footer.html') // Path to your footer.html file
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.text();
            })
            .then(html => {
                // Create a temporary div to parse the HTML content
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = html;

                // Extract the footer element (assuming it's a <footer> tag)
                const footerElement = tempDiv.querySelector('footer');
                if (footerElement) {
                    document.getElementById('footer-placeholder').appendChild(footerElement);
                } else {
                    console.error("Footer element not found in footer.html");
                }

                // Extract and apply the internal CSS
                const styleElement = tempDiv.querySelector('style');
                if (styleElement) {
                    document.head.appendChild(styleElement);
                } else {
                     console.warn("No style tag found in footer.html. Ensure footer CSS is properly linked or embedded.");
                }

                // Execute any scripts within the footer.html if necessary
                // Note: Scripts loaded via innerHTML do not execute automatically.
                // If your footer.html has scripts that *must* run, you need to manually execute them.
                // For the current footer, the JS is just a console log, so this might not be strictly needed.
                // But if you had complex JS logic, you'd iterate and append script elements like so:
                tempDiv.querySelectorAll('script').forEach(script => {
                    const newScript = document.createElement('script');
                    Array.from(script.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
                    newScript.textContent = script.textContent;
                    document.body.appendChild(newScript);
                });

                console.log("Footer loaded successfully via JavaScript.");
            })
            .catch(error => console.error('Error loading footer:', error));
    });
    document.querySelectorAll('.card-item').forEach(card => {
    card.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        // Collapse others
        document.querySelectorAll('.card-item').forEach(other => {
          if (other !== card) other.classList.remove('active-card');
        });
        card.classList.toggle('active-card');
      }
    });
  });