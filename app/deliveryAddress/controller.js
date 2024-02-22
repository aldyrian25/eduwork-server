const DeliveryAddress = require('./model');

const store = async (req, res, next) => {
    try {
        let payload = req.body;
        let user = req.user;
        let address = await new DeliveryAddress({ ...payload, user: user._id });
        await address.save();
        return res.json(address);
    } catch (err) {
        if (err && err.name === 'ValidationError') {
            return res.status(400).json({
                error: 1,
                message: err.message,
                fields: err.errors,
            });
        }
        next(err);
    }
};
const index = async (req, res, next) => {
    try {
        const user = req.user;
        const deliveryAddresses = await DeliveryAddress.find({ user: user._id });
        return res.json(deliveryAddresses);
    } catch (err) {
        next(err);
    }
};

const update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const payload = req.body;
        const user = req.user;

        const updatedAddress = await DeliveryAddress.findOneAndUpdate({ _id: id, user: user._id }, payload, { new: true });

        if (!updatedAddress) {
            return res.status(404).json({ error: 1, message: 'Alamat pengiriman tidak ditemukan' });
        }

        return res.json(updatedAddress);
    } catch (err) {
        if (err && err.name === 'ValidationError') {
            return res.status(400).json({
                error: 1,
                message: err.message,
                fields: err.errors,
            });
        }
        next(err);
    }
};

const destroy = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = req.user;

        const deletedAddress = await DeliveryAddress.findOneAndDelete({ _id: id, user: user._id });

        if (!deletedAddress) {
            return res.status(404).json({ error: 1, message: 'Alamat pengiriman tidak ditemukan' });
        }

        return res.json(deletedAddress);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    store,
    index,
    update,
    destroy,
};
