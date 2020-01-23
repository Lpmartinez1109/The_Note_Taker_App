const util = require("util");
const fs = require("fs");
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store{
    constructor(){
        this.lastId = 0;
    }

    read(){
        return readFileAsync("db/db.json", "utf-8")
    }
    write(note){
        return writeFileAsync("db/db.json", JSON.stringify(note));
    }
    getNotes(){
        return this.read().then(notes => {
            let parsedNotes;

            try{
                parsedNotes = [].concat(JSON.parse(notes));
            } catch(err){
                parsedNotes = [];
            }
        });
    }
    
   addNotes(note){
    const { title, text} = note;
   
   
    if(!title || !text){
        throw new Error ("Note 'title' and 'text' cannot be blanl");
    }

    const newNote = { title, text, id: ++this.lastId};
    return this.getNotes()
    .then(notes => [...notes, newNote])
    .then(updatedNotes => this.write(updatedNotes))
    .then(() => newNote);
    }
    deleteNotes(id){
        return this.getNotes()
        .then(notes => notes.filter(notes => note.id !== parseInt(id)))
        .then(filteredNotes => this.write(filteredNotes))
    }
}

module.exports = new Store();