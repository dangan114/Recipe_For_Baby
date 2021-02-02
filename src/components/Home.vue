<template>
    <b-container fluid>
        <b-row class="justify-content-md-center mt-4">
            <b-button v-b-modal.new-recipe-modal variant="info"><b-icon-plus></b-icon-plus> Create a new Recipe</b-button>
        </b-row>

        <b-img>asd</b-img>

        <b-modal id="new-recipe-modal" title="New Recipe">
            <!-- <b-button v-b-modal.new-recipe-modal-next variant="info">Click</b-button> -->
            <b-form-group label-cols="4" label-cols-lg="2" label-size="lg" label="Large" label-for="input-lg">
                <b-form-input id="input-lg" size="lg"></b-form-input>
            </b-form-group>
        </b-modal>

        <b-modal id="new-recipe-modal-next" title="New Recipe (cont.)">
            <p>Hello</p>
        </b-modal>

    </b-container>
</template>

<script>
export default {
    name: "Home"
}
</script>