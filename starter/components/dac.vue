<template>
  <div style="background: blue;">

    <div>DAC ME UP</div>
    <ClientOnly>
      <upm-dac
        order-config-url="https://clients.verpex.com/order/product"
        currency-code="USD"
      />
      <Script src="https://widgets.upmind.app/dac/upm-dac.min.js" />
    </ClientOnly>
  </div>
</template>
<script setup lang="ts">

  // useHead({
  //   script: [
  //     {
  //       hid: 'dac',
  //       //defer: true,
  //       src: 'https://widgets.upmind.app/dac/upm-dac.min.js'
  //     }
  //   ],
  // })

</script>