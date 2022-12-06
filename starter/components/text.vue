<template>
    <div class="py-12 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="lg:text-center">
            <h2 class="text-base text-indigo-600 font-semibold tracking-wide uppercase">{{ ribbon.heading }}</h2>
            <!-- <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">{{ parseRefs(ribbon.description) }}</p> -->
            <div class="content mt-2 mb-4 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl" v-html="parseRefs($parseMarkdown(ribbon.description), useState('brandDetails'))"></div>
            <!-- <p class="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam voluptatum cupiditate veritatis in accusamus quisquam.</p> -->
        </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { Text } from '~/types/text'
    
    interface TextProps {
        ribbon: Text | null
    }

    withDefaults(defineProps<TextProps>(), {
    //withDefaults(defineProps<TextProps>(), {
        ribbon: null
    });
    //parseRefs($parseMarkdown(ribbon.description), useState('brandDetails')
    //$parseMarkdown(parseRefs(ribbon.description, useState('brandDetails'))
    //const textDescription = parseRefs(textProps.ribbon.description, useState('brandDetails'));
</script>

<style>
.content p {
    @apply last:mb-0;
    @apply mt-4;
    color: blue;
}

</style>