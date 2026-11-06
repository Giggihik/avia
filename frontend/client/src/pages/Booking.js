import React from 'react';

const Booking = () => {
  return (
    <div className="booking-page">
      <div className="container">
        <h1 className="page-title">БРОНИРОВАНИЕ БИЛЕТА</h1>
        
        <form className="booking-form">
          <div className="form-section">
            <h3>Информация о пассажире</h3>
            <div className="input-row">
              <input type="text" placeholder="Имя" required />
              <input type="text" placeholder="Фамилия" required />
            </div>
            <input type="text" placeholder="Номер паспорта" required />
            <input type="email" placeholder="Email" required />
            <input type="tel" placeholder="Телефон" required />
          </div>

          <div className="form-section">
            <h3>Выбор класса</h3>
            <div className="class-selection">
              <label className="class-card">
                <input type="radio" name="class" value="economy" defaultChecked />
                <div className="class-info">
                  <h4>Эконом</h4>
                  <p>От 5 000 ₽</p>
                </div>
              </label>
              <label className="class-card">
                <input type="radio" name="class" value="business" />
                <div className="class-info">
                  <h4>Бизнес</h4>
                  <p>От 15 000 ₽</p>
                </div>
              </label>
            </div>
          </div>

          <button type="submit" className="btn-primary" onClick={(e) => { e.preventDefault(); alert('Форма отправлена!'); }}>
            ОПЛАТИТЬ БИЛЕТ
          </button>
        </form>
      </div>
    </div>
  );
};

export default Booking;