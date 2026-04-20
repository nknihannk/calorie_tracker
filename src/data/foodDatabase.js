// A simple food nutrition database for common Indian and international foods
// Values per standard serving
export const foodDatabase = {
    // Kerala Cuisine
    "puttu": { name: "Puttu & Kadala Curry", calories: 350, protein: 12, carbs: 55, fats: 8, serving: "1 portion" },
    "appam": { name: "Appam (1 piece)", calories: 120, protein: 2, carbs: 24, fats: 2, serving: "1 piece" },
    "egg roast": { name: "Kerala Egg Roast", calories: 180, protein: 13, carbs: 8, fats: 12, serving: "2 eggs" },
    "kerala parotta": { name: "Kerala Parotta", calories: 240, protein: 5, carbs: 36, fats: 10, serving: "1 parotta" },
    "beef fry": { name: "Kerala Beef Fry (Ularthiyathu)", calories: 320, protein: 28, carbs: 6, fats: 22, serving: "1 portion" },
    "fish pollichathu": { name: "Karimeen Pollichathu", calories: 280, protein: 32, carbs: 4, fats: 16, serving: "1 fish" },
    "kappa": { name: "Kappa (Tapioca) Mash", calories: 220, protein: 2, carbs: 52, fats: 1, serving: "1 bowl" },
    "meen curry": { name: "Kerala Fish Curry (Red)", calories: 210, protein: 24, carbs: 5, fats: 12, serving: "1 cup" },
    "avial": { name: "Avial", calories: 160, protein: 4, carbs: 12, fats: 12, serving: "1 cup" },
    "thoran": { name: "Cabbage Thoran", calories: 90, protein: 2, carbs: 8, fats: 6, serving: "1 cup" },
    "idiyappam": { name: "Idiyappam (Noolputtu)", calories: 95, protein: 2, carbs: 20, fats: 1, serving: "2 pieces" },
    "pathiri": { name: "Pathiri (Rice Roti)", calories: 85, protein: 2, carbs: 18, fats: 0.5, serving: "1 piece" },
    "chicken stew": { name: "Kerala Chicken Stew", calories: 260, protein: 22, carbs: 10, fats: 16, serving: "1 cup" },
    "unniyappam": { name: "Unniyappam", calories: 110, protein: 1, carbs: 18, fats: 5, serving: "1 piece" },
    "banana chips": { name: "Kerala Banana Chips", calories: 150, protein: 1, carbs: 20, fats: 8, serving: "10 pieces" },
    "neyyappam": { name: "Neyyappam", calories: 140, protein: 1.5, carbs: 22, fats: 6, serving: "1 piece" },
    "pazham pori": { name: "Pazham Pori (Banana Fritters)", calories: 180, protein: 2, carbs: 32, fats: 6, serving: "1 piece" },
    "sukhiyan": { name: "Sukhiyan", calories: 160, protein: 4, carbs: 22, fats: 6, serving: "1 piece" },
    "sadya": { name: "Kerala Sadya (Full Meal)", calories: 950, protein: 22, carbs: 150, fats: 32, serving: "1 banana leaf meal" },
    "payasam": { name: "Palada Payasam", calories: 220, protein: 4, carbs: 38, fats: 6, serving: "1 bowl" },

    // Breakfast items
    "idli": { name: "Idli (2 pieces)", calories: 130, protein: 4, carbs: 24, fats: 1, serving: "2 pieces" },
    "dosa": { name: "Dosa (1 plain)", calories: 168, protein: 4, carbs: 28, fats: 5, serving: "1 dosa" },
    "masala dosa": { name: "Masala Dosa", calories: 265, protein: 6, carbs: 38, fats: 10, serving: "1 dosa" },
    "poha": { name: "Poha", calories: 180, protein: 3, carbs: 32, fats: 5, serving: "1 bowl" },
    "upma": { name: "Upma", calories: 210, protein: 5, carbs: 30, fats: 8, serving: "1 bowl" },
    "paratha": { name: "Aloo Paratha", calories: 300, protein: 6, carbs: 40, fats: 14, serving: "1 paratha" },
    "omelette": { name: "Egg Omelette", calories: 154, protein: 11, carbs: 1, fats: 12, serving: "2 eggs" },
    "bread toast": { name: "Bread Toast with Butter", calories: 150, protein: 3, carbs: 20, fats: 7, serving: "2 slices" },
    "cornflakes": { name: "Cornflakes with Milk", calories: 200, protein: 7, carbs: 36, fats: 3, serving: "1 bowl" },
    "oatmeal": { name: "Oatmeal", calories: 150, protein: 5, carbs: 27, fats: 3, serving: "1 bowl" },
    "pancakes": { name: "Pancakes", calories: 227, protein: 6, carbs: 28, fats: 10, serving: "2 pieces" },
    "puri bhaji": { name: "Puri Bhaji", calories: 350, protein: 7, carbs: 42, fats: 16, serving: "3 puris" },

    // Lunch/Dinner items
    "rice": { name: "Steamed Rice", calories: 206, protein: 4, carbs: 45, fats: 0.4, serving: "1 cup" },
    "chapati": { name: "Chapati/Roti", calories: 104, protein: 3, carbs: 18, fats: 3, serving: "1 roti" },
    "dal": { name: "Dal (Toor/Moong)", calories: 150, protein: 9, carbs: 20, fats: 4, serving: "1 cup" },
    "rajma": { name: "Rajma Curry", calories: 210, protein: 12, carbs: 30, fats: 5, serving: "1 cup" },
    "chicken curry": { name: "Chicken Curry", calories: 280, protein: 28, carbs: 8, fats: 16, serving: "1 cup" },
    "chicken biryani": { name: "Chicken Biryani", calories: 490, protein: 22, carbs: 55, fats: 20, serving: "1 plate" },
    "paneer butter masala": { name: "Paneer Butter Masala", calories: 340, protein: 14, carbs: 12, fats: 26, serving: "1 cup" },
    "chole": { name: "Chole/Chana Masala", calories: 220, protein: 10, carbs: 32, fats: 7, serving: "1 cup" },
    "fish curry": { name: "Fish Curry", calories: 200, protein: 24, carbs: 6, fats: 9, serving: "1 cup" },
    "egg curry": { name: "Egg Curry", calories: 230, protein: 14, carbs: 8, fats: 16, serving: "1 cup" },
    "sambar": { name: "Sambar", calories: 120, protein: 5, carbs: 18, fats: 3, serving: "1 cup" },
    "rasam": { name: "Rasam", calories: 50, protein: 2, carbs: 8, fats: 1, serving: "1 cup" },
    "fried rice": { name: "Fried Rice", calories: 320, protein: 8, carbs: 48, fats: 12, serving: "1 plate" },
    "naan": { name: "Butter Naan", calories: 300, protein: 8, carbs: 42, fats: 12, serving: "1 naan" },
    "pizza": { name: "Pizza Slice", calories: 285, protein: 12, carbs: 36, fats: 10, serving: "1 slice" },
    "burger": { name: "Chicken Burger", calories: 450, protein: 22, carbs: 40, fats: 22, serving: "1 burger" },
    "pasta": { name: "Pasta in Red Sauce", calories: 340, protein: 10, carbs: 52, fats: 10, serving: "1 plate" },
    "sandwich": { name: "Veg Sandwich", calories: 220, protein: 7, carbs: 30, fats: 8, serving: "1 sandwich" },
    "salad": { name: "Mixed Salad", calories: 85, protein: 3, carbs: 12, fats: 3, serving: "1 bowl" },
    "soup": { name: "Veg Soup", calories: 90, protein: 3, carbs: 14, fats: 2, serving: "1 bowl" },

    // Snacks
    "samosa": { name: "Samosa", calories: 262, protein: 4, carbs: 24, fats: 17, serving: "1 piece" },
    "vada pav": { name: "Vada Pav", calories: 290, protein: 5, carbs: 36, fats: 14, serving: "1 piece" },
    "pakora": { name: "Pakora/Bhajji", calories: 180, protein: 4, carbs: 18, fats: 10, serving: "4 pieces" },
    "pav bhaji": { name: "Pav Bhaji", calories: 400, protein: 10, carbs: 52, fats: 18, serving: "1 plate" },
    "biscuits": { name: "Biscuits", calories: 140, protein: 2, carbs: 20, fats: 6, serving: "4 pieces" },
    "chips": { name: "Potato Chips", calories: 160, protein: 2, carbs: 15, fats: 10, serving: "1 small pack" },
    "nuts": { name: "Mixed Nuts", calories: 170, protein: 6, carbs: 6, fats: 15, serving: "1 handful" },
    "banana": { name: "Banana", calories: 105, protein: 1, carbs: 27, fats: 0.4, serving: "1 medium" },
    "apple": { name: "Apple", calories: 95, protein: 0.5, carbs: 25, fats: 0.3, serving: "1 medium" },
    "mango": { name: "Mango", calories: 200, protein: 3, carbs: 50, fats: 1, serving: "1 medium" },
    "orange": { name: "Orange", calories: 62, protein: 1, carbs: 15, fats: 0.2, serving: "1 medium" },
    "grapes": { name: "Grapes", calories: 104, protein: 1, carbs: 27, fats: 0.2, serving: "1 cup" },

    // Drinks
    "tea": { name: "Tea with Milk & Sugar", calories: 50, protein: 1, carbs: 8, fats: 1.5, serving: "1 cup" },
    "coffee": { name: "Coffee with Milk", calories: 60, protein: 2, carbs: 6, fats: 3, serving: "1 cup" },
    "black coffee": { name: "Black Coffee", calories: 5, protein: 0.3, carbs: 0, fats: 0, serving: "1 cup" },
    "lassi": { name: "Sweet Lassi", calories: 180, protein: 5, carbs: 30, fats: 5, serving: "1 glass" },
    "buttermilk": { name: "Buttermilk/Chaas", calories: 40, protein: 2, carbs: 5, fats: 1, serving: "1 glass" },
    "milk": { name: "Full Cream Milk", calories: 150, protein: 8, carbs: 12, fats: 8, serving: "1 glass" },
    "juice": { name: "Orange Juice", calories: 110, protein: 2, carbs: 26, fats: 0.5, serving: "1 glass" },
    "smoothie": { name: "Fruit Smoothie", calories: 200, protein: 5, carbs: 38, fats: 3, serving: "1 glass" },
    "cola": { name: "Cola/Soda", calories: 140, protein: 0, carbs: 39, fats: 0, serving: "1 can" },
    "protein shake": { name: "Protein Shake", calories: 180, protein: 25, carbs: 10, fats: 4, serving: "1 scoop" },

    // Desserts
    "gulab jamun": { name: "Gulab Jamun", calories: 175, protein: 2, carbs: 26, fats: 7, serving: "2 pieces" },
    "rasgulla": { name: "Rasgulla", calories: 140, protein: 3, carbs: 28, fats: 2, serving: "2 pieces" },
    "ice cream": { name: "Ice Cream", calories: 207, protein: 4, carbs: 24, fats: 11, serving: "1 scoop" },
    "cake": { name: "Cake Slice", calories: 290, protein: 4, carbs: 38, fats: 14, serving: "1 slice" },
    "chocolate": { name: "Chocolate Bar", calories: 230, protein: 3, carbs: 25, fats: 13, serving: "1 bar" },
    "jalebi": { name: "Jalebi", calories: 300, protein: 2, carbs: 52, fats: 10, serving: "3 pieces" },
    "kheer": { name: "Rice Kheer", calories: 200, protein: 5, carbs: 32, fats: 6, serving: "1 bowl" },
    "halwa": { name: "Sooji Halwa", calories: 250, protein: 3, carbs: 36, fats: 11, serving: "1 bowl" },
};

export function searchFoods(query) {
    const q = query.toLowerCase().trim();
    if (!q) return [];

    return Object.entries(foodDatabase)
        .filter(([key, food]) =>
            key.includes(q) || food.name.toLowerCase().includes(q)
        )
        .map(([key, food]) => ({ id: key, ...food }))
        .slice(0, 10);
}

export function getFoodByName(name) {
    const key = name.toLowerCase().trim();
    if (foodDatabase[key]) {
        return { id: key, ...foodDatabase[key] };
    }
    // Try partial match
    const entry = Object.entries(foodDatabase).find(([k, f]) =>
        k.includes(key) || f.name.toLowerCase().includes(key)
    );
    return entry ? { id: entry[0], ...entry[1] } : null;
}
