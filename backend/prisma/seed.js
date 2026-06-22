require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const dishData = [
  {
    "dishId": "1",
    "dishName": "Margherita Pizza",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg",
    "isPublished": true
  },
  {
    "dishId": "2",
    "dishName": "Spaghetti Carbonara",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/3/33/Fresh_made_pasta_ii.jpg",
    "isPublished": false
  },
  {
    "dishId": "3",
    "dishName": "Caesar Salad",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Caesar_salad_%281%29.jpg/320px-Caesar_salad_%281%29.jpg",
    "isPublished": true
  },
  {
    "dishId": "4",
    "dishName": "Chicken Tikka Masala",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/a/a7/Chicken_tikka_masala.jpg",
    "isPublished": true
  },
  {
    "dishId": "5",
    "dishName": "Beef Burger",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/f/fb/Burger_King_Angus_bacon_%26_cheese_large.jpg",
    "isPublished": false
  },
  {
    "dishId": "6",
    "dishName": "Tacos",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/7/73/001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg",
    "isPublished": true
  },
  {
    "dishId": "7",
    "dishName": "Sushi Platter",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/6/60/Sushi_platter.jpg",
    "isPublished": false
  },
  {
    "dishId": "8",
    "dishName": "Pad Thai",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/7/77/Phatthairawmatnam.jpg",
    "isPublished": true
  }
];

async function main() {
  console.log('Seeding initial dish data...');
  
  // Clear existing dishes to ensure clean state and avoid duplicate IDs
  await prisma.dish.deleteMany({});
  
  for (const dish of dishData) {
    const createdDish = await prisma.dish.create({
      data: dish
    });
    console.log(`Created dish with ID: ${createdDish.dishId} (${createdDish.dishName})`);
  }
  
  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
