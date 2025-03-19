const express = require('express');
const fs = require('fs'); // Importar o módulo fs para manipulação de arquivos
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Endpoint para receber e salvar fotos
app.post('/enviar-foto', (req, res) => {
    const { foto } = req.body;
    const base64Data = foto.replace(/^data:image\/png;base64,/, "");
    const timestamp = Date.now();
    const filePath = `foto-${timestamp}.png`;

    fs.writeFile(filePath, base64Data, 'base64', (err) => {
        if (err) {
            console.error('Erro ao salvar a foto:', err);
            return res.status(500).send('Erro ao salvar a foto');
        }
        res.status(200).send('Foto salva com sucesso');
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
