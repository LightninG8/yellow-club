$( document ).ready( () => {
  $('.gc-main-content').prepend(`
    <div class="module-background">
      <div class="module-name">Урок</div>
      <div class="module-title"></div>
    </div>
  `);

  $('.module-title').text($('.lesson-title-value').text());

  const nextLessonLink = $('.lesson-navigation .text-right a').attr('href');

  const nextLessonButton = (`
  <div class="module-button module-next-lesson" onclick="javascript:document.location.href='${nextLessonLink}'">
  <span>Следующий урок</span>

  <svg width="19" height="16" viewbox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M8.7072 13.7929C9.09772 14.1834 9.09772 14.8166 8.7072 15.2071C8.31668 15.5976 7.68351 15.5976 7.29299 15.2071L1.50009 9.41421C0.719046 8.63317 0.719044 7.36684 1.50009 6.58579L7.29299 0.792894C7.68351 0.402369 8.31668 0.402369 8.7072 0.792894C9.09772 1.18342 9.09772 1.81658 8.7072 2.20711L3.91431 7H18.0001C18.5524 7 19.0001 7.44772 19.0001 8C19.0001 8.55229 18.5524 9 18.0001 9H3.91431L8.7072 13.7929Z" fill="#6F767E"></path>
  </svg>
</div>
`)

  $('.page-header').before(`
  <div class="module-header">
    <div class="module-header-title">
  Описание урока
    </div>
    <div class="module-navigation">
      <div class="module-button module-header-back-to" onclick="javascript:history.back()">
        <svg width="19" height="16" viewbox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.7072 13.7929C9.09772 14.1834 9.09772 14.8166 8.7072 15.2071C8.31668 15.5976 7.68351 15.5976 7.29299 15.2071L1.50009 9.41421C0.719046 8.63317 0.719044 7.36684 1.50009 6.58579L7.29299 0.792894C7.68351 0.402369 8.31668 0.402369 8.7072 0.792894C9.09772 1.18342 9.09772 1.81658 8.7072 2.20711L3.91431 7H18.0001C18.5524 7 19.0001 7.44772 19.0001 8C19.0001 8.55229 18.5524 9 18.0001 9H3.91431L8.7072 13.7929Z" fill="#6F767E"></path>
        </svg>
        <span>Назад</span>
      </div>
      ${(nextLessonLink && nextLessonButton) || ''}
    </div>
    
  </div>`);

})
