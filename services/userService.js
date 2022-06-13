const { UserRepository } = require('../repositories/userRepository');

class UserService {

    // TODO: Implement methods to work with user

    getUsers() {          //GET /api/users
       return UserRepository.getAll();
      };

      getUserById(id) {          //GET /api/users/:id
        return UserRepository.getOne({ id });
       };

       updateUserData(id, data) {               //POST /api/users
        return UserRepository.update(id, data);
       };

       createUser(userData) {                   //PUT /api/users/:id
        return UserRepository.create(userData);
       };

       deleteUser(id) {                         //DELETE /api/users/:id
        return UserRepository.delete({ id });
       };


    search(search) {
        const item = UserRepository.getOne(search);
        if(!item) {
            return null;
        }
        return item;
    }
}

module.exports = new UserService();