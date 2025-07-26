import prisma from '../lib/prismaClient.js';

export const getHabits = async (req, res) => {
    const userId = req.user.userId;

    try {
        const habits = await prisma.habit.findMany({ where: { userId } });
        res.json(habits);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch habits', error: err.message });
    }
};

export const createHabit = async (req, res) => {
    const userId = req.user.userId;
    const { name, description, frequency, startDate } = req.body;

    try {
        const habit = await prisma.habit.create({
            data: {
                name,
                description,
                frequency,
                startDate: new Date(startDate),
                userId,
            },
        });
        res.status(201).json(habit);
    } catch (err) {
        res.status(500).json({ message: 'Failed to create habit', error: err.message });
    }
};

export const updateHabit = async (req, res) => {
    const userId = req.user.userId;
    const { id } = req.params;
    const { name, description, frequency, startDate, isActive } = req.body;

    try {
        const habit = await prisma.habit.updateMany({
            where: { id, userId },
            data: {
                name,
                description,
                frequency,
                startDate: startDate ? new Date(startDate) : undefined,
                isActive,
            },
        });
        res.json({ message: 'Habit updated', habit });
    } catch (err) {
        res.status(500).json({ message: 'Failed to update habit', error: err.message });
    }
};

export const deleteHabit = async (req, res) => {
    const userId = req.user.userId;
    const { id } = req.params;

    try {
        await prisma.habit.deleteMany({ where: { id, userId } });
        res.json({ message: 'Habit deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete habit', error: err.message });
    }
};
