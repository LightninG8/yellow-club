(() => {
  const offersCount = $('.offers-list .builder > div').length;


  for (let i = 1; i <= offersCount; i++) {
    let offerTitle = $(`.offer-${i} .offer-title`).text();
    const offerPrice = offerTitle.split(' ').reverse()[0];

    offerTitle = offerTitle.replace(offerPrice, '').trim();

    const button = $(`.offer-${i} button`);
    
    button.text(`${offerPrice} баллов`);
    button.removeAttr('class');
    button.removeAttr('style');

    button.addClass('item__button');



    $('.shop__list').append(`
      <li class="shop__item item item-${i}">
        <p class="item__title">${offerTitle}</p>
      </li>
    `)

    $(`.item-${i}`).append(button);
  }

  $('.offers-list, .offers-buttons').remove();
})();
