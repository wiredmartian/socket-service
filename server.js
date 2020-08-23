const fastify = require("fastify")
const io = require("socket.io")

const server = fastify({ http2: false, logger: true })

server.register(require("fastify-cors"), {
    origin: true,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
})
server.register(require("fastify-rate-limit"), {
    max: 500,
    timeWindow: 2000,
    whitelist: ['127.0.0.1', 'localhost'],
})
server.register(require("fastify-formbody"));
server.register(require("fastify-helmet"), { hidePoweredBy: { setTo: 'Martian APIs' } });

/** create a socket server */
const ioServer = io(server.server);
ioServer.use((socket, next) => {
    const requestId = socket.handshake.query.PAYREQUESTID;
    const pattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!requestId) {
        return next(new Error('authentication error'));
    }
    if (!pattern.test(requestId)) {
        return next(new Error("Invalid pay-request-id passed"));
    }
    return next();
});
ioServer.on('connection', (socket) => {
    const room = socket.handshake.query.PAYREQUESTID;
    socket.join(room);
    ioServer.to(room).emit('joined', 'Socket connected');
});
const build = async () => {
    try {
        await server.listen(9001, '0.0.0.0');
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

process.on('uncaughtException', err => {
    console.error(err);
    process.exit(1);
});
process.on('unhandledRejection', err => {
    console.error(err);
    process.exit(1);
});

build();
