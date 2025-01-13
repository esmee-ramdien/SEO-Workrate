<template>
    <div class="relative flex items-center">
        <button @click="toggleFilterModal" class="bg-inherit focus:ring-4" type="button">
            <img src="@/src/assets/icons/filter.svg" alt="Sort" class="w-6 h-6" />
        </button>

        <div v-show="isFiltersVisible" class="modal flex justify-center flex-col">
            <p class="py-1 font-bold text-lg"> MPAA Ratings </p>
            <ul class="p-3 space-y-3 text-sm text-gray-700">
                <li v-for="(rating, index) in MPAA" :key="rating.abbr">
                    <div class="flex items-center">
                        <input type="checkbox" :id="'item-' + index" v-model="rating.checked"
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
                        <label :for="'item-' + index" class="ms-2 text-sm font-medium text-gray-900">
                            {{ rating.text }}</label>
                    </div>
                </li>
            </ul>
            <div class="flex place-content-center space-x-3 p-2">
                <button @click="applyFilters">
                    Apply
                </button>
                <button @click="resetFilters" class="bg-red-500">
                    Reset
                </button>
            </div>
            <button @click="toggleFilterModal" class="flex place-self-center items-center place-content-center bg-slate-200 size-8">
                <img src="@/src/assets/icons/close.svg" alt="Sort" class="w-2" />
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue';

const emit = defineEmits();

const MPAA = ref([
    { abbr: 'g', text: 'General Audience', checked: false },
    { abbr: 'pg', text: 'Parental Guidance Suggested', checked: false },
    { abbr: 'pg-13', text: 'Parents Strongly Cautioned', checked: false },
    { abbr: 'r', text: 'Restricted', checked: false }
]);

const isFiltersVisible = ref(false);

const applyFilters = () => {
    const selectedFilters = MPAA.value.filter(rating => rating.checked).map(rating => rating.abbr);
    isFiltersVisible.value = false;
    emit('applyFilter', selectedFilters);
};

const resetFilters = () => {
    MPAA.value.forEach(rating => rating.checked = false);
    isFiltersVisible.value = false;
    emit('resetFilter');
};

const toggleFilterModal = () => {
    isFiltersVisible.value = !isFiltersVisible.value;
};
</script>
