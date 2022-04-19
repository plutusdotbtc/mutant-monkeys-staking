const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const { MongooseQueryLogger } = require("mongoose-query-logger");

const queryLogger = new MongooseQueryLogger().setExplain(false);

const {Schema} = mongoose;
mongoose.Promise = global.Promise;

const MetaSchema = new Schema({
  collection_id: {
    type: Schema.Types.ObjectId,
    ref: 'Collection',
    required: true
  },
  contract_key: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  token_id: {
    type: Number,
    required: true
  },
  rarity: {
    type: Number
  },
  ranking: {
    type: Number
  },
  minted: {
    type: Boolean,
    default: false
  },
  attributes: {
    type: Array,
    required: true
  },
  listed: {
    type: Boolean,
    default: false,
    required: true
  },
  list_price: {
    type: Number
  },
  list_seller: {
    type: String,
  },
  list_block_height: {
    type: Number
  },
  list_tx_index: {
    type: Number
  },
  collection_map_id: {
    type: Schema.Types.Mixed,
  },
  list_contract: {
    type: String,
  },
  commission: {
    type: String
  },
  bid_price: {
    type: Number
  },
  bid_buyer: {
    type: String,
  },
  bid_contract: {
    type: String,
  },
  bid_block_height: {
    type: Number
  },
  bid_tx_index: {
    type: Number
  },
  bid: {
    type: Boolean,
    default: false,
  }
})

MetaSchema.plugin(mongoosePaginate)
MetaSchema.plugin(aggregatePaginate)
MetaSchema.plugin(queryLogger.getPlugin())

module.exports = mongoose.models.Meta || mongoose.model('Meta', MetaSchema);


