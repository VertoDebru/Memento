const Memos = require('../models/Memos');

exports.getMemos = (req,res, next) => {
    if(req.query.cat) {
        console.log(`----------------------`);
        console.log(`Get list of memo in category : ${req.query.cat}`);
        Memos.find({ catId: req.query.cat })
        .then( (category) => {
            console.log(category);
            res.status(200).json({ category });
            console.log(`Get list finished.`);
            console.log(`----------------------`);
        })
        .catch(error => res.status(401).json({ error }));
    }

    if(req.query.id) {
        console.log(`----------------------`);
        console.log(`Get memo by Id : ${req.query.id}`);
        Memos.findOne({ _id: req.query.id })
        .then( (memo) => {
            console.log(memo);
            res.status(200).json({ memo });
            console.log(`Get memo finished.`);
            console.log(`----------------------`);
        })
        .catch(error => res.status(401).json({ error }));
    }
};

exports.addNewMemo = (req,res, next) => {
    console.log(`----------------------`);
    console.log(`Add memo in database.`);
    
    Memos.find({ nameId: req.params.cat })
    .then( (memo) => {
        console.log(memo);
        res.status(200).json({ memo });
        console.log(`Add memo finished.`);
        console.log(`----------------------`);
    })
    .catch(error => res.status(401).json({ error }));
};
