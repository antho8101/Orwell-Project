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

Produit global imaginé : **site intégré** (tribune + vidéo + DM) **+** app Courrier à part entière.

## UX / branding

- Esthétique : propagande totalitaire détournée, marine `#0C2348` / sable `#E6D7A8`
- Ton : humour qui dédramatise
- Landing hero + mockup parcours : `index.html`, `mockups/parcours.html`
- Phrase de récupération : nécessaire sans serveur ; à humaniser (*passeport* / rituel), pas à supprimer

## Hors scope (pour l’instant)

- Garantir l’indestructibilité face à une coupure réseau totale
- Résister à un labo forensics illimité après saisie physique
- Empêcher captures d’écran / trahison d’un correspondant
- Voix / visio (métadonnées très exposantes)
