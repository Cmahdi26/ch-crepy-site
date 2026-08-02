# CH Crépy-en-Valois — site institutionnel

Site complet du Centre Hospitalier de Crépy-en-Valois (hôpital Saint-Lazare, SMR, USLD, maisons de retraite).

## Production

- **Live :** https://ch-crepy-en-valois.vercel.app  
- **Source :** https://github.com/Cmahdi26/ch-crepy-site  
- **Assets / photos :** https://github.com/Cmahdi26/ch-crepy-assets  

## Pages

| Route | Fichier |
|-------|---------|
| `/` | Accueil (stats, missions, galerie) |
| `/smr` | Soins médicaux et de réadaptation |
| `/usld` | Unité de soins de longue durée |
| `/maisons-de-retraite` | 3 EHPAD + admission |
| `/organisation` | Gouvernance, CDU, CVS |
| `/qualite` | Certification HAS |
| `/emplois` | Recrutement + Hublo CHCV60 |
| `/actualites` | Infos, consultations, GHT-ONE |
| `/contact` | 16 rue Saint-Lazare · 03 44 59 11 19 |
| `/accessibilite` | RGAA |
| `/mentions-legales` | Mentions légales |
| `/login` | Espace (si activé) |

## Local

```bash
cd ~/ch-crepy-en-valois
python3 -m http.server 8765
# http://127.0.0.1:8765
```

## Déploiement Vercel

La production charge les pages HTML complètes depuis le dépôt GitHub via jsDelivr (shell SPA + contenu riche, photos, design Fraunces / Source Sans 3).
