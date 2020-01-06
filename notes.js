const fs = require('fs')

const chalk = require('chalk')

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find(note => note.title === title)

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added!'))
    } else {
        console.log(chalk.red.inverse('Title Already Exists'));
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const updatedNotes = notes.filter(note => note.title !== title)
    if (notes.length === updatedNotes.length) {
        console.log(chalk.bgRed('No note found!'))
    } else {
        saveNotes(updatedNotes)
        console.log(chalk.bgGreen('Note removed!'))
    }
}

const listNotes = () => {
    console.log(chalk.inverse('Your notes'))
    const notes = loadNotes()
    if (notes.length === 0) {
        console.log(chalk.red('No notes'))
    } else {
        notes.forEach(note => console.log(chalk.yellow.inverse(note.title)))
    }
}

const readNote = (title) => {
    const notes = loadNotes()
    const searchNote = notes.find(note => note.title === title)

    if (searchNote) {
        console.log(chalk.bold.inverse(title))
        console.log(searchNote.body)
    } else {
        console.log(chalk.red('No note found!'))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }
    catch (e) {
        return []
    }
}
module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}