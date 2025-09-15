document.getElementById("loginForm").addEventListener("submit", async function(event) {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // elegi poner el de qa pero podria haber puesto el de produccion , se cambia aca. 
  const API_URL = "http://localhost:3000/login";

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();
    alert(data.message);

  } catch (error) {
    alert("Error al conectar con el servidor");
  }
});