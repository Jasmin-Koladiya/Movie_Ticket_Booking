var fs = require('fs');
var path = require('path');
const Movie = require('../models/movie');
const Mall = require('../models/mall');
const MovieMall = require('../models/moviemall');
module.exports.add_movie_mall = async function (req, res) {
    var moviedata = await Movie.find({});
    let malldata = await Mall.find({});
    return res.render('add_movie_mall', {
    movies: moviedata,
    malls: malldata
    })
}
module.exports.view_movie_mall = async function (req, res) {
    let data = await MovieMall.find({}).populate('movie_id').populate('mall_id').exec();
    return res.render('view_movie_mall', {
        data: data
    });

}
module.exports.addmoviemalldata = async function (req, res) {
    let data = await MovieMall.create(req.body);
    if (data) {
        return res.redirect('/moviemall/view_movie_mall');
    }
    else {
        console.log('Error record not add');
    }
}
module.exports.delete_moviemall = async function (req, res) {
    const id = req.params.id;
    const record = await MovieMall.findByIdAndDelete(id);
    if (record) {
      return res.redirect('back');
    }
    else{
        console.log('data not found');
    return res.status(404).send('User not found');
    }
  };