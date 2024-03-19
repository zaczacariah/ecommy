const router = require('express').Router();
const { Category, Product } = require('../../models');
const dotenv = require('dotenv');
dotenv.config();
// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  const categories =  await Category.findAll();
  // be sure to include its associated Products
  res.status(200).json(categories);
  
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  const cat = await Category.findByPk(req.params.id, {
    include: [
      {
      model: Product,
      }
    ]
  })

  if(cat){
    res.status(200).json(cat);
  } else {
    res.status(404).json();
  }
});

router.post('/', async (req, res) => {
  // create a new category
  if(req.body && typeof req.body.category_name === 'string'){
    try {
      const newCat = await Category.create({ category_name: req.body.category_name });
      res.status(201).json(newCat); // Send back the created category
    } catch(error) {
      // Handle potential errors, such as database errors
      res.status(400).json({ error: error.message });
    }
  } else {
    // If category_name is not provided or not a string, return an error
    res.status(400).json();
  }

});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  if(req.body && req.body.category_name){
    try{
      await Category.update({ category_name: req.body.category_name }, {
        where : {
          id: req.params.id
        }
      })
      res.status(202).json({
        message: `Category ${req.params.id} Name updated to ${req.body.category_name}.`
      });

    } catch(err) {
      res.status(400).json(err)
    }

  } else {
    res.status(400).json();
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try{
  
    await Category.destroy({ 
      where: {
        id: req.params.id 
      }
    });
    res.status(410).json({ message: "Category Deleted" });
  } catch(err){
    res.status(400).json(err);
  }
});

module.exports = router;
