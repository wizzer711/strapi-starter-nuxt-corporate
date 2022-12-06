<template>
    <div class="py-12 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="lg:text-center">
                <h2>{{ ribbon.heading }}</h2>
                <div v-for="article in ribbon.article" :key="article.id">
                    <div v-html="$parseMarkdown(article.textLeft)"></div>
                    <div v-html="$parseMarkdown(article.textRight)"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { Article } from '~/types/textArticle'

    interface TextArticleProps {
        ribbon: Article | null
    }

    withDefaults(defineProps<TextArticleProps>(), {
        ribbon: null
    });
</script>