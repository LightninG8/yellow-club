$(document).ready(() => {
  if (window.userInfo.isAdmin) {
    return;
  }

  const level = +$('.club-level').text().split(' ')[1];

  const link = level <= 4 ? '/teach/control/stream/view/id/697759637' : level <= 12 ? '/teach/control/stream/view/id/697759638' : null;

  link && $('tr[data-training-id="697759636"] a').attr('href', link);

});
