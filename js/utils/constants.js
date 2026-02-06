// ==========================================
// YUMMY - CONSTANTES ET DONNÉES
// ==========================================

// ------------------------------------------
// MENU COMPLET PAR CATÉGORIE
// ------------------------------------------

export const MENU_DATA = {
    breakfast: [
        // PÂTISSERIE
        { 
            id: 1, 
            name: "Croissant au Beurre", 
            price: 3.50, 
            subcategory: "pastry", 
            emoji: "🥐", 
            description: "Croissant pur beurre AOP Charentes-Poitou, croustillant à l'extérieur et moelleux à l'intérieur",
            ingredients: ["Farine T45", "Beurre AOP Charentes-Poitou", "Levure de boulanger", "Sucre de canne", "Sel de Guérande", "Œufs fermiers"],
            calories: 280,
            tags: ["végétarien"]
        },
        { 
            id: 2, 
            name: "Pain au Chocolat", 
            price: 3.80, 
            subcategory: "pastry", 
            emoji: "🍫", 
            description: "Pâte feuilletée maison avec deux barres de chocolat noir 70% cacao",
            ingredients: ["Farine T45", "Beurre AOP", "Chocolat noir 70% Valrhona", "Levure", "Sucre", "Sel", "Œufs"],
            calories: 320,
            tags: ["végétarien"]
        },
        { 
            id: 3, 
            name: "Chausson aux Pommes", 
            price: 4.20, 
            subcategory: "pastry", 
            emoji: "🍎", 
            description: "Pâte feuilletée croustillante garnie de compote de pommes caramélisées",
            ingredients: ["Farine T55", "Beurre", "Pommes Golden", "Sucre roux", "Cannelle", "Vanille de Madagascar"],
            calories: 340,
            tags: ["végétarien"]
        },
        { 
            id: 4, 
            name: "Brioche Tressée", 
            price: 4.50, 
            subcategory: "pastry", 
            emoji: "🍞", 
            description: "Brioche moelleuse au parfum de fleur d'oranger, parfaite avec de la confiture",
            ingredients: ["Farine T45", "Beurre", "Œufs", "Sucre", "Levure", "Fleur d'oranger", "Sel"],
            calories: 380,
            tags: ["végétarien"]
        },
        { 
            id: 5, 
            name: "Cannelé Bordelais", 
            price: 3.20, 
            subcategory: "pastry", 
            emoji: "🧁", 
            description: "Petit gâteau croustillant à l'extérieur, tendre à l'intérieur, parfumé au rhum et vanille",
            ingredients: ["Farine", "Sucre", "Œufs", "Lait entier", "Beurre", "Rhum ambré", "Vanille", "Cire d'abeille"],
            calories: 180,
            tags: ["végétarien", "alcool"]
        },
        
        // MILKSHAKES
        { 
            id: 6, 
            name: "Milkshake Vanille Bourbon", 
            price: 6.50, 
            subcategory: "milkshake", 
            emoji: "🥤", 
            description: "Lait entier frais, glace vanille Bourbon de Madagascar, crème fouettée maison",
            ingredients: ["Lait entier fermier", "Glace vanille Bourbon", "Crème liquide 35%", "Sucre de canne", "Extrait de vanille pure"],
            calories: 450,
            tags: ["végétarien", "sans gluten"]
        },
        { 
            id: 7, 
            name: "Milkshake Fraises des Bois", 
            price: 6.50, 
            subcategory: "milkshake", 
            emoji: "🍓", 
            description: "Fraises fraîches des bois mixées avec glace artisanale et lait onctueux",
            ingredients: ["Fraises des bois fraîches", "Lait entier", "Glace fraise artisanale", "Crème fouettée", "Sucre"],
            calories: 380,
            tags: ["végétarien", "sans gluten"]
        },
        { 
            id: 8, 
            name: "Milkshake Chocolat Noisette", 
            price: 6.80, 
            subcategory: "milkshake", 
            emoji: "🍫", 
            description: "Chocolat noir Valrhona, pâte de noisette torréfiée, glace onctueuse",
            ingredients: ["Lait entier", "Chocolat noir 70%", "Pâte de noisette", "Glace vanille", "Crème", "Cacao en poudre"],
            calories: 520,
            tags: ["végétarien", "sans gluten", "noix"]
        },
        { 
            id: 9, 
            name: "Smoothie Bowl Açaï", 
            price: 8.50, 
            subcategory: "milkshake", 
            emoji: "🫐", 
            description: "Base d'açaï bio mixée avec banane et fruits rouges, topping de granola et graines",
            ingredients: ["Pulpe d'açaï bio", "Banane", "Myrtilles", "Lait d'amande", "Granola maison", "Graines de chia", "Noix de coco"],
            calories: 420,
            tags: ["végan", "sans gluten", "healthy"]
        },
        { 
            id: 10, 
            name: "Milkshake Caramel Beurre Salé", 
            price: 6.80, 
            subcategory: "milkshake", 
            emoji: "🧈", 
            description: "Caramel au beurre salé maison, glace vanille, éclats de caramel croquant",
            ingredients: ["Lait entier", "Glace vanille", "Caramel au beurre salé", "Crème", "Sucre", "Sel de Guérande"],
            calories: 480,
            tags: ["végétarien", "sans gluten"]
        },
        
        // PANCAKES
        { 
            id: 11, 
            name: "Pancakes Nature Sirop d'Érable", 
            price: 7.50, 
            subcategory: "pancake", 
            emoji: "🥞", 
            description: "Trois pancakes moelleux servis avec beurre et sirop d'érable bio",
            ingredients: ["Farine T45", "Lait entier", "Œufs fermiers", "Levure chimique", "Beurre clarifié", "Sirop d'érable bio"],
            calories: 520,
            tags: ["végétarien"]
        },
        { 
            id: 12, 
            name: "Pancakes Fruits Rouges", 
            price: 9.50, 
            subcategory: "pancake", 
            emoji: "🫐", 
            description: "Pancakes garnis de myrtilles, framboises et coulis de fruits rouges maison",
            ingredients: ["Farine T45", "Lait", "Œufs", "Myrtilles fraîches", "Framboises", "Miel d'acacia", "Beurre"],
            calories: 480,
            tags: ["végétarien"]
        },
        { 
            id: 13, 
            name: "Pancakes Banane Chocolat", 
            price: 9.80, 
            subcategory: "pancake", 
            emoji: "🍌", 
            description: "Pancakes avec morceaux de banane caramélisée et pépites de chocolat fondantes",
            ingredients: ["Farine", "Banane mûre", "Chocolat noir pépites", "Lait", "Œufs", "Beurre", "Cannelle"],
            calories: 580,
            tags: ["végétarien"]
        },
        { 
            id: 14, 
            name: "French Toast Brioché", 
            price: 8.50, 
            subcategory: "pancake", 
            emoji: "🍞", 
            description: "Tranches de brioche trempées dans œufs et lait, dorées au beurre, cannelle et sucre",
            ingredients: ["Brioche maison", "Œufs", "Lait entier", "Beurre", "Cannelle", "Sucre roux", "Vanille"],
            calories: 620,
            tags: ["végétarien"]
        },
        { 
            id: 15, 
            name: "Crêpes Suzette", 
            price: 10.50, 
            subcategory: "pancake", 
            emoji: "🍊", 
            description: "Crêpes fines flambées au Grand Marnier avec sauce orange beurre",
            ingredients: ["Farine", "Œufs", "Lait", "Beurre", "Jus d'orange frais", "Grand Marnier", "Sucre", "Zeste d'orange"],
            calories: 450,
            tags: ["végétarien", "alcool"]
        },
        
        // ŒUFS ET SALÉ
        { 
            id: 16, 
            name: "Œufs Bénédicte", 
            price: 12.50, 
            subcategory: "eggs", 
            emoji: "🍳", 
            description: "Deux œufs pochés sur muffins anglais, jambon fumé et sauce hollandaise",
            ingredients: ["Œufs fermiers", "Muffin anglais", "Jambon de Paris fumé", "Beurre", "Jaunes d'œufs", "Citron", "Poivre de Cayenne"],
            calories: 680,
            tags: ["viande"]
        },
        { 
            id: 17, 
            name: "Omelette aux Fines Herbes", 
            price: 9.50, 
            subcategory: "eggs", 
            emoji: "🍳", 
            description: "Omelette baveuse aux ciboulette, persil, estragon et chives, servie avec salade",
            ingredients: ["Œufs fermiers", "Beurre", "Ciboulette", "Persil plat", "Estragon", "Chives", "Sel", "Poivre"],
            calories: 420,
            tags: ["végétarien", "sans gluten"]
        },
        { 
            id: 18, 
            name: "Avocado Toast Gourmet", 
            price: 11.50, 
            subcategory: "eggs", 
            emoji: "🥑", 
            description: "Pain au levain grillé, avocat écrasé, œuf poché, graines de sésame et piment d'Espelette",
            ingredients: ["Pain au levain", "Avocat Hass mûr", "Œuf fermier", "Graines de sésame", "Piment d'Espelette", "Citron", "Huile d'olive"],
            calories: 520,
            tags: ["végétarien"]
        }
    ],
    
    lunch: [
        // BURGERS
        { 
            id: 101, 
            name: "Burger Classic", 
            price: 14.50, 
            subcategory: "burger", 
            emoji: "🍔", 
            description: "Steak haché 150g façon bouchère, cheddar affiné 12 mois, salade iceberg, tomate bio, oignon rouge, sauce secrète maison",
            ingredients: ["Pain brioché artisanal", "Bœuf Charolais 150g", "Cheddar affiné", "Salade iceberg", "Tomate bio", "Oignon rouge", "Cornichons", "Sauce secrète"],
            calories: 850,
            tags: ["viande"]
        },
        { 
            id: 102, 
            name: "Burger Montagnard", 
            price: 16.50, 
            subcategory: "burger", 
            emoji: "🧀", 
            description: "Steak bœuf, reblochon AOP fondu, lard fumé, oignon caramélisé, roquette, sauce aux noix",
            ingredients: ["Pain brioché", "Bœuf 150g", "Reblochon AOP", "Lard fumé", "Oignon caramélisé", "Roquette", "Sauce aux noix", "Noix de Grenoble"],
            calories: 980,
            tags: ["viande", "noix"]
        },
        { 
            id: 103, 
            name: "Burger Végétal Gourmand", 
            price: 13.50, 
            subcategory: "burger", 
            emoji: "🥬", 
            description: "Galette de quinoa et légumes grillés, avocat, tomate séchée, houmous maison, pain complet",
            ingredients: ["Pain complet", "Galette quinoa-légumes", "Avocat", "Tomates séchées", "Houmous maison", "Roquette", "Graines de courge"],
            calories: 650,
            tags: ["végétarien", "végan"]
        },
        { 
            id: 104, 
            name: "Burger Poulet Pané", 
            price: 13.80, 
            subcategory: "burger", 
            emoji: "🍗", 
            description: "Filet de poulet pané maison, cheddar, bacon croustillant, salade, sauce ranch",
            ingredients: ["Pain brioché", "Filet de poulet fermier", "Chapelure maison", "Cheddar", "Bacon fumé", "Salade", "Sauce ranch"],
            calories: 780,
            tags: ["viande"]
        },
        { 
            id: 105, 
            name: "Burger Saumon Fumé", 
            price: 15.50, 
            subcategory: "burger", 
            emoji: "🐟", 
            description: "Saumon fumé d'Écosse, cream cheese, aneth frais, câpres, oignon rouge, pain aux céréales",
            ingredients: ["Pain aux céréales", "Saumon fumé d'Écosse", "Philadelphia", "Aneth frais", "Câpres", "Oignon rouge", "Citron"],
            calories: 620,
            tags: ["poisson"]
        },
        
        // SALADES
        { 
            id: 106, 
            name: "Salade César Authentique", 
            price: 12.50, 
            subcategory: "salad", 
            emoji: "🥗", 
            description: "Poulet rôti fermier, laitue romaine croquante, croûtons à l'ail, copeaux de parmesan 24 mois, sauce César maison",
            ingredients: ["Laitue romaine", "Poulet fermier rôti", "Parmesan Reggiano 24 mois", "Croûtons à l'ail", "Œuf mollet", "Anchois", "Huile d'olive", "Citron"],
            calories: 580,
            tags: ["viande", "poisson"]
        },
        { 
            id: 107, 
            name: "Salade Niçoise Tradition", 
            price: 13.50, 
            subcategory: "salad", 
            emoji: "🥗", 
            description: "Thon mi-cuit, haricots verts, œuf dur, olives de Nice, anchois, tomates, vinaigre de vin",
            ingredients: ["Thon albacore", "Haricots verts frais", "Œufs fermiers", "Olives de Nice AOP", "Anchois de Collioure", "Tomates anciennes", "Pommes de terre", "Vinaigre de vin rouge"],
            calories: 520,
            tags: ["poisson"]
        },
        { 
            id: 108, 
            name: "Bowl Quinoa Power", 
            price: 12.80, 
            subcategory: "salad", 
            emoji: "🥗", 
            description: "Quinoa bio, avocat, pois chiches rôtis, betterave, houmous, tahini, graines de grenade",
            ingredients: ["Quinoa bio", "Avocat", "Pois chiches épicés", "Betterave cuite", "Houmous", "Sauce tahini", "Grenade", "Coriandre fraîche"],
            calories: 480,
            tags: ["végan", "sans gluten", "healthy"]
        },
        { 
            id: 109, 
            name: "Salade de Chèvre Chaud", 
            price: 13.20, 
            subcategory: "salad", 
            emoji: "🥗", 
            description: "Fromage de chèvre cendré chaud sur toast, miel de lavande, noix, mesclun, tomates confites",
            ingredients: ["Fromage de chèvre cendré", "Pain de campagne", "Miel de lavande", "Noix du Périgord", "Mesclun", "Tomates confites", "Huile de noix"],
            calories: 620,
            tags: ["végétarien", "noix"]
        },
        { 
            id: 110, 
            name: "Carpaccio de Bœuf", 
            price: 15.50, 
            subcategory: "salad", 
            emoji: "🥩", 
            description: "Fines tranches de filet de bœuf mariné, copeaux de parmesan, roquette, huile de truffe",
            ingredients: ["Filet de bœuf Label Rouge", "Parmesan Reggiano", "Roquette sauvage", "Huile d'olive", "Citron", "Câpres", "Huile de truffe noire"],
            calories: 420,
            tags: ["viande", "sans gluten"]
        },
        
        // PÂTES
        { 
            id: 111, 
            name: "Spaghetti Carbonara Authentique", 
            price: 14.50, 
            subcategory: "pasta", 
            emoji: "🍝", 
            description: "Pâtes fraîches, guanciale italien, jaunes d'œufs, pecorino romano DOP, poivre noir concassé",
            ingredients: ["Spaghetti frais", "Guanciale", "Jaunes d'œufs fermiers", "Pecorino Romano DOP", "Parmesan", "Poivre noir de Kampot", "Sel"],
            calories: 720,
            tags: ["viande"]
        },
        { 
            id: 112, 
            name: "Penne Arrabbiata", 
            price: 12.50, 
            subcategory: "pasta", 
            emoji: "🍝", 
            description: "Sauce tomate épicée à l'ail, piment oiseau, basilic frais, pecorino rapé",
            ingredients: ["Penne rigate", "Tomates San Marzano", "Ail frais", "Piment oiseau", "Basilic Genovese", "Huile d'olive extra-vierge", "Pecorino"],
            calories: 580,
            tags: ["végétarien", "épicé"]
        },
        { 
            id: 113, 
            name: "Tagliatelles aux Truffes", 
            price: 22.50, 
            subcategory: "pasta", 
            emoji: "🍝", 
            description: "Tagliatelles fraîches, beurre, copeaux de truffe noire du Périgord, parmesan 36 mois",
            ingredients: ["Tagliatelles fraîches", "Beurre AOP", "Truffe noire du Périgord", "Parmesan 36 mois", "Huile de truffe"],
            calories: 680,
            tags: ["végétarien"]
        },
        { 
            id: 114, 
            name: "Lasagnes Bolognaise Maison", 
            price: 15.50, 
            subcategory: "pasta", 
            emoji: "🍝", 
            description: "Feuilles de lasagne fraîches, ragù de bœuf mijoté 4h, béchamel, gratiné au four",
            ingredients: ["Pâte à lasagne fraîche", "Bœuf haché", "Porc haché", "Tomates pelées", "Carottes", "Céleri", "Oignon", "Béchamel", "Fromage râpé"],
            calories: 820,
            tags: ["viande"]
        },
        { 
            id: 115, 
            name: "Ravioli Ricotta Épinards", 
            price: 14.80, 
            subcategory: "pasta", 
            emoji: "🍝", 
            description: "Ravioli maison farcis ricotta et épinards, sauce au beurre de sauge, parmesan",
            ingredients: ["Farine T00", "Ricotta di bufala", "Épinards frais", "Œufs", "Beurre", "Sauge fraîche", "Parmesan", "Noix de muscade"],
            calories: 620,
            tags: ["végétarien"]
        },
        
        // PIZZAS
        { 
            id: 116, 
            name: "Pizza Margherita DOP", 
            price: 12.00, 
            subcategory: "pizza", 
            emoji: "🍕", 
            description: "Mozzarella di bufala DOP, tomates San Marzano, basilic frais, huile d'olive extra-vierge",
            ingredients: ["Pâte à pizza 48h de levage", "Mozzarella di bufala DOP", "Tomates San Marzano DOP", "Basilic frais", "Huile d'olive Taggiasca", "Sel marin"],
            calories: 780,
            tags: ["végétarien"]
        },
        { 
            id: 117, 
            name: "Pizza 4 Fromages", 
            price: 14.50, 
            subcategory: "pizza", 
            emoji: "🧀", 
            description: "Mozzarella, gorgonzola dolce, taleggio, parmesan 24 mois, noix, miel de truffe",
            ingredients: ["Pâte pizza", "Mozzarella fior di latte", "Gorgonzola dolce", "Taleggio", "Parmesan 24 mois", "Noix", "Miel de truffe"],
            calories: 920,
            tags: ["végétarien", "noix"]
        },
        { 
            id: 118, 
            name: "Pizza Diavola", 
            price: 15.00, 
            subcategory: "pizza", 
            emoji: "🌶️", 
            description: "Tomate, mozzarella, salami piquant italien, piment, olives noires, oignon rouge",
            ingredients: ["Pâte pizza", "Tomate San Marzano", "Mozzarella", "Salami piccante", "Piment oiseau", "Olives noires de Nyons", "Oignon rouge"],
            calories: 880,
            tags: ["viande", "épicé"]
        },
        { 
            id: 119, 
            name: "Calzone Farcito", 
            price: 15.50, 
            subcategory: "pizza", 
            emoji: "🥟", 
            description: "Pizza chausson garnie de ricotta, jambon cuit, champignons, œuf, sauce tomate",
            ingredients: ["Pâte à pizza", "Ricotta", "Jambon cuit supérieur", "Champignons de Paris", "Œuf", "Mozzarella", "Sauce tomate", "Persil"],
            calories: 950,
            tags: ["viande"]
        },
        
        // RISOTTOS
        { 
            id: 120, 
            name: "Risotto aux Champignons Sauvages", 
            price: 16.50, 
            subcategory: "risotto", 
            emoji: "🍄", 
            description: "Riz Carnaroli, cèpes, girolles, trompettes de la mort, bouillon de légumes, parmesan, beurre",
            ingredients: ["Riz Carnaroli", "Cèpes frais", "Girolles", "Trompettes de la mort", "Bouillon de légumes", "Parmesan", "Beurre", "Vin blanc", "Oignon"],
            calories: 680,
            tags: ["végétarien", "sans gluten"]
        },
        { 
            id: 121, 
            name: "Risotto Saint-Jacques", 
            price: 24.50, 
            subcategory: "risotto", 
            emoji: "🦐", 
            description: "Noix de Saint-Jacques snackées, risotto crémeux au safran, copeaux de parmesan",
            ingredients: ["Riz Arborio", "Noix de Saint-Jacques fraîches", "Safran d'Iran", "Bouillon de poisson", "Parmesan", "Beurre", "Vin blanc sec", "Échalote"],
            calories: 620,
            tags: ["poisson", "sans gluten"]
        },
        { 
            id: 122, 
            name: "Risotto Ossobuco", 
            price: 19.50, 
            subcategory: "risotto", 
            emoji: "🍖", 
            description: "Jarret de veau braisé 3h, risotto au safran, gremolata (citron, ail, persil)",
            ingredients: ["Riz Carnaroli", "Jarret de veau", "Carottes", "Céleri", "Oignon", "Vin blanc", "Bouillon de veau", "Safran", "Gremolata"],
            calories: 780,
            tags: ["viande", "sans gluten"]
        },
        
        // PLATS CHAUDS
        { 
            id: 123, 
            name: "Fish and Chips Maison", 
            price: 16.50, 
            subcategory: "hot", 
            emoji: "🐟", 
            description: "Filet de cabillaud en tempura, frites épaisses maison, sauce tartare, purée de petits pois",
            ingredients: ["Cabillaud frais", "Farine", "Bière blonde", "Pommes de terre Bintje", "Huile de friture", "Œufs", "Cornichons", "Câpres", "Petits pois"],
            calories: 850,
            tags: ["poisson"]
        },
        { 
            id: 124, 
            name: "Croque-Monsieur Tradition", 
            price: 13.50, 
            subcategory: "hot", 
            emoji: "🥪", 
            description: "Pain de mie, jambon blanc, emmental râpé, béchamel, gratiné au four, salade",
            ingredients: ["Pain de mie artisanal", "Jambon blanc supérieur", "Emmental de Savoie", "Béchamel", "Noix de muscade", "Beurre", "Salade"],
            calories: 720,
            tags: ["viande"]
        },
        { 
            id: 125, 
            name: "Gratin Dauphinois et Saucisses", 
            price: 15.50, 
            subcategory: "hot", 
            emoji: "🥔", 
            description: "Pommes de terre en tranches, crème fraîche, ail, saucisses de Toulouse grillées",
            ingredients: ["Pommes de terre Ratte", "Crème épaisse", "Lait entier", "Ail", "Saucisses de Toulouse", "Beurre", "Noix de muscade"],
            calories: 920,
            tags: ["viande", "sans gluten"]
        }
    ],
    
    dinner: [
        // VIANDES
        { 
            id: 201, 
            name: "Entrecôte Grillée Sauce au Poivre", 
            price: 28.50, 
            subcategory: "meat", 
            emoji: "🥩", 
            description: "Entrecôte maturée 21 jours, sauce au poivre vert flambée au cognac, frites maison, salade",
            ingredients: ["Entrecôte maturée 300g", "Poivre vert frais", "Cognac VSOP", "Crème épaisse", "Pommes de terre", "Salade", "Beurre", "Échalote"],
            calories: 1150,
            tags: ["viande", "alcool"]
        },
        { 
            id: 202, 
            name: "Filet de Bœuf Rossini", 
            price: 34.50, 
            subcategory: "meat", 
            emoji: "🥩", 
            description: "Filet de bœuf, escalope de foie gras poêlée, truffe noire, sauce Madère, purée de céleri",
            ingredients: ["Filet de bœuf 200g", "Foie gras de canard cru", "Truffe noire", "Madère", "Céleri-rave", "Crème", "Beurre", "Porto"],
            calories: 980,
            tags: ["viande", "alcool"]
        },
        { 
            id: 203, 
            name: "Côte de Veau à la Normande", 
            price: 26.50, 
            subcategory: "meat", 
            emoji: "🥩", 
            description: "Côte de veau épaisse, sauce crème aux champignons et cidre, pommes sautées",
            ingredients: ["Côte de veau 300g", "Champignons de Paris", "Crème fraîche", "Cidre brut", "Pommes Golden", "Beurre", "Échalote", "Thym"],
            calories: 880,
            tags: ["viande", "alcool"]
        },
        { 
            id: 204, 
            name: "Magret de Canard aux Figues", 
            price: 24.50, 
            subcategory: "meat", 
            emoji: "🦆", 
            description: "Magret de canard rôti, figues fraîches rôties au miel, réduction de Porto, gratin dauphinois",
            ingredients: ["Magret de canard", "Figues fraîches", "Miel de lavande", "Porto", "Pommes de terre", "Crème", "Thym", "Laurier"],
            calories: 920,
            tags: ["viande", "alcool"]
        },
        { 
            id: 205, 
            name: "Souris d'Agneau Confite", 
            price: 25.50, 
            subcategory: "meat", 
            emoji: "🍖", 
            description: "Agneau de Provence confit 7h, polenta crémeuse, légumes racines rôtis, jus corsé",
            ingredients: ["Souris d'agneau", "Polenta", "Carottes", "Panais", "Navets", "Ail", "Romarin", "Vin rouge", "Bouillon d'agneau"],
            calories: 850,
            tags: ["viande"]
        },
        { 
            id: 206, 
            name: "Cassoulet Toulousain", 
            price: 22.50, 
            subcategory: "meat", 
            emoji: "🍲", 
            description: "Haricots tarbais, confit de canard, saucisse de Toulouse, poitrine fumée, chapelure",
            ingredients: ["Haricots tarbais", "Confit de canard", "Saucisse de Toulouse", "Poitrine fumée", "Oignon", "Tomate", "Ail", "Persil", "Chapelure"],
            calories: 1100,
            tags: ["viande"]
        },
        
        // POISSONS
        { 
            id: 207, 
            name: "Saumon Grillé Sauce Béarnaise", 
            price: 22.50, 
            subcategory: "fish", 
            emoji: "🐟", 
            description: "Pavé de saumon d'Écosse label rouge, sauce béarnaise maison, asperges vertes, riz pilaf",
            ingredients: ["Saumon d'Écosse 200g", "Œufs", "Beurre clarifié", "Estragon", "Ciboulette", "Vinaigre de vin", "Asperges vertes", "Riz basmati"],
            calories: 720,
            tags: ["poisson"]
        },
        { 
            id: 208, 
            name: "Bar Entier en Croûte de Sel", 
            price: 32.00, 
            subcategory: "fish", 
            emoji: "🐟", 
            description: "Bar de ligne cuit en croûte de sel, servi avec sauce vierge, légumes de saison",
            ingredients: ["Bar de ligne 400g", "Gros sel marin", "Blancs d'œufs", "Tomates", "Basilic", "Ail", "Huile d'olive", "Citron", "Légumes de saison"],
            calories: 580,
            tags: ["poisson", "sans gluten"]
        },
        { 
            id: 209, 
            name: "Risotto de Fruits de Mer", 
            price: 26.50, 
            subcategory: "fish", 
            emoji: "🦐", 
            description: "Riz Carnaroli, gambas, moules de Bouchot, calamars, safran, tomates concassées",
            ingredients: ["Riz Carnaroli", "Gambas fraîches", "Moules de Bouchot", "Calamars", "Safran", "Tomates", "Vin blanc", "Bouillon de poisson", "Persil"],
            calories: 680,
            tags: ["poisson", "sans gluten"]
        },
        { 
            id: 210, 
            name: "Filet de Turbot Sauce Champagne", 
            price: 34.00, 
            subcategory: "fish", 
            emoji: "🐟", 
            description: "Turbot sauvage rôti, sauce champagne et crème, écrevisses, petits légumes glacés",
            ingredients: ["Turbot sauvage 250g", "Champagne brut", "Crème épaisse", "Écrevisses", "Carottes", "Navets", "Petits pois", "Beurre"],
            calories: 620,
            tags: ["poisson", "alcool"]
        },
        { 
            id: 211, 
            name: "Thon Mi-Cuit Sésame", 
            price: 24.50, 
            subcategory: "fish", 
            emoji: "🐟", 
            description: "Tataki de thon rouge, croûte de sésame, sauce ponzu, wakamé, riz vinaigré",
            ingredients: ["Thon rouge frais", "Graines de sésame", "Sauce soja", "Vinaigre de riz", "Citron yuzu", "Wakamé", "Riz à sushi", "Gingembre"],
            calories: 520,
            tags: ["poisson", "sans gluten"]
        },
        
        // VÉGÉTARIEN
        { 
            id: 212, 
            name: "Curry de Légumes Thaï", 
            price: 16.50, 
            subcategory: "vegetarian", 
            emoji: "🍛", 
            description: "Légumes de saison croquants, lait de coco, pâte de curry rouge, riz jasmin parfumé",
            ingredients: ["Lait de coco", "Pâte de curry rouge", "Tofu ferme", "Aubergine", "Courgette", "Poivron", "Riz jasmin", "Citronnelle", "Galanga"],
            calories: 620,
            tags: ["végan", "sans gluten", "épicé"]
        },
        { 
            id: 213, 
            name: "Gratin de Légumes d'Été", 
            price: 15.50, 
            subcategory: "vegetarian", 
            emoji: "🥘", 
            description: "Aubergines, courgettes, tomates, oignons, gratinés au parmesan, sauce tomate maison",
            ingredients: ["Aubergines", "Courgettes", "Tomates anciennes", "Oignons", "Ail", "Parmesan", "Huile d'olive", "Thym", "Basilic"],
            calories: 480,
            tags: ["végétarien", "sans gluten"]
        },
        { 
            id: 214, 
            name: "Buddha Bowl Gourmand", 
            price: 17.50, 
            subcategory: "vegetarian", 
            emoji: "🥗", 
            description: "Quinoa, patate douce rôtie, avocat, pois chiches épicés, tahini, graines de grenade",
            ingredients: ["Quinoa bio", "Patate douce", "Avocat", "Pois chiches", "Sauce tahini", "Grenade", "Coriandre", "Menthe", "Amandes"],
            calories: 580,
            tags: ["végan", "sans gluten", "healthy"]
        },
        { 
            id: 215, 
            name: "Risotto aux Asperges", 
            price: 18.50, 
            subcategory: "vegetarian", 
            emoji: "🍚", 
            description: "Riz Carnaroli, asperges vertes de Provence, citron confit, parmesan, beurre noisette",
            ingredients: ["Riz Carnaroli", "Asperges vertes", "Citron confit", "Parmesan", "Beurre", "Vin blanc", "Bouillon de légumes", "Oignon"],
            calories: 620,
            tags: ["végétarien", "sans gluten"]
        },
        { 
            id: 216, 
            name: "Gnocchi Maison Sauce Gorgonzola", 
            price: 16.50, 
            subcategory: "vegetarian", 
            emoji: "🍝", 
            description: "Gnocchi de pommes de terre faits maison, sauce gorgonzola dolce, noix, roquette",
            ingredients: ["Pommes de terre", "Farine T00", "Jaunes d'œufs", "Gorgonzola dolce", "Crème", "Noix", "Roquette", "Beurre"],
            calories: 720,
            tags: ["végétarien", "noix"]
        },
        
        // MEXICAIN
        { 
            id: 217, 
            name: "Tacos au Carnitas", 
            price: 15.50, 
            subcategory: "mexican", 
            emoji: "🌮", 
            description: "Tortillas de maïs, porc braisé 6h, oignons marinés, coriandre, salsa verde",
            ingredients: ["Tortillas de maïs", "Épaule de porc", "Oignons rouges", "Coriandre fraîche", "Salsa verde", "Citron vert", "Cumin", "Origan"],
            calories: 680,
            tags: ["viande", "sans gluten"]
        },
        { 
            id: 218, 
            name: "Fajitas Mixte Poulet/Bœuf", 
            price: 18.50, 
            subcategory: "mexican", 
            emoji: "🌯", 
            description: "Bandes de poulet et bœuf marinés, poivrons oignons sautés, guacamole, crème, tortillas",
            ingredients: ["Poulet", "Bœuf", "Poivrons", "Oignons", "Tortillas de blé", "Guacamole", "Crème aigre", "Cumin", "Paprika fumé"],
            calories: 850,
            tags: ["viande"]
        },
        { 
            id: 219, 
            name: "Enchiladas au Poulet", 
            price: 16.50, 
            subcategory: "mexican", 
            emoji: "🌯", 
            description: "Tortillas roulées farcies poulet, sauce tomate épicée, fromage fondu, crème, coriandre",
            ingredients: ["Tortillas", "Poulet rôti", "Sauce tomate", "Piment chipotle", "Fromage cheddar", "Oignons", "Ail", "Crème", "Coriandre"],
            calories: 720,
            tags: ["viande", "épicé"]
        },
        { 
            id: 220, 
            name: "Chili Con Carne Authentique", 
            price: 17.50, 
            subcategory: "mexican", 
            emoji: "🌶️", 
            description: "Bœuf haché, haricots rouges, piments, cacao, bière, servi avec riz et crème",
            ingredients: ["Bœuf haché", "Haricots rouges", "Tomates", "Piments", "Cacao amer", "Bière brune", "Cumin", "Riz", "Crème aigre"],
            calories: 780,
            tags: ["viande", "épicé"]
        },
        
        // ASIATIQUE
        { 
            id: 221, 
            name: "Pad Thaï aux Crevettes", 
            price: 19.50, 
            subcategory: "asian", 
            emoji: "🍜", 
            description: "Nouilles de riz sautées, crevettes, tofu, œuf, cacahuètes, tamarin, pousses de soja",
            ingredients: ["Nouilles de riz", "Crevettes", "Tofu ferme", "Œufs", "Cacahuètes", "Tamarin", "Pousses de soja", "Citron vert", "Coriandre"],
            calories: 680,
            tags: ["poisson", "cacahuètes"]
        },
        { 
            id: 222, 
            name: "Bœuf Loc Lac", 
            price: 21.50, 
            subcategory: "asian", 
            emoji: "🥩", 
            description: "Bœuf sauté au wok, sauce au poivre de Kampot, riz frit à l'ail, œuf au plat",
            ingredients: ["Bœuf tendre", "Poivre de Kampot", "Sauce soja", "Ail", "Riz jasmin", "Œuf", "Concombre", "Tomates", "Oignon vert"],
            calories: 820,
            tags: ["viande"]
        },
        { 
            id: 223, 
            name: "Ramen Tonkotsu", 
            price: 18.50, 
            subcategory: "asian", 
            emoji: "🍜", 
            description: "Bouillon de porc mijoté 12h, nouilles fraîches, chashu, œuf mollet, algues, champignons",
            ingredients: ["Bouillon de porc", "Nouilles ramen", "Poitrine de porc", "Œuf mollet", "Algue nori", "Champignons", "Oignon vert", "Gingembre"],
            calories: 750,
            tags: ["viande"]
        },
        { 
            id: 224, 
            name: "Sushi Mix Premium", 
            price: 26.00, 
            subcategory: "asian", 
            emoji: "🍣", 
            description: "Assortiment de 12 pièces : saumon, thon, daurade, crevette, avocat, œufs de poisson",
            ingredients: ["Riz à sushi", "Saumon", "Thon rouge", "Daurade", "Crevettes", "Avocat", "Œufs de poisson", "Wasabi", "Gingembre mariné"],
            calories: 520,
            tags: ["poisson", "sans gluten"]
        },
        { 
            id: 225, 
            name: "Poulet Teriyaki", 
            price: 17.50, 
            subcategory: "asian", 
            emoji: "🍗", 
            description: "Poulet grillé laqué sauce teriyaki maison, légumes sautés, riz vinaigré",
            ingredients: ["Poulet fermier", "Sauce soja", "Mirin", "Saké", "Sucre", "Gingembre", "Ail", "Brocolis", "Carottes", "Riz"],
            calories: 680,
            tags: ["viande"]
        },
        { 
            id: 226, 
            name: "Dumplings vapeur et grillés", 
            price: 15.50, 
            subcategory: "asian", 
            emoji: "🥟", 
            description: "Assortiment de raviolis chinois : porc/crevettes et légumes, sauce soja épicée",
            ingredients: ["Farine", "Porc haché", "Crevettes", "Chou chinois", "Gingembre", "Ail", "Sauce soja", "Vinaigre noir", "Huile pimentée"],
            calories: 580,
            tags: ["viande"]
        }
    ]
};

// ------------------------------------------
// SOUS-CATÉGORIES PAR MENU
// ------------------------------------------

export const SUBCATEGORIES = {
    breakfast: [
        { id: 'all', name: 'Tous' },
        { id: 'pastry', name: '🥐 Pâtisserie' },
        { id: 'milkshake', name: '🥤 Milkshakes' },
        { id: 'pancake', name: '🥞 Pancakes & Crêpes' },
        { id: 'eggs', name: '🍳 Œufs & Salé' }
    ],
    lunch: [
        { id: 'all', name: 'Tous' },
        { id: 'burger', name: '🍔 Burgers' },
        { id: 'salad', name: '🥗 Salades' },
        { id: 'pasta', name: '🍝 Pâtes' },
        { id: 'pizza', name: '🍕 Pizzas' },
        { id: 'risotto', name: '🍚 Risottos' },
        { id: 'hot', name: '🍲 Plats Chauds' }
    ],
    dinner: [
        { id: 'all', name: 'Tous' },
        { id: 'meat', name: '🥩 Viandes' },
        { id: 'fish', name: '🐟 Poissons' },
        { id: 'vegetarian', name: '🥬 Végétarien' },
        { id: 'mexican', name: '🌮 Mexicain' },
        { id: 'asian', name: '🍜 Asiatique' }
    ]
};

// ------------------------------------------
// PLANS D'ABONNEMENT
// ------------------------------------------

export const SUBSCRIPTION_PLANS = {
    bon: { 
        name: 'Bon', 
        meals: 7, 
        categories: ['lunch'],
        price: 29,
        description: 'Idéal pour le déjeuner au bureau',
        features: [
            'Accès au menu Déjeuner',
            '7 plats par semaine',
            'Livraison incluse',
            'Parfait pour 1 personne'
        ]
    },
    delicieux: { 
        name: 'Délicieux', 
        meals: 14, 
        categories: ['breakfast', 'lunch'],
        price: 49,
        description: 'Le petit-déjeuner et le déjeuner pour 2',
        features: [
            'Petit-déjeuner + Déjeuner',
            '14 plats par semaine',
            'Conçu pour 2 personnes',
            'Livraison prioritaire',
            'Menu varié chaque jour'
        ]
    },
    exquis: { 
        name: 'Exquis', 
        meals: 14, 
        categories: ['breakfast', 'lunch', 'dinner'],
        price: 69,
        description: 'L\'expérience gastronomique complète',
        features: [
            'Tous les menus inclus',
            '14 plats par semaine',
            'Accès 24/7',
            'Menu premium',
            'Support prioritaire',
            'Livraison express'
        ]
    }
};

// ------------------------------------------
// NOMS DES CATÉGORIES
// ------------------------------------------

export const CATEGORY_NAMES = {
    breakfast: 'Petit-déjeuner',
    lunch: 'Déjeuner',
    dinner: 'Dîner'
};

// ------------------------------------------
// ÉMOJIS DES CATÉGORIES
// ------------------------------------------

export const CATEGORY_EMOJIS = {
    breakfast: '🌅',
    lunch: '☀️',
    dinner: '🌙'
};

// ------------------------------------------
// TAGS ET FILTRES
// ------------------------------------------

export const DIETARY_TAGS = {
    vegetarian: { label: 'Végétarien', color: '#4ecdc4' },
    vegan: { label: 'Végan', color: '#44a08d' },
    'sans-gluten': { label: 'Sans Gluten', color: '#f7b731' },
    healthy: { label: 'Healthy', color: '#20bf6b' },
    viande: { label: 'Viande', color: '#eb3b5a' },
    poisson: { label: 'Poisson', color: '#2d98da' },
    épicé: { label: 'Épicé', color: '#fa8231' },
    noix: { label: 'Contient des noix', color: '#8854d0' },
    alcool: { label: 'Alcool', color: '#a5b1c2' }
};

// ------------------------------------------
// OPTIONS DE CONFIGURATION
// ------------------------------------------

export const CONFIG = {
    delivery: {
        baseHours: 24,
        itemsPerSlot: 2
    },
    subscription: {
        resetDays: 7,
        defaultDurationMonths: 1
    },
    currency: '€',
    locale: 'fr-FR'
};