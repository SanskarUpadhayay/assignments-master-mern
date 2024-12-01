const { Router } = require("express");
const jwt = require('jsonwebtoken');
const adminMiddleware = require("../middleware/admin");
const {Admin,Course} = require("../db/index");
const router = Router();

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;
    const existingUser = await Admin.find({username,password});
    if(existingUser == null){
        await Admin.create({
            username: username,
            password: password
        });
        res.json({
            message: 'Admin created successfully'
        })
    }
    else{
        res.json({
            message: 'Admin already exists'
        })
    }
});

router.post('/signin',async (req, res) => {
    // Implement admin signup logic
    const admin = await Admin.find({username: req.body.username,password:req.body.password});
    if(admin!=null){
        const token = jwt.sign({username:req.body.username,password:req.body.password},'SECRET_KEY');
        res.json({
            token: token
        })
    }
    else{
        res.json({
            message: 'Admin does not exist'
        })
    }
});

router.post('/courses', adminMiddleware,async (req, res) => {
    // Implement course creation logic
    await Course.create({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        imageLink : req.body.imageLink
    });
    res.json({
        message: 'Course created successfully'
    })
});

router.get('/courses', adminMiddleware, async(req, res) => {
    // Implement fetching all courses logic
    const courses = await Course.find({});
    res.json(courses);
});

module.exports = router;