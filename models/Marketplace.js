const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const {Schema} = mongoose;
mongoose.Promise = global.Promise;

const MarketplaceSchema = new Schema({
  contract_key: {
    type: String,
    required: true,
    unique: true
  },
  buy_function: {
    type: Object,
    required: true
  },
  list_function: {
    type: Object,
    required: true
  },
  unlist_function: {
    type: Object,
    required: true
  },
  bid_function: {
    type: Object,
    required: true
  },
  unlist_bid_function: {
    type: Object,
    required: true
  },
  accept_bid_function: {
    type: Object,
    required: true
  },
  add_collection_function: {
    type: Object,
  },
  scanned_transactions: {
    type: Number,
    default: 0,
    required: true
  }
})

MarketplaceSchema.plugin(mongoosePaginate)

module.exports = mongoose.models.Marketplace || mongoose.model('Marketplace', MarketplaceSchema);


