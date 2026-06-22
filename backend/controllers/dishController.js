const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Fetch all dishes ordered by createdAt desc
const getAllDishes = async (req, res) => {
  try {
    const dishes = await prisma.dish.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return res.json(dishes);
  } catch (error) {
    console.error('Error fetching dishes:', error);
    return res.status(500).json({ error: 'Server error while fetching dishes' });
  }
};

// Toggle isPublished state of a dish and emit a real-time event
const togglePublished = async (req, res) => {
  try {
    const { dishId } = req.params;

    // Find dish
    const dish = await prisma.dish.findUnique({
      where: { dishId },
    });

    if (!dish) {
      return res.status(404).json({ error: 'Dish not found' });
    }

    // Toggle isPublished
    const updatedDish = await prisma.dish.update({
      where: { dishId },
      data: {
        isPublished: !dish.isPublished,
      },
    });

    // Import the exported io instance from server.js to emit the socket event
    const { io } = require('../server');
    if (io) {
      io.emit('dish:updated', updatedDish);
      console.log(`Broadcasted dish:updated event for dish ${dishId} to all clients`);
    } else {
      console.warn('Socket.io io instance is not initialized or exported yet');
    }

    return res.json(updatedDish);
  } catch (error) {
    console.error('Error toggling dish publication:', error);
    return res.status(500).json({ error: 'Server error while toggling publication state' });
  }
};

module.exports = {
  getAllDishes,
  togglePublished,
};
