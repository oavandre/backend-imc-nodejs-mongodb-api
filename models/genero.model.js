const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const generoSchema = new Schema({
    genero: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
}, {
  timestamps: true,
});

const genero = mongoose.model('genero', generoSchema);

module.exports = genero;