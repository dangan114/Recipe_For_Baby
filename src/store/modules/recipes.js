import api from 'src/plugins/axios.js'

const state = {
    recipes: []
}

const getters = {
    getRecipes: state => state.recipes
}

const actions = {

    async getAllExistingRecipes({ commit }) {
        const response = await api.get('/recipes');
        commit('setAllExistingRecipes', response.data.result)
    },

    async addRecipe({ commit }, recipe) {
        await api.post('/insert', recipe)
        commit('setNewRecipe', recipe)      
    },

    
}

const mutations = {
    setAllExistingRecipes(state, recipes) {
        state.recipes = recipes   
    },

    setNewRecipe(state, newRecipe) {
        state.recipes.push(newRecipe)
    }
}

export default {
    state, getters, actions, mutations
}