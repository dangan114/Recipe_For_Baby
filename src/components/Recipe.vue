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
                <!-- <div @mouseenter="changeOpacity" @mouseleave="resumeOpacity">
                    <b-img ref="food_image" class="fade" :src="this.recipe.image" fluid />
                    <b-button @click="editImageAction" class="edit_text" v-show="editImage">Click to change image</b-button>
                </div> -->
                <div class="text-center">
                    <b-button class="my-3" variant="warning">Change Image</b-button>
                    <b-img :src="this.recipe.image" fluid />
                </div>
            </b-col>


        </b-row>
    </b-container>

</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import api from 'src/plugins/axios.js'

export default {
    name: 'Recipe',

    data() {
        return {

            editImage: false, 

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

    computed: {
        ...mapGetters([
            'getRecipes'
        ]),

        isEqual() {
            var newRecipe = JSON.parse(JSON.stringify(this.recipe))
            var isEqual = JSON.stringify(this.oldRecipe) === JSON.stringify(newRecipe)
            return isEqual;
        }
    },

    methods: {

        editImageAction() {
            alert("I Love You Baby")
        },

        // changeOpacity() {
        //     this.$refs['food_image'].style.opacity = 0.2;
        //     this.editImage = true;
        // },

        // resumeOpacity() {
        //     this.$refs['food_image'].style.opacity = 1;
        //     this.editImage = false;
        // },

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
            const response = await api.post('/recipes/update', this.recipe)
            console.log(response.data)
            this.$router.push('/')
        }
    },

    // mounted() {
    //     this.$refs['food_image'].style.opacity = 1;
    // },

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
/* .fade {
    opacity: 1;
}

.fade:hover {
 opacity: 0.2
} */

/* .edit_text {
    position: absolute;
    top: 40%;
 bottom: 40%;
 right: 40%;
 background: black;
 color: white;
 margin-bottom: 0;
 font-family: sans-serif;
 background-color: #ff9900;
 border: none;
 opacity: 0.6;
 visibility: visible;
 -webkit-transition: visibility 0s, opacity 0.5s linear; 
 transition: visibility 0s, opacity 0.5s linear;
} */

</style>