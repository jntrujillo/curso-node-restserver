const { Router } = require('express');

const {usuariosGet,usuariosPut,usuariosPost,usuariosDelete} = require('../controllers/user');

const {check} = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const Role = require('../models/role');

const router = Router();


    router.get('/',usuariosGet);
    
    router.put('/:id',usuariosPut);
    
    router.post('/',[
            check('nombre','El nombre es obligatorio').not().isEmpty(),
            check('password','El password no es válido, debe tener mas de 6 letras').isLength({min: 6}),
            check('correo','El correo no es válido').isEmail(),
            check('rol').custom( async(rol='') =>{
                const existeRol = await Role.findOne({ rol });
                if(!existeRol){
                    throw new Error(`El rol ${ rol } no esta registrado en la base de datos`)
                }
            }),
            //check('rol','No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
            validarCampos
                    ],usuariosPost);
    
    router.delete('/',usuariosDelete);
 

module.exports = router;