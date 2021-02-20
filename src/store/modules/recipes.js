import axios from 'axios'

const state = {
    recipes: []
}

const getters = {
    getRecipes: state => state.recipes
}

const actions = {

    async getAllExistingRecipes({ commit }) {
        const response = await axios.get("http://localhost:3000/recipes/");
        commit('setAllExistingRecipes', response.data.result)
    },

    async addRecipe({ commit }, recipe) {
        await axios.post('http://localhost:3000/recipes/insert', recipe)
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