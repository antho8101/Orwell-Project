# Orwell Project — Décisions de brainstorm (mémoire de design)

Document de travail. Pas une spec finale. Mis à jour au fil des discussions (2026-07).

## Contexte (fiction de design / modèle de menace)

Société de surveillance de type orwellien : contrôle des messageries (Chat Control-like), censure des plateformes, pression légale sur les opérateurs d’infrastructure.  
Objectif produit : constellation d’outils utilisables **sans** devoir booter Tails pour chaque échange.

## Priorité produit

| Priorité | Décision |
|----------|----------|
| #1 | **Anonymat fort / métadonnées** (plus que “résistance totale à la censure”) |
| Promesse honnête | On rend difficile de prouver qui a dit quoi à qui ; on ne promet pas un réseau indestructible |
| OPSEC | La tech ne remplace pas la discipline utilisateur |

## Messagerie (v1)

- **Livraison : modèle B** — files / boîtes aveugles (store-and-forward), pas P2P direct obligatoire
- **Transport** : Tor vers les relais
- **Crypto** : primitives **éprouvées** (Double Ratchet / Noise, etc.) — pas d’algo “maison”
- **Identité** : clés locales, **pas** de téléphone / email
- **Invitation** : QR / lien `orwell://` **one-shot**
- **Éphémère** : par défaut ; timer démarre à la **lecture** + TTL max côté file
- **Dead man’s switch** : sortie volontaire (ex. Ctrl×2 → gros bouton → Entrée×2), pas un détecteur magique de compromission en ligne
- **Coffre leurre** : PIN de contrainte recommandé
- **Place publique → DM** : sur invitation / demande en v1 (anti-spam)
- **Lecture seule** du fil / vidéo : OK sans compte
- **Multi-appareils** : v1 = 1 appareil principal (sync fluide = plus tard)

## Stack conceptuelle

```
Identité (clés)
  → Transport obscurci (Tor)
  → Messages E2E (ratchet) via files aveugles
  → Contenu lourd / pages (IPFS-like, plus tard)
```

- **Tor** = tuyau
- **IPFS-like** = médias / manifests (pas anonymat magique par défaut)
- **Freenet/Hyphanet** = inspiration, pas runtime v1
- **Blockchain** = optionnelle (anti-spam / ancrage), **pas** pour le chat temps réel

## Écosystème

Ordre de construction :

1. **Courrier** (app messagerie dédiée)
2. Partage de fichiers / samizdat
3. **Place publique** (tribune type X)
4. Vidéo (réutilise fichiers + tribune)

Socle partagé (conceptuel) : Orwell ID · Transport · Vault · Seal (crypto/formats).

## Surfaces produit (séparées)

| Surface | Forme | Contenu |
|---------|--------|---------|
| **Courier** | App bureau (Tauri → `.exe`) | Messagerie privée only |
| **Public Square** | Site web (navigateur) | Fil type X, opinions |
| **Kinotek** | Site web (même propriété / sous-route) | Vidéo |

Lien entre les deux : depuis le web, CTA *Message in Courier* (deep link / protocole `orwell://`).  
Pas de fil social embarqué dans l’app messagerie.

Habitude utilisateur cible (alignée usage courant) : social/vidéo dans le **navigateur** ; messagerie en **app bureau**.

## Plateforme (web-first → installable)

| Étape | Choix |
|-------|--------|
| 1 | UI web d’abord (mockups desktop pour Courier ; pages web pour Square) |
| 2 | Wrapper **Tauri** pour Courier uniquement |
| Pourquoi Tauri | Plus léger qu’Electron, surface d’attaque moindre |
| Mobile | Plus tard |

```text
Public Square / Kinotek  →  browser
Courier UI               →  browser (dev) → Tauri (.exe)
```

## UX / branding

- Esthétique : **propagande soviétique × sauce européenne** — tokens Figma dans [`DESIGN_TOKENS.md`](DESIGN_TOKENS.md) (`#103463` / `#E7C178`, Anton + Roboto Medium)
- Ton : humour qui dédramatise
- **UI language: English (native)**; French OK for internal docs / chat
- **Voice:** Cold War / 1950s, plain English — see [`VOICE.md`](VOICE.md)
- Product lexicon: **Courier**, **Letters**, **Papers**, **Passport**, **Safe-conduct**, **Burn after reading**, **Dead man’s switch**, **Cover story**, **Public Square**, **Kinotek**
- Landing + desktop journey mockup: `index.html`, `mockups/parcours.html`
- Recovery phrase: required without a server; framed as *passport*

## Hors scope (pour l’instant)

- Garantir l’indestructibilité face à une coupure réseau totale
- Résister à un labo forensics illimité après saisie physique
- Empêcher captures d’écran / trahison d’un correspondant
- Voix / visio (métadonnées très exposantes)
