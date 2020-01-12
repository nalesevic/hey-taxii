module.exports = (router, db, mongojs, config, jwt) => {
    let companyID = '';

    // log visit
    router.use((req, res, next) => {
        console.log('Company visit from ' + req.ip);
        let authorization = req.get('Authorization');
        console.log("1");
        if(authorization) {
            console.log("2");

            jwt.verify(authorization, config.JWT_SECRET || process.env.JWT_SECRET, (error, decoded) => {
                if(error) {
                    console.log("3");

                    res.status(401).send('Unauthorized access');
                } else {
                    console.log("4");

                    let user_type = decoded.userType;
                    console.log(user_type);
                    if(user_type == 'company') {
                        console.log("5");

                        companyID = decoded.id;
                        console.log("company id " + companyID);
                        next();
                    }
                }
            });
        } else {
            console.log("6");

            res.status(401).send('Unauthorized access');
        }

    })

    router.post('/profile', (req, res) => {
        console.log("updating company profile");
        
        db.company.findAndModify({
            query: { companyID: mongojs.ObjectID(companyID) },
            update: { $set: req.body },
            new: true
        }, (error, doc, lastErrorObject) => res.json(doc));
    })

    router.get('/profile', (req, res) => {
        console.log("retrieving company profile");
        db.company.findOne( { companyID: mongojs.ObjectID(companyID) }, (error, doc) => {
            if(error)
                throw error;
            
            res.json(doc);
        } )
    })
    

    router.get('/drivers', (req, res) => {
        db.driver.find({}, (error, docs) => res.status(200).send(docs));
    })

    router.get('/vehicles', (req, res) => {
        db.vehicle.find({}, (error, docs) => res.status(200).send(docs));
    })
    
    router.get('/driver/:id', (req, res) => {
        var id = req.params.id;
        db.driver.findOne({ _id: mongojs.ObjectID(id) }, (error, docs) => res.json(docs));
    })
    
    router.post('/drivers', (req, res) => {
        let data = {
            ...req.body,
            companyID: mongojs.ObjectID(companyID)
        }
        console.log(data);
                
        db.driver.insert(data, (error, doc) => res.json(doc));
    })
    
    router.put('/drivers/:id', (req, res) => {
        var id = req.params.id;
        db.driver.findAndModify({
            query: { _id: mongojs.ObjectID(id) },
            update: { $set: req.body },
            new: true
        }, (error, doc, lastErrorObject) => res.json(doc));
    })
    
    router.delete('/drivers/:id', (req, res) => {
        var id = req.params.id;
        db.driver.remove({ _id: mongojs.ObjectID(id) }, [true], (error, doc) => res.json(doc));
    })

}