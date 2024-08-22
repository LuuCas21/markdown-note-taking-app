const mongoose = require('mongoose');
const marked = require('marked');
const createDomPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const dompurify = createDomPurify(new JSDOM().window);
const slugify = require('slugify');

const noteSchema = new mongoose.Schema({
    name: {
        type: String,
        default: '',
        unique: false,
        required: true
    },
    note: {
        type: String,
        default: '',
        unique: false,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    sanitizedHTML: {
        type: String,
        required: true
    },
});

noteSchema.pre('validate', function(next) {
    if (this.name) {
        this.slug = slugify(this.name, {
            lower: true,
            strict: true
        });
    }
    if (this.note) {
        this.sanitizedHTML = dompurify.sanitize(marked.parse(this.note));
    }

    next();
})

const noteModel = mongoose.model('notes', noteSchema, 'notes');

module.exports = noteModel;