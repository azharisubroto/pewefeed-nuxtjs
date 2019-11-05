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
          <v-avatar size="30">
            <img
              :src="comment.customer.avatar ? comment.customer.avatar : '/img/user.jpeg'"
              onerror="this.src='/img/user.jpeg';"
            >
          </v-avatar>
        </v-col>
        <v-col cols="10">
          <strong>{{ comment.customer.name }}</strong><br>
          <div style="font-size:12px;">
            <div v-html="comment.message"></div>
          </div>
          <div class="mt-2 caption text--gray">
            {{comment.commented_at}} - Balas
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
  }
}
</script>
