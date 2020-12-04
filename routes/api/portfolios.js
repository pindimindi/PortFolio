const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Portfolio = require('../../models/Porfolio');
const User = require('../../models/User');


// Get loged in users portfolio
router.get('/me', auth, async (req, res) => {
    try {
        const myPortfolio = await Portfolio.findOne({ user: req.user.id }).populate('user', ['name']);

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
        }

        const {
            category,
            subCategory,
            location,
            description,
            website,
            youtube,
            facebook,
            instagram
        } = req.body;

        //Build Portfolio object 
        const portfoioObj = {
            user: req.user.id,
            category,
            subCategory,
            location
        };
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
                //update
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

router.get('/user/:user_id', async (req, res) => {
    try {
        const portfolio = await Portfolio.findOne({ user: req.params.user_id }).populate('user', ['name']);

        if (!portfolio) {
            return res.status(400).json({ msg: 'Profile does not exist!' });
        }
        res.json({ portfolio });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});

// Delete portfolio, user and posts
router.delete('/user/:user_id', auth, async (req, res) => {
    try {
        await Portfolio.findOneAndRemove({ user: req.user.id });
        await User.findOneAndRemove({ _id: req.user.id });

        res.json({ msg: 'User deleted!' })
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})



module.exports = router;