//Middleware's importates
//Variaveis padrao de cominicao Nodejs com MongoDB
const express = require('express');
const mongoose = require('mongoose');

//estou habilitando o cors para ser usado no frontend e no BI
const cors = require('cors');


require('dotenv').config();


//variavel de ambiente
const app         = express();
const port        = process.env.PORT || 5000;
const mongodb_uri = process.env.MONGODB_URI;

app.use(cors());
app.use(express.json());

// conexao com MongoDB
mongoose.connect(mongodb_uri, { useNewUrlParser: true , useUnifiedTopology: true , useCreateIndex: true });

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB conectado!");
})

const imcRouter = require('./routes/imc');

//decidir fazer o genero para ser usado em um modelo preditivo machine learning
const generoRouter = require('./routes/genero');

app.use('/imc', imcRouter);
app.use('/genero', generoRouter);



app.listen(port, () => {
    console.log(`Servidor NodeJS esta na porta: ${port}`);
});