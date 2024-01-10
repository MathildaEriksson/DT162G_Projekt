# DT162G, Projekt - Mathilda Eriksson

Backend med Node.js/Express, frontend med React och Tailwind CSS.
Detta är en receptapplikation där användare kan registrera sig, logga in och lägga till, redigera och radera recept. 
Man kan se recepten även om man inte är inloggad. 
Det finns även en sökfunktion som söker på receptnamn.

## Starta upp detta projekt lokalt
Först klonar man ner detta repo

    git clone https://github.com/MathildaEriksson/DT162G_Projekt.git
Byt till projektets rotkatalog: 

    cd DT162G_Projekt

**Node.js och MongoDB måste vara installerat.**

Sedan ska de nödvändiga npm-paketen installeras för backend, och databasen skapas (databasens namn: RecipeVaultDB, om en db med detta namn redan finns måste den tas bort manuellt innan):

    npm install 
    npm run seed

Notera att databasen måste köras på **http://localhost:3000/**
För att starta servern skriver man detta i projektets rot: 

    npm start
Sedan för frontend, starta en ny terminal och byt mapp till client: 

    cd client
    npm install
    npm start
Då kan man komma att få upp en fråga, om man vill starta på en annan port, eftersom 3000 är upptagen, välj yes, då ska frontendapplikationen öppnas i webbläsaren. 

Testanvändare som skapas i databasen: 
* E-post: test@example.com
* Lösenord: password123
