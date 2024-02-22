const mongoose = require('mongoose');
const { model, Schema } = mongoose;
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Invoice = require('../invoice/model');
const { parse } = require('dotenv');

const orderSchema = Schema({
    status: {
        type: String,
        enum: ['waiting_payment', 'processing', 'in_delivery', 'cancel'],
        default: 'waiting_payment'
    },

    delivery_fee: {
        type: Number,
        default: 0
    },

    delivery_address:{
        provinsi: {type: String, required: [true, 'Provinsi harus diisi']},
        kabupaten: {type: String, required: [true, 'Kabupaten harus diisi']},
        kecamatan: {type: String, required: [true, 'Kecamatan harus diisi']},
        detail: {type: String}
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    order_items: [
        {
            type: Schema.Types.ObjectId,
            ref: 'CartItem'
        }
    ],
}, {timestamps: true});

ordedSchema.plugin(AutoIncrement, {inc_field: 'order_number'});
orderSchema.virtual('items_count').get(function(){
    return this.order_items.reduce((total, item) => total + parseInt(item.qty), 0);
})
