const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { cloudinary } = require('../../config/cloudinary');

const SubCategory = require('../../models/SubCategory');

// GET ALL SUBCATEGORIES FOR SELECTED CATEGORY
router.get('/:categoryId', async (req, res) => {
    try {
        const subcategories = await SubCategory.find({ category: req.params.categoryId });

        if (!subcategories) {
            return res.status(400).json({ msg: "No Sub-Category found" });
        }
        res.json(subcategories);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.post('/:categoryId',
    [check('name', 'Sub-Category name is required').not().isEmpty()],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });

        }

        const { name } = req.body;

        try {
            let subcategory = await SubCategory.findOne({ name, category: req.params.categoryId });

            if (subcategory) {
                return res.status(400).json({ msg: 'Sub-Category already exists!' });
            }
            //UPLOAD TO CLOUDINARY AND GET THE URL THEN SAVE SUB-CATEGORY NAME AND PHOTO URL TO THE DATABASE
            // const uploadResponse = await cloudinary.uploader.upload(coverPhoto, {
            //     upload_preset: 'Sub-Categories'
            // });

            // const url = uploadResponse.url

            subcategory = new SubCategory({ name, category: req.params.categoryId });
            await subcategory.save();
            res.json({ subcategory });

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    });



module.exports = router;

