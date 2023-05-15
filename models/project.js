const mongoose = require('mongoose');


const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true,
    },

    auther: {
        type: String,
        required: true
    },

    discription: {
        type: String,
        required: true,
    },
    issues: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Issue'
        },

    ]

}, {
    timestamps: true
});


const Project = mongoose.model('Project', projectSchema);

module.exports = Project;