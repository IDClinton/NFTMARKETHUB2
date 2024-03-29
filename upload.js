if (process.env.NODE_ENV !== "production"){
    require("dotenv").config()
}

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const multer = require("multer");
const bcryptjs = require("bcryptjs");
const passport = require("passport");
const initializePassport = require("./passport-config")
const flash = require("express-flash")
const session = require("express-session")
// const helpers = require("./helper")
const nodemailer = require("nodemailer")
const cookieParser = require('cookie-parser');
const redis = require('redis');
const RedisStore = require('connect-redis').default;



initializePassport(
    passport,
    email => users.find(user => user.email === email), 
    id => users.find(user => user.id === id)
    
)



const { createClient } = require('redis');


// console.log('Creating Redis client');
const redisClient = createClient({
    password: 'Gcjj5XpOXjuD6B78neSwyU8JiM6ADvF7',
    socket: {
        host: 'redis-12200.c256.us-east-1-2.ec2.cloud.redislabs.com',
        port: 12200
    }
});

if(!redisClient.isOpen){
    redisClient.connect()
}
if(!redisClient.connected){
    console.log('Redis Connecting')
}


const app = express();
const connectRedis = () => {
    return new Promise((resolve, reject) => {
        redisClient.on('connect', () => {
            console.log('Connected to Redis server');
            resolve();
        });
        redisClient.on('error', (err) => {
            console.error('Error connecting to Redis:', err);
            reject(err);
        });
    });
};


// secretidhere

app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use(flash())

    app.use(session({
        store: new RedisStore({ client: redisClient }),
        secret: 'ghdgdgdjsdhd',
        resave: false,
        saveUninitialized: false
    }));


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("./public"));
app.use(express.static("pictures"));
app.use(passport.initialize())
app.use(passport.session())
app.use(function(err, req, res, next){
    console.log(err);
    })

redisClient.on('connect', function() {
    console.log('Connected to Redis server');
});

redisClient.on('error', function(err) {
    console.error('Error connecting to Redis:', err);
});

redisClient.on('end', function(err) {
    console.log('Redis Closed');
});



    const path = require("path");
const { log } = require("console");
const { request } = require("http");

    let filename = path.basename("/Users/hp/Downloads/opnseas.com/upload/pictures");



    
    
    
// app.use( express.static(path.join(__dirname, 'pictures')))

// image upload
// var storage= multer.diskStorage({
//     destination: function(req, file, cb){
//         cb(null, "./pictures")    

//     },
//     filename: function(req, file, cb){
//         cb(null, file.fieldname+"_"+Date.now()+"_"+file.originalname);
//     }
// });




// var picture = multer({
//     storage: storage
// }).single("image");

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "pictures")
    },

    filename:(req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})



const upload = multer({storage: storage})

const users = []
let posts = [];
const updates =[];

                                     let number = 10000;

                                   function increaseNumberByTwo() {  
                                       number += 50; 
                                        
                                    } 
                                    
                                    setInterval(increaseNumberByTwo, 3600000); 
// let number = 10000;

// function increaseNumberByTwo() {
//     number += 100;
    
// }

// setInterval(increaseNumberByTwo, 10000000); // Increment number every 2 minutes





app.get("/", function (req, res){

    res.render("index.html")
    // res.render("page", {
    //     posts: posts
    // });
    
});

app.get("/page", function (req, res){

    const userPosts = posts.filter(post => post.userId === req.user.id);
    res.render("page", { posts: userPosts, number });
  
    //   res.render("page", {
    //     posts: posts, helpers, number, name :req.user.name, updates
    // } );
   
    
})

app.get("/upload", function (req, res){

    const user = req.user;
 
      res.render("upload", {user, name :req.user.name, updates});
   

   
})



app.get("/dash", checkAuthenticated, function (req, res){
    
    function getNumberOfPostsByUser(userId) {
        // Filter posts array to find posts associated with the given user ID
        const userPosts = posts.filter(post => post.userId === userId);
        // Return the number of posts by the user
        return userPosts.length;
    
       
    }
    const userIdd = req.user.id; // Assuming you have access to the user's ID
    const numberOfPosts = getNumberOfPostsByUser(userIdd);
    res.render("dash", {name: req.user.name, 
        updates, numberOfPosts: numberOfPosts // hdhd
    });
})

app.get("/payment2.html", function(req,res){
    function getNumberOfPostsByUser(userId) {
        // Filter posts array to find posts associated with the given user ID
        const userPosts = posts.filter(post => post.userId === userId);
        // Return the number of posts by the user
        return userPosts.length;
    
       
    }
    const userIdd = req.user.id; // Assuming you have access to the user's ID
    const numberOfPosts = getNumberOfPostsByUser(userIdd);
    
    res.render("payment2",{numberOfPosts: numberOfPosts})
})

app.get("/login", checkNotAuthenticated, function (req, res){
    res.render("login");
})

app.get("/signup", checkNotAuthenticated, function (req, res){
    res.render("signup");
})





app.post("/login", passport.authenticate("local", {
   
    successRedirect: "dash",
    failureRedirect: "login",
    failureFlash: true
}))

app.post("/login2", (req, res) =>{
   
  res.redirect("wallet.html")
})

app.post("/signup", async(req, res)=>{
    try {
        const hashedPassword = await bcryptjs.hash(req.body.password, 10)
        users.push({
            id: Date.now().toString(),
            name: req.body.firstName,
            email: req.body.email,
            password: hashedPassword

        })
        console.log(users);
        res.redirect("login")
    } catch (e) {
        console.log(e);
        res.redirect("signup")
    }
})


app.post("/connect", function(req,res){
    res.redirect("/tax.html")
})

app.post("/upload",upload.single("image"), function(req, res){


    if (!req.isAuthenticated()) {
        // Handle unauthenticated user (optional)
        return res.redirect("/login/login.html");
    }

    // Assuming you have a User model with a unique ID field
    const userId = req.user.id;

    // Create a new post object with the user ID
    const post = {
        pic: req.file.filename,
        title: req.body.postTitle,
        userId: userId  // Associate the post with the authenticated user
    };

    // Push the post object to the posts array or save it to your database
    posts.push(post);

    res.redirect("/page");
   
    // const post = ({
    //     pic: req.file.filename,
    //     title: req.body.postTitle

    // });

    // console.log(filename);

    // posts.push(post);

    // res.redirect("/page")
    
})





function checkAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect("login")
}


function checkNotAuthenticated(req, res, next){
    if(req.isAuthenticated()){
     return res.redirect("/dash")
    }
   next()
}

const PORT = process.env.PORT || 3000

app.listen(PORT, function(){
    console.log("server is running on port 3000")
});
