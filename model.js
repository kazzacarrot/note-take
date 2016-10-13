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
            if (note.heading.indexOf(heading) >= 0){
                score[n] += 1;
            } 

            if (compareDates(note.lastModified, date)) {
                console.log(note.lastModified);
                console.log(date);
                score[n] += 1;
            }
            if (note.description.indexOf(content) >= 0){
                score[n] +=2;
            }
            console.log(score[n]);
        }

        notenotes.sort(function(a, b) {
            return score[b] - score[a]
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

function compareDates(Date1, Date2){
    if (Date1.getYear() == Date2.getYear()){
        if (Date1.getMonth() == Date2.getMonth()) {
            if(Date1.getDate() == Date2.getDate()) {
                return true
            }
        }
    }
    return false
}

function exportData(){
    console.log("exporting");
    note.exportDataToCSV();
}

