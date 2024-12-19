(function () {
    emailjs.init("HmeQxflwNW3b4DpvT");
})();

const MESSAGE_LIMIT = 30;
const TIME_FRAME = 12 * 60 * 60 * 1000;

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
    const successText = document.getElementById('success-text');
    const limitText = document.getElementById('limit-text');
    const submitButton = document.getElementById('submit-button');
    const preloader = document.getElementById('preloader');

    if (!canSendMessage()) {
        limitText.style.display = 'block'; // Показываем предупреждение о лимите
        return;
    }

    preloader.style.display = 'flex';
    submitButton.disabled = true;
    warningText.style.display = 'block';
    limitText.style.display = 'none'; // Скрываем сообщение о лимите

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
            successText.style.display = 'block';
            document.getElementById('contact-form').reset();
            preloader.style.display = 'none';
            warningText.style.display = 'none';
            submitButton.disabled = false;
            recordMessage();

            // Убираем успех через 3 секунды, возвращаем сообщение о лимите
            setTimeout(() => {
                successText.style.display = 'none';
                limitText.style.display = 'block'; // Возвращаем сообщение о лимите
            }, 3000);
        }, error => {
            alert('Произошла ошибка при отправке сообщения. Попробуйте еще раз позже.');
            preloader.style.display = 'none';
            warningText.style.display = 'none';
            submitButton.disabled = false;
        });
}

window.onload = function () {
    const limitText = document.getElementById('limit-text');
    limitText.style.display = 'block'; // Показываем сообщение о лимите при загрузке
};

window.addEventListener('load', function () {
    const preloader = document.getElementById('preloader');
    preloader.style.display = 'none';
});