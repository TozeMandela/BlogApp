const express = require('express');
const routes = express.Router();
const mongoose = require('mongoose');
require('../Models/Categoria');
require('../Models/Postagem')
const Categorias = mongoose.model("Categorias");
const Postagens = mongoose.model("postagens");
const validatorInput = require('../utilitarios/validator');

routes.get('/',(req, res)=>{
    res.render('admin/adminIndex');
});

routes.get('/categoria/add',(req, res)=>{
    res.render('admin/addCategoria');
});

routes.post('/categoria/add',(req, res)=>{
    const arr = validatorInput(req.body.nome, req.body.slog);
    if(arr.length!==0){
        res.render('admin/addCategoria',{texto: arr});
    }else{
        const categoria = new Categorias({
            nome: req.body.nome,
            slog: req.body.slog
        }).save().then( ()=>{
            req.flash("success_msg","categoria salva com sucesso");
            res.redirect('/admin');
        }).catch(e=>{
            req.flash('error_msg','erro ao salva com sucesso');
            res.redirect('/admin');
        });
    }
});

routes.get('/categorias',(req, res)=>{

    Categorias.find().then((data)=>{
        res.render('admin/categoria',{categoria: data.map(d=>d.toJSON())});
    }).catch(e=>{
        req.flash('error_msg', 'erro ao exibir os dados');
        res.redirect('/admin/categorias')
    });
});

routes.get('/categoria/edit/:id',(req, res)=>{

    Categorias.findOne({_id:req.params.id}).then((data)=>{
        let dados=[data];
        res.render('admin/editCategoria',{categoria: dados.map(d=>d.toJSON())});
    }).catch(e=>{
        //console.log('categoria não existe')
        req.flash('error_msg', 'essa categoria ñ existe');
        res.redirect('/admin/categorias');
    });
});

routes.post('/categorias1',(req, res)=>{
    Categorias.remove({_id:req.body.id}).then(()=>{
        req.flash('success_msg', 'categoria eliminada com sucesso!');
        res.redirect('/admin/categorias');
    }).catch((e)=>{
        req.flash('error_msg', 'erro ao eliminar categoria');
        res.redirect('/admin/categorias');
    })
})

routes.post('/categorias',(req, res)=>{
    
    const arr = validatorInput(req.body.nome, req.body.slog);
    console.log(arr.length)
    if(arr.length>0){
        Categorias.findOne({_id:req.body.id}).then((data)=>{
            let datas =[data];
            res.render('admin/editCategoria',{texto: arr, categoria:datas.map(d=>d.toJSON())});
        })
    }else{
        Categorias.findOne({_id:req.body.id}).then((data)=>{
            console.log(data)
            data.nome = req.body.nome;
            data.slog = req.body.slog;
            data._id = req.body.id;

            data.save().then(()=>{
                req.flash('success_msg', 'edição feita com sucesso');
                res.redirect('/admin/categorias');
            }).catch(e=>{
                req.flash('error_msg', 'erro ao editar');
                res.redirect('/admin/categorias');
            });
        });
    }
});

routes.get('/postagens/postagens', (req, res)=>{
    const cat = [];
    
    Postagens.find().then(dados=>{
         
      dados.forEach((el,i)=>{ 
        Categorias.findOne({_id:el.categoria}).then(d=>{
            cat[i]=d;
        }).catch(()=>{
            console.log('erro a pesquisar')
        })})
        console.log(cat)
        //res.render('postagens/postagens',{postagem: dados.map(d=>d.toJSON()),categ:cat.map(d=>d.toJSON())})
    })
    
});

routes.get('/postagens/postagem/add', (req, res)=>{
    Categorias.find().then(d=>{
        console.log(d)
        res.render('postagens/addPostagem',{dados:d.map(r=>r.toJSON())})
    });
});

routes.post('/postagens/postagem/add', (req, res)=>{
    console.log(req.body.categoria)
   new Postagens({
    nome: req.body.nome, 
    slog: req.body.slog,
    descricao: req.body.descricao,
    conteudo: req.body.conteudo,
    categoria: req.body.categoria,
    data: req.body.data
    }).save().then(()=>{
        req.flash('success_msg', 'postagem salvo com sucesso');
        res.redirect('/admin/postagens/postagens')
    })
});

module.exports = routes;