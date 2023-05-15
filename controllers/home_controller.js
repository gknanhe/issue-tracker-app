const { CallTracker } = require("assert");
const Project = require('../models/project');




module.exports.home = async function(req, res){

    try {
        let projects = await Project.find({})
        .sort('-createdAt');

        


        return res.render('home', {
            title: 'Issue Tracker',
            projects : projects,
        });
    } catch (error) {
        
    }
    
        

}