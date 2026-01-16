<template>
  <div class="home-view">
    <section class="hero">
      <div class="container">
        <h1 class="hero-title">Produktionswirtschaft <span class="neon-text">Erleben</span></h1>
        <p class="hero-sub">Interaktive Lernmodule für das 5. Semester</p>
        <router-link to="/lean" class="btn btn-primary mt-md">Jetzt starten</router-link>
      </div>
    </section>

    <section class="modules-grid container">
      <router-link to="/lean" class="module-card">
        <div class="card-icon">🔧</div>
        <h3>Lean Management</h3>
        <p>5S, Verschwendungsarten und effiziente Prozesse.</p>
      </router-link>

      <router-link to="/abc-xyz" class="module-card">
        <div class="card-icon">📊</div>
        <h3>ABC/XYZ Analyse</h3>
        <p>Materialklassifizierung und Beschaffungsstrategien.</p>
      </router-link>

      <router-link to="/matrix" class="module-card">
        <div class="card-icon">🔢</div>
        <h3>Matrix-Minimum</h3>
        <p>Transportoptimierung mit interaktiver Simulation.</p>
      </router-link>

      <router-link to="/conflict" class="module-card">
        <div class="card-icon">⚖️</div>
        <h3>Zielkonflikte</h3>
        <p>Losgröße vs. Bestand - Finde die Balance.</p>
      </router-link>
      
       <router-link to="/quiz" class="module-card quiz-card-home">
        <div class="card-icon">🏆</div>
        <h3>Wissenstest</h3>
        <p>Prüfe dein Wissen in allen Kategorien.</p>
      </router-link>
    </section>
  </div>
</template>

<style scoped>
.hero {
  text-align: center;
  padding: 100px 0;
  background: radial-gradient(circle at center, rgba(57, 255, 20, 0.1) 0%, rgba(18,18,18,0) 70%);
}
.hero-title { font-size: 4rem; line-height: 1.1; margin-bottom: 20px; }
.neon-text { color: var(--color-neon); text-shadow: 0 0 20px var(--color-neon-dim); }
.hero-sub { font-size: 1.5rem; color: var(--color-text-secondary); max-width: 600px; margin: 0 auto; }

.modules-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  margin-top: -50px;
  padding-bottom: 80px;
}

.module-card {
  background: var(--color-bg-card);
  padding: 30px;
  border-radius: 12px;
  border: 1px solid var(--color-bg-hover);
  transition: all 0.3s ease;
  display: block;
}
.module-card:hover {
  transform: translateY(-10px);
  border-color: var(--color-neon);
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
}

.card-icon { font-size: 3rem; margin-bottom: 20px; }
.module-card h3 { color: var(--color-text-primary); margin-bottom: 10px; }
.module-card p { color: var(--color-text-secondary); font-size: 0.95rem; }

.quiz-card-home { border-color: var(--color-neon-dim); }

/* Responsive Styles */
@media (max-width: 768px) {
  .hero {
    padding: 60px 0;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-sub {
    font-size: 1.1rem;
    padding: 0 20px;
  }
  
  .modules-grid {
    margin-top: -30px;
    gap: 20px;
    padding-bottom: 50px;
  }
  
  .module-card {
    padding: 25px;
  }
  
  .card-icon {
    font-size: 2.5rem;
    margin-bottom: 15px;
  }
}

@media (max-width: 480px) {
  .hero {
    padding: 40px 0;
  }
  
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-sub {
    font-size: 1rem;
  }
  
  .modules-grid {
    margin-top: -20px;
    gap: 15px;
  }
  
  .module-card {
    padding: 20px;
  }
  
  .module-card h3 {
    font-size: 1.1rem;
  }
  
  .module-card p {
    font-size: 0.9rem;
  }
  
  .card-icon {
    font-size: 2rem;
    margin-bottom: 10px;
  }
}
</style>
