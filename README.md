## Maslo Healthcare Demo

Maslo can be a powerful tool for triaging patients. In real time, Maslo can interpret signal processing input & map it to outputs in the audio & visual interface so that a patient feels acknowledged. On the backend, Maslo creates a list of observations based on its interaction with the patient.

This site serves as a visual representation of how Maslo can be used within a Health care enviornment to triage a patient and provide initial valuable data.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Description of Key Parts of Project](#key-parts)
  - [Folder Structure](#folder-structure)

## Tech Stack

This project was built with the following:

- `React`
- `react-sound`
- `node-sass`

## Description of Key Parts of Project

Components are separated by route - Doctor and Patient pages - as well as in a common folder if they are shared between pages.

Each page has a Dialogue component that holds an array of the imported assets in order.

Each main index component saves the current dialogueStep in state and then renders the appropriate dialogue based on the current step. On either audio ending (Patient page) or video ending (Doctor page) the dialogueStep increments up.

## Folder Structure

```
public/
  _redirects
  favicon.ico
  index.html
  manifest.json
src/
 app/
  common/
   maslo/
    index.js
   common.scss
   Nav.js
  Doctor/
   Data.js
   Dialogue.js
   doctor.scss
  Patient/
   Dialogue.js
   index.js
   patient.scss
  resources/
  App.js
 index.js
 index.scss
 serviceWorker.js
package-lock.json
package.json
README.md
```
