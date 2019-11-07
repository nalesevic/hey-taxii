module.exports = (router, db, mongojs, config, jwt) => {

    // log visit
    router.use((req, res, next) => {
        console.log("Admin visit from " + req.ip);
        next();
    });

}