<template>
    <span class="user-tag-name" v-if="member"><img class="image-settings"  :src="memberImg"/></span>
</template>

<script>
export default {
    props:['member'],
    computed:{
        memberImg(){
            return this.member.imgUrl
        }
    }
}
</script>