<template>
    <div class="py-12 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="lg:text-center">
            <div v-for="faq in ribbon.faqs" :key="faq.id" class="relative">
            <dt>
                <p class="ml-16 text-lg leading-6 font-medium text-gray-900">{{ faq.heading }}</p>
                </dt>
                <dd class="mt-2 ml-16 text-base text-gray-500">
                {{ faq.description }}
                </dd>
            </div>
        </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { Faqs } from '~/types/faqs'
    
    interface FaqProps {
        ribbon: Faqs | null
    }

    withDefaults(defineProps<FaqProps>(), {
        ribbon: null
    });
</script>