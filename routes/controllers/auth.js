// const { response } = require('express');

// const Usuario = require('../../models/usuario');

// const crearUsuario = async (req, res = response) => {

//     const { claveElector,curp } = req.body;
//     // const { curp } = req.body.curp;
//     // console.log('Clave elector'.ClaveElector);
//     // console.log('Curp'.curp);
//     // console.log(claveElector);
//     // console.log(curp);
//     try {

//         const existeCurp = await Usuario.findOne({ curp });
//         if(existeCurp){
//             return res.status(400).json({
//                 ok: false,
//                 msg: 'La curp ya esta registrado'
//             });
//         }

//         const existeClaveElector = await Usuario.findOne({ claveElector });
//         if(existeClaveElector){
//             return res.status(400).json({
//                 ok: false,
//                 msg: 'La clave de Elector ya esta registrado'
//             });
//         }


//         const usuario = new Usuario( req.body );
//         await usuario.save();

//         res.json({
//             ok: true,
//             body: req.body
//         })


//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             ok: false,
//             msg: 'Hable con el Administrador'
//         });
//     }

//     const usuario = new Usuario( req.body );

//     await usuario.save();

//     res.json({
//         ok: true,
//         body: req.body
//     })

// }


// module.exports = {
//     crearUsuario
// }