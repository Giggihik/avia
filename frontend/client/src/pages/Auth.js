import React, { useState } from 'react';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(isLogin ? "Выполняется вход..." : "Выполняется регистрация...");
    // Здесь позже будет связь с Django
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2>{isLogin ? 'ВХОД В АККАУНТ' : 'РЕГИСТРАЦИЯ'}</h2>
        
        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <>
              <input type="text" placeholder="Имя" required />
              <input type="text" placeholder="Фамилия" required />
              <input type="text" placeholder="Номер паспорта" required />
            </>
          )}
          
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Пароль" required />
          
          <button type="submit" className="btn-primary">
            {isLogin ? 'Войти' : 'Зарегистрироваться'}
          </button>
        </form>

        <p className="auth-switch">
          {isLogin ? 'Нет аккаунта? ' : 'Уже есть аккаунт? '}
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Зарегистрируйтесь' : 'Войдите'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Auth;