console.log("hollo");


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

function editData(id, newHeading, newDescription){

    console.log(notenotes[id]);

    notenotes[id].edit(newHeading, newDescription);
    console.log(notenotes[id]);

    display();

}

function display(){
    console.log("clearing");
    clearNotesElement();

    console.log("setting up");
    var o, heading, t;
    console.log(notenotes);
    for (n in notenotes){
        o = (notenotes[n].heading).toString();


        heading = document.createElement("H3");
        heading.className="title";
        t = document.createTextNode(o);
        heading.appendChild(t);

        text = document.createElement("P");
        text.className="context";
        t = document.createTextNode(notenotes[n].toString());
        text.appendChild(t);

        div = document.createElement("DIV");
        div.appendChild(heading);
        div.appendChild(text);

        div.id = n.toString();
        div.className = "note"; 
        document.getElementById("notes").appendChild(div);
    }
}



function startApp(){
    if (checkCompatibility()){
        s = note.retrieveDataFromLocalStorage();
    }
    // display the value of notes
    display();
}
