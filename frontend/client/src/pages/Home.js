import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [flights, setFlights] = useState([]); // Храним найденные рейсы
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false); // Показывает, был ли поиск
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSearched(true);

    try {
      // Отправляем запрос на наш Node.js сервер
      const response = await fetch(`http://localhost:3000/api/search?from=${from}&to=${to}`);
      const data = await response.json();
      
      setFlights(data.flights || []);
    } catch (error) {
      console.error("Ошибка поиска:", error);
      setFlights([]);
    }
    setLoading(false);
  };

  return (
    <div className="home-page">
      <section className="hero-section">
        
        <div className="hero-content">
          <motion.h1 initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            ВАШЕ ПУТЕШЕСТВИЕ НАЧИНАЕТСЯ ЗДЕСЬ
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.3 }}>
            Откройте для себя новые горизонты с Tycon Airlines
          </motion.p>
        </div>

        <motion.form 
          className="search-form" 
          onSubmit={handleSearch}
          initial={{ opacity: 0, y: 50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="input-group">
            <label>Откуда</label>
            <input type="text" value={from} onChange={(e) => setFrom(e.target.value)} required />
          </div>
          <div className="input-group">
            <label>Куда</label>
            <input type="text" value={to} onChange={(e) => setTo(e.target.value)} required />
          </div>
          <div className="input-group">
            <label>Дата</label>
            <input type="date" required />
          </div>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'ПОИСК...' : 'НАЙТИ БИЛЕТЫ'}
          </button>
        </motion.form>
      </section>

      {/* БЛОК РЕЗУЛЬТАТОВ ПОИСКА */}
      {searched && (
        <section className="search-results">
          <h2>Результаты поиска</h2>
          
          {flights.length === 0 && !loading && (
            <p className="no-results">По вашему запросу ничего не найдено. Попробуйте изменить города.</p>
          )}

          <div className="results-grid">
            {flights.map((flight, index) => (
              <motion.div 
                key={index} 
                className="flight-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="flight-info">
                  <h3>Рейс {flight.number}</h3>
                  <p>Вылет: {flight.time}</p>
                </div>
                <div className="flight-price">
                  <span>{flight.price}</span>
                  <button className="btn-secondary" onClick={() => navigate('/booking')}>Выбрать</button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      <section className="offers-section">
        <h2>СПЕЦИАЛЬНЫЕ ПРЕДЛОЖЕНИЯ</h2>
        <div className="offers-grid">
          {/* (Оставляем карточки предложений без изменений) */}
          <motion.div className="offer-card" initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="offer-image" style={{backgroundImage: "url('https://images.unsplash.com/photo-1542296332-2e4473faf563?q=80&w=1000')"}}></div>
            <h3>БИЗНЕС-КЛАСС</h3>
            <p>Максимальный комфорт и премиальное обслуживание на борту.</p>
            <button className="btn-secondary" onClick={() => navigate('/booking')}>Забронировать</button>
          </motion.div>

          <motion.div className="offer-card" initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
            <div className="offer-image" style={{backgroundImage: "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000')"}}></div>
            <h3>ЛЕТНИЕ НАПРАВЛЕНИЯ</h3>
            <p>Скидки до 30% на рейсы к морю. Успейте купить билеты!</p>
            <button className="btn-secondary" onClick={() => navigate('/booking')}>Забронировать</button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;