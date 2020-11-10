const fs = require('fs')
const chalk = require('chalk')

const getNotes = () => {
    return "Your notes"
}

const addNotes = (title, body) => {
    const notes = loadNotes()
    const duplicateNotes = notes.filter(notes => notes.title === title)

    if (duplicateNotes.length === 0 ){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log('New note Added!')
    }else{
        console.log('Note already exists!')
    }
}

const saveNotes = (notes) =>{
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () =>{
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON)
    }catch(e){
        return [] 
    }

}

const removeNotes = (title) => {
    const notes = loadNotes();
    const notesToKeep = notes.filter(note => note.title !== title)

    
    if(notes.length === notesToKeep.length){
        console.log(chalk.bgRed('No note Found'))
    }else{
        console.log(chalk.bgGreen('Note Removed!!!'))
        saveNotes(notesToKeep)
    }

}

const listNotes = () => {
    const notes = loadNotes();

    notes.forEach(note => console.log('* ' + note.title))
    
}

module.exports = {
    getNotes: getNotes,
    addNotes: addNotes,
    removeNotes: removeNotes,
    listNotes: listNotes
}

// STEPS
// 1. Access the JSON file if it exists or create one if DNE which is an array of objects
// 2. Push new info into the array 
// 3. Save it by writing to the json file 