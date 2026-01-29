<template>
  <div class="conflict-view">
    <header class="module-header">
      <div class="container">
        <div class="header-badge">Strategie-Modul</div>
        <h1>{{ content.title }}</h1>
        <p class="subtitle">{{ content.subtitle }}</p>
      </div>
    </header>

    <div class="container">
      <!-- Intro -->
      <section class="content-section">
        <p class="intro-text">{{ content.definition.text }}</p>
      </section>

      <!-- The Conflict Visual -->
      <section class="content-section">
        <h2 class="section-title text-center">Das Dilemma</h2>
        <div class="conflict-scale">
          <!-- Left Side -->
          <div class="scale-side left">
            <div class="icon-big">{{ content.conflict.goal1.icon }}</div>
            <h3>{{ content.conflict.goal1.name }}</h3>
            <p>{{ content.conflict.goal1.description }}</p>
            <ul class="benefit-list">
              <li v-for="benefit in content.conflict.goal1.benefits" :key="benefit">✓ {{ benefit }}</li>
            </ul>
            <ul class="danger-list">
              <li v-for="risk in content.conflict.goal1.risks" :key="risk">⚠️ {{ risk }}</li>
            </ul>
          </div>

          <!-- Center Pivot -->
          <div class="scale-pivot">
            <div class="vs-badge">VS</div>
          </div>

          <!-- Right Side -->
          <div class="scale-side right">
            <div class="icon-big">{{ content.conflict.goal2.icon }}</div>
            <h3>{{ content.conflict.goal2.name }}</h3>
            <p>{{ content.conflict.goal2.description }}</p>
            <ul class="benefit-list">
              <li v-for="benefit in content.conflict.goal2.benefits" :key="benefit">✓ {{ benefit }}</li>
            </ul>
            <ul class="danger-list">
              <li v-for="risk in content.conflict.goal2.risks" :key="risk">⚠️ {{ risk }}</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Optimization -->
      <section class="content-section">
        <h2>{{ content.optimization.title }}</h2>
        <div class="card">
          <p>{{ content.optimization.description }}</p>
          <div class="formula-box">
            <code>{{ content.optimization.formula }}</code>
          </div>
          <div class="variables-grid">
            <div v-for="v in content.optimization.variables" :key="v.symbol" class="var-item">
              <span class="var-symbol">{{ v.symbol }}</span>
              <span class="var-name">{{ v.name }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Connection to Methods -->
      <section class="content-section">
        <h2>{{ content.methodConnections.title }}</h2>
        <div class="grid-3">
          <div v-for="conn in content.methodConnections.connections" :key="conn.method" class="card">
            <h3 class="text-neon">{{ conn.method }}</h3>
            <p class="contribution">{{ conn.contribution }}</p>
            <ul class="detail-list">
              <li v-for="d in conn.details" :key="d">{{ d }}</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Quiz Hints: kurz sichtbare Fakten zum Beantworten der Quizfragen -->
      <section class="content-section">
        <h2>Kurzinfo zum Quiz</h2>
        <div class="quiz-hints grid-3">
          <div class="card">
            <h3>Rüstkosten &amp; Losgröße</h3>
            <p>Rüstkosten pro Auftrag sind unabhängig von der Losgröße, werden aber pro Stück kleiner, wenn die Losgröße steigt (Degressionseffekt). Die Andler-Formel (EOQ) zeigt die optimale Losgröße.</p>
          </div>

          <div class="card">
            <h3>Just-in-Time (JIT)</h3>
            <p>JIT zielt auf minimale Bestände durch bedarfsnahe Anlieferung; dadurch sinken Lagerkosten, aber das Risiko von Lieferengpässen und einer schlechteren Lieferfähigkeit bei Störungen steigt.</p>
          </div>

          <div class="card">
            <h3>Dezentralisierung</h3>
            <p>Dezentralisierung kann lokale Servicelevels verbessern, führt aber häufig zu höheren Gesamtbeständen, da an mehreren Standorten Sicherheitsbestände vorgehalten werden.</p>
          </div>
        </div>
      </section>

      <!-- Arman Industries Solution -->
      <section class="content-section">
        <h2>{{ content.armanCase.title }}</h2>
        <div class="card card-neon">
          <p class="situation">{{ content.armanCase.situation }}</p>
          
          <div class="options-container">
            <div 
              v-for="opt in content.armanCase.analysis.options" 
              :key="opt.name" 
              class="option-card"
              :class="{ 'selected': opt.name.includes('gewählt') }"
            >
              <h4>{{ opt.name }}</h4>
              <div class="opt-stat">Lieferrate: {{ opt.expectedDeliveryRate }}</div>
              <div class="opt-stat">Bestandswert: {{ opt.inventoryValue }}</div>
              <p v-if="opt.risk" class="text-error">{{ opt.risk }}</p>
              <p v-if="opt.savingsPerYear" class="text-success">{{ opt.savingsPerYear }}</p>
            </div>
          </div>

          <div class="solution-box">
            <h3>Die Lösung: {{ content.armanCase.solution.approach }}</h3>
            <ul>
              <li v-for="action in content.armanCase.solution.actions" :key="action">{{ action }}</li>
            </ul>
            <p class="result">{{ content.armanCase.solution.result }}</p>
          </div>
        </div>
      </section>

      <!-- Navigation -->
      <div class="module-nav">
        <router-link to="/matrix" class="btn btn-secondary">← Zurück</router-link>
        <router-link to="/quiz/conflict" class="btn btn-primary">🎯 Wissen testen</router-link>
        <router-link to="/" class="btn btn-secondary">Zur Startseite</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import conflictData from '../data/conflict.json'

const content = ref(conflictData)
</script>

<style scoped>
.module-header {
  background: var(--module-header-bg);
  padding: 60px 0; text-align: center;
  border-bottom: 1px solid var(--color-bg-hover);
}
.header-badge {
  display: inline-block; color: #ff9500;
  border: 1px solid #ff9500; padding: 4px 12px;
  border-radius: 20px; margin-bottom: 15px;
  font-size: 0.8rem; text-transform: uppercase;
}
.subtitle { color: var(--color-text-secondary); }
.content-section { margin: 60px 0; }
.section-title { font-size: 1.8rem; margin-bottom: 30px; }
.text-center { text-align: center; }
.intro-text { font-size: 1.2rem; text-align: center; max-width: 800px; margin: 0 auto; }

/* Scale Visual */
.conflict-scale {
  display: flex; align-items: flex-start; justify-content: space-between;
  position: relative; margin-top: 40px;
  background: radial-gradient(circle at center, rgba(57,255,20,0.05) 0%, transparent 70%);
}
.scale-side {
  width: 42%; background: var(--color-bg-card);
  padding: 30px; border-radius: 12px; text-align: center;
}
.left { border: 1px solid var(--color-blue); }
.right { border: 1px solid #ff9500; }
.icon-big { font-size: 3rem; margin-bottom: 10px; }

.scale-pivot {
  position: absolute; left: 50%; top: 50%;
  transform: translate(-50%, -50%);
  display: flex; flex-direction: column; align-items: center;
}
.vs-badge {
  background: var(--color-bg-body); border: 2px solid var(--color-text-primary);
  width: 50px; height: 50px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-weight: bold; font-style: italic; z-index: 2;
}

.benefit-list { list-style: none; padding: 0; text-align: left; margin-top: 15px; font-size: 0.9rem; color: var(--color-neon); }
.danger-list { list-style: none; padding: 0; text-align: left; margin-top: 10px; font-size: 0.9rem; color: #ff9999; }

/* Formula */
.formula-box {
  background: var(--color-bg-hover); padding: 20px; text-align: center;
  border-radius: 8px; margin: 20px 0; font-size: 1.3rem;
}
.variables-grid { display: flex; gap: 30px; justify-content: center; margin-top: 15px; }
.var-item { display: flex; align-items: center; gap: 10px; }
.var-symbol { font-weight: bold; color: var(--color-neon); background: rgba(57,255,20,0.1); padding: 5px 10px; border-radius: 4px; }
.var-name { color: var(--color-text-secondary); }

/* Connection Cards */
.contribution { font-style: italic; color: var(--color-text-primary); margin-bottom: 10px; }
.detail-list { padding-left: 20px; color: var(--color-text-secondary); font-size: 0.9rem; }

/* Options */
.card-neon { border: none; }
.situation { font-size: 1.1rem; margin-bottom: 20px; }
.options-container { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-top: 20px; }
.option-card {
  background: rgba(0,0,0,0.3); padding: 15px; border-radius: 8px;
  border: 1px solid transparent;
}
.option-card.selected { border-color: var(--color-neon); background: rgba(57, 255, 20, 0.1); }
.opt-stat { font-size: 0.9rem; color: var(--color-text-secondary); margin: 5px 0; }
.text-error { color: #ff6b6b; font-size: 0.85rem; }
.text-success { color: var(--color-neon); font-size: 0.85rem; font-weight: bold; }

.solution-box {
  background: var(--color-bg-hover); padding: 20px; border-radius: 8px;
  margin-top: 30px; text-align: center;
}
.solution-box ul { text-align: left; max-width: 500px; margin: 15px auto; padding-left: 20px; color: var(--color-text-secondary); }
.result { font-size: 1.2rem; font-weight: bold; color: var(--color-neon); margin-top: 15px; }

.text-neon { color: var(--color-neon); }

.module-nav {
  display: flex; justify-content: space-between; margin-top: 60px;
  padding-top: 20px; border-top: 1px solid var(--color-bg-hover);
}

/* Ensure grid gaps and card paddings apply reliably and headings don't sit on the border */
.grid-3 { gap: var(--spacing-lg); }
.grid-3 .card { padding: var(--spacing-lg); }
.grid-3 .card h3,
.card-neon h3,
.option-card h4,
.solution-box h3 {
  margin-top: 0.4rem;
  margin-bottom: 0.8rem;
}

@media (max-width: 768px) {
  .module-header {
    padding: 40px 0;
  }
  
  .module-header h1 {
    font-size: 1.8rem;
  }
  
  .content-section {
    margin: 40px 0;
  }
  
  .section-title {
    font-size: 1.5rem;
    margin-bottom: 20px;
  }
  
  .intro-text {
    font-size: 1rem;
    padding: 0 10px;
  }
  
  .conflict-scale {
    flex-direction: column;
    align-items: center;
    gap: 20px;
    margin-top: 20px;
  }
  
  .scale-side {
    width: 100%;
    padding: 20px;
  }
  
  .scale-pivot {
    position: relative;
    left: auto;
    top: auto;
    transform: none;
    order: -1;
  }
  
  .icon-big {
    font-size: 2.5rem;
  }
  
  .formula-box {
    font-size: 1rem;
    padding: 15px;
    overflow-x: auto;
  }
  
  .formula-box code {
    font-size: 0.85rem;
    word-break: break-all;
  }
  
  .variables-grid {
    flex-wrap: wrap;
    gap: 15px;
  }
  
  .options-container {
    grid-template-columns: 1fr;
    gap: 10px;
  }
  
  .option-card {
    padding: 15px;
  }
  
  .solution-box {
    padding: 15px;
  }
  
  .solution-box ul {
    padding-left: 15px;
  }
  
  .module-nav {
    flex-direction: column;
    gap: 10px;
  }
  
  .module-nav .btn {
    width: 100%;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .module-header {
    padding: 30px 0;
  }
  
  .module-header h1 {
    font-size: 1.5rem;
  }
  
  .header-badge {
    font-size: 0.7rem;
    padding: 3px 10px;
  }
  
  .scale-side {
    padding: 15px;
  }
  
  .scale-side h3 {
    font-size: 1.1rem;
  }
  
  .scale-side p {
    font-size: 0.9rem;
  }
  
  .benefit-list,
  .danger-list {
    font-size: 0.85rem;
  }
  
  .vs-badge {
    width: 40px;
    height: 40px;
    font-size: 0.9rem;
  }
  
  .card {
    padding: 15px;
  }
  
  .result {
    font-size: 1rem;
  }
}
</style>
