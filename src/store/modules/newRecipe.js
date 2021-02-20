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
        commit('setName', name)
    },

    changeImage({ commit }, image) {
        commit('setImage', image)
    },

    changeIngredients({ commit }, ingredients) {
        commit('setIngredients', ingredients)
    },

    changeInstructions({ commit }, instructions ) {
        commit('setInstructions', instructions)
    },
    
    addIngredient({ commit }, ingredient) {
        commit('setIngredient', ingredient)
    },

    addInstruction({ commit }, instruction) {
        commit('setInstruction', instruction)
    },

    updateIngredient({ commit }, index, ingredient) {
        commit('updateAndSetIngredient', index, ingredient)
    },

    removeIngredient({ commit }, index) {
        commit('removeAndSetIngredient', index)
    },

    removeInstruction({ commit }, index) {
        commit('removeAndSetInstruction', index)
    },
}

const mutations = {
    resetRecipeState(state) {
        Object.assign(state, getDefaultState())
    },

    setName(state, newName) {
        state.recipe.name = newName 
    },

    setImage(state, newImage) {
        state.recipe.image = newImage
    },

    setIngredients(state, newIngredients) {
        state.recipe.ingredients = newIngredients
    },

    setInstructions(state, newInstructions) {
        state.recipe.instructions = newInstructions
    },

    setIngredient(state, newIngredient) {
        state.recipe.ingredients.push(newIngredient)
    },

    setInstruction(state, newInstruction) {
        state.recipe.instructions.push(newInstruction)
    },

    updateAndSetIngredient(state, index, newIngredient) {
        state.recipe.ingredients.splice(index, 1, newIngredient)
    },

    removeAndSetIngredient(state, index) {
        state.recipe.ingredients.splice(index, 1)
    },

    removeAndSetInstruction(state, index) {
        state.recipe.instructions.splice(index, 1)
    }
}

export default {
    state, getters, actions, mutations
}