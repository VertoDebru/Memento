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

exports.addMemo = (req,res, next) => {
    console.log(`----------------------`);
    console.log(`Add memo in database.`);

    if(!req.body.catId || !req.body.title || !req.body.memo) {
        return res.status(400).send(new Error('Mauvais requete!'));
    }
    let memo = new Memos({
        ...req.body
    });
    memo.save()
    .then( () => {
        res.status(200).json({ message: `Memo '${req.body.title}' added !` });
    })
    .catch( (error) => { res.status(500).json(new Error(error))});
};
