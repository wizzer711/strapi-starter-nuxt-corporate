<template>
    <div class="py-12 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="lg:text-center">
            <div v-for="teamMember in ribbon.teamMembers" :key="teamMember.id" class="relative">
            <dt>
                <pre>{{ teamMember.image.data.attributes.url }}</pre>
                <div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <GlobalImage
                    :image-element="teamMember.image.data"
                    mobile-src-set="360w"
                    tablet-src-set="580w"
                    desktop-src-set="640w"
                    mobile-size="(max-width: 768px) 360px"
                    tablet-size="(max-width: 1024px) 580px"
                    desktop-size="50vw"
                    :width="60"
                    :height="60"
                    />
                </div>
                <p class="ml-16 text-lg leading-6 font-medium text-gray-900">{{ teamMember.name }}</p>
                </dt>
                <dd class="mt-2 ml-16 text-base text-gray-500">
                {{ teamMember.role }}
                </dd>
            </div>
        </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { TeamMembers } from '~/types/team'

    interface TeamProps {
        ribbon: TeamMembers | null
    }

    withDefaults(defineProps<TeamProps>(), {
        ribbon: null
    });
</script>