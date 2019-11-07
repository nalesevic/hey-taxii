module.exports = (router, db, mongojs, config, jwt) => {

    // log visit
    router.use((req, res, next) => {
        console.log('Company visit from ' + req.ip);
        next();
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