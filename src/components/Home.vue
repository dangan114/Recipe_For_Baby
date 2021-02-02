<template>
    <b-container fluid>
        <b-row class="justify-content-md-center mt-4">
            <b-button v-b-modal.new-recipe-modal-next variant="info"><b-icon-plus></b-icon-plus> Create a new Recipe</b-button>
        </b-row>

        <b-img>asd</b-img>

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

        <b-modal id="new-recipe-modal-next" title="New Recipe (cont.)" size="lg" no-close-on-backdrop>
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

                    <b-col cols="2">
                        <b-button variant="info" @click="addNewIngredient">Add</b-button>
                    </b-col>
                </b-row>

            
            </b-container>

            <b-table 
                :fields="fields"
                :items="ingredients"
                class="mt-4"
                bordered
                responsive
                select-mode="single"   
                selectable
                @row-selected="onRowSelected"
            >   
                <template #cell(actions)="{ rowSelected }">

                    <template v-if="rowSelected">
                        <span aria-hidden="true">
                            <b-button variant="info" class="mx-2" @click="handleEditAction"><b-icon-pencil-square></b-icon-pencil-square></b-button>
                            <b-button variant="danger" class="mx-2" @click="handleRemoveAction"><b-icon-trash-fill></b-icon-trash-fill></b-button>
                        </span>
                        <span class="sr-only">Selected</span>
                    </template>

                    <template v-else>
                        <span aria-hidden="true">&nbsp;</span>
                        <span class="sr-only">Not selected</span>
                    </template>
                </template>
            </b-table>
        </b-modal>

    </b-container>
</template>

<script>
export default {
    name: "Home",

    data() {
        return {
            fields: ['ingredientName', 'ingredientAmount', 'Actions'],
            ingredient: {
                ingredientName: '',
                ingredientAmount: ''
            },

            ingredients: [],
            previewImage: null,

            selected: null
        }
    },

    methods: {

        onRowSelected(item) {
            this.selected = item; 
        },

        handleEditAction() {

        },

        handleRemoveAction() {
            console.log(this.selected)
            const index = this.ingredients.indexOf(this.selected)
            console.log(index)

            this.ingredients.splice(index, 1)
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
     }
}
</script>