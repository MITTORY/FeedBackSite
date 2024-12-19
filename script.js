(function() {
    emailjs.init("HmeQxflwNW3b4DpvT");
})();

const MESSAGE_LIMIT = 1;
const TIME_FRAME = 24 * 60 * 60 * 1000;

function canSendMessage() {
    const now = Date.now();
    const messages = JSON.parse(localStorage.getItem('messages')) || [];

    const recentMessages = messages.filter(message => now - message.time < TIME_FRAME);
    localStorage.setItem('messages', JSON.stringify(recentMessages));

    return recentMessages.length < MESSAGE_LIMIT;
}

function recordMessage() {
    const now = Date.now();
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    messages.push({ time: now });
    localStorage.setItem('messages', JSON.stringify(messages));
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function sendEmail(event) {
    event.preventDefault();
    const warningText = document.getElementById('warning-text');
    const submitButton = document.getElementById('submit-button');
    const preloader = document.getElementById('preloader');

    if (!canSendMessage()) {
        alert('Вы превысили лимит отправки сообщений. Попробуйте позже.');
        return;
    }

    preloader.style.display = 'flex';
    submitButton.disabled = true;
    warningText.style.display = 'block';

    const serviceID = "service_3xn8g5r";
    const templateID = "template_gzvow7i";
    const templateParams = {
        from_name: document.getElementById('name').value,
        email_from: document.getElementById('email').value,
        category: document.getElementById('category').value,
        message: document.getElementById('message').value
    };

    emailjs.send(serviceID, templateID, templateParams)
        .then(response => {
            alert('Сообщение отправлено успешно!');
            document.getElementById('contact-form').reset();
            preloader.style.display = 'none';
            warningText.style.display = 'none';
            submitButton.disabled = false;
            recordMessage();
        }, error => {
            alert('Произошла ошибка при отправке сообщения. Попробуйте еще раз позже.');
            preloader.style.display = 'none';
            warningText.style.display = 'none';
            submitButton.disabled = false;
        });
}

// window.onload = function() {
//     alert('Вы можете отправить только одно сообщение в день.');
// };

window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    preloader.style.display = 'none';
});