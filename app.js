const chalk = require('chalk')
const yargs = require('yargs') 
const notes = require('./notes') 

// add, remove, read, list notes 
// Yarg Version 
yargs.version('1.1.0')
//Create Add Command 
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder:{
        title: {
            describe:'Note Title',
            demandOption: true,
            type: 'string'
        },
        body:{
            describe: 'Body Message',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.addNotes(argv.title, argv.body)
    }
})

//Create Remove Command 
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title:{
            describe: "Remove note with specific title",
            demandOption: true,
            type: "string"
        }
    },
    handler(argv){
        notes.removeNotes(argv.title)
    }
})

//Create List Command 

yargs.command({
    command: 'list',
    describe: 'list a note',
    handler(){
        console.log(chalk.bold.blue('Your Notes'))
        notes.listNotes()
    }
})

yargs.command({
    command: 'read',
    describe: 'read a note',
    builder:{
        title: {
        describe: "Read note with specific title",
        demandOption: true, 
        type:'string'
        }
    },
    handler(argv){
        notes.readNote(argv.title)
    }
})