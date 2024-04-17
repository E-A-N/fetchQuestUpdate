let emailCleaner = (email, reverse = false) => {
    if (typeof email !== "string"){
        return;
    }

    let filters   = [".", "#", "$", "@", "[", "]"];
    let replacers = ["DOT", "HASH", "DOLL", "AT", "LB", "RB"];

    let target    = reverse ? replacers : filters
    let targetMap = reverse ? filters   : replacers;

    email = reverse ? email : email.toLowerCase();;

    target.forEach((value, index) => {
        //value = reverse ? value.toLowerCase() : value;
        let sub = targetMap[index];
        while (email.includes(value)){
            email = email.replace(value, sub);
        }
    });

    return email;
}

let persistenceIsAvailable = () => {
    return false;
}

let setUserScore = (name, score, call) => {
    call();
    if (!persistenceIsAvailable()){
    
    }
};

let getUser = (user, call) => {
    user = emailCleaner(user);
    firebase.database().ref("Users/" + user).once("value", (snapshot) => {
        snapshot.forEach((childSnapShot) => {
            let childKey  = childSnapShot.key;
            let childData = childSnapShot.val();
            
            //do things with the data retrieved from here
            if (typeof call === "function"){
                call(childKey, childData);
            };
        })
    })
}

let getDailyTopScores = (call) => {
    call(DefaultHighScores.DefaultDailyHighScores);
}


let submitNewEntryForTopScore = (newEntry, call) => {
    //[4, {email: "testyATtestDOTcom", name: "TREX!", score: 1111}]
    console.log("new entry is:", newEntry);
    if (call){
        call();
    }
}

let compareTopScores = (scores, newEntry) => {
    let entered = false;
    for (let i = 0; i < scores.length; i++) {
        if (!entered && newEntry[1].score > scores[i][1].score){
            scores.splice(i, 0, newEntry);
            entered = true;
        }
        scores[i][0] = i;
    }
    let newScores = scores.splice(5, scores.length - 5);
    return scores;
}


let getData = (parent, child, call) => {
    child  = child || "";
    parent = parent || "";
    firebase.database().ref(parent + "/" + child).once("value", (snapshot) => {
        snapshot.forEach((childSnapShot) => {
            let childKey  = childSnapShot.key;
            let childData = childSnapShot.val();
            
            //do things with the data retrieved from here
            if (typeof call === "function"){
                call(childKey, childData);
            };
        })
    })
}


let DefaultHighScores = {
    "DailyHighScores":[
       {
          "name":"The Master",
          "score":5000,
          "email": "testyATtestDOTcom"

       },
       {
          "name":"The Profressional",
          "score":4000,
          "email": "testyATtestDOTcom"
       },
       {
          "name":"The Associate",
          "score":3000,
          "email": "testyATtestDOTcom"
       },
       {
          "name":"The Intern",
          "score":2000,
          "email": "testyATtestDOTcom"
       },
       {
          "name":"The Apprentice",
          "score":1000,
          "email": "testyATtestDOTcom"
       }
    ],
    "DefaultDailyHighScores":[
        {
            "name":"The Master",
            "score":5000,
            "email": "testyATtestDOTcom"
  
         },
         {
            "name":"The Profressional",
            "score":4000,
            "email": "testyATtestDOTcom"
         },
         {
            "name":"The Associate",
            "score":3000,
            "email": "testyATtestDOTcom"
         },
         {
            "name":"The Intern",
            "score":2000,
            "email": "testyATtestDOTcom"
         },
         {
            "name":"The Apprentice",
            "score":1000,
            "email": "testyATtestDOTcom"
         }
    ]
 }