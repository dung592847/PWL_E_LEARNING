<template>
  <div class="matrix-view">
    <header class="module-header">
      <div class="container">
        <div class="header-badge">Methoden-Modul 3</div>
        <h1>{{ content.title }}</h1>
        <p class="subtitle">{{ content.subtitle }}</p>
      </div>
    </header>

    <div class="container">
      <!-- Definition -->
      <section class="content-section">
        <h2>Das Verfahren</h2>
        <div class="card bg-code">
          <p>{{ content.definition.text }}</p>
          <div class="def-grid">
            <div class="def-item">
              <strong>Ziel:</strong> {{ content.definition.goal }}
            </div>
            <div class="def-item">
              <strong>Typ:</strong> {{ content.definition.type }}
            </div>
          </div>
        </div>
      </section>

      <!-- Algorithmus Steps -->
      <section class="content-section">
        <h2 class="section-title">Der Algorithmus</h2>
        <div class="algo-steps">
          <div v-for="step in content.algorithm.steps" :key="step.step" class="algo-card">
            <div class="algo-num">{{ step.step }}</div>
            <div class="algo-content">
              <h3>{{ step.title }}</h3>
              <p>{{ step.description }}</p>
              <div class="algo-note" v-if="step.note">💡 {{ step.note }}</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Interaktives Beispiel -->
      <section class="content-section">
        <h2 class="section-title">Arman Industries Fallbeispiel - Schritt für Schritt</h2>
        <p class="mb-lg">{{ content.armanExample.scenario }}</p>
        
        <div class="simulation-container">
          <!-- Control Bar -->
          <div class="sim-controls">
            <button class="btn btn-secondary" @click="prevStep" :disabled="currentStepIndex === 0">← Zurück</button>
            <div class="sim-status">
              <span class="step-counter">Schritt {{ currentStepIndex }} / {{ content.armanExample.solutionSteps.length }}</span>
              <span class="step-desc" v-if="currentStepData">{{ currentStepData.action }}</span>
              <span class="step-desc" v-else>Startsituation</span>
            </div>
            <button class="btn btn-primary" @click="nextStep" :disabled="currentStepIndex === content.armanExample.solutionSteps.length">Weiter →</button>
          </div>

          <!-- Cost Matrix Visual -->
          <div class="matrix-visual">
            <table class="cost-table">
              <thead>
                <tr>
                  <th>Quelle \ Ziel</th>
                  <th :class="{ 'col-crossed': isColCrossed('K1') }">K1 (100)</th>
                  <th :class="{ 'col-crossed': isColCrossed('K2') }">K2 (150)</th>
                  <th :class="{ 'col-crossed': isColCrossed('K3') }">K3 (120)</th>
                  <th :class="{ 'col-crossed': isColCrossed('K4') }">K4 (130)</th>
                  <th>Angebot</th>
                </tr>
              </thead>
              <tbody>
                <tr :class="{ 'row-crossed': isRowCrossed('F1') }">
                  <td><strong>F1</strong></td>
                  <td :class="getCellClass('F1', 'K1')">12 <div class="alloc" v-if="getAlloc('F1', 'K1')">{{ getAlloc('F1', 'K1') }}</div></td>
                  <td :class="getCellClass('F1', 'K2')">8 <div class="alloc" v-if="getAlloc('F1', 'K2')">{{ getAlloc('F1', 'K2') }}</div></td>
                  <td :class="getCellClass('F1', 'K3')">14 <div class="alloc" v-if="getAlloc('F1', 'K3')">{{ getAlloc('F1', 'K3') }}</div></td>
                  <td :class="getCellClass('F1', 'K4')">10 <div class="alloc" v-if="getAlloc('F1', 'K4')">{{ getAlloc('F1', 'K4') }}</div></td>
                  <td :class="{ 'supply-zero': isRowCrossed('F1') }">{{ getSupply('F1') }}</td>
                </tr>
                <tr :class="{ 'row-crossed': isRowCrossed('F2') }">
                  <td><strong>F2</strong></td>
                  <td :class="getCellClass('F2', 'K1')">15 <div class="alloc" v-if="getAlloc('F2', 'K1')">{{ getAlloc('F2', 'K1') }}</div></td>
                  <td :class="getCellClass('F2', 'K2')">6 <div class="alloc" v-if="getAlloc('F2', 'K2')">{{ getAlloc('F2', 'K2') }}</div></td>
                  <td :class="getCellClass('F2', 'K3')">11 <div class="alloc" v-if="getAlloc('F2', 'K3')">{{ getAlloc('F2', 'K3') }}</div></td>
                  <td :class="getCellClass('F2', 'K4')">13 <div class="alloc" v-if="getAlloc('F2', 'K4')">{{ getAlloc('F2', 'K4') }}</div></td>
                  <td :class="{ 'supply-zero': isRowCrossed('F2') }">{{ getSupply('F2') }}</td>
                </tr>
                <tr :class="{ 'row-crossed': isRowCrossed('F3') }">
                  <td><strong>F3</strong></td>
                  <td :class="getCellClass('F3', 'K1')">10 <div class="alloc" v-if="getAlloc('F3', 'K1')">{{ getAlloc('F3', 'K1') }}</div></td>
                  <td :class="getCellClass('F3', 'K2')">9 <div class="alloc" v-if="getAlloc('F3', 'K2')">{{ getAlloc('F3', 'K2') }}</div></td>
                  <td :class="getCellClass('F3', 'K3')">7 <div class="alloc" v-if="getAlloc('F3', 'K3')">{{ getAlloc('F3', 'K3') }}</div></td>
                  <td :class="getCellClass('F3', 'K4')">12 <div class="alloc" v-if="getAlloc('F3', 'K4')">{{ getAlloc('F3', 'K4') }}</div></td>
                  <td :class="{ 'supply-zero': isRowCrossed('F3') }">{{ getSupply('F3') }}</td>
                </tr>
                <tr class="demand-row">
                  <td><strong>Nachfrage</strong></td>
                  <td :class="{ 'demand-zero': isColCrossed('K1') }">{{ getDemand('K1') }}</td>
                  <td :class="{ 'demand-zero': isColCrossed('K2') }">{{ getDemand('K2') }}</td>
                  <td :class="{ 'demand-zero': isColCrossed('K3') }">{{ getDemand('K3') }}</td>
                  <td :class="{ 'demand-zero': isColCrossed('K4') }">{{ getDemand('K4') }}</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div class="result-display" v-if="currentStepIndex === content.armanExample.solutionSteps.length">
            <div class="total-cost">Gesamtkosten: {{ content.armanExample.totalCost }}</div>
            <div class="comparison">
              <span>Nordwestecken: {{ content.armanExample.comparison.nordwestecke }}</span>
              <span class="text-neon">Einsparung: {{ content.armanExample.comparison.savings }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Übungsaufgabe -->
      <section class="content-section">
        <h2 class="section-title">📝 Übungsaufgabe</h2>
        <p class="mb-lg">Lösen Sie das folgende Transportproblem mit der Matrix-Minimum-Methode. Tragen Sie die optimalen Transportmengen in die Felder ein.</p>
        
        <div class="exercise-container">
          <div class="exercise-info">
            <p><strong>Aufgabe:</strong> Ein Unternehmen hat 2 Lager (L1, L2) und beliefert 3 Kunden (K1, K2, K3). Finden Sie die kostenminimale Verteilung.</p>
          </div>
          
          <table class="exercise-table">
            <thead>
              <tr>
                <th>Lager \ Kunde</th>
                <th>K1<br><small>(Bedarf: 40)</small></th>
                <th>K2<br><small>(Bedarf: 50)</small></th>
                <th>K3<br><small>(Bedarf: 30)</small></th>
                <th>Angebot</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>L1</strong></td>
                <td class="exercise-cell">
                  <span class="cost">8€</span>
                  <input type="text" inputmode="numeric" v-model="exerciseInputs['L1-K1']" @input="onlyNumbers($event, 'L1-K1')" :class="{ 'correct': exerciseChecked && isExerciseCorrect('L1-K1'), 'incorrect': exerciseChecked && !isExerciseCorrect('L1-K1') && exerciseInputs['L1-K1'] > 0 }" placeholder="-">
                </td>
                <td class="exercise-cell">
                  <span class="cost">6€</span>
                  <input type="text" inputmode="numeric" v-model="exerciseInputs['L1-K2']" @input="onlyNumbers($event, 'L1-K2')" :class="{ 'correct': exerciseChecked && isExerciseCorrect('L1-K2'), 'incorrect': exerciseChecked && !isExerciseCorrect('L1-K2') && exerciseInputs['L1-K2'] > 0 }" placeholder="-">
                </td>
                <td class="exercise-cell">
                  <span class="cost">10€</span>
                  <input type="text" inputmode="numeric" v-model="exerciseInputs['L1-K3']" @input="onlyNumbers($event, 'L1-K3')" :class="{ 'correct': exerciseChecked && isExerciseCorrect('L1-K3'), 'incorrect': exerciseChecked && !isExerciseCorrect('L1-K3') && exerciseInputs['L1-K3'] > 0 }" placeholder="-">
                </td>
                <td class="supply">60</td>
              </tr>
              <tr>
                <td><strong>L2</strong></td>
                <td class="exercise-cell">
                  <span class="cost">9€</span>
                  <input type="text" inputmode="numeric" v-model="exerciseInputs['L2-K1']" @input="onlyNumbers($event, 'L2-K1')" :class="{ 'correct': exerciseChecked && isExerciseCorrect('L2-K1'), 'incorrect': exerciseChecked && !isExerciseCorrect('L2-K1') && exerciseInputs['L2-K1'] > 0 }" placeholder="-">
                </td>
                <td class="exercise-cell">
                  <span class="cost">5€</span>
                  <input type="text" inputmode="numeric" v-model="exerciseInputs['L2-K2']" @input="onlyNumbers($event, 'L2-K2')" :class="{ 'correct': exerciseChecked && isExerciseCorrect('L2-K2'), 'incorrect': exerciseChecked && !isExerciseCorrect('L2-K2') && exerciseInputs['L2-K2'] > 0 }" placeholder="-">
                </td>
                <td class="exercise-cell">
                  <span class="cost">7€</span>
                  <input type="text" inputmode="numeric" v-model="exerciseInputs['L2-K3']" @input="onlyNumbers($event, 'L2-K3')" :class="{ 'correct': exerciseChecked && isExerciseCorrect('L2-K3'), 'incorrect': exerciseChecked && !isExerciseCorrect('L2-K3') && exerciseInputs['L2-K3'] > 0 }" placeholder="-">
                </td>
                <td class="supply">60</td>
              </tr>
              <tr class="demand-row">
                <td><strong>Nachfrage</strong></td>
                <td>40</td>
                <td>50</td>
                <td>30</td>
                <td></td>
              </tr>
            </tbody>
          </table>
          
          <div class="exercise-actions">
            <button class="btn btn-primary" @click="checkExercise">✓ Überprüfen</button>
            <button class="btn btn-secondary" @click="resetExercise">↺ Zurücksetzen</button>
            <button class="btn btn-secondary" @click="showExerciseSolution = !showExerciseSolution">{{ showExerciseSolution ? 'Lösung ausblenden' : 'Lösung anzeigen' }}</button>
          </div>
          
          <div v-if="exerciseChecked" class="exercise-result" :class="{ 'success': exerciseScore === 100, 'partial': exerciseScore > 0 && exerciseScore < 100 }">
            <div v-if="exerciseScore === 100">
              <span class="result-icon">🎉</span>
              <strong>Perfekt!</strong> Alle Zuweisungen sind korrekt. Gesamtkosten: <span class="text-neon">{{ calculateExerciseCost() }}€</span>
            </div>
            <div v-else>
              <span class="result-icon">{{ exerciseScore > 50 ? '🤔' : '❌' }}</span>
              <strong>{{ exerciseScore > 50 ? 'Fast richtig!' : 'Nicht ganz...' }}</strong> {{ exerciseScore }}% korrekt. Prüfe die Kapazitäten und Kosten.
            </div>
          </div>
          
          <div v-if="showExerciseSolution" class="solution-box">
            <h4>💡 Lösung (Matrix-Minimum-Methode):</h4>
            <ol>
              <li><strong>Minimum: L2-K2 (5€)</strong> → 50 Einheiten (K2 erfüllt)</li>
              <li><strong>Minimum: L1-K2 (6€)</strong> → bereits erfüllt, übersprungen</li>
              <li><strong>Minimum: L2-K3 (7€)</strong> → 10 Einheiten (L2 erschöpft: 60-50-10=0)</li>
              <li><strong>Minimum: L1-K1 (8€)</strong> → 40 Einheiten (K1 erfüllt)</li>
              <li><strong>Verbleibend: L1-K3 (10€)</strong> → 20 Einheiten (K3 erfüllt: 30-10-20=0)</li>
            </ol>
            <p><strong>Optimale Zuweisungen:</strong> L1→K1: 40, L1→K3: 20, L2→K2: 50, L2→K3: 10</p>
            <p><strong>Gesamtkosten:</strong> 40×8 + 20×10 + 50×5 + 10×7 = 320 + 200 + 250 + 70 = <span class="text-neon">840€</span></p>
          </div>
        </div>
      </section>

      <!-- Navigation -->
      <div class="module-nav">
        <router-link to="/abc-xyz" class="btn btn-secondary">← Zurück</router-link>
        <router-link to="/quiz/matrix" class="btn btn-primary">🎯 Wissen testen</router-link>
        <router-link to="/conflict" class="btn btn-secondary">Zum Zielkonflikt →</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import matrixData from '../data/matrix-minimum.json'

const content = ref(matrixData)
const currentStepIndex = ref(0)

const currentStepData = computed(() => {
  if (currentStepIndex.value === 0) return null
  return content.value.armanExample.solutionSteps[currentStepIndex.value - 1]
})

const nextStep = () => {
  if (currentStepIndex.value < content.value.armanExample.solutionSteps.length) {
    currentStepIndex.value++
  }
}

const prevStep = () => {
  if (currentStepIndex.value > 0) {
    currentStepIndex.value--
  }
}

// Allocation map for visualization
const allocMap = {
  'F2-K2': { amount: 150, step: 1 },
  'F3-K3': { amount: 120, step: 2 },
  'F1-K4': { amount: 130, step: 3 },
  'F3-K1': { amount: 30, step: 4 },
  'F1-K1': { amount: 20, step: 5 },
  'F2-K1': { amount: 50, step: 6 }
}

// Track when rows/columns get crossed out (capacity = 0)
const crossedMap = {
  rows: {
    'F1': 5,  // F1 exhausted at step 5
    'F2': 6,  // F2 exhausted at step 6  
    'F3': 4   // F3 exhausted at step 4
  },
  cols: {
    'K1': 6,  // K1 fulfilled at step 6
    'K2': 1,  // K2 fulfilled at step 1
    'K3': 2,  // K3 fulfilled at step 2
    'K4': 3   // K4 fulfilled at step 3
  }
}

// Initial values
const initialSupply = { 'F1': 150, 'F2': 200, 'F3': 150 }
const initialDemand = { 'K1': 100, 'K2': 150, 'K3': 120, 'K4': 130 }

// Calculate remaining supply at current step
const getSupply = (row) => {
  let remaining = initialSupply[row]
  for (const [key, data] of Object.entries(allocMap)) {
    if (key.startsWith(row) && currentStepIndex.value >= data.step) {
      remaining -= data.amount
    }
  }
  return remaining
}

// Calculate remaining demand at current step
const getDemand = (col) => {
  let remaining = initialDemand[col]
  for (const [key, data] of Object.entries(allocMap)) {
    if (key.endsWith(col) && currentStepIndex.value >= data.step) {
      remaining -= data.amount
    }
  }
  return remaining
}

const isRowCrossed = (row) => {
  return crossedMap.rows[row] && currentStepIndex.value >= crossedMap.rows[row]
}

const isColCrossed = (col) => {
  return crossedMap.cols[col] && currentStepIndex.value >= crossedMap.cols[col]
}

const getAlloc = (from, to) => {
  const key = `${from}-${to}`
  if (allocMap[key] && currentStepIndex.value >= allocMap[key].step) {
    return allocMap[key].amount
  }
  return null
}

const getCellClass = (from, to) => {
  const key = `${from}-${to}`
  let classes = []
  if (allocMap[key] && currentStepIndex.value >= allocMap[key].step) {
    classes.push('cell-allocated')
  }
  if (isRowCrossed(from) || isColCrossed(to)) {
    classes.push('cell-crossed')
  }
  return classes.join(' ')
}

// ========== Übungsaufgabe ==========
const exerciseInputs = ref({
  'L1-K1': null,
  'L1-K2': null,
  'L1-K3': null,
  'L2-K1': null,
  'L2-K2': null,
  'L2-K3': null
})

const exerciseSolution = {
  'L1-K1': 40,
  'L1-K2': 0,
  'L1-K3': 20,
  'L2-K1': 0,
  'L2-K2': 50,
  'L2-K3': 10
}

const exerciseChecked = ref(false)
const exerciseScore = ref(0)
const showExerciseSolution = ref(false)

const parseInputNumber = (val) => {
  if (val === null || val === '' || val === undefined) return 0
  const num = parseInt(val, 10)
  return isNaN(num) ? 0 : num
}

const onlyNumbers = (event, key) => {
  const value = event.target.value.replace(/[^0-9]/g, '')
  exerciseInputs.value[key] = value
}

const isExerciseCorrect = (key) => {
  const input = parseInputNumber(exerciseInputs.value[key])
  return input === exerciseSolution[key]
}

const checkExercise = () => {
  exerciseChecked.value = true
  let correct = 0
  let total = 0
  
  for (const key of Object.keys(exerciseSolution)) {
    if (exerciseSolution[key] > 0) {
      total++
      if (isExerciseCorrect(key)) correct++
    }
  }
  
  exerciseScore.value = Math.round((correct / total) * 100)
}

const resetExercise = () => {
  for (const key of Object.keys(exerciseInputs.value)) {
    exerciseInputs.value[key] = null
  }
  exerciseChecked.value = false
  exerciseScore.value = 0
  showExerciseSolution.value = false
}

const calculateExerciseCost = () => {
  const costs = {
    'L1-K1': 8, 'L1-K2': 6, 'L1-K3': 10,
    'L2-K1': 9, 'L2-K2': 5, 'L2-K3': 7
  }
  let total = 0
  for (const [key, amount] of Object.entries(exerciseInputs.value)) {
    const num = parseInputNumber(amount)
    if (num) total += num * costs[key]
  }
  return total
}
</script>

<style scoped>
.module-header {
  background: var(--module-header-bg);
  padding: 60px 0; text-align: center;
  border-bottom: 1px solid var(--color-bg-hover);
}
.header-badge {
  display: inline-block; color: var(--color-purple);
  border: 1px solid var(--color-purple); padding: 4px 12px;
  border-radius: 20px; margin-bottom: 15px;
  font-size: 0.8rem; text-transform: uppercase;
}
.subtitle { color: var(--color-text-secondary); }
.content-section { margin: 60px 0; }
.section-title { font-size: 1.8rem; margin-bottom: 30px; }
.mb-lg { margin-bottom: 30px; }

.bg-code { font-family: sans-serif; font-size: 1rem; }
.def-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 20px; }
.def-item { background: var(--color-bg-hover); padding: 15px; border-radius: 6px; }

/* Algo Steps */
.algo-steps { display: grid; gap: 20px; }
.algo-card { display: flex; gap: 20px; background: var(--color-bg-card); padding: 20px; border-radius: 8px; }
.algo-num {
  font-size: 2rem; font-weight: bold;
  background: var(--algo-circle-bg, #000); /* black in dark, white in light */
  color: var(--color-purple); /* number color matches border color */
  width: 50px; height: 50px;
  display: flex; align-items: center; justify-content: center;
  border-radius: 50%; flex-shrink: 0;
  border: 3px solid var(--color-purple); /* colored outline */
  box-sizing: border-box;
}
.algo-content h3 { margin-bottom: 10px; }
.algo-note { font-size: 0.85rem; color: var(--color-neon); margin-top: 10px; }

/* Simulation */
.simulation-container {
  background: var(--color-bg-card); padding: 20px; border-radius: 12px;
  border: 1px solid var(--color-bg-hover);
}
.sim-controls { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.sim-status { text-align: center; }
.step-counter { display: block; font-size: 0.8rem; color: var(--color-text-secondary); }
.step-desc { font-weight: bold; color: var(--color-neon); }

.cost-table { width: 100%; border-collapse: collapse; text-align: center; }
.cost-table th, .cost-table td { border: 1px solid #333; padding: 15px; position: relative; transition: all 0.3s ease; }
  .cost-table th { color: var(--table-head-text); background: var(--table-head-bg); }
.cell-allocated { background-color: rgba(57, 255, 20, 0.2); border-color: var(--color-neon) !important; }
.alloc {
  position: absolute; bottom: 2px; right: 2px;
  background: var(--color-neon); color: black;
  font-size: 0.7rem; padding: 2px 6px; border-radius: 4px; font-weight: bold;
}

/* Crossed out rows/columns */
.row-crossed td { opacity: 0.5; }
.row-crossed td:first-child { text-decoration: line-through; text-decoration-color: #ff4444; }
.col-crossed { text-decoration: line-through; text-decoration-color: #ff4444; opacity: 0.5; }
.cell-crossed:not(.cell-allocated) { opacity: 0.3; background-color: rgba(100, 100, 100, 0.1); }
.supply-zero, .demand-zero { 
  color: #ff4444 !important; 
  font-weight: bold;
}
  .demand-row td { background: var(--table-head-bg); color: var(--table-head-text); font-size: 0.9rem; }

.result-display { margin-top: 20px; text-align: center; padding-top: 20px; border-top: 1px solid #333; }
.total-cost { font-size: 1.5rem; color: var(--color-neon); margin-bottom: 10px; }
.comparison { display: flex; justify-content: center; gap: 30px; color: var(--color-text-secondary); }
.text-neon { color: var(--color-neon); }

.module-nav {
  display: flex; justify-content: space-between; margin-top: 60px;
  padding-top: 20px; border-top: 1px solid var(--color-bg-hover);
}

/* Übungsaufgabe */
.exercise-container {
  background: var(--color-bg-card);
  border: 1px solid var(--color-bg-hover);
  border-radius: 12px;
  padding: 25px;
}

.exercise-info {
  margin-bottom: 20px;
  padding: 15px;
  background: var(--color-bg-hover);
  border-radius: 8px;
}

.exercise-table {
  width: 100%;
  border-collapse: collapse;
  text-align: center;
  margin-bottom: 20px;
}

.exercise-table th, .exercise-table td {
  border: 1px solid #333;
  padding: 12px;
}

  .exercise-table th {
  background: var(--table-head-bg);
  color: var(--table-head-text);
}

.exercise-table th small {
  display: block;
  font-weight: normal;
  opacity: 0.7;
  font-size: 0.75rem;
}

.exercise-cell {
  position: relative;
  padding: 8px !important;
}

.exercise-cell .cost {
  display: block;
  font-size: 0.75rem;
  color: var(--color-text-secondary);
  margin-bottom: 5px;
}

.exercise-cell input {
  width: 60px;
  padding: 8px;
  text-align: center;
  background: var(--color-bg-hover);
  border: 2px solid #444;
  border-radius: 6px;
  color: white;
  font-size: 1rem;
  font-weight: bold;
}

.exercise-cell input:focus {
  outline: none;
  border-color: var(--color-purple);
}

.exercise-cell input.correct {
  border-color: var(--color-neon) !important;
  background: rgba(57, 255, 20, 0.15);
}

.exercise-cell input.incorrect {
  border-color: #ff4444 !important;
  background: rgba(255, 68, 68, 0.15);
}

.supply {
  font-weight: bold;
  color: var(--color-purple);
}

.exercise-actions {
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-bottom: 20px;
}

.exercise-result {
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  margin-bottom: 20px;
}

.exercise-result.success {
  background: rgba(57, 255, 20, 0.1);
  border: 1px solid var(--color-neon);
}

.exercise-result.partial {
  background: rgba(255, 165, 0, 0.1);
  border: 1px solid orange;
}

.result-icon {
  font-size: 1.5rem;
  margin-right: 10px;
}

.solution-box {
  background: var(--color-bg-hover);
  padding: 20px;
  border-radius: 8px;
  border-left: 4px solid var(--color-purple);
}

.solution-box h4 {
  margin-bottom: 15px;
  color: var(--color-purple);
}

.solution-box ol {
  padding-left: 20px;
  margin-bottom: 15px;
}

.solution-box li {
  margin-bottom: 8px;
  color: var(--color-text-secondary);
}

.solution-box p {
  margin-bottom: 8px;
}

/* Responsive Styles */
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
  
  .def-grid {
    grid-template-columns: 1fr;
    gap: 10px;
  }
  
  .algo-card {
    flex-direction: column;
    gap: 15px;
    padding: 15px;
  }
  
  .algo-num {
    width: 40px;
    height: 40px;
    font-size: 1.5rem;
    border-width: 2px;
  }
  
  .sim-controls {
    flex-direction: column;
    gap: 15px;
  }
  
  .sim-status {
    order: -1;
  }
  
  .cost-table th,
  .cost-table td {
    padding: 8px 5px;
    font-size: 0.8rem;
  }
  
  .alloc {
    font-size: 0.6rem;
    padding: 2px 4px;
  }
  
  .comparison {
    flex-direction: column;
    gap: 10px;
  }
  
  .exercise-container {
    padding: 15px;
  }
  
  .exercise-table th,
  .exercise-table td {
    padding: 8px 5px;
    font-size: 0.85rem;
  }
  
  .exercise-cell input {
    width: 50px;
    padding: 6px;
    font-size: 0.9rem;
  }
  
  .exercise-actions {
    flex-direction: column;
    gap: 10px;
  }
  
  .exercise-actions .btn {
    width: 100%;
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
  
  .simulation-container {
    padding: 10px;
  }
  
  .cost-table {
    font-size: 0.7rem;
  }
  
  .cost-table th,
  .cost-table td {
    padding: 6px 3px;
  }
  
  .total-cost {
    font-size: 1.2rem;
  }
  
  .exercise-table th small {
    font-size: 0.65rem;
  }
  
  .exercise-cell .cost {
    font-size: 0.65rem;
  }
  
  .exercise-cell input {
    width: 40px;
    padding: 5px;
    font-size: 0.8rem;
  }
  
  .solution-box {
    padding: 15px;
  }
  
  .solution-box ol {
    padding-left: 15px;
    font-size: 0.85rem;
  }
}

@media (max-width: 360px) {
  .cost-table th,
  .cost-table td {
    padding: 4px 2px;
    font-size: 0.65rem;
  }
  
  .exercise-cell input {
    width: 35px;
    padding: 4px;
  }
}
</style>
