const User = require('../models/User');
const Kassa = require('../models/Kassa');
const Profit = require('../models/Profit');


const users = async (req, res) => {
    try {
        const start =  new Date (req.body.startDate);
        const end = new Date (req.body.endDate);

        const users  = await User.find({
            createdAt: {
                gte: req.body.start,
                lte: req.body.end,
            }
        });
    } catch (err) {
        res.status(500).send({
        message: err.message,
        });
    }
};
const kassaAndProfit = async (req, res) => {
    try {
        const kassas = await Kassa.find({
            createdAt: {
                gte: req.body.startDate,
                lte: req.body.endDate,
            }
        });
        const profits = await Profit.find({
            createdAt: {
                gte: req.body.startDate,
                lte: req.body.endDate,
            }
        });

        res.status(200).send({
            kassas,
            profits,
        });

    
    } catch (err) {
        res.status(500).send({
            message: err.message,
        });
    }
};


module.exports = {
    users,
    kassaAndProfit
};