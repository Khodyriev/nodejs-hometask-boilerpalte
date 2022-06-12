const { FighterRepository } = require('../repositories/fighterRepository');

class FighterService {
    // TODO: Implement methods to work with fighters

    getFighter() {          //GET /api/fighters
        return FighterRepository.getAll();
       };
 
       getFighterById(id) {          //GET /api/fighters/:id
         return FighterRepository.getOne(id);
        };
 
        updateFighterData(id, data) {               //POST /api/fighters
         return FighterRepository.update(id, data);
        };
 
        createFighter(userData) {                   //PUT /api/fighters/:id
         return FighterRepository.create(userData);
        };
 
        deleteFighter(id) {                         //DELETE /api/fighters/:id
         return FighterRepository.delete(id);
        };
 
}

module.exports = new FighterService();