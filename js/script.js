document.addEventListener('DOMContentLoaded', () => {
  // Установите конечную дату
  const deadline = new Date('2026-09-12T14:30:00');
  
  // Найдите элементы DOM
  const elDays = document.querySelector('.timer__days');
  const elHours = document.querySelector('.timer__hours');
  const elMinutes = document.querySelector('.timer__minutes');
  const elSeconds = document.querySelector('.timer__seconds');
  
  // Функция склонения числительных
  const declensionNum = (num, words) => {
    return words[(num % 100 > 4 && num % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][num % 10 < 5 ? num % 10 : 5]];
  };

  // Функция обновления таймера
  const updateTimer = () => {
    const now = new Date();
    const diff = Math.max(0, deadline - now);

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    elDays.textContent = String(days).padStart(2, '0');
    elHours.textContent = String(hours).padStart(2, '0');
    elMinutes.textContent = String(minutes).padStart(2, '0');
    elSeconds.textContent = String(seconds).padStart(2, '0');

    elDays.dataset.title = declensionNum(days, ['день', 'дня', 'дней']);
    elHours.dataset.title = declensionNum(hours, ['час', 'часа', 'часов']);
    elMinutes.dataset.title = declensionNum(minutes, ['минута', 'минуты', 'минут']);
    elSeconds.dataset.title = declensionNum(seconds, ['секунду', 'секунды', 'секунд']);

    if (diff === 0) {
      clearInterval(timerId);
    }
  };

  // Запустите таймер
  updateTimer();
  const timerId = setInterval(updateTimer, 1000);
});

// Плавное появление секций и time-step
document.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll('section, .time-step');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Добавляем класс visible
        entry.target.classList.add('visible');
        // Можно отключить наблюдение после появления
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15, // когда 15% элемента видно
    rootMargin: '0px 0px -50px 0px' // немного смещаем, чтобы срабатывало чуть раньше
  });

  elements.forEach(el => observer.observe(el));
});
