const { Router } = require("express");
const mongoose = require('mongoose');
const adminMiddleware = require("../middleware/admin");
const {Admin,Course} = require('../db/index');
const router = Router();

mongoose.connect("mongodb+srv://armedzombie:6POXcSR4gDn7JuRt@cluster0.bln31ts.mongodb.net/course_app");

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    try {
        const username = req.body.username;
    const password = req.body.password;
    const existingUser = await Admin.findOne({username:username});
    if(existingUser == null){
        const user = new Admin({
            username:username,
            password:password,
        });
        user.save();
        res.status(200).send("User registered successfully");
    }
    else{
        res.send("User with username already exists");
    }
    } catch (error) {
        res.status(500).send("Server error");
    }
    

});

router.post('/courses', adminMiddleware, (req, res) => {
    // Implement course creation logic
    try{
        const course = new Course({title: req.body.title, description: req.body.description, price: req.body.price, imageLink: req.body.imageLink});
        course.save();
        res.send("Course created successfully");
    }
    catch (error){
        res.status(500).send("Server error while creating course");
    }
});

router.get('/courses', adminMiddleware,async (req, res) => {
    // Implement fetching all courses logic
    try{
        const courses = await Course.find({});
        res.json(courses);
    } catch(error){
        res.status(500).json({
            msg:"Server Error"
        });
    }
});

module.exports = router;