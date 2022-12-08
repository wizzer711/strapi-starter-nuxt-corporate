<template>
  <div>
    <Head
      :meta-title="metaTitle"
      :meta-desc="metaDescription"
      meta-robots="index, follow"
      site-url="upmind.com"
      site-name="Upmind"
      :hreflangs="hreflangsData"
    />
    <!-- <Header/> -->
    <Text
        :ribbon="legalData"
    />
    <NuxtLink to="/about-us">about-us</NuxtLink>
    <Footer />
  </div>
</template>

<script setup lang="ts">

  import type { Strapi4Response } from '@nuxtjs/strapi'
  import { createError } from 'h3'
  import { Page } from '~/types/page'

  // Get page data
  const route = useRoute()
  const { find } = useStrapi4()
  const slug = (route.params.slug != '') ? route.params.slug : 'homepage'
  const publicationState = route.query.slug ? 'preview' : 'live'
  let data = await find<Strapi4Response<Page>>(
    'pages',
    {
      'populate': 'deep',
      publicationState: publicationState,
      'filters[slug]': 'terms-of-service',
    }
  )
  const page = useGet(data.data[0], 'attributes', null)
  data = useGet(data.data[0], 'attributes', null)

  let { data: legalData } = await useFetch('http://localhost:8080/api/legals?populate=*&filters[slug]=terms-of-services')
  legalData = isNull(legalData.value) ? {} : useGet(legalData.value.data[0], 'attributes', {})

  // Throw 404 if page not found
  const noPage = isEmpty(page)
  const noData = isEmpty(legalData)
  if(noData && noPage){
    throw createError({
      statusCode: 404,
      statusMessage: 'Page Not Found',
    })
  }

  // Set MetaDetails
  const metaDetails = useGet(data, 'seo', null)
  const metaTitle = useGet(metaDetails, 'metaTitle', 'Upmind')
  const metaDescription = useGet(metaDetails, 'metaDescription', '')

  // Get global brand details and put into store
  let { data: globals } = await useFetch('http://localhost:8080/api/brand-details?populate=deep&filters[brand]=stablepoint')
  globals = isNull(globals.value) ? {} : useGet(globals.value.data[0], 'attributes', {})
  useState('brandDetails', () => globals)

  // Get hreflang language data
  const hreflangFilter = useGet(data, 'hreflangOverride', slug)
  let { data: hreflangsData } = await useFetch(`http://localhost:8080/api/hreflang-mappings?populate=*&filters[slug]=${hreflangFilter}`)
  hreflangsData = isNull(hreflangsData.value) ? {} : useGet(hreflangsData.value.data[0], 'attributes', {})
  hreflangsData = useGet(hreflangsData, 'hreflangs', {})

</script>