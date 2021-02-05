const getDefaultState = () => {
    return {
        recipe: {
            name: '',
            image: '',
            ingredients: [],
            instructions: []
        }
    }
}

const state = getDefaultState()

const getters = {
    getRecipe: state => state.recipe,
    getName: state => state.recipe.name,
    getImage: state => state.recipe.image,
    getIngredients: state => state.recipe.ingredients,
    getIngredientsString: state => {
        return state.recipe.ingredients.map(ingredient => {
            return ingredient.ingredientAmount + " of " + ingredient.ingredientName
        })
    },

    getInstructions: state => state.recipe.instructions
}

const actions = {

    resetRecipeState({ commit }) {
        commit('resetRecipeState')
    },

    changeName({ commit }, name) {
        commit('changeName', name)
    },

    changeImage({ commit }, image) {
        commit('changeImage', image)
    },

    changeIngredients({ commit }, ingredients) {
        commit('changeIngredients', ingredients)
    },

    changeInstructions({ commit }, instructions ) {
        commit('changeInstructions', instructions)
    },
    
    addIngredient({ commit }, ingredient) {
        commit('addIngredient', ingredient)
    },

    addInstruction({ commit }, instruction) {
        commit('addInstruction', instruction)
    },

    updateIngredient({ commit }, index, ingredient) {
        commit('changeIngredient', index, ingredient)
    },

    removeIngredient({ commit }, index) {
        commit('removeIngredient', index)
    },

    removeInstruction({ commit }, index) {
        commit('removeInstruction', index)
    },
}

const mutations = {
    resetRecipeState(state) {
        Object.assign(state, getDefaultState())
    },

    changeName(state, newName) {
        state.recipe.name = newName 
    },

    changeImage(state, newImage) {
        state.recipe.image = newImage
    },

    changeIngredients(state, newIngredients) {
        state.recipe.ingredients = newIngredients
    },

    changeInstructions(state, newInstructions) {
        state.recipe.instructions = newInstructions
    },

    addIngredient(state, newIngredient) {
        state.recipe.ingredients.push(newIngredient)
    },

    addInstruction(state, newInstruction) {
        state.recipe.instructions.push(newInstruction)
    },

    updateIngredient(state, index, newIngredient) {
        state.recipe.ingredients.splice(index, 1, newIngredient)
    },

    removeIngredient(state, index) {
        state.recipe.ingredients.splice(index, 1)
    },

    removeInstruction(state, index) {
        state.recipe.instructions.splice(index, 1)
    }
}

export default {
    state, getters, actions, mutations
}