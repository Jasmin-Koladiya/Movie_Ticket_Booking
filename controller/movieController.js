var fs = require('fs');
var path = require('path');
const Movie = require('../models/movie');
const Cart = require('../models/cart');
const Movieshow = require('../models/movieshow');
const Moviemall = require('../models/moviemall');
const Ticket = require('../models/ticket');
module.exports.user = function (req, res) {
    return res.render('home');
}

module.exports.add_movie = (req, res) => {
    return res.render('add_movie');
}
module.exports.addMovieData = async (req, res) => {
    Movie.uploadAvatar(req, res, function () {
        imgPath = '';
        if (req.file) {
            imgPath = Movie.avatarpath + "/" + req.file.filename;
        }
        Movie.create({
            MovieName: req.body.MovieName,
            type:req.body.type,
            description:req.body.description,
            avatar: imgPath,
            isactive:1
        }, function (err,data)  {
            if (err) {
                console.log(err);
                return false;
            }
        });
        return res.redirect('/movie/view_movie');
    });
}
module.exports.view_movie = async function (req, res) {



    let search = '';
    if(req.query.search){
        search = req.query.search;
    }
    var page = 1;
    if(req.query.page){
        page = req.query.page;
    }
    var per_page = 3;
    

    let activedata = await Movie.find({
        $or:[
            {MovieName :{$regex : '.*'+search+'.*'}}
        ]
    })
    .skip((page -1)*per_page)
    .limit(per_page)
    .exec();
    let deactivedatas = await Movie.find({
        $or:[
            {MovieName :{$regex : '.*'+search+'.*'}}
        ]
    })
    .skip((page -1)*per_page)
    .limit(per_page)
    .exec();
    let countdata = await Movie.find({
        $or:[
            {MovieName :{$regex : '.*'+search+'.*'}}
        ]
    }).countDocuments();

    return res.render('view_movie',{
        'countrecord':Math.ceil(countdata/per_page),
        'searchdata': search,
        'previous': Number(page)-1,
        'next': Number(page)+1,
        'current': Number(page),
        'activedata': activedata,
        // 'deactivedata':deactivedata,
        'deactivedata':deactivedatas
    });

}
module.exports.viewMovieDetail = function (req, res) {
    id = req.params.id;
    Movie.findById(id, function (err, record) {
        if(err){
            console.log(err);
            return false;
        }
        return res.render('view_movie_detail',{
            record : record
        })
    })
}


module.exports.activestatus = function(req, res){
    Movie.findByIdAndUpdate(req.params.id,{
        'isactive': 1
    },function(err,updateData){
        if(err){
            console.log(err);
        }
        return res.redirect('back');
    })
}

module.exports.deactivestatus = function(req, res){
    Movie.findByIdAndUpdate(req.params.id,{
        'isactive': 0
    },function(err,updateData){
        if(err){
            console.log(err);
        }
        return res.redirect('back');
    })
}


module.exports.addcartdata = async function(req, res){
    var id = req.body.id;
    var userid = req.user.id;
    var moviedata = await Movie.findById(id);
    var cart = new Cart({
      movie: moviedata._id,
      user:userid,
    });
    await cart.save();
    return res.redirect('/movie/view_cart');
}

module.exports.view_Cart = async function (req,res){
   
    let data = await Cart.find({'user':req.user.id}).populate('movie');
    return res.render('view_cart', {
        cartdata: data
    });
}

module.exports.delete_movie = function(req, res){
    var id = req.params.id;
    Movie.findById(id, function (err, record) {
        if (record.avatar) {
            fs.unlinkSync(path.join(__dirname, "..", record.avatar));
        }
        Movie.findByIdAndDelete(id, function (err, data) {
            if (err) {
                console.log(err);
                return false;
            }
            return res.redirect('back');
        });
    });
}

module.exports.updateData = async function (req, res) {

    let Update =  await Movie.findById(req.params.id);
    if (Update) {
        return res.render('update_movie', {
                    data: Update
                });
    }
    else{
        console.log('record not update');
    }
}

module.exports.editData = function (req, res) {

    Movie.uploadAvatar(req, res, function () {
       
        if (req.file) {
            Movie.findById(req.body.id, function (err, data) {
                if (err) {
                    console.log(err);
                    return false;
                }
                if (data.avatar) {
                    fs.unlinkSync(path.join(__dirname, "..", data.avatar));
                }
                var imgPath = Movie.avatarpath + "/" + req.file.filename;
                Movie.findByIdAndUpdate(req.body.id, {
                    movie_name: req.body.movie_name,type:req.body.type,
                    description:req.body.description,
                     avatar: imgPath
                }, function (err) {
                    if (err) {
                        console.log(err);
                        return false;
                    }
                    return res.redirect('view_movie');
                });
            });
        }
        else {
            Movie.findById(req.body.id, function (err, data) {
                if (err) {
                    console.log(err);
                    return false;
                }
                if (data.avatar) {
                    imgPath = data.avatar;
                }
                Movie.findByIdAndUpdate(req.body.id, {
                    movie_name: req.body.movie_name,type:req.body.type,
                    description:req.body.description,
                    avatar: imgPath,
                }, function (err) {
                    if (err) {
                        console.log(err);
                        return false;
                    }
                    return res.redirect('view_movie');
                });
            });
        }
    });
}
module.exports.bookShow = async function(req, res) {
    var data = await Movie.findById(req.params.id);
    var showdata = await Movieshow.find({movie_id : req.params.id}).populate('movie_id').populate('mall_id').exec();
    var movie_malls = await Moviemall.findOne({movie_id : req.params.id}).populate('movie_id').populate('mall_id').exec();
    return res.render('book_show', {
        Moviedata : data,
        showdata : showdata,
        movie_mall : movie_malls
    });     
}
module.exports.findShowdata = async function (req,res) {
    const data = await Movieshow.find({ mall_id: req.body.Id, movie_id: req.body.moviename }).select('price').select('show_time')
    .populate('mall_id')
    .exec();
    return res.render('get_time', {
        data : data
    });
}

module.exports.pricedata = async function (req,res) {
    const pricedatas = await Movieshow.find({ mall_id: req.body.Ids, movie_id: req.body.movien,mall_id : req.body.mall }).select('price').select('show_time')
    .populate('mall_id')
    .exec();
   console.log(pricedatas);
    return res.render('get_price', {
        data : pricedatas
    });
}
module.exports.tiketdata = async function(req, res) {
    const create = await Ticket.create(req.body);
    const data = await Ticket.findOne(req.body).populate('movie_id').populate('mallid').exec();
    if(data){
        return res.render('view_ticket',{
            i:data
        });
    }
    else{
        return res.redirect('back');
    }
}