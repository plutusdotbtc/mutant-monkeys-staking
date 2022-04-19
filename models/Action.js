const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const {Schema} = mongoose;
mongoose.Promise = global.Promise;

const ActionSchema = new Schema({
  marketplace_id: {
    type: Schema.Types.ObjectId,
    ref: 'Marketplace',
    required: true
  },
  meta_id: {
    type: Schema.Types.ObjectId,
    ref: 'Meta',
    required: true
  },
  collection_id: {
    type: Schema.Types.ObjectId,
    ref: 'Collection',
    required: true
  },
  contract_key: {
    type: String,
  },
  action: {
    type: String,
    required: true
  },
  list_price: {
    type: Number,
  },
  seller: {
    type: String,
  },
  buyer: {
    type: String,
  },
  bid_price: {
    type: Number,
  },
  block_height: {
    type: Number,
    required: true
  },
  tx_index: {
    type: Number,
    required: true
  },
  burn_block_time_iso: {
    type: Date,
    required: true
  }

})

ActionSchema.plugin(mongoosePaginate)
ActionSchema.plugin(aggregatePaginate)

module.exports = mongoose.models.Action || mongoose.model('Action', ActionSchema);


