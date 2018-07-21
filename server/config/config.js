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
  Base de datos
  =============================
*/
let urlDB;
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = 'mongodb://winn92:Kh$5Xr@ds147361.mlab.com:47361/cafe-w92';
}

process.env.URLDB = urlDB;