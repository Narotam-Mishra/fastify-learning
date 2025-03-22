
async function userRouter(fastify, opts) {
    fastify.post('/api/users', (req, rep) => {
        return {
            message: "User created!!",
        }
    })
}

export default userRouter;