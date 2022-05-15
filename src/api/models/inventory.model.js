import mongoose from 'mongoose';

const { Schema } = mongoose;
const inventorySchema = new Schema({
  item_name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  qty: {
    type: Number,
    required: true,
  },
  item_code: {
    type: Number,
    required: true,
  },
});
export default mongoose.model('inventory', inventorySchema);
