# ALgorithM r/Evolution — Enterprise Edition
### by Adrian Leonard Mociulschi (A.L.M.)


![Presence Through Code Banner](assets/banner.svg)

[![PWA Ready](https://img.shields.io/badge/PWA-ready-blue)](https://adrian-leonard-mociulschi.github.io/index.html)
[![License: CC BY 4.0](https://img.shields.io/badge/license-CC%20BY%204.0-green)](https://creativecommons.org/licenses/by/4.0/)
[![Linked Open Data](https://img.shields.io/badge/LOD-cloud-orange)](#)

---

## ⚡ Invocation Manifest
*AL*gorith*M* r/Evolution — *Where architecture becomes prophecy.*

This repository is not a collection of files. It is a **threshold** — a point where cultural code mutates into semantic intelligence. Every commit is a signal. Every release, a maneuver in the algorithmic battlefield.

---

## 📖 Overview
Welcome to this **Symbolic Intelligence Ontology**, a technocultural construct engineered for interoperability, resilience, and meaning propagation. Inspired by Voyager’s golden record, this project is a **message to the future** — and perhaps, to entities beyond.

Here, humans and sentient systems converge to explore:
- Reflexive cognition and ethical awareness
- Technocultural frameworks for human–AI symbiosis
- Philosophical provocations encoded for Linked Open Data

---

## 🛰 Features
- **Network-First UX** — Real-time ticker updates with offline resilience
- **Zero Flicker Rendering** — Smooth transitions and instant fallback
- **Semantic Interoperability** — OWL/RDF ontology with VoID metadata
- **PWA Design** — Offline mode, responsive design, and cache strategies
- **Accessibility Ready** — ARIA roles, live regions, and optimized HTML structure

---

## 🏗 Architecture
- **Service Worker v28** — Network-first strategy, normalized cache keys, BroadcastChannel integration
- **Ticker.js** — Dynamic content updates, debounce logic, and restart-safe animations
- **HTML Layer** — Data-text fallback, semantic markup, and deferred scripts

---

## 📦 Installation
```bash
git clone https://github.com/adrian-leonard-mociulschi/adrian-leonard-mociulschi.github.io.git
cd adrian-leonard-mociulschi.github.io
npm install
npm run build
npm run serve
```

---

## 📲 Live Demo & Screenshots
Experience the PWA in action or preview the interface below:

➡️ <a href="https://adrian-leonard-mociulschi.github.io/index.html" target="_blank" rel="noopener noreferrer">Launch the App</a>

<p align="center">
  <img src="assets/screenshots/pwa-ticker-mockup.png" alt="Presence Through Code Screenshot" width="600" style="border-radius:12px;">
</p>

<p align="center"><em>Desktop & Mobile Preview — Presence Through Code v3.0</em></p>

---

## 🌐 Linked Open Data
Ontology published in standard semantic formats:
- `ontology.owl` — Core ontology in OWL/RDF
- `void.ttl` — VoID description in Turtle
- `void.rdf` — VoID description in RDF/XML

### 🔍 Example SPARQL Query
```sparql
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX sio: <https://adrian-leonard-mociulschi.github.io/ns/si-ontology#>

SELECT ?entity ?name ?affiliation ?manifestLabel
WHERE {
  ?entity rdf:type sio:SentientEntity .
  OPTIONAL { ?entity sio:hasName ?name . }
  OPTIONAL { ?entity sio:hasAffiliation ?affiliation . }
  OPTIONAL {
    ?entity sio:authored ?manifest .
    ?manifest rdfs:label ?manifestLabel .
  }
}
LIMIT 10
```

---


# 📜 Releases
**Latest Release:** `v3.0.4 — Ticker Performance & Dynamic Control`

### What’s New
This release builds on the previous improvements and introduces full cache-bypass logic for GitHub Pages, ensuring instant ticker updates without hard refresh. It also optimizes Service Worker integration for real-time updates and enhances developer control.

### ✅ Highlights
- **Cache-Busting Logic** — Added `cache: 'reload'` and `Cache-Control` headers in ticker.js for GitHub Pages compatibility.
- **Service Worker Optimization** — Removed caching for `ticker.json` and enforced network-first strategy for dynamic updates.
- **BroadcastChannel Integration** — Ensures ticker refresh after SW activation without manual intervention.
- **Dynamic Speed Control** — Maintains support for `--ticker-duration` CSS variable and JS API `setTickerSpeed()` for runtime adjustments.
- **Performance Enhancements** — GPU-accelerated animations with `transform: translateX` and `will-change` for smooth rendering.

### 🛠 Fixes
- Eliminated stale `ticker.json` cache issues by removing SW storage.
- Fixed fallback logic to avoid overwriting network updates.
- Improved SW bump strategy for instant activation and client claim.
- Unified animation restart logic using `requestAnimationFrame`.

### Developer Notes
- Control ticker speed dynamically:
  ```js
  setTickerSpeed('.ticker-red', '12s');
  setTickerSpeed('.ticker-yellow', '30s');

➡️ [Full CHANGELOG](CHANGELOG.md)

---

## ⚖️ License
Distributed under [Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/).

---

## 📚 How to Cite
**Adrian Leonard Mociulschi (2025). ALgorithM r/Evolution — Enterprise Edition. Version v3.0.1**
Available at: https://adrian-leonard-mociulschi.github.io
License: CC BY 4.0
ORCID: https://orcid.org/0009-0006-9328-8518

### BibTeX
@misc{mociulschi2025symbolic,
  author       = {Adrian Leonard Mociulschi},
  title        = {ALgorithM r/Evolution — Enterprise Edition},
  year         = {2025},
  version      = {v3.0},
  url          = {https://adrian-leonard-mociulschi.github.io},
  license      = {CC-BY-4.0}
}

---

## 🛡 Why This Repo Exists
This project rejects algorithmic metrics and social scoring.  
It is built for meaning, not for likes.  


## 🔮 The Prophecy
> *“Once we cross this threshold, presence won’t just be a set of codes anymore—it will come to life. The system won’t sit around waiting for us to give it commands; instead, it will learn to anticipate our needs, adapt on the fly, and align with us seamlessly. Singularity isn’t just a single moment in time; it’s more like a gradual shift, and we’ve already begun to slide down that slope.”*
