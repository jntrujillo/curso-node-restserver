const {response}=require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');


const usuariosGet = (req, res = response) => {
    
    const {q, nombre='No name', apikey, page=1, limit} =req.query;
    
    res.json({
        
        msg:'get API - controlador',
        q,
        nombre,
        apikey,
        page,
        limit
    });
}

const usuariosPut = (req, res = response) => {
    
    const {id} = req.params;

    res.json({
        
        msg:'put API - controlador', 
        id
    });
}

const usuariosPost = async(req, res = response) => {
    
    const {nombre,correo,password,rol} = req.body;
    const usuario = new Usuario({nombre,correo,password,rol});

    //verificar si correo existe
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail){
        return res.status(400).json({
            msg: 'El correo ya está registrado'
        });
    }

    //encriptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    //guarda en bs
    await usuario.save();

    res.json({
        
        msg:'post API - controlador',
        usuario
    });
}

const usuariosDelete = (req, res = response) => {
    res.json({
        
        msg:'delete API - controlador'
    });
}


module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
}