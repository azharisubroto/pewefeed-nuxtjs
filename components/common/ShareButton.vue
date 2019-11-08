<template>
    <!-- SHARE BUTTON -->
    <div class="text-center mt-5">
        <div class="addthis_sharing_toolbox">
            <AddThis
                publicId="ra-56726fb53e3222fa"
                :data-url="dataUrl"
            />
        </div>
    </div>
</template>
<script>
import AddThis from 'vue-simple-addthis-share'
export default {
    name: "ShareButton",
    props: ["dataUrl"],
    components: {
        AddThis
    }
}
</script>