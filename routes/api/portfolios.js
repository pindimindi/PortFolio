const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const { cloudinary } = require('../../config/cloudinary');

const Portfolio = require('../../models/Porfolio');
const User = require('../../models/User');
const Category = require('../../models/Category');
const updateUserCount = require('../../utils/updateNumberOfUsers');


// Get loged in users portfolio
router.get('/me', auth, async (req, res) => {
    try {
        const myPortfolio = await Portfolio.findOne({ user: req.user.id })
            .populate('user', ['name'])
            .populate('category', ['name'])
            .populate('subCategory', ['name']);

        if (!myPortfolio) {
            return res.status(400).json({ msg: 'There is no profile for this user' })
        }

        res.json(myPortfolio);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error!')
    }
});

// Create or update portfolio
router.post('/', [auth, [
    check('category', 'Category is required').not().isEmpty(),
    check('subCategory', 'Sub Category is required').not().isEmpty(),
    check('location', 'Location is required').not().isEmpty()
]],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        };

        // console.log('req body', req.body)

        const {
            profilePictureData,
            category,
            subCategory,
            location,
            description,
            website,
            youtube,
            facebook,
            instagram
        } = req.body;

        let profilePicture;

        if (profilePictureData) {
            const uploadResponse = await cloudinary.uploader.upload(profilePictureData,
                { upload_preset: 'profilePicture' }
            );

            profilePicture = uploadResponse.public_id;
            // profilePicture = transformed;
        };


        //Build Portfolio object 
        const portfoioObj = {
            user: req.user.id,
            category,
            subCategory,
            location
        };
        if (profilePicture) portfoioObj.profilePicture = profilePicture;
        if (description) portfoioObj.description = description;
        if (website) portfoioObj.website = website;

        //build social object
        portfoioObj.social = {};
        if (youtube) portfoioObj.social.youtube = youtube;
        if (facebook) portfoioObj.social.facebook = facebook;
        if (instagram) portfoioObj.social.instagram = instagram;

        try {
            let portfolio = await Portfolio.findOne({ user: req.user.id });

            if (portfolio) {
                //if portfolio with the same category and subcategory exists already just update it
                portfolio = await Portfolio.findOneAndUpdate(
                    { user: req.user.id },
                    { $set: portfoioObj },
                    { new: true }
                );

                return res.json({ portfolio });
            }

            //create
            portfolio = new Portfolio(portfoioObj);

            await portfolio.save();
            res.json({ portfolio });

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    });

router.post('/category/:categoryId', async (req, res) => {
    try {
        const userId = req.body.userId;

        const portfolios = await Portfolio.find({
            $and: [
                { user: { $ne: userId } },
                { category: req.params.categoryId }]
        }).populate('user', ['name']);

        if (!portfolios) {
            return res.status(400).json({ msg: 'No Portfolios for this category' })
        }

        res.json(portfolios);

    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Get all profiles
router.get('/', async (req, res) => {
    try {
        const portfolios = await Portfolio.find().populate('user', ['name']);
        res.json({ portfolios });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error')
    }
});

router.get('/:porfolio_id', async (req, res) => {
    try {
        const portfolio = await Portfolio.findOne({ _id: req.params.porfolio_id }).populate('user', ['name']);

        if (!portfolio) {
            return res.status(400).json({ msg: 'Portfolio does not exist!' });
        }
        res.json(portfolio);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});

//delete portfolio
router.delete('/:porfolio_id', async (req, res) => {
    try {
        const portfolio = await Portfolio.findOne({ _id: req.params.porfolio_id });
        const category = await Category.findOne({ _id: portfolio.category });

        const newCategoryUserCount = category.users - 1;

        await Portfolio.deleteOne({ _id: req.params.porfolio_id });

        await updateUserCount(newCategoryUserCount, Category, category.name);

        res.json({ msg: 'User deleted!' });

    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }

});



module.exports = router;