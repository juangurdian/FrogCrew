<template>
  <aside class="fixed top-0 left-0 h-screen w-64 bg-[#4d2e7d] text-white overflow-y-auto">
    <div class="flex items-center p-6 border-b border-purple-700">
      <img src="@/assets/frog-mascot.png" alt="Frog Mascot" class="w-12 h-12 mr-3" />
      <h1 class="text-2xl font-bold">FrogCrew Admin</h1>
    </div>
    <nav class="p-4">
      <ul class="space-y-2">
        <li>
          <router-link 
            to="/admin" 
            class="flex items-center px-4 py-3 rounded-lg hover:bg-purple-700 transition-colors" 
            active-class="bg-purple-800"
          >
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Dashboard
          </router-link>
        </li>
        <li>
          <router-link 
            to="/admin/invite-crew" 
            class="flex items-center px-4 py-3 rounded-lg hover:bg-purple-700 transition-colors" 
            active-class="bg-purple-800"
          >
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
            Invite Crew
          </router-link>
        </li>
        <li>
          <router-link 
            to="/admin/manage-crew" 
            class="flex items-center px-4 py-3 rounded-lg hover:bg-purple-700 transition-colors" 
            active-class="bg-purple-800"
          >
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Manage Crew
          </router-link>
        </li>
        <li>
          <router-link 
            to="/admin/schedule" 
            class="flex items-center px-4 py-3 rounded-lg hover:bg-purple-700 transition-colors" 
            active-class="bg-purple-800"
          >
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Create Schedule
          </router-link>
        </li>
        <li>
          <router-link 
            to="/admin/availability" 
            class="flex items-center px-4 py-3 rounded-lg hover:bg-purple-700 transition-colors" 
            active-class="bg-purple-800"
          >
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Manage Availability
          </router-link>
        </li>
        <li>
          <router-link 
            to="/admin/shift-approvals" 
            class="flex items-center px-4 py-3 rounded-lg hover:bg-purple-700 transition-colors" 
            active-class="bg-purple-800"
          >
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Shift Approvals
          </router-link>
        </li>
        <li>
          <router-link 
            to="/admin/reports" 
            class="flex items-center px-4 py-3 rounded-lg hover:bg-purple-700 transition-colors" 
            active-class="bg-purple-800"
          >
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Reports
          </router-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script>
export default {
  name: "AdminSidebar"
};
</script>

<style scoped>
/* Hide scrollbar for Chrome, Safari and Opera */
aside::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
aside {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>
