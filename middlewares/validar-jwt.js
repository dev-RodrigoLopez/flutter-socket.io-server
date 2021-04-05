const jwt = require('jsonwebtoken');

const validarJWT = ( req, res, next ) => {

    //Leer Token
    // console.log(req.body.curp);
    const token = req.header('x-token');
    if( !token ){
        return res.status(401).json({
            ok: false,
            msg: 'NO hay token en la peticion'
        });
    }
    
    try
    {
        // console.log(token);
        // console.log(jwt.verify( token, process.env.JWT_KEY ));
        const { Curp } = jwt.verify( token, process.env.JWT_KEY );
        req.curp = Curp;
        next();
    }
    catch(error)
    {
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido..'
        });
    }


}

module.exports = {

    validarJWT

}