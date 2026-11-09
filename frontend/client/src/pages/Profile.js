import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [tickets, setTickets] = useState([]);
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem('user');
    if (!email) {
      navigate('/auth'); // Если не вошел, кидаем на страницу входа
      return;
    }
    setUserEmail(email);
    fetchTickets(email);
  }, [navigate]);

  const fetchTickets = async (email) => {
    const res = await fetch(`http://localhost:3000/api/user-tickets?email=${email}`);
    const data = await res.json();
    if (data.status === 'success') setTickets(data.tickets);
  };

  const handleCancel = async (ticketId) => {
    if (window.confirm("Вы уверены, что хотите сдать билет?")) {
      await fetch('http://localhost:3000/api/cancel-ticket', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticket_id: ticketId })
      });
      fetchTickets(userEmail); // Обновляем список после отмены
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <h2>ЛИЧНЫЙ КАБИНЕТ</h2>
        <p className="profile-email">Пользователь: {userEmail}</p>
        
        <h3>Мои билеты</h3>
        {tickets.length === 0 ? (
          <p>У вас пока нет купленных билетов.</p>
        ) : (
          <div className="tickets-list">
            {tickets.map(t => (
              <div key={t.ticket_id} className={`ticket-card ${t.status === 'RET' ? 'cancelled' : ''}`}>
                <div>
                  <h4>{t.flight}</h4>
                  <p>Дата: {t.date} | Место: {t.seat}</p>
                </div>
                <div className="ticket-actions">
                  <span className="ticket-price">{t.price}</span>
                  {t.status === 'ACT' ? (
                    <button className="btn-cancel" onClick={() => handleCancel(t.ticket_id)}>Сдать</button>
                  ) : (
                    <span className="status-ret">Возвращен</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;