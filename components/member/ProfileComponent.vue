<template>
    <v-container>
        <v-overlay :value="loading">
            <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>

        <v-form
            ref="form"
            v-model="valid"
            lazy-validation
        >
            <v-row>
                <v-col cols="12" sm="6">
                    <v-text-field
                        label="First Name"
                        autofocus
                        required
                        outlined
                        v-model="formdata.first_name"
                        :rules="firstName"
                    ></v-text-field>
                    <v-text-field
                        label="Last Name"
                        outlined
                        v-model="formdata.last_name"
                    ></v-text-field>
                    <v-text-field
                        label="Email"
                        required
                        outlined
                        v-model="formdata.email"
                        :rules="email"
                    ></v-text-field>
                    <v-text-field
                        label="Handphone"
                        required
                        outlined
                        v-model="formdata.no_telp"
                        :rules="noTelp"
                    ></v-text-field>
                    <v-text-field
                        label="Username"
                        required
                        outlined
                        v-model="formdata.username"
                        :rules="username"
                    ></v-text-field>
                    <v-text-field
                        label="Instagram"
                        outlined
                        v-model="formdata.instagram"
                        :rules="instagram"
                    ></v-text-field>
                    <v-btn block color="success" dark>SIMPAN</v-btn>
                </v-col>
            </v-row>
        </v-form>
    </v-container>
</template>

<script>
import UserService from '../../services/UserService';
export default {
    name: "ProfileComponent",
    data: () => ({
        formdata : {
            first_name : null,
            last_name : null,
            email : null,
            no_telp : null,
            username : null,
            instagram : null,
            loading: false
        },
        pwIdRules: [
            v => !!v || 'Input Valid Code'
        ],
        pwCodeRules: [
            v => !!v || 'Input Valid Code'
        ],
        rules: {
            firstName: v => !!v || 'Input Firstname',
            email: v => !!v || 'Input Email',
            username: v => !!v || 'Input Username',
            noTelp: v => !!v || 'Input Phone Number',
            instagram: v => !!v || 'Input Account Instagram',
        }
    }),
    methods: {
        /* Validasi Form */
        validate () {
            if (this.$refs.form.validate()) {
                this.submit();
            }
        },
        reset () {
            this.$refs.form.reset()
        },
        resetValidation () {
            this.$refs.form.resetValidation()
        },
        
        async submit() {
            this.loading = true
            try {
                const res = await UserService.updateProfile(this.formdata)
                this.loading = false
            } catch (error) {
                console.log(error)
                this.loading = false
            }
        }
    }
}
</script>