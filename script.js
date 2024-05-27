(function() {
    emailjs.init("HmeQxflwNW3b4DpvT");
})();

function sendEmail(event) {
    event.preventDefault();
    const warningText = document.getElementById('warning-text');
    warningText.style.display = 'block';

    const serviceID = "service_3xn8g5r";
    const templateID = "template_gzvow7i";
    const templateParams = {
        from_name: document.getElementById('name').value,
        email_from: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    emailjs.send(serviceID, templateID, templateParams)
        .then(response => {
            alert('Сообщение отправлено успешно!');
            document.getElementById('contact-form').reset();
            warningText.style.display = 'none';
            
        }, error => {
            alert('Произошла ошибка при отправке сообщения. Попробуйте еще раз позже.');
            warningText.style.display = 'none';
        });
}