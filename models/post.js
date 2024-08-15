const mongoose = require('mongoose');

// Define enums for Type and Property
const TypeEnum = {
    BUY: 'buy',
    RENT: 'rent',
};

const PropertyEnum = {
    APARTMENT: 'apartment',
    HOUSE: 'house',
    CONDO: 'condo',
    LAND: 'land',
};

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    images: [{
        type: String,
        required: true,
    }],
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    bedroom: {
        type: Number,
        required: true,
    },
    bathroom: {
        type: Number,
        required: true,
    },
    latitude: {
        type: String,
        required: true,
    },
    longitude: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: Object.values(TypeEnum),
        required: true,
    },
    property: {
        type: String,
        enum: Object.values(PropertyEnum),
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Register', // Reference to User model
        required: true,
    },
    postDetail: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PostDetail', // Reference to PostDetail model (optional)
    },
    savedPosts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SavedPost', // Reference to SavedPost model
    }],
});

// Create a model from the schema
const Post = mongoose.model('Post', postSchema);

module.exports = Post;
