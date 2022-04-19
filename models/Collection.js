const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const {Schema} = mongoose;
mongoose.Promise = global.Promise;

const CollectionSchema = new Schema({
  contract_key: {
    type: String,
    required: false,
    unique: true
  },
  attributes_id: {
    type: Schema.Types.ObjectId,
    ref: 'Attributes'
  },
  asset_name: {
    type: String,
    required: true
  },
  scanned: {
    type: Number,
    required: false,
    default: 0
  },
  collection_size: {
    type: Number,
    required: false
  }, 
  mint_functions: [
    {
      function_name: {
        type: String,
        required: false
      },
      count: {
        type: Number,
        required: false,
      }
    }
  ],
  attributes: {
    type: Object,
    required: false
  },
  description: {
    type: String,
    required: false
  },
  artist: {
    type: String,
    required: false
  },
  external_url: {
    type: String,
    required: false
  },
  volume: {
    type: Number,
    default: 0
  },
  floor: {
    type: Number, 
    default: 0
  },
  cover_image: {
    type: String,
  },
  slug: {
    type: String,
    required: true,
    unique: true
  }
})

CollectionSchema.plugin(mongoosePaginate)

module.exports = mongoose.models.Collection || mongoose.model('Collection', CollectionSchema);


