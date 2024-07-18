function setSale() {
    const message = document.getElementById('sale-message-input').value;
    fetch('/api/sale', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: message }),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        showNotification('Sale set successfully!');
    })
    .catch(error => {
        console.error('Error setting sale:', error);
        showNotification('Error setting sale.');
    });
}

function endSale() {
    fetch('/api/sale', {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        showNotification('Sale ended successfully!');
    })
    .catch(error => {
        console.error('Error ending sale:', error);
        showNotification('Error ending sale.');
    });
}

function showNotification(message) {
    const notificationBox = document.getElementById('notification-box');
    notificationBox.textContent = message;
    notificationBox.style.display = 'block';
}