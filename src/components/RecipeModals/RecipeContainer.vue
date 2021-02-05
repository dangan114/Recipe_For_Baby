<template>
    <div>
        <RecipeModal />
        <RecipeModalNext />
        <RecipeModalNextNext />
        <RecipeModalReview />
    </div>
</template>

<script>
import RecipeModal from "src/components/RecipeModals/RecipeModal.vue"
import RecipeModalNext from "src/components/RecipeModals/RecipeModalNext.vue"
import RecipeModalNextNext from "src/components/RecipeModals/RecipeModalNextNext.vue"
import RecipeModalReview from "src/components/RecipeModals/RecipeModalReview.vue"

export default {
    name: "RecipeContainer",
    components: {
        RecipeModal, RecipeModalNext, RecipeModalNextNext, RecipeModalReview
    },
}
</script>