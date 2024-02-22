const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const cartItemSchema = Schema({
    name: {
        type: String,
        minlength: [5, 'Panjang nama produk minimal 3 karakter'],
        required: [true, 'Nama produk harus diisi']
    },
    qty: {
        type: Number,
        min: [1, 'Quantity minimal 1'],
        required: [true, 'Quantity harus diisi']
    },
    price: {
        type: Number,
        default: 0
    },
})