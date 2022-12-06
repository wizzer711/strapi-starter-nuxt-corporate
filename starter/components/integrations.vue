<template>
    <div class="container mx-auto">
        <div class="tabs">
            <div class="container">    
                <ul>
                    <li
                        v-for="(category, i) in categories"
                        :key="`tab_${i}`"
                    >
                        <a
                            href="javascript:void(0)"
                            class="dropdown-item has-padding-y-100"
                            :class="{ 'is-active': isActiveFilterSelection(category.slug) }"
                            @click="filterIntegrations(category.slug)"
                        >
                            <span class="is-size-7">{{ category.title }}</span>
                        </a>
                    </li>
                    <li>
                        <a
                            href="javascript:void(0)"
                            class="dropdown-item reset has-padding-y-100"
                            :class="{ 'is-active': isActiveFilterSelection('') }"
                            @click="resetFilters()"
                        >
                            <span class="is-size-7">All</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>

        <input
            class="upm-integrationsSearchInput input mb:6 border-grey-300"
            placeholder="Search by name"
            type="text"
            @input="integrationsOnChange"
            v-model="integrationsSearchParam"
        />

        <transition-group tag="div" class="columns is-multiline columns-3 md:columns-2" name="list">
            <div
                v-for="(integration, a) in integrations"
                :key="`int_${a}`"
                class="column is-6-tablet is-3-desktop"
            >
                <div class="upm-integrationContainer has-background-white">
                    <div class="card-content is-space-between is-full-height">
                        <div>
                            <div class="has-margin-bottom-150">
                                <GlobalImage
                                    :image-element="integration.integrationIcon"
                                    mobile-src-set="360w"
                                    tablet-src-set="580w"
                                    desktop-src-set="640w"
                                    mobile-size="(max-width: 768px) 360px"
                                    tablet-size="(max-width: 1024px) 580px"
                                    desktop-size="50vw"
                                    :width="140"
                                    :height="48"
                                />
                            </div>
                            <div class="content has-text-grey has-margin-bottom-150" v-html="integration.integrationDescription"></div>
                        </div>
                        <div>
                            <div class="tags">
                                <span v-for="(category, i) in integration.integrationCategories"
                                :key="`category_${i}`"
                                class="tag"
                                :class="{ 'is-warning': category.slug == 'coming-soon', 'is-primary': category.slug != 'coming-soon' }"
                                >{{ category.title }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition-group>
    </div>
</template>
<script setup lang="ts" scoped>

    interface IntegrationCategory {
        slug: string,
        title: string
    }
    interface Integration {
        integrationCategories: Array<IntegrationCategory>,
        integrationDescription: string,
        integrationIcon: string,
        integrationId: number,
        integrationTitle: string
    }
    interface Filter {
        [key:string]: boolean
    }
    interface Props {
        data: Array<Integration>,
        categories: Array<IntegrationCategory>,
        filters: Filter
    }

    const integrationProps = defineProps<Props>()

    let integrations = ref([])
    let activeFilter = ref('')
    let integrationsSearchParam = ref('')

    setIntegrationsData()

    function setIntegrationsData(){
        integrations.value = integrationProps.data
    }

    function integrationsOnChange() {
        if(integrationsSearchParam.value != ''){
            filterIntegrationsByName(integrationsSearchParam.value);
        }else{
            integrations.value = integrationProps.data;
        }
    }
    function resetFilters() {
        filterIntegrations('');
        activeFilter.value = '';
    }
    function isActiveFilterSelection(categorySlug: string) {
        if(activeFilter.value == categorySlug){
            return true;
        }else{
            return false;
        }
    }
    function setFilterArray(categorySlug: string) {
        activeFilter.value = categorySlug;
    }
    function filterIntegrationsByName(integrationsSearchParam: string) {
        activeFilter.value = '';
        const filteredIntegrationsByName = useFilter(integrationProps.data, (integration: Integration) => {
            if(useIncludes(integration.integrationTitle.toLowerCase(), integrationsSearchParam.toLowerCase())){
                return integration;
            }
        });
        integrations.value = filteredIntegrationsByName;
    }
    function filterIntegrations(categorySlug: string) {
        integrationsSearchParam.value = '';
        if(categorySlug == ''){
            integrations.value = integrationProps.data;
            activeFilter.value = '';
            return;
        }
        setFilterArray(categorySlug);
        const filteredIntegrations = useFilter(integrationProps.data, (integration: Integration) => {
            let intCategories = useFilter(integration.integrationCategories, (cat: IntegrationCategory) => {
                return cat.slug == activeFilter.value;
            });
            if(!isEmpty(intCategories)){
                return integration;
            }
        });
        integrations.value = filteredIntegrations;
        if(isEmpty(integrations)){
            integrations.value = integrationProps.data;
        }
    }
</script>

<style scoped>
    div.upm-integrationContainer {
        height: 100%;
        display: block;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.25);
        border-radius: 0.3rem;
    }
    img.upm-integrationIcon {
        max-width: 50%;
        height: auto !important;
        max-height: 3rem !important;
    }
    div.card-content {
        padding: 1.5rem;
        color: black;
    }

    input.upm-integrationsSearchInput {
        width: 25%;
    }

    div.tabs ul li{
        border-bottom: 1px solid grey;
        margin-bottom: -1px;
    }
    div.tabs ul li a{
        border-bottom-width: 3px;
        border-bottom-color: transparent;
    }
    div.tabs ul li a:hover, div.tabs ul li a.is-active{
        background-color: transparent;
        color: blue;
        border-bottom: 3px solid grey;
    }
</style>