const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const imcSchema = new Schema({
  genero:   { type: String, required: true },
  altura:   { type: Number, min:1, max:700, required: true },
  massa:    { type: Number, min:1, max:700, required: true },
  valor:    { type: Number, required: true },
  rank:     { type: Number, required: true },
  classif:  { type: String, required: true }
}, {
  timestamps: true,
});

const imc = mongoose.model('imc', imcSchema);

module.exports = imc;