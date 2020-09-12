const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true, 'Add Title Please !'],
        unique:true,
        trim:true,
        maxlength:[40, 'Title Cannot 40 Characters']
    },
    description:{
        type:String,
        required:true,
        maxlength:[200, 'Description Cannot 200 Characters']
    }
})

module.exports = mongoose.models.Note || mongoose.model('Note', NoteSchema);