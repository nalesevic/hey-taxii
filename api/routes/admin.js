module.exports = (router, db, mongojs, config, jwt) => {

    // log visit
    router.use((req, res, next) => {
        console.log("Admin visit from " + req.ip);

        let authorization = req.get('Authorization');
        if(authorization) {
            console.log("1");

            jwt.verify(authorization, config.JWT_SECRET || process.env.JWT_SECRET, (error, decoded) => {
                let type = decoded.userType;
                console.log("2");
                if(type == 'admin') {
                    console.log("3");
                    next();
                } else {
                    console.log("4");
                    res.status(401).json('Unauthorized access');
                }
            });
        } else {
            res.status(401).json('Unauthorized access');
        }

    });

    router.get('/company', (req, res) => {
        db.user.find({ type: 'company' }, (error, docs) => {
            res.send(docs);
        });

    });

    router.post('/company', (req, res) => {
        let data = { id: req.body.id, time: Date.now(), action: 'insert company' };
        db.log.insert(data);
        req.body.type = 'company';
        db.user.insert(req.body, (error, doc) => res.json(doc));

    });

    router.put('/company/:id', (req, res) => {
        let id = req.params.id;
        let data = { id: id, time: Date.now(), action: 'update company' };
        db.log.insert(data);

        db.user.findAndModify({
            query: { _id: mongojs.ObjectId(id) },
            update: { $set: req.body },
            new: true
        }, (error, doc) => res.json(doc));

    });

    router.delete('/company/:id', (req, res) => {
        let id = req.params.id;
        console.log("brisem " + id);
        let data = { id: id, time: Date.now(), action: 'update company' };
        db.log.insert(data);
        db.user.remove({ _id: mongojs.ObjectId(id) }, (error, doc) => res.json(doc));
    });

}