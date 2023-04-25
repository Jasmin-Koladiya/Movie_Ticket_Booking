const mongoose = require('mongoose');

const moviemallSchema = mongoose.Schema({
  movie_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie'
  },
  mall_id: {
    type: mongoose.Schema.Types.Array,
    ref: 'Mall'
  },
});

const moviemall = mongoose.model('Moviemall', moviemallSchema);
module.exports = moviemall;