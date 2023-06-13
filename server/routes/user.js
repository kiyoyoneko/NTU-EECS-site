const router = require('express').Router();
let User = require('../schemas/user');

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/add').post((req, res) => {
  
  const newUser = new User({
    username: req.body.username,
    password: req.body.password,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    permission: req.body.permission
  });

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:username').get((req, res) => {
    User.find({username:req.params.username})
      .then(users => res.json(users))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  
  router.route('/:username').delete((req, res) => {
    User.findOneAndDelete({username:req.params.username})
      .then(() => res.json('User deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/update/:username').post((req, res) => {
    User.findOne({username:req.params.username})
      .then(user => {
        User.replaceOne({username:req.params.username},{
          username: req.body.username||user.username,
          password: req.body.password||user.password,
          name: req.body.name||user.name,
          email: req.body.email||user.email,
          phone: req.body.phone||user.phone,
          permission: req.body.permission||user.permission
        }).then(() => res.json('User updated!'))
              .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  
    
  });

module.exports = router;