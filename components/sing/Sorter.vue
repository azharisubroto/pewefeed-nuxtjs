<template>
  	<v-bottom-sheet v-model="intDialogVisible">
      <v-sheet height="100%">
        <v-toolbar :elevation="1">
          <!-- Arrow -->
          <v-btn
            dark
            icon
            tile
            style="border-right: 0px solid #717171"
            light
            @click="intDialogVisible = false;"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>

          <!-- Title -->
          <div class="flex-grow-1"></div>
          <v-toolbar-items>
            <v-btn dark text class="deep-orange--text pl-0 text-uppercase" style="margin-left:-10px;">SORT</v-btn>
          </v-toolbar-items>
          <div class="flex-grow-1"></div>
        </v-toolbar>

        <div class="mx-0 text-center px-4">
			<template v-for="(item, i) in sorter">
				<div class="devider-small" :key="'devtop-'+i"></div>
				<div class="py-4" :key="'devmid-'+i">{{item}}</div>
				<div class="devider-small" :key="'devbot-'+i"></div>
			</template>
        </div>
      </v-sheet>
    </v-bottom-sheet>
</template>

<script>
export default {
  name: "Sorter",
  props: {
	dialogVisible: Boolean,
  },
  data() {
    return{
		sorter: [
			'Star to NOT Star',
			'High VOTE to low VOTE',
			'Low VOTE to High VOTE',
			'High COMMENTS to Low COMMENTS',
			'Low COMMENTS to Hight COMMENTS',
			'Newest to Oldest',
			'Oldest to Newest',
		]
    }
  },
  computed: {
    /* Init Modal */
    intDialogVisible: {
      get: function () {
        if (this.dialogVisible) {
          // Some dialog initialization code could be placed here
          // because it is called only when this.dialogVisible changes
          this.$emit('open');
        }

        return this.dialogVisible
      },
      set: function (value) {
        if (!value) {
          this.$emit('close')
        }
      }
    },
    notVipVisible: {
      get: function () {
        if (this.dialogVisible) {
          // Some dialog initialization code could be placed here
          // because it is called only when this.dialogVisible changes
          this.$emit('open');
        }

        return this.dialogVisible
      },
      set: function (value) {
        if (!value) {
          this.$emit('close')
        }
      }
    }
  },
  methods: {
    closeIt() {
      this.$emit('close')
    }
  }
}
</script>


<style lang="scss">
  .gray--background {
    background: #f5f5f5!important;
  }
  .whitebox {
    background: #fff;
    padding: 30px;
  }
  .v-dialog {
    z-index:10000;
  }
</style>
