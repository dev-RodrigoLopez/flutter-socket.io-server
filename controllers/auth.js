// const { response } = require('express');

// const Usuario = require('../models/usuario');

// const crearUsuario = async (req, res = response) => {

//     const { ClaveElector } = req.body;
//     console.log(ClaveElector);
//     try {

//         console.log('1')
//         const existeClaveElector = await Usuario.findOne({ ClaveElector });
//         if(existeClaveElector){
//             return res.status(400).json({
//                 ok: false,
//                 msg: 'La clave de Elector ya esta registrado'
//             });
//         }

//         // const existeCurp = await Usuario.findOne({ curp });
//         // if(existeCurp){
//         //     return res.status(400).json({
//         //         ok: false,
//         //         msg: 'La curp ya esta registrado'
//         //     });
//         // }

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




const { response } = require('express');
const { generarJWT } = require('../helpers/jwt');

const Usuario = require('../models/usuario');

const crearUsuario = async (req, res = response) => {

    const { claveElector,curp } = req.body;
    // const { curp } = req.body.curp;
    // console.log('Clave elector'.ClaveElector);
    // console.log('Curp'.curp);
    // console.log(claveElector);
    // console.log(curp);
    try {

        const existeCurp = await Usuario.findOne({ curp });
        if(existeCurp){
            return res.status(400).json({
                ok: false, 
                msg: 'La curp ya esta registrado'
            });
        }

        const existeClaveElector = await Usuario.findOne({ claveElector });
        if(existeClaveElector){
            return res.status(400).json({
                ok: false,
                msg: 'La clave de Elector ya esta registrado'
            });
        }


        const usuario = new Usuario( req.body );
        await usuario.save();

        //Generar mi JWT
        const token = await generarJWT( usuario.curp );

        res.json({
            ok: true,
            // body: req.body
            usuario,
            token
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador'
        });
    }

    // const usuario = new Usuario( req.body );

    // await usuario.save();

    // res.json({
    //     ok: true,
    //     body: req.body
    // })

}

//Método para saber si el usuario existe en la base de datos
const login = async ( req,res = response ) => {

    const { curp } = req.body;
    console.log(curp);

    try {

        const usuarioDB = await Usuario.findOne({ curp });
        if( !usuarioDB ){
            return res.status(404).json({
                ok:false,
                msg: 'Curp no encontrada'
            });
        }

        //Generar el JWT
        const token = await generarJWT( usuarioDB.curp );

        res.json({
            ok: true,
            // body: req.body
            usuario: usuarioDB,
            token
        })

        
    } catch (error) {
        console.log(error);
        return res.json({
            ok:false,
            msg: 'Hable con el administrador'
        })
    }
}

const renewToken = async( req, res = response ) => {

    const curp = req.curp;

    //Generar un nuevo JWT
    const token = await generarJWT( curp );

    //Obtener el usuario por el correo 
    const usuario = await Usuario.findOne({ curp });

    res.json({
        ok: true,
        usuario,
        token
        // curp: req.curp,
        // msg: 'Renew'
    });

}


module.exports = {
    crearUsuario,
    login,
    renewToken
}