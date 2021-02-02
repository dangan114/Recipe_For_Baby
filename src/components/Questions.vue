<template>
    <b-container fluid class="mt-5">
        <b-row>
            <h1 class="mx-auto">{{ question.questionText }}</h1>
        </b-row>
        <b-row>
            <b-col cols="4" class="mx-auto">
                <b-input-group prepend="Answer" class="mt-3">
                    <b-form-input v-if="question.questionType === 'text'" class="mx-auto"></b-form-input>
                    <b-form-datepicker v-if="question.questionType === 'date'" class="mx-auto"></b-form-datepicker>
                    <b-form-group v-if="question.questionType === 'boolean'" class="mx-auto">
                        <b-form-radio v-model="answer" name="yes-radio" value="yes">Yes</b-form-radio>
                        <b-form-radio v-model="answer" name="no-radio" value="no"> No </b-form-radio>
                    </b-form-group>
                    <b-input-group-append>
                        <b-button variant="info">Submit</b-button>
                    </b-input-group-append>
                </b-input-group>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
export default {
    name: "Questions",
    data() {
        return {
            answer: '',
            question: 
                // {
                //     questionText: "When is Dr.Son's official birthday?",
                //     questionType: "date"
                // }
                {
                    questionText: "What is An and Jenny's nickname when they were young?",
                    questionType: "text"
                }
        }
    }
}
</script>