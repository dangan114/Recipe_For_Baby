<template>
    <b-container fluid class="mt-4">
        <b-row>
            <b-col cols="6">
                <h1 class="text-center"> {{this.recipe.name}} </h1>
                <b-col cols="12">
                    <h1 v-show="this.recipe.ingredients.length !== 0">Ingredients: </h1>

                    <b-row v-show="this.inEditIngredientMode">
                        <b-col lg="5">
                            <b-input-group prepend="Ingredient">
                                <b-form-input v-model="tempIngredient.ingredientName"></b-form-input>
                            </b-input-group>
                        </b-col>

                        <b-col lg="5">
                            <b-input-group prepend="Amount">
                                <b-form-input v-model="tempIngredient.ingredientAmount"></b-form-input>
                            </b-input-group>
                        </b-col>

                        <b-col cols="2">
                            <b-button variant="warning" @click="handleUpdateIngredient">Update</b-button>
                        </b-col>
                    </b-row>          

                    <ul>
                        <li class="recipe-list my-4" v-for="ingredient in this.recipe.ingredients" :key="ingredient">
                            <span>{{ ingredient.ingredientAmount }} of {{ ingredient.ingredientName }}</span>
                            <b-button-group class="float-right">
                                <b-button class="mx-2" @click="handleEditIngredient(ingredient)" variant="info"><b-icon-pencil-square></b-icon-pencil-square></b-button>
                                <b-button class="mx-2" @click="handleRemoveIngredient(ingredient)" variant="danger"><b-icon-trash></b-icon-trash></b-button>
                            </b-button-group>
                        </li>
                    </ul>
                </b-col>

                <b-col cols="12">
                    <h1 v-show="this.recipe.instructions.length !== 0">Instructions: </h1>
                    <b-row v-show="this.inEditInstructionMode">
                        <b-col lg="10">
                            <b-input-group prepend="Instruction">
                                <b-form-input v-model="tempInstruction"></b-form-input>
                            </b-input-group>
                        </b-col>

                        <b-col cols="2">
                            <b-button variant="warning" @click="handleUpdateInstruction">Update</b-button>
                        </b-col>
                    </b-row> 
                    <ol type="1">
                        <li class="recipe-list my-4" v-for="instruction in this.recipe.instructions" :key="instruction">
                            <span>{{ instruction }} </span>
                            <b-button-group class="float-right">
                                <b-button class="mx-2" @click="handleEditInstruction(instruction)" variant="info"><b-icon-pencil-square></b-icon-pencil-square></b-button>
                                <b-button class="mx-2" @click="handleRemoveInstruction(instruction)" variant="danger"><b-icon-trash></b-icon-trash></b-button>                            
                            </b-button-group>
                        </li>
                    </ol>
                </b-col>

                <b-col v-show="!this.isEqual" cols="12" class="text-center">
                    <b-button @click="handleUpdateRecipe" variant="warning">Save</b-button>
                </b-col>
            </b-col>

            <b-col cols="6">
                <b-img-lazy :src="this.recipe.image" fluid />
            </b-col>

        </b-row>
    </b-container>

</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import axios from 'axios'

export default {
    name: 'Recipe',

    data() {
        return {
            oldRecipe: null, 
            recipe: null,
            tempIngredient: {
                ingredientName: '',
                ingredientAmount: ''
            },
            tempInstruction: '',

            ingredientIndex: 0,
            instructionIndex: 0,

            inEditIngredientMode: false, 
            inEditInstructionMode: false,
        
        }
    },

    beforeUpdate() {
        console.log("Old Recipe")
        console.log(this.oldRecipe)
    },

    computed: {
        ...mapGetters([
            'getRecipes'
        ]),

        isEqual() {
            var newRecipe = JSON.parse(JSON.stringify(this.recipe))
            var isEqual = JSON.stringify(this.oldRecipe) === JSON.stringify(newRecipe)
            console.log(isEqual)
            return isEqual;
        }
    },

    methods: {
        ...mapActions([
          
        ]),

        handleRemoveIngredient(ingredient) {
            const index = this.recipe.ingredients.indexOf(ingredient);            
            this.recipe.ingredients.splice(index, 1)
        },

        handleRemoveInstruction(instruction) {
            const index = this.recipe.instructions.indexOf(instruction);
            this.recipe.instructions.splice(index, 1)
        },

        handleEditIngredient(ingredient) {
            this.inEditIngredientMode = !this.inEditIngredientMode
            this.tempIngredient.ingredientName = ingredient.ingredientName
            this.tempIngredient.ingredientAmount = ingredient.ingredientAmount
            this.ingredientIndex = this.recipe.ingredients.indexOf(ingredient);
        },

        handleUpdateIngredient() {
      
            this.inEditIngredientMode = !this.inEditIngredientMode
            var updatedIngredient = {
                ingredientName: this.tempIngredient.ingredientName,
                ingredientAmount: this.tempIngredient.ingredientAmount
            }
            this.recipe.ingredients.splice(this.ingredientIndex, 1, updatedIngredient)
            this.ingredientIndex = 0
        },

        handleEditInstruction(instruction) {
            this.inEditInstructionMode = !this.inEditInstructionMode
            this.tempInstruction = instruction
            this.instructionIndex = this.recipe.instructions.indexOf(instruction)
        },

        handleUpdateInstruction() {
            this.inEditInstructionMode = !this.inEditInstructionMode
            var updatedInstruction = this.tempInstruction;
            this.recipe.instructions.splice(this.instructionIndex, 1, updatedInstruction)
            this.instructionIndex = 0
        },

        async handleUpdateRecipe() {
            const response = await axios.post('http://localhost:3000/recipes/update', this.recipe)
            console.log(response.data)
            this.$router.push('/')
        }
    },

    async created() {
        this.recipe = this.getRecipes.find(e => e.name === this.$route.params.id)
        this.oldRecipe = JSON.parse(JSON.stringify(this.recipe))
    }
}
</script>

<style scoped>
/* .recipe-list {
    list-style-type: none;
} */

</style>