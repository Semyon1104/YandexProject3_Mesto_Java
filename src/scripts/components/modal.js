export function openModal(popup) {
  popup.classList.add('popup_is-opened');
}

export function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
}

export function addPopupListeners() {
  document.addEventListener('keydown', evt => {
    if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_is-opened');
      if (openedPopup) closeModal(openedPopup);
    }
  });

  document.querySelectorAll('.popup').forEach(popup => {
    popup.addEventListener('click', evt => {
      if (evt.target === popup) closeModal(popup);
    });
  });
}
