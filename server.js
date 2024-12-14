const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let alarmaEstado = {
    alarmaMovimiento: false,
    alarmaHumo: false
};

app.get('/api/alarmas', (req, res) => {
    res.json(alarmaEstado);
});

app.get('/api/alarmas/:tipo', (req, res) => {
    const tipo = req.params.tipo;
    if (tipo === 'movimiento') {
        res.json({ alarmaMovimiento: alarmaEstado.alarmaMovimiento });
    } else if (tipo === 'humo') {
        res.json({ alarmaHumo: alarmaEstado.alarmaHumo });
    } else {
        res.status(400).json({ error: 'Tipo de alarma no válido' });
    }
});

app.post('/api/alarmas/movimiento', (req, res) => {
    const { alarmaMovimiento } = req.body;
    if (typeof alarmaMovimiento === 'boolean') {
        alarmaEstado.alarmaMovimiento = alarmaMovimiento;
        res.json({ message: 'Alarma de movimiento actualizada', estado: alarmaEstado });
    } else {
        res.status(400).json({ error: 'Formato inválido' });
    }
});

app.post('/api/alarmas/humo', (req, res) => {
    const { alarmaHumo } = req.body;
    if (typeof alarmaHumo === 'boolean') {
        alarmaEstado.alarmaHumo = alarmaHumo;
        res.json({ message: 'Alarma de humo actualizada', estado: alarmaEstado });
    } else {
        res.status(400).json({ error: 'Formato inválido' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
