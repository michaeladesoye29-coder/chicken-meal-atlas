"use client";

import Link from "@/components/native-link";
import { useMemo, useState } from "react";
import { ArrowUpRight, Search, SlidersHorizontal, X } from "lucide-react";
import type { Meal } from "@/lib/meals";

export function ExploreGrid({ meals }: { meals: Meal[] }) {
  const [query, setQuery] = useState("");
  const [area, setArea] = useState("All regions");
  const [sort, setSort] = useState("featured");
  const regions = useMemo(() => Array.from(new Set(meals.map((meal) => meal.strArea).filter((value): value is string => Boolean(value)))).sort(), [meals]);
  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    const result = meals.filter((meal) => (area === "All regions" || meal.strArea === area) && (!term || [meal.strMeal, meal.strArea, meal.strCategory, meal.strTags].some((value) => value?.toLowerCase().includes(term))));
    if (sort === "az") result.sort((a, b) => a.strMeal.localeCompare(b.strMeal));
    if (sort === "za") result.sort((a, b) => b.strMeal.localeCompare(a.strMeal));
    return result;
  }, [meals, area, query, sort]);
  return <><div className="filters-bar"><label className="search-field"><Search size={20} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search for a chicken dish..." aria-label="Search recipes" />{query && <button type="button" onClick={() => setQuery("")} aria-label="Clear search"><X size={17} /></button>}</label><div className="filter-controls"><label className="select-field"><SlidersHorizontal size={17} /><select value={area} onChange={(event) => setArea(event.target.value)} aria-label="Filter by region"><option>All regions</option>{regions.map((region) => <option key={region}>{region}</option>)}</select></label><label className="select-field sort-field"><select value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Sort recipes"><option value="featured">Featured order</option><option value="az">Name A–Z</option><option value="za">Name Z–A</option></select></label></div></div><div className="results-status"><span>Showing <strong>{filtered.length}</strong> of <strong>{meals.length}</strong> recipes</span>{(query || area !== "All regions") && <button onClick={() => { setQuery(""); setArea("All regions"); }} type="button">Clear filters <X size={14} /></button>}</div>{filtered.length > 0 ? <div className="recipe-grid">{filtered.map((meal, index) => <Link href={`/meals/${meal.idMeal}`} className="recipe-card" key={meal.idMeal}><div className="recipe-photo-wrap"><img src={meal.strMealThumb || ""} alt={meal.strMeal} loading={index > 3 ? "lazy" : "eager"} /><span className="recipe-image-action"><ArrowUpRight size={20} /></span></div><div className="recipe-card-info"><div className="recipe-card-meta"><span>{meal.strArea || "Worldwide"}</span><span className="meta-dot">•</span><span>{meal.strCategory || "Chicken"}</span></div><h3>{meal.strMeal}</h3><span className="recipe-link">View recipe <ArrowUpRight size={15} /></span></div></Link>)}</div> : <div className="empty-state"><span>✳</span><h3>{meals.length ? "Nothing on the menu (yet)." : "Recipes are temporarily unavailable."}</h3><p>{meals.length ? "Try another search or choose a different region." : "We couldn’t reach TheMealDB right now. Please refresh the page to try again."}</p>{meals.length > 0 && <button type="button" className="primary-button" onClick={() => { setQuery(""); setArea("All regions"); }}>Show all recipes</button>}</div>}</>;
}
