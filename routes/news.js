const express = require('express');
const router = express.Router()

const News = require('../models/News')

//1. save News

router.post('/save', (req, res) => {
    const newNews = new News({
        headline: req.body.headline,
        description: req.body.description,
        department: req.body.department,
        imageUrl: req.body.imageUrl,
    });

    newNews.save().then((news) => res.json(news)).catch(err => res.json(err));
})

//2. Get All news
router.get('/get-all', (req, res) => {
    News.find().then(((news) => res.send(news))).catch(err => res.status(404).json({
        noNesFound: "No News found"
    }));
})

//3. Get News By Id
router.get('/get/:id', (req, res) => {
    News.findById(req.params.id)
        .then((news) => res.json(news))
        .catch(err => res.status(404).json({
            noNewsFound: 'No News found with that ID'
        }));
})

//4. Get By Dept
router.post('/get-by-dept', (req, res) => {
    var dept = req.body.department;
    News.find({
            department: dept
        })
        .then(news => res.json(news))
        .catch(err => res.status(404).json({
            noNewsFound: "No News found"
        }));
});

//5. Edit Notice
router.post('/edit/:id', (req, res) => {
    var newData = {
        headline: req.body.subject,
        description: req.body.description,
        department: req.body.department,
        imageUrl: req.body.imageUrl,
    };

    News.findOneAndUpdate({
        _id: req.params.id
    }, {
        $set: newData
    }, {
        new: true
    }).then(news => res.json(news)).catch(err => console.log(err));
});

//6. Delete News by
router.delete('/delete/:id', (req, res) => {
    News.findById(req.params.id)
        .then((news) => {
            news.remove().then(() => req.json({
                success: true
            }));
        })
        .catch((err) => res.status(404).json({
            success: false
        }));
});

//7. Delete All
router.delete('/delete-all', (req, res) => {
    News.deleteMany()
        .then(data => res.send({
            success: true
        }))
        .catch(err => res.status(404).json({
            success: false
        }));
})

// router.get('/get', (req, res) => {
//     res.send("hey");
// });

module.exports = router;