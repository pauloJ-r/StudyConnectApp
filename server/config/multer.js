// middlewares/upload.js (exemplo de caminho)
const multer = require('multer');

// -> MUDANÇA PRINCIPAL: Usar armazenamento em memória
const storage = multer.memoryStorage();

// Filtro para aceitar apenas imagens (continua igual)
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Arquivo não suportado!'), false);
    }
};

// Middleware do Multer
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
});

module.exports = upload;