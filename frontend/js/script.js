const form = document.getElementById('eventForm');
const submitBtn = document.getElementById('submitBtn');
const loading = document.getElementById('loading');
const messageDiv = document.getElementById('message');

// Update this with your backend URL
const API_URL = 'http://localhost:5000/api/events';

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = {
        email: document.getElementById('email').value,
        eventType: document.getElementById('eventType').value,
        foodType: document.getElementById('foodType').value,
        dayOfWeek: document.getElementById('dayOfWeek').value,
        time: document.getElementById('time').value,
        expectedGuests: parseInt(document.getElementById('expectedGuests').value),
        foodsOrdered: document.getElementById('foodsOrdered').value,
        submittedAt: new Date().toISOString()
    };

    // Show loading
    submitBtn.disabled = true;
    loading.style.display = 'block';
    hideMessage();

    try {
        // Send data to backend API
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (response.ok) {
            showMessage('success', 'Success! Your event has been booked. Confirmation email sent!');
            form.reset();
        } else {
            throw new Error(result.message || 'Booking failed');
        }
    } catch (error) {
        console.error('Error:', error);
        showMessage('error', 'Oops! Something went wrong. Please try again or contact support.');
    } finally {
        submitBtn.disabled = false;
        loading.style.display = 'none';
    }
});

function showMessage(type, text) {
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = text;
    messageDiv.style.display = 'block';
    
    if (type === 'success') {
        setTimeout(() => {
            hideMessage();
        }, 5000);
    }
}

function hideMessage() {
    messageDiv.style.display = 'none';
}