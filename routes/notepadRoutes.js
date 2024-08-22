const express = require('express');
const noteModel = require('../models/notepadModels');

const noteRouter = express.Router();
const renderRouter = express.Router();

renderRouter.route('/')
.get(async (req, res) => {
    const notes = await noteModel.find().sort({ createdAt: 'desc' });
    res.render('index', { notes: notes });
});

renderRouter.route('/note/:slug')
.get(async (req, res) => {
    const notes = await noteModel.findOne({ slug: req.params.slug }, 'name note sanitizedHTML slug createdAt');
   res.render('read', { notes });
});

noteRouter.route('/new')
.post(async (req, res) => {
    const { name, note, sanitizedHTML } = req.body;
    await noteModel.create({ name, note, sanitizedHTML });
    res.redirect('/');
});

noteRouter.route('/:slug')
.put((req, res) => {
    const { name, note } = req.body;
    
    noteModel.findOne({ slug: req.params.slug }).then(id => {
        id.set({ name, note });
        id.save();
        res.redirect(`/`);
    });
});

noteRouter.route('/:slug')
.delete(async (req, res) => {
    await noteModel.findOneAndDelete({ slug: req.params.slug });
    res.redirect('/');
});

module.exports = { noteRouter, renderRouter };