/* MENU */

function toggleMenu(){
  document.getElementById("menu")
  .classList.toggle("active");
}

/* OPEN REGISTER */

function openRegister(){

  document.getElementById("welcomeScreen")
  .style.display="none";

  document.getElementById("registerScreen")
  .style.display="flex";

}

window.onload=function(){

  let today =
  new Date().toISOString().split("T")[0];

  document.getElementById("dob")
  .max = today;

  let user =
  localStorage.getItem(
    "studyxflowUser"
  );

  if(user==="logged"){

    document.getElementById(
      "registerScreen"
    ).style.display="none";

    document.getElementById(
      "welcomeScreen"
    ).style.display="none";

  }

  /* LOAD USER STATS */

  if(auth.currentUser){

    db.collection("users")

    .doc(auth.currentUser.uid)

    .get()

    .then((doc)=>{

      let data = doc.data();

      document.getElementById(
      "streakCount"
      ).textContent =
      data.dailyStreak || 0;

      document.getElementById(
      "doubtCount"
      ).textContent =
      data.doubtsAsked || 0;

      document.getElementById(
      "notesCount"
      ).textContent =
      data.notesUploaded || 0;

    });

  }

  /* FEEDBACK POPUP */
  
  let feedbackDone =
    localStorage.getItem(
      "feedbackDone"
    );
  
  if(feedbackDone!=="yes"){
    
    setTimeout(()=>{
      
      document.getElementById(
        "feedbackPopup"
      ).style.display="flex";
    
    },3000);
  
  }
  
/* RATE */
  
function rate(text){
  
  alert("Feedback: "+text);
  
  localStorage.setItem(
    "feedbackDone",
    "yes"
  );
  
  closeFeedback();

}

/* SECTIONS */

function showSection(section){

  document.getElementById("homeSection")
  .style.display="none";

  document.getElementById("doubtsSection")
  .style.display="none";

  document.getElementById("notesSection")
  .style.display="none";

  document.getElementById("profileSection")
  .style.display="none";

  document.getElementById("feedbackSection")
  .style.display="none";

  document.querySelector(".dashboardHero")
  .style.display="none";

  if(section==="home"){

    document.querySelector(".dashboardHero")
    .style.display="block";

    document.getElementById("homeSection")
    .style.display="block";

  } else {

    document.getElementById(section+"Section")
    .style.display="block";

  }
  
  document.getElementById("menu")
    .classList.remove("active");

}

/* ADD DOUBT */

function addDoubt(){

  let input =
  document.getElementById("doubtInput");

  let text = input.value;

  if(text.trim()==""){

    alert("Enter doubt ❌");
    return;

  }

  let user = auth.currentUser;

  if(!user){

    alert("Login required ❌");
    return;

  }

  db.collection("users")
  .doc(user.uid)
  .get()

  .then((doc)=>{

    let username =
    doc.data().username;

    db.collection("doubts")
    .add({

      text:text,
      uid:user.uid,
      username:username,
      createdAt:
      firebase.firestore.FieldValue.serverTimestamp()

    })

    .then(()=>{

      let div =
      document.createElement("div");

      div.className="doubt";

      div.innerHTML=`

      <b>${username}</b><br>
      🧠 ${text}

      `;

      document.getElementById("doubtList")
      .prepend(div);

      input.value="";

      db.collection("users")
        .doc(user.uid)
        
        .update({
          
          doubtsAsked:
            firebase.firestore.FieldValue.increment(1)
        
        });

      
    });

  });

}

/* FEEDBACK */

function addFeedback(){

  let input =
  document.getElementById("feedbackInput");

  let text = input.value;

  if(text.trim()==""){
    alert("Enter feedback");
    return;
  }

  let div = document.createElement("div");

  div.className="doubt";

  div.textContent =
  "⭐ " + text;

  document.getElementById("feedbackList")
  .prepend(div);

  input.value = "";

}

setTimeout(()=>{

  document.getElementById(
    "splashScreen"
  ).style.display="none";

},3000);
