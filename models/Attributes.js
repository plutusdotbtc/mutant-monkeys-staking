const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const {Schema} = mongoose;
mongoose.Promise = global.Promise;

const AttributesSchema = new Schema({
  contract_key: {
    type: String,
    required: true,
    unique: true
  },
  collection_id: {
    type: Schema.Types.ObjectId,
    ref: 'Collection',
  },
  meta: {
    type: Object,
    required: true
  }
})

AttributesSchema.plugin(mongoosePaginate)

module.exports = mongoose.models.Attributes || mongoose.model('Attributes', AttributesSchema);


