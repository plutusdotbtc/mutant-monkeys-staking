const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const {Schema} = mongoose;
mongoose.Promise = global.Promise;

const MonkeySchema = new Schema({
  discord: {
    type: String,
    required: true
  },
  principal: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  date_created: {
    type: Date,
    default: Date.now
  }
})

MonkeySchema.plugin(mongoosePaginate)

module.exports = mongoose.models.Monkey || mongoose.model('Monkey', MonkeySchema);


