<template>
    <b-modal @show="matchingData" id="new-recipe-modal-next" title="New Recipe (cont.)" @ok="nextHandleOk" size="lg" no-close-on-backdrop ok-title="Next" cancel-title="Previous" @cancel="nextHandlePrevious">
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
</template>

<script>
import { mapGetters, mapActions } from 'vuex'; 

export default {
    name: "RecipeModalNext",

    data() {
        return {
            fields: ['ingredientName', 'ingredientAmount', 'Actions'],
            ingredient: {
                ingredientName: '',
                ingredientAmount: ''
            },
            ingredients: [],
            inEditMode: false,
            selected: null,
        }
    },

    computed: {
        ...mapGetters([
            'getIngredients'
        ])
    },

    methods: {

        ...mapActions([
            'changeIngredients'
        ]),

        onRowSelected(item) {
            this.selected = item; 
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

        nextHandleOk(e) {
            e.preventDefault()
            this.changeIngredients(this.ingredients)
            this.$nextTick(() => {
                this.$bvModal.hide('new-recipe-modal-next')
                this.$bvModal.show('new-recipe-modal-next-next')
            })
        },

        nextHandlePrevious(e) {
            e.preventDefault()
            this.$nextTick(() => {
                this.$bvModal.hide('new-recipe-modal-next')
                this.$bvModal.show('new-recipe-modal')
            })
        },

        matchingData() {
            this.ingredients = this.getIngredients
        }
    },

    
}
</script>