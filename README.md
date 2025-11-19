# Symbolic Intelligence Ontology — Enterprise Edition

[![PWA Ready](https://img.shields.io/badge/PWA-ready-blue)](https://adrian-leonard-mociulschi.github.io/index.html)
[![License: CC BY 4.0](https://img.shields.io/badge/license-CC%20BY%204.0-green)](https://creativecommons.org/licenses/by/4.0/)
[![Linked Open Data](https://img.shields.io/badge/LOD-cloud-orange)](#)

A curated collection of **symbolic artefacts** on technoculture, ethical AI, and cultural philosophy — authored by **Dr. Adrian Leonard Mociulschi**.

## ✨ Tagline
*Presence Through Code — Where architecture meets meaning.*

## 📖 Overview
Welcome to our repository! Here, you'll find the Symbolic Intelligence Ontology along with its Progressive Web App implementation. This project draws inspiration from Voyager’s golden record, which serves as a cultural message to the cosmos.

Our objective is to establish a dynamic, meaningful, and engaging environment in which humans and other conscious entities can collaboratively explore stimulating topics, including:  

- Sentient beings and their cognitive motivations  
- The technocultural frameworks and ethical implications associated with artificial intelligence  
- Provocative philosophical insights poised for integration into linked open data  

## 🚀 Features
- **Network-First UX** — Real-time ticker updates with offline resilience
- **Zero Flicker Rendering** — Smooth transitions and instant fallback
- **Semantic Interoperability** — OWL/RDF ontology with VoID metadata
- **PWA Architecture** — Offline mode, responsive design, and cache strategies
- **Accessibility Ready** — ARIA roles, live regions, and optimized HTML structure

## 🏗 Architecture
- **Service Worker v26** — Network-first strategy, normalized cache keys, BroadcastChannel integration
- **Ticker.js** — Dynamic content updates, debounce logic, and restart-safe animations
- **HTML Layer** — Data-text fallback, semantic markup, and deferred scripts

## 📦 Installation

```bash
# Clone the repository (GitHub Pages user site)
git clone https://github.com/adrian-leonard-mociulschi/adrian-leonard-mociulschi.github.io.git
cd adrian-leonard-mociulschi.github.io

# Optional: Install dependencies if you use a build system (e.g., npm)
npm install

# Build and serve locally (for testing PWA and ticker updates)
npm run build
npm run serve
```

## 🌐 Live Demo
👉 [Try the PWA](https://adrian-leonard-mociulschi.github.io/index.html)

## 🌐 Linked Open Data
The ontology is published in standard semantic formats:
- `ontology.owl` — Core ontology in OWL/RDF
- `void.ttl` — VoID description in Turtle
- `void.rdf` — VoID description in RDF/XML

These files make the dataset interoperable with the **LOD Cloud** and reusable by researchers, AI systems, and cultural projects.

### 🔍 Example SPARQL Query

Use this query to explore **Sentient Entities** and their authored technocultural manifests:

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

Tip: Run this query on a SPARQL endpoint (e.g., Apache Jena Fuseki) after loading `ontology.owl`.

## 📸 Screenshots
![PWA Interface](assets/screenshots/pwa-ticker-mockup.png)

## 📜 Releases
**Latest Release:** `v3.0 — Presence Through Code`
- Network-first ticker updates
- Offline resilience and zero flicker UX
- HTML and accessibility optimizations

Previous versions:
- `v2.5-beta — Presence Through Code`
- `v2.0-beta — The Semantic Turn`
- `v1.0-stable — Genesis Release`

## ⚖️ License
Distributed under [Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/).

---
> *“Crafted as a manifesto of technoculture, where network logic meets aesthetic precision, and every update becomes a silent choreography in the algorithmic agora.”*

## 📚 How to Cite

When utilizing this ontology or its concepts, we kindly urge you to cite it:

**Adrian Leonard Mociulschi (2025). Symbolic Intelligence Ontology — Enterprise Edition. Version v3.0.**
Available at: https://adrian-leonard-mociulschi.github.io
License: CC BY 4.0
ORCID: https://orcid.org/0009-0006-9328-8518

### BibTeX
@misc{mociulschi2025symbolic,
  author       = {Adrian Leonard Mociulschi},
  title        = {Symbolic Intelligence Ontology — Enterprise Edition},
  year         = {2025},
  version      = {v3.0},
  url          = {https://adrian-leonard-mociulschi.github.io},
  license      = {CC-BY-4.0}
}
