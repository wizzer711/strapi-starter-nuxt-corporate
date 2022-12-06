<template>
<div>
    <div class="autocomplete control has-icons-left is-medium is-clearfix">
        <input
            class="upm-docsSearchInput input is-medium"
            :class="inputColour"
            placeholder="Search"
            type="text"
            @input="docsSearchOnChange"
            v-model="docsSearchParam"
        />
        <span class="icon is-left">
            <i class="fas fa-search"></i>
        </span>
        
    </div>
    <div class="upm-docsSearch has-margin-top-150">
        <div v-if="isOpen && loading" class="loader lrg"></div>
        <div v-if="isOpen && !loading">
            <div
                v-for="(result, i) in docs"
                :key="i"
                class="upm-doc-row"
            >
                <a target="_blank" :href="result.url">
                    {{ result.name }}
                    <span class="icon is-dark"><i class="fas fa-external-link-alt"></i></span>
                </a>
            </div>
            <span
                class="is-block is-size-6"
                v-if="(docsSearchParam == '' || docs.length < 1) && !loading"
            >
                No results found for `{{ docsSearchParam }}`.<br />
                <a class="is-block has-margin-top-50" href="https://upmind.com/community/" target="_blank">
                    Try visiting our forum
                    <span class="icon is-dark"><i class="fas fa-external-link-alt"></i></span>
                </a>
            </span>
        </div>
    </div>
</div>
</template>

<script setup lang="ts">

    interface Props {
        inputColour: string
    }

    defineProps<Props>()

    let docs = ref([])
    let docsSearchParam = ref('')
    let isOpen = ref(false)
    let loading = ref(false)

    const getDocs = useDebounce(async function(searchInput: string) {
        //await $fetch('https://swapi.dev/api/people', {
        await $fetch('https://api.upmind.io/api/documentation', {
            method: 'GET',
            params: { search: searchInput }
        })
        .then(function(response: any){
            loading.value = false
            docs.value = response.results
        })
    }, 250)

    function docsSearchOnChange() {
        loading.value = true;
        if(docsSearchParam.value != ''){
            getDocs(docsSearchParam.value);
            isOpen.value = true;
        }else{
            isOpen.value = false;
        }
    }

</script>