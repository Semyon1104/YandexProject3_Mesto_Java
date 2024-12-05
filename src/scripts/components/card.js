import { openModal } from './modal.js';

export function createCard(info, templateSelector, popupSelector) {
  const cardTemplate = document.querySelector(templateSelector).content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');

  cardImage.src = info.link;
  cardImage.alt = info.name;
  cardTitle.textContent = info.name;

  deleteButton.addEventListener('click', () => cardElement.remove());
  likeButton.addEventListener('click', () => likeButton.classList.toggle('card__like-button_is-active'));

  cardImage.addEventListener('click', () => {
    const imagePopup = document.querySelector(popupSelector);
    const imagePopupImage = imagePopup.querySelector('.popup__image');
    const imagePopupCaption = imagePopup.querySelector('.popup__caption');

    imagePopupImage.src = info.link;
    imagePopupImage.alt = info.name;
    imagePopupCaption.textContent = info.name;

    openModal(imagePopup);
  });

  return cardElement;
}
