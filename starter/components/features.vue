<template>
  <div class="py-12 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="lg:text-center">
        <h2 class="text-base text-indigo-600 font-semibold tracking-wide uppercase">Transactions</h2>
        <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">A better way to send money</p>
        <p class="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam voluptatum cupiditate veritatis in accusamus quisquam.</p>
      </div>
      <div class="mt-10">
        <dl class="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
          <div v-for="feature in ribbon.features" :key="feature.id" class="relative">
            <dt>
              <div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                <GlobalImage
                  :image-element="feature.icon.data"
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
              <p class="ml-16 text-lg leading-6 font-medium text-gray-900">{{ parseUrl(feature.heading, useState('brandPages')) }}</p>
            </dt>
            <dd class="mt-2 ml-16 text-base text-gray-500">
              {{ feature.description }}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { Features } from '~/types/features'
  
  interface FeaturesProps {
    ribbon: Features | null
  }

  withDefaults(defineProps<FeaturesProps>(), {
  // withDefaults(defineProps<FeaturesProps>(), {
    ribbon: null
  });

  //const textDescription = parseRefs(featuresProps.feature.heading, useState('brandDetails'));
</script>