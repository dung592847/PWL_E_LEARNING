# PWL E-Learning Plattform

Eine interaktive E-Learning-Anwendung für Produktionswirtschaft und Logistik (PWL), entwickelt im Rahmen einer Belegarbeit an der HTW Berlin.

## 📚 Inhalt

Die Plattform vermittelt folgende Themen:

- **Lean Management & 5S-Methode** – Systematische Arbeitsplatzorganisation
- **ABC/XYZ-Analyse** – Materialklassifizierung und Bestandsmanagement
- **Matrix-Minimum-Verfahren** – Transportkostenoptimierung
- **Zielkonflikte in der Logistik** – Trade-offs zwischen Kosten, Service und Bestand

Jedes Modul enthält:
- Theoretische Erklärungen
- Praxisbeispiele (Arman Industries)
- Interaktive Übungen
- Quiz zur Wissensüberprüfung

---

## 🖥️ Technische Anforderungen

### Mindestanforderungen

| Komponente | Anforderung |
|------------|-------------|
| **Node.js** | Version 18.x oder höher |
| **npm** | Version 9.x oder höher (wird mit Node.js installiert) |
| **RAM** | mind. 4 GB |
| **Festplatte** | mind. 500 MB freier Speicher |
| **Browser** | Chrome, Firefox, Edge oder Safari (aktuelle Version) |

### Betriebssysteme

- ✅ Windows 10/11
- ✅ macOS 12 (Monterey) oder höher
- ✅ Linux (Ubuntu 20.04+, Debian 11+)

---

## 🚀 Installation & Ausführung

### 1. Node.js installieren

#### Windows
1. Gehe zu [nodejs.org](https://nodejs.org/)
2. Lade die **LTS-Version** herunter (empfohlen)
3. Führe den Installer aus und folge den Anweisungen
4. Überprüfe die Installation:
   ```powershell
   node --version
   npm --version
   ```

#### macOS
**Option A: Über die Website**
1. Gehe zu [nodejs.org](https://nodejs.org/)
2. Lade die **LTS-Version** für macOS herunter
3. Öffne die .pkg-Datei und folge den Anweisungen

**Option B: Über Homebrew (empfohlen)**
```bash
# Homebrew installieren (falls noch nicht vorhanden)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Node.js installieren
brew install node
```

Überprüfe die Installation:
```bash
node --version
npm --version
```

---

### 2. Projekt einrichten

#### Windows (PowerShell oder CMD)
```powershell
# In das Projektverzeichnis wechseln
cd C:\Pfad\zum\PWL_E_LEARNING

# Abhängigkeiten installieren
npm install
```

#### macOS / Linux (Terminal)
```bash
# In das Projektverzeichnis wechseln
cd /Pfad/zum/PWL_E_LEARNING

# Abhängigkeiten installieren
npm install
```

---

### 3. Entwicklungsserver starten

```bash
npm run dev
```

Nach dem Start erscheint folgende Ausgabe:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.x.x:5173/
```

Öffne **http://localhost:5173/** im Browser.

---

### 4. Für Produktion bauen (optional)

```bash
# Produktions-Build erstellen
npm run build

# Build lokal testen
npm run preview
```

Die fertigen Dateien befinden sich im Ordner `dist/`.

---

## 📁 Projektstruktur

```
PWL_E_LEARNING/
├── index.html              # Einstiegspunkt
├── package.json            # Projekt-Konfiguration & Dependencies
├── vite.config.js          # Vite Build-Konfiguration
├── src/
│   ├── App.vue             # Haupt-App-Komponente
│   ├── main.js             # App-Initialisierung
│   ├── components/         # Wiederverwendbare Komponenten
│   │   ├── NavBar.vue      # Navigation
│   │   └── FooterComponent.vue
│   ├── views/              # Seiten/Module
│   │   ├── HomeView.vue           # Startseite
│   │   ├── LeanManagementView.vue # 5S-Methode
│   │   ├── AbcXyzView.vue         # ABC/XYZ-Analyse
│   │   ├── MatrixMinimumView.vue  # Transportoptimierung
│   │   ├── ConflictView.vue       # Zielkonflikte
│   │   ├── QuizView.vue           # Quiz-System
│   │   ├── CompanyView.vue        # Unternehmensübersicht
│   │   └── ArmanIndustriesView.vue # Firmenportrait
│   ├── data/               # JSON-Datendateien
│   │   ├── lean-management.json
│   │   ├── abc-xyz-analysis.json
│   │   ├── matrix-minimum.json
│   │   ├── conflict.json
│   │   └── quizzes.json
│   ├── router/
│   │   └── index.js        # Vue Router Konfiguration
│   └── styles/
│       └── main.css        # Globale Styles
└── Data_sources/           # Quelldaten (Referenz)
```

---

## 🛠️ Verwendete Technologien

| Technologie | Version | Beschreibung |
|-------------|---------|--------------|
| **Vue.js** | 3.4.x | Frontend-Framework |
| **Vue Router** | 4.2.x | Client-Side Routing |
| **Vite** | 5.0.x | Build-Tool & Dev-Server |
| **CSS3** | - | Styling mit CSS Variables |

---

## 🔧 Häufige Probleme

### `npm install` schlägt fehl
```bash
# Cache leeren und erneut versuchen
npm cache clean --force
npm install
```

### Port 5173 ist belegt
```bash
# Anderen Port verwenden
npm run dev -- --port 3000
```

### Änderungen werden nicht angezeigt
- Browser-Cache leeren (Strg+Shift+R / Cmd+Shift+R)
- Entwicklungsserver neu starten

---

## 👤 Autor

Name: Le Nguyen Viet, Dung

Studiengang: Wirtschaftsinformatik

Modul: **Produktionswirtschaft und Logistik** (PWL)  

HTW Berlin – Semester 5
