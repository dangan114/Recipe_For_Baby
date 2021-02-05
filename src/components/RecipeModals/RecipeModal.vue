<template>
<b-modal @show="matchingData" id="new-recipe-modal" title="New Recipe" @ok="handleOk" no-close-on-backdrop ok-only ok-title="Next">
    <b-form>
        <b-form-group label-cols="4" label-cols-lg="3" label-size="lg" label="Name" label-for="input-lg">
            <b-form-input v-model="recipeName" id="input-lg" size="lg"></b-form-input>
                </b-form-group>
                <b-form-group label="Image" label-cols-sm="3" label-size="lg">
                    <b-form-file accept="image/jpeg, image/png, image/gif" id="file-large" size="lg" @change="uploadImage"></b-form-file>
                </b-form-group>
        <b-img :src="previewImage" fluid/>
    </b-form>
</b-modal>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name: "RecipeModal",
    data() {
        return {
            recipeName: "",
            fileName: null,
            previewImage: null,
        }
    },
    
    computed: {
        ...mapGetters([
            'getName', 'getImage'
        ])
    },

    methods: {

        ...mapActions([
            'changeName', 'changeImage'
        ]),

        uploadImage(e) {
            const image = e.target.files[0]
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = e => {
                this.previewImage = e.target.result;
            }
        },


        handleOk(e) {
            e.preventDefault()

            this.changeName(this.recipeName)
            this.changeImage(this.previewImage)

            this.$nextTick(() => {
                this.$bvModal.hide('new-recipe-modal')
                this.$bvModal.show('new-recipe-modal-next')
            })
        },

        matchingData() {
            this.recipeName = this.getName
            this.previewImage = this.getImage
        }
    },
}
</script>