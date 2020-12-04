const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { cloudinary } = require('../../config/cloudinary');

const Category = require('../../models/Category');

router.get('/', async (req, res) => {
    try {
        const categories = await Category.find();

        if (!categories) {
            return res.status(400).json({ msg: "No Category found" });
        }
        res.json(categories);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.post('/',
    [check('name', 'Category name is required').not().isEmpty(),
    check('coverPhoto', 'Category Cover Photo is required').not().isEmpty()],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });

        }

        const { name, coverPhoto } = req.body;

        try {
            let category = await Category.findOne({ name });

            if (category) {
                return res.status(400).json({ msg: 'Category already exists!' });
            }
            //UPLOAD TO CLOUDINARY AND GET THE URL THEN SAVE CATEGORY NAME AND PHOTO URL TO THE DATABASE
            const uploadResponse = await cloudinary.uploader.upload(coverPhoto, {
                upload_preset: 'Categories'
            });

            const url = uploadResponse.url

            category = new Category({ name, coverPhoto: url });
            await category.save();
            console.log('CATEGORY', category)
            res.json({ category });

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }


    })


module.exports = router;