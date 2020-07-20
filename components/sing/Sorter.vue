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
				<div class="py-4" :key="'devmid-'+i" @click="doFilter(item.val)">{{item.name}}</div>
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
			{name:'Star to NOT Star', val: 'star'},
			{name:'High VOTE to low VOTE', val: 'high_vote'},
			{name:'Low VOTE to High VOTE', val: 'low_vote'},
			{name:'High COMMENTS to Low COMMENTS', val: 'high_comment'},
			{name:'Low COMMENTS to Hight COMMENTS', val: 'low_comment'},
			{name:'Newest to Oldest', val: 'newest'},
			{name:'Oldest to Newest', val: 'oldest'},
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
	},
	doFilter(val) {
		this.$bus.$emit('sorterInvisible');
		this.$bus.$emit('singprefetchItems', val);
		setTimeout(() => {
			this.closeIt();
		}, 2000);
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
