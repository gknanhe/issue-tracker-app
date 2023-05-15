const mongoose = require('mongoose');


const autherSchema = new mongoose.Schema({
   

    auther: {
        type: String,
        required: true
    },

    
    project: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Project'
    }
}, {
    timestamps: true
});


const Auther = mongoose.model('Auther', autherSchema);

module.exports = Auther;