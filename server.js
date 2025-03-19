const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname)));

app.post('/enviar-foto', (req, res) => {
    const imgData = req.body.foto.replace(/^data:image\/png;base64,/, "");
    fs.writeFile(`foto-${Date.now()}.png`, imgData, 'base64', (err) => {
        if (err) {
            console.error('Erro ao salvar a foto:', err);
            return res.status(500).json({ message: 'Erro ao salvar a foto' });
        }
        res.json({ message: 'Foto salva com sucesso!' });
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
