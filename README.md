# React Portfolio (Headless WordPress + ACF)

This project is a personal portfolio built with **React (Vite)** and powered by a **Headless WordPress backend** using **Advanced Custom Fields (ACF)**.
It demonstrates how to fetch structured content from a CMS and render it dynamically on a modern frontend.

The goal was to create a fast, maintainable portfolio site while showing familiarity with:

- React component architecture
- Working with REST APIs
- Clean, readable code
- A headless CMS workflow
- External service integrations (EmailJS)

---

## 🚀 Features

### ✔ Headless WordPress Integration

All content (hero text, about section, projects, tech stack, contact info) is managed through WordPress using ACF fields.
The React app fetches these via the WP REST API and renders them as plain text.

### ✔ React Components & Clean Structure

The project uses a clear structure for:

- Layout (`Header`, `MainContent`)
- Page sections (`Hero`, `Projects`, `About`, `Stack`, `Contact`)
- API utilities (fetching ACF fields from WordPress endpoints)

Each major file includes a brief header comment describing its purpose.

### ✔ No HTML Injection / Safe Rendering

Originally the project used `dangerouslySetInnerHTML` in a few places, but since all ACF fields are plain text, these were refactored to standard `{value}` rendering for clarity and safety.

### ✔ Contact Form via EmailJS

The contact form sends messages directly to an email inbox using EmailJS with:

- service ID
- template ID
- public key

No secrets are exposed, as EmailJS is designed for client-side use.

### ✔ Fast Build with Vite

Vite provides instant hot reloads and a small production bundle.

---

## 📁 Project Structure

```
src/
  api/                # Fetch functions for ACF fields
  components/
    layout/           # Header, MainContent
    sections/         # Hero, Projects, About, Stack, Contact
  assets/             # Static images
  App.jsx             # Root component
  main.jsx            # Entry point
```

Each file includes a top-of-file comment describing its role.

---

## 🛠 Tech Stack

- **React (Vite)**
- **Headless WordPress + ACF**
- **EmailJS**
- **CSS / Responsive Layout**
- **JavaScript (ES6+)**

---

## 🔌 Environment Variables

Create a `.env` file using:

```
VITE_EMAILJS_SERVICE_ID=xxxx
VITE_EMAILJS_TEMPLATE_ID=xxxx
VITE_EMAILJS_PUBLIC_KEY=xxxx
```

These values are public-safe and required for the contact form to work.

---

## ▶️ Running the Project Locally

```
npm install
npm run dev
```

Then open:

```
http://localhost:5173
```

---

## 📦 Production Build

```
npm run build
npm run preview
```

---

## 🧩 API Endpoints (WordPress)

Example endpoints queried by the project:

- `/wp-json/wp/v2/pages/<id>` – Homepage fields (hero, about, contact text)
- `/wp-json/wp/v2/project` – Custom post type for project entries
- `/wp-json/wp/v2/stack` – Custom post type for tech stack items

---

## 📄 License

This project is for personal portfolio purposes.
