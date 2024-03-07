const Users = require('../models/users');

exports.addUsers = (req, res, next) => {
  res.render('add-user' ,{
    pageTitle:'Add User',
    path:'/add-user'
  })
}


exports.postAddUser = (req, res, next) => {
  console.log(req.body)
  const name = req.body.name;
  const lastname = req.body.lastname;
  const imageUrl = req.body.imageUrl;
  const users = new Users(null, name, lastname, imageUrl);
  users.save();
  res.redirect('/');
}


exports.getAddUser = (req, res, next) => {
  Users.fetchAll(users => {
    res.render('users' ,{
      users:users,
      pageTitle:'Add User',
      path:'/users'
    })
  })
}

exports.getEditUser = (req, res, next) => {
  const editMode = req.query.edit;
  if(!editMode) {
    return res.redirect('/')
  }
  const userId = req.params.userId;
  Users.findById(userId, (user) => {
    res.render('edit',{
      pageTitle:'Edit User',
      path:'/edit',
      editing:editMode,
      user:user
    })
  })
}

exports.postEditUser = (req, res, next) => {
  const userId = req.body.userId;
  const name = req.body.name;
  const lastname = req.body.lastname;
  const imageUrl = req.body.imageUrl;
  const updatedUser = new Users(
      userId,
      name,
      lastname,
      imageUrl
  )
  console.log(req.body)
  updatedUser.save();
  res.redirect('/');
}

exports.deleteUser = (req, res, next) => {
  const userId = req.body.userId;
  Users.deleteUser(userId);
  res.redirect('/')
}
