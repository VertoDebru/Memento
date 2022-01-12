const Category = require('../models/Categories');

exports.getAllCategories = (req,res) => {
    console.log(`----------------------`);
    console.log(`Get categories from API memento.`);
    
    Category.find()
    .then( (category) => {
        console.log(category);
        res.status(200).json({ category });
        console.log(`Get categories finished.`);
        console.log(`----------------------`);
    })
    .catch(error => res.status(401).json({ error }));
};

// Add checking if nameId exist.
exports.addNewCategory = (req,res) => {
    console.log(`----------------------`);
    console.log(`Add category in API memento.`);

    if(!req.body.nameId || !req.body.name || !req.body.icon) {
        return res.status(400).send(new Error('Bad request!'));
    }
    let category = new Category({
        ...req.body
    });
    category.save()
    .then(() => res.status(200).json({ nameId: req.body.nameId, name: req.body.name, icon: req.body.icon }))
    .catch(error => res.status(400).json({ error }));

    console.log(`Add category finished.`);
    console.log(`----------------------`);
};
