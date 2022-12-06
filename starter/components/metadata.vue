<template>
  <div>
    <Title>{{ metaTitle }}</Title>
    <Meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1" />
    <Link rel="icon" type="image/png" href="/assets/favicons/32x32.png" sizes="32x32" />
    <Link rel="icon" type="image/png" href="/assets/favicons/16x16.png" sizes="16x16" />
    <Link rel="apple-touch-icon" href="assets/favicons/apple-touch-icon.png" sizes="180x180" />
    <Link rel="home" :href="siteUrl" />
    
    <Meta name="description" :content="metaDesc" />
    <Meta name="robots" :content="metaRobots" />
    <Meta property="og:title" :content="metaTitle" />
    <Meta property="og:site_name" :content="siteName" />
    <Meta property="og:type" content="website" />
    <Meta property="og:url" :content="siteUrl" />
    <Meta property="og:description" :content="metaDesc" />
    <Meta property="og:image" :content="metaImage" />
    <Meta property="og:image:width" content="400" />
    <Meta name="twitter:card" content="summary" />
    <Meta property="og:image:height" content="400" />
    <Link rel="canonical" href="http://www.google.co.uk" />
    
    <template v-if="!isEmpty(hreflangs)">
      <Link rel="alternate" :href="`${siteUrl}${route.fullPath}`" hreflang="x-default" />
      <template
        v-for="(hreflang, i) in hreflangs"
        :key="`Hreflang_${hreflang.id}${i}`"
      >
        <Link
          rel="alternate"
          :href="hreflang.url"
          :hreflang="hreflang.language"
        />
      </template>
  </template>
  </div>
</template>

<script setup lang="ts">

import { Hreflangs } from '~/types/hreflangs'

const route = useRoute()

interface Props {
  metaTitle: string,
  metaDesc: string,
  metaImage?: string,
  metaRobots: string,
  siteUrl: string,
  siteName: string,
  hreflangs?: Hreflangs
}

const props = withDefaults(defineProps<Props>(), {
  metaTitle: '',
  metaDesc: '',
  metaImage: '',
  metaRobots: '',
  siteUrl: '',
  siteName: '',
  hreflangs: null
});
</script>
