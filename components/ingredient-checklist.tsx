"use client";

import { useState } from "react";
import { Check, RotateCcw } from "lucide-react";
import type { Ingredient } from "@/lib/meals";

export function IngredientChecklist({ ingredients }: { ingredients: Ingredient[] }) {
  const [checked, setChecked] = useState<number[]>([]);
  const progress = ingredients.length ? Math.round((checked.length / ingredients.length) * 100) : 0;
  return <div className="checklist-panel"><div className="checklist-progress"><div><strong>{checked.length} of {ingredients.length} ready</strong><span>Tap to check off what you have</span></div><button onClick={() => setChecked([])} disabled={checked.length === 0} type="button"><RotateCcw size={15} /> Reset</button></div><div className="progress-track"><div style={{ width: `${progress}%` }} /></div><div className="ingredient-list">{ingredients.map((ingredient) => { const isChecked = checked.includes(ingredient.number); return <button key={ingredient.number} type="button" onClick={() => setChecked((previous) => isChecked ? previous.filter((value) => value !== ingredient.number) : [...previous, ingredient.number])} className={`ingredient-row ${isChecked ? "checked" : ""}`} aria-pressed={isChecked}><span className="ingredient-checkbox">{isChecked && <Check size={16} strokeWidth={3} />}</span><span className="ingredient-name">{ingredient.name}</span><span className="ingredient-measure">{ingredient.measure || "To taste"}</span></button>; })}</div><p className="checklist-note">Your checklist is for this visit only and will reset when you refresh.</p></div>;
}
