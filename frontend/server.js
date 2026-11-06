const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());

// Указываем Express, где лежат файлы сборки React
app.use(express.static(path.join(__dirname, 'client', 'build')));

// Наше API для поиска
app.get('/api/search', (req, res) => {
    res.json({
        status: "success",
        flights: [
            { id: 1, number: "SU-123", time: "10:00", price: "15 000 ₽" },
            { id: 2, number: "UN-456", time: "14:30", price: "12 500 ₽" }
        ]
    });
});

// Отдаем React на все остальные запросы
app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Node.js сервер запущен на http://localhost:${PORT}`);
});