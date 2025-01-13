<template>
    <div class="relative flex items-center">
        <button @click="toggleSortingModal" class="bg-inherit focus:ring-4" type="button">
            <img src="@/src/assets/icons/sorting.svg" alt="Sort" class="w-6 h-6" />
        </button>

        <div v-show="isSortingOptionsVisible" class="modal flex justify-center flex-col"">
            <p class=" py-1 font-bold text-lg"> Sort by: </p>

            <ul class="py-2 text-sm text-gray-700 w-full">
                <li v-for="option in sortingOptions" :key="option.key"
                    class="flex items-center">
                    <span @click="toggleSort(option.key)" class="px-4 py-2 w-full md:hover:bg-gray-100">
                        {{ option.label }}
                        <img v-if="option.order === 'asc'" src="@/src/assets/icons/arrow-up.svg" alt="Ascending"
                            class="w-4" />
                        <img v-if="option.order === 'desc'" src="@/src/assets/icons/arrow-down.svg" alt="Descending"
                            class="w-4" />
                    </span>
                </li>
            </ul>
            <div class="p-2">
                <button @click="toggleSortingModal"
                    class="flex place-self-center items-center place-content-center bg-slate-200 size-8">
                    <img src="@/src/assets/icons/close.svg" alt="Sort" class="w-2" />
                </button>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { defineEmits } from 'vue';

const emit = defineEmits()

const sortingOptions = ref([
    { key: 'import_datetime', order: 'desc', label: 'Recently Added' },
    { key: 'trending_datetime', order: 'desc', label: 'Trending (if applicable)' },
]);
const isSortingOptionsVisible = ref(false);
const selectedKey = ref<string | null>(null);

const toggleSort = (key: string) => {
    const selectedOption = sortingOptions.value.find(o => o.key === key);

    if (selectedOption) {
        selectedKey.value = key;
        selectedOption.order = selectedOption.order === 'asc' ? 'desc' : 'asc';

        emit('sort', { key: selectedOption.key, order: selectedOption.order });
    }
};

const toggleSortingModal = () => {
    isSortingOptionsVisible.value = !isSortingOptionsVisible.value;
};
</script>
