<template>
  <div class="company-profile">
    <!-- Header -->
    <div class="module-header">
      <div class="container">
        <span class="header-badge">🏭 Unternehmensportrait</span>
        <h1>Arman Industries GmbH</h1>
        <p class="subtitle">Das fiktive Unternehmen hinter unseren Fallbeispielen</p>
      </div>
    </div>

    <div class="container">
      <!-- Company Overview -->
      <section class="content-section">
        <div class="card card-large">
          <div class="company-intro">
            <div class="logo-placeholder">
              <span class="logo-text">AI</span>
            </div>
            <div class="intro-text">
              <h2>Über Arman Industries</h2>
              <p>
                Die <strong>Arman Industries GmbH</strong> ist ein mittelständisches Unternehmen 
                der Elektronik- und Maschinenbaubranche mit Hauptsitz in Dresden. 
                Als fiktives Musterunternehmen dient es in dieser E-Learning-Plattform 
                zur Veranschaulichung praxisnaher Anwendungsfälle aus der Produktionswirtschaft und Logistik.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Key Facts -->
      <section class="content-section">
        <h2 class="section-title">Unternehmensprofil</h2>
        <div class="facts-grid">
          <div class="fact-card">
            <div class="fact-icon">📅</div>
            <div class="fact-label">Gründung</div>
            <div class="fact-value">1967</div>
          </div>
          <div class="fact-card">
            <div class="fact-icon">👥</div>
            <div class="fact-label">Mitarbeiter</div>
            <div class="fact-value">~670</div>
          </div>
          <div class="fact-card">
            <div class="fact-icon">💰</div>
            <div class="fact-label">Jahresumsatz</div>
            <div class="fact-value">67 Mio. €</div>
          </div>
          <div class="fact-card">
            <div class="fact-icon">📦</div>
            <div class="fact-label">Lagerartikel</div>  
            <div class="fact-value">6.700+</div>
          </div>
        </div>
      </section>

      <!-- Business Areas -->
      <section class="content-section">
        <h2 class="section-title">Geschäftsbereiche</h2>
        <div class="areas-grid">
          <div class="area-card">
            <h3>🔌 Elektronikfertigung</h3>
            <p>Produktion von Steuerungskomponenten und Sensorik für die Automatisierungstechnik.</p>
            <ul>
              <li>Leiterplattenbestückung</li>
              <li>Gehäusemontage</li>
              <li>Qualitätsprüfung</li>
            </ul>
          </div>
          <div class="area-card">
            <h3>⚙️ Maschinenbau</h3>
            <p>Entwicklung und Fertigung von Spezialmaschinen für industrielle Kunden.</p>
            <ul>
              <li>Montageautomaten</li>
              <li>Prüfanlagen</li>
              <li>Handhabungssysteme</li>
            </ul>
          </div>
          <div class="area-card">
            <h3>🔧 Service & Wartung</h3>
            <p>Umfassender After-Sales-Service für alle gelieferten Anlagen.</p>
            <ul>
              <li>Ersatzteillogistik</li>
              <li>Wartungsverträge</li>
              <li>Fernwartung</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Challenges -->
      <section class="content-section">
        <h2 class="section-title">Herausforderungen im Unternehmen</h2>
        <div class="card">
          <p class="intro-text">
            Wie viele mittelständische Fertigungsunternehmen steht Arman Industries vor 
            typischen Herausforderungen der modernen Produktionswirtschaft:
          </p>
          <div class="challenges-list">
            <div class="challenge-item">
              <span class="challenge-icon">📊</span>
              <div>
                <strong>Bestandsoptimierung</strong>
                <p>Balance zwischen hoher Lieferbereitschaft und niedriger Kapitalbindung</p>
              </div>
            </div>
            <div class="challenge-item">
              <span class="challenge-icon">🏭</span>
              <div>
                <strong>Prozesseffizienz</strong>
                <p>Reduzierung von Verschwendung und Verbesserung der Arbeitsplatzorganisation</p>
              </div>
            </div>
            <div class="challenge-item">
              <span class="challenge-icon">🚚</span>
              <div>
                <strong>Logistikkosten</strong>
                <p>Optimierung von Transportwegen und Lieferantenbeziehungen</p>
              </div>
            </div>
            <div class="challenge-item">
              <span class="challenge-icon">⚖️</span>
              <div>
                <strong>Zielkonflikte</strong>
                <p>Abstimmung zwischen Vertrieb, Produktion und Controlling</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Connection to Modules -->
      <section class="content-section">
        <h2 class="section-title">Arman Industries in den Lernmodulen</h2>
        <p class="text-center mb-md">
          In jedem Lernmodul wird gezeigt, wie Arman Industries die jeweilige Methode erfolgreich angewendet hat:
        </p>
        <div class="modules-grid">
          <router-link to="/lean" class="module-link-card">
            <span class="module-icon">🔧</span>
            <h4>Lean Management & 5S</h4>
            <p>Einführung der 5S-Methode in der Elektronikfertigung</p>
          </router-link>
          <router-link to="/abc-xyz" class="module-link-card">
            <span class="module-icon">📊</span>
            <h4>ABC/XYZ-Analyse</h4>
            <p>Klassifizierung von 6.700+ Lagerartikeln</p>
          </router-link>
          <router-link to="/matrix" class="module-link-card">
            <span class="module-icon">🚚</span>
            <h4>Matrix-Minimum</h4>
            <p>Optimierung der Transportkostenverteilung</p>
          </router-link>
          <router-link to="/conflict" class="module-link-card">
            <span class="module-icon">⚖️</span>
            <h4>Zielkonflikte</h4>
            <p>Lösung des Bestands-Lieferbereitschaft-Dilemmas</p>
          </router-link>
        </div>
      </section>

      <!-- Navigation -->
      <div class="module-nav">
        <router-link to="/" class="btn btn-secondary">← Zur Startseite</router-link>
        <router-link to="/lean" class="btn btn-primary">Erstes Modul starten →</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.module-header {
  background: linear-gradient(135deg, rgba(0, 255, 136, 0.1), rgba(0, 136, 255, 0.1));
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

.subtitle {
  color: var(--color-text-secondary);
  font-size: 1.2rem;
}

.content-section {
  margin: 60px 0;
}

.section-title {
  font-size: 1.8rem;
  margin-bottom: 30px;
  text-align: center;
}

/* Company Intro */
.card-large {
  padding: 40px;
}

.company-intro {
  display: flex;
  gap: 40px;
  align-items: center;
}

.logo-placeholder {
  width: 120px;
  height: 120px;
  background: linear-gradient(135deg, var(--color-neon), #0088ff);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.logo-text {
  font-size: 3rem;
  font-weight: bold;
  color: var(--color-bg);
}

.intro-text h2 {
  margin-bottom: 15px;
}

.intro-text p {
  color: var(--color-text-secondary);
  line-height: 1.8;
  font-size: 1.1rem;
}

/* Facts Grid */
.facts-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.fact-card {
  background: var(--color-bg-card);
  border: 1px solid var(--color-bg-hover);
  border-radius: 12px;
  padding: 30px 20px;
  text-align: center;
  transition: all 0.3s ease;
}

.fact-card:hover {
  border-color: var(--color-neon);
  transform: translateY(-5px);
}

.fact-icon {
  font-size: 2.5rem;
  margin-bottom: 10px;
}

.fact-label {
  color: var(--color-text-secondary);
  font-size: 0.9rem;
  margin-bottom: 5px;
}

.fact-value {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--color-neon);
}

/* Areas Grid */
.areas-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 25px;
}

.area-card {
  background: var(--color-bg-card);
  border: 1px solid var(--color-bg-hover);
  border-radius: 12px;
  padding: 30px;
}

.area-card h3 {
  margin-bottom: 15px;
  font-size: 1.3rem;
}

.area-card p {
  color: var(--color-text-secondary);
  margin-bottom: 15px;
}

.area-card ul {
  list-style: none;
  padding: 0;
}

.area-card li {
  padding: 5px 0;
  color: var(--color-text-secondary);
}

.area-card li::before {
  content: "→ ";
  color: var(--color-neon);
}

/* Challenges */
.challenges-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-top: 30px;
}

.challenge-item {
  display: flex;
  gap: 15px;
  padding: 20px;
  background: var(--color-bg-hover);
  border-radius: 10px;
}

.challenge-icon {
  font-size: 2rem;
}

.challenge-item strong {
  display: block;
  margin-bottom: 5px;
}

.challenge-item p {
  color: var(--color-text-secondary);
  font-size: 0.9rem;
  margin: 0;
}

/* Modules Grid */
.modules-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.module-link-card {
  background: var(--color-bg-card);
  border: 1px solid var(--color-bg-hover);
  border-radius: 12px;
  padding: 25px;
  text-align: center;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
}

.module-link-card:hover {
  border-color: var(--color-neon);
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 255, 136, 0.1);
}

.module-icon {
  font-size: 2.5rem;
  display: block;
  margin-bottom: 15px;
}

.module-link-card h4 {
  margin-bottom: 10px;
  color: var(--color-text);
}

.module-link-card p {
  color: var(--color-text-secondary);
  font-size: 0.85rem;
  margin: 0;
}

/* Navigation */
.module-nav {
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
  padding: 20px 0;
}

/* Utilities */
.text-center {
  text-align: center;
}

.mb-md {
  margin-bottom: 30px;
}

.intro-text {
  font-size: 1.1rem;
  color: var(--color-text-secondary);
}

/* Responsive */
@media (max-width: 1024px) {
  .facts-grid,
  .modules-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .areas-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .company-intro {
    flex-direction: column;
    text-align: center;
  }
  
  .facts-grid,
  .challenges-list,
  .modules-grid {
    grid-template-columns: 1fr;
  }
}
</style>
