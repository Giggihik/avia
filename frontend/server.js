const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());

// Указываем Express, где лежат файлы сборки React
app.use(express.static(path.join(__dirname, 'client', 'build')));

// API для поиска (общается с Django)
app.get('/api/search', async (req, res) => {
    const { from, to } = req.query;
    
    try {
        // Делаем запрос к Django (порт 8000)
        const djangoUrl = `http://127.0.0.1:8000/api/flights/?from=${from || ''}&to=${to || ''}`;
        const response = await fetch(djangoUrl);
        
        if (!response.ok) throw new Error('Ошибка от Django');
        
        const data = await response.json();
        res.json(data); // Отдаем данные в React
    } catch (error) {
        console.error("Ошибка связи с Django:", error.message);
        // Если Django выключен, отдаем заглушку, чтобы сайт не сломался
        res.json({ 
            status: "error", 
            message: "Сервер Django не отвечает. Показываем тестовые данные.",
            flights: [
                { id: 1, number: "SU-123 (Тест)", time: "10:00", price: "15 000 ₽" },
                { id: 2, number: "UN-456 (Тест)", time: "14:30", price: "12 500 ₽" }
            ] 
        });
    }
});
// Отдаем React на все остальные запросы
app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Node.js сервер запущен на http://localhost:${PORT}`);
});