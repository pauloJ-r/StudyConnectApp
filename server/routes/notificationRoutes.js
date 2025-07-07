const express = require('express');
const router = express.Router();
const { getNotifications, markAsRead, deleteNotification } = require('../controllers/notificationController');
const checkToken = require('../middlewares/authMiddleware');

// Rota para recuperar todas as notificações do usuário autenticado : /notifications
router.get('/', checkToken, getNotifications);

// Rota para marcar uma notificação como lida: /notifications/:notificationId/read
router.patch('/:notificationId/read', checkToken, markAsRead);

// Rota para apagar uma notificação: /notifications/:notificationId
router.delete('/:notificationId', checkToken, deleteNotification);

module.exports = router;
