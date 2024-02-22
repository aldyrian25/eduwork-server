const { Schema, model } = require('mongoose');

const deliveryAddressSchema = Schema(
    {
        nama: {
            type: String,
            required: [true, 'nama alamat harus diisi'],
            maxlength: [255, 'panjang maksimal nama alamat adalah 255 karakter'],
        },

        kelurahan: {
            type: String,
            required: [true, 'kelurahan harus diisi'],
            maxlength: [255, 'panjang maksimal kelurahan adalah 255 karakter'],
        },

        kecamatan: {
            type: String,
            required: [true, 'kecamatan harus diisi'],
            maxlength: [255, 'panjang maksimal kecamatan adalah 255'],
        },

        kabupaten: {
            type: String,
            required: [true, 'kabupaten harus diisi'],
            maxlength: [255, 'panjang maksimal kabupaten adalah 255 karakter'],
        },

        provinsi: {
            type: String,
            required: [true, 'provinsi harus diisi'],
            maxlength: [255, 'panjang maksimal provinsi adalah 255 karakter'],
        },

        detail: {
            type: String,
            required: [true, 'Detail alamat harus diisi'],
            maxlength: [1000, 'panjang maksimal detail alamat adalah 1000 karakter'],
        },

        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    { timestamps: true }
);

module.exports = model('DeliveryAddress', deliveryAddressSchema);
