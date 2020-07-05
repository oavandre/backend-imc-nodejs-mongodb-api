const router = require('express').Router();
let User = require('../models/genero.model');

router.route('/').get((req, res) => {
  User.find()
    .then(genero => res.json(genero))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const genero = req.body.genero;

  const novoGenero = new User({genero});

  novoGenero.save()
    .then(() => res.json('Dados salvo'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;