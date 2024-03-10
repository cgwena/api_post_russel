async function fetchUsers() {
    try {
        const token = localStorage.getItem('token'); // Si vous stockez le token dans le localStorage côté client
        const response = await fetch('http://localhost:3000/api/user/', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des catways');
        }

        const users = await response.json();

        const userList = document.getElementById('userList');

        users.users.forEach(user => {
            const listItem = document.createElement('li');
            const userLink = document.createElement('a');
            userLink.textContent = `${user.name}`;
            userLink.href = `../views/user_details.html?userId=${user._id}`; // URL de la page des détails avec l'ID du catway

            // Ajouter le lien à l'élément de liste
            listItem.appendChild(userLink);
            userList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Erreur lors de la récupération des utlisateurs :', error);
    }
}

fetchUsers()

document.getElementById('createUser').addEventListener('submit', async (event) => {
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
            // Après la mise à jour réussie
            location.reload();
            alert('Utilisateur ajouté')
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