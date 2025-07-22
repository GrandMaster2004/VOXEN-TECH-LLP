// js/main.js
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Function to set the theme (and save to localStorage)
    function setTheme(theme) {
        if (theme === 'dark') {
            body.classList.add('dark-theme');
            if (themeToggle) themeToggle.innerHTML = '🌙'; // Moon icon for dark mode
        } else {
            body.classList.remove('dark-theme');
            if (themeToggle) themeToggle.innerHTML = '☀️'; // Sun icon for light mode
        }
        localStorage.setItem('theme', theme); // Save user preference
    }

    // Function to get the preferred theme
    function getPreferredTheme() {
        // 1. Check for saved preference in localStorage
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            return savedTheme;
        }

        // 2. Check system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }

        // 3. Default to light theme
        return 'light';
    }

    // Apply theme on page load
    const initialTheme = getPreferredTheme();
    setTheme(initialTheme);

    // Listen for manual theme toggle
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = body.classList.contains('dark-theme') ? 'dark' : 'light';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            setTheme(newTheme);
        });
    }

    // Listen for system theme changes (if no manual preference is set)
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        // Only react to system changes if no explicit user preference is set
        if (!localStorage.getItem('theme')) {
            const newSystemTheme = event.matches ? 'dark' : 'light';
            setTheme(newSystemTheme);
        }
    });

    console.log("Theme switching script loaded.");
});