//DOM elements
const guideList =  document.querySelector('.guides'); 
const LoggedOutLinks = document.querySelectorAll('.logged-out')
const LoggedInLinks = document.querySelectorAll('.logged-in') 


//setup the guides 
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
}

const setupGuides = (data) => {

  if (data.length) { // making sure someone is logged in by chechiking if the array is empty or not  
    // using Firestore to retrive data on the Guidelist
    let html = '';
    data.forEach(doc => {
      const guide = doc.data();
      const li = `
      <li>
      <div class="collapsible-header grey lighten-4">${guide.title}</div> 
      <div class="collapsible-body white">${guide.content}</div>
      </li>
      `;
      html += li;
    });
    guideList.innerHTML = html;
  } else {
    guideList.innerHTML = '<h6 class="center-align"> login ya bum </h6>';
  }
}


// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);
}); 

