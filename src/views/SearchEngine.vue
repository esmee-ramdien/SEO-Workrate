<template>
    <div class="flex flex-col items-center place-content-center px-4 sm:px-6">
        <div class="flex place-content-center items-center mt-5">
            <input class="mr-2 px-3 py-1 rounded-md" v-model="query" @input="handleInput" @keyup.enter="onEnterPress" placeholder="Search GIFs" />

            <Filter class="mr-2" @resetFilter="resetFilter" @applyFilter="applyFilter" />
            <Sorting @sort="handleSort" />
        </div>

        <div>
            <ul v-if="autocompleteSuggestions.length && !isLoading" class="mt-1 bg-white border rounded-md">
                <li v-for="suggestion in autocompleteSuggestions" :key="suggestion"
                    class="px-3 py-2 hover:bg-gray-200 cursor-pointer" @click="selectSuggestion(suggestion)">
                    {{ suggestion }}
                </li>
            </ul>
        </div>

        <div class="my-5">
            <div v-if="isLoading">Loading...</div>

            <div v-if="filteredGifs.length" ref="scrollComponent"
                class="mt-4 max-w-screen-lg grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-6 md:gap-3 lg:gap-5">
                <div class="flex items-center bg-white p-2 rounded-md" v-for="gif in filteredGifs" :key="gif.id">
                    <img :src="gif.images.downsized_large.url" loading="lazy" :alt="gif.title" class="w-full" />
                </div>
            </div>

            <div v-else-if="!gifs.length && !isLoading">
                <p class="text-xl">No results</p>
            </div>
            <div v-else-if="!filteredGifs.length && !isLoading">
                <p class="text-xl">Filter has no results</p>
            </div>
        </div>

        <button v-if="filteredGifs.length" class="w-fit" @click="loadMore(query)"> Load more </button>
    </div>
</template>

<script setup lang="ts">
import Sorting from '../components/Sorting.vue';
import Filter from '../components/Filter.vue';
import type { SortingParams } from '../@types/sorting';
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useGiphy } from '@/src/composables/giphy';

const { queryGifs, loadMore, resetSearch, fetchAutocompleteSuggestions, gifs, isLoading } = useGiphy();

const query = ref('');
const autocompleteSuggestions = ref<string[]>([]);
const scrollComponent = ref()

const sortKey = ref<'import_datetime' | 'trending_datetime'>('trending_datetime');
const sortOrder = ref<string>('desc');
const selectedFilters = ref<string[]>([]);

const onEnterPress = () => {
    autocompleteSuggestions.value = [];
    queryGifs(query.value);
};

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
    if (scrollComponent.value.getBoundingClientRect().bottom < window.innerHeight) {
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
