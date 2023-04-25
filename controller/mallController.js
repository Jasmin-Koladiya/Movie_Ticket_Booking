var fs = require('fs');
var path = require('path');
const Mall = require('../models/mall');

module.exports.add_mall = (req, res) => {
    return res.render('add_mall');
}

module.exports.view_mall = async (req, res) => {
    var data = await Mall.find({});
    return res.render('view_mall', {
        mall : data
    });
}
module.exports.addmallData = async (req,res) =>{
    const data = await Mall.create(req.body);
    if(data){
        return res.redirect('back');
    }
    else{
        return res.redirect('back');
    }
}
module.exports.delete_mall = async function (req, res) {
    const id = req.params.id;
    const record = await Mall.findByIdAndDelete(id);
    if (record) {
      return res.redirect('back');
    }
    else{
        console.log('User not found');
    return res.status(404).send('User not found');
    }
  };

  module.exports.updateData = async function (req, res) {

    let Update =  await Mall.findById(req.params.id);
    if (Update) {
        return res.render('update_mall', {
                    data: Update
                });
    }
    else{
        console.log('record not update');
    }
}

module.exports.editData = async function (req, res) {
    console.log(req.body);
    let malldata = await Mall.findByIdAndUpdate(req.body.id,req.body);
    if (malldata) {
        return res.redirect('/mall/view_mall');
    }
    else {
        console.log('Error record not update');
    }
}