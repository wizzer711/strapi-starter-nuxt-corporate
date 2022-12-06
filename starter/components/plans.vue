<template>
    <div class="py-12 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="lg:text-center">
            <div v-for="plan in ribbon.plans" :key="plan.id" class="relative">
            <dt>
                <p class="ml-16 text-lg leading-6 font-medium text-gray-900">{{ plan.title }}</p>
                </dt>
                <dd class="mt-2 ml-16 text-base text-gray-500">
                {{ plan.description }}
                </dd>
            </div>
        </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { Plans } from '~/types/plans'
    
    interface PlansProps {
        ribbon: Plans | null
    }

    withDefaults(defineProps<PlansProps>(), {
        ribbon: null
    });
</script>