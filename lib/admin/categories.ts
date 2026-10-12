import type { AdminState } from "./types";

export function getAdminCategories(state: AdminState) {
  const unique = new Map<string, string>();
  for (const value of [
    ...state.categories,
    ...state.articles.map((article) => article.category),
  ]) {
    const name = value.trim().replace(/\s+/g, " ");
    if (name && !unique.has(name.toLowerCase())) {
      unique.set(name.toLowerCase(), name);
    }
  }
  return [...unique.values()];
}

export function categoryError(name: string, categories: string[]) {
  if (!name || name.length > 60) {
    return "Enter a category name between 1 and 60 characters.";
  }
  if (["all news", "all categories"].includes(name.toLowerCase())) {
    return "Choose a category name other than All news or All categories.";
  }
  if (
    categories.some((category) => category.toLowerCase() === name.toLowerCase())
  ) {
    return "This category already exists. Select it from the list.";
  }
  return "";
}
