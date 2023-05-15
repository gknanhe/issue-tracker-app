const mongoose = require('mongoose');


const issueSchema = new mongoose.Schema({
    issue: {
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
    labels: [
        {
          type: String,
          trim: true,
          required: true,
        },
      ],
    project: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Project'
    }
}, {
    timestamps: true
});


const Issue = mongoose.model('Issue', issueSchema);

module.exports = Issue;