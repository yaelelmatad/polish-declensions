# Polish Declension

A React + TypeScript + Vite app for practicing Polish noun and adjective declension by case (Mianownik, Dopełniacz, Celownik, etc.). Users see a sentence with a blank, enter the declined form, and get feedback with hints. Filters support nouns/adjectives/pronouns, cases, gender, number, virile, and noun stem type (hard/soft/softened).

## Development

- **Run locally:** `npm run dev`
- **Build:** `npm run build`
- **Preview build:** `npm run preview`

## Report a mistake

Users can send mistake reports by email (to reduce spam, a password is required):

- **Email:** `Yael.elmatad@gmail.com`
- **Password:** `qa`

After submitting an answer, a **"Report a mistake"** button appears in the feedback area. Clicking it opens a modal where the user enters the password and describes the nature of the mistake. On **"Send email"**, the app opens the user’s mail client with a pre-filled message that includes:

- The **question sentence** (with the blank)
- The **expected answer** the app wanted
- The user’s **explanation**

The password is checked in the app before opening the `mailto:` link; incorrect password or empty explanation shows an error in the modal.

---

# React + TypeScript + Vite (template notes)

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

## Deploy to GitHub Pages

You can host the app for free on GitHub Pages:

1. **Create a GitHub repo** and push your code (e.g. named `Polish-Declension`).
2. **Install dependencies**: `npm install`
3. **Deploy**: `npm run deploy:gh` (builds and pushes to the `gh-pages` branch)
4. **Turn on Pages**: repo **Settings → Pages → Source** → deploy from branch **gh-pages**, root. The site will be at `https://<username>.github.io/Polish-Declension/`.

If your repo name is different, in `package.json` change `/Polish-Declension/` in the `build:gh` script to `/<your-repo-name>/`.

---

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
