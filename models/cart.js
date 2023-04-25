const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;