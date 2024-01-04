//Mathilda Eriksson, DT162G, HT23
const Recepie = require('../models/recepie.model');

// Recepiedata to seed
const recepiesData = [
    {
      name: 'Chokladkaka',
      category: 'Dessert',
      ingredients: [
        { name: 'Mörk choklad', amount: 100, unit: 'g' },
        { name: 'Smör', amount: 50, unit: 'g' },
        { name: 'Strösocker', amount: 150, unit: 'g' },
        { name: 'Vaniljsocker', amount: 1, unit: 'tsk' },
        { name: 'Ägg', amount: 2, unit: 'st' },
        { name: 'Vetemjöl', amount: 100, unit: 'g' }
      ],
      instructions: [
        'Sätt ugnen på 175 grader.',
        'Smält choklad och smör i en kastrull på låg värme.',
        'Blanda strösocker och vaniljsocker i chokladblandningen.',
        'Rör ner ett ägg i taget.',
        'Tillsätt vetemjöl och blanda till en jämn smet.',
        'Häll smeten i en smord och bröad form.',
        'Grädda i mitten av ugnen i cirka 20 minuter.'
      ],
      image: 'chokladkaka.png'
    },
    {
      name: 'Caesarsallad',
      category: 'Sallad',
      ingredients: [
        { name: 'Romansallad', amount: 1, unit: 'st' },
        { name: 'Kycklingfilé', amount: 2, unit: 'st' },
        { name: 'Bacon', amount: 100, unit: 'g' },
        { name: 'Krutonger', amount: 1, unit: 'dl' },
        { name: 'Parmesanost', amount: 50, unit: 'g' },
        { name: 'Caesardressing', amount: 1, unit: 'dl' }
      ],
      instructions: [
        'Stek baconet tills det är krispigt och låt det sedan rinna av på hushållspapper.',
        'Stek kycklingen i samma panna tills den är genomstekt.',
        'Skär kycklingen i bitar och baconet i mindre strimlor.',
        'Blanda salladen med dressing, krutonger, bacon och kyckling.',
        'Toppa med riven parmesanost.'
      ],
      image: 'caesarsallad.png'
    },
    {
      name: 'Pasta Carbonara',
      category: 'Huvudrätt',
      ingredients: [
        { name: 'Spaghetti', amount: 400, unit: 'g' },
        { name: 'Bacon', amount: 150, unit: 'g' },
        { name: 'Äggula', amount: 4, unit: 'st' },
        { name: 'Grädde', amount: 2, unit: 'dl' },
        { name: 'Riven parmesanost', amount: 100, unit: 'g' },
        { name: 'Salt', amount: 1, unit: 'tsk' },
        { name: 'Svartpeppar', amount: 1, unit: 'tsk' }
      ],
      instructions: [
        'Koka pastan enligt anvisningarna på förpackningen.',
        'Stek baconet tills det är krispigt och ställ åt sidan.',
        'Blanda äggulor, grädde och hälften av parmesanosten i en skål.',
        'Häll av pastan och blanda direkt med ägg- och gräddblandningen.',
        'Tillsätt bacon och resten av parmesanosten. Krydda med salt och peppar.',
        'Servera direkt.'
      ],
      image: 'pastacarbonara.png'
    },
  ];
  
  
 // Create recepie
const seedRecepies = async (createdUserId) => {
    try {
      for (let recepieData of recepiesData) {
        const recepie = { ...recepieData, createdBy: createdUserId };
        await Recepie.create(recepie);
      }
      console.log('Recept seedade i databasen.');
    } catch (err) {
      console.error('Fel vid seedning av recept:', err);
    } 
  };
  
  module.exports = seedRecepies;