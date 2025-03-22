
import Fastify from 'fastify';
import userRouter from './src/routes/userRoute.js';

const fastify = new Fastify({
    logger: true,
});

// register routes
fastify.register(userRouter);

// home route
fastify.get("/", (req, rep) => {
    return {
        message: "Welcome to auth service"
    }
})

// utility method to start the server
const startServer = async () => {
    const PORT = process.env.PORT || 9741
    try{
        await fastify.listen({ port: PORT});
        console.log(`Server listening on port: ${PORT}`);
    } catch(err){
        fastify.log.error(err);
        process.exit(1);
    }
}

startServer();