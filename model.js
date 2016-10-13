var notenotes = [];
class note {
    constructor(heading, description){
        console.log(heading);
        console.log(description);
        this.heading      = heading;
        this.description  = description;
        this.lastModified = new Date();
    }

    edit(h, d){
        this.heading      = h;
        this.description  = d;
        this.lastModified = new Date();
    }
    changeName(h){
        this.heading = h;
        this.lastModified = new Date();
    }
    removeNote(){
        delete this;
        var i = notenotes.indexOf(this);
        notenotes.splice(i, 1);
    }
    static query(date, heading, content){
        var score = [];
        for (var n in notenotes){
            console.log(notenotes[n]);
            var note = notenotes[n];
            score.push(0);
            if (note.heading.indexOf(heading) >=0){
                score[n] += 1;
            } 

            if (note.lastModified == date) {
                console.log(note.lastModified);
                console.log(date);
                score[n] += 1;
            }
            if (note.description.indexOf(content)){
                score[n] +=2;
            }
            console.log(score[n]);
        }

        notenotes.sort(function(a, b) {
            return score[a] - score[b]
        })
        return score;
    }
    static retrieveDataFromLocalStorage(){
        var s = localStorage.getItem('note');
        console.log(typeof (s));
        if (s != null){

            var notes = JSON.parse(s);
            console.log("S IS NOT NULL");
        }
        for (var n in notes){
            console.log("What is this");
            console.log(notes);
            console.log("IT IS:");
            console.log(notes[n]);
            var o = new note(notes[n].heading, notes[n].description);
            notenotes.push(o);
        }

        display()
    }

    toString(){
        return this.description + " @ " + this.lastModified
    }
    static exportDataToCSV(){
        var data =[];
        data.push([" ", "Heading", "Description", "Time"]);
        notenotes.forEach(function (note, index){
            data.push([note.heading, note.description, note.lastModified])
        })
        console.log(data);
        var csvContent = "data:text/csv;charset=utf-8";
        var dataString;
        data.forEach(function(infoArray, index) {
            dataString = infoArray.join(",");
            csvContent += index < data.length ? dataString + "\n": dataString; 

        })
        console.log(dataString);
        console.log(csvContent);
        var encodedUri = encodeURI(csvContent);
        window.open(encodedUri);
    }

    static saveDataToLocalStorage(){
        localStorage.setItem('note', JSON.stringify(notenotes));

        console.log("data saved.");
    }
    static clearData(){
        console.log("clearing data from display");
        notenotes = [];
        console.log("clearing data from local storage");
        localStorage.setItem('note', {});
    }
}


function exportData(){
    console.log("exporting");
    note.exportDataToCSV();
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

function colourInNotes(scores){
    scores.forEach(function(score, index){
        var note = document.getElementById(index);
        document.createElement("P");
        text = document.createElement("P");
        text.className="likelyness";
        t = document.createTextNode("likelyness " + score);
        text.appendChild(t);

        
        note.appendChild(text);
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
        note.className = "note "  + likelyhood;
    })
}

function queryData(date, keyword){
    console.log(date);
    date1 = typeof date.value !== "undefined" ? date.value : "2016-10-13";
    keyword1 = typeof keyword.value !== "undefined" ? keyword.value : "Note Content"; 

    scores = note.query(date1, keyword1, keyword1);
    colourInNotes(scores);
}

