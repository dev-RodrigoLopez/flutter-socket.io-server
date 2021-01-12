const {v4: uuidV4} = require('uuid');


class Band {

    constructor( 
        name = 'no-name',
        partido = 'no-partido',
        candidato = 'no-candidato',
        logo = 1,
        imagen = 1,
        color = 'blanco'
        ){

        this.id = uuidV4(); //Identificador unico
        this.name = name;
        this.votes = 0;

        this.partido = partido;
        this.candidato = candidato;
        this.logo = logo;
        this.imagenCandidato = imagen;
        this.color = color;

    }

}

module.exports = Band;