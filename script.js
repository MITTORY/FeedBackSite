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

function sendEmail(event) {
    event.preventDefault();
    const warningText = document.getElementById('warning-text');
    const submitButton = document.getElementById('submit-button');

    if (!canSendMessage()) {
        alert('Вы превысили лимит отправки сообщений. Попробуйте позже.');
        return;
    }

    warningText.style.display = 'block';
    submitButton.disabled = true;

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
            submitButton.disabled = false;
            recordMessage();
        }, error => {
            alert('Произошла ошибка при отправке сообщения. Попробуйте еще раз позже.');
            warningText.style.display = 'none';
            submitButton.disabled = false;
        });
}

window.onload = function() {
    alert('Вы можете отправить только одно сообщение в день.');
};