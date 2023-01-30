// Заголовок модуля
$('.module-title').html($('.page-header h1').html().split(' ').map((el) => `<span>${el}</span>`).join('\n'));



// Статус задания
$('.lesson-list li').each((i, el) => {

  const info = $(el).find('.vmiddle div:not(.title):not(.description)');

  if (info.length == 0) {
    return;
  }


  $(el).find('.vmiddle').append(`
    <div class="lesson-footer"></div>
  `);

  $(el).find('.lesson-footer').append(`
  <div class="lesson-starts">
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M5 0C5.55228 0 6 0.447715 6 1V2H14V1C14 0.447715 14.4477 0 15 0C15.5523 0 16 0.447715 16 1V2H17C18.6569 2 20 3.34315 20 5V17C20 18.6569 18.6569 20 17 20H3C1.34315 20 0 18.6569 0 17V5C0 3.34315 1.34315 2 3 2H4V1C4 0.447715 4.44772 0 5 0ZM14 4V5C14 5.55228 14.4477 6 15 6C15.5523 6 16 5.55228 16 5V4H17C17.5523 4 18 4.44771 18 5V8H2V5C2 4.44772 2.44772 4 3 4H4V5C4 5.55228 4.44772 6 5 6C5.55228 6 6 5.55228 6 5V4H14ZM2 10V17C2 17.5523 2.44772 18 3 18H17C17.5523 18 18 17.5523 18 17V10H2Z" fill="#6F767E"/>
  </svg>
  <span>
    ${$(el).find('.lesson-date').text().replace('Дата и время начала ', '')}
  </span> 
  </div>
  `);
  $(el).find('.lesson-footer').append(`
  <div class="task-status-has">
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M15 2H3C2.44772 2 2 2.44772 2 3V15C2 15.5523 2.44772 16 3 16H15C15.5523 16 16 15.5523 16 15V3C16 2.44772 15.5523 2 15 2ZM3 0C1.34315 0 0 1.34315 0 3V15C0 16.6569 1.34315 18 3 18H15C16.6569 18 18 16.6569 18 15V3C18 1.34315 16.6569 0 15 0H3Z" fill="#6F767E"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M13.7071 5.29289C14.0976 5.68342 14.0976 6.31658 13.7071 6.70711L8.41421 12C7.63317 12.781 6.36684 12.7811 5.58579 12L3.79289 10.2071C3.40237 9.81658 3.40237 9.18342 3.79289 8.79289C4.18342 8.40237 4.81658 8.40237 5.20711 8.79289L7 10.5858L12.2929 5.29289C12.6834 4.90237 13.3166 4.90237 13.7071 5.29289Z" fill="#6F767E"/>
    </svg>
    <span>Есть задание</span>
  </div>`);
  $(el).find('.lesson-footer').append(`
  <div class="task-status-reached">
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M3 0C1.34315 0 0 1.34315 0 3V15C0 16.6569 1.34315 18 3 18H15C16.6569 18 18 16.6569 18 15V3C18 1.34315 16.6569 0 15 0H3ZM13.7071 6.70711C14.0976 6.31658 14.0976 5.68342 13.7071 5.29289C13.3166 4.90237 12.6834 4.90237 12.2929 5.29289L7 10.5858L5.20711 8.79289C4.81658 8.40237 4.18342 8.40237 3.79289 8.79289C3.40237 9.18342 3.40237 9.81658 3.79289 10.2071L5.58579 12C6.36684 12.7811 7.63317 12.781 8.41421 12L13.7071 6.70711Z" fill="#EBFF00"/>
    </svg>
    <span>Выполнено</span>
  </div>`);




  info.each((i, el) => el.remove());
});
