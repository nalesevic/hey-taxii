module.exports = (router, db, mongojs, config, jwt) => {

    // log visit
    router.use((req, res, next) => {
        console.log('Public visit from ' + req.ip);
        next();
    })
    
    

}