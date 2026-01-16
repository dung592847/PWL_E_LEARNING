<template>
  <footer class="footer">
    <div class="container footer-content">
      <div class="footer-left">
        <p>&copy; 2026 PWL E-Learning. Belegarbeit Produktionswirtschaft.</p>
        <p class="names">D. L.</p>
      </div>
      <div class="footer-links">
        <router-link to="/company">Impressum</router-link>
        <router-link to="/">Home</router-link>
      </div>
    </div>
  </footer >
</template>

<style scoped>
.footer {
  border-top: 1px solid var(--color-bg-hover);
  padding: 40px 0;
  margin-top: 80px;
  background: #0a0a0a;
}
.footer-content {
  display: flex; justify-content: space-between; align-items: center;
  color: var(--color-text-secondary); font-size: 0.9rem;
}
.names { margin-top: 5px; opacity: 0.6; }
.footer-links { display: flex; gap: 20px; }
.footer-links a:hover { color: var(--color-neon); }
</style>
