const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const orderItemSchema = Schema({
    name: {
        type: String,
        minlength: [5, 'Panjang nama produk minimal 5 karakter'],
        required: [true, 'Nama produk harus diisi']
    },
    price: {
        type: Number,
        required: [true, 'Harga produk harus diisi']
    },
    qty: {
        type: Number,
        required: [true, 'Quantity harus diisi'],
        min: [1, 'Quantity minimal 1']
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    order: {
        type: Schema.Types.ObjectId,
        ref: 'Order'
    }
});

module.exports = model('OrderItem', orderItemSchema);