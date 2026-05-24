let isLogin = false;

function switchMode(){

  isLogin = !isLogin;

  if(isLogin){

    document.getElementById("formTitle").innerText = "Login";

    document.getElementById("createFields").style.display = "none";
    document.getElementById("createBtn").style.display = "none";

    document.getElementById("loginBtn").style.display = "block";
    document.getElementById("loginInputBox").style.display = "block";

    document.getElementById("switchText").innerText =
      "Don't have account? Create one";

  } else {

    document.getElementById("formTitle").innerText = "Create Account";

    document.getElementById("createFields").style.display = "block";
    document.getElementById("createBtn").style.display = "block";

    document.getElementById("loginBtn").style.display = "none";
    document.getElementById("loginInputBox").style.display = "none";

    document.getElementById("switchText").innerText =
      "Already have account? Login";
  }
}

function registerUser(){

  let username =
  document.getElementById("username").value;

  let dob =
  document.getElementById("dob").value;

  let email =
  document.getElementById("email").value;

  let password =
  document.getElementById("password").value;

  let selectedDate =
  new Date(dob);

  let today =
  new Date();

  if(selectedDate > today){

    alert("Invalid Date Of Birth ❌");
    return;

  }

  if(password.length < 6){

    alert(
      "Password must be 6+ characters ❌"
    );

    return;

  }

  db.collection("users")
  .where("username", "==", username)
  .get()

  .then((querySnapshot)=>{

    if(!querySnapshot.empty){

      alert("Username already taken ❌");
      return;

    }

    auth.createUserWithEmailAndPassword(
      email,
      password
    )

    .then((userCredential)=>{

      let user = userCredential.user;
      
      db.collection("users")
        .doc(user.uid)
        .set({
          
          username:username,
          
          email:email,
          
          doubtsAsked:0,
          
          notesUploaded:0,
          
          dailyStreak:1,

          profileCompleted:false
        
        })
        
        .then(()=>{

        localStorage.setItem(
          "studyxflowUser",
          "logged"
        );

        document.getElementById(
          "registerScreen"
        ).style.display="none";

      });

    })

    .catch((error)=>{

      alert(error.message);

    });

  });

}

function loginUser(){

  let loginValue =
  document.getElementById("loginInput").value;

  let password =
  document.getElementById("password").value;

  if(loginValue.trim() === "" ||
     password.trim() === ""){

    alert("Enter username/email and password ❌");
    return;

  }

  
  let query;

  if(loginValue.includes("@")){

    query = db.collection("users")
    .where("email", "==", loginValue)
    .get();

  } else {

    query = db.collection("users")
    .where("username", "==", loginValue)
    .get();

  }

  query.then((querySnapshot)=>{

    if(querySnapshot.empty){

      alert("User not found ❌");
      return;

    }

    let userData =
    querySnapshot.docs[0].data();

    let email = userData.email;

    auth.signInWithEmailAndPassword(
      email,
      password
    )

    .then(()=>{

      localStorage.setItem(
        "studyxflowUser",
        "logged"
      );

      document.getElementById(
        "registerScreen"
      ).style.display="none";

    })
      

    .catch((error)=>{
      alert(error.message);
    });

  });

}

function togglePassword(){

  let passwordInput =
  document.getElementById("password");

  if(passwordInput.type === "password"){

    passwordInput.type = "text";

  } else {

    passwordInput.type = "password";

  }

}

function logoutUser(){

  auth.signOut()

  .then(()=>{

    localStorage.removeItem(
      "studyxflowUser"
    );

    location.reload();

  });

}
