// ideally the controller wouldn't know about the dom structure.


document.getElementById("save").onclick = function() {
    saveData(document.getElementById('name'), document.getElementById('description'))
}
document.getElementById("reset").onclick = function() {
    display();
}
document.getElementById("remove").onclick = function() {
    var i = document.getElementById('edit').className;
    var id = parseInt(i);
    notenotes[id].removeNote();
    document.getElementById('edit').disabled = true;
    document.getElementById('remove').disabled = true;
    display();
}


document.getElementById("edit").onclick = function() {
    var id = parseInt(this.className);
    var newHeading = document.getElementById('name').value;
    var newDescription = document.getElementById('description').value;
    editData(id, newHeading, newDescription);
    document.getElementById('edit').disabled = true;
    document.getElementById('remove').disabled = true;
    display();
}

document.getElementById("store").onclick = function() {
    note.saveDataToLocalStorage();
    alert("Saved to local storage")
}
document.getElementById("clear").onclick =  function() {
    clearData();
    display();
}
document.getElementById("export").onclick = function() {
    exportData();
}
document.getElementById("query").onclick = function() {
    queryData(document.getElementById('date'), document.getElementById('keyword'))

}

function unclickAllNotes(){
    var notes = document.getElementById("notes").childNodes;
    for (var i=0; i<notes.length; i++ ){
        notes[i].className = "note unClicked";
    }
    return true;
}

document.getElementById("notes").onclick = function(e){
    console.log(this);
    console.log(e);
    var p = e.target;

    while (p.className.indexOf("note") == -1 && p !== document.body) {

        console.log(p);
        p = p.parentElement;

    }
    if (p == document.body){
        alert("Please click on a note then you can edit it or delete it.");

    }
    else {
        unclickAllNotes();
        p.className = "note clicked";

        var id = parseInt(p.id);
        console.log(notenotes[id]);
        document.getElementById('name').value = notenotes[id].heading;

        document.getElementById('description').value = notenotes[id].description;
        document.getElementById('edit').disabled = false;
        document.getElementById('edit').className = id;
        document.getElementById('remove').disabled = false;
    }
}

startApp();
console.log("started");

window.onbeforeunload = function(e) {
    note.saveDataToLocalStorage();
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
        document.getElementById("status").innerHTML = "Unable to save.\n\r You should consider exporting before you leave. ";
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
    // edit the note
    notenotes[id].edit(newHeading, newDescription);
    // display the changes to the user
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

function queryData(date, keyword){
    console.log(date);
    var date1 = typeof date.value !== "undefined" ? date.value : "2016-10-13";
    date1 = new Date(date1);
    keyword1 = typeof keyword.value !== "undefined" ? keyword.value : "Note Content"; 

    note.query(date1, keyword1, keyword1);
    colourInNotes();
}
function saveData(a, b){
    c = typeof a.value !== "undefined" ? a.value : "Note Heading";
    d = typeof b.value !== "undefined" ? b.value : "Note Content"; 

    console.log("saving");
    var newNote = new note(c, d);

    console.log("LKJO");
    console.log(newNote);
    notenotes.push(newNote);
    display();
}

function clearData(){
    note.clearData();
    display();
}

function colourInNotes(){
    notenotes.forEach(function(noteObj, index){
        var score = noteObj.score;
        var noteEle = document.getElementById(index);

        document.createElement("P");
        text = document.createElement("P");
        text.className="likelyness";
        t = document.createTextNode("likelyness " + score);
        text.appendChild(t);
    
        noteEle.appendChild(text);

        if (score == 4 ){
            likelyhood = "very_likely"; 
        }
        if (score == 3 ){
            likelyhood = "likely"; 
        }
        if (score == 2 ){
            likelyhood= "fairly_likely"; 
        }
        if (score == 1 ){
            likelyhood= "quite_likely"; 
        }
        if (score == 0 ){
            likelyhood= "not_likely"; 
        }
        noteEle.className = "note "  + likelyhood;
        console.log(noteEle);
    })
}

