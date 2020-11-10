const fs = require('fs')
const chalk = require('chalk')

const getNotes = () => {
    return "Your notes"
}

const addNotes = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find(notes => notes.title === title)
    // removed filter as it traverses entire array
    // added find method as it stops as soon as it hits a match

    if (!duplicateNote){
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

const readNote = (title) => {
    const notes = loadNotes();
    const note = notes.find( note => note.title === title)

    if(note){
        console.log(chalk.green(note.title))
        console.log(note.body)
    }else{
        console.log(chalk.red('No note found with that title'))
    }
}
// Goal: wire up read command

// 1. setup  --title option for read command 
// 2. create readNote in node.js
    // search for note by title
    // find note and print title (styled) and body (plain)
    // no note found? print err in red
// 3. have the command handler call the function
// 4. Test your work by running a couple of commands 

module.exports = {
    getNotes: getNotes,
    addNotes: addNotes,
    removeNotes: removeNotes,
    listNotes: listNotes,
    readNote: readNote
}

// STEPS
// 1. Access the JSON file if it exists or create one if DNE which is an array of objects
// 2. Push new info into the array 
// 3. Save it by writing to the json file 