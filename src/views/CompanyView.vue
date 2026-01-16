<template>
  <div class="company-view container">
    <header class="page-header">
      <h1>Über uns & Impressum</h1>
    </header>

    <section class="content-section">
      <div class="card">
        <h2>Das Projekt</h2>
        <p>Diese E-Learning Plattform entstand im Rahmen der Belegarbeit für das Modul <strong>Produktionswirtschaft und Logistik (PWL)</strong> an der HTW.</p>
        <p><strong>Semester:</strong> 5. Semester</p>
        <p><strong>Team:</strong></p>
        <ul>
          <li>D. L.</li>
        </ul>
      </div>
      
      <div class="card mt-md">
        <h2>Technische Umsetzung</h2>
        <p>Entwickelt als Single Page Application (SPA) mit folgenden Technologien:</p>
        <ul className="tech-list">
          <li>Vue.js 3 (Composition API)</li>
          <li>Vite Build Tool</li>
          <li>Vue Router</li>
          <li>CSS3 Variables & Grid (Neon Dark Mode)</li>
        </ul>
      </div>
    </section>
  </div>
</template>

<style scoped>
.page-header { padding: 60px 0 40px; text-align: center; }
.content-section { max-width: 800px; margin: 0 auto; }
.tech-list { margin-top: 10px; padding-left: 20px; list-style: disc; color: var(--color-text-secondary); }
</style>
