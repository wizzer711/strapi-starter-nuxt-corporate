<template>
    <a id="jivo-live-chat-toggle" class="jivo-live-chat" href="javascript:void(0);" @click="triggerLiveChat()"><img alt="Jivo Live Chat" width="75" height="75" src="/assets/interface/live-chat.svg" /></a>
</template>
<script setup lang="ts">
    function triggerLiveChat() {
        if(process.client){
            window.dataLayer.push({ 'event': 'toggleLiveChat', 'enabled': true })
            document.getElementById('jivo-live-chat-toggle').classList.add('enable')
        }
    }
</script>