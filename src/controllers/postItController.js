const prisma = require("../../prisma/client")

async function startTest(req, res) {

    const data = [
        {
            "title": "Connection DB",
            "description": "Connect Prisma to DB",
            "isDone": true
        },
        {
            "title": "Meal",
            "description": "Eat a meal"
        }
    ]

    try {
        await prisma.$executeRawUnsafe(`TRUNCATE PostIt;`)
        // insert 2 postIt
        // await prisma.postIt.createMany({
        //     data
        // })
        res.sendStatus(200)
    } catch (error) {
        console.error(error)
        res.status(500).json("Error reset table")
    }
}

async function createOne(req, res) {

    const data = { title: req.body.title, description: req.body.description, isDone: req.body.isDone }

    try {
        const newPostIt = await prisma.postIt.create({
            data
        })
        res.status(201).json(newPostIt)
    } catch (error) {
        console.error(error)
        res.status(500).json("Error new post-it")
    }
}

async function readAll(req, res) {
    try {
        const allPostIts = await prisma.postIt.findMany()
        res.status(200).json(allPostIts)
    } catch (error) {
        console.error(error)
        res.status(500).json("Error get post-its")
    }
}

async function readOne(req, res) {
    try {
        const onePostIt = await prisma.postIt.findUnique({
            where: { id: parseInt(req.params.id) }
        })
        if (onePostIt) {
            res.status(200).json(onePostIt)
        } else {
            res.sendStatus(404)
        }
    } catch (error) {
        console.error(error)
        res.status(500).json("Error get one post-it")
    }
}

async function updateOne(req, res) {

    const data = { title: req.body.title, description: req.body.description, isDone: req.body.isDone }

    try {
        const onePostIt = await prisma.postIt.update({
            where: { id: parseInt(req.params.id) },
            data
        })
        res.status(201).json(onePostIt)
    } catch (error) {
        console.error(error)
        res.status(500).json("Error get one post-it")
    }
}

async function deleteOne(req, res) {
    try {
        // use deleteMany because delete (one) throw an error when it doesn't found a row 
        await prisma.postIt.deleteMany({
            where: { id: parseInt(req.params.id) }
        })
        res.sendStatus(204)
    } catch (error) {
        console.error(error)
        res.status(500).json("Error delete one post-it")
    }
}


module.exports = {
    createOne,
    readAll,
    readOne,
    updateOne,
    deleteOne,
    startTest
}