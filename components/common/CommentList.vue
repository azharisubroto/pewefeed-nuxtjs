<template>
  <div>
    <div
      class="comment-item"
      v-for="comment in items"
      :key="comment.id"
      :id="'comment'+comment.comment_id"
    >
      <v-row>
        <v-col cols="2">
          <v-avatar size="50">
            <img
				v-if="comment.customer"
              :src="comment.customer.avatar ? comment.customer.avatar : '/img/user.jpeg'"
              onerror="this.src='/img/user.jpeg';"
            />
			<img
				v-if="comment.avatar"
              :src="comment.avatar ? comment.avatar : '/img/user.jpeg'"
              onerror="this.src='/img/user.jpeg';"
            />
          </v-avatar>
        </v-col>
        <v-col cols="10">
          <strong v-if="comment.customer">{{ comment.customer.name }}</strong>
          <strong v-else>{{ comment.artist_name }}</strong>
          <br />
          <v-rating
            v-if="comment.rate && comment.rate >= 0"
            background-color="orange"
            color="orange lighten-2"
            readonly
            size="20"
            class="mb-3"
            dense
            :value="getrating(comment.rate)"
          ></v-rating>

          <div style="font-size:16px;">
            <div style="overflow: hidden" v-html="comment.message"></div>
          </div>
          <div class="mt-2 caption text--gray">
            <v-icon size="15">mdi-clock-outline</v-icon>
            {{comment.commented_at}}
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "CommentList",
  props: {
    items: Array
  },
  methods: {
    getrating(num) {
      var rating = num / 20;
      rating = rating.toFixed(0);
      return parseInt(rating);
    }
  }
};
</script>
