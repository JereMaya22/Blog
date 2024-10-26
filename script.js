// Autenticación (puedes cambiar el usuario y la contraseña)
const USERNAME = "admin";
const PASSWORD = "12345";

// Variables y elementos
const blogPosts = document.getElementById("blog-posts");
const loginSection = document.getElementById("login-section");
const newPostSection = document.getElementById("new-post");
const loginError = document.getElementById("login-error");

let isAuthenticated = false;

// Función para manejar el inicio de sesión
function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === USERNAME && password === PASSWORD) {
        isAuthenticated = true;
        loginSection.style.display = "none";
        newPostSection.style.display = "block";
        displayPosts(); // Actualizamos la vista de publicaciones
    } else {
        loginError.innerText = "Usuario o contraseña incorrectos.";
    }
}

// Función para agregar una publicación
function addPost() {
    const title = document.getElementById("post-title").value;
    const content = document.getElementById("post-content").value;

    if (title && content) {
        const post = createPostElement(title, content);
        blogPosts.appendChild(post); // Agregamos al final

        // Limpiar los campos de entrada
        document.getElementById("post-title").value = "";
        document.getElementById("post-content").value = "";
    } else {
        alert("Por favor, completa tanto el título como el contenido de la publicación.");
    }
}

// Función para crear un elemento de publicación
function createPostElement(title, content) {
    const post = document.createElement("div");
    post.classList.add("post");

    const postTitle = document.createElement("h2");
    postTitle.innerText = title;

    const postContent = document.createElement("p");
    postContent.innerText = content;

    post.appendChild(postTitle);
    post.appendChild(postContent);

    // Botón de eliminar solo visible para el usuario autenticado
    if (isAuthenticated) {
        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Eliminar";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.onclick = () => post.remove(); // Elimina la publicación
        post.appendChild(deleteBtn);
    }

    return post;
}

// Función para mostrar publicaciones existentes (sin opciones de eliminar si no está autenticado)
function displayPosts() {
    blogPosts.innerHTML = ""; // Limpiar publicaciones
    // Aquí irían las publicaciones de ejemplo o previamente guardadas
    const examplePosts = [
        { title: "Publicación 1", content: "Este es el contenido de la publicación 1" },
        { title: "Publicación 2", content: "Este es el contenido de la publicación 2" }
    ];

    examplePosts.forEach(postData => {
        const post = createPostElement(postData.title, postData.content);
        blogPosts.appendChild(post);
    });
}

// Cargar publicaciones al cargar la página
displayPosts();
