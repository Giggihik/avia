import React, { useState } from 'react';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Загрузка...');
    
    // Выбираем URL в зависимости от режима (вход или регистрация)
    const url = isLogin ? 'http://localhost:3000/api/login' : 'http://localhost:3000/api/register';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      
      if (data.status === 'success') {
        setMessage('✅ ' + data.message);
        if(isLogin) {
            // Если вошли, сохраняем email в браузере
            localStorage.setItem('user', data.user);
            setTimeout(() => window.location.href = '/', 1000); // Перекидываем на главную
        }
      } else {
        setMessage('❌ ' + data.message);
      }
    } catch (error) {
      setMessage('❌ Ошибка сервера');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2>{isLogin ? 'ВХОД В АККАУНТ' : 'РЕГИСТРАЦИЯ'}</h2>
        
        <form onSubmit={handleSubmit} className="auth-form">
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} required />
          
          <button type="submit" className="btn-primary">
            {isLogin ? 'Войти' : 'Зарегистрироваться'}
          </button>
        </form>

        {/* Показываем сообщение об успехе или ошибке */}
        {message && <p style={{textAlign: 'center', marginTop: '15px', color: message.includes('✅') ? '#64ffda' : '#ff4d4d'}}>{message}</p>}

        <p className="auth-switch">
          {isLogin ? 'Нет аккаунта? ' : 'Уже есть аккаунт? '}
          <span onClick={() => { setIsLogin(!isLogin); setMessage(''); }}>
            {isLogin ? 'Зарегистрируйтесь' : 'Войдите'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Auth;