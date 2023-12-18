function imgPopup() {
  if ($('.popup') <= 0) {
    return;
  }

  $('.popup').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    showCloseBtn: false,
    zoom: {
      enabled: true,
      duration: 300,
      easing: 'ease-in-out'
    }
  });
}

imgPopup();
