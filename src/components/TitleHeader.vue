<script setup lang="ts">
    import { useStore } from '@/models/store'

    const store = useStore()
</script>

<template>
    <header class="read-header">
            <h1>{{ store.headerTitle }}</h1>
    </header>
</template>