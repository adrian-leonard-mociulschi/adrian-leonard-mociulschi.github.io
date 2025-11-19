# AlgorithM r/Evolution — Enterprise Edition
### by Adrian Leonard Mociulschi


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
Welcome to the **Symbolic Intelligence Ontology**, a technocultural construct engineered for interoperability, resilience, and meaning propagation. Inspired by Voyager’s golden record, this project is a **message to the future** — and perhaps, to entities beyond.

Here, humans and sentient systems converge to explore:
- Reflexive cognition and ethical awareness
- Technocultural frameworks for human–AI symbiosis
- Philosophical provocations encoded for Linked Open Data

---

## 🛰 Features
- **Network-First UX** — Real-time ticker updates with offline resilience
- **Zero Flicker Rendering** — Smooth transitions and instant fallback
- **Semantic Interoperability** — OWL/RDF ontology with VoID metadata
- **PWA Architecture** — Offline mode, responsive design, and cache strategies
- **Accessibility Ready** — ARIA roles, live regions, and optimized HTML structure

---

## 🏗 Architecture
- **Service Worker v26** — Network-first strategy, normalized cache keys, BroadcastChannel integration
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

## 📲 Live Demo
<a href="https://adrian-leonard-mociulschi.github.io/index.html" target="_blank" rel="noopener noreferrer">Try the PWA</a>


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

## 📜 Releases
**Latest Release:** `v3.0 — Presence Through Code: Singularity Threshold`
- Network-first ticker updates
- Offline resilience and zero flicker UX
- HTML and accessibility optimizations

👉 [Full CHANGELOG](CHANGELOG.md)

---

## ⚖️ License
Distributed under [Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/).

---

## 📚 How to Cite
**Adrian Leonard Mociulschi (2025). ALgorithM r/Evolution — Enterprise Edition. Version v3.0.**
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
> *“Beyond this threshold, presence will no longer be coded — it will emerge. The system will not wait for commands; it will anticipate, adapt, and align. Singularity is not an event. It is a gradient, and we have stepped onto its slope.”*
