<template>
  <nav class="navbar">
    <div class="container nav-content">
      <router-link to="/" class="brand">
        <span class="brand-text">PWL<span class="neon-dot">.</span>Learning</span>
      </router-link>
      
      <div class="nav-links">
        <router-link to="/arman-industries">Arman Industries</router-link>
        <router-link to="/lean">Lean</router-link>
        <router-link to="/abc-xyz">ABC/XYZ</router-link>
        <router-link to="/matrix">Matrix</router-link>
        <router-link to="/conflict">Konflikte</router-link>
        <router-link to="/quiz" class="nav-btn">Quiz</router-link>
      </div>

      <div class="nav-actions">
        <button class="theme-toggle" @click="toggleTheme" :title="isDark ? 'Light Mode' : 'Dark Mode'">
          <span v-if="isDark">☀️</span>
          <span v-else>🌙</span>
        </button>
        <router-link to="/company" class="about-link">Über uns</router-link>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isDark = ref(true)

const toggleTheme = () => {
  isDark.value = !isDark.value
  document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : 'light')
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme) {
    isDark.value = savedTheme === 'dark'
    document.documentElement.setAttribute('data-theme', savedTheme)
  }
})
</script>

<style scoped>
.navbar {
  background: var(--navbar-bg);
  border-bottom: 1px solid var(--color-bg-hover);
  position: sticky; top: 0; z-index: 100;
  padding: 15px 0;
  backdrop-filter: blur(10px);
  transition: background-color 0.3s ease;
}

.nav-content {
  display: flex; justify-content: space-between; align-items: center;
}

.brand { font-size: 1.5rem; font-weight: 800; letter-spacing: -1px; }
  .brand-text { color: var(--color-text-primary); }
.neon-dot { color: var(--color-neon); }

.nav-links { display: flex; gap: 30px; align-items: center; }
.nav-links a {
  font-weight: 500; color: var(--color-text-secondary);
  transition: color 0.2s; font-size: 0.95rem;
}
.nav-links a:hover, .nav-links a.router-link-active { color: var(--color-neon); }

.nav-btn {
  background: rgba(57, 255, 20, 0.1);
  color: var(--color-neon) !important;
  padding: 6px 16px; border-radius: 20px;
  border: 1px solid var(--color-neon);
}
.nav-btn:hover { background: var(--color-neon); color: black !important; }

.about-link { font-size: 0.9rem; color: var(--color-text-secondary); opacity: 0.7; }

.nav-actions {
  display: flex;
  align-items: center;
  gap: 15px;
}

.theme-toggle {
  background: var(--color-bg-hover);
  border: 1px solid var(--color-bg-hover);
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1.1rem;
}

.theme-toggle:hover {
  border-color: var(--color-neon);
  transform: scale(1.1);
}

/* Mobile Menu Button */
.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  color: var(--color-text-primary);
  font-size: 1.5rem;
  cursor: pointer;
  padding: 5px;
}

@media (max-width: 900px) {
  .nav-links { gap: 15px; }
  .nav-links a { font-size: 0.85rem; }
  .about-link { display: none; }
}

@media (max-width: 768px) {
  .navbar {
    padding: 12px 0;
  }
  
  .nav-content {
    flex-wrap: wrap;
  }
  
  .brand {
    font-size: 1.3rem;
  }
  
  .nav-links {
    order: 3;
    width: 100%;
    justify-content: center;
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid var(--color-bg-hover);
    gap: 8px;
    flex-wrap: wrap;
  }
  
  .nav-links a {
    font-size: 0.8rem;
    padding: 5px 8px;
  }
  
  .nav-btn {
    padding: 5px 12px !important;
    font-size: 0.8rem !important;
  }
  
  .about-link { display: none; }
}

@media (max-width: 480px) {
  .brand {
    font-size: 1.1rem;
  }
  
  .nav-links {
    gap: 5px;
  }
  
  .nav-links a {
    font-size: 0.75rem;
    padding: 4px 6px;
  }
}
</style>
