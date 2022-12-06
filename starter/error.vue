<template>
  
  <div>
    
    <Head
      :meta-title="errorMetaTitle"
      :meta-desc="errorDescription"
      meta-robots="noindex, nofollow"
      site-url="upmind.com"
      site-name="Upmind"
    />

    <div class="flex items-center justify-center min-h-screen bg-white py-48">

      <div class="flex flex-col">
        <div class="flex flex-col items-center">
            <div v-if="errorPreHeading" class="text-indigo-500 font-bold text-7xl">
                {{ errorPreHeading }}
            </div>
            <div v-if="errorHeading" class="font-bold text-3xl xl:text-7xl lg:text-6xl md:text-5xl mt-10">
                {{ errorHeading }}
            </div>
            <div v-if="errorDescription" class="text-gray-400 font-medium text-sm md:text-xl lg:text-2xl mt-8">
                {{ errorDescription }}
            </div>
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-8" @click="returnHome">Return to Homepage</button>
        </div>
      </div>

    </div>

    <Footer/>

  </div>
</template>

<script setup lang="ts">

const errorProps = defineProps({
  error: Object
})

let errorMetaTitle = '';
let errorPreHeading = '';
let errorHeading = '';
let errorDescription = '';

if(errorProps.error.statusCode == 404 || errorProps.error.statusCode == '404'){
  errorMetaTitle = "404 Response Error Page";
  errorPreHeading = '404';
  errorHeading = 'Content not found';
  errorDescription = "Oh no we couldn't find the page you were looking for";
}else if(errorProps.error.statusCode == 403 || errorProps.error.statusCode == '403'){
  errorMetaTitle = "403 Response Error Page";
  errorPreHeading = '403';
  errorHeading = 'Forbidden page';
  errorDescription = "Hmm, awkward. You're not allowed to visit the requested page or perform the requested action.";
}else{
  errorMetaTitle = "500 Internal Error Page";
  errorPreHeading = '500';
  errorHeading = 'Internal Server Error';
  errorDescription = "Hmm, awkward. We seem to be having problems.";
}

const returnHome = () => clearError({ redirect: '/' })

</script>