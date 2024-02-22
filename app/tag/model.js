const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const tagSchema = Schema({
    name: {
        type: String,
        minlength: [3, 'Panjang nama Tag minimal 3 karakter'],
        maxlength: [20, 'Panjang nama Tag maksimal 20 karakter'],
        required: [true, 'Nama Tag harus diisi'],
    },
});

module.exports = model('Tag', tagSchema);
