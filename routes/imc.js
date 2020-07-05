const router = require('express').Router();
let Imc = require('../models/imc.model');

router.route('/').get((req, res) => {
  Imc.find().sort({createdAt: -1})
    .then(imc => res.json(imc))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const genero = req.body.genero;
  const altura = Number(req.body.altura);
  const massa = Number(req.body.massa);
  const valor = (massa /(altura/100* altura/100)).toFixed();
  


  let rank;
  let classif;

  if (valor <18)
  {
    rank = 0;
    classif = "Abaixo do peso";

  }
  else if (valor >= 18 && valor <=24)
  {
    rank =1;
    classif = "Peso normal";

  }
  else if (valor >= 25 && valor <=29)
  {
    rank =2;
    classif = "Sobrepeso";
  }
  else if (valor >= 30 && valor <=34)
  {
    rank =3;
    classif = "Obsidade Grau I";

  }
  else if (valor >= 35 && valor <=39)
  {
    rank =4;
    classif = "Obsidade Grau II";

  }
  else if (valor >= 40)
  {
    rank =5;
    classif = "Obsidade Grau III";

  }




  const novoIMC = new Imc({
    genero,
    altura,
    massa,
    valor,
    rank,
    classif
  });

  novoIMC.save()
  .then(() => res.json('Dados adicionados!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Imc.findById(req.params.id)
    .then(imc => res.json(imc))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Imc.findByIdAndDelete(req.params.id)
    .then(() => res.json('Dados deletados.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Imc.findById(req.params.id)
    .then(imc => {
      imc.genero  = req.body.genero;
      imc.altura  = Number(req.body.altura);
      imc.massa   = Number(req.body.massa);
      imc.valor   = Number(req.body.valor);
      imc.rank    = Number(req.body.rank);
      imc.classif = req.body.classif;

      imc.save()
        .then(() => res.json('IMC atualizado!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;