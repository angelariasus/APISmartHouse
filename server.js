const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

let alarmaMovimientoActiva = false;
let alarmaHumoActiva = false;

app.use(cors()); 
app.use(bodyParser.json()); 

app.get('/estado', (req, res) => {
  res.json({
    alarmaMovimiento: alarmaMovimientoActiva,
    alarmaHumo: alarmaHumoActiva,
  });
});

app.post('/actualizar', (req, res) => {
  const { alarmaMovimiento, alarmaHumo } = req.body;

  if (alarmaMovimiento !== undefined) alarmaMovimientoActiva = alarmaMovimiento;
  if (alarmaHumo !== undefined) alarmaHumoActiva = alarmaHumo;

  res.json({
    mensaje: 'Estado actualizado correctamente',
    estado: {
      alarmaMovimiento: alarmaMovimientoActiva,
      alarmaHumo: alarmaHumoActiva,
    },
  });
});

app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
