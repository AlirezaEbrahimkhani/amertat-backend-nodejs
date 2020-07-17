const { Client } = require("pg");

const client = new Client({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
});
client
  .connect()
  .then(() => {
    console.log(`Connected to database Successfully ... !`.cyan.underline.bold);
  })
  .catch((err) => {
    console.log(
      `We have some problem to conncet to database ... ! ${err}`.red.underline
        .bold
    );
  });

module.exports = client;
