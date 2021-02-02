<template>
    <b-container id="login-form" fluid>
        <b-row class="justify-content-md-center">
        <b-form @submit="onSubmit">
            <b-form-group
                id="input-group-1"
                label="Email address:"
                label-for="email"
                description="We'll never share your email with anyone else."
            >
                <b-form-input
                    id="email"
                    v-model="form.email"
                    type="email"
                    placeholder="Enter email"
                    required
                ></b-form-input>
            </b-form-group>

            <b-form-group
                id="input-group-2"
                label="Password:"
                label-for="password"
                description="We'll never share your email with anyone else."
            >
                <b-form-input
                    id="password"
                    v-model="form.email"
                    type="email"
                    placeholder="Enter email"
                    required
                ></b-form-input>
            </b-form-group>
        </b-form>
        </b-row>
    </b-container>
</template>

<script>
export default {
    name: "Login",
    data() {
        return {
            form: {
                email: '',
                password: ''
            }
        }
    },

    methods: {
        onSubmit(event) {
            event.preventDefault()
            alert(JSON.stringify(this.form))
        },

        // onReset(event) {
        //     event.preventDefault()
        //     this.form.email = ''
        //     this.form.password = ''
        // }
    }
}
</script>