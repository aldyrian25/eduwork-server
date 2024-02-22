const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const bcrypt = require('bcrypt');

let userSchema = Schema(
    {
        full_name: {
            type: String,
            required: [true, 'nama harus diisi'],
            maxlength: [255, 'panjang nama harus antara 3 - 255 karakter'],
            minlength: [3, 'panjang nama harus antara 3-255 karakter'],
        },

        customer_id: {
            type: Number,
        },

        email: {
            type: String,
            required: [true, 'email harus diisi'],
            maxlength: [255, 'panjang email maksimal 255 karakter'],
        },

        password: {
            type: String,
            required: [true, 'password harus diisi'],
            maxlength: [255, 'panjang password maksimal 255 karakter'],
        },

        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
        },

        token: [String],
    },
    { timestamps: true }
);

userSchema.index({ email: 1 });

userSchema.path('email').validate(
    function (value) {
        const EMAIL_RE = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        return EMAIL_RE.test(value);
    },
    (attr) => `${attr.value} harus merupakan email yang benar`
);

userSchema.path('email').validate(
    async function (value) {
        try {
            //(1) lakukan pencarian ke _collection_ user berdasarkan 'email'
            const count = await this.model('User').countDocuments({ email: value });
            //(2) kode ini mengindikasikan bahwa jika user ditemukan akan mengembalikan false jika tidak mengembalikan akan mengembalikan true
            // jika false maka validasi gagal
            // jika true maka validasi berhasil

            return !count;
        } catch (err) {
            throw err;
        }
    },
    (attr) => `${attr.value} sudah terdaftar`
);

// userSchema.path('email').validate(
//     async function (value) {
//         try {
//             const existingUser = await this.model('User').findOne({ email: value });
//             return !existingUser; // Validasi gagal jika user ditemukan
//         } catch (err) {
//             throw err;
//         }
//     },
//     (attr) => `${attr.value} sudah terdaftar`
// );


const HASH_ROUND = 10;
userSchema.pre('save', function (next) {
    this.password = bcrypt.hashSync(this.password, HASH_ROUND);
    next();
});

userSchema.plugin(AutoIncrement, { inc_field: 'customer_id' });

module.exports = model('User', userSchema);

