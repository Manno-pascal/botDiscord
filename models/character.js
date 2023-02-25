const mongoose = require('mongoose')

const characterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Pas de nom saisi'],
    },
    player: {
        type: String,
        required: [true, 'Pas de joueur saisi'],
    },
    race: {
        type: String,
        required: [true, 'Pas de race saisi'],
    },
    class: {
        type: String,
        required: [true, 'Pas de classe saisi'],
    },
    healthPoints: {
        type: Number,
        required: [true, 'Pas de PV saisi'],
    },
    level: {
        type: Number,
        required: [true, "Pas de level saisi"],
        default: 1,
    },
    experience: {
        type: Number,
        required: [true, "Pas d'experience saisi"],
        default: 0,
    },
    alignment: {
        type: String,
        required: [true, "Pas d'alignement saisi"]
    },
    strength: {
        type: Number,
        required: [true, "Pas de force saisi"]
    },
    dexterity: {
        type: Number,
        required: [true, "Pas de dexterité saisi"]
    },
    intelligence: {
        type: Number,
        required: [true, "Pas d'intelligence saisi"]
    },
    charisma: {
        type: Number,
        required: [true, "Pas de charisme saisi"]
    },
    constitution: {
        type: Number,
        required: [true, "Pas de constitution saisi"]
    },
    wisdom: {
        type: Number,
        required: [true, "Pas de sagesse saisi"]
    },
//     inventory: {
//         sous : {
//             type:Array,
// }
        
//     },
campagneId: {
    type: String,
        required: [true, "Pas de sagesse saisi"]
},


})

const CharacterModel = mongoose.model('Characters', characterSchema);

module.exports = CharacterModel