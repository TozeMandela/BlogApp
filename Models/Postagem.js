const mongoose = require('mongoose');
const schema = mongoose.Schema;

const postagem = schema({
    nome: {
        type: String,
        require: true
    },
    slog: {
        type: String,
        require: true

    },
    descricao: {
        type: String,
        require: true
    },
    conteudo: {
        type: String,
        require: true
    },
    categoria: {
        type: schema.Types.ObjectId,
        ref: 'Categorias',
        require: true
    },
    data: {
        type: Date,
        default: Date.now(),
        require: true
    }
})

mongoose.model('postagens', postagem);