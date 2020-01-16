module.exports = (router, db, mongojs, config, jwt) => {
    let companyID = '';

    // log visit
    router.use((req, res, next) => {
        console.log('Company visit from ' + req.ip);
        let authorization = req.get('Authorization');
        console.log("1");
        if (authorization) {
            console.log("2");

            jwt.verify(authorization, config.JWT_SECRET || process.env.JWT_SECRET, (error, decoded) => {
                if (error) {
                    console.log("3");

                    res.status(401).send('Unauthorized access');
                } else {
                    console.log("4");

                    let user_type = decoded.userType;
                    console.log(user_type);
                    if (user_type == 'company') {
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

    router.put('/password', (req, res) => {
        console.log("updating password " + req.body.email + " " + req.body.password);
        let data = { id: companyID, time: Date.now(), action: 'change company password' };
        db.log.insert(data);
        db.user.findAndModify({
            query: { email: req.body.email },
            update: { $set: { password: req.body.password } },
            new: true
        }, (error, doc, lastErrorObject) => {
            if (error)
                throw error;
        });
    })

    router.put('/profile', (req, res) => {
        console.log("updating company profile " + req.body.companyID);
        let data = { id: companyID, time: Date.now(), action: 'update company profile' };
        db.log.insert(data);
        db.user.findAndModify({
            query: { email: req.body.email },
            update: {
                $set: {
                    name: req.body.name,
                    email: req.body.email,
                    address: req.body.address,
                    phone: req.body.phone,
                }
            },
            new: true
        }, (error, doc, lastErrorObject) => {
            if (error)
                throw error;
        });
    })

    router.get('/profile', (req, res) => {
        console.log("retrieving company profile");
        db.user.findOne({ _id: mongojs.ObjectID(companyID) }, (error, doc) => {
            if (error)
                throw error;

            res.json(doc);
        })
    })

    router.get('/charts', (req, res) => {
        db.ride.find({ companyID: mongojs.ObjectID(companyID) }, { numRides: 1 }, (error, docs) => res.status(200).send(docs));
    })

    router.get('/drivers', (req, res) => {
        db.driver.find({ companyID: mongojs.ObjectID(companyID) }, (error, docs) => res.status(200).send(docs));
    })

    router.get('/vehicles', (req, res) => {
        db.vehicle.find({}, (error, docs) => res.status(200).send(docs));
    })

    router.post('/vehicles', (req, res) => {
        let logData = { id: companyID, time: Date.now(), action: 'insert company vehicles' };
        db.log.insert(logData);
        let data = {
            ...req.body,
            companyID: mongojs.ObjectID(companyID)
        }
        console.log(data);

        db.vehicle.insert(data, (error, doc) => {
            if (error)
                throw error;
            res.json(doc);
        });
    })

    router.put('/vehicles/:id', (req, res) => {
        console.log("updating vehicle " + req.body.year);
        let data = { id: companyID, time: Date.now(), action: 'update company vehicle' };
        db.log.insert(data);
        var id = req.params.id;
        db.vehicle.findAndModify({
            query: { _id: mongojs.ObjectID(id) },
            update: { $set: req.body },
            new: true
        }, (error, doc, lastErrorObject) => res.json(doc));
    })

    router.delete('/vehicles/:id', (req, res) => {
        let data = { id: companyID, time: Date.now(), action: 'delete company vehicle' };
        db.log.insert(data);
        var id = req.params.id;
        db.vehicle.remove({ _id: mongojs.ObjectID(id) }, [true], (error, doc) => res.json(doc));
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
        let data = { id: companyID, time: Date.now(), action: 'update company driver' };
        db.log.insert(data);
        var id = req.params.id;
        db.driver.findAndModify({
            query: { _id: mongojs.ObjectID(id) },
            update: { $set: req.body },
            new: true
        }, (error, doc, lastErrorObject) => res.json(doc));
    })

    router.delete('/drivers/:id', (req, res) => {
        let data = { id: companyID, time: Date.now(), action: 'delete company driver' };
        db.log.insert(data);
        var id = req.params.id;
        db.driver.remove({ _id: mongojs.ObjectID(id) }, [true], (error, doc) => res.json(doc));
    })

}