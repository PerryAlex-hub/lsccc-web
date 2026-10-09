export function matchesQuery(query: string, ...values: string[]) {
  const words = query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  const text = values.join(" ").toLocaleLowerCase();
  return words.every((word) => text.includes(word));
}
