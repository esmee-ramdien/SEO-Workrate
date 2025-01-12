<template>
    <div class="flex items-center">
        <button id="dropdownMenuIconButton" data-dropdown-toggle="dropdown"
            class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 rounded-lg focus:ring-4 focus:outline-none"
            type="button">
            <img src="@/src/assets/icons/sorting.svg" alt="Sort" class="w-6 h-6" />
        </button>
        <div id="dropdown"
            class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow">
            <ul class="py-2 text-sm text-gray-700 w-max" aria-labelledby="dropdownMenuIconButton">
                <li v-for="option in sortingOptions" :key="option.key" 
                    :class="{'bg-slate-300': selectedKey === option.key, 'bg-white': selectedKey !== option.key}"
                    class="flex items-center">
                    <span @click="toggleSort(option.key)" class="px-4 py-2 w-full md:hover:bg-gray-100">
                        {{ option.label }} 
                        <img v-if="option.order === 'asc'" src="@/src/assets/icons/arrow-up.svg" alt="Ascending" class="w-4 h-auto" />
                        <img v-if="option.order === 'desc'" src="@/src/assets/icons/arrow-down.svg" alt="Descending" class="w-4 h-auto" />
                    </span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { defineEmits } from 'vue';
import { Collapse } from 'flowbite';
import type { CollapseInterface } from 'flowbite';

const dropdownMenuIconButton = ref<HTMLElement | null>(null);
const dropdown = ref<HTMLElement | null>(null);

const emit = defineEmits()

const sortingOptions = ref([
    { key: 'import_datetime', order: 'desc', label: 'Sort by Import Date' },
    { key: 'trending_datetime', order: 'desc', label: 'Sort by Trending Date' },
]);

const selectedKey = ref<string | null>(null);

const toggleSort = (key: string) => {
    const selectedOption = sortingOptions.value.find(o => o.key === key);

    if (selectedOption) {
        selectedKey.value = key;
        selectedOption.order = selectedOption.order === 'asc' ? 'desc' : 'asc';

        emit('sort', { key: selectedOption.key, order: selectedOption.order });
    }
};

onMounted(() => {
    if (dropdownMenuIconButton.value && dropdown.value) {
        const collapse: CollapseInterface = new Collapse(dropdown.value, dropdownMenuIconButton.value);

        dropdownMenuIconButton.value.addEventListener('click', () => {
            collapse.toggle();
        });
    }
});
</script>
