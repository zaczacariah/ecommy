const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try{
    const tags =  await Tag.findAll({
      include: [
        {
          model: Product,
        }
      ]
    });
  // be sure to include its associated Products
  res.status(200).json(tags);
} catch(err) {
  res.status(404).json(err);
}
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tag =  await Tag.findByPk(req.params.id, {
      include: [
        {
          model: Product
        }
      ]
    });
    // be sure to include its associated Products
    res.status(200).json(tag);
  } catch(err) {
    res.status(404).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  if(req.body && typeof req.body.tag_name === 'string'){
    try {

      const newTag = await Tag.create({ tag_name: req.body.tag_name });
      res.status(201).json(newTag); // Send back the created category
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
  // update a tag's name by its `id` value
  if(req.body && req.body.tag_name){
    try{
      await Tag.update({ tag_name: req.body.tag_name }, {
        where : {
          id: req.params.id
        }
      })
      res.status(202).json({
        message: `Tag ${req.params.id} Name updated to ${req.body.tag_name}.`
      });

    } catch(err) {
      res.status(400).json(err)
    }

  } else {
    res.status(400).json();
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try{
  
    await Tag.destroy({ 
      where: {
        id: req.params.id 
      }
    });
    res.status(410).json({ message: "Tag Deleted" });
  } catch(err){
    res.status(400).json(err);
  }
});

module.exports = router;
