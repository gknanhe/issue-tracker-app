
//modal js
document.querySelector("#show-login").addEventListener("click", function () {
  document.querySelector(".popup").classList.add("active");
  document.querySelector('.issue-conatiner').innerHTML ="" ;

  fetchdata(searchForm.dataset.projectid);
});
document.querySelector(".popup .close-btn").addEventListener("click", function () {
  document.querySelector(".popup").classList.remove("active");
});

// let issueForm = $('#show-login');
//   issueForm.addEventListener('click', function(){
//   document.querySelector('.issue-conatiner').innerHTML ="" ;

//   fetchdata(searchForm.dataset.projectid)
// })

//dropdown css js
(function ($) {
  var CheckboxDropdown = function (el) {
    var _this = this;
    this.isOpen = false;
    this.areAllChecked = false;
    this.$el = $(el);
    this.$label = this.$el.find('.dropdown-label');
    //   this.$checkAll = this.$el.find('[data-toggle="check-all"]').first();
    this.$inputs = this.$el.find('[type="checkbox"]');

    this.onCheckBox();

    this.$label.on('click', function (e) {
      e.preventDefault();
      _this.toggleOpen();
    });

    //   this.$checkAll.on('click', function(e) {
    //     e.preventDefault();
    //     _this.onCheckAll();
    //   });

    this.$inputs.on('change', function (e) {
      _this.onCheckBox();
    });
  };

  CheckboxDropdown.prototype.onCheckBox = function () {
    this.updateStatus();
  };

  CheckboxDropdown.prototype.updateStatus = function () {
    var checked = this.$el.find(':checked');

    this.areAllChecked = false;
    //   this.$checkAll.html('Check All');

    if (checked.length <= 0) {
      this.$label.html('Select Options');
    }
    else if (checked.length === 1) {
      this.$label.html(checked.parent('label').text());
    }
    else if (checked.length === this.$inputs.length) {
      this.$label.html('All Selected');
      this.areAllChecked = true;
      // this.$checkAll.html('Uncheck All');
    }
    else {
      this.$label.html(checked.length + ' Selected');
    }
  };

  CheckboxDropdown.prototype.onCheckAll = function (checkAll) {
    if (!this.areAllChecked || checkAll) {
      this.areAllChecked = true;
      this.$checkAll.html('Uncheck All');
      this.$inputs.prop('checked', true);
    }
    else {
      this.areAllChecked = false;
      this.$checkAll.html('Check All');
      this.$inputs.prop('checked', false);
    }

    this.updateStatus();
  };

  CheckboxDropdown.prototype.toggleOpen = function (forceOpen) {
    var _this = this;

    if (!this.isOpen || forceOpen) {
      this.isOpen = true;
      this.$el.addClass('on');
      $(document).on('click', function (e) {
        if (!$(e.target).closest('[data-control]').length) {
          _this.toggleOpen();
        }
      });
    }
    else {
      this.isOpen = false;
      this.$el.removeClass('on');
      $(document).off('click');
    }
  };

  var checkboxesDropdowns = document.querySelectorAll('[data-control="checkbox-dropdown"]');
  for (var i = 0, length = checkboxesDropdowns.length; i < length; i++) {
    new CheckboxDropdown(checkboxesDropdowns[i]);
  };

  
  // CheckboxDropdown.prototype.resetDropdown = function () {
  //   this.$inputs.prop('checked', false);
  //   this.updateStatus();
  // };

  // var checkboxesDropdowns = document.querySelectorAll('[data-control="checkbox-dropdown"]');
  // for (var i = 0, length = checkboxesDropdowns.length; i < length; i++) {
  //   new CheckboxDropdown(checkboxesDropdowns[i]);
  // }

  // // Example usage: Reset the dropdown after AJAX success
  // function resetDropdownAfterAjax() {
  //   var $dropdown = $('[data-control="checkbox-dropdown"]');
  //   var checkboxDropdown = $dropdown.data('checkboxDropdown');
  //   checkboxDropdown.resetDropdown();
  // }

  // // Make sure to call this function after your AJAX request is successful
  // resetDropdownAfterAjax();


  
})(jQuery);

// end here








// main js 

// show data 

{
  //send Req by ajax
  // let createIssue = function () {
    let newIssueForm = $('#new-issue-form');
    
    newIssueForm.submit(function (e) {
      e.preventDefault();
      
      console.log('inside ')

      $.ajax({
        type: 'post',
        url: '/createIssue/issue',
        data: newIssueForm.serialize(),
        success: function (data) {
          // console.log('inside success', data.data.issue)
          // console.log('auther',data.data.auther)
          let newProject = newProjectDom(data.data.issue);
          if(data.data.auther.auther != "undefined"){
            let newAuther = newAutherDom(data.data.auther.auther);
            $(' #hidden-text').after(newAuther);

          }
          $('.issue-conatiner').prepend(newProject);
        },
        error: function (error) {
          console.log(error.responseText);
        }
      });

      $('#new-issue-form')[0].reset();


      //remove popup
      console.log('clicked');
      // document.querySelector("#title").value = "";
      // document.querySelector("#auther").value = "";
      // document.querySelector("#discription").value = "";
      // let checked = document.querySelectorAll(".dropdown-option input") ;
      // for(i of checked){
      //   i.checked= false;
      // };
      
      document.querySelector(".popup").classList.remove("active");

      

    })
  }

  let newAutherDom = function(auther){
    
    return (`<option value ="${auther}" > ${auther} </option>`);
  }

  //create html 
  let newProjectDom = function (issue) {
    let label = "";
    // console.log(issue)
    for(var i = 0; i < issue.labels.length; i++){ 

    // for (i of issue.labels) {
      label += `<p id="${issue.labels[i]}" data-label="${issue.labels[i]}"> ${issue.labels[i]} </p>`
    }



    return $(`<div class="issue-list-container">

  <div class="labels">

      
      ${label}
     
  </div>
  <div class="issue-list">
      <div class="name-auther">

          <div class="issue-title">
              Issue: ${issue.issue}  
          </div>
          <div class="auther-name">
              Auther : ${issue.auther}
          </div>

      </div>
      <hr>
      <div class="discription-container">
          Discription : ${issue.discription}

      </div>
  </div>

</div>`)
  }

  // createIssue();


// }

//set label color accordingly
let labels = $('.labels p');
for (i of labels) {
  let label = i.dataset.label;
  if (label === "bug") {
    i.style.backgroundColor = "#321820";
    i.style.color = "#e67250";
    i.style.border = "1px solid #694048";
  }

  if (label === "enhancement") {
    i.style.backgroundColor = "#28393e";
    i.style.color = "#72ddd2";
    i.style.border = "1px solid #4b7073";
  }

  if (label === "ui enhancement") {
    i.style.backgroundColor = "#1f1e41";
    i.style.color = "#b2a7ed";
    i.style.border = "1px solid #4f4d7a";
  }

  if (label === "documentation") {
    i.style.backgroundColor = "#0b2337";
    i.style.color = "#26a5ff";
    i.style.border = "1px solid #174d73";
  }

  if (label === "invalid") {
    i.style.backgroundColor = "#343726";
    i.style.color = "#daca49";
    i.style.border = "1px solid #696c39";
  }

}



//search issue
const fetchIssue = async(searchText, proId) => {

  $.ajax({
    type: 'get',
    url: `/search/searchRes/${searchText}/${proId}`,
    // data: newIssueForm.serialize(),
    success: function (data) {
      // console.log('inside success', data.data.issue)
      for(i of data.data.issue){

        let newProject = newProjectDom(i);
      $('.issue-conatiner').prepend(newProject);

      }

      if(data.data.issue.length<1){
        document.querySelector('.issue-conatiner').innerHTML ="No result found" ;

      }
      
    },
    error: function (error) {
      console.log(error.responseText);
    }
  });




  // let url = `https://www.superheroapi.com/api.php/1385721125518961/search/${searchText}`;
  // try{

  //     const response = await fetch(url);
  //     allData = await response.json();
  //     if(allData.response === 'success'){
  //         // console.log(allData);

  //         showSearchList(allData.results);
  //     }
  // } catch(error){
  //     console.log(error);
  // }
}

// if length < 1 show  all res acc
const fetchdata = async function(id){

  $.ajax({
    type: 'get',
    url: `/old/oldRes/${id}`,
    // data: newIssueForm.serialize(),
    success: function (data) {
      // console.log('inside success', data.data.issue)
      for(i of data.data.issue){

        let newProject = newProjectDom(i);
      $('.issue-conatiner').prepend(newProject);

      }
      
    },
    error: function (error) {
      console.log(error.responseText);
    }
  });  
}

// on keytype send req
const searchForm = document.querySelector('#issue-search');

searchForm.addEventListener('keyup', () => {
  //show res acc to search bar search
  // console.log(searchForm.value, searchForm.dataset.projectid )

  let allhtml = document.querySelector('.issue-conatiner').innerHTML ;

  if(searchForm.value.length > 1){

      document.querySelector('.issue-conatiner').innerHTML ="" ;

      fetchIssue(searchForm.value, searchForm.dataset.projectid);
 
    } else if(searchForm.value.length <= 1) {
      //if length <1 the show all res

      document.querySelector('.issue-conatiner').innerHTML ="" ;

      fetchdata(searchForm.dataset.projectid)


  }
});



//Filter 

//modal js for label btn
document.querySelector("#label-btn").addEventListener("click", function () {
  document.querySelector(".label-popup").classList.add("active");
});
document.querySelector(".label-popup .close-btn").addEventListener("click", function () {
  document.querySelector(".label-popup").classList.remove("active");
});


//modal js for auther btn
document.querySelector("#auther-btn").addEventListener("click", function () {
  document.querySelector(".auther-popup").classList.add("active");
});
document.querySelector(".auther-popup .close-btn").addEventListener("click", function () {
  document.querySelector(".auther-popup").classList.remove("active");
});



//filter by auther

let newAutherForm = $('#auther-filter-form');
newAutherForm.submit(function (e) {
  e.preventDefault();
  console.log('inside auther filter')

  $.ajax({
    type: 'get',
    url: '/filter/auther',
    data: newAutherForm.serialize(),
    success: function (data) {
      document.querySelector('.issue-conatiner').innerHTML ="" ;

      // console.log('inside success', data.data.issue)
      for(i of data.data.issue){
        // console.log(i,'issue of filter')
        let newProject = newProjectDom(i);
      $('.issue-conatiner').prepend(newProject);

      }
      $('#auther-filter-form')[0].reset();

    },
    error: function (error) {
      console.log(error.responseText);
    }
  });

  document.querySelector(".auther-popup").classList.remove("active");

});



//filter by label

let newLabelForm = $('#label-filter-form');
newLabelForm.submit(function (e) {
  e.preventDefault();
  console.log('inside label filter')

  $.ajax({
    type: 'get',
    url: '/filter/labels',
    data: newLabelForm.serialize(),
    success: function (data) {
      document.querySelector('.issue-conatiner').innerHTML ="" ;

      console.log('inside success', data.data.issue)
      for(i of data.data.issue){
        // console.log(i,'issue of filter')
        let newProject = newProjectDom(i);
      $('.issue-conatiner').prepend(newProject);

      }
      $('#label-filter-form')[0].reset();


    },
    error: function (error) {
      console.log(error.responseText);
    }
  });

  document.querySelector(".label-popup").classList.remove("active");

});



