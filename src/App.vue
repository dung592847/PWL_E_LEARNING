<script setup>
import NavBar from './components/NavBar.vue'
import FooterComponent from './components/FooterComponent.vue'
</script>

<template>
  <div class="app-layout">
    <NavBar />
    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <FooterComponent />
  </div>
</template>

<style>
/* Global Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.main-content {
  flex: 1;
}
</style>
