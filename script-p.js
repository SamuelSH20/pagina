const firebaseConfig = {
    apiKey: "AIzaSyC7jy-XdS2VvJPZewHL5-eg30_akXPMr-g",
    authDomain: "hola-9daac.firebaseapp.com",
    databaseURL: "https://hola-9daac-default-rtdb.firebaseio.com",
    projectId: "hola-9daac",
    storageBucket: "hola-9daac.appspot.com",
    messagingSenderId: "4511086097",
    appId: "1:4511086097:web:87a582a70892b8bad2a3b0",
    measurementId: "G-P5C91NHMWF"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

function elegirCamiseta(numero) {
    var opcionAnterior = localStorage.getItem('opcion_camiseta');
    if (opcionAnterior === null) {
        alert("Has elegido la camiseta número: " + numero);
        localStorage.setItem('opcion_camiseta', numero);

        // Almacena el voto en la base de datos de Firebase
        const dbRef = ref(database, 'votos/' + numero);
        set(dbRef, 'votado');
    } else if (opcionAnterior === numero.toString()) {
        alert("Ya has seleccionado esta camiseta.");
    } else {
        var confirmarCambiar = confirm("Ya has seleccionado otra camiseta. ¿Deseas cambiar a la camiseta número " + numero + "?");
        if (confirmarCambiar) {
            localStorage.setItem('opcion_camiseta', numero);
            alert("Has cambiado la selección a la camiseta número: " + numero);

            // Actualiza el voto en la base de datos de Firebase
            const dbRef = ref(database, 'votos/' + numero);
            set(dbRef, 'votado');
        } else {
            alert("Manteniendo la selección actual.");
        }
    }
}

