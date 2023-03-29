
$('.module-header').ready( () => {
  $('.module-header').before($('.breadcrumbs'));
  $('.module-header').before($('.breadcrumb'));


  $('.module-header').parent().parent().parent().addClass('with-breadcrumbs');
} );
