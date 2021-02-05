<template>
<b-modal @show="matchingData" id="new-recipe-modal-next-next" title="New Recipe (cont.)" @ok="nextNextHandleOk" size="lg" no-close-on-backdrop ok-title="Next" cancel-title="Previous" @cancel="nextNextHandlePrevious">
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
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name: "RecipeModalNextNext",

       data() {
        return {
            instruction: '',
            instructions: []
        }
    },

    computed: {
        ...mapGetters([
            'getInstructions'
        ])
    },

    methods: {
        ...mapActions([
            'changeInstructions'
        ]),

        handleRemoveInstruction(instruction) {
    
            const index = this.instructions.indexOf(instruction)
            this.instructions.splice(index, 1)
        },

        addNewInstruction(e) {
            e.preventDefault() 
            this.instructions.push(this.instruction)
            this.$nextTick(() => {
                this.instruction = ""
            })
        },

        nextNextHandleOk(e) {
            e.preventDefault()
            this.changeInstructions(this.instructions)
            this.$nextTick(() => {
                this.$bvModal.hide('new-recipe-modal-next-next')
                this.$bvModal.show('new-recipe-modal-review')
            })
        },

        nextNextHandlePrevious(e) {
            e.preventDefault()
            this.$nextTick(() => {
                this.$bvModal.hide('new-recipe-modal-next-next')
                this.$bvModal.show('new-recipe-modal-next')

            })
        },

        matchingData() {
            this.instructions = this.getInstructions
        }
    },
}
</script>