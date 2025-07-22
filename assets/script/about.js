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


    // --- Hero Banner Slideshow JavaScript (This part remains unchanged) ---
    let currentSlide = 0;
    const slides = document.querySelectorAll('.banner-slide');
        
    function showSlide(n) {
        if (slides.length === 0) return;
        slides.forEach(slide => slide.classList.remove('active'));
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    if (slides.length > 0) {
        setInterval(nextSlide, 5000); // Change slide every 5 seconds
        showSlide(currentSlide); // Show the first slide initially
    }
});

  // --- About Us Section Hover Effect (Desktop Only) ---
    const aboutUsContentArea = document.querySelector('.about-us-content-area');

    if (aboutUsContentArea) {
        function handleHoverEffect() {
            if (window.innerWidth > 768) {
                aboutUsContentArea.addEventListener('mouseenter', function() {
                    this.classList.add('text-visible');
                });

                aboutUsContentArea.addEventListener('mouseleave', function() {
                    this.classList.remove('text-visible');
                });
            } else {
                // Ensure text is always visible on mobile
                aboutUsContentArea.classList.add('text-visible');
            }
        }

        // Initialize and update on resize
        handleHoverEffect();
        window.addEventListener('resize', handleHoverEffect);
    }

    // --- About Us Section Image Slider ---
    const slides = document.querySelectorAll('.about-us-slide');
    let currentSlide = 0;
    const slideInterval = 1000;

    function nextSlide() {
        if (slides.length === 0) return;

        // Remove active-slide from current slide
        slides[currentSlide].classList.remove('active-slide');

        // Move to next slide
        currentSlide = (currentSlide + 1) % slides.length;

        // Add active-slide to new current slide
        slides[currentSlide].classList.add('active-slide');
    }

    if (slides.length > 0) {
        // Initialize first slide
        slides[0].classList.add('active-slide');
        
        // Start slider only if more than one slide
        if (slides.length > 1) {
            setInterval(nextSlide, slideInterval);
        }
    }
// --- NEW: One-time animation for Contact Section ---
    const contactContentWrapper = document.querySelector('.contact-content-wrapper');
    const contactSection = document.querySelector('.contact-section'); // Or .contact-content-wrapper itself

    if (contactContentWrapper && contactSection) { // Ensure both elements exist
        const triggerContactAnimation = () => {
            contactContentWrapper.classList.add('revealed');
            // Remove the event listener after it's triggered once
            contactSection.removeEventListener('mouseenter', triggerContactAnimation);
        };

        // Attach the event listener to the main contact section area
        contactSection.addEventListener('mouseenter', triggerContactAnimation);

        // Optional: If you prefer animation on scroll instead of mouseenter
        // You could use an Intersection Observer here:
        // const observer = new IntersectionObserver((entries) => {
        //     entries.forEach(entry => {
        //         if (entry.isIntersecting && !contactContentWrapper.classList.contains('revealed')) {
        //             contactContentWrapper.classList.add('revealed');
        //             observer.unobserve(contactSection);
        //         }
        //     });
        // }, { threshold: 0.2 }); // Trigger when 20% of the section is visible
        // observer.observe(contactSection);
    }
    // --- Why Choose Voxen Tech Section (Horizontal Selection) ---
    const imageItems = document.querySelectorAll('.why-choose-image-item');
    let currentActiveItem = document.querySelector('.why-choose-image-item.active');

    // Function to manage active state and image sources
    function setActiveItem(itemToActivate) {
        if (!itemToActivate) return;

        if (currentActiveItem && currentActiveItem !== itemToActivate) {
            currentActiveItem.classList.remove('active');
            const prevImg = currentActiveItem.querySelector('img');
            if (prevImg) {
                prevImg.src = currentActiveItem.getAttribute('data-thumb-src'); // Revert to thumbnail
            }
        }

        itemToActivate.classList.add('active');
        const newActiveImg = itemToActivate.querySelector('img');
        if (newActiveImg) {
            newActiveImg.src = itemToActivate.getAttribute('data-large-src'); // Set to large image
        }
        currentActiveItem = itemToActivate;
    }

    // Initialize: ensure the default active item displays its large image on load
    if (currentActiveItem) {
        const defaultImg = currentActiveItem.querySelector('img');
        if (defaultImg) {
            defaultImg.src = currentActiveItem.getAttribute('data-large-src');
        }
    }

    // Determine behavior based on screen size
    if (window.innerWidth > 1159) { // Desktop: Apply hover effects for expanding/shrinking
        imageItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                setActiveItem(this);
            });
        });

        const horizontalSelectionContainer = document.querySelector('.why-choose-horizontal-selection');
        if (horizontalSelectionContainer) {
            // Find the default item that should be active when not hovering
            const defaultItem = document.querySelector('.why-choose-image-item[data-large-src="assets/images/choice-main-default.jpg"]');
            
            horizontalSelectionContainer.addEventListener('mouseleave', function() {
                setActiveItem(defaultItem); // Revert to the default active item
            });
        }
    } else {
        // Mobile/Tablet: Stack all images vertically, ensure they display large by default
        imageItems.forEach(item => {
            const img = item.querySelector('img');
            if (img) {
                img.src = item.getAttribute('data-large-src'); // Load large image for all items
            }
            item.classList.remove('active'); // Remove active class as it's not controlling width on mobile
        });
    }

     // --- NEW: One-time animation for "Ready to Build Something Amazing" Section ---
    const buildAmazingSection = document.querySelector('.build-amazing-section');

    if (buildAmazingSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // If the section is intersecting (in view) and hasn't been revealed yet
                if (entry.isIntersecting && !buildAmazingSection.classList.contains('revealed')) {
                    buildAmazingSection.classList.add('revealed');
                    observer.unobserve(buildAmazingSection); // Stop observing after animation
                }
            });
        }, { threshold: 0.3 }); // Trigger when 30% of the element is visible

        // Start observing the section
        observer.observe(buildAmazingSection);
    }

    // --- NEW: One-time animation for Stats Section ---
    const statsSection = document.querySelector('.stats-section');

    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // If the section is intersecting (in view) and hasn't been revealed yet
                if (entry.isIntersecting && !statsSection.classList.contains('revealed')) {
                    statsSection.classList.add('revealed');
                    observer.unobserve(statsSection); // Stop observing after animation
                }
            });
        }, { threshold: 0.3 }); // Trigger when 30% of the element is visible

        // Start observing the section
        observer.observe(statsSection);
    }

    // --- Our Journey Section Scroll Animation - Encapsulated ---
    // Wrapped in an IIFE to create a new scope for its variables
    (function() {
    const journeySection = document.querySelector('.our-journey-section');
    if (!journeySection) {
        console.warn("Our Journey section not found. Skipping its JS setup.");
        return;
    }

    const slideshowContainer = journeySection.querySelector('.journey-slideshow-container');
    const slides = Array.from(journeySection.querySelectorAll('.journey-slide'));
    const totalSlides = slides.length;

    // State variables
    let currentSlideIndex = 0;
    let lastScrollY = window.scrollY;
    let sectionTop = 0;
    let sectionHeight = 0;
    let scrollDirection = 'down';
    let isAnimating = false;

    // Initialize slides
    const initSlides = () => {
        slides.forEach((slide, index) => {
            slide.style.position = 'absolute';
            slide.style.top = '0';
            slide.style.left = '0';
            slide.style.width = '100%';
            slide.style.height = '100%';
            slide.style.objectFit = 'cover';
            slide.style.transition = 'transform 0.7s ease-in-out';
            
            if (index === 0) {
                // First slide visible
                slide.style.transform = 'translateY(0)';
                slide.style.zIndex = '2';
            } else {
                // Other slides hidden
                slide.style.transform = 'translateY(100%)';
                slide.style.zIndex = '1';
            }
        });
    };

    // Update section dimensions
    const updateSectionDimensions = () => {
        sectionTop = journeySection.offsetTop;
        sectionHeight = journeySection.clientHeight;
    };

    // Handle slide transitions
    const transitionSlides = (newIndex, direction) => {
        if (isAnimating || newIndex < 0 || newIndex >= totalSlides) return;
        
        isAnimating = true;
        
        const currentSlide = slides[currentSlideIndex];
        const newSlide = slides[newIndex];
        
        // Set initial positions based on direction
        if (direction === 'down') {
            newSlide.style.transform = 'translateY(100%)';
            newSlide.style.zIndex = '1';
        } else {
            newSlide.style.transform = 'translateY(-100%)';
            newSlide.style.zIndex = '1';
        }
        
        // Bring new slide to front
        newSlide.style.zIndex = '2';
        
        // Trigger transitions
        setTimeout(() => {
            if (direction === 'down') {
                currentSlide.style.transform = 'translateY(-100%)';
                newSlide.style.transform = 'translateY(0)';
            } else {
                currentSlide.style.transform = 'translateY(100%)';
                newSlide.style.transform = 'translateY(0)';
            }
        }, 10);
        
        // Update current index after transition
        setTimeout(() => {
            currentSlideIndex = newIndex;
            currentSlide.style.zIndex = '1';
            isAnimating = false;
        }, 700);
    };

    // Handle scroll events
    const handleScroll = () => {
        const scrollY = window.scrollY;
        scrollDirection = scrollY > lastScrollY ? 'down' : 'up';
        lastScrollY = scrollY;
        
        // Calculate scroll progress (0 to 1)
        const scrollProgress = Math.max(0, Math.min(1, (scrollY - sectionTop) / (sectionHeight - window.innerHeight)));
        
        // Determine which slide should be active
        const slideSegment = 1 / totalSlides;
        let targetIndex = Math.floor(scrollProgress / slideSegment);
        targetIndex = Math.min(targetIndex, totalSlides - 1);
        
        // Transition if needed
        if (targetIndex !== currentSlideIndex) {
            transitionSlides(targetIndex, scrollDirection);
        }
    };

    // Initialize everything
    const init = () => {
        initSlides();
        updateSectionDimensions();
        
        // Set up scroll listener
        window.addEventListener('scroll', () => {
            handleScroll();
        });
        
        // Handle resize
        window.addEventListener('resize', () => {
            updateSectionDimensions();
        });
        
        // Intersection Observer for when section enters view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateSectionDimensions();
                    handleScroll();
                }
            });
        }, { threshold: 0.1 });

        observer.observe(journeySection);
    };

    // Start everything
    init();

(function() {
        const slideshowContainer = document.querySelector('.core-values-slideshow-container');
        if (!slideshowContainer) {
            console.warn("Core Values slideshow container not found. Skipping its JS setup.");
            return;
        }

        const slides = Array.from(slideshowContainer.querySelectorAll('.core-value-slide'));
        const totalSlides = slides.length;
        let currentSlideIndex = 0; // Start with the first slide (index 0)

        // Function to display a specific slide
        const showSlide = (index) => {
            // Ensure index wraps around for circular navigation
            if (index >= totalSlides) {
                index = 0;
            } else if (index < 0) {
                index = totalSlides - 1;
            }

            // Hide all slides
            slides.forEach(slide => {
                slide.classList.remove('active');
            });

            // Show the new active slide
            slides[index].classList.add('active');
            currentSlideIndex = index;
            console.log("Current Core Value Slide:", currentSlideIndex);
        };

        // Event listener for taps on the slideshow container
        slideshowContainer.addEventListener('click', (event) => {
            const containerWidth = slideshowContainer.offsetWidth;
            const clickX = event.clientX - slideshowContainer.getBoundingClientRect().left;

            if (clickX < containerWidth / 2) {
                // Click on the left half - go to previous slide
                showSlide(currentSlideIndex - 1);
            } else {
                // Click on the right half - go to next slide
                showSlide(currentSlideIndex + 1);
            }
        });

        // Initialize: Show the first slide when the page loads
        showSlide(currentSlideIndex);

    })(); // End of IIFE for Core Values section

})();

 document.addEventListener('DOMContentLoaded', function() {
        fetch('../../Components/footer.html') // Path to your footer.html file
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
