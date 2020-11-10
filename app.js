const chalk = require('chalk')
const yargs = require('yargs') // What does this do again?
const notes = require('./notes') // requiring another file, not a module
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
    handler: function(argv){
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
    handler: function (argv){
        notes.removeNotes(argv.title)
    }
})

//Create List Command 

yargs.command({
    command: 'list',
    describe: 'list a note',
    handler: function (){
        console.log(chalk.bold.blue('listing a note!'))
    }
})

// add, remove, read, list notes 
yargs.parse() // return in JSON format? Review this 