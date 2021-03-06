const { Place } =  require("../models/place");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.create = (req, res) => {
    //console.log("CREATE ORDER: ", req.body)
    //req.body.order.user = req.profile
    const order = new Place(req.body.place)
    place.save((error, data) => {
        if(error) {
            return res.status(400).json({
                error: errorHandler(error)
            })
        }
        res.json(data)
    })

}

exports.listOrders = (req, res) => {
        Place.find()
        .populate('user', '_id name address ')
        .sort('-created')
        .exec((err, places) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(error)
                })
            }
            res.json(places)
        })
} 