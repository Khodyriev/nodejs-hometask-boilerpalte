const { Router } = require('express');
const FighterService = require('../services/fighterService');
const { responseMiddleware: middleware } = require('../middlewares/response.middleware');
const { createFighterValid, updateFighterValid } = require('../middlewares/fighter.validation.middleware');

const router = Router();

const getFighterData = (data, res, next) => {
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
    (req, res, next) => getFighterData(FighterService.getFighters(), res, next),
    middleware
);

router.get(
    '/:id',
    (req, res, next) => getFighterData(FighterService.getFighterById(req.params.id), res, next),
    middleware
);

router.post(
    '/',
    createFighterValid,
    (req, res, next) => getFighterData(FighterService.addFighter(req.body), res, next),
    middleware
);

router.put(
    '/:id',
    updateFighterValid,
    (req, res, next) => getFighterData(FighterService.updateFighter(req.params.id, req.body), res, next),
    middleware
);

router.put(
    '/:id',
    (req, res, next) => getFighterData(FighterService.deleteFighter(req.params.id), res, next),
    (req, res, next) => {
        if (res.data.length) {
            res.data = { message: `Fighter with id: ${id} deleted` };
            res.statusCode = 200;
        } else {
            res.statusCode = 404;
        }
        next();
    },
    middleware);

// TODO: Implement route controllers for fighter

module.exports = router;