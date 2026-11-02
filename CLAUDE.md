# Werkafspraken voor Claude in deze repo

## Skills (staan in .claude/skills)

- **frontend-design is verplicht bij elk stuk frontendwerk**: een nieuwe pagina, sectie, component, restyle of redesign. Laad de skill vóór je de eerste regel UI-code schrijft en volg de denkfase (palet, typografie, sfeer, compositie). Blijf binnen de bestaande huisstijl van deze site, tenzij om een redesign is gevraagd.
- Na UI-werk: controleer met **web-interface-guidelines** en bekijk het resultaat op desktop en mobiel voordat je pusht.
- Voor een nieuwe feature of een vaag plan: eerst **grill-me** of **brainstorming**, pas daarna code.
- **impeccable** voor audit, polish of art direction van UI, als daarom gevraagd wordt.
- **code-simplifier** alleen op verzoek of na een grote wijziging; daarna bouwen en testen.

## Vaste regels

- Geen nepreviews, nep-voorraad of medische claims.
- Geheimen nooit in de code: API-sleutels staan als omgevingsvariabelen in Vercel.
- Bouwen en testen vóór elke push; na de deploy live controleren.
