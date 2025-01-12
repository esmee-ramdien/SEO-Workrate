<template>
    <div class="px-4 sm:px-6">
        <div class="flex place-content-center items-center mt-5">
            <input class="mr-2 px-3 py-1 rounded-md" v-model="query" @input="handleInput" placeholder="Search GIFs" />

            <Filter @resetFilter="resetFilter" @applyFilter="applyFilter" />
            <Sorting @sort="handleSort" />
        </div>

        <div class="flex place-self-center">
            <ul v-if="autocompleteSuggestions.length && !isLoading" class="mt-1 bg-white border rounded-md">
                <li v-for="suggestion in autocompleteSuggestions" :key="suggestion"
                    class="px-3 py-2 hover:bg-gray-200 cursor-pointer" @click="selectSuggestion(suggestion)">
                    {{ suggestion }}
                </li>
            </ul>
        </div>

        <div class="flex place-self-center my-5">
            <div v-if="isLoading">Loading...</div>

            <div v-if="filteredGifs.length" ref="scrollComponent"
                class="mt-4 w-full max-w-screen-lg grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 sm: gap-2 md:gap-3 lg:gap-5">
                <div class="flex items-center bg-white p-2 rounded-md" v-for="gif in filteredGifs" :key="gif.id">
                    <img :src="gif.images.downsized.url" loading="lazy" :alt="gif.title" class="w-full h-auto" />
                </div>
            </div>

            <div v-else-if="!gifs.length && !isLoading" class="flex place-self-center">
                <p class="text-xl">No results</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Sorting from '../components/Sorting.vue';
import Filter from '../components/Filter.vue';
import type { SortingParams } from '../@types/sorting';
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { gifs, isLoading, queryGifs, loadMore, resetSearch, fetchAutocompleteSuggestions } from '@/src/composables/giphy';

const query = ref('');
const autocompleteSuggestions = ref<string[]>([]);
const scrollComponent = ref()

const sortKey = ref<'import_datetime' | 'trending_datetime'>('trending_datetime');
const sortOrder = ref<string>('desc');
const selectedFilters = ref<string[]>([]);

const handleInput = () => {
    resetSearch();

    fetchAutocompleteSuggestions(query.value).then((suggestions) => {
        autocompleteSuggestions.value = suggestions;
    });

    if (query.value) {
        queryGifs(query.value);
    }
};

const handleSort = ({ key, order }: SortingParams) => {
    sortKey.value = key;
    sortOrder.value = order;
};

const filteredGifs = computed(() => {
    let filtered = gifs.value;

    if (selectedFilters.value.length > 0) {
        filtered = filtered.filter(gif => selectedFilters.value.includes(gif.rating));
    }

    return filtered.sort((a, b) => {
        const dateA = new Date(a[sortKey.value]).getTime();
        const dateB = new Date(b[sortKey.value]).getTime();

        return sortOrder.value === 'asc' ? dateA - dateB : dateB - dateA;
    });
});

const applyFilter = (filters: string[]) => {
    selectedFilters.value = filters;
};

const resetFilter = () => {
    selectedFilters.value = []
}

const handleScroll = () => {
    let element = scrollComponent.value;
    if (element.getBoundingClientRect().bottom < window.innerHeight) {
        loadMore(query.value);
    }
};

const selectSuggestion = (suggestion: string) => {
    query.value = suggestion;
    autocompleteSuggestions.value = [];
    resetSearch();
    queryGifs(query.value);
};

onMounted(() => {
    window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
});
</script>
