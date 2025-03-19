if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            const video = document.getElementById('video');
            video.srcObject = stream;
            video.play();

            // Captura automática de fotos a cada 5 segundos
            setInterval(tirarFoto, 5000);
        })
        .catch(error => console.error('Erro ao acessar a câmera:', error));
}

function tirarFoto() {
    const video = document.getElementById('video');
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataURL = canvas.toDataURL('image/png');

    // Enviar a foto para o servidor
    fetch('/enviar-foto', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ foto: dataURL })
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Erro ao enviar a foto:', error));
}
