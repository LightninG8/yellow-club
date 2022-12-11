$(function(){
  const score = $('.xdget-trainingAchievements .badge').html().trim().split(' ')[0];
  
  $('.score-number').html(score);
});

