const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create geoLocation Schema

const GeoSchema = new Schema({
  type: {
    type: String,
    default: 'Point'
  },
  coordinates : {
     type: [Number],
     index: '2dsphere'
   }
});

//create obj schema & model
const objSchema = new Schema({
  name:{
    type: String,
    required:[true,"Name field is required"]
  },
  rank:{
    type: String,
  },
  available:{
    type: Boolean,
    default:false
  },
  //add in geo location
  geometry: GeoSchema
});

const Object = mongoose.model('Object',objSchema);
return module.exports = Object;
