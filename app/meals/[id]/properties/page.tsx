import { ArrowUpRight, Braces, Database, Info } from "lucide-react";
import { notFound } from "next/navigation";
import { MealShell } from "@/components/meal-shell";
import { getMeals } from "@/lib/meals";

export const dynamic = "force-dynamic";

const fields = [
  ["idMeal", "Unique recipe ID"], ["strMeal", "Meal name"], ["strMealAlternate", "Alternate name"],
  ["strCategory", "Category"], ["strArea", "Cuisine / region"], ["strTags", "Tags"],
  ["strDrinkAlternate", "Drink pairing"], ["strMealThumb", "Thumbnail URL"],
  ["strYoutube", "Video URL"], ["strSource", "Original source"], ["strImageSource", "Image source"],
  ["strCreativeCommonsConfirmed", "Creative Commons"], ["dateModified", "Last modified"],
  ["strInstructions", "Cooking instructions"],
] as const;

function isUrl(value: string) { return /^https?:\/\//i.test(value); }

export default async function MealProperties({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const meal = (await getMeals()).find((item) => item.idMeal === id);
  if (!meal) notFound();
  return <MealShell meal={meal} tab="properties"><div className="content-kicker">02 / DATA INSPECTOR</div><h2 className="detail-section-title">Behind the <em>recipe.</em></h2><p className="section-explainer">Each row represents a property on this meal object returned by TheMealDB. Empty API values are shown as null.</p><div className="data-layout"><div className="properties-panel"><div className="properties-header"><div><Database size={19} /><strong>Meal object</strong></div><span>{fields.length} primary properties</span></div><div className="property-list">{fields.map(([key, label]) => { const value = meal[key]; return <div className="property-row" key={key}><div className="property-key"><span>{label}</span><code>{key}</code></div><div className="property-value">{value ? isUrl(value) ? <a href={value} target="_blank" rel="noreferrer">Open resource <ArrowUpRight size={15} /></a> : key === "strInstructions" ? <details><summary>View cooking instructions</summary><p className="instructions-value">{value}</p></details> : <span>{value}</span> : <em className="null-value">null</em>}</div></div>; })}</div></div><aside className="data-aside"><div className="info-card"><Info size={22} /><h3>What is a property?</h3><p>Properties are named pieces of information attached to one meal. The key identifies the field, while the value contains the actual data.</p></div><div className="info-card dark"><Braces size={23} /><h3>And the children?</h3><p>The numbered <code>strIngredient</code> and <code>strMeasure</code> fields form the recipe's ingredient list.</p><a href={`/meals/${id}/ingredients`}>Explore ingredient children <ArrowUpRight size={17} /></a></div></aside></div><details className="raw-json"><summary><Braces size={18} /> View complete raw JSON object <span>All properties, including ingredient fields</span></summary><pre>{JSON.stringify(meal, null, 2)}</pre></details></MealShell>;
}
