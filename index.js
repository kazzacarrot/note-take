console.log("hollo");

function retrieveData(){

    var s = sessionStorage.getItem('note');
    return s;
}

function checkCompatibility(){
    if (typeof(Storage) !== "undefined") {
        // Code for sessionStorage/sessionStorage.
        console.log("You can save");
        document.getElementById("status").innerHTML = "Able to save.";
        return true;
    } else {
        // Sorry! No Web Storage support..
        console.log("You can't save");
        document.getElementById("status").innerHTML = "Unable to save.";
        return false;
    }
}

function clearNotesElement(){
    var myNote = document.getElementById("notes");
    while( myNote.firstChild) {
        myNote.removeChild(myNote.firstChild);
    }
}

function display(){
    clearNotesElement();
    var o, para, t;
    for (n in notes){
        o = JSON.stringify(n + " : " + notes[n]);
        para = document.createElement("P");
        t = document.createTextNode(o);
        para.appendChild(t);
        document.getElementById("notes").appendChild(para);
    }
}

function clearData(a, b){
    notes = {}
    sessionStorage.setItem('note', {});
    display();
}
function saveData(a, b){
    notes[a] = b;
    display();
}
function saveNotes(a, b){
    dict = retrieveData();
    console.log(dict);
    dict.setItem(a.toString, b.toString());
    sessionStorage.setItem('note', JSON.stringify(dict));
    alert("data saved to local storage.");
    console.log("data saved.");
}

// initalize note 
var notes = {h : "w"};

function startApp(){
    if (checkCompatibility()){
        s = retrieveData();
        console.log(typeof (s));

        if (s != null){
            // initalize notes variable with the value in storage.
           notes = JSON.parse(s);
        }
    }
    // display the value of notes
    display();
}
