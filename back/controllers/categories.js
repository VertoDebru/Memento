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
        return res.status(400).send(new Error('Mauvais requete!'));
    }
    let category = new Category({
        ...req.body
    });
    category.save()
    .then( () => {
        res.status(200).json({ message: `Category '${req.body.name}' added !` });
    })
    .catch( (error) => { res.status(500).json(new Error(error))});

    console.log(`Add category finished.`);
    console.log(`----------------------`);
};
