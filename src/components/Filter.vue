<template>
    <div class="flex items-center">
        <button id="dropdownCheckboxButton" data-dropdown-toggle="dropdownDefaultCheckbox"
            class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 rounded-lg focus:ring-4 focus:outline-none"
            type="button">
            <img src="@/src/assets/icons/filter.svg" alt="Sort" class="w-6 h-6" />
        </button>

        <div id="dropdownDefaultCheckbox"
            class="z-10 hidden w-48 bg-white divide-y divide-gray-100 rounded-lg shadow">
            <p class="flex place-self-center py-1"> MPAA Ratings </p>
            <ul class="p-3 space-y-3 text-sm text-gray-700" aria-labelledby="dropdownCheckboxButton">
                <li v-for="(rating, index) in MPAA" :key="rating.abbr">
                    <div class="flex items-center">
                        <input type="checkbox" :id="'checkbox-item-' + index" v-model="rating.checked"
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
                        <label :for="'checkbox-item-' + index"
                            class="ms-2 text-sm font-medium text-gray-900">{{ rating.text }}</label>
                    </div>
                </li>
            </ul>
            <div class="flex place-content-center space-x-3 p-3">
                <button @click="applyFilters" class="bg-black text-white p-2 rounded-lg">
                    Apply
                </button>
                <button @click="resetFilters" class="bg-red-500 text-white p-2 rounded-lg">
                    Reset
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, defineEmits, onMounted } from 'vue';
import { Collapse } from 'flowbite';
import type { CollapseInterface } from 'flowbite';

const emit = defineEmits();

const dropdownCheckboxButton = ref<HTMLElement | null>(null);
const dropdownDefaultCheckbox = ref<HTMLElement | null>(null);

const MPAA = ref([
    { abbr: 'g', text: 'General Audience', checked: false },
    { abbr: 'pg', text: 'Parental Guidance Suggested', checked: false },
    { abbr: 'pg-13', text: 'Parents Strongly Cautioned', checked: false },
    { abbr: 'r', text: 'Restricted', checked: false }
]);

const applyFilters = () => {
    const selectedFilters = MPAA.value.filter(rating => rating.checked).map(rating => rating.abbr);
    emit('applyFilter', selectedFilters);
};

const resetFilters = () => {
    MPAA.value.forEach(rating => rating.checked = false);
    emit('resetFilter');
};
onMounted(() => {
    if (dropdownCheckboxButton.value && dropdownDefaultCheckbox.value) {
        const collapse: CollapseInterface = new Collapse(dropdownDefaultCheckbox.value, dropdownCheckboxButton.value);
        dropdownCheckboxButton.value.addEventListener('click', () => collapse.toggle());
    }
});
</script>
