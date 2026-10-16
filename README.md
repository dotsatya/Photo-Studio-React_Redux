# GifStudio

GifStudio is a small media discovery app built with React, TypeScript, Redux Toolkit, and Vite. Search for photos or GIFs, switch media types, browse paginated results, and open an item at its source.

## Features

- Search Unsplash photos and Giphy GIFs.
- Browse results in a responsive grid.
- Navigate through results with pagination.
- Track search, loading, error, and pagination state with Redux Toolkit.
- Use keyboard-friendly controls and responsive Tailwind CSS styling.

Video search and saved collections are not currently implemented.

## Requirements

- Node.js 20.19+ or 22.12+
- npm
- API keys for Unsplash and Giphy

## Getting started

1. Install dependencies:

   ```sh
   npm install
   ```

2. Create a local environment file from the example:

   ```sh
   cp .env.example .env
   ```

   On Windows PowerShell, use:

   ```powershell
   Copy-Item .env.example .env
   ```

3. Add your API keys to `.env`:

   ```dotenv
   VITE_UNSPLASH_KEY=your_unsplash_access_key
   VITE_TENOR_KEY=your_giphy_api_key
   ```

   `VITE_TENOR_KEY` is the existing environment variable name used by the app for its **Giphy** API request. Obtain keys from the [Unsplash Developers](https://unsplash.com/developers) and [Giphy Developers](https://developers.giphy.com/) portals.

4. Start the development server:

   ```sh
   npm run dev
   ```

   Open the local URL printed by Vite in your terminal.

## Available commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server. |
| `npm run build` | Type-check the app and create a production build in `dist/`. |
| `npm run preview` | Serve the production build locally. |
| `npm run lint` | Run ESLint across the project. |

## Using the app

1. Enter a search term and submit it.
2. Choose **Photos** or **GIFs** to switch the result type.
3. Use the page controls below the results to browse additional matches.
4. Select a result to open its source in a new tab.

The **Videos** tab currently displays a “coming soon” message.

## Project structure

```text
src/
├── api/                 # Unsplash and Giphy API requests
├── components/          # Search bar, media tabs, result grid and cards
├── pages/               # Page-level views
└── redux/
    ├── features/        # Search state and collection feature placeholder
    └── store.tsx        # Redux store and state types
```

## Environment and API key safety

Vite exposes variables prefixed with `VITE_` to browser code. These API keys are therefore not secrets once the app is built. Use keys intended for client-side use, apply provider-side restrictions where available, and never put private credentials in this project. Keep your local `.env` file out of version control; `.env.example` is the checked-in template.

## Troubleshooting

- **Search returns an authorization error:** Check that both keys are present, valid, and set in the project-root `.env` file. Restart the Vite server after changing environment variables.
- **Search works for one media type only:** Verify the corresponding provider key and API access.
- **Build fails:** Confirm your Node.js version meets the requirement, then run `npm install` and `npm run build`.
