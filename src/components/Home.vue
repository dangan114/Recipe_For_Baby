<template>
    <b-container fluid>
        <b-row class="justify-content-md-center mt-4">
            <b-button v-b-modal.new-recipe-modal variant="info"><b-icon-plus></b-icon-plus> Create a new Recipe</b-button>
        </b-row>

        <b-modal id="new-recipe-modal" title="New Recipe" @ok="handleOk" no-close-on-backdrop>
            <!-- <b-button v-b-modal.new-recipe-modal-next variant="info">Click</b-button> -->
            <b-form @submit.stop.prevent="handleSubmit">
                <b-form-group label-cols="4" label-cols-lg="3" label-size="lg" label="Name" label-for="input-lg">
                    <b-form-input id="input-lg" size="lg"></b-form-input>
                </b-form-group>
                <b-form-group label="Image" label-cols-sm="3" label-size="lg">
                    <b-form-file accept="image/jpeg, image/png, image/gif" id="file-large" size="lg" @change="uploadImage"></b-form-file>
                </b-form-group>
                <b-img :src="previewImage" fluid/>
            </b-form>
        </b-modal>

        <b-modal id="new-recipe-modal-next" title="New Recipe (cont.)" @ok="nextHandleOk" size="lg" no-close-on-backdrop>
            <b-container fluid>
                <b-row>
                    <b-col lg="5">
                        <b-input-group prepend="Ingredient">
                            <b-form-input v-model="ingredient.ingredientName"></b-form-input>
                        </b-input-group>
                    </b-col>

                     <b-col lg="5">
                        <b-input-group prepend="Amount">
                            <b-form-input v-model="ingredient.ingredientAmount"></b-form-input>
                        </b-input-group>
                    </b-col>

                    <b-col cols="2" v-if="this.inEditMode">
                        <b-button variant="warning" @click="handleUpdate">Update</b-button>
                    </b-col>

                    <b-col cols="2" v-else>
                        <b-button variant="info" @click="addNewIngredient">Add</b-button>
                    </b-col>            
                </b-row>
            
            </b-container>

            <b-table 
                :fields="fields"
                :items="ingredients"
                class="mt-4"
                bordered
                responsive="sm"
                select-mode="single"   
                selectable
                @row-selected="onRowSelected"
            >   
                <template #cell(actions)="{ rowSelected }">

                    <template v-if="rowSelected">
                        <span>    
                            <b-button variant="info" @click="handleEditIngredient" class="mx-2"><b-icon-pencil-square></b-icon-pencil-square></b-button>
                            <b-button variant="danger" @click="handleRemoveIngredient" class="mx-2"><b-icon-trash-fill></b-icon-trash-fill></b-button>
                        </span>
                        <span class="sr-only">Selected</span>
                    </template>

                    <template v-else>
                        <span>
                            <b-button variant="warning"><b-icon-cart></b-icon-cart></b-button>
                        </span>
                        <span class="sr-only">Not selected</span>
                    </template>
                </template>
            </b-table>
        </b-modal>

        <b-modal id="new-recipe-modal-next-next" title="New Recipe (cont.)" @ok="nextNextHandleOk" size="lg" no-close-on-backdrop>
            <b-container fluid>
                <b-row>
                    <b-col cols="10">
                        <b-input-group prepend="Instruction">
                        <b-form-input v-model="instruction"></b-form-input>
                        </b-input-group>
                    </b-col>

                    <b-col cols="2">
                        <b-button variant="info" @click="addNewInstruction">Add</b-button>
                    </b-col>
                </b-row>

                <b-row class="mt-4">
                    <b-col cols="12">
                        <li style="list-style-type: none" v-for="instruction in this.instructions" :key="instruction" class="my-2">
                            <span class="mx-2"> {{ instruction }} </span>
                            <b-button variant="danger" @click="handleRemoveInstruction(instruction)"><b-icon-trash></b-icon-trash></b-button>
                        </li>
                    </b-col>
                </b-row>
            </b-container>
        </b-modal>
    </b-container>
</template>

<script>
export default {
    name: "Home",

    data() {
        return {
            previewImage: null,

            fields: ['ingredientName', 'ingredientAmount', 'Actions'],
            ingredient: {
                ingredientName: '',
                ingredientAmount: ''
            },
            ingredients: [],
          
            selected: null,
            inEditMode: false,
            
            instruction: '',
            instructions: []
        }
    },

    methods: {

        onRowSelected(item) {
            this.selected = item; 
        },

        handleRemoveInstruction(instruction) {
    
            const index = this.instructions.indexOf(instruction)
            this.instructions.splice(index, 1)
        },

        handleEditIngredient() {
            this.ingredient.ingredientName = this.selected[0].ingredientName;
            this.ingredient.ingredientAmount = this.selected[0].ingredientAmount;

            this.inEditMode = !this.inEditMode
        },

        handleRemoveIngredient() {
            const index = this.ingredients.indexOf(this.selected)
            this.ingredients.splice(index, 1)
        },

        handleUpdate() {
            const index = this.ingredients.indexOf(this.selected[0])
            var updatedItem = {
                ingredientName: this.ingredient.ingredientName,
                ingredientAmount: this.ingredient.ingredientAmount
            };

            this.ingredients.splice(index, 1, updatedItem)

            this.inEditMode = !this.inEditMode

            this.$nextTick(() => {
                this.ingredient.ingredientName = "",
                this.ingredient.ingredientAmount = ""
            })
        },

        uploadImage(e) {
            const image = e.target.files[0]
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = e => {
                this.previewImage = e.target.result;
                console.log(this.previewImage)
            }
        },

        handleOk(e) {
            e.preventDefault()
            this.handleSubmit() 
        },

        nextHandleOk(e) {
            e.preventDefault()
            this.$nextTick(() => {
                this.$bvModal.hide('new-recipe-modal-next')
                this.$bvModal.show('new-recipe-modal-next-next')
            })
        },

        nextNextHandleOk(e) {
            e.preventDefault()
            this.$nextTick(() => {
                this.$bvModal.hide('new-recipe-modal-next-next')
            })
        },

        handleSubmit() {
            this.$nextTick(() => {
                this.$bvModal.hide('new-recipe-modal')
                this.$bvModal.show('new-recipe-modal-next')
            })
        },

        addNewIngredient(e) {
            e.preventDefault()
            var ingredient = {
                ingredientName: this.ingredient.ingredientName,
                ingredientAmount: this.ingredient.ingredientAmount,
            }

            this.ingredients.push(ingredient)
            this.$nextTick(() => {
                this.ingredient.ingredientName = "",
                this.ingredient.ingredientAmount = ""
            })
        },

        addNewInstruction(e) {
            e.preventDefault() 
            this.instructions.push(this.instruction)
            this.$nextTick(() => {
                this.instruction = ""
            })
        }
     }
}
</script>