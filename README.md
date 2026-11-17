# Keziah Tisher — Cybersecurity Portfolio

Visually rich static GitHub Pages site (no Jekyll / no Minimal Mistakes):

**[https://ktishtish.github.io](https://ktishtish.github.io)**

Inspired by modern SOC-style portfolios (terminal navigation, metrics, activity feed, deep multi-page detail).

## Pages

| Path | Content |
|:---|:---|
| `index.html` | Hero, metrics, capability snapshot, recent activity, highlight certs, contact |
| `whoami.html` | Full profile, skill levels, toolchains, education, languages |
| `experience.html` | ODPC internship timeline + education |
| `projects.html` | Detailed project writeups + GitHub links |
| `certifications.html` | Credentials by category + badge slot |
| `learning.html` | Currently learning / pursuing |
| `contact.html` | Email, LinkedIn, GitHub, CV |

## Stack

- Plain HTML / CSS / JS
- `.nojekyll` so GitHub Pages serves files as-is
- Particles background, tilt cards, reveal-on-scroll
- CV: `assets/cv/keziah-tisher-cv.pdf`

## Local preview

```bash
python3 -m http.server 8000 --bind 127.0.0.1
```

Open `http://127.0.0.1:8000`.

## Updating

Edit the HTML pages directly. Replace `assets/images/bio-photo.jpg` or `assets/cv/keziah-tisher-cv.pdf` as needed.

### Badges & certificates (upload anytime)

1. Put **badge** PNGs in `assets/images/badges/` using the filenames in that folder’s README.
2. Put **certificate** images in `assets/images/certificates/` using the filenames in that folder’s README.
3. Commit and push — the Certifications page shows them automatically (no HTML edits required).

After merge to `master`, GitHub Pages publishes from the repository root.
