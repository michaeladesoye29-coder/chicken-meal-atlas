import Link from "@/components/native-link";
import { ArrowUpRight, CircleCheck, ListChecks, MapPin } from "lucide-react";
import { MealShell } from "@/components/meal-shell";
import { getIngredients, getInstructionSteps, getMeals } from "@/lib/meals";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function MealOverview({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const meal = (await getMeals()).find((item) => item.idMeal === id);
  if (!meal) notFound();
  const ingredients = getIngredients(meal);
  const steps = getInstructionSteps(meal);
  return <MealShell meal={meal} tab="overview"><div className="content-columns"><div className="main-column"><div className="content-kicker">01 / THE METHOD</div><h2 className="detail-section-title">Let's make <em>something good.</em></h2><p className="section-explainer">Follow the method from the original recipe entry.</p>{steps.length ? <div className="instruction-list">{steps.map((step, index) => <div className="instruction-step" key={index}><span className="step-number">{String(index + 1).padStart(2, "0")}</span><p>{step}</p></div>)}</div> : <p>Instructions are not provided for this meal yet.</p>}</div><aside className="detail-aside"><div className="aside-card"><div className="aside-icon"><ListChecks size={24} /></div><div className="content-kicker">YOUR SHOPPING LIST</div><h3>What goes in?</h3><p>This recipe contains {ingredients.length} ingredients.</p><ul className="mini-ingredients">{ingredients.slice(0, 6).map((ingredient) => <li key={ingredient.number}><CircleCheck size={16} /><span>{ingredient.name}</span></li>)}</ul>{ingredients.length > 6 && <span className="more-ingredients">+ {ingredients.length - 6} more ingredients</span>}<Link className="aside-link" href={`/meals/${id}/ingredients`}>See all ingredients <ArrowUpRight size={17} /></Link></div><div className="quick-info"><h4>AT A GLANCE</h4><div><span>Recipe ID</span><strong>#{meal.idMeal}</strong></div><div><span>Region</span><strong><MapPin size={13} />{meal.strArea || "Unknown"}</strong></div><div><span>Category</span><strong>{meal.strCategory || "—"}</strong></div><Link href={`/meals/${id}/properties`}>Inspect all API fields <ArrowUpRight size={15} /></Link></div></aside></div></MealShell>;
}
