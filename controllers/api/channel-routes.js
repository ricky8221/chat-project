const router = require('express').Router();
const { User, Channel, UserChannel } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const channelName = `${req.session.username} & ${req.body.username}`

        const newChannel = await Channel.create({name: channelName});

        const channel = newChannel.get({ plain: true });
        
        const userData = await User.findAll({
            where: {
                username: req.body.username
            }
        });

        const user = userData.map((data) => data.get({ plain: true }));

        const newUserChannel1 = await UserChannel.create({
            userId: req.session.user_id,
            channelId: channel.id
        })

        const newUserChannel2 = await UserChannel.create({
            userId: user.id,
            channelId: channel.id
        })

        console.log(channel);

        // res.status(200).redirect(`/channel/${channel.id}`);
        res.status(200).json(channel);
    } catch (err) {
        res.status(400).json(err);
    }
});

// router.put('/:id', async (req, res) => {
//     try {
//         const updatePost = await Post.update( 
//             {
//                 ...req.body,
//                 userId: req.session.user_id,
//             },
//             {
//                 where: {
//                     id: req.params.id
//                 }
//             });

//         res.status(200).json(updatePost);
//     } catch (err) {
//         res.status(400).json(err);
//     }
// });

// router.delete('/:id', async (req, res) => {
//     try {
//         const deletedPost = await Post.destroy( 
//             {
//                 where: {
//                     id: req.params.id
//                 }
//             });
//         res.status(200).json(deletedPost);
//     } catch (err) {
//         res.status(400).json(err);
//     }
// });

module.exports = router;