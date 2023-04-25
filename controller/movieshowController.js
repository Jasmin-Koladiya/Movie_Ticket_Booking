var fs = require('fs');
var path = require('path');
const Movie = require('../models/movie');
const Mall = require('../models/mall');
const MovieMall = require('../models/moviemall');
const movieshow = require('../models/movieshow');
module.exports.add_movieshow_mall = async function (req, res) {
    let moviedata = await Movie.find({isactive : 1});
    var malldata = await Mall.find({});
    let MovieMalldata = await MovieMall.find({});
    return res.render('add_movieshow_mall', {
    movies: moviedata,
    malls: malldata,
    MovieMalldata:MovieMalldata
    })
}
module.exports.view_movieshow_mall = async function (req, res) {
    let data = await movieshow.find({}).populate('movie_id').populate('mall_id').exec();
    return res.render('view_movieshow_mall', {
        data: data
    });
}
module.exports.addmovieshowdata = async function (req, res) {
    let data = await movieshow.create(req.body);
    if (data) {
        return res.redirect('back');
    }
    else {
        console.log('Error record not add');
    }
}
module.exports.getMall = async (req,res) =>{
    var data = await MovieMall.findOne({movie_id : req.body.Id}).populate('mall_id').exec();
    console.log(data);
    return res.render('get_mall', {
        data : data
    });
}

module.exports.delete_movieshow= async function (req, res) {
    const id = req.params.id;
    const record = await movieshow.findByIdAndDelete(id);
    if (record) {
      return res.redirect('back');
    }
    else{
        console.log('data not found');
    return res.status(404).send('User not found');
    }
  };