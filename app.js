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

auth.onAuthStateChanged((user)=>{

if(user){

document.getElementById(
"welcomeScreen"
).style.display="none";

document.getElementById(
"registerScreen"
).style.display="none";

db.collection("users")

.doc(user.uid)

.get()

.then((doc)=>{

let data = doc.data();

/* PROFILE DETAILS */

document.getElementById(
"showFullName"
).textContent =
data.fullName || "";

document.getElementById(
"showGoal"
).textContent =
data.goal || "";

document.getElementById(
"showDreamCollege"
).textContent =
data.dreamCollege || "";

document.getElementById(
"showFavSubject"
).textContent =
data.favSubject || "";

document.getElementById(
"showWeakSubject"
).textContent =
data.weakSubject || "";

document.getElementById(
"showBio"
).textContent =
data.bio || "";

/* PROFILE NOTICE */

if(data.profileCompleted){

document.getElementById(
"profileNotice"
).style.display="none";

} else {

document.getElementById(
"profileNotice"
).style.display="block";

}

/* STATS */

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

/* PROGRESS */

let total = 6;

let completed = 0;

if(data.fullName)
completed++;

if(data.goal)
completed++;

if(data.dreamCollege)
completed++;

if(data.favSubject)
completed++;

if(data.weakSubject)
completed++;

if(data.bio)
completed++;

let progress = Math.floor(
(completed / total) * 100
);

document.getElementById(
"progressPercent"
).textContent =
progress + "%";

document.getElementById(
"progressFill"
).style.width =
progress + "%";

});

} else {

document.getElementById(
"welcomeScreen"
).style.display="flex";

}

});

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

  localStorage.setItem(
    "feedbackDone",
    "yes"
  );

  closeFeedback();

}

/* CLOSE FEEDBACK */

function closeFeedback(){

  document.getElementById(
    "feedbackPopup"
  ).style.display="none";

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

function openProfilePopup(){

document.getElementById(
"profilePopup"
).style.display="flex";

}

function closeProfilePopup(){

document.getElementById(
"profilePopup"
).style.display="none";

}

function saveProfile(){

let user = auth.currentUser;

if(!user) return;

let fullName =
document.getElementById(
"fullName"
).value;

let goal =
document.getElementById(
"goal"
).value;

let dreamCollege =
document.getElementById(
"dreamCollege"
).value;

let favSubject =
document.getElementById(
"favSubject"
).value;

let weakSubject =
document.getElementById(
"weakSubject"
).value;

let bio =
document.getElementById(
"bio"
).value;

db.collection("users")

.doc(user.uid)

.update({

fullName,
goal,
dreamCollege,
favSubject,
weakSubject,
bio,

profileCompleted:true

})

.then(()=>{

document.getElementById(
"profileNotice"
).style.display="none";

document.getElementById(
"profilePopup"
).style.display="none";

});

}

function generateNotes(){

let topic =
document.getElementById(
"notesTopic"
).value;

if(topic.trim()==""){

alert("Enter topic ❌");

return;

}

document.getElementById(
"notesResult"
).innerHTML =

"🤖 Generating AI Notes...";
  
  setTimeout(()=>{
    
    document.getElementById(
      "notesResult"
    ).innerHTML = `
    
    <h3>${topic}</h3>
    
    <p>
    • Introduction about ${topic}
    </p>
    
    <p>
    • Important concepts of ${topic}
    </p>
    
    <p>
    • Key points and summary
    </p>
    
    <p>
    • Quick revision notes
    </p>
    
    ;
    
    let user = auth.currentUser;
    
    if(user){
    
    db.collection("users")
    
    .doc(user.uid)
    
    .update({
    
    notesUploaded:
    firebase.firestore.FieldValue.increment(1)
    
    });
    
    }
    
    },2000);
