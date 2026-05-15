// Theme Toggle Functionality

const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// Initialize theme on page load
function initializeTheme() {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  
  if (savedTheme === 'light') {
    htmlElement.classList.add('light-mode');
    themeToggle.checked = true;
  } else {
    htmlElement.classList.remove('light-mode');
    themeToggle.checked = false;
  }
}

// Handle theme toggle
themeToggle.addEventListener('change', function() {
  if (this.checked) {
    htmlElement.classList.add('light-mode');
    localStorage.setItem('theme', 'light');
  } else {
    htmlElement.classList.remove('light-mode');
    localStorage.setItem('theme', 'dark');
  }
});

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', initializeTheme);

// Also call it immediately in case DOM is already loaded
initializeTheme();
