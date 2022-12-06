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
    <ClientOnly>
      <p>:{{ currency }}:</p>
    </ClientOnly>
    <button @click="manualSetCurrencyCookie('GBP')">GBP</button>
    <button @click="manualSetCurrencyCookie('SLOV')">SLOV</button>
    <div>{{ getPrice('the start of the string {price:product:term} last section of string', currency) }}</div>
    <!-- <Integrations
      :categories='[{"title":"Payment Gateways","slug":"payment-gateways"},{"title":"Coming Soon","slug":"coming-soon"}]'
      :data='[{"integrationId":139757,"integrationTitle":"Stripe","integrationDescription":"Stripe is a credit or debit card gateway","integrationCategories":[{"title":"Payment Gateways","slug":"payment-gateways"}],"integrationIcon":"https://dws2cyasfrue6.cloudfront.net/uploads/imager/providers/139777/2560px-Stripe_Logo_revised_2016.svg_35284b4cc698ca022359a019bcb6b6c8.png"},{"integrationId":139795,"integrationTitle":"PayPal","integrationDescription":"Support for PayPal Express, PayPal Pro","integrationCategories":[{"title":"Payment Gateways","slug":"payment-gateways"}],"integrationIcon":"https://upmind-site-static-assets.s3.eu-west-1.amazonaws.com/uploads/providers/cropped-bk-logo-1-e1525354448227-1.webp"},{"integrationId":139797,"integrationTitle":"Coinbase","integrationDescription":"Accept Bitcoin, Eth and other crypto payments <strong>using</strong> Coinbase","integrationCategories":[{"title":"Payment Gateways","slug":"payment-gateways"},{"title":"Coming Soon","slug":"coming-soon"}],"integrationIcon":"https://upmind-site-static-assets.s3.eu-west-1.amazonaws.com/uploads/providers/cropped-bk-logo-1-e1525354448227-1.webp"},{"integrationId":139793,"integrationTitle":"GoCardless","integrationDescription":"GoCardless lets you accept direct debit payments","integrationCategories":[{"title":"Coming Soon","slug":"coming-soon"}],"integrationIcon":"https://upmind-site-static-assets.s3.eu-west-1.amazonaws.com/uploads/providers/cropped-bk-logo-1-e1525354448227-1.webp"}]'
      :filters='{"payment-gateways":false,"coming-soon":false}'
    /> -->
    <DocsSearch
      inputColour="blue"
    />
    <SelectRibbon
      :ribbons="data"
    />
    <!-- {{ $t('welcome') }}
    <div v-for="locale in availableLocales" :key="locale.code">
      <div>{{ locale.name }}</div>
    </div> -->
    <!-- <pre>Q{{ availableLocales }}Q</pre> -->
    <!-- <p v-if="!noHreflangData">oh yes{{ hreflangs }}</p> -->
    <Footer/>
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
      'filters[slug]': slug
    }
  )
  data = useGet(data.data[0], 'attributes', null)
  data = useGet(data, 'ribbons', null)

  // Throw 404 if page not found
  const noData = isEmpty(data)
  if(noData){
      throwError(
      createError({
        statusCode: 404,
        statusMessage: 'Page Not Found',
      })
    );
  }

  // Set MetaDetails
  const metaDetails = useGet(data, 'seo', null)
  const metaTitle = useGet(metaDetails, 'metaTitle', 'Upmind')
  const metaDescription = useGet(metaDetails, 'metaDescription', '')

  // Get global brand details and put into store
  let { data: globals } = await useFetch('http://localhost:8080/api/brand-details?populate=deep&filters[brand]=stablepoint')
  globals = useGet(globals.value.data[0], 'attributes', {})
  useState('brandDetails', () => globals)

  // Get hreflang language data
  const hreflangFilter = useGet(data, 'hreflangOverride', slug)
  let { data: hreflangsData } = await useFetch(`http://localhost:8080/api/hreflang-mappings?populate=*&filters[slug]=${hreflangFilter}`)
  hreflangsData = useGet(hreflangsData.value.data[0], 'attributes', {})
  hreflangsData = useGet(hreflangsData, 'hreflangs', {})

  // Currency
  const queryCurrency = route.query.currency as string
  let currency = initCurrency(queryCurrency) // Note currency is created as a reactive variable, see initCurrency function

  // function manualSetCurrencyCookie(selectedCurrency: string) {
  //   setCurrencyCookie(selectedCurrency)
  //   currency.value = getCurrency(queryCurrency, selectedCurrency)
  // }
  // const languageArray = ['en', 'af']

  // function availableLocales () {
  //   return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
  // }

  //if(route.hash)
  //console.log(route.matched[0].name)

</script>