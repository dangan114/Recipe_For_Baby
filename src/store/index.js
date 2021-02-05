import Vue from 'vue'
import Vuex from 'vuex'

import recipes from 'src/store/modules/recipes.js'
import newRecipe from 'src/store/modules/newRecipe.js'

Vue.use(Vuex)

export const store = new Vuex.Store({
    modules: {
        recipes, newRecipe
    }
})