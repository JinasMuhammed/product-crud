// db schema

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// declaring collection schema property and names

let Product = new Schema(
  {
    // schema property: values
    title: { type: String },
    image: { type: String },
    price: { type: Number },
    gst: { type: Number },
    description: { type: String }
  },
  {
    collection: 'product'
  }
);

module.exports = mongoose.model('Prod', Product);
