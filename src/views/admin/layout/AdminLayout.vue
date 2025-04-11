<template>
  <div class="flex min-h-screen font-sans">
    <AdminSidebar />
    <div class="flex-1 flex flex-col">
      <AppHeader />
      <main class="flex-1 p-8 bg-gray-50 mt-16">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script>
import AdminSidebar from '@/components/admin/AdminSidebar.vue';
import AppHeader from '@/components/layout/Header.vue';

export default {
  name: "AdminLayout",
  components: {
    AdminSidebar,
    AppHeader
  }
};
</script>

<style scoped>
@media (max-width: 768px) {
  .flex {
    flex-direction: column;
  }
  aside {
    position: relative;
    width: 100%;
    height: auto;
  }
}
</style> 