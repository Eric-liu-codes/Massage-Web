document.addEventListener('DOMContentLoaded', function() {
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const contactId = this.getAttribute('data-id');
            console.log(`Attempting to delete contact with ID: ${contactId}`);
            deleteContact(contactId);
        });
    });
});

function deleteContact(contactId) {
    fetch(`/api/contact`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: parseInt(contactId) }),
    })
    .then(response => {
        return response.text().then(text => ({ status: response.status, body: text }));
    })
    .then(({ status, body }) => {
        if (status === 200 || status === 404) {
            document.getElementById(`row-${contactId}`).remove();
        } else {
            console.error('Failed to delete contact with id:', contactId);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}