const express = require('express');
//const bodyParser = require('body-parser').json();
const router = express.Router();
//const mongoose = require('mongoose');
const Object = require('../models/obj');
//get the list of objects from DB

router.get('/objs', function (req, res, next) {
  
  Object.aggregate([{
    $geoNear: {
      near: {
        type: "Point",
        coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]
      },
      spherical: true,
      maxDistance: 999999,
      distanceField: "dist.calculated"
    }
  }]).then(function (objects){
    res.send(objects);
  });

 
});

//add a new obj to the DB

router.post('/objs',function(req, res ,next){
  Object.create(req.body,function(err,newObject){
    if(err){
        console.log("Error creating newobject: ", err);
        return res.status(400).json(err);
    }else{
        console.log("newobject Created: ", newObject);
        return res.status(201).json(newObject);
    }
  });
});

//update the obj in the DB
router.put('/objs/:id',function(req, res,next){
  Object.findOneAndUpdate({_id: req.params.id},req.body).then(function(){
    Object.findOne({_id: req.params.id},req.body).then(function(object){
      res.send(object);
    });
  });
});

//delete the obj from the DB
router.delete('/objs/:id',function(req, res,next){
  Object.findOneAndDelete({_id: req.params.id}).then(function(object){
    res.send(object);
  });
});

module.exports = router;
