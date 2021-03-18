const fs = require('fs');
const archivo = './db/data.json';



const guardarDB = (data) => {

    fs.writeFileSync(archivo, JSON.stringify(data));
};

const leerDb = () => {

    if (!fs.existsSync(archivo)) {// con este codigo miramos si no existe el archivo creado,retornaremos un null
        return null;
    }

    const info = fs.readFileSync(archivo, { encoding: 'utf-8' });
    const data = JSON.parse(info);// Para pasar la info de string a json
    // console.log(data);
    return data;


};



module.exports = {
    guardarDB,
    leerDb
}