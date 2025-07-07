const Notification = require('../models/Notification');

// Criar uma nova notificação
const createNotification = async (userId, content) => {
    try {
        const notification = new Notification({ userId, content });
        await notification.save();
        return notification;
    } catch (error) {
        throw new Error('Erro ao criar notificação: ' + error.message);
    }
};

// Recuperar todas as notificações de um usuário
const getNotifications = async (req, res) => {
    try {
        const userId = req.user._id; // Supõe que o middleware `auth` adiciona `req.user`
        const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });
        res.status(200).json({ notifications });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao recuperar notificações', error: error.message });
    }
};

// Marcar notificações como lidas
const markAsRead = async (req, res) => {
    try {
        const { notificationId } = req.params;
        const notification = await Notification.findByIdAndUpdate(notificationId, { isRead: true }, { new: true });
        if (!notification) {
            return res.status(404).json({ message: 'Notificação não encontrada' });
        }
        res.status(200).json({ message: 'Notificação marcada como lida', notification });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao marcar notificação como lida', error: error.message });
    }
};

// Apagar uma notificação
const deleteNotification = async (req, res) => {
    try {
        const { notificationId } = req.params;
        const notification = await Notification.findByIdAndDelete(notificationId);
        if (!notification) {
            return res.status(404).json({ message: 'Notificação não encontrada' });
        }
        res.status(200).json({ message: 'Notificação apagada' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao apagar notificação', error: error.message });
    }
};

module.exports = {
    createNotification,
    getNotifications,
    markAsRead,
    deleteNotification,
};
