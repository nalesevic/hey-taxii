module.exports = (router, db, mongojs, config, jwt) => {

    // log visit
    router.use((req, res, next) => {
        console.log('Company visit from ' + req.ip);

        let authorization = req.get('Authorization');
        if(authorization) {
            jwt.verify(authorization, config.JWT_SECRET || process.env.JWT_SECRET, (error, decoded) => {
                if(error) {
                    res.status(401).send('Unauthorized access');
                } else {
                    let user_type = decoded.type;
                    if(user_type == 'company') {
                        next();
                    }
                }
            });
        } else {
            res.status(401).send('Unauthorized access');
        }

    })

    router.get('/driver', (req, res) => {
        db.driver.find({}, (error, docs) => res.json(docs));
    })
    
    router.get('/driver/:id', (req, res) => {
        var id = req.params.id;
        db.driver.findOne({ _id: mongojs.ObjectID(id) }, (error, docs) => res.json(docs));
    })
    
    router.post('/driver', (req, res) => {
        db.driver.insert(req.body, (error, doc) => res.json(doc));
    })
    
    router.put('/driver/:id', (req, res) => {
        var id = req.params.id;
        db.driver.findAndModify({
            query: { _id: mongojs.ObjectID(id) },
            update: { $set: req.body },
            new: true
        }, (error, doc, lastErrorObject) => res.json(doc));
    })
    
    router.delete('/driver/:id', (req, res) => {
        var id = req.params.id;
        db.driver.remove({ _id: mongojs.ObjectID(id) }, [true], (error, doc) => res.json(doc));
    })

}