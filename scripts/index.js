const Toast = {
  init() {
    this.hideTimeout = null;

    this.el = document.createElement("div");
    this.el.className = "toast";
    document.body.appendChild(this.el);
  },

  show(message, state) {
    clearTimeout(this.hideTimeout);

    this.el.textContent = message;
    this.el.className = "toast toast--visible";

    if (state) {
      this.el.classList.add(`toast--${state}`);
    }

    this.hideTimeout = setTimeout(() => {
      this.el.classList.remove("toast--visible");
    }, 3000);
  }
};

document.addEventListener("DOMContentLoaded", () => Toast.init());



//DOM elements  
const guideList =  document.querySelector('.guides'); 
const LoggedOutLinks = document.querySelectorAll('.logged-out')
const LoggedInLinks = document.querySelectorAll('.logged-in')  
const AdminGroup = new Set(["3pzeFktiklac4l43F87Hq0OF1sS2"])  




//setup the Navbar UI 
const setupUI = (user) =>  { 
    if (user) { 
        // toggle UI elements 
        LoggedInLinks.forEach(item => item.style.display = 'block');      //A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the list.Performs the specified action for each node in an list.
        LoggedOutLinks.forEach(item => item.style.display = 'none'); 
       } 
    else {  
      LoggedInLinks.forEach(item => item.style.display = 'none');      
      LoggedOutLinks.forEach(item => item.style.display = 'block');
    } 
    if (AdminGroup.has(user.uid)) { 
      document.getElementById("IsAdmin").style.display = 'block';
    } 
    else { 
      document.getElementById("IsAdmin").style.display = 'none'; 
    }
}

const setupGuides = (data) => {
  if (data.length) { // making sure someone is logged in by chechiking if the array is empty or not  
    // using Firestore to retrive data on the Guidelist
    let html = '<div id="card-collection">'; 
    console.log (data); 
    data.forEach(doc => {
      const guide = doc.data();
      const li = ` 
     
      <div class="card">
        <div class="card-content"  >
          <span class="card-title activator grey-text text-darken-4"> ${guide.title}<i class="material-icons right">more_vert</i></span>
          <p><a href="${guide.link}">This is a link</a></p>
        </div>
        <div class="card-reveal">
          <span class="card-title grey-text text-darken-4"> ${guide.title}<i class="material-icons right">close</i></span>
          <p>${guide.content}</p>
        </div> 
        <a class="btn-floating btn-medium waves-effect waves-light red" style="position:relative; right:-250px; top:125px;"><i class="material-icons">add</i></a>
      </div>
      `;

      html += li;
    });

    html += '</div>' 
    guideList.innerHTML = html;
  } else {
    guideList.innerHTML = '<h6 class="center-align"> Login or Register to Continue </h6>';
  }
}


// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);
}); 

