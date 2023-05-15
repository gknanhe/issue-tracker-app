const Project = require('../models/project');
const Issue = require('../models/issue');


module.exports.createProject = async function(req, res){
console.log('body', req.body);

    try {
        let project = await Project.create({
            name: req.body.name,
            auther: req.body.auther,
            discription: req.body.discription
        });



        if(req.xhr){
            console.log('returning data');
            return res.status(200).json({
                data:{
                    project : project,
                },
                message: 'project created',
            });
        }


        console.log('project', project)
        return res.redirect('back');
    } catch (error) {
        console.log('Error in creating project', error )
    }
}