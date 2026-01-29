<template>
  <div class="abc-xyz-view">
    <header class="module-header">
      <div class="container">
        <div class="header-badge">Methoden-Modul 2</div>
        <h1>{{ content.title }}</h1>
        <p class="subtitle">{{ content.subtitle }}</p>
      </div>
    </header>

    <div class="container">
      <!-- ABC Analyse -->
      <section class="content-section">
        <h2 class="section-title">ABC-Analyse</h2>
        <div class="card mb-md">
          <p>{{ content.abcAnalysis.definition }}</p>
          <div class="principle-box">
            <span>ℹ️</span> {{ content.abcAnalysis.principle }}
          </div>
        </div>

        <div class="grid-3">
          <div 
            v-for="cls in content.abcAnalysis.classes" 
            :key="cls.class" 
            class="class-card"
            :style="{ borderColor: cls.color }"
          >
            <div class="class-header" :style="{ backgroundColor: cls.color + '20' }">
              <span class="class-big" :style="{ color: cls.color }">{{ cls.class }}</span>
            </div>
            <div class="class-body">
              <h4>{{ cls.description }}</h4>
              <ul class="stats-list">
                <li>Wertanteil: <strong>{{ cls.valueShare }}</strong></li>
                <li>Mengenanteil: <strong>{{ cls.quantityShare }}</strong></li>
              </ul>
              <p class="desc-small">{{ cls.characteristics }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Interactive Exercise: ABC Calculation -->
      <section class="content-section">
        <h2 class="section-title">📝 Übungsaufgabe: ABC-Analyse</h2>
        <div class="card exercise-card">
          <p class="exercise-intro">
            Berechne für die folgenden Artikel den Verbrauchswert und ordne sie den ABC-Klassen zu.
          </p>
          <div class="formula-box">
            <strong>Formeln:</strong><br>
            • Verbrauchswert = Wert × Verbrauch<br>
            • Anteil in % = Verbrauchswert / Summe aller Verbrauchswerte
          </div>
          <div class="classification-info">
            <strong>Klasseneinteilung (kumulierter Anteil):</strong>
            <span class="class-badge class-a">A: bis 80%</span>
            <span class="class-badge class-b">B: 80% - 95%</span>
            <span class="class-badge class-c">C: über 95%</span>
          </div>

          <h4 class="mt-md">Gegebene Daten:</h4>
          <table class="exercise-table">
            <thead>
              <tr>
                <th>Artikel-Nr.</th>
                <th>Wert (€)</th>
                <th>Verbrauch</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in abcExerciseData" :key="item.nr">
                <td class="dataset-label">{{ item.nr }}</td>
                <td>{{ item.value.toFixed(2).replace('.', ',') }} €</td>
                <td>{{ item.consumption.toLocaleString('de-DE') }}</td>
              </tr>
            </tbody>
          </table>

          <h4 class="mt-md">Deine Berechnung:</h4>
          <p class="text-muted">Tipp: Ziehe die Zeilen per Drag & Drop in die richtige Reihenfolge (sortiert nach Verbrauchswert, absteigend).</p>
          <p class="text-muted"><strong>Summe aller Verbrauchswerte: {{ totalConsumptionValue.toLocaleString('de-DE') }} €</strong></p>
          
          <table class="exercise-table abc-calc-table">
            <thead>
              <tr>
                <th class="drag-col">⠿</th>
                <th>Artikel-Nr.</th>
                <th>Dein Verbrauchswert (€)</th>
                <th>Kum. Anteil (%)</th>
                <th>Deine ABC-Klasse</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="(item, idx) in abcUserOrder" 
                :key="item.nr"
                draggable="true"
                @dragstart="onDragStart($event, idx)"
                @dragover.prevent="onDragOver($event, idx)"
                @drop="onDrop($event, idx)"
                @dragend="onDragEnd"
                :class="{ 'dragging': draggedIndex === idx, 'drag-over': dragOverIndex === idx }"
                class="draggable-row"
              >
                <td class="drag-handle">⠿</td>
                <td class="dataset-label">{{ item.nr }}</td>
                <td>
                  <input 
                    type="text" 
                    v-model="abcUserAnswers[getOriginalIndex(item.nr)].consumptionValue" 
                    class="exercise-input wide-input"
                    :class="{ 'correct': abcExerciseChecked && isAbcValueCorrectByNr(item.nr), 'wrong': abcExerciseChecked && !isAbcValueCorrectByNr(item.nr) }"
                    placeholder="Wert × Verbrauch"
                    :disabled="abcExerciseChecked"
                  />
                </td>
                <td>
                  <input 
                    type="text" 
                    v-model="abcUserAnswers[getOriginalIndex(item.nr)].cumPercent" 
                    class="exercise-input percent-input"
                    :class="{ 'correct': abcExerciseChecked && isAbcCumPercentCorrect(idx), 'wrong': abcExerciseChecked && !isAbcCumPercentCorrect(idx) }"
                    placeholder="kum. %"
                    :disabled="abcExerciseChecked"
                  />
                </td>
                <td>
                  <select 
                    v-model="abcUserAnswers[getOriginalIndex(item.nr)].class" 
                    class="exercise-select"
                    :class="{ 'correct': abcExerciseChecked && isAbcClassCorrectByNr(item.nr), 'wrong': abcExerciseChecked && !isAbcClassCorrectByNr(item.nr) }"
                    :disabled="abcExerciseChecked"
                  >
                    <option value="">-- Wählen --</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>

          <div class="exercise-actions">
            <button v-if="!abcExerciseChecked" class="btn btn-primary" @click="checkAbcExercise" :disabled="!canCheckAbcExercise">
              Überprüfen
            </button>
            <button v-else class="btn btn-secondary" @click="resetAbcExercise">
              Nochmal versuchen
            </button>
          </div>

          <div v-if="abcExerciseChecked" class="exercise-feedback" :class="abcAllCorrect ? 'fb-success' : 'fb-partial'">
            <h4 v-if="abcAllCorrect">🎉 Perfekt! Alle Antworten sind korrekt!</h4>
            <h4 v-else>{{ abcCorrectCount }}/{{ abcExerciseData.length * 4 }} richtig (Reihenfolge, Verbrauchswert, kum. Anteil, Klasse)</h4>
            <div class="solution-details">
              <p><strong>Lösung (sortiert nach Verbrauchswert):</strong></p>
              <table class="solution-table">
                <thead>
                  <tr>
                    <th>Nr.</th>
                    <th>Wert</th>
                    <th>Verbrauch</th>
                    <th>Verbrauchswert</th>
                    <th>Anteil</th>
                    <th>Kum. Anteil</th>
                    <th>Klasse</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in abcSolutionSorted" :key="item.nr">
                    <td>{{ item.nr }}</td>
                    <td>{{ item.value.toFixed(2).replace('.', ',') }} €</td>
                    <td>{{ item.consumption.toLocaleString('de-DE') }}</td>
                    <td><strong>{{ item.consumptionValue.toLocaleString('de-DE') }} €</strong></td>
                    <td>{{ item.share }}</td>
                    <td>{{ item.cumShare }}</td>
                    <td><strong>{{ item.class }}</strong></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <!-- XYZ Analyse -->
      <section class="content-section">
        <h2 class="section-title">XYZ-Analyse</h2>
        <p>{{ content.xyzAnalysis.definition }}</p>

          <div class="xyz-container">
            <div class="grid-3">
              <div
                v-for="cls in content.xyzAnalysis.classes"
                :key="cls.class"
                :class="['class-card', 'xyz-card', 'xyz-' + cls.class.toLowerCase()]"
              >
                <div class="class-header">
                  <span class="class-big">{{ cls.class }}</span>
                </div>
                <div class="class-body">
                  <h4>{{ cls.description }}</h4>
                  <ul class="stats-list">
                    <li><strong>Schwankungskoeffizient:</strong> {{ cls.variationCoefficient }}</li>
                    <li><strong>Management:</strong> {{ cls.management }}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
      </section>

      <!-- Combined Matrix -->
      <section class="content-section">
        <h2 class="section-title">Die 9-Felder-Matrix</h2>
        <p>{{ content.combinedMatrix.description }}</p>

          <div class="matrix-visual">
          <div class="matrix-content">
            <div class="matrix-header-row">
              <div></div>
              <div class="header-cell">A (Hochwert)</div>
              <div class="header-cell">B (Mittel)</div>
              <div class="header-cell">C (Niedrigwert)</div>
            </div>

            <div class="matrix-row">
              <div class="header-cell-side">X</div>
              <div class="matrix-cell cell-ax"><strong>AX</strong><br><small>{{ content.combinedMatrix.strategies.AX.name }}</small></div>
              <div class="matrix-cell cell-bx"><strong>BX</strong><br><small>{{ content.combinedMatrix.strategies.BX.name }}</small></div>
              <div class="matrix-cell cell-cx"><strong>CX</strong><br><small>{{ content.combinedMatrix.strategies.CX.name }}</small></div>
            </div>
            
            <div class="matrix-row">
              <div class="header-cell-side">Y</div>
              <div class="matrix-cell cell-ay"><strong>AY</strong><br><small>{{ content.combinedMatrix.strategies.AY.name }}</small></div>
              <div class="matrix-cell cell-by"><strong>BY</strong><br><small>{{ content.combinedMatrix.strategies.BY.name }}</small></div>
              <div class="matrix-cell cell-cy"><strong>CY</strong><br><small>{{ content.combinedMatrix.strategies.CY.name }}</small></div>
            </div>

            <div class="matrix-row">
              <div class="header-cell-side">Z</div>
              <div class="matrix-cell cell-az"><strong>AZ</strong><br><small>{{ content.combinedMatrix.strategies.AZ.name }}</small></div>
              <div class="matrix-cell cell-bz"><strong>BZ</strong><br><small>{{ content.combinedMatrix.strategies.BZ.name }}</small></div>
              <div class="matrix-cell cell-cz"><strong>CZ</strong><br><small>{{ content.combinedMatrix.strategies.CZ.name }}</small></div>
            </div>
          </div>
        </div>
      </section>

      <!-- Interactive Exercise: XYZ Calculation -->
      <section class="content-section">
        <h2 class="section-title">📝 Übungsaufgabe: XYZ-Analyse</h2>
        <div class="card exercise-card">
          <p class="exercise-intro">
            Berechne den Variationskoeffizienten (VK) für die folgenden Datensätze und ordne sie den Klassen X, Y oder Z zu.
          </p>
          <div class="formula-box">
            <strong>Formel:</strong> VK = Standardabweichung / Mittelwert
          </div>
          <div class="classification-info">
            <strong>Klasseneinteilung:</strong>
            <span class="class-badge class-x">X: 0 - 0,49</span>
            <span class="class-badge class-y">Y: 0,5 - 0,99</span>
            <span class="class-badge class-z">Z: ≥ 1</span>
          </div>

          <table class="exercise-table">
            <thead>
              <tr>
                <th>Datensatz</th>
                <th>Mittelwert</th>
                <th>Standardabweichung</th>
                <th>Dein VK</th>
                <th>Deine Klasse</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, idx) in exerciseData" :key="idx">
                <td class="dataset-label">{{ String.fromCharCode(97 + idx) }})</td>
                <td>{{ item.mean }}</td>
                <td>{{ item.stdDev }}</td>
                <td>
                  <input 
                    type="text" 
                    v-model="userAnswers[idx].vk" 
                    class="exercise-input"
                    :class="{ 'correct': exerciseChecked && isVkCorrect(idx), 'wrong': exerciseChecked && !isVkCorrect(idx) }"
                    placeholder="VK eingeben"
                    :disabled="exerciseChecked"
                  />
                </td>
                <td>
                  <select 
                    v-model="userAnswers[idx].class" 
                    class="exercise-select"
                    :class="{ 'correct': exerciseChecked && isClassCorrect(idx), 'wrong': exerciseChecked && !isClassCorrect(idx) }"
                    :disabled="exerciseChecked"
                  >
                    <option value="">-- Wählen --</option>
                    <option value="X">X</option>
                    <option value="Y">Y</option>
                    <option value="Z">Z</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>

          <div class="exercise-actions">
            <button v-if="!exerciseChecked" class="btn btn-primary" @click="checkExercise" :disabled="!canCheckExercise">
              Überprüfen
            </button>
            <button v-else class="btn btn-secondary" @click="resetExercise">
              Nochmal versuchen
            </button>
          </div>

          <div v-if="exerciseChecked" class="exercise-feedback" :class="allCorrect ? 'fb-success' : 'fb-partial'">
            <h4 v-if="allCorrect">🎉 Perfekt! Alle Antworten sind korrekt!</h4>
            <h4 v-else>{{ correctCount }}/{{ exerciseData.length }} richtig</h4>
            <div class="solution-details">
              <p><strong>Lösung:</strong></p>
              <ul>
                <li v-for="(item, idx) in exerciseData" :key="idx">
                  {{ String.fromCharCode(97 + idx) }}) VK = {{ item.stdDev }}/{{ item.mean }} = <strong>{{ item.correctVk }}</strong> → <strong>Klasse {{ item.correctClass }}</strong>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- Arman Industries Example -->
      <section class="content-section">
        <h2 class="section-title">Arman Industries Fallbeispiel</h2>
        <div class="card">
          <p>{{ content.armanExample.scenario }}</p>
          
          <div class="results-summary">
            <h3>Ergebnisse der Analyse</h3>
            <div class="grid-3">
              <div class="stat-box">
                <div class="stat-value text-neon">{{ content.armanExample.results.A_items }}</div>
                <div class="stat-label">A-Teile</div>
              </div>
              <div class="stat-box">
                <div class="stat-value text-blue">{{ content.armanExample.results.B_items }}</div>
                <div class="stat-label">B-Teile</div>
              </div>
              <div class="stat-box">
                <div class="stat-value text-purple">{{ content.armanExample.results.C_items }}</div>
                <div class="stat-label">C-Teile</div>
              </div>
            </div>
            <div class="savings-box">
              <strong>💰 {{ content.armanExample.results.savings }}</strong>
            </div>
          </div>

          <div class="impl-list">
            <h4>Maßnahmen:</h4>
            <ul>
              <li v-for="(impl, idx) in content.armanExample.implementation" :key="idx">{{ impl }}</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Navigation -->
      <div class="module-nav">
        <router-link to="/lean" class="btn btn-secondary">← Zurück</router-link>
        <router-link to="/quiz/abcxyz" class="btn btn-primary">🎯 Wissen testen</router-link>
        <router-link to="/matrix" class="btn btn-secondary">Nächstes Modul →</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import data from '../data/abc-xyz-analysis.json'

const content = ref(data)

// ABC Exercise Data (based on provided example)
const abcExerciseData = ref([
  { nr: '1007', value: 136.20, consumption: 4000, correctValue: 544800, correctClass: 'A' },
  { nr: '1009', value: 37.85, consumption: 12000, correctValue: 454200, correctClass: 'A' },
  { nr: '1004', value: 17.50, consumption: 6000, correctValue: 105000, correctClass: 'B' },
  { nr: '1006', value: 6.25, consumption: 8000, correctValue: 50000, correctClass: 'B' },
  { nr: '1001', value: 3.25, consumption: 10000, correctValue: 32500, correctClass: 'B' }
])

const totalConsumptionValue = computed(() => {
  // Full sum including all 9 items from original example
  return 1248700
})

const abcSolutionSorted = computed(() => {
  const sorted = [...abcExerciseData.value].sort((a, b) => b.correctValue - a.correctValue)
  let cumulative = 0
  return sorted.map(item => {
    const share = (item.correctValue / totalConsumptionValue.value * 100)
    cumulative += share
    return {
      ...item,
      consumptionValue: item.correctValue,
      share: share.toFixed(2).replace('.', ',') + '%',
      cumShare: cumulative.toFixed(2).replace('.', ',') + '%',
      cumShareNum: cumulative,
      class: item.correctClass
    }
  })
})

// Correct order of article numbers (sorted by value descending)
const correctOrder = computed(() => abcSolutionSorted.value.map(item => item.nr))

// Shuffle function
const shuffleArray = (array) => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// User's current order for drag & drop - starts shuffled
const abcUserOrder = ref(shuffleArray(abcExerciseData.value))

// Drag & Drop state
const draggedIndex = ref(null)
const dragOverIndex = ref(null)

const onDragStart = (e, idx) => {
  draggedIndex.value = idx
  e.dataTransfer.effectAllowed = 'move'
}

const onDragOver = (e, idx) => {
  dragOverIndex.value = idx
}

const onDrop = (e, idx) => {
  if (draggedIndex.value !== null && draggedIndex.value !== idx) {
    const items = [...abcUserOrder.value]
    const draggedItem = items[draggedIndex.value]
    items.splice(draggedIndex.value, 1)
    items.splice(idx, 0, draggedItem)
    abcUserOrder.value = items
  }
  draggedIndex.value = null
  dragOverIndex.value = null
}

const onDragEnd = () => {
  draggedIndex.value = null
  dragOverIndex.value = null
}

// Get original index by article number
const getOriginalIndex = (nr) => {
  return abcExerciseData.value.findIndex(item => item.nr === nr)
}

const abcUserAnswers = ref(
  abcExerciseData.value.map(() => ({ consumptionValue: '', cumPercent: '', class: '' }))
)

const abcExerciseChecked = ref(false)

const normalizeNumber = (input) => {
  if (!input) return null
  // Normalize comma to dot, remove spaces and dots as thousand separators
  const normalized = input.toString().replace(/\./g, '').replace(',', '.').replace(/\s/g, '').trim()
  const num = parseFloat(normalized)
  return isNaN(num) ? null : Math.round(num)
}

const normalizePercent = (input) => {
  if (!input) return null
  const normalized = input.toString().replace(',', '.').replace('%', '').trim()
  const num = parseFloat(normalized)
  return isNaN(num) ? null : Math.round(num * 10) / 10
}

// Check if user's order matches correct order at position idx
const isOrderCorrect = (idx) => {
  return abcUserOrder.value[idx].nr === correctOrder.value[idx]
}

// Check value by article number
const isAbcValueCorrectByNr = (nr) => {
  const originalIdx = getOriginalIndex(nr)
  const item = abcExerciseData.value.find(i => i.nr === nr)
  const userVal = normalizeNumber(abcUserAnswers.value[originalIdx].consumptionValue)
  return userVal !== null && Math.abs(userVal - item.correctValue) < 100
}

// Check class by article number
const isAbcClassCorrectByNr = (nr) => {
  const originalIdx = getOriginalIndex(nr)
  const item = abcExerciseData.value.find(i => i.nr === nr)
  return abcUserAnswers.value[originalIdx].class === item.correctClass
}

// Check cumulative percent - based on user's order position
const isAbcCumPercentCorrect = (positionIdx) => {
  const item = abcUserOrder.value[positionIdx]
  const originalIdx = getOriginalIndex(item.nr)
  const userPercent = normalizePercent(abcUserAnswers.value[originalIdx].cumPercent)
  
  // Calculate what the cumulative should be at this position based on user's ORDER
  let cumulative = 0
  for (let i = 0; i <= positionIdx; i++) {
    const currentItem = abcUserOrder.value[i]
    const origIdx = getOriginalIndex(currentItem.nr)
    const userVal = normalizeNumber(abcUserAnswers.value[origIdx].consumptionValue)
    if (userVal) {
      cumulative += (userVal / totalConsumptionValue.value * 100)
    }
  }
  
  // Also check against correct solution
  const correctItem = abcSolutionSorted.value.find(i => i.nr === item.nr)
  if (!correctItem) return false
  
  return userPercent !== null && Math.abs(userPercent - correctItem.cumShareNum) < 1
}

const isAbcValueCorrect = (idx) => {
  const userVal = normalizeNumber(abcUserAnswers.value[idx].consumptionValue)
  const correctVal = abcExerciseData.value[idx].correctValue
  return userVal !== null && Math.abs(userVal - correctVal) < 100 // Allow small tolerance
}

const isAbcClassCorrect = (idx) => {
  return abcUserAnswers.value[idx].class === abcExerciseData.value[idx].correctClass
}

const abcCorrectCount = computed(() => {
  let count = 0
  for (let i = 0; i < abcExerciseData.value.length; i++) {
    // Check order
    if (isOrderCorrect(i)) count++
    // Check value
    const item = abcUserOrder.value[i]
    if (isAbcValueCorrectByNr(item.nr)) count++
    // Check cumulative percent
    if (isAbcCumPercentCorrect(i)) count++
    // Check class
    if (isAbcClassCorrectByNr(item.nr)) count++
  }
  return count
})

const abcAllCorrect = computed(() => abcCorrectCount.value === abcExerciseData.value.length * 4)

const canCheckAbcExercise = computed(() => {
  return abcUserAnswers.value.every(a => a.consumptionValue.trim() !== '' && a.cumPercent.trim() !== '' && a.class !== '')
})

const checkAbcExercise = () => {
  abcExerciseChecked.value = true
}

const resetAbcExercise = () => {
  abcExerciseChecked.value = false
  abcUserAnswers.value = abcExerciseData.value.map(() => ({ consumptionValue: '', cumPercent: '', class: '' }))
  abcUserOrder.value = shuffleArray(abcExerciseData.value)
}

// XYZ Exercise Data
const exerciseData = ref([
  { mean: 50, stdDev: 10, correctVk: '0,2', correctClass: 'X' },
  { mean: 100, stdDev: 20, correctVk: '0,2', correctClass: 'X' },
  { mean: 30, stdDev: 35, correctVk: '1,17', correctClass: 'Z' }
])

const userAnswers = ref([
  { vk: '', class: '' },
  { vk: '', class: '' },
  { vk: '', class: '' }
])

const exerciseChecked = ref(false)

const normalizeVk = (input) => {
  if (!input) return null
  // Normalize comma to dot and parse
  const normalized = input.toString().replace(',', '.').trim()
  const num = parseFloat(normalized)
  return isNaN(num) ? null : Math.round(num * 100) / 100
}

const isVkCorrect = (idx) => {
  const userVal = normalizeVk(userAnswers.value[idx].vk)
  const correctVal = normalizeVk(exerciseData.value[idx].correctVk)
  return userVal !== null && Math.abs(userVal - correctVal) < 0.05
}

const isClassCorrect = (idx) => {
  return userAnswers.value[idx].class === exerciseData.value[idx].correctClass
}

const correctCount = computed(() => {
  let count = 0
  for (let i = 0; i < exerciseData.value.length; i++) {
    if (isVkCorrect(i) && isClassCorrect(i)) count++
  }
  return count
})

const allCorrect = computed(() => correctCount.value === exerciseData.value.length)

const canCheckExercise = computed(() => {
  return userAnswers.value.every(a => a.vk.trim() !== '' && a.class !== '')
})

const checkExercise = () => {
  exerciseChecked.value = true
}

const resetExercise = () => {
  exerciseChecked.value = false
  userAnswers.value = [
    { vk: '', class: '' },
    { vk: '', class: '' },
    { vk: '', class: '' }
  ]
}
</script>

<style scoped>
.module-header {
  background: var(--module-header-bg);
  padding: 60px 0;
  text-align: center;
  border-bottom: 1px solid var(--color-bg-hover);
}
.header-badge {
  display: inline-block; color: var(--color-blue);
  border: 1px solid var(--color-blue); padding: 4px 12px;
  border-radius: 20px; margin-bottom: 15px;
  font-size: 0.8rem; text-transform: uppercase;
}
.subtitle { color: var(--color-text-secondary); }
.content-section { margin: 60px 0; }
.section-title { font-size: 1.8rem; margin-bottom: 30px; }
.mb-md { margin-bottom: 20px; }

.principle-box {
  background-color: var(--color-bg-hover); padding: 15px;
  margin-top: 15px; border-radius: 6px; font-family: monospace;
}

/* Class Cards */
.class-card {
  background-color: var(--color-bg-card); border-radius: 12px;
  overflow: hidden; border: 1px solid;
}
.class-header { padding: 15px; text-align: center; }
.class-big { font-size: 3rem; font-weight: 800; }
.class-body { padding: 20px; }
.stats-list { list-style: none; margin: 15px 0; padding: 0; font-size: 0.9rem; color: var(--color-text-secondary); }
.desc-small { font-size: 0.85rem; color: var(--color-text-secondary); }

/* XYZ cards reuse ABC card styles but add small XYZ-specific tweaks */
.xyz-card { border-color: var(--color-bg-hover); }
.xyz-card .class-header { padding: 15px; }
.xyz-card .class-big { font-size: 2.6rem; }
.xyz-card .stats-list li { margin-bottom: 8px; }

/* Specific XYZ color accents */
.xyz-x { border-color: var(--color-xyz-x); }
.xyz-x .class-header { background: var(--color-xyz-x-dim); border-bottom: 1px solid rgba(255,255,255,0.02); }
.xyz-x .class-big { color: var(--color-xyz-x); }

.xyz-y { border-color: var(--color-xyz-y); }
.xyz-y .class-header { background: var(--color-xyz-y-dim); }
.xyz-y .class-big { color: var(--color-xyz-y); }

.xyz-z { border-color: var(--color-xyz-z); }
.xyz-z .class-header { background: var(--color-xyz-z-dim); }
.xyz-z .class-big { color: var(--color-xyz-z); }
/* Table */
.data-table { width: 100%; border-collapse: collapse; margin-top: 20px; }
.data-table th, .data-table td { padding: 12px; text-align: left; border-bottom: 1px solid var(--color-bg-hover); }
.data-table th { color: var(--color-neon); }
.data-table tr:hover { background-color: var(--color-bg-hover); }
.class-cell { font-weight: bold; font-size: 1.2rem; }

/* Matrix Visual */
.matrix-visual { display: flex; justify-content: center; margin-top: 30px; position: relative; }
.matrix-content { display: flex; flex-direction: column; gap: 4px; align-items: center; margin-left: -60px; }
 .matrix-header-row { display: grid; grid-template-columns: 50px 150px 150px 150px; gap: 4px; }
.matrix-row { display: grid; grid-template-columns: 50px 150px 150px 150px; gap: 4px; }
.header-cell { text-align: center; font-weight: bold; color: var(--color-text-primary); padding-bottom: 10px; }

/* Specific column header colors to match the class boxes above */
.matrix-header-row > div:nth-child(2) { color: var(--color-neon); }
.matrix-header-row > div:nth-child(3) { color: var(--color-blue); }
.matrix-header-row > div:nth-child(4) { color: var(--color-purple); }
.header-cell-side { display: flex; align-items: center; justify-content: center; font-weight: bold; color: var(--color-text-secondary); }

/* Row header colors for X / Y / Z (distinct from A/B/C column colors) */
.matrix-content > .matrix-row:nth-child(2) .header-cell-side { color: var(--color-xyz-x); }
.matrix-content > .matrix-row:nth-child(3) .header-cell-side { color: var(--color-xyz-y); }
.matrix-content > .matrix-row:nth-child(4) .header-cell-side { color: var(--color-xyz-z); }

.matrix-cell {
  background-color: var(--color-bg-card); border: 1px solid var(--color-bg-hover);
  height: 100px; display: flex; flex-direction: column;
  align-items: center; justify-content: center; text-align: center;
  transition: all 0.2s; padding: 10px;
}
.matrix-cell:hover { background-color: var(--color-bg-hover); border-color: var(--color-neon); }
.cell-ax { background: rgba(57, 255, 20, 0.2); }
.cell-bx, .cell-ay { background: rgba(0, 212, 255, 0.15); }
.cell-cz { background: rgba(255, 107, 107, 0.2); }

/* View-specific spacing & width tweaks to avoid cards touching/overlapping */
.abc-xyz-view .container { max-width: 1200px; }
.abc-xyz-view .grid-3 { gap: 2rem; grid-template-columns: repeat(3, 1fr); }
.abc-xyz-view .class-card { padding: 0; }
.abc-xyz-view .class-body { padding: 22px; }
.abc-xyz-view .class-card .class-header { border-top-left-radius: 12px; border-top-right-radius: 12px; }

/* Results */
.results-summary { margin-top: 30px; }
.stat-box { background: var(--color-bg-hover); padding: 20px; border-radius: 8px; text-align: center; }
.stat-value { font-size: 2rem; font-weight: bold; }
.stat-label { color: var(--color-text-secondary); margin-top: 5px; }
.text-neon { color: var(--color-neon); }
.text-blue { color: var(--color-blue); }
.text-purple { color: var(--color-purple); }
.savings-box { background: rgba(57, 255, 20, 0.1); padding: 15px; text-align: center; margin-top: 20px; border-radius: 8px; color: var(--color-neon); }
.impl-list { margin-top: 30px; }
.impl-list ul { padding-left: 20px; color: var(--color-text-secondary); }

.module-nav {
  display: flex; justify-content: space-between; margin-top: 60px;
  padding-top: 20px; border-top: 1px solid var(--color-bg-hover);
}

@media (max-width: 700px) {
  .matrix-row { grid-template-columns: 30px 1fr 1fr 1fr; }
  .matrix-cell { font-size: 0.8rem; height: 80px; }
  .grid-3 { grid-template-columns: 1fr; }
}

/* Exercise Styles */
.exercise-card { padding: 30px; }
.exercise-intro { margin-bottom: 20px; font-size: 1.1rem; }

.formula-box {
  background: rgba(57, 255, 20, 0.1);
  border: 1px solid var(--color-neon);
  padding: 15px 20px;
  border-radius: 8px;
  margin-bottom: 15px;
  font-family: monospace;
  font-size: 1.1rem;
}

.classification-info {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 15px;
  margin-bottom: 25px;
  padding: 15px;
  background: var(--color-bg-hover);
  border-radius: 8px;
}

.class-badge {
  padding: 5px 12px;
  border-radius: 4px;
  font-weight: bold;
  font-size: 0.9rem;
}
.class-badge.class-x { background: rgba(57, 255, 20, 0.2); color: var(--color-neon); }
.class-badge.class-y { background: rgba(0, 212, 255, 0.2); color: var(--color-blue); }
.class-badge.class-z { background: rgba(189, 0, 255, 0.2); color: var(--color-purple); }

.exercise-table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
}
.exercise-table th,
.exercise-table td {
  padding: 15px;
  text-align: center;
  border-bottom: 1px solid var(--color-bg-hover);
}
.exercise-table th {
  color: var(--color-neon);
  font-weight: 600;
  background: var(--color-bg-hover);
}
.dataset-label {
  font-weight: bold;
  font-size: 1.2rem;
  color: var(--color-blue);
}

.exercise-input,
.exercise-select {
  padding: 10px 15px;
  border: 2px solid var(--color-bg-hover);
  border-radius: 6px;
  background: var(--color-bg-card);
  color: var(--color-text-primary);
  font-size: 1rem;
  text-align: center;
  width: 100px;
  transition: all 0.2s;
}
.exercise-input:focus,
.exercise-select:focus {
  border-color: var(--color-blue);
  outline: none;
}
.exercise-input.correct,
.exercise-select.correct {
  border-color: var(--color-success) !important;
  background: rgba(57, 255, 20, 0.1);
}
.exercise-input.wrong,
.exercise-select.wrong {
  border-color: var(--color-error) !important;
  background: rgba(255, 107, 107, 0.1);
}

.exercise-actions {
  text-align: center;
  margin-top: 20px;
}

.exercise-feedback {
  margin-top: 25px;
  padding: 20px;
  border-radius: 12px;
  border-left: 5px solid;
}
.exercise-feedback.fb-success {
  background: rgba(57, 255, 20, 0.1);
  border-color: var(--color-success);
}
.exercise-feedback.fb-partial {
  background: rgba(255, 193, 7, 0.1);
  border-color: #ffc107;
}
.solution-details {
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid var(--color-bg-hover);
}
.solution-details ul {
  list-style: none;
  padding: 0;
  margin-top: 10px;
}
.solution-details li {
  padding: 8px 0;
  font-family: monospace;
  color: var(--color-text-secondary);
}

/* ABC Exercise specific styles */
.mt-md { margin-top: 20px; }
.text-muted { color: var(--color-text-secondary); font-size: 0.9rem; margin-bottom: 10px; }

.class-badge.class-a { background: rgba(57, 255, 20, 0.2); color: var(--color-neon); }
.class-badge.class-b { background: rgba(0, 212, 255, 0.2); color: var(--color-blue); }
.class-badge.class-c { background: rgba(189, 0, 255, 0.2); color: var(--color-purple); }

.wide-input {
  width: 140px !important;
}

.abc-calc-table td {
  vertical-align: middle;
}

.solution-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
  font-size: 0.85rem;
}
.solution-table th,
.solution-table td {
  padding: 8px 10px;
  text-align: center;
  border: 1px solid var(--color-bg-hover);
}
.solution-table th {
  background: var(--color-bg-hover);
  color: var(--color-neon);
  font-weight: 600;
}
.solution-table tr:nth-child(odd) {
  background: rgba(255,255,255,0.02);
}

/* Drag & Drop Styles */
.draggable-row {
  cursor: grab;
  transition: all 0.2s ease;
}
.draggable-row:active {
  cursor: grabbing;
}
.draggable-row.dragging {
  opacity: 0.5;
  background: var(--color-bg-hover);
}
.draggable-row.drag-over {
  border-top: 3px solid var(--color-neon);
}
.drag-col {
  width: 40px;
  text-align: center;
}
.drag-handle {
  color: var(--color-text-secondary);
  cursor: grab;
  font-size: 1.2rem;
  user-select: none;
}
.drag-handle:hover {
  color: var(--color-neon);
}
.percent-input {
  width: 80px !important;
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
  
  .grid-3 {
    grid-template-columns: 1fr;
  }
  
  .class-card {
    margin-bottom: 15px;
  }
  
  .class-big {
    font-size: 2.5rem;
  }
  
  .class-body {
    padding: 15px;
  }
  
  /* Matrix Visual */
  .matrix-visual {
    padding-left: 0;
    overflow-x: auto;
  }
  .matrix-content { margin-left: -10px; }
  
  .matrix-row {
    grid-template-columns: 40px 100px 100px 100px;
  }
  
  .matrix-header-row {
    grid-template-columns: 40px 100px 100px 100px;
  }
  
  .matrix-cell {
    height: 80px;
    font-size: 0.85rem;
    padding: 8px;
  }
  
  .header-cell,
  .header-cell-side {
    font-size: 0.85rem;
  }
  
  /* Tables */
  .data-table th,
  .data-table td {
    padding: 10px 8px;
    font-size: 0.85rem;
  }
  
  .exercise-table th,
  .exercise-table td {
    padding: 10px 8px;
    font-size: 0.85rem;
  }
  
  .exercise-card {
    padding: 20px;
  }
  
  .formula-box {
    font-size: 0.9rem;
    padding: 12px 15px;
  }
  
  .classification-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    padding: 12px;
  }
  
  .class-badge {
    font-size: 0.8rem;
    padding: 4px 10px;
  }
  
  .exercise-input,
  .exercise-select {
    width: 80px;
    padding: 8px 10px;
    font-size: 0.9rem;
  }
  
  .wide-input {
    width: 100px !important;
  }
  
  .percent-input {
    width: 70px !important;
  }
  
  .drag-col {
    width: 30px;
  }
  
  .drag-handle {
    font-size: 1rem;
  }
  
  .exercise-actions {
    flex-direction: column;
    gap: 10px;
  }
  
  .exercise-actions .btn {
    width: 100%;
  }
  
  .solution-table {
    font-size: 0.75rem;
  }
  
  .solution-table th,
  .solution-table td {
    padding: 6px 5px;
  }
  
  /* Results */
  .stat-box {
    padding: 15px;
  }
  
  .stat-value {
    font-size: 1.5rem;
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
  
  .class-big {
    font-size: 2rem;
  }
  
  .class-body h4 {
    font-size: 0.95rem;
  }
  
  /* Matrix smaller */
  .matrix-visual {
    padding-left: 0;
  }
  .matrix-content { margin-left: 0; }
  
  .matrix-row {
    grid-template-columns: 30px 80px 80px 80px;
  }
  
  .matrix-header-row {
    grid-template-columns: 30px 80px 80px 80px;
  }
  
  .matrix-cell {
    height: 70px;
    font-size: 0.75rem;
    padding: 5px;
  }
  
  .matrix-cell small {
    font-size: 0.6rem;
  }
  
  .header-cell,
  .header-cell-side {
    font-size: 0.75rem;
  }
  
  /* Tables */
  .data-table {
    font-size: 0.8rem;
  }
  
  .data-table th,
  .data-table td {
    padding: 8px 5px;
  }
  
  .exercise-table {
    display: block;
    overflow-x: auto;
  }
  
  .exercise-table th,
  .exercise-table td {
    padding: 8px 5px;
    font-size: 0.8rem;
  }
  
  .dataset-label {
    font-size: 1rem;
  }
  
  .exercise-input,
  .exercise-select {
    width: 65px;
    padding: 6px 8px;
    font-size: 0.85rem;
  }
  
  .wide-input {
    width: 85px !important;
  }
  
  .percent-input {
    width: 55px !important;
  }
  
  .solution-table {
    font-size: 0.65rem;
  }
  
  .solution-table th,
  .solution-table td {
    padding: 4px 3px;
  }
  
  .exercise-feedback {
    padding: 15px;
  }
  
  .exercise-feedback h4 {
    font-size: 0.95rem;
  }
}

@media (max-width: 360px) {
  .matrix-row {
    grid-template-columns: 25px 65px 65px 65px;
  }
  
  .matrix-header-row {
    grid-template-columns: 25px 65px 65px 65px;
  }
  
  .matrix-cell {
    height: 60px;
    font-size: 0.65rem;
  }
  
  .exercise-input,
  .exercise-select {
    width: 55px;
    padding: 5px 6px;
    font-size: 0.8rem;
  }
  
  .wide-input {
    width: 70px !important;
  }
  
  .percent-input {
    width: 45px !important;
  }
}
</style>
