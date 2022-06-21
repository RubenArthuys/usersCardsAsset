var express = require('express');
var router = express.Router();
var request = require('sync-request');

//Photos de profile dans images
var profilePics = [
  "images/boy.svg",
  "images/girl.svg",
  "images/man-2.svg",
  "images/girl-3.svg",
  "images/man.svg",
  "images/girl-2.svg",
  "images/boss.svg",
  "images/man-2.svg",
  "images/girl-3.svg",
  "images/man.svg"
]

//Home Page
router.get('/', function(req, res, next) {
  var requete = request("GET", "https://jsonplaceholder.typicode.com/users");
  var users = JSON.parse(requete.body);
  // console.log(users);
  for(var i = 0; i<users.length; i++){
    users[i].images = profilePics[i]
  }
  res.render('index', { users });
});

//Messages
//On donne à la route le nom qu'on veut :
router.get('/messages', function(req, res, next) {
  // console.log(req.query.id);  
  //Par contre là les paramètres doivent être précis, comme sur le JSON !
  var requete = request("GET", "https://jsonplaceholder.typicode.com/posts?userId="+req.query.id);
  var resultWSPost = JSON.parse(requete.body);

  //Et on renvois aussi un vrai fichier ejs !
  res.render('posts', { resultWSPost });
});

//Comments
router.get('/comments', function(req, res, next) {
  // console.log(req.query.id);  
  var requete = request("GET", "https://jsonplaceholder.typicode.com/comments?userId="+req.query.id);
  var resultWSComments = JSON.parse(requete.body);
  res.render('comments', { resultWSComments });
});

module.exports = router;
