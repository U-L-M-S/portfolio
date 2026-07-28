# Portfolio

Personal portfolio website of **U. Levi M. Seebacher** — focused on coding and IT security.

The site is a lightweight, bilingual (German / English) single-page site built with plain
HTML, CSS and JavaScript, served by Nginx inside a Docker container.

🇩🇪 [uinclis.de](https://uinclis.de) · 🇬🇧 [uinclis.com](https://uinclis.com)

## Features

- **Bilingual** — the correct language page is served automatically based on the requested
  domain (`uinclis.de` → German, everything else → English).
- **Responsive design** with an animated background and scroll effects.
- **Sections** — Home, Career, Projects and a Contact form (handled via [Formspree](https://formspree.io)).
- **Security-hardened Nginx** config with CSP, HSTS and other security headers.
- **Dockerized** and deployed through a GitHub Actions CI/CD pipeline.

## Tech Stack

- HTML5, CSS3, vanilla JavaScript
- [anime.js](https://animejs.com/) for animations
- [Boxicons](https://boxicons.com/) & [Poppins](https://fonts.google.com/specimen/Poppins) font
- Nginx (Alpine) + Docker / Docker Compose
- GitHub Actions (build + deploy)

## Project Structure

```
.
├── docker-compose.yml       # Service definition (portfolio on port 3001)
├── html/
│   ├── index.html           # Default page
│   ├── index-de.html        # German page
│   ├── index-en.html        # English page
│   ├── style.css
│   ├── script.js
│   ├── anime.min.js
│   ├── nginx.conf           # Nginx server + language routing + security headers
│   ├── Dockerfile
│   ├── pictures/            # Icons and images
│   ├── CV.pdf / Lebenslauf.pdf
│   └── user-regular.svg
└── .github/workflows/
    └── deploy.yml           # CI/CD pipeline
```

## Running Locally

Requires [Docker](https://www.docker.com/) and Docker Compose.

```bash
docker compose up --build
```

Then open <http://localhost:3001>.

To stop:

```bash
docker compose down
```

## Deployment

Pushes to the `main` branch trigger the GitHub Actions workflow, which builds the image and
deploys it to a self-hosted runner by pulling the latest changes and restarting the
container with `docker compose up -d --build`.
