const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { cloudinary } = require('../../config/cloudinary');

const Post = require('../../models/Post');

router.get('/:id', async (req, res) => {
    try {
        const posts = await Post.find({ portfolio: req.params.id });

        if (!posts) {
            return res.status(400).json({ msg: 'No Posts Yet' });
        }

        res.json(posts);

    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.post('/:id',
    [check('file', 'Please select file to upload').not().isEmpty()],

    async (req, res) => {

        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });

            }
            const { file, description } = req.body;

            const uploadResponse = await cloudinary.uploader.upload(file, {
                upload_preset: 'posts',
                resource_type: 'auto'
            });
            console.log('upload response', uploadResponse);

            const media = uploadResponse.public_id;
            const type = uploadResponse.resource_type;

            const post = new Post({ media, description, type, portfolio: req.params.id });
            await post.save();
            res.json({ post });

        } catch (err) {
            console.log(err);
            res.status(500).send('Server Error');
        }
    });

module.exports = router;