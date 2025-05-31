document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href'); // Gets, for example, "#about"

            // Check if targetId is just "#" (e.g. a link to the top of the page)
            // querySelector would fail for "#" alone.
            if (targetId === '#') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return; // Exit the function
            }

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
