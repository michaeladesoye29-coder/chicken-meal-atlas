# Chicken Meal Atlas 🍽️

A responsive React recipe explorer built with **Next.js**, **TypeScript**, and **TheMealDB API**. Browse chicken dishes from around the world, explore each meal's properties, and check off its ingredient list.

### [🌐 View the live website](https://chicken-meal-atlas-muyiwa.michaeladesoye123.chatgpt.site)

## Features

- **Recipe collection:** Image cards for chicken dishes, with live search, cuisine filters, and A–Z sorting.
- **Recipe overview:** Individual pages with cooking instructions, category, area, and video links when available.
- **Object properties:** A separate page displaying meal field names and values, plus expandable raw JSON.
- **Ingredient children:** A separate page pairing `strIngredient1`–`strIngredient20` with `strMeasure1`–`strMeasure20`, with an interactive checklist.
- **Responsive design:** Works on mobile phones, tablets, and desktop browsers.
- **Reliable data:** Loads the API at runtime and uses a bundled snapshot of the same public data if the API is temporarily unreachable.

## API

Data source: [TheMealDB chicken search endpoint](https://www.themealdb.com/api/json/v1/1/search.php?s=chicken)

```text
GET https://www.themealdb.com/api/json/v1/1/search.php?s=chicken
```

The response contains a `meals` array. Each meal object has properties such as `idMeal`, `strMeal`, `strCategory`, `strArea`, and `strInstructions`. The numbered ingredient and measurement fields are transformed into an array of child items for display.

## Run locally

You'll need Node.js 20.9 or newer and npm.

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

Other commands:

```bash
npm run build       # Production build
npm run start       # Run the production build
npm run typecheck   # Check TypeScript
```

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Browse all chicken recipes |
| `/meals/[id]` | Recipe overview and cooking method |
| `/meals/[id]/properties` | Inspect the meal object's properties |
| `/meals/[id]/ingredients` | View and check off ingredient children |

## Project structure

```text
app/                  Next.js pages and global styles
components/           Search, meal navigation, and ingredient checklist
lib/meals.ts          API fetch, ingredient pairing, instruction parsing
public/               Favicon and backup API response
vendor/               Shared UI stylesheet
```

Recipe text and images are provided by [TheMealDB](https://www.themealdb.com/).
