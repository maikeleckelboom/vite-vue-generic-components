<script lang="ts" setup>
import { reactive } from 'vue';
import { useGenericSelectInput } from './genericSelect';

interface Pet {
  name: string;
  icon: string;
}

interface Owner {
  firstName: string;
  lastName: string;
}

const pets: Pet[] = [
  { name: 'Dog', icon: '🐶' },
  { name: 'Cat', icon: '🐱' },
  { name: 'Duck', icon: '🦆' },
  { name: 'Lion', icon: '🦁' },
  { name: 'Unicorn', icon: '🦄' },
  { name: 'Eagle', icon: '🦅' },
];

const owners: Owner[] = [
  { firstName: 'Abdelrahman', lastName: 'Awad' },
  { firstName: 'Dominic', lastName: 'Brown' },
  { firstName: 'Sarah', lastName: 'Carr' },
  { firstName: 'Gavin', lastName: 'Chapman' },
  { firstName: 'Wendy', lastName: 'Byrde' },
];

const form = reactive({
  pet: undefined as Pet | undefined,
  owner: undefined as Owner | undefined,
});

const OwnerSelect = useGenericSelectInput<Owner>();
const PetSelect = useGenericSelectInput<Pet>();
</script>

<template>
  <OwnerSelect v-model="form.owner" label="Owner" :options="owners">
    <template #selectedOption="{ option }">
      <span class="flex items-center text-sm font-medium">
        <span>{{ option.firstName }} {{ option.lastName }}</span>
      </span>
    </template>

    <template #option="{ option }">
      <span class="flex items-center text-sm">
        <span>{{ option.firstName }} {{ option.lastName }}</span>
      </span>
    </template>
  </OwnerSelect>

  <PetSelect v-model="form.pet" label="Pet" :options="pets" class="mt-4">
    <template #selectedOption="{ option }">
      <span class="flex items-center text-sm font-medium">
        <span>{{ option.icon }}</span>
        <span class="ml-1">{{ option.name }}</span>
      </span>
    </template>

    <template #option="{ option }">
      <span class="flex items-center text-sm">
        <span>{{ option.icon }}</span>
        <span class="ml-1">{{ option.name }}</span>
      </span>
    </template>
  </PetSelect>
</template>
