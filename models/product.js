const mongoose = require('mongoose')


const productSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    introduc: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    pic: {
        type: String,
        required: true
    },
    month: {
        type: Number,
        default: (new Date()).getMonth() + 1
    },
    data: {
        type: Number,
        default: (new Date()).getDate()

    }

})

const Product = mongoose.model('Product', productSchema)
module.exports = Product