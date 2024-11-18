<script setup lang="ts">
    const router = useRouter()

    localStorage.removeItem('token')
    router.replace('/login')
</script>
<route lang="yaml">
    meta:
        layout: blank
</route>
    