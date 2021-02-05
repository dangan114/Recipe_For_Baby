<template>
    <b-container fluid>
        <b-row class="justify-content-md-center mt-4">
            <b-button v-b-modal.new-recipe-modal variant="info"><b-icon-plus></b-icon-plus> Create a new Recipe</b-button>
        </b-row>

        <RecipeContainer />

        <b-row>
                <b-col cols="4" v-for="recipe in this.getRecipes" :key="recipe.name">
                    <b-card no-body class="overflow-hidden my-4" style="max-width: 540px;">
                        <b-row no-gutters class="text-center" align-v="center">
                        <b-col md="6">
                            <b-card-img v-bind:src="recipe.image" alt="Image" class="rounded-0"></b-card-img>
                        </b-col>
                        <b-col md="6">
                            <b-card-body>
                                <b-card-title>{{recipe.name}}</b-card-title>
                            </b-card-body>

                            <b-card-footer>
                                <b-button variant="info"><b-icon-box-arrow-in-right></b-icon-box-arrow-in-right></b-button>
                            </b-card-footer>
                        </b-col>
                        </b-row>
                    </b-card>
                </b-col>
        </b-row>

    </b-container>
</template>

<script>
import RecipeContainer from "src/components/RecipeModals/RecipeContainer.vue"
import { mapGetters } from 'vuex'
export default {
    name: "Home",
    components: {
        RecipeContainer
    },

    computed: {
        ...mapGetters([
            'getRecipes'
        ])
    }
}
</script>