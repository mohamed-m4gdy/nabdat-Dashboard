<template>
    <VCard class="mb-3">
        <ul class="v-breadcrumbs v-breadcrumbs--density-default">
            <template v-for="(link, index) in links">
                <li class="v-breadcrumbs-item" :class="link.link? '' : 'v-breadcrumbs-item--disabled'">
                    <RouterLink :to="link.link" v-if="link.link">{{link.title}}</RouterLink>
                    <template v-else>{{link.title}}</template>
                </li>
                <li class="v-breadcrumbs-divider" v-if="index < links.length - 1">/</li>
            </template>
        </ul>
    </VCard>
</template>

<script setup lang="ts">
    defineProps(['links'])
</script>
<style scoped>
.v-breadcrumbs {
    display: flex;
    align-items: center;
    line-height: 1.375rem;
    padding: 16px 12px;
}
.v-breadcrumbs--density-default {
    padding-top: 16px;
    padding-bottom: 16px;
}
.v-breadcrumbs-item {
    align-items: center;
    color: inherit;
    display: inline-flex;
    padding: 0 4px;
    text-decoration: none;
    vertical-align: middle;
}
.v-breadcrumbs-divider {
    display: inline-block;
    padding: 0 8px;
    vertical-align: middle;
}
.v-breadcrumbs-item--disabled {
    opacity: var(--v-disabled-opacity);
    pointer-events: none;
}
</style>