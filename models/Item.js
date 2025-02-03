const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    handle: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
    },
    vendor: {
        type: String,
    },
    type: {
        type: String,
    },
    tags: {
        type: String,
    },
    option1Name: {
        type: String,
    },
    option1Value: {
        type: String,
    },
    option2Name: {
        type: String,
        default: '',
    },
    option2Value: {
        type: String,
        default: '',
    },
    option3Name: {
        type: String,
        default: '',
    },
    option3Value: {
        type: String,
        default: '',
    },
    variantSKU: {
        type: String,
        default: null,
        unique: true
    },
    variantGrams: {
        type: Number,
    },
    variantInventoryTracker: {
        type: String,
    },
    variantInventoryQty: {
        type: Number,
    },
    variantInventoryPolicy: {
        type: String,
    },
    variantFulfillmentService: {
        type: String,
    },
    variantPrice: {
        type: Number,
    },
    variantCompareAtPrice: {
        type: String,
        default: '',
    },
    imageSrc: {
        type: String,
    },
}, { timestamps: true });

const Item = mongoose.model('Item', itemSchema);
module.exports = Item;