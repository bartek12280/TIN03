document.getElementById('userForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    const response = await fetch('/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errors = await response.json();

        document.querySelectorAll('.error-message').forEach(el => {
            el.textContent = '';
        });
        document.querySelectorAll('input').forEach(el => {
            el.classList.remove('input-error');
        });

        for (const [field, message] of Object.entries(errors)) {
            const errorElement = document.getElementById(`${field}-error`);
            const inputElement = document.getElementById(field);
            if (errorElement && inputElement) {
                errorElement.textContent = message;
                inputElement.classList.add('input-error');
            }
        }
    } else {
        this.submit();
    }
});
