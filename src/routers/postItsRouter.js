const express = require('express');
const router = express.Router();

const {createOne, readAll, readOne, updateOne, deleteOne, startTest} = require("../controllers/postItController")

router.get('/', readAll)
router.get('/tests', startTest)
router.get('/:id', readOne)
router.post('/', createOne)
router.put('/:id', updateOne)
router.delete('/:id', deleteOne)







module.exports = router;
