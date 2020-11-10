const fs = require('fs')
const chalk = require('chalk')
const getNotes = () => {
    return "Your notes"
}

const addNotes = (title, body) => {
    const notes = loadNotes()
    const duplicateNotes = notes.filter(notes => {
        return notes.title === title
    })

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

const removeNotes = (title) =>{
    const notes = loadNotes();
    const notesToKeep = notes.filter(note => {
        if(note.title !== title){
            return note.title 
        }
    })

    saveNotes(notesToKeep)

    if(notes.length === notesToKeep.length){
        console.log(chalk.bgRed('No note Found'))
    }else{
        console.log(chalk.bgGreen('Note Removed!!!'))
    }

    // import existing nodes √
    // use array filter to remove matching note if any √
    // save the newly created array √
    // test work with a title that exists and a title that dne √
}

module.exports = {
    getNotes: getNotes,
    addNotes: addNotes,
    removeNotes: removeNotes
}

// STEPS
// 1. Access the JSON file if it exists or create one if DNE which is an array of objects
// 2. Push new info into the array 
// 3. Save it by writing to the json file 