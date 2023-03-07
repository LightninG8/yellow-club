// https://monstersreels.online/cms/counters/menu
// https://monstersreels.online/pl/tasks/task/get-data

$(()=>{setTimeout(()=>{

  // Фикс страниц Профиль, Смена пароля, Чатиум
  $('script[src*="/stat/counter"]').remove();

  // Прячем меню
  $('#gcAccountUserMenu').hide();

  $.getJSON( "/c/sa/user/profile/"+window.accountUserId, (userdata) => {
    if(
      typeof userdata.success == "undefined"
      || userdata.success === false
      || !window.gcAccountUserMenu
      || !$('#gcAccountUserMenu').length
    ) {
      $('#gcAccountUserMenu').show();

      return
    }

    // Контейнер меню
    $('#gcAccountUserMenu').after(`
      <div class="leftbar" id="leftbar">
        <header class="leftbar__header header">
          <div class="header__logo">
            <svg width="44" height="32" viewBox="0 0 48 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M48 36H39.8076V11.1951L28.1512 36H19.8488L8.19244 11.0854V36H0V0H11.3814L24.0275 26.7256L36.6186 0H48V36Z" fill="#EBFF00"/>
            </svg>
          </div>
          <div class="header__buttons">
            <a href="/notifications/notifications/all" class="header__notify">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M0 14.5959C2.07459e-06 14.2151 0.154705 13.8506 0.428635 13.586L1.45759 12.5922C1.84928 12.2139 2.06977 11.6922 2.06814 11.1476L2.05867 7.9946C2.04543 3.58319 5.61789 0 10.0293 0C14.4314 0 18 3.56859 18 7.97067L18 11.1716C18 11.702 18.2107 12.2107 18.5858 12.5858L19.5858 13.5858C19.851 13.851 20 14.2107 20 14.5858C20 15.3668 19.3668 16 18.5858 16H14C14 18.2091 12.2091 20 10 20C7.79086 20 6 18.2091 6 16H1.40408C0.628628 16 0 15.3714 0 14.5959ZM8 16C8 17.1046 8.89543 18 10 18C11.1046 18 12 17.1046 12 16H8ZM16 11.1716C16 12.2324 16.4214 13.2499 17.1716 14L2.87851 14C3.64222 13.246 4.07136 12.2161 4.06813 11.1416L4.05867 7.9886C4.04875 4.6841 6.7248 2 10.0293 2C13.3268 2 16 4.67316 16 7.97067L16 11.1716Z" fill="white" fill-opacity="0.38"/>
              </svg>
            </a>
            <div class="header__burger">
              <svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 16H0V13.3333H24V16ZM24 9.33333H0V6.66667H24V9.33333ZM24 2.66667H0V0H24V2.66667Z" fill="white"/>
              </svg>
            </div>
          </div>
        </header>
        <div class="leftbar__body">
          <ul class="gc-account-user-menu">
          </ul>
          <div class="leftbar__rollup rollup">
            <div class="rollup__icon">
              <svg width="25" height="25" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M36 12L24 24L12 12" stroke="#6F767E" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M36 24L24 36L12 24" stroke="#6F767E" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div class="rollup__title">Свернуть меню</div>
          </div>
          <div class="leftbar__close">
            × Закрыть
          </div>
        </div>
        <div class="rollup__notifications notifications">

        </div>
      </div>
    `);


    // Элементы меню
    $.each(window.gcAccountUserMenu.items, (i, el) => {
      const parent = $(`.gc-account-leftbar .menu-item-${el.id}`);
      const isActive = parent.hasClass('active');

      const notifyCount = parent.find('.notify-count').text()
  
      const label = el.id == 'notifications_button_small' ? 'Уведомления' : el.label;
      let link = el.id == 'notifications_button_small' ?  '/notifications/notifications/all' : el.subitems.length > 1 ? 'javascript:void(0)' : el.subitems[0]?.url;

      

      // Фикс с подменой страниц
      // if (el.id == 'chatium') {
      //   link = '/chatium';
      //   el.subitems = [];
      // }


      const arrow = el.subitems.length > 1 ? '<div class="item__arrow"> <svg class="strelka-bottom-3" height="14" viewBox="0 0 5 9"><path d="M0.419,9.000 L0.003,8.606 L4.164,4.500 L0.003,0.394 L0.419,0.000 L4.997,4.500 L0.419,9.000 Z" fill="#6F767E"></div>': '';

      let submenu = '';




      if (el.subitems.length > 1) {
        const subitems = [];
    
        $.each(el.subitems, (i, el) => {
          let url = el.url;

          // switch (el.url) {
          //   case '/user/my/profile':
          //     url = '/profile';
          //     break;
          //   case '/user/my/changePassword':
          //     url = '/changePassword';
          //     break;
          //   default:
          //     url = url;
          // };
    
          subitems.push(`
            <div class="submenu__item">
              <a class="submenu__link" href="${url}">${el.label}</a>
              <span class="submenu__notify"></span>
            </div>
          `)

        });

        submenu = `<div class="submenu submenu__body">${subitems.join('\n')}</div>`

      }

    
      // Аватар
      if (el.id == 'profile') {
        $('#leftbar .gc-account-user-menu').append(`
          <li class="menu__item menu__item_${el.id} item ${isActive ? 'active' : ''}">
            <a href="${link}" class="item__profile item__header ${submenu && 'accordeon'} profile">
              <div class="profile__avatar" style="background-image: url(${el.iconUrl})"></div>
              <div class="profile__info">
                <div class="profile__name">${userdata.data.title}</div>
                <div class="profile__email">${userdata.data.blocks.find((el) => el.description == "Эл. адрес")?.title}</div>
              </div>
              ${arrow}
            </a>
            ${submenu}
          </li>
        `);
        
        return;
        
      }

      $('#leftbar .gc-account-user-menu').append(`
        <li class="menu__item menu__item_${el.id} item ${isActive ? 'active' : ''}">
          <a href="${link}" class="item__header ${submenu && 'accordeon'} ">
            <div class="item__icon">
              ${iconsList[el.id]}
            </div>
            <span class="item__title">${label}</span>
            ${notifyCount ? `<span class="item__notify">${notifyCount}</span>` : ''}
            ${arrow}
          </a>
          ${submenu}
        </li>
      `);

    })

    // Открытие субменю
    $('.menu__item .accordeon').on('click', toggleSubmenu);



    // Сворачивание меню
    $('.rollup').on('click', rollupMenu)





    // Удаляем старое меню
    $('#gcAccountUserMenu .gc-account-user-menu').remove();




            
    // Кнопка уведомлений 
    $('.menu__item_notifications_button_small').on('click', (e) => {
      window.innerWidth > 768 && e.preventDefault();

      $(document.body).on('mouseup', function close(e) {

        const containerBody = $('.rollup__notifications.show');

        if (containerBody.has(e.target).length === 0 && !$(e.target).is(containerBody)){
          containerBody.hide();
          containerBody.removeClass('show');

          $(document.body).off('mouseup', close);

        }
      });


      updateNotifications();
    });

    $('.rollup__notifications').on('click', (e) => {
      if (e.target.classList.contains('notification__mark-viewed')) {
        e.preventDefault();

        const groupId = $(e.target).parent().data('groupId');

        $.ajax({
          url: '/notifications/notifications/viewed',
          method: 'post',
          dataType: 'json',
          data: {id: groupId},
          success: updateNotifications
        });
      } else if (e.target.classList.contains('notifications__mark-viewed-all')) {
        $.ajax({
          url: '/notifications/notifications/viewedAll',
          method: 'post',
          dataType: 'json',
          success: updateNotifications
        });
      }
    })



    // Открытие мобильного меню
    $('.header__burger').on('click', () => {
      $('.leftbar__body').css({display: 'grid'});
      $(document.body).css({overflow: 'hidden'});
    });

    $('.leftbar__close').on('click', () => {
      $('.leftbar__body').css({display: 'none'});
      $(document.body).css({overflow: 'auto'});

    });


    $(window).on('resize', onResize)
    onResize()
    



    // Удаляем меню
    $('#gcAccountUserMenu').remove();


  })
}, 0)})
















function onResize () {
  if(window.matchMedia('(max-width: 768px)').matches){
    $(document.body).addClass('full-menu');
  }
}

function toggleSubmenu(e) {
  const submenu = $(e.currentTarget).parent().children('.submenu');

  $(document.body).addClass('full-menu');

  $('.accordeon.selected ~ .submenu').not(submenu).slideToggle(300);
  $('.accordeon').not($(e.currentTarget)).removeClass('selected')



  $(e.currentTarget).toggleClass('selected')
  submenu.slideToggle(300);
}

function rollupMenu() {
  $(document.body).toggleClass('full-menu');

  $('.accordeon.selected ~ .submenu').slideToggle(300);
  $('.accordeon.selected').toggleClass('selected');

  
}


function updateNotifications() {
  const container = $('.rollup__notifications');

  container.toggleClass('show');
  container.show();
  container.empty();

  container.append(`
  <div class="notifications__loader loadingio-spinner-ellipsis-z5i1mb5w45c"><div class="ldio-hxdzskztq9b">
  <div></div><div></div><div></div><div></div><div></div>
  </div></div>
  `);

  $.getJSON("/notifications/notifications/get", (notifications) => {
    const { data } = notifications;

    container.empty();


    if (!data.groups.length) {
      container.append(`
        <div class="notifications__message">Уведомлений для вас еще нет</div>
      `);
    } else {
      const blocks = data.groups.map((el) => `
        <a href="${el.helper?.href || 'javascript:void(0)'}" class="notifications__notification notification ${el.status == 'new' && 'new'}" data-group-id="${el.id}">
          <div class="notification__image">${el.helper?.first_user_thumbnail || ''}</div>
          <div class="notification__content">${el.helper?.content || ''}</div>
          <div class="notification__date">${el.helper?.display_date || ''}</div>
          <div class="notification__mark-viewed">×</div>
        </a>
      `)

      container.append(`
        <div class="notifications__header">
          <div class="notifications__all">Уведомления ${+data.count.new !== 0 ? `(${data.count.new})` : ''}</div>
          <div class="notifications__mark-viewed-all">Отметить прочитанными</div>
        </div>
        <div class="notifications__body">
          ${blocks.join('\n')}
        </div>
        <a href="/notifications/notifications/all" class="notifications__footer">Все уведомления</a>
      `);
    }

  })
}



var iconsList = {
  notifications_button_small: `
    <svg width="25" height="25" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M0.333313 24.6599C0.333316 24.0251 0.591155 23.4176 1.04771 22.9767L2.76263 21.3203C3.41545 20.6898 3.78294 19.8203 3.78021 18.9127L3.76444 13.6577C3.74237 6.30533 9.69646 0.333344 17.0488 0.333344C24.3856 0.333344 30.3333 6.28099 30.3333 13.6178L30.3333 18.9526C30.3333 19.8367 30.6845 20.6845 31.3096 21.3097L32.9763 22.9763C33.4183 23.4183 33.6666 24.0179 33.6666 24.643C33.6666 25.9447 32.6114 27 31.3096 27H23.6666C23.6666 30.6819 20.6819 33.6667 17 33.6667C13.3181 33.6667 10.3333 30.6819 10.3333 27H2.67344C1.38103 27 0.333313 25.9523 0.333313 24.6599ZM13.6666 27C13.6666 28.841 15.159 30.3333 17 30.3333C18.8409 30.3333 20.3333 28.841 20.3333 27H13.6666ZM27 18.9526C27 20.7207 27.7023 22.4164 28.9526 23.6667L5.13082 23.6667C6.40368 22.41 7.11891 20.6934 7.11353 18.9027L7.09776 13.6477C7.08122 8.14017 11.5413 3.66668 17.0488 3.66668C22.5447 3.66668 27 8.12194 27 13.6178L27 18.9526Z" fill="#6F767E"/>
    </svg>
  `,
  cms: `<svg width="25" height="25" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M5.33331 33.6667C2.57189 33.6667 0.333313 31.4281 0.333313 28.6667V15.8935C0.333313 14.4761 0.93492 13.1252 1.98849 12.177L13.6552 1.67702C15.5567 -0.0343484 18.4433 -0.0343506 20.3448 1.67702L32.0115 12.177C33.065 13.1252 33.6666 14.4761 33.6666 15.8935V28.6667C33.6666 31.4281 31.4281 33.6667 28.6666 33.6667H5.33331ZM30.3333 15.8935V28.6667C30.3333 29.5872 29.5871 30.3333 28.6666 30.3333H23.6666V22C23.6666 19.2386 21.4281 17 18.6666 17H15.3333C12.5719 17 10.3333 19.2386 10.3333 22V30.3333H5.33331C4.41284 30.3333 3.66665 29.5872 3.66665 28.6667V15.8935C3.66665 15.421 3.86718 14.9707 4.21837 14.6547L15.885 4.15467C16.5189 3.58421 17.4811 3.58421 18.1149 4.15467L29.7816 14.6547C30.1328 14.9707 30.3333 15.421 30.3333 15.8935ZM13.6666 30.3333V22C13.6666 21.0795 14.4128 20.3333 15.3333 20.3333H18.6666C19.5871 20.3333 20.3333 21.0795 20.3333 22V30.3333H13.6666Z" fill="#6F767E"/>
  </svg>
  `,
  teach: `<svg width="25" height="25" viewBox="0 0 34 29" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M5.33331 0.666672C2.57189 0.666672 0.333313 2.90525 0.333313 5.66667V22.3333C0.333313 25.0948 2.57189 27.3333 5.33331 27.3333H10.3772C11.452 27.3333 12.5198 27.5066 13.5395 27.8465L16.6838 28.8946C16.889 28.963 17.1109 28.963 17.3162 28.8946L20.4605 27.8465C21.4801 27.5066 22.5479 27.3333 23.6228 27.3333H28.6666C31.4281 27.3333 33.6666 25.0948 33.6666 22.3333V5.66667C33.6666 2.90525 31.4281 0.666672 28.6666 0.666672H22C20.1107 0.666672 18.405 1.45257 17.1919 2.71528C17.0877 2.82374 16.9123 2.82374 16.8081 2.71528C15.595 1.45257 13.8893 0.666672 12 0.666672H5.33331ZM18.6666 24.9308L19.4064 24.6842C20.7659 24.231 22.1897 24 23.6228 24H28.6666C29.5871 24 30.3333 23.2538 30.3333 22.3333V5.66667C30.3333 4.7462 29.5871 4.00001 28.6666 4.00001H22C20.159 4.00001 18.6666 5.49239 18.6666 7.33334V24.9308Z" fill="#6F767E"/>
  </svg>
  `,
  user: `<svg width="25" height="25" viewBox="0 0 34 30" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M21.1661 13.2818C24.455 12.872 27 10.0665 27 6.66667C27 3.26681 24.455 0.461363 21.1661 0.0515137C22.7224 1.81442 23.6667 4.13027 23.6667 6.66667C23.6667 9.20307 22.7224 11.5189 21.1661 13.2818Z" fill="#6F767E"/>
  <path d="M30.3333 28.3333C30.3333 29.2538 31.0795 30 32 30C32.9205 30 33.6667 29.2538 33.6667 28.3333V25C33.6667 20.5665 30.2045 16.9416 25.8363 16.6816C27.5898 18.2345 28.9313 20.2422 29.6759 22.52C30.0942 23.2509 30.3333 24.0975 30.3333 25V28.3333Z" fill="#6F767E"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M8.66665 20C5.90522 20 3.66665 22.2386 3.66665 25V28.3333C3.66665 29.2538 2.92045 30 1.99998 30C1.07951 30 0.333313 29.2538 0.333313 28.3333V25C0.333313 20.3976 4.06427 16.6667 8.66665 16.6667H18.6666C23.269 16.6667 27 20.3976 27 25V28.3333C27 29.2538 26.2538 30 25.3333 30C24.4128 30 23.6666 29.2538 23.6666 28.3333V25C23.6666 22.2386 21.4281 20 18.6666 20H8.66665Z" fill="#6F767E"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M13.6667 3.33333C11.8257 3.33333 10.3333 4.82572 10.3333 6.66667C10.3333 8.50762 11.8257 10 13.6667 10C15.5076 10 17 8.50762 17 6.66667C17 4.82572 15.5076 3.33333 13.6667 3.33333ZM7 6.66667C7 2.98477 9.98477 0 13.6667 0C17.3486 0 20.3333 2.98477 20.3333 6.66667C20.3333 10.3486 17.3486 13.3333 13.6667 13.3333C9.98477 13.3333 7 10.3486 7 6.66667Z" fill="#6F767E"/>
  </svg>
  
  `,
  tasks: `<svg width="25" height="25" viewBox="0 0 30 34" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M5 3.66667C4.07953 3.66667 3.33333 4.41286 3.33333 5.33333V28.6667C3.33333 29.5871 4.07953 30.3333 5 30.3333H25C25.9205 30.3333 26.6667 29.5871 26.6667 28.6667V17C26.6667 16.0795 27.4129 15.3333 28.3333 15.3333C29.2538 15.3333 30 16.0795 30 17V28.6667C30 31.4281 27.7614 33.6667 25 33.6667H5C2.23858 33.6667 0 31.4281 0 28.6667V5.33333C0 2.57191 2.23858 0.333332 5 0.333332H15C15.9205 0.333332 16.6667 1.07952 16.6667 2C16.6667 2.92047 15.9205 3.66667 15 3.66667H5Z" fill="#6F767E"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M8.44017 16.4397C8.18517 16.6946 8.01976 17.0255 7.96876 17.3825L7.18309 22.8822C7.02595 23.9821 7.96876 24.9249 9.06871 24.7678L14.5684 23.9821C14.9254 23.9311 15.2562 23.7657 15.5112 23.5107L28.082 10.9399C30.0346 8.98731 30.0346 5.82149 28.082 3.86887C26.1294 1.91624 22.9636 1.91624 21.011 3.86887L8.44017 16.4397ZM22.1895 12.1184L13.5471 20.7609L10.7972 21.1537L11.19 18.4038L19.8324 9.76143L22.1895 12.1184ZM24.5465 9.76143L22.1895 7.40441L23.368 6.22589C24.0189 5.57501 25.0741 5.57501 25.725 6.22589C26.3759 6.87676 26.3759 7.93204 25.725 8.58291L24.5465 9.76143Z" fill="#6F767E"/>
  </svg>
  
  `,
  notifications: `<svg width="25" height="25" viewBox="0 0 34 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M0.654699 6.96405C-0.730249 2.80919 3.51691 -0.992196 7.49341 0.843117L30.4971 11.4603C34.3701 13.2478 34.3701 18.7523 30.4971 20.5399L7.49342 31.1569C3.51691 32.9922 -0.730239 29.1908 0.654716 25.036L3.13965 17.5812C3.48176 16.5549 3.48176 15.4453 3.13965 14.4189L0.654699 6.96405ZM6.09655 3.86965L29.1003 14.4868C30.3913 15.0826 30.3913 16.9175 29.1003 17.5133L6.09656 28.1304C4.77106 28.7421 3.35534 27.475 3.81699 26.0901L6.30192 18.6353C6.40814 18.3166 6.49458 17.9932 6.56122 17.6667H20.3334C21.2538 17.6667 22 16.9205 22 16C22 15.0795 21.2538 14.3333 20.3334 14.3333H6.5612C6.49456 14.0069 6.40813 13.6835 6.30193 13.3648L3.81698 5.90996C3.35533 4.525 4.77106 3.25788 6.09655 3.86965Z" fill="#6F767E"/>
  </svg>
  
  `,
  sales: `<svg width="25" height="25" viewBox="0 0 34 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M6.30972 8.66666L13.4645 1.51185C15.4172 -0.440775 18.583 -0.440779 20.5356 1.51184L27.6904 8.66666H31.745C32.7593 8.66666 33.5384 9.56497 33.3949 10.569L30.9466 27.7071C30.5947 30.1704 28.4851 32 25.9969 32H8.00318C5.51493 32 3.40533 30.1703 3.05343 27.7071L0.605138 10.569C0.461701 9.56497 1.24081 8.66666 2.25505 8.66666H6.30972ZM15.8216 3.86887C16.4724 3.21799 17.5277 3.21799 18.1786 3.86887L22.9764 8.66667L11.0238 8.66666L15.8216 3.86887ZM4.17674 12L6.35327 27.2357C6.47056 28.0568 7.17376 28.6667 8.00318 28.6667H25.9969C26.8263 28.6667 27.5295 28.0568 27.6468 27.2357L29.8233 12H4.17674Z" fill="#6F767E"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M10.3334 15.3333C11.2538 15.3333 12 16.0795 12 17V23.6667C12 24.5871 11.2538 25.3333 10.3334 25.3333C9.41288 25.3333 8.66669 24.5871 8.66669 23.6667V17C8.66669 16.0795 9.41288 15.3333 10.3334 15.3333Z" fill="#6F767E"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M17 15.3333C17.9205 15.3333 18.6666 16.0795 18.6666 17V23.6667C18.6666 24.5871 17.9205 25.3333 17 25.3333C16.0795 25.3333 15.3333 24.5871 15.3333 23.6667V17C15.3333 16.0795 16.0795 15.3333 17 15.3333Z" fill="#6F767E"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M23.6667 15.3333C24.5871 15.3333 25.3333 16.0795 25.3333 17V23.6667C25.3333 24.5871 24.5871 25.3333 23.6667 25.3333C22.7462 25.3333 22 24.5871 22 23.6667V17C22 16.0795 22.7462 15.3333 23.6667 15.3333Z" fill="#6F767E"/>
  </svg>
  
  `,
  chatium: `<svg width="25" height="25" viewBox="0 0 34 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M8.19937 24.1059C8.79842 23.6067 9.55352 23.3333 10.3333 23.3333H28.6666C29.5871 23.3333 30.3333 22.5871 30.3333 21.6667V5C30.3333 4.07952 29.5871 3.33333 28.6666 3.33333H5.33331C4.41284 3.33333 3.66665 4.07953 3.66665 5V27.8832L8.19937 24.1059ZM10.3333 26.6667H28.6666C31.4281 26.6667 33.6666 24.4281 33.6666 21.6667V5C33.6666 2.23858 31.4281 0 28.6666 0H5.33331C2.57189 0 0.333313 2.23858 0.333313 5V27.8832C0.333313 30.7093 3.6295 32.2532 5.80059 30.4439L10.3333 26.6667Z" fill="#6F767E"/>
  <path d="M18.8293 15.405H22V17.5698C22 18.8889 21.5732 19.9053 20.7195 20.6192C19.8659 21.3175 18.626 21.6667 17 21.6667C15.374 21.6667 14.1341 21.3175 13.2805 20.6192C12.4268 19.9053 12 18.8889 12 17.5698V9.09683C12 7.77778 12.4268 6.76909 13.2805 6.07076C14.1341 5.35692 15.374 5 17 5C18.626 5 19.8659 5.35692 20.7195 6.07076C21.5732 6.76909 22 7.77778 22 9.09683V10.6797H18.8293V8.93389C18.8293 7.86313 18.25 7.32775 17.0915 7.32775C15.9329 7.32775 15.3537 7.86313 15.3537 8.93389V17.7328C15.3537 18.788 15.9329 19.3156 17.0915 19.3156C18.25 19.3156 18.8293 18.788 18.8293 17.7328V15.405Z" fill="#6F767E"/>
  </svg>
  
  `,

}
