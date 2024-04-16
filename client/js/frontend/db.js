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

let setUserScore = (name, email, score, call) => {
    email = emailCleaner(email);
    firebase.database()
        .ref("Users/" + email)
        .set({
            name: name,
            score: score
        }, () => {
            if (typeof call === "function"){
                call()
            }
        });
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
    firebase.database().ref("DailyHighScores/").once("value", (snapshot) => {
        let scores = [];
        snapshot.forEach((childSnapShot) => {
            let childKey  = childSnapShot.key;
            let childData = childSnapShot.val();
            
            //do things with the data retrieved from here
            scores.push([childKey, childData]);
        })

        if (typeof call === "function"){
            call(scores);
        };
    })
}


let submitNewEntryForTopScore = (newEntry, call) => {
    //[4, {email: "testyATtestDOTcom", name: "TREX!", score: 1111}]
    newEntry[1].email = emailCleaner(newEntry[1].email);
    getDailyTopScores((scores) => {
        let newScores = compareTopScores(scores, newEntry);
        setDailyTopScores(newScores, call);
    })
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

let setDailyTopScores = (scores, call) => {
    scores.forEach((score)=>{
        firebase.database()
            .ref("DailyHighScores/" + score[0])
            .set({
                email: score[1].email,
                name: score[1].name,
                score: score[1].score
            }, () => {
                console.log("Top scores are set!")
                if (typeof call === "function"){
                    call(scores);
                };
            });
    })  
};

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

let updatePageViews = () => {
    let query = "Pageviews";
    let db = firebase.database();
    db.ref(query)
        .once('value')
        .then((Pageviews) => {      
            let dbKey = db.ref(query)
            dbKey.set({
                count: Pageviews.val().count + 1,
            })
        })
}

updatePageViews();
