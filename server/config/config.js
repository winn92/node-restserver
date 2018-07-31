/*
  =============================
  Puerto
  =============================
*/
process.env.PORT = process.env.PORT || 3000;
/*
  =============================
  Entorno
  =============================
*/
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

/*
  =============================
  Vencimiento del token
  =============================
  60 segundos
  60 minutos
  24 horas
  30 dias
*/
process.env.CADUCIDAD_TOKEN = `${24 * 31}h`;

/*
  =============================
  Seed de autenticacion
  =============================
*/
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';


/*
  =============================
  Base de datos
  =============================
*/

let urlDB;
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;

/*
  =============================
  Google Client ID
  =============================
*/

process.env.CLIENT_ID = process.env.CLIENT_ID || '247454005695-epjqk84k2qpffsdvhub0d8gkqh3k1e70.apps.googleusercontent.com';