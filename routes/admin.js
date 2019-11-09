module.exports = (router, db, mongojs, config, jwt) => {

    // log visit
    router.use((req, res, next) => {
        console.log("Admin visit from " + req.ip);

        let authorization = req.get('Authorization');
        if(authorization) {
            jwt.verify(authorization, config.JWT_SECRET || process.env.JWT_SECRET, (error, decoded) => {
                let type = decoded.type;
                if(type == 'admin') {
                    next();
                } else {
                    res.status(401).json('Unauthorized access');
                }
            });
        } else {
            res.status(401).json('Unauthorized access');
        }

    });

}