import mealSnapshot from "../public/meals-snapshot.json";

export type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string | null;
  strCategory: string | null;
  strArea: string | null;
  strInstructions: string | null;
  strYoutube: string | null;
  strSource: string | null;
  strTags: string | null;
  [key: string]: string | null;
};

export type Ingredient = { number: number; name: string; measure: string };
const API_URL = "https://www.themealdb.com/api/json/v1/1/search.php?s=chicken";

export async function getMeals(): Promise<Meal[]> {
  try {
    const response = await fetch(API_URL, { cache: "no-store" });
    if (!response.ok) throw new Error(`TheMealDB request failed (${response.status})`);
    const payload = (await response.json()) as { meals?: Meal[] | null };
    return Array.isArray(payload.meals) ? payload.meals : [];
  } catch (error) {
    console.warn("Live TheMealDB request unavailable; using the API snapshot:", error);
    return mealSnapshot.meals as Meal[];
  }
}

export function getIngredients(meal: Meal): Ingredient[] {
  return Array.from({ length: 20 }, (_, index) => {
    const number = index + 1;
    return { number, name: (meal[`strIngredient${number}`] || "").trim(), measure: (meal[`strMeasure${number}`] || "").trim() };
  }).filter(({ name }) => Boolean(name));
}

export function getInstructionSteps(meal: Meal): string[] {
  const instructions = (meal.strInstructions || "").replace(/\r/g, "").trim();
  if (!instructions) return [];
  const parts = instructions.split(/\n\s*\n|\n(?=\s*(?:STEP\s+)?\d+[.)]\s)/i).map((part) => part.trim()).filter(Boolean);
  if (parts.length > 1) return parts;
  return instructions.split(/\n+/).map((part) => part.trim()).filter(Boolean);
}
