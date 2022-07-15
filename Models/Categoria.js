const mongoose = require('mongoose');

const categoria = mongoose.Schema({
    nome: {
        type: String,
        require: true
    },
    slog:{
        type: String,
        require: true
    },
    data:{
        type: Date,
        default: Date.now()
    }
}); 
mongoose.model('Categorias',categoria); 