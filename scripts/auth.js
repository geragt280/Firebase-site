//get data - asynchronous task 

//callback function that t\sends back a [snapshot] of the below collection 
cuser = null

//listen for auth status changes  
auth.onAuthStateChanged(user => { 
    if (user) { 
        db.collection('guides').get().then(snapshot => {  // goes and gets a handle on the guides collection  s
            cuser = user
            setupGuides(snapshot.docs); 
            setupUI(user); 
        }) 
    } else { 
        setupUI();
        setupGuides([]); //this fire bcuz there was a state change in user authentication meaning when users are logged in guidelist pops out -- empty array becauseI dont need an output
    }
}); 


//signup 
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {  
    e.preventDefault();  

    //get user info 
    const email =  signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value; 

    // console.log(email, password); For checking if the users who signup get saved in the console 

    //sign up the user  
    auth.createUserWithEmailAndPassword(email, password).then(cred => { 
        const modal =  document.querySelector('#modal-signup') 
        M.Modal.getInstance(modal).close(); 
        signupForm.reset();
    })
})

//logout 
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => { e.preventDefault(); 
auth.signOut()}); 

//login 
const loginForm = document.querySelector('#login-form');  
loginForm.addEventListener('submit', (e) =>  { 
    e.preventDefault();  

    //get user info 
    const email = loginForm['login-email'].value;
    const password = loginForm ['login-password'].value; 

    auth.signInWithEmailAndPassword(email, password).then(cred => { 
        
        //close the loging modal and reset the form 
        const modal =  document.querySelector('#modal-login') 
        M.Modal.getInstance(modal).close(); 
        loginForm.reset();
    })
})

