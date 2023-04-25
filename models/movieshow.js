const mongoose = require('mongoose');

const movieshowSchema = mongoose.Schema({
  movie_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie'
  },
  mall_id: {
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
});

const movieshow = mongoose.model('MovieShow', movieshowSchema);
module.exports = movieshow; 