import mongoose from 'mongoose';
const productSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    description: { type: String, trim: true },
    category: { type: String, required: true, trim: true },
    imageUrl: { type: String, trim: true },
    stock: { type: Number, required: true, min: 0, default: 0 },
    type: { type: String, required: true, trim: true },
    bestSeller: {
  type: Boolean,
  default: false,
}

}, { timestamps: true }     
);
export default mongoose.model('Product', productSchema);
