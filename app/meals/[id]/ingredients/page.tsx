import Link from "@/components/native-link";
import { ArrowUpRight, Braces, ChefHat, Layers3 } from "lucide-react";
import { notFound } from "next/navigation";
import { IngredientChecklist } from "@/components/ingredient-checklist";
import { MealShell } from "@/components/meal-shell";
import { getIngredients, getMeals } from "@/lib/meals";

export const dynamic = "force-dynamic";

export default async function MealIngredients({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const meal = (await getMeals()).find((item) => item.idMeal === id);
  if (!meal) notFound();
  const ingredients = getIngredients(meal);
  return <MealShell meal={meal} tab="ingredients"><div className="content-columns"><div className="main-column"><div className="content-kicker">03 / INGREDIENT CHILDREN</div><h2 className="detail-section-title">Every little <em>ingredient.</em></h2><p className="section-explainer">The {ingredients.length} items that make this recipe happen. Check off the ones you already have.</p><IngredientChecklist ingredients={ingredients} /></div><aside className="detail-aside"><div className="aside-card ingredient-explainer"><div className="aside-icon"><Layers3 size={24} /></div><div className="content-kicker">UNDER THE HOOD</div><h3>How children work</h3><p>The API stores ingredients in numbered fields. This app pairs each ingredient with its matching measurement, then displays each pair as a child item.</p><div className="code-example"><span><Braces size={15} /> API field pairing</span><code>strIngredient1</code><code>strMeasure1</code><span className="code-arrow">↓</span><strong>{ingredients[0]?.name || "Ingredient"} <small>· {ingredients[0]?.measure || "Measure"}</small></strong></div><Link className="aside-link" href={`/meals/${id}/properties`}>View object properties <ArrowUpRight size={17} /></Link></div><div className="small-promo"><ChefHat size={26} /><h4>Ready to cook?</h4><p>Head back to the method and put everything together.</p><Link href={`/meals/${id}`}>See cooking method <ArrowUpRight size={16} /></Link></div></aside></div></MealShell>;
}
