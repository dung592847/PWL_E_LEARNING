<template>
  <div class="lean-view">
    <header class="module-header">
      <div class="container">
        <div class="header-badge">Methoden-Modul 1</div>
        <h1>{{ content.title }}</h1>
        <p class="subtitle">{{ content.subtitle }}</p>
      </div>
    </header>

    <div class="container">
      <!-- Definition -->
      <section class="content-section definition-card">
        <div class="grid-2">
          <div>
            <h2>Was ist 5S?</h2>
            <p>{{ content.definition.text }}</p>
            <div class="meta-info">
              <div class="meta-item">
                <span class="label">Ursprung:</span>
                <span class="value">{{ content.definition.origin }}</span>
              </div>
              <div class="meta-item">
                <span class="label">Ziel:</span>
                <span class="value">{{ content.definition.goal }}</span>
              </div>
            </div>
          </div>
          <div class="visual-center">
            <div class="circle-chart">
              <div class="circle-text">5S</div>
              <div class="orbit-item item-1">Sortieren</div>
              <div class="orbit-item item-2">Systematisieren</div>
              <div class="orbit-item item-3">Säubern</div>
              <div class="orbit-item item-4">Standardisieren</div>
              <div class="orbit-item item-5">Selbstdisziplin</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Die 5 Schritte -->
      <section class="content-section">
        <h2 class="section-title">Die 5 Schritte im Detail</h2>
        <div class="steps-grid">
          <div 
            v-for="step in content.steps" 
            :key="step.id"
            class="step-card"
            :class="{ 'active': activeStep === step.id }"
            @mouseenter="activeStep = step.id"
          >
            <div class="step-header">
              <div class="step-number">{{ step.id }}S</div>
              <div class="step-titles">
                <h3>{{ step.german }}</h3>
                <span class="japanese">{{ step.japanese }}</span>
              </div>
            </div>
            <div class="step-content">
              <p>{{ step.description }}</p>
              <ul class="action-list">
                <li v-for="action in step.actions" :key="action">{{ action }}</li>
              </ul>
              <div class="example-box">
                <strong>Praxisbeispiel:</strong> {{ step.example }}
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Benefits -->
      <section class="content-section">
        <h2 class="section-title">Nutzen der Methode</h2>
        <div class="benefits-grid">
          <div v-for="benefit in content.benefits" :key="benefit.title" class="benefit-card">
            <div class="benefit-value">{{ benefit.value }}</div>
            <h4>{{ benefit.title }}</h4>
            <p>{{ benefit.description }}</p>
          </div>
        </div>
      </section>

      <!-- Arman Industries Application -->
      <section class="content-section application-section">
        <div class="card card-neon">
          <h2 class="text-neon">Anwendung bei Arman Industries</h2>
          <p class="situation">{{ content.armanApplication.situation }}</p>
          
          <div class="timeline">
            <div v-for="(phase, index) in content.armanApplication.implementation" :key="index" class="timeline-item">
              <div class="timeline-marker"></div>
              <div class="timeline-content">{{ phase }}</div>
            </div>
          </div>

          <div class="result-box">
            <strong>Ergebnisse:</strong>
            <ul>
              <li v-for="result in content.armanApplication.results" :key="result">{{ result }}</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Navigation -->
      <div class="module-nav">
        <router-link to="/" class="btn btn-secondary">← Zur Startseite</router-link>
        <router-link to="/quiz/lean" class="btn btn-primary">🎯 Wissen testen</router-link>
        <router-link to="/abc-xyz" class="btn btn-secondary">Nächstes Modul →</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import leanData from '../data/lean-management.json'

const content = ref(leanData)
const activeStep = ref(1)
</script>

<style scoped>
.module-header {
  background: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.9));
  padding: 60px 0;
  text-align: center;
  border-bottom: 1px solid var(--color-bg-hover);
}

.header-badge {
  display: inline-block; 
  color: var(--color-neon);
  border: 1px solid var(--color-neon);
  padding: 4px 12px;
  border-radius: 20px;
  margin-bottom: 15px;
  font-size: 0.8rem;
  text-transform: uppercase;
}

.subtitle { color: var(--color-text-secondary); font-size: 1.2rem; }
.content-section { margin: 60px 0; }
.section-title { font-size: 1.8rem; margin-bottom: 30px; }

/* Definition */
.definition-card {
  background-color: var(--color-bg-card);
  padding: 30px;
  border-radius: 12px;
  border-left: 4px solid var(--color-neon);
}

.meta-info { margin-top: 20px; display: flex; gap: 40px; }
.meta-item .label { display: block; font-size: 0.8rem; color: var(--color-text-secondary); }
.meta-item .value { font-weight: 600; color: var(--color-text-primary); }

/* Visual Circle */
.visual-center { display: flex; justify-content: center; align-items: center; min-height: 300px; }
.circle-chart {
  position: relative; width: 150px; height: 150px;
  background: var(--color-bg-hover); border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  border: 2px solid var(--color-neon);
  box-shadow: 0 0 20px rgba(57, 255, 20, 0.2);
}
.circle-text { font-size: 2rem; font-weight: bold; color: var(--color-neon); }
.orbit-item {
  position: absolute; font-size: 0.8rem; font-weight: 500;
  color: var(--color-text-secondary); background: var(--color-bg-body);
  padding: 5px 10px; border-radius: 4px; border: 1px solid var(--color-bg-hover);
  white-space: nowrap;
}
.item-1 { top: -40px; }
.item-2 { top: 20px; right: -90px; }
.item-3 { bottom: 0px; right: -70px; }
.item-4 { bottom: 0px; left: -80px; }
.item-5 { top: 20px; left: -90px; }

/* Steps Grid */
.steps-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
.step-card {
  background-color: var(--color-bg-card); border: 1px solid var(--color-bg-hover);
  border-radius: 12px; padding: 25px; transition: all 0.2s;
}
.step-card.active { border-color: var(--color-neon); transform: translateY(-5px); }
.step-header { display: flex; align-items: center; gap: 15px; margin-bottom: 15px; }
.step-number {
  font-size: 1.5rem; font-weight: 800; color: var(--color-bg-body);
  background-color: var(--color-neon); width: 50px; height: 50px;
  display: flex; align-items: center; justify-content: center; border-radius: 50%;
}
.step-titles h3 { margin: 0; font-size: 1.1rem; }
.japanese { font-size: 0.9rem; color: var(--color-text-secondary); font-style: italic; }
.action-list { padding-left: 20px; margin: 15px 0; color: var(--color-text-secondary); }
.example-box {
  background-color: rgba(57, 255, 20, 0.1); padding: 15px;
  border-radius: 6px; font-size: 0.9rem; border-left: 2px solid var(--color-neon);
}

/* Benefits */
.benefits-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; }
.benefit-card { text-align: center; padding: 25px; background: var(--color-bg-card); border-radius: 12px; }
.benefit-value { font-size: 2rem; font-weight: bold; color: var(--color-neon); margin-bottom: 5px; }

/* Application */
.application-section .card { padding: 30px; }
.card-neon { border: 1px solid var(--color-neon); }
.situation { font-size: 1.1rem; margin-bottom: 20px; }
.timeline { margin: 20px 0; border-left: 2px solid var(--color-bg-hover); padding-left: 25px; }
.timeline-item { position: relative; margin-bottom: 15px; color: var(--color-text-secondary); }
.timeline-marker {
  position: absolute; left: -31px; top: 6px; width: 12px; height: 12px;
  background-color: var(--color-neon); border-radius: 50%; box-shadow: 0 0 5px var(--color-neon);
}
.result-box { background: rgba(57, 255, 20, 0.1); padding: 20px; border-radius: 8px; margin-top: 20px; }
.result-box ul { margin: 10px 0 0 20px; color: var(--color-neon); }

/* Module Nav */
.module-nav {
  display: flex; justify-content: space-between; margin-top: 60px;
  padding-top: 20px; border-top: 1px solid var(--color-bg-hover);
}

@media (max-width: 768px) {
  .benefits-grid { grid-template-columns: repeat(2, 1fr); }
  .grid-2 { grid-template-columns: 1fr; }
}
</style>
