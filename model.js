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
        for (n in notenotes){
            console.log(notenotes[n]);
        }
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


function queryData(date, keyword, keyword){
    date = typeof date.value !== "undefined" ? date.value : "Note Heading";
    keyword = typeof keyword.value !== "undefined" ? keyword.value : "Note Content"; 
    note.query(date, keyword);
}

