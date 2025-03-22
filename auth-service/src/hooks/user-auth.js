
const validateToken = () => {
    return new Promise((resolve, reject) => {
        // token check logic

        // resolve promise
        resolve({ userToken: '456712' });

        // reject promise
        // reject(new Error('user token is invalid!'));
    });
}

export const authHandler = (req, rep, done) => {
    console.log('checking auth...')
    validateToken().then((userToken) => {
        req.userToken = userToken
        done();
    }).catch(err => {
        rep.code(401).send({
            success: 'false'
        });
    })
    // done();
}