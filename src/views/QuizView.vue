<!-- =============================================
     QuizView.vue - Interaktives Quiz-System
     Unterstützt Multiple Choice und Zuordnungsfragen
     ============================================= -->

<template>
  <div class="quiz-view">
    <header class="quiz-header">
      <div class="container">
        <h1>Wissensüberprüfung</h1>
        <p>Teste dein Wissen zu den gelernten Methoden</p>
      </div>
    </header>

    <div class="container">
      <!-- Quiz Selection Menu (if no quiz active) -->
      <section v-if="!currentQuizKey" class="quiz-menu">
        <div class="grid-2">
          <div 
            v-for="(quiz, key) in allQuizzes" 
            :key="key" 
            class="quiz-card-select"
            @click="startQuiz(key)"
          >
            <div class="quiz-icon">{{ getIcon(key) }}</div>
            <h3>{{ quiz.title }}</h3>
            <p>{{ quiz.description }}</p>
            <button class="btn btn-primary mt-md">Starten</button>
          </div>
        </div>
      </section>

      <!-- Active Quiz Interface -->
      <section v-else class="quiz-active">
        <div class="quiz-progress">
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: progressPercent + '%' }"></div>
          </div>
          <div class="step-text">Frage {{ currentQuestionIndex + 1 }} von {{ currentQuiz.questions.length }}</div>
        </div>

        <div class="question-container" v-if="!quizCompleted">
          <h2 class="question-text">{{ currentQuestion.question }}</h2>

          <!-- Multiple Choice Layout -->
          <div v-if="currentQuestion.type === 'multiple-choice'" class="options-grid">
            <button
              v-for="option in currentQuestion.options"
              :key="option.id"
              class="option-btn"
              :class="{
                'selected': selectedAnswer === option.id,
                'correct': showFeedback && option.id === currentQuestion.correctAnswer,
                'wrong': showFeedback && selectedAnswer === option.id && selectedAnswer !== currentQuestion.correctAnswer
              }"
              @click="selectOption(option.id)"
              :disabled="showFeedback"
            >
              <span class="opt-letter">{{ option.id.toUpperCase() }}</span>
              <span class="opt-text">{{ option.text }}</span>
            </button>
          </div>

          <!-- Matching Layout -->
          <div v-if="currentQuestion.type === 'matching'" class="matching-container">
            <p class="text-muted mb-md">Klicke zuerst links, dann rechts, um Paare zu bilden. Du kannst Zuordnungen durch erneutes Klicken ändern.</p>
            
            <div class="match-cols">
              <div class="match-col">
                <button 
                  v-for="(pair, idx) in currentMatchingState.leftSide"
                  :key="'L'+idx"
                  class="match-item"
                  :class="{ 
                    'selected': matchingSelection.left === pair.text,
                    'correct': showFeedback && isMatchingPairCorrect(pair.text),
                    'wrong': showFeedback && pair.assignedTo !== null && !isMatchingPairCorrect(pair.text)
                  }"
                  :style="getMatchColor(pair.text, 'left')"
                  @click="selectMatchLeft(pair.text)"
                  :disabled="showFeedback"
                >
                  {{ pair.text }}
                </button>
              </div>
              <div class="match-col">
                 <button 
                  v-for="(pair, idx) in currentMatchingState.rightSide"
                  :key="'R'+idx"
                  class="match-item"
                  :class="{ 
                    'correct': showFeedback && isRightCorrect(pair.text),
                    'wrong': showFeedback && isRightAssigned(pair.text) && !isRightCorrect(pair.text)
                  }"
                  :style="getMatchColor(pair.text, 'right')"
                  @click="selectMatchRight(pair.text)"
                  :disabled="showFeedback"
                >
                  {{ pair.text }}
                </button>
              </div>
            </div>
          </div>

          <!-- Calculation Layout (XYZ Analysis) -->
          <div v-if="currentQuestion.type === 'calculation'" class="calculation-container">
            <div class="calc-formula-box">
              <strong>Formel:</strong> {{ currentQuestion.instruction }}
            </div>
            <div class="calc-class-info">
              <strong>Klasseneinteilung:</strong> {{ currentQuestion.classInfo }}
            </div>
            
            <div class="calc-data-card">
              <div class="calc-data-row">
                <span class="calc-label">Mittelwert:</span>
                <span class="calc-value">{{ currentQuestion.data.mean }}</span>
              </div>
              <div class="calc-data-row">
                <span class="calc-label">Standardabweichung:</span>
                <span class="calc-value">{{ currentQuestion.data.stdDev }}</span>
              </div>
            </div>

            <div class="calc-inputs">
              <div class="calc-input-group">
                <label>Dein Variationskoeffizient (VK):</label>
                <input 
                  type="text" 
                  v-model="calcAnswer.vk" 
                  class="calc-input"
                  :class="{ 
                    'correct': showFeedback && isCalcVkCorrect, 
                    'wrong': showFeedback && !isCalcVkCorrect 
                  }"
                  placeholder="VK eingeben"
                  :disabled="showFeedback"
                />
              </div>
              <div class="calc-input-group">
                <label>Deine XYZ-Klasse:</label>
                <select 
                  v-model="calcAnswer.class" 
                  class="calc-select"
                  :class="{ 
                    'correct': showFeedback && isCalcClassCorrect, 
                    'wrong': showFeedback && !isCalcClassCorrect 
                  }"
                  :disabled="showFeedback"
                >
                  <option value="">-- Wählen --</option>
                  <option value="X">X</option>
                  <option value="Y">Y</option>
                  <option value="Z">Z</option>
                </select>
              </div>
            </div>
          </div>

          <!-- ABC Calculation Layout -->
          <div v-if="currentQuestion.type === 'abc-calculation'" class="calculation-container">
            <div class="calc-formula-box">
              <strong>Formel:</strong> {{ currentQuestion.instruction }}
            </div>
            <div class="calc-class-info">
              <strong>Klasseneinteilung:</strong> {{ currentQuestion.classInfo }}
            </div>
            
            <div class="calc-data-card abc-data-card">
              <div class="calc-data-row">
                <span class="calc-label">Artikel-Nr.:</span>
                <span class="calc-value">{{ currentQuestion.data.nr }}</span>
              </div>
              <div class="calc-data-row">
                <span class="calc-label">Wert pro Stück:</span>
                <span class="calc-value">{{ currentQuestion.data.value.toFixed(2).replace('.', ',') }} €</span>
              </div>
              <div class="calc-data-row">
                <span class="calc-label">Verbrauch:</span>
                <span class="calc-value">{{ currentQuestion.data.consumption.toLocaleString('de-DE') }} Stück</span>
              </div>
              <div class="calc-data-row info-row">
                <span class="calc-label">Gesamtsumme aller Verbrauchswerte:</span>
                <span class="calc-value-small">{{ currentQuestion.data.totalSum.toLocaleString('de-DE') }} €</span>
              </div>
              <div v-if="currentQuestion.data.cumulativeBefore > 0" class="calc-data-row info-row">
                <span class="calc-label">Kumulierter Anteil bisheriger Artikel:</span>
                <span class="calc-value-small">{{ currentQuestion.data.cumulativeBefore }}%</span>
              </div>
            </div>

            <div class="calc-inputs">
              <div class="calc-input-group">
                <label>Dein Verbrauchswert (€):</label>
                <input 
                  type="text" 
                  v-model="abcCalcAnswer.value" 
                  class="calc-input"
                  :class="{ 
                    'correct': showFeedback && isAbcCalcValueCorrect, 
                    'wrong': showFeedback && !isAbcCalcValueCorrect 
                  }"
                  placeholder="Verbrauchswert"
                  :disabled="showFeedback"
                />
              </div>
              <div class="calc-input-group">
                <label>Deine ABC-Klasse:</label>
                <select 
                  v-model="abcCalcAnswer.class" 
                  class="calc-select"
                  :class="{ 
                    'correct': showFeedback && isAbcCalcClassCorrect, 
                    'wrong': showFeedback && !isAbcCalcClassCorrect 
                  }"
                  :disabled="showFeedback"
                >
                  <option value="">-- Wählen --</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Matrix Transport Layout -->
          <div v-if="currentQuestion.type === 'matrix-transport'" class="matrix-transport-container">
            <div class="calc-formula-box">
              <strong>Aufgabe:</strong> {{ currentQuestion.instruction }}
            </div>
            
            <table class="transport-table">
              <thead>
                <tr>
                  <th>Quelle \ Ziel</th>
                  <th v-for="(dest, idx) in currentQuestion.data.destinations" :key="dest">
                    {{ dest }}<br><small>(Bedarf: {{ currentQuestion.data.demand[idx] }})</small>
                  </th>
                  <th>Angebot</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(source, sIdx) in currentQuestion.data.sources" :key="source">
                  <td><strong>{{ source }}</strong></td>
                  <td v-for="dest in currentQuestion.data.destinations" :key="dest" class="transport-cell">
                    <span class="cost-label">{{ currentQuestion.data.costs[source + '-' + dest] }}€</span>
                    <input 
                      type="text" 
                      inputmode="numeric"
                      v-model="matrixTransportAnswer[source + '-' + dest]"
                      @input="onlyNumbersQuiz($event, source + '-' + dest)"
                      :class="{ 
                        'correct': showFeedback && isMatrixCellCorrect(source + '-' + dest), 
                        'wrong': showFeedback && !isMatrixCellCorrect(source + '-' + dest) && matrixTransportAnswer[source + '-' + dest] > 0 
                      }"
                      placeholder="-"
                      :disabled="showFeedback"
                    />
                  </td>
                  <td class="supply-cell">{{ currentQuestion.data.supply[sIdx] }}</td>
                </tr>
                <tr class="demand-row">
                  <td><strong>Nachfrage</strong></td>
                  <td v-for="(demand, idx) in currentQuestion.data.demand" :key="idx">{{ demand }}</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
            
            <div class="transport-cost-display">
              <span>Deine Gesamtkosten: <strong class="text-neon">{{ calculateMatrixCost() }}€</strong></span>
              <span v-if="showFeedback"> | Optimale Kosten: <strong class="text-neon">{{ currentQuestion.totalCost }}€</strong></span>
            </div>
          </div>

          <!-- Feedback Area -->
          <div v-if="showFeedback" class="feedback-box" :class="isCorrect ? 'fb-success' : 'fb-error'">
            <h3>{{ isCorrect ? 'Richtig! 🎉' : 'Leider falsch 😕' }}</h3>
            <p>{{ currentQuestion.explanation }}</p>
            <button class="btn btn-primary mt-md" @click="nextQuestion">
              {{ isLastQuestion ? 'Ergebnis anzeigen' : 'Nächste Frage →' }}
            </button>
          </div>
          
          <!-- Check Button (only visible before feedback) -->
          <div v-else class="actions-row">
            <button 
              class="btn btn-primary" 
              @click="checkAnswer"
              :disabled="!canCheck"
            >
              Überprüfen
            </button>
          </div>
        </div>

        <!-- Result Screen -->
        <div v-else class="result-screen">
          <div class="score-circle">
            <span class="score-large">{{ score }}</span>
            <span class="score-total">/ {{ currentQuiz.questions.length }}</span>
          </div>
          <h2>Quiz beendet!</h2>
          <p class="result-msg">{{ resultMessage }}</p>
          
          <div class="result-actions">
            <button class="btn btn-primary" @click="resetQuiz">Nochmal spielen</button>
            <button class="btn btn-secondary" @click="currentQuizKey = null">Zur Quiz-Übersicht</button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import quizData from '../data/quizzes.json'

const route = useRoute()

// State
const allQuizzes = ref(quizData)
const currentQuizKey = ref(null)
const currentQuestionIndex = ref(0)
const score = ref(0)
const showFeedback = ref(false)
const quizCompleted = ref(false)
const selectedAnswer = ref(null) // For MC

// Matching State
const matchingSelection = ref({ left: null })
const currentMatchingState = ref({ leftSide: [], rightSide: [] })

// Calculation State (XYZ)
const calcAnswer = ref({ vk: '', class: '' })

// ABC Calculation State
const abcCalcAnswer = ref({ value: '', class: '' })

// Matrix Transport State
const matrixTransportAnswer = ref({})

// Computed
const currentQuiz = computed(() => currentQuizKey.value ? allQuizzes.value[currentQuizKey.value] : null)
const currentQuestion = computed(() => currentQuiz.value ? currentQuiz.value.questions[currentQuestionIndex.value] : null)
const progressPercent = computed(() => currentQuiz.value ? ((currentQuestionIndex.value + (quizCompleted.value ? 1 : 0)) / currentQuiz.value.questions.length) * 100 : 0)
const isLastQuestion = computed(() => currentQuiz.value && currentQuestionIndex.value === currentQuiz.value.questions.length - 1)

// Calculation helpers
const normalizeNumber = (input) => {
  if (!input) return null
  const normalized = input.toString().replace(',', '.').trim()
  const num = parseFloat(normalized)
  return isNaN(num) ? null : Math.round(num * 100) / 100
}

const normalizeAbcNumber = (input) => {
  if (!input) return null
  // Remove dots as thousand separators, replace comma with dot
  const normalized = input.toString().replace(/\./g, '').replace(',', '.').replace(/\s/g, '').trim()
  const num = parseFloat(normalized)
  return isNaN(num) ? null : Math.round(num)
}

const isCalcVkCorrect = computed(() => {
  if (!currentQuestion.value || currentQuestion.value.type !== 'calculation') return false
  const userVal = normalizeNumber(calcAnswer.value.vk)
  const correctVal = normalizeNumber(currentQuestion.value.correctVk)
  return userVal !== null && Math.abs(userVal - correctVal) < 0.05
})

const isCalcClassCorrect = computed(() => {
  if (!currentQuestion.value || currentQuestion.value.type !== 'calculation') return false
  return calcAnswer.value.class === currentQuestion.value.correctClass
})

// ABC Calculation helpers
const isAbcCalcValueCorrect = computed(() => {
  if (!currentQuestion.value || currentQuestion.value.type !== 'abc-calculation') return false
  const userVal = normalizeAbcNumber(abcCalcAnswer.value.value)
  const correctVal = currentQuestion.value.correctValue
  return userVal !== null && Math.abs(userVal - correctVal) < 100
})

const isAbcCalcClassCorrect = computed(() => {
  if (!currentQuestion.value || currentQuestion.value.type !== 'abc-calculation') return false
  return abcCalcAnswer.value.class === currentQuestion.value.correctClass
})

// Matrix Transport helpers
const parseMatrixInput = (val) => {
  if (val === null || val === '' || val === undefined) return 0
  const num = parseInt(val, 10)
  return isNaN(num) ? 0 : num
}

const onlyNumbersQuiz = (event, key) => {
  const value = event.target.value.replace(/[^0-9]/g, '')
  matrixTransportAnswer.value[key] = value
}

const isMatrixCellCorrect = (key) => {
  if (!currentQuestion.value || currentQuestion.value.type !== 'matrix-transport') return false
  const userVal = parseMatrixInput(matrixTransportAnswer.value[key])
  const correctVal = currentQuestion.value.solution[key] || 0
  return userVal === correctVal
}

const isMatrixTransportCorrect = computed(() => {
  if (!currentQuestion.value || currentQuestion.value.type !== 'matrix-transport') return false
  const solution = currentQuestion.value.solution
  for (const key of Object.keys(solution)) {
    if (!isMatrixCellCorrect(key)) return false
  }
  return true
})

const calculateMatrixCost = () => {
  if (!currentQuestion.value || currentQuestion.value.type !== 'matrix-transport') return 0
  let total = 0
  const costs = currentQuestion.value.data.costs
  for (const [key, amount] of Object.entries(matrixTransportAnswer.value)) {
    const num = parseMatrixInput(amount)
    if (num && costs[key]) {
      total += num * costs[key]
    }
  }
  return total
}

const isCorrect = computed(() => {
  if (!currentQuestion.value) return false
  if (currentQuestion.value.type === 'multiple-choice') {
    return selectedAnswer.value === currentQuestion.value.correctAnswer
  } else if (currentQuestion.value.type === 'matching') {
    // Matching nur korrekt wenn ALLE Paare richtig zugeordnet sind
    return isMatchingCorrect.value
  } else if (currentQuestion.value.type === 'calculation') {
    return isCalcVkCorrect.value && isCalcClassCorrect.value
  } else if (currentQuestion.value.type === 'abc-calculation') {
    return isAbcCalcValueCorrect.value && isAbcCalcClassCorrect.value
  } else if (currentQuestion.value.type === 'matrix-transport') {
    return isMatrixTransportCorrect.value
  }
  return false
})

const canCheck = computed(() => {
  if (currentQuestion.value.type === 'multiple-choice') return selectedAnswer.value !== null
  if (currentQuestion.value.type === 'matching') {
    // Check if all pairs have assignments
    return currentMatchingState.value.leftSide.every(i => i.assignedTo !== null)
  }
  if (currentQuestion.value.type === 'calculation') {
    return calcAnswer.value.vk.trim() !== '' && calcAnswer.value.class !== ''
  }
  if (currentQuestion.value.type === 'abc-calculation') {
    return abcCalcAnswer.value.value.trim() !== '' && abcCalcAnswer.value.class !== ''
  }
  if (currentQuestion.value.type === 'matrix-transport') {
    // Check if at least some inputs are filled
    const values = Object.values(matrixTransportAnswer.value)
    return values.some(v => v > 0)
  }
  return false
})

const resultMessage = computed(() => {
  const percentage = score.value / currentQuiz.value.questions.length
  if (percentage === 1) return "Perfekt! Du bist ein Experte! 🏆"
  if (percentage >= 0.7) return "Sehr gut gemacht! 👏"
  if (percentage >= 0.5) return "Gut, aber da geht noch mehr. 👍"
  return "Du solltest dir die Module nochmal ansehen. 📚"
})

// Methods
const getIcon = (key) => {
  if (key.includes('lean')) return '🔧'
  if (key.includes('abc')) return '📊'
  if (key.includes('matrix')) return '🔢'
  if (key.includes('conflict')) return '⚖️'
  return '❓'
}

const startQuiz = (key) => {
  currentQuizKey.value = key
  resetState()
}

const resetState = () => {
  currentQuestionIndex.value = 0
  score.value = 0
  showFeedback.value = false
  quizCompleted.value = false
  selectedAnswer.value = null
  initQuestionState()
}

const initQuestionState = () => {
  selectedAnswer.value = null
  showFeedback.value = false
  calcAnswer.value = { vk: '', class: '' }
  abcCalcAnswer.value = { value: '', class: '' }
  matrixTransportAnswer.value = {}
  
  if (currentQuestion.value && currentQuestion.value.type === 'matching') {
    // Setup shuffle matching - assignedTo speichert die Zuordnung (nicht sofort prüfen)
    const pairs = currentQuestion.value.pairs
    currentMatchingState.value = {
      leftSide: pairs.map((p, i) => ({ text: p.left, assignedTo: null, colorIndex: i })).sort(() => Math.random() - 0.5),
      rightSide: pairs.map(p => ({ text: p.right })).sort(() => Math.random() - 0.5)
    }
  }
  
  if (currentQuestion.value && currentQuestion.value.type === 'matrix-transport') {
    // Initialize empty matrix transport answers
    const data = currentQuestion.value.data
    for (const source of data.sources) {
      for (const dest of data.destinations) {
        matrixTransportAnswer.value[source + '-' + dest] = null
      }
    }
  }
}

const selectOption = (id) => {
  if (!showFeedback.value) selectedAnswer.value = id
}

// Matching Logic
const selectMatchLeft = (text) => {
  const item = currentMatchingState.value.leftSide.find(i => i.text === text)
  
  // Wenn bereits zugeordnet: Zuordnung aufheben
  if (item && item.assignedTo !== null) {
    item.assignedTo = null
    matchingSelection.value.left = null
    return
  }
  
  // Wenn bereits ausgewählt, abwählen
  if (matchingSelection.value.left === text) {
    matchingSelection.value.left = null
  } else {
    matchingSelection.value.left = text
  }
}

const selectMatchRight = (textRight) => {
  // Wenn rechts bereits zugeordnet ist: Zuordnung aufheben
  const assignedLeft = currentMatchingState.value.leftSide.find(i => i.assignedTo === textRight)
  if (assignedLeft && !matchingSelection.value.left) {
    assignedLeft.assignedTo = null
    return
  }
  
  if (!matchingSelection.value.left) return

  const textLeft = matchingSelection.value.left
  const lItem = currentMatchingState.value.leftSide.find(i => i.text === textLeft)
  
  // Prüfen ob rechts bereits zugeordnet ist - wenn ja, alte Zuordnung entfernen
  const oldLeftItem = currentMatchingState.value.leftSide.find(i => i.assignedTo === textRight)
  if (oldLeftItem) {
    oldLeftItem.assignedTo = null
  }
  
  // Neue Zuordnung setzen (ohne zu prüfen ob richtig)
  lItem.assignedTo = textRight
  matchingSelection.value.left = null
}

// Farben für Matching-Paare
const matchColors = [
  { bg: '#8b5cf6', border: '#a78bfa' },  // Violett
  { bg: '#06b6d4', border: '#22d3ee' },  // Cyan
  { bg: '#f59e0b', border: '#fbbf24' },  // Orange
  { bg: '#ec4899', border: '#f472b6' },  // Pink
  { bg: '#10b981', border: '#34d399' },  // Grün
  { bg: '#3b82f6', border: '#60a5fa' },  // Blau
]

const getMatchColor = (text, side) => {
  if (showFeedback.value) return {} // Nach Feedback keine Farben mehr
  
  if (side === 'left') {
    const item = currentMatchingState.value.leftSide.find(i => i.text === text)
    // Farbe zeigen wenn ausgewählt ODER zugeordnet
    if (item && (matchingSelection.value.left === text || item.assignedTo !== null)) {
      const color = matchColors[item.colorIndex % matchColors.length]
      return { backgroundColor: color.bg, borderColor: color.border, color: 'white' }
    }
  } else {
    // Rechte Seite: Farbe des zugehörigen linken Elements
    const leftItem = currentMatchingState.value.leftSide.find(i => i.assignedTo === text)
    if (leftItem) {
      const color = matchColors[leftItem.colorIndex % matchColors.length]
      return { backgroundColor: color.bg, borderColor: color.border, color: 'white' }
    }
  }
  return {}
}

// Hilfsfunktionen für Matching-Anzeige
const isRightAssigned = (text) => {
  return currentMatchingState.value.leftSide.some(i => i.assignedTo === text)
}

const isMatchingPairCorrect = (leftText) => {
  const lItem = currentMatchingState.value.leftSide.find(i => i.text === leftText)
  if (!lItem || !lItem.assignedTo) return false
  const correctPair = currentQuestion.value.pairs.find(p => p.left === leftText)
  return correctPair && correctPair.right === lItem.assignedTo
}

const isRightCorrect = (rightText) => {
  const lItem = currentMatchingState.value.leftSide.find(i => i.assignedTo === rightText)
  if (!lItem) return false
  const correctPair = currentQuestion.value.pairs.find(p => p.right === rightText)
  return correctPair && correctPair.left === lItem.text
}

// Berechnet ob alle Matching-Paare korrekt sind
const isMatchingCorrect = computed(() => {
  if (!currentQuestion.value || currentQuestion.value.type !== 'matching') return false
  return currentMatchingState.value.leftSide.every(item => isMatchingPairCorrect(item.text))
})

const checkAnswer = () => {
  if (currentQuestion.value.type === 'matching') {
    // Bei Matching: Punkte nur wenn alle Paare korrekt
    if (isMatchingCorrect.value) {
      score.value++
    }
  } else if (isCorrect.value) {
    score.value++
  }
  showFeedback.value = true
}

const nextQuestion = () => {
  if (isLastQuestion.value) {
    quizCompleted.value = true
  } else {
    currentQuestionIndex.value++
    initQuestionState()
  }
}

const resetQuiz = () => {
  resetState()
}

// Watch route params to direct start
watch(() => route.params.topic, (topic) => {
  if (topic) {
    // Map simplified topic to key
    const mapping = {
      'lean': 'leanQuiz',
      'abcxyz': 'abcXyzQuiz',
      'matrix': 'matrixQuiz',
      'conflict': 'conflictQuiz'
    }
    const key = mapping[topic]
    if (key && allQuizzes.value[key]) {
      startQuiz(key)
    }
  }
}, { immediate: true })

</script>

<style scoped>
.quiz-header {
  padding: var(--spacing-3xl) 0;
  text-align: center;
}

/* Quiz Menu */
.quiz-card-select {
  background: var(--color-bg-card);
  padding: 30px;
  border-radius: 12px;
  border: 1px solid var(--color-bg-hover);
  text-align: center;
  transition: transform 0.2s;
  cursor: pointer;
}
.quiz-card-select:hover {
  transform: translateY(-5px);
  border-color: var(--color-neon);
}
.quiz-icon { font-size: 3rem; margin-bottom: 15px; }

/* Active Quiz */
.quiz-progress { margin-bottom: 30px; }
.step-text { text-align: right; margin-top: 5px; color: var(--color-text-secondary); font-size: 0.9rem; }

.question-text { font-size: 1.5rem; margin-bottom: 30px; }

/* Options MC */
.options-grid { display: grid; gap: 15px; }
.option-btn {
  display: flex; align-items: center; gap: 15px;
  background: var(--color-bg-card);
  border: 2px solid transparent;
  padding: 20px;
  border-radius: 8px;
  color: var(--color-text-primary);
  cursor: pointer;
  text-align: left;
  font-size: 1rem;
  transition: all 0.2s;
}
.option-btn:hover:not(:disabled) { background: var(--color-bg-hover); }
.option-btn.selected { border-color: var(--color-blue); background: rgba(0,212,255,0.1); }
.option-btn.correct { border-color: var(--color-success) !important; background: rgba(57,255,20,0.1) !important; }
.option-btn.wrong { border-color: var(--color-error) !important; opacity: 0.7; }

.opt-letter { font-weight: bold; color: var(--color-neon); background: rgba(57,255,20,0.1); padding: 5px 10px; border-radius: 4px; }

/* Matching */
.match-cols { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; }
.match-col { display: flex; flex-direction: column; gap: 10px; }
.match-item {
  padding: 15px; background: var(--color-bg-card);
  border: 2px solid var(--color-bg-hover);
  color: var(--color-text-primary);
  border-radius: 8px; cursor: pointer;
  position: relative;
  transition: all 0.2s ease;
}
.match-item:hover:not(:disabled) { border-color: var(--color-neon); }
.match-item.selected { background: var(--color-blue); color: white; border-color: var(--color-blue); }
.match-item.correct { 
  background: var(--color-success) !important; 
  color: black !important; 
  border-color: var(--color-success) !important; 
}
.match-item.wrong { 
  background: var(--color-error) !important; 
  color: white !important; 
  border-color: var(--color-error) !important; 
}

.shake { animation: shake 0.5s; }
@keyframes shake {
  0% { transform: translateX(0); } 25% { transform: translateX(5px); }
  50% { transform: translateX(-5px); } 75% { transform: translateX(5px); } 100% { transform: translateX(0); }
}

/* Feedback */
.feedback-box {
  margin-top: 30px; padding: 20px; border-radius: 12px;
  background: var(--color-bg-card); border-left: 5px solid;
}
.fb-success { border-color: var(--color-success); }
.fb-error { border-color: var(--color-error); }
.actions-row { margin-top: 30px; text-align: right; }

/* Result */
.result-screen { text-align: center; padding: 40px; }
.score-circle {
  width: 150px; height: 150px; border-radius: 50%;
  border: 5px solid var(--color-neon);
  display: flex; align-items: center; justify-content: center;
  flex-direction: column; margin: 0 auto 30px;
  box-shadow: 0 0 30px var(--color-neon-dim);
}
.score-large { font-size: 3.5rem; font-weight: 800; color: var(--color-neon); }
.score-total { font-size: 1.2rem; color: var(--color-text-secondary); }
.result-msg { font-size: 1.2rem; margin-bottom: 30px; }
.result-actions { display: flex; justify-content: center; gap: 15px; }

@media (max-width: 768px) {
  .match-cols { grid-template-columns: 1fr; }
}

/* Calculation Layout */
.calculation-container {
  margin-top: 20px;
}

.calc-formula-box {
  background: rgba(57, 255, 20, 0.1);
  border: 1px solid var(--color-neon);
  padding: 15px 20px;
  border-radius: 8px;
  margin-bottom: 15px;
  font-family: monospace;
  font-size: 1rem;
}

.calc-class-info {
  background: var(--color-bg-hover);
  padding: 12px 20px;
  border-radius: 8px;
  margin-bottom: 25px;
  font-size: 0.95rem;
}

.calc-data-card {
  background: var(--color-bg-card);
  border: 2px solid var(--color-blue);
  border-radius: 12px;
  padding: 25px;
  margin-bottom: 25px;
}

.calc-data-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid var(--color-bg-hover);
}

.calc-data-row:last-child {
  border-bottom: none;
}

.calc-label {
  color: var(--color-text-secondary);
  font-size: 1rem;
}

.calc-value {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--color-neon);
}

.calc-inputs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.calc-input-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.calc-input-group label {
  font-weight: 600;
  color: var(--color-text-secondary);
}

.calc-input,
.calc-select {
  padding: 15px 20px;
  border: 2px solid var(--color-bg-hover);
  border-radius: 8px;
  background: var(--color-bg-card);
  color: var(--color-text-primary);
  font-size: 1.1rem;
  text-align: center;
  transition: all 0.2s;
}

.calc-input:focus,
.calc-select:focus {
  border-color: var(--color-blue);
  outline: none;
}

.calc-input.correct,
.calc-select.correct {
  border-color: var(--color-success) !important;
  background: rgba(57, 255, 20, 0.1);
}

.calc-input.wrong,
.calc-select.wrong {
  border-color: var(--color-error) !important;
  background: rgba(255, 107, 107, 0.1);
}

/* ABC Calculation specific */
.abc-data-card {
  border-color: var(--color-neon);
}

.info-row {
  background: rgba(57, 255, 20, 0.05);
  margin: 5px -25px;
  padding: 10px 25px !important;
}

.calc-value-small {
  font-size: 1.1rem;
  font-weight: bold;
  color: var(--color-blue);
}

/* Matrix Transport */
.matrix-transport-container {
  margin-top: 20px;
}

.transport-table {
  width: 100%;
  border-collapse: collapse;
  text-align: center;
  margin: 20px 0;
}

.transport-table th,
.transport-table td {
  border: 1px solid #333;
  padding: 12px;
}

.transport-table th {
  background: #111;
  color: var(--color-text-secondary);
}

.transport-table th small {
  display: block;
  font-weight: normal;
  opacity: 0.7;
  font-size: 0.75rem;
}

.transport-cell {
  position: relative;
  padding: 8px !important;
}

.transport-cell .cost-label {
  display: block;
  font-size: 0.75rem;
  color: var(--color-text-secondary);
  margin-bottom: 5px;
}

.transport-cell input {
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

.transport-cell input:focus {
  outline: none;
  border-color: var(--color-purple);
}

.transport-cell input.correct {
  border-color: var(--color-neon) !important;
  background: rgba(57, 255, 20, 0.15);
}

.transport-cell input.wrong {
  border-color: #ff4444 !important;
  background: rgba(255, 68, 68, 0.15);
}

.supply-cell {
  font-weight: bold;
  color: var(--color-purple);
}

.transport-cost-display {
  text-align: center;
  padding: 15px;
  background: var(--color-bg-hover);
  border-radius: 8px;
  margin-top: 15px;
}

@media (max-width: 500px) {
  .calc-inputs {
    grid-template-columns: 1fr;
  }
  
  .transport-cell input {
    width: 50px;
    padding: 6px;
  }
}

/* Additional Responsive Styles */
@media (max-width: 768px) {
  .quiz-header {
    padding: var(--spacing-xl) 0;
  }
  
  .quiz-header h1 {
    font-size: 1.8rem;
  }
  
  .quiz-card-select {
    padding: 20px;
  }
  
  .quiz-icon {
    font-size: 2.5rem;
    margin-bottom: 10px;
  }
  
  .question-text {
    font-size: 1.2rem;
    margin-bottom: 20px;
  }
  
  .option-btn {
    padding: 15px;
    font-size: 0.9rem;
  }
  
  .opt-letter {
    padding: 4px 8px;
    font-size: 0.85rem;
  }
  
  .match-cols {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .match-item {
    padding: 12px;
    font-size: 0.9rem;
  }
  
  .calc-formula-box {
    padding: 12px 15px;
    font-size: 0.9rem;
  }
  
  .calc-class-info {
    padding: 10px 15px;
    font-size: 0.85rem;
  }
  
  .calc-data-card {
    padding: 15px;
  }
  
  .calc-value {
    font-size: 1.2rem;
  }
  
  .calc-inputs {
    grid-template-columns: 1fr;
    gap: 15px;
  }
  
  .calc-input,
  .calc-select {
    padding: 12px 15px;
    font-size: 1rem;
  }
  
  .feedback-box {
    padding: 15px;
  }
  
  .feedback-box h3 {
    font-size: 1.1rem;
  }
  
  .score-circle {
    width: 120px;
    height: 120px;
  }
  
  .score-large {
    font-size: 2.5rem;
  }
  
  .score-total {
    font-size: 1rem;
  }
  
  .result-actions {
    flex-direction: column;
    gap: 10px;
  }
  
  .result-actions .btn {
    width: 100%;
  }
  
  /* Transport Table Mobile */
  .transport-table th,
  .transport-table td {
    padding: 8px 5px;
    font-size: 0.8rem;
  }
  
  .transport-cell input {
    width: 45px;
    padding: 6px;
    font-size: 0.9rem;
  }
  
  .transport-cost-display {
    font-size: 0.9rem;
    padding: 12px;
  }
}

@media (max-width: 480px) {
  .quiz-header {
    padding: var(--spacing-lg) 0;
  }
  
  .quiz-header h1 {
    font-size: 1.5rem;
  }
  
  .quiz-header p {
    font-size: 0.9rem;
  }
  
  .quiz-card-select {
    padding: 15px;
  }
  
  .quiz-card-select h3 {
    font-size: 1rem;
  }
  
  .quiz-card-select p {
    font-size: 0.85rem;
  }
  
  .quiz-icon {
    font-size: 2rem;
  }
  
  .question-container {
    padding: 0;
  }
  
  .question-text {
    font-size: 1.1rem;
    line-height: 1.4;
  }
  
  .option-btn {
    padding: 12px;
    gap: 10px;
  }
  
  .match-item {
    padding: 10px;
    font-size: 0.85rem;
  }
  
  .calc-data-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }
  
  .calc-label {
    font-size: 0.85rem;
  }
  
  .calc-value {
    font-size: 1.1rem;
  }
  
  .info-row {
    margin: 5px -15px;
    padding: 10px 15px !important;
  }
  
  .transport-table th small {
    font-size: 0.6rem;
  }
  
  .transport-cell .cost-label {
    font-size: 0.6rem;
  }
  
  .transport-cell input {
    width: 38px;
    padding: 5px;
    font-size: 0.8rem;
  }
}

@media (max-width: 360px) {
  .transport-table th,
  .transport-table td {
    padding: 5px 3px;
    font-size: 0.7rem;
  }
  
  .transport-cell input {
    width: 32px;
    padding: 4px;
    font-size: 0.75rem;
  }
}
</style>
