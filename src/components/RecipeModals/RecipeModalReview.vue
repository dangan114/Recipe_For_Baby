<template>
    <b-modal id="new-recipe-modal-review" title="New Recipe Review" size="lg" no-close-on-backdrop ok-only ok-title="Submit" @ok="handleSubmit">
        <b-container fluid>
            <b-row>
            <b-col cols="12" class="text-center">
                <h1> {{ this.getName }} </h1>
            </b-col>

            <b-col cols="12" class="mt-2 mb-4">
                <b-img center v-bind:src="this.getImage" fluid/>
            </b-col>

        
                <b-col cols="6">
                    <h1 v-show="this.getIngredientsString.length !== 0">Ingredients: </h1>
                    <ul>
                        <li v-for="ingredient in this.getIngredientsString" :key="ingredient">
                            {{ ingredient }}
                        </li>
                    </ul>
                </b-col>

                <b-col cols="6">
                    <h1 v-show="this.getInstructions.length !== 0">Instructions: </h1>
                    <ul>
                        <li v-for="instruction in this.getInstructions" :key="instruction">
                            {{ instruction }}
                        </li>
                    </ul>
                </b-col>
           

            </b-row>
        </b-container>
    </b-modal>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name: "RecipeModalReview",

    computed: {
        ...mapGetters([
            'getRecipe', 'getName', 'getImage', 'getIngredientsString', 'getInstructions'
        ])
    },

    methods: {

        ...mapActions([
            'addRecipe', 'resetRecipeState'
        ]),

        handleSubmit(e) {
            e.preventDefault()
            this.addRecipe(this.getRecipe)
            
            this.resetRecipeState() 

            this.$nextTick(() => {
                this.$bvModal.hide("new-recipe-modal-review")
            })

        }
    }
}
</script>