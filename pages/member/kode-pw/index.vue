<template>
  <section>
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in tabItems" :key="item">
        <template v-if="item == 'ADD CODE'">
          <CodePWComponent />
        </template>
        <template v-if="item == 'HISTORY'">
          <CodePWList :status="item" />
        </template>
      </v-tab-item>
    </v-tabs-items>

    <!-- PROFIL MENU -->
    <v-bottom-navigation fixed dark grow color="white" background-color="black" v-model="tab">
      <v-btn v-for="item in tabItems" :key="item">
        <span>{{item}}</span>
      </v-btn>
    </v-bottom-navigation>
  </section>
</template>
<script>
import CodePWList from "@/components/member/CodePWList";
import CodePWComponent from "@/components/CodePWComponent";
import UserService from "@/services/UserService";
export default {
  name: "kode-pw",
  data: () => ({
    tab: 0,
    tabItems: ["ADD CODE", "HISTORY"]
  }),
  components: {
    CodePWList,
    CodePWComponent
  }
};
</script>
