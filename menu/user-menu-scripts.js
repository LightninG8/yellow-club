$(() => setTimeout(() => {
   // userdata.data.logo.image
  
  $.getJSON( "/c/sa/user/profile/"+window.accountUserId, (userdata) => {
    if(
      typeof userdata.success !== "undefined"
      && userdata.success === true
      && window.gcAccountUserMenu
      && $('#gcAccountUserMenu')
    ) { 
      document.querySelector('#gcAccountUserMenu').style.display = 'none';
  
      $('#gcAccountUserMenu').after(`
        <div class="umenu umenu-body" id="user-menu">
          <ul class="umenu-menu menu"></ul>
          <div class="umenu-rollup-btn rollup">
            <div class="rollup-icon"></div>
            <div class="rollup-title">Свернуть меню</div>
          </div>
        </div>
      `);
      $('#user-menu .menu').append(`
      <li class="menu-item item user">
        <div class="item-header user-body">
          <div class="user-avatar" style="background-image: url(${userdata.data.logo.image})"></div>
          <div class="user-info">
            <div class="user-name">${userdata.data.title}</div>
            <div class="user-email">${userdata.data.blocks[1]?.title}</div>
          </div>
        </div>
      </li>
    `);

      $.each(window.gcAccountUserMenu.items, (i, el) => {
        const label = el.id == 'notifications_button_small' ? 'Уведомления' : el.label;
        const accordeonClassName = el.subitems.length ? 'accordeon-header' : '';

        $('#user-menu .menu').append(`
          <li class="menu-item item menu-item-${el.id}">
            <div class="item-header ${accordeonClassName}">
              <div class="item-icon"></div>
              <div class="item-title">${label}</div>
            </div>
          </li>
          `);
        
        if (el.subitems.length) {
          $(`.menu-item-${el.id} .item-header`).append(`
            <div class="item-cross"></div>
          `);
    
          $(`.menu-item-${el.id}`).append(`
            <ul class="item-submenu submenu accordeon-list"></ul>
          `);

          $.each(el.subitems, (i, el2) => {
            $(`.menu-item-${el.id}  .submenu`).append(`
              <li class="submenu-item">
                <a href="${el2.url}" class="submenu-link link"><span class="submenu-link-title">${el2.label}</span></a>
              </li>
            `);
          })

        }

      });

      // Аккордеон
      const accordeonHeaders = document.querySelectorAll('.accordeon-header');
      const accordeonLists = document.querySelectorAll('.accordeon-list');
      const userMenu = document.querySelector('#user-menu');

      accordeonHeaders.forEach((el) => {
        el.addEventListener('click', () => { 
          const content = el.nextElementSibling;
          
          if(content.style.maxHeight) {
              accordeonLists.forEach((el) => el.style.maxHeight = null);
              accordeonHeaders.forEach((el) => el.classList.remove('selected'));
          } else {
              accordeonLists.forEach((el) => el.style.maxHeight = null);
              accordeonHeaders.forEach((el) => el.classList.remove('selected'));

            el.classList.add('selected');
            userMenu.classList.remove('rollup');

            // 30 - padding
            content.style.maxHeight = content.scrollHeight + 30 + 'px';   
          }
        })
      });

      // Сворачивание меню
      const rollupBtn = document.querySelector('#user-menu .umenu-rollup-btn');
  
      rollupBtn.addEventListener('click', () => {
        userMenu.classList.toggle('rollup');
        
        accordeonLists.forEach((el) => el.style.maxHeight = null);
        accordeonHeaders.forEach((el) => el.classList.remove('selected'))
      })

    }
 });
}, 0))
