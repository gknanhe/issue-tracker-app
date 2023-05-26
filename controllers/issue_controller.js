// const { findById } = require('../models/project');
const Project = require('../models/project');
const Issue = require('../models/issue');
const { search } = require('../routes');
const Auther = require('../models/auther');
const { find } = require('../models/project');
//show all data on load
module.exports.showdata = async function (req, res) {
    console.log('body', req.params.id);

    try {
        let project = await Project.findById(req.params.id)
            .sort('-createdAt')
            .populate({
                path: 'issues',
                populate: {
                    path: 'issue',

                },

            }).
            populate({
                path: 'issues',
                populate: {
                    path: 'labels',

                },
            })


        let issues = await Issue.find({ project: req.params.id })
            .sort('-createdAt');
        // console.log(issues,'issues')

        let auther = await Auther.find({
            $or: [
                { project: req.params.id },
                { project: req.params.id }
            ]
        }).sort('-createdAt')

        // console.log(auther)
        return res.render('project_detail', {
            title: 'project issues',
            project: project,
            issues: issues,
            auther: auther
        })
    } catch (error) {
        console.log('Cant find project', error)
    }



}

//for create issue

module.exports.createIssue = async function (req, res) {
    console.log(req.body, 'body')
    // console.log('params', req.params.id);

    try {
        let project = await Project.findById(req.body.project)
        // console.log(project, 'project')
        if (project) {
            let issue = await Issue.create(req.body)

            // console.log(issue);

            project.issues.unshift(issue);
            await project.save();



            //store auther in authers schema

            let existingAuthor = await Auther.findOne({ auther: req.body.auther, project: req.params.id });
            let newAuther = ""
            if (existingAuthor) {
                // Author already exists for the project
                // You can use the existingAuthor object here or perform any other actions
                console.log('Author already exists:', existingAuthor);
            } else {
                // Author does not exist for the project
                // You can create a new author in the Author model for the project
                newAuther = await Auther.create({
                    auther: req.body.auther,
                    project: req.body.project
                });
                // });

            }
            // let auther = await Issue.find({
            //     $and: [
            //         {

            //             // $or: [
            //             //     { project: req.params.id },
            //             //     { project: req.params.id }
            //             //   ]
            //             $or: [
            //                 { auther: req.body.auther },
            //                 { auther: req.body.auther }
            //             ]
            //         },
            //         {
            //             $or: [
            //                 { project: req.params.id },
            //                 { project: req.params.id }
            //             ]

            //             // $or: [
            //             //     { auther: req.body.auther },
            //             //     { auther: req.body.auther }
            //             // ]
            //         }
            //     ]
            // })
            // console.log(auther)
            // let newAuther =""
            // if(auther.length<1){
            //     newAuther = await Auther.create({
            //         auther: req.body.auther,
            //         project: req.body.project
            //     });



            // }
            // else{
            //     console.log(" Auther exist" )

            // }
            // console.log("new Auther", newAuther)



            if (req.xhr) {
                console.log('returning data');
                return res.status(200).json({
                    data: {
                        issue: issue,
                        auther: newAuther
                    },
                    message: 'issue created',
                });
            }

            return res.redirect('back')
        }



    } catch (error) {
        console.log('cant create issue', error);
    }


};

//Result acc to search bar search

module.exports.searchData = async function (req, res) {


    // let pro = await project.find({});
    // console.log(pro)

    // console.log(project.issues[0].labels,'home')

    // let serach = await  Project.find({ auther: { $regex: "g", $options: "i" } })
    // let serach = await  Issue.find( { issue: { $regex: "fix", $options: "i" } });

    // let serach = await  Issue.find( { issue: "f" ,project:req.params.id});


    // let serach = await  Issue.find({
    //     $or: [ {issue : { $regex: "fix", $options: 'i' }}, { project: req.params.id } ]
    // });
    // console.log(' issue', issue)

    console.log(req.params, 'params');

    let search = await Issue.find({

        $and: [
            {

                // $or: [
                //     { project: req.params.id },
                //     { project: req.params.id }
                //   ]
                $or: [
                    { issue: { $regex: req.params.searchText, $options: "i" } },
                    { discription: { $regex: req.params.searchText, $options: "i" } }
                ]
            },
            {
                $or: [
                    { project: req.params.id },
                    { project: req.params.id }
                ]
            }
        ]
    });

    // console.log('serach result', search)


    if (req.xhr) {
        console.log('returning data');
        return res.status(200).json({
            data: {
                issue: search,
            },
            message: 'searched issues',
        });
    }



    return res.redirect('back')



}


//result if length < 1 
module.exports.data = async function (req, res) {


    console.log(' inside data')

    console.log(req.params, 'params in data');

    //find all res of project 
    let search = await Issue.find({
        $or: [{ project: req.params.id }, { project: req.params.id }]
    });




    // console.log('old res', search)

    //return if found
    if (req.xhr) {
        console.log('returning data of data');
        return res.status(200).json({
            data: {
                issue: search,
            },
            message: 'searched issues',
        });
    }



    return res.redirect('back')



}



module.exports.auther = async function (req, res) {

    console.log('body of auther', req.query)


    let filter = await Issue.find(
        {
            $and: [
                {


                    $or: [
                        { auther: req.query.auther },
                        { auther: req.query.project }
                    ]
                },
                {
                    $or: [
                        { project: req.query.project },
                        { project: req.query.project }
                    ]
                }
            ]
        }
    );

    console.log(filter, "filtered result");



    if (req.xhr) {
        console.log('returning data of data');
        return res.status(200).json({
            data: {
                issue: filter,
            },
            message: 'searched issues',
        });
    }

    return res.redirect('back')


}

//filter for labels
module.exports.label = async function (req, res) {

    console.log('body of labels', req.query)
    let filter = await Issue.find({ labels: { $in: req.query.labels } , project: req.query.project
    });


    console.log(filter, "filtered result");



    if (req.xhr) {
        console.log('returning data of data');
        return res.status(200).json({
            data: {
                issue: filter,
            },
            message: 'searched issues',
        });
    }

    return res.redirect('back')


}