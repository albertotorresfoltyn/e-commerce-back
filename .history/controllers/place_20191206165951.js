const  Place  =  require("../models/place");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.create = (req, res) => {
    const place = new Place(req.body.place)
    place.save((error, data) => {
        if(error) {
            return res.status(400).json({
                error: errorHandler(error)
            })
        }
        res.json(data)
    })

}

exports.list = (req, res) => {
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