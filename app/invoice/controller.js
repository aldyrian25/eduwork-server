const {subject} = require('@casl/ability');
const Invoice = require('./model');
const {policyFor} = require('../../utils');

const show = async (req, res, next) => {
    try {
        let {order_id} = req.params;
        let invoice = await Invoice.findOne({order: order_id}).populate('order').populate('user');

        // Pastikan invoice tidak kosong
        if (!invoice) {
            return res.status(404).json({
                error: 1,
                message: `Invoice not found`
            });
        }
        
        let policy = policyFor(req.user);
        let subjectInvoice = subject('Invoice', {...invoice, user_id: invoice.user._id});
        if(!policy.can('read', subjectInvoice)){
            return res.json({
                error: 1,
                message: `You're not allowed to perform this action`
            });
        }
        
        return res.json(invoice);
    } catch (err) {
        return res.status(500).json({
            error: 1,
            message: `Error when getting invoice: ${err.message}`
        });
    }
}

module.exports = {show};
