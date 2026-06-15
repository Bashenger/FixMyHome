# FixMyHome 🏠

> **On-demand property maintenance, matched by proximity.**

FixMyHome is a synchronized, full-stack digital marketplace designed to streamline local property maintenance. [cite_start]Built incrementally across a 10-lab curriculum, the platform bridges the gap between neighborhood homeowners and local independent tradespeople by replacing fragmented manual listings with a transparent, trackable location-based ecosystem.

---

## 🛠️ Tech Stack & Ecosystem

The core application architecture leverages a modern unified framework environment:
* **Frontend:** HTML5, Tailwind CSS, Font Awesome
* **Client State & SPA:** React.js
* **Backend Services:** Node.js, Express.js
* **Database Infrastructure:** MongoDB (NoSQL Relational Schemas)
* **Framework Optimization:** Next.js (Hybrid SSR/CSR Rendering Architecture)

---

## 🏁 Curriculum Lab Milestones

[cite_start]This repository maps directly to the required course exercises. Each directory block builds on top of the previous layer:

### Module 1: Interactive Frontend Foundations
* [cite_start]**Lab 1 (Tailwind Responsive Layout):** Core landing page and marketplace structure utilizing semantic structural blocks and the Tailwind Typography plugin[cite: 40].
* [cite_start]**Lab 2 (HTML5 APIs):** Interactive integration of the native browser Geolocation API for proximity tracking and a Drag-and-Drop container for damage uploads[cite: 41].
* [cite_start]**Lab 3 (Event Handling):** Client-side pricing estimation tool powered by raw JavaScript event streams (`input`, `change`)[cite: 42].
* [cite_start]**Lab 4 (Vanilla JS with Database):** Local administrative provider directory testing data persistence mechanics via browser `localStorage`[cite: 43].

### Module 2: Component Architecture & SPA Control
* [cite_start]**Lab 5 (React Dynamic Profile):** Controlled React form handling live state inputs to render real-time public technician preview cards[cite: 44].
* [cite_start]**Lab 6 (React SPA CRUD Dashboard):** Complete single-page application built with `react-router-dom` to manage service bookings (**C**reate, **R**ead, **U**pdate, **D**elete)[cite: 45].

### Module 3: Enterprise Services & Production Optimization
* [cite_start]**Lab 7 (Node.js File System Module):** Server-side background action tracker and text invoice output utilities driven by the native Node `fs` engine[cite: 45].
* [cite_start]**Lab 8 (RESTful Services with Express & MongoDB):** Production API layer connecting scalable Express.js routing pathways to a document-driven MongoDB architecture[cite: 46].
* [cite_start]**Lab 9 (Next.js Hybrid Rendering):** High-speed directory optimization splitting Server-Side Rendering (SSR) for directory SEO alongside Client-Side Rendering (CSR) for live status updates[cite: 47].
* [cite_start]**Lab 10 (Tailwind + Next.js Mobile-First Optimization):** Mobile-first design refactor ensuring critical emergency booking pipelines function flawlessly on smartphone viewports[cite: 48].

---

## 📂 Project Structure

```text
fixmyhome-monorepo/
├── 01-vanilla-frontend/      # Labs 1, 2, 3, 4 (HTML5, Tailwind, Vanilla JS)
├── 02-react-dashboard/       # Labs 5, 6 (React SPA / Client CRUD Lifecycle)
├── 03-express-backend/       # Labs 7, 8 (Node.js Server, Express API, MongoDB)
└── 04-nextjs-app/            # Labs 9, 10 (Next.js Hybrid Production Environment)
