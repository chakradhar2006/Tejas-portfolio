document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const status = document.getElementById('form-status');

    if (form && status) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            status.textContent = 'Opening WhatsApp...';

            const formData = new FormData(form);
            const name = formData.get('name') || '';
            const email = formData.get('email') || '';
            const message = formData.get('message') || '';

            if (!name || !email || !message) {
                status.textContent = 'Please fill in all fields.';
                return;
            }

            // Replace with your full phone number including country code, no "+" or spaces
            const phoneNumber = '919175125338';

            const text =
                `Name: ${name}\n` +
                `Email: ${email}\n` +
                `Message: ${message}`;

            const encodedText = encodeURIComponent(text);
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedText}`;

            window.open(whatsappUrl, '_blank');
            status.textContent = 'WhatsApp opened. You can send the message there.';
        });
    }

    // Scroll reveal animations
    const revealEls = document.querySelectorAll('.reveal');
    if (revealEls.length > 0 && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.2,
            }
        );

        revealEls.forEach((el) => observer.observe(el));
    } else {
        // Fallback: show everything immediately
        revealEls.forEach((el) => el.classList.add('revealed'));
    }
});
