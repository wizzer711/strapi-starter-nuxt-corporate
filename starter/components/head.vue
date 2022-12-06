<template>
  <Head>
    <Metadata
      :meta-title="metaTitle"
      :meta-desc="metaDesc"
      :meta-robots="metaRobots"
      :meta-image="metaImage"
      :site-url="siteUrl"
      :site-name="siteName"
      :hreflangs="hreflangs"
    />
    <Resources />
    <!-- <Script type="text/partytown" children="
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-MPTN2HW');
    " /> -->
  </Head>
</template>

<script setup lang="ts">
  import { Hreflangs } from '~/types/hreflangs'

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