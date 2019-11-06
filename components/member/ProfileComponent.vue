<template>
    <v-container>                
        <v-row>
            <v-col cols="12" sm="6">
                <v-text-field
                    label="First Name"
                    autofocus
                    outlined
                ></v-text-field>
                <v-text-field
                    label="Last Name"
                    outlined
                ></v-text-field>
                <v-text-field
                    label="Email"
                    outlined
                ></v-text-field>
                <v-text-field
                    label="Handphone"
                    outlined
                ></v-text-field>
                <v-text-field
                    label="Username"
                    outlined
                ></v-text-field>
                <v-text-field
                    label="Instagram"
                    outlined
                ></v-text-field>
                <v-btn block color="success" dark>SIMPAN</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: "ProfileComponent",
    data: () => ({
        
    })
}
</script>