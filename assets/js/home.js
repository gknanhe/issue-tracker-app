
console.log('connected')
// model js 

document.querySelector("#show-login").addEventListener("click",function(){
    document.querySelector(".popup").classList.add("active");
  });
  document.querySelector(".popup .close-btn").addEventListener("click",function(){
    document.querySelector(".popup").classList.remove("active");
  });

// end here


//code for project list

{
  let createProject = function(){
    let newProjectForm = $('#new-project-form');
    newProjectForm.submit(function(e){
      e.preventDefault();


      $.ajax({
        type: 'post', 
        url: '/create/project',
        data: newProjectForm.serialize(),
        success: function( data ){
          console.log('inside success', data.data.project)
          let newProject = newProjectDom(data.data.project);
          $('#project-list-container').prepend(newProject);
        },
        error: function(error){
          console.log(error.responseText);
        }
      });

      // document.querySelector(".popup #submit-btn").addEventListener("click",function(){
        console.log('clciked');
        document.querySelector("#project").value = "";
        document.querySelector("#auther").value = "";
        document.querySelector("#discription").value = "";

        document.querySelector(".popup").classList.remove("active");
      // })

    })
  }

let newProjectDom = function(project){

  return $(`<div class="issue-conatiner">
  <div class="project-name">

      <p>
          Project Name : ${project.name }
      </p>
  </div>
  <div class="auther-discription">
      <div class="authername">
          <p>
              Auther: <span> ${project.auther }</span>
          </p>
      </div>
      
  </div>
  <div class="open-btn">
  <a href="/project/showProject/${project._id }">
            <input type="button" value="Open">
        </a>
</div>
</div>`)
}


  createProject();
}