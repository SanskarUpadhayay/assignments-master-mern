const { Router } = require("express");
const router = Router();
const { User,Course } = require('../db/index');
const userMiddleware = require("../middleware/user");

// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic
    const username = req.body.username;
    const password = req.body.password;
    const existingUser = User.findOne({username:username,password:password});
    if(existingUser == null){
        const user = new User({username:username,password:password});
        user.save();
        res.json({
            message: 'User created successfully'
        });
    }
    else{
        res.status(400).json({
            message: 'User already exists'
        });
    }
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const user = await User.find({username: req.body.username,password:req.body.password});
    if(user!=null){
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

router.get('/courses', userMiddleware,async (req, res) => {
    // Implement listing all courses logic
    try{
        const courses = await Course.find({});
        res.json(courses);
    } catch(error){
        res.status(500).json({
            msg:"Server Error"
        });
    }
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const username = req.headers.username;
    await User.updateOne({username:username},{
        "$push":{
            purchasedCourses : courseId
        }
    });
    res.json({
        msg:"Purchase complete"
    });
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const username = req.headers.username;
    const user = await User.findOne({username:username});

    const courses = await Course.find({
        _id: {
            "$in": user.purchasedCourses
        }
    });

    res.json({
        courses: courses
    })
});

module.exports = router