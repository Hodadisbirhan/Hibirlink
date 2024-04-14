<template>
  <div class="mx-auto sm:grid sm:grid-cols-2 sm:gap-x-5">
    <h-select
      :items="cityItems"
      name="Region"
      label="region_city_administration"
      rules="required"
      v-model:selected-value="regionAt"
    ></h-select>
    <h-select
      :items="subCitiesAt ?? []"
      name="SubCity"
      label="sub_city"
      rules="required"
      v-model:selected-value="selectedSubCity"
    ></h-select>
  </div>
</template>

<script setup lang="ts">
import { useField } from "vee-validate";

interface propsInterface {
  cityItems: {
    id: number;
    name: string | undefined;
    subCities: {
      id: number;
      name: string | undefined;
    }[];
  }[];
}

const props = defineProps<propsInterface>();

const regionAt = ref<{
  id: number;
  name: string | undefined;
  subCities: {
    id: number;
    name: string | undefined;
  }[];
}>();

const subCitiesAt = ref<Array<{ id: number; name: string | undefined }>>();
const selectedSubCity = ref(null);
const { value } = useField("SubCity", "required");

watch(selectedSubCity, (newVal) => (value.value = newVal));

watch(
  regionAt,
  (newValue: {
    id: number;
    name: string | undefined;
    subCities: {
      id: number;
      name: string | undefined;
    }[];
  }) => {
    console.log({ newValue });
    subCitiesAt.value = newValue.subCities;
  }
);
</script>
