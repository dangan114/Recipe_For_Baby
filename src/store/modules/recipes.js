const state = {
    recipes: [
        {
            name: "Suon Kho Tieu",
            image: null,
            ingredients: null,
            instructions: null 
        },
        {
            name: "Bo Kho",
            image: null,
            ingredients: null,
            instructions: null 
        }
    ]
}

const getters = {
    getRecipes: state => state.recipes
}

const actions = {
    addRecipe({ commit }, recipe) {
        commit('addRecipe', recipe)
    }
}

const mutations = {
    addRecipe(state, newRecipe) {
        state.recipes.push(newRecipe)
    }
}

export default {
    state, getters, actions, mutations
}