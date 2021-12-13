<template>
    <span class="user-tag-name" v-if="member" :title="member.fullname"><img class="image-settings"  :src="memberImg"/></span>
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