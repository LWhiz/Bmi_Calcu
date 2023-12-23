
emailjs.init('v4lJHzwJd0X1BYtMu');

document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission

    // Get form values
    const form = this;
    const formData = {
        name: form.name.value,
        email: form.email.value,
        message: form.message.value
    };

    // Send email using EmailJS
    emailjs.send('service_pgffasw', 'YOUR_TEMPLATE_ID', formData)
        .then(function (response) {
            console.log('Email sent!', response);
            alert('Your message has been sent successfully!');
            form.reset(); // Clear the form after successful submission
        }, function (error) {
            console.error('Error sending email:', error);
            alert('Oops! Something went wrong. Please try again later.');
        });
});
