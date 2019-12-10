module.exports = (router, db, mongojs, config, jwt) => {

    // log visit
    router.use((req, res, next) => {
        console.log('Passenger visit from ' + req.ip);

        let authorization = req.get('Authorization');
        if(authorization) {
            jwt.verify(authorization, config.JWT_SECRET || process.env.JWT_SECRET, (error, decoded) => {
                if(error) {
                    res.status(401).json('Unauthorized access');
                } else {
                    let type = decoded.type;
                    if(type == 'passenger') {
                        next();
                    } else {
                        res.status(401).json('Unauthorized access');
                    }
                }
            })
        } else {
            res.status(401).json('Unauthorized access');
        }
    })

    router.get('/my/:id', (req, res) => {
        let id = req.params.id;
        db.user.findOne({ _id: mongojs.ObjectId(id) }, (error, doc) => {
            res.json(doc);
        })
    });

    router.put('/my/:id', (req, res) => {
        let data = req.body;
        let id = req.params.id;

        db.user.findAndModify({
            query: { _id: mongojs.ObjectId(id) },
            update: { $set: data },
            new: true
        }, (error, doc) => {
            if(error)
                throw error;
            res.json(doc);
        })
    });

}