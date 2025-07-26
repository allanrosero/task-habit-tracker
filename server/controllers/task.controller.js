import prisma from '../lib/prismaClient.js';

export const getTasks = async (req, res) => {
    const userId = req.user.userId;

    try {
        const tasks = await prisma.task.findMany({ where: { userId } });
        console.log(tasks)
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch tasks', error: err.message });
    }
};

export const createTask = async (req, res) => {
    const userId = req.user.userId;
    const { title, description, dueDate } = req.body;

    try {
        const task = await prisma.task.create({
            data: {
                title,
                description,
                dueDate: dueDate ? new Date(dueDate) : undefined,
                userId,
            },
        });
        res.status(201).json(task);
    } catch (err) {
        res.status(500).json({ message: 'Failed to create task', error: err.message });
    }
};

export const updateTask = async (req, res) => {
    const userId = req.user.userId;
    const { id } = req.params;
    const { title, description, dueDate, isCompleted } = req.body;

    try {
        const task = await prisma.task.updateMany({
            where: { id, userId },
            data: {
                title,
                description,
                dueDate: dueDate ? new Date(dueDate) : undefined,
                isCompleted,
            },
        });
        res.json({ message: 'Task updated', task });
    } catch (err) {
        res.status(500).json({ message: 'Failed to update task', error: err.message });
    }
};

export const deleteTask = async (req, res) => {
    const userId = req.user.userId;
    const { id } = req.params;

    try {
        await prisma.task.deleteMany({ where: { id, userId } });
        res.json({ message: 'Task deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete task', error: err.message });
    }
};
