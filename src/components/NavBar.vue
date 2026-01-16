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

      <router-link to="/company" class="about-link">Über uns</router-link>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  background: rgba(18, 18, 18, 0.95);
  border-bottom: 1px solid var(--color-bg-hover);
  position: sticky; top: 0; z-index: 100;
  padding: 15px 0;
  backdrop-filter: blur(10px);
}

.nav-content {
  display: flex; justify-content: space-between; align-items: center;
}

.brand { font-size: 1.5rem; font-weight: 800; letter-spacing: -1px; }
.brand-text { color: white; }
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

@media (max-width: 768px) {
  .nav-links { gap: 15px; }
  .about-link { display: none; }
}
</style>
