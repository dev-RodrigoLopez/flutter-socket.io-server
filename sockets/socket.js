// const { io } = require('../index');
// const Band = require('../models/band');
// const Bands = require('../models/bands');

// const bands = new Bands();

// bands.addBand( new Band('Queen') );
// bands.addBand( new Band('Bon Jovi') );
// bands.addBand( new Band('Heroes del Silencio') );
// bands.addBand( new Band('Metallica') );

// console.log(bands);

// //Mensajes de Sockets
// io.on('connection', client => {
//     console.log('Cliente conectado');

//     client.emit('active-bands', bands.getBands() );

//     client.on('disconnect', () => { 
//         console.log('Cliente desconectado');
//      });
    
//     client.on('mensaje', ( payload ) =>{
//          console.log('Mensaje', payload);
//          io.emit('mensaje', {admin: 'Nuevo mensaje'});
//      });

//     client.on('vote-band', (payload) => {
//         // console.log(payload);
//         bands.voteBand( payload.id );
//         io.emit('active-bands', bands.getBands());
//     });

//     client.on('add-band', (payload) => {
//         // console.log(payload);
//         const newBand = new Band( payload.name );
//         bands.addBand( newBand );
//         io.emit('active-bands', bands.getBands());
//     });


//     client.on('delete-band', (payload) => {
//         // console.log(payload);
//         bands.deleteBand( payload.id );
//         io.emit('active-bands', bands.getBands());
//     });
//     //  client.on('emitir-mensaje', ( payload ) =>{
//     //     //  console.log(payload);
//     //     // io.emit('nuevo-mensaje', payload);//Emite a todos
//     //     client.broadcast.emit('nuevo-mensaje', payload);//Emite a todos menos al que lo emitió
//     // });

// });

const { io } = require('../index');

const Bands = require('../models/bands');
const Band = require('../models/band');

const bands = new Bands();

bands.addBand( new Band( 'Breaking Benjamin', 'Morena', 'CP. Jorge Acero', 2, 2,                            0xffffffff) );
bands.addBand( new Band( 'Bon Jovi', 'Mover a Chiapas', 'Lic. Hernan Mancilla', 3, 3,                       0xff9575cd) );
bands.addBand( new Band( 'Héroes del Silencio', 'Movimiento Naranja', 'Lic. Daniel Torres', 4,4,            0xffef6c00  ) );
bands.addBand( new Band( 'Metallica', 'Partido Accion Nacional', 'C. Don Arcenio', 5,5,                     0xff039be5 ) );
bands.addBand( new Band( 'Metallica', 'Partido Revolución Institucional', 'Lic. Rigoberto Cortez ', 6,6,    0xfff44336 ) );


// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');

    client.emit('active-bands', bands.getBands() );

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    });

    client.on('mensaje', ( payload ) => {
        console.log('Mensaje', payload);
        io.emit( 'mensaje', { admin: 'Nuevo mensaje' } );
    });

    client.on('vote-band', (payload) => {

        bands.voteBand( payload.id );
        io.emit('active-bands', bands.getBands() );
    });

    client.on('add-band', (payload) => {
        const newBand = new Band( payload.name );
        bands.addBand( newBand );
        io.emit('active-bands', bands.getBands() );
    });

    client.on('delete-band', (payload) => {

        bands.deleteBand( payload.id );
        io.emit('active-bands', bands.getBands() );
    });

    // client.on('emitir-mensaje', ( payload ) => {
    //     // console.log(payload);
    //     // io.emit('nuevo-mensaje', payload ); // emite a todos!
    //     client.broadcast.emit('nuevo-mensaje', payload ); // emite a todos menos el que lo emitió
    // })


});