// The team roster (names, phones, emails, NMLS numbers, headshots) is kept out of the repo.
// Sources, first match wins:
//   1. a roster file this agent imported in Connections (saved in this browser)
//   2. roster.json served next to the page (local development, or a private deployment)
// With neither, the Studio starts with an empty roster and agents fill in their own profile.

export async function loadRoster(settings) {
  const imported = await settings.get("roster");
  if (isRoster(imported)) return imported;
  try {
    const res = await fetch("roster.json", { cache: "no-store" });
    if (res.ok) {
      const served = await res.json();
      if (isRoster(served)) return served;
    }
  } catch {}
  return null;
}

export async function importRoster(settings, file) {
  let data;
  try {
    data = JSON.parse(await file.text());
  } catch {
    throw new Error("That file is not a roster (not valid JSON).");
  }
  if (!isRoster(data)) throw new Error("That file is not a roster (no people list).");
  await settings.set("roster", data);
  return data;
}

export function isRoster(r) {
  return !!r && typeof r === "object" && Array.isArray(r.people);
}
