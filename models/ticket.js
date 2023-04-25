const mongoose = require('mongoose');

const ticketSchema = mongoose.Schema({
  movie_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie'
  },
  mallid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mall'
  },
  show_time: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  
  seats: {
    type: String,
    required: true
  },
  mobile: {
    type: String,
    required: true
  },
  bill: {
    type: String,
    required: true
  },
});

const Ticket = mongoose.model('Ticket', ticketSchema);
module.exports = Ticket; 