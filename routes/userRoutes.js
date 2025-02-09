const { Router } = require('express');
const UserService = require('../services/userService');
const { createUserValid, updateUserValid } = require('../middlewares/user.validation.middleware');
const { responseMiddleware: middleware } = require('../middlewares/response.middleware');


const router = Router();

// TODO: Implement route controllers for user

const getUserData = (data, res, next) => {
  try {
      res.data = data;
  } catch (error) {
      res.err = error;
  } finally {
      next();
  }
};

router.get(
  '/',
  (req, res, next) => getUserData(UserService.getUsers(), res, next),
  middleware
);

router.get(
  '/:id',
  (req, res, next) => getUserData(UserService.getUserById(req.params.id), res, next),
  middleware
);

router.post(
  '/',
  createUserValid,
  (req, res, next) => getUserData(UserService.addUser(req.body), res, next),
  middleware
);

router.put(
  '/:id',
  updateUserValid,
  (req, res, next) => getUserData(UserService.updateUser(req.params.id, req.body), res, next),
  middleware
);

router.put(
  '/:id',
  (req, res, next) => getUserData(UserService.deleteUser(req.params.id), res, next),
  (req, res, next) => {
      if (res.data.length) {
          res.data = { message: `User with id: ${id} deleted` };
          res.statusCode = 200;
      } else {
          res.statusCode = 404;
      }
      next();
  },
  middleware);



module.exports = router;