<template>
    <a :href="createCtaLink()" class="">
        <span :class="ctaClass">{{ ctaElement.label }}</span>
    </a>
</template>
<script setup lang="ts">
    import { Cta } from '~/types/global/globalCta'

    interface CtaProps {
        ctaElement: Cta | null,
        stretch: boolean,
        ctaClass?: string
    }

    const ctaProps = withDefaults(defineProps<CtaProps>(), {
        ctaClass: ''
    });

    function createCtaLink(): string {
        if(ctaProps.ctaElement.external != ''){
            return ctaProps.ctaElement.external;
        }
        if(ctaProps.ctaElement.hash != ''){
            return `${ctaProps.ctaElement.url}#${ctaProps.ctaElement.hash}`
        }else{
            return ctaProps.ctaElement.url
        }
    }
</script>