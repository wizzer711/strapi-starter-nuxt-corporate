<template>
    <a :href="createLink()" class="">
        <span :class="linkClass">{{ linkElement.label }}</span>
    </a>
</template>
<script setup lang="ts">
    import { Link } from '~/types/global/globalLink'

    interface LinkProps {
        linkElement: Link | null,
        stretch: boolean,
        linkClass?: string
    }

    const linkProps = withDefaults(defineProps<LinkProps>(), {
        linkClass: ''
    });

    function createLink(): string {
        if(linkProps.linkElement.external != ''){
            return linkProps.linkElement.external;
        }
        if(linkProps.linkElement.hash != ''){
            return `${linkProps.linkElement.url}#${linkProps.linkElement.hash}`
        }else{
            return linkProps.linkElement.url
        }
    }
</script>