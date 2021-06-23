//resume at 32:59  https://www.youtube.com/watch?v=KyWaXA_NvT0

const Transaction = require('../models/Transaction')

//@desc Get all transactions
// @route GET /api/v1/transactions
//@access Public
exports.getTransactions =  async (req, res, next) => {
    try {
        const transactions = await Transaction.find();
        return res.status(200).json({
            success: true,
            count: transactions.length,
            data: transactions
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });   
    }
}

//@desc add transactions
// @route POST /api/v1/transactions
//@access Public
exports.addTransaction = async (req, res, next) => {

    try {
        //console.log(req.body)
        const { text, amount } = req.body; //need to add middleware "app.use(express.json())" before req.body can be used
        //this destructuring though is not needed cuz text and amount is not used.

        const transaction = await Transaction.create(req.body);
        return res.status(201).json({ //res.status not res.send
            success: true,
            data: transaction
        });
    } catch (err) {
        if(err.name === 'ValidationError'){
            const messages = Object.values(err.errors).map(val => val.message);
            return res.status(400).json({
                success: false,
                error: messages
            })
        } else{
            return res.status(500).json({
                success: false,
                error: 'Server Error'
            })
        }
    }
}


//@desc Delete all transactions
// @route DELETE /api/v1/transactions
//@access Public
exports.deleteTransaction = async (req, res, next) => {
    try {
        //console.log(req.params.id)
        const transaction = await Transaction.findById(req.params.id);
        if (!transaction) {
            return res.stauts(404).json({
                success: false,
                error: 'No transaction found'
            });
        }
        await transaction.remove();
        
        return res.status(200).json({
            success: true,
            data: {}
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        })
    }
}