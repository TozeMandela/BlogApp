let arr = (n, slog) =>{
    let arr = [];
    if(!n || n==undefined || n==null){
        arr.push({texton:'prencha o campo nome'});
    }
    if(!slog || slog==undefined || slog==null){
        arr.push({textos:'prencha o campo slog'});
    }
    if(n.length<3){
        arr.push({textonp:'nome da categoria muito curta'});
    }
return arr;
}

module.exports = arr;