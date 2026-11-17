# Keziah Tisher — Cybersecurity Portfolio

Static GitHub Pages site: **[https://ktishtish.github.io](https://ktishtish.github.io)**

Professional portfolio for a cybersecurity & IT professional covering profile, projects, certifications, current learning, CV download, and contact links.

## Sections

- About & experience
- Projects (SOC labs, assessments, compliance tooling)
- Certifications & badges
- Currently learning / pursuing
- CV (PDF)
- Contact — email, LinkedIn, GitHub

## Local preview

```bash
python3 -m http.server 8000 --bind 127.0.0.1
```

Open `http://127.0.0.1:8000`.

## Updating content

| Item | Path |
|:---|:---|
| Page content | `index.html` |
| Styles | `assets/css/site.css` |
| CV PDF | `assets/cv/keziah-tisher-cv.pdf` |
| Photo | `assets/images/bio-photo.jpg` |
| Badge images (optional) | `assets/images/badges/` |

After merging to `master`, GitHub Pages serves the site from the repository root (`.nojekyll` disables Jekyll processing).
