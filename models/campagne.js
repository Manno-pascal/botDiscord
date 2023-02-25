const mongoose = require('mongoose')

const campagneSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Pas de nom saisi'],
    },
    gameMasterId: {
        type: Number,
        required: [true, 'Pas de race saisi'],
    },
    gameMasterName: {
        type: String,
        required: [true, 'Pas de race saisi'],
    },
    status: {
        type: Boolean,
        required: [true, 'Pas de classe saisi'],
        default: true,
    },
    characters: {
        type:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Characters"
        }],

    },
    
})

const CampagneModel = mongoose.model('Campagnes', campagneSchema);

module.exports = CampagneModel