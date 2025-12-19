const form = document.getElementById('registerForm');
const message = document.getElementById('message');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        userName: formData.get('userName'),
        pass: formData.get('pass')
    };

    try {
        const res = await fetch('/auth/reg', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await res.json();

        if (res.status === 201) {
            message.style.color = 'green';
            message.textContent = result.message;
            form.reset();
        } else {
            message.style.color = 'red';
            message.textContent = result.message;
        }
    } catch (err) {
        console.error(err);
        message.style.color = 'red';
        message.textContent = "Error connecting to server";
    }
});