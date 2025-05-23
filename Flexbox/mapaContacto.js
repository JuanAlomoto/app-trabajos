
function initMap() {
    // coordenadas de Quito, Ecuador 
    const quito = { lat: -0.1807, lng: -78.4678 }; 

    // crear una nueva instancia del mapa y la adjuntar al div con id = map
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,    // nivel de zoom inicial 
        center: quito, // coordenadas del centro del mapa
    });

    // añadir un marcador en la ubicacion especificada
    const marker = new google.maps.Marker({
        position: quito,    // posición del marcador
        map: map,           // el mapa en el que se mostrara el marcador
        title: "Tienda Principal", 
    });

    // crea una ventana de informacion (InfoWindow) para el marcador
    const infowindow = new google.maps.InfoWindow({
        content: "<h3>Nuestra Tienda</h3><p>¡Visítanos en nuestra ubicación central!</p>",
    });

    // añadir un evento click al marcador para abrir la ventana de informacion
    marker.addListener("click", () => {
        infowindow.open(map, marker);
    });
}