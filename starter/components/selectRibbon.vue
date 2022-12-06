<template>
  <div>
    <div
      v-for="(ribbon, index) in ribbons"
      :key="`selectRibbon_${ribbon.id}${index}`"
    >
      <Features
        v-if="ribbon.__component == 'ribbons.features'"
        :ribbon="ribbon"
      />
      <Text
        v-if="ribbon.__component == 'ribbons.text'"
        :ribbon="ribbon"
      />
      <TextArticle
        v-if="ribbon.__component == 'ribbons.text-article'"
        :ribbon="ribbon"
      />
      <Team
        v-if="ribbon.__component == 'ribbons.team'"
        :ribbon="ribbon"
      />
      <Brands
        v-if="ribbon.__component == 'ribbons.brands'"
        :ribbon="ribbon"
      />
      <Juxtapose
        v-if="ribbon.__component == 'ribbons.juxtapose'"
        :ribbon="ribbon"
      />
      <Faqs
        v-if="ribbon.__component == 'ribbons.faqs'"
        :ribbon="ribbon"
      />
      <Plans
        v-if="ribbon.__component == 'ribbons.plans'"
        :ribbon="ribbon"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
  import { Ribbon, RibbonData } from '~/types/selectRibbon'

  interface SelectRibbonsProps {
    ribbons: Array<Ribbon & RibbonData> | null
  }

  withDefaults(defineProps<SelectRibbonsProps>(), {
    ribbons: null
  });

</script>
