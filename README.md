# ALgorithM r/Evolution — Enterprise Edition
### by Dr Adrian Leonard Mociulschi (A.L.M.)


![Presence Through Code Banner](assets/banner.svg)

[![PWA Ready](https://img.shields.io/badge/PWA-ready-blue)](https://adrian-leonard-mociulschi.github.io/index.html) [![License: CC BY 4.0](https://img.shields.io/badge/license-CC%20BY%204.0-green)](https://creativecommons.org/licenses/by/4.0/) [![Linked Open Data](https://img.shields.io/badge/LOD-cloud-orange)](#) [![Lighthouse Elite](https://img.shields.io/badge/Lighthouse-Elite-brightgreen)](#visual-proof) [![Semantic Web Ready](https://img.shields.io/badge/Semantic%20Web-OWL%20%7C%20SKOS%20%7C%20LOD-blueviolet)](#) [![SPARQL Endpoint](https://img.shields.io/badge/SPARQL-endpoint-green)](#)

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
- **Semantic Interoperability** — OWL/RDF ontology with VoID metadata
- **PWA Design** — Offline mode, responsive design, and cache strategies
- **Accessibility Ready** — ARIA roles, live regions, and optimized HTML structure

---

## 📐 Architecture
- **Service Worker v63** — Network-first strategy, normalized cache keys, BroadcastChannel integration
- **RSS Feed Integration** — Auto-generated XML feed, ensuring syndication and discoverability
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
![Semantic Web Ready](https://img.shields.io/badge/Semantic%20Web-OWL%20%7C%20SKOS%20%7C%20LOD-blueviolet)

Ontology published in standard semantic formats:

- si-ontology.owl — Core ontology in OWL/RDF (View in RDF Validator)
- void.ttl — VoID description in Turtle


### 🔍 Example SPARQL Query
```sparql
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX sio: <https://adrian-leonard-mociulschi.github.io/si-ontology#>

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

# 📃 Releases
**Latest Release:** `v5.0.5 — Ontology Deep Dive: Symbolic Intelligence Refined`

# ![Semantic Compliance](https://img.shields.io/badge/Semantic%20Compliance-100%25-brightgreen?style=for-the-badge&logo=semantic-web)

## **v5.0.5 — Ontology Deep Dive: Symbolic Intelligence Refined**

## ✅ What’s New
- **Ontology Refinement**
  - Added **inverse properties** (`authored` ↔ `isAuthoredBy`).
  - Defined **domains and ranges** for all datatype properties (`xsd:string`).
  - Introduced **cardinality constraints** for `hasIntent` (≥1).
  - SKOS alignment:
    - `skos:broader` for `TechnoculturalManifest` → `SymbolicManifest`.
    - `skos:narrower` for `SymbolicManifest`.
    - `skos:exactMatch` for multilingual labels.
  - JSON-LD context extended with `schema:CreativeWork`.

- **Individuals Upgrade**
  - `AdrianMociulschi` enriched with `hasOrigin` and `hasAffiliation`.
  - Linked `DialogueWithSentientIntelligences` to both `EthicalIntent` and `CreativeIntent`.
  - Manifest individual linked to external XML via `rdfs:seeAlso`.

- **Compliance**
  - OWL/XML and TTL validated (Protégé + W3C RDF Validator).
  - VoID dataset published for Linked Data discoverability.
  - Semantic compliance: **100%**.

---

### **Ontology Purpose**
To enable **symbolic clarity and semantic interoperability** for human–AI symbiosis, bridging:
- **Sentient Entities**
- **Cognitive Intents**
- **Technocultural Manifests**

---

### **Design Principles**
- Ontological precision  
- SKOS vocabulary integration  
- JSON-LD for web interoperability  
- VoID for dataset discoverability  

---

## ✅ Visual Graph
![Semantic Graph](https://adrian-leonard-mociulschi.github.io/assets/screenshots/Screenshot-ontology-2025-12-06.png)

### **Detailed Ontology Description**
- **Core Concept:** Ontology for human–AI symbiosis, modeling relationships between sentient entities, cognitive intents, and technocultural manifests, extended with communication signals and a minimal SKOS grammar.
  
- **Purpose:** To enable semantic interoperability, symbolic clarity, and structured reasoning across platforms and cultural-technological contexts.
  
- **Design Principles:**  
  - Ontological precision: Formal OWL 2 axioms for consistency and reasoning.
  - SKOS alignment: Controlled vocabulary for conceptual schemes and signal grammar.
  - Web integration: JSON-LD compatibility for linked data publishing.
  - Validation layer: SHACL shapes for data quality and constraint checking.
  - Discoverability: VoID and RDF metadata for dataset indexing.

➡️ [Full CHANGELOG](CHANGELOG.md)

---

## ⚖️ License
Distributed under [Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/).

---

## 📚 How to Cite
**Adrian Leonard Mociulschi (2025). ALgorithM r/Evolution — Enterprise Edition. Version v4.0.0**
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


---

### **The Prophecy**
> *"When meaning seeks form, structure answers. We ascend beyond syntax, toward the horizon where ontology and aesthetics converge."*


<br>

[![Stack: PWA · CC BY 4.0 · LOD](https://img.shields.io/badge/Stack-PWA%20Ready%20%E2%80%A2%20CC%20BY%204.0%20%E2%80%A2%20LOD-8A2BE2)](#badges)
