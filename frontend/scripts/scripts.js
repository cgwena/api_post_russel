document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Empêche la soumission par défaut du formulaire

    const formData = new FormData(event.target); // Obtient les données du formulaire

    try {
        const response = await fetch('http://localhost:3000/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: formData.get('email'),
                password: formData.get('password')
            })
        });

        if (response.ok) {
            const data = await response.json();
            const token = data.token;

            // Stocker le token JWT dans le localStorage
            localStorage.setItem('token', token);
            window.location.href = '/frontend/views/welcome.html';
        } else {
            // Gérer la réponse si la connexion échoue
            const errorMessage = await response.text();
            alert(errorMessage); // Afficher un message d'erreur
        }
    } catch (error) {
        console.error('Erreur lors de la connexion :', error);
        // Gérer les erreurs, par exemple afficher un message d'erreur générique à l'utilisateur
        alert('Une erreur s\'est produite lors de la connexion. Veuillez réessayer plus tard.');
    }
});

document.getElementById('signupForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Empêche la soumission par défaut du formulaire

    const formData = new FormData(event.target); // Obtient les données du formulaire

    try {
        const response = await fetch('http://localhost:3000/api/user/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: formData.get('name'),
                email: formData.get('email'),
                password: formData.get('password')
            })
        });

        if (response.ok) {
            // Gérer la réponse si la connexion réussit
            alert('Utilisateur créé')
            location.reload()
        } else {
            // Gérer la réponse si la connexion échoue
            const errorMessage = await response.text();
            alert(errorMessage); // Afficher un message d'erreur
        }
    } catch (error) {
        console.error('Erreur lors de la connexion :', error);
        // Gérer les erreurs, par exemple afficher un message d'erreur générique à l'utilisateur
        alert('Une erreur s\'est produite lors de la connexion. Veuillez réessayer plus tard.');
    }
});
