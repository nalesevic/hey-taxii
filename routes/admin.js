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

    router.post('/company', (req, rest) => {
        db.company.insert(req.body, (error, doc) => res.json(doc));
    });

    router.put('/company/:id', (req, rest) => {
        let id = req.params.id;
        db.company.findAndModify({
            query: { _id: mongojs.ObjectId(id) },
            update: { $set: req.body },
            new: true
        }, (error, doc) => res.json(doc));
    });

    router.delete('/company/:id', (req, rest) => {
        let id = req.params.id;
        db.company.remove({ _id: mongojs.ObjectId(id) }, (error, doc) => res.json(doc));
    });

}