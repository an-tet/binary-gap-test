const express = require('express');
const app = express();

app.use(express.static(__dirname + '/public'));

app.listen(3000, () => {
    console.log('Escuchando en el puerto 3000');
});

app.get('/binaryGap/:numero', function (req, res) {
    binary_cap(req.params.numero, res);
});


const binary_cap = (numero, res) => {
    //validar espacio en blanco
    if (numero.trim() == '')
        return res.send('Debe ingresar un numero');

    //validar si es un numero
    if (Number.isNaN(numero))
        return res.send(`El parametro '${numero}' no es un numero`);

    let num = Number(numero);

    //validar si es entero
    if (Number.isInteger(num)) {
        let parts = num.toString(2).split('');
        res.json(`La cantidad de espacio binarios '${num.toString(2)}' es de '${getMaxBinarySpace(parts)}'`);
    } else {
        res.send(`El numero '${num}' debe ser entero`);
    }
};

const getMaxBinarySpace = (parts) => {
    let max = 0;
    let cont = 0;
    parts.forEach((item, idx) => {
        if (item === '0') {
            cont++;
            if (idx == parts.length - 1) {
                if (cont > max) max = cont;
            }
        } else {
            if (cont > max) max = cont;
            cont = 0;
        }
    });

    return max;
};

module.exports = {
    app
};