import '../../pages/index.css';
import { createCard } from './card.js';
import { openModal, closeModal, addPopupListeners } from './modal.js';
import { enableValidation } from './validate.js';

const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

enableValidation(validationSettings);
addPopupListeners();

const initialCards = [
  { name: "Архыз", link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg" },
  { name: "Челябинская область", link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg" },
  { name: "Иваново", link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg" },
  { name: "Камчатка", link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg" },
  { name: "Холмогорский район", link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg" },
  { name: "Байкал", link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg" }
];

const placesList = document.querySelector('.places__list');
const cardPopup = document.querySelector('.popup_type_new-card');
const cardFormElement = cardPopup.querySelector('.popup__form');
const cardNameInput = cardPopup.querySelector('.popup__input_type_card-name');
const cardLinkInput = cardPopup.querySelector('.popup__input_type_url');
const addCardButton = document.querySelector('.profile__add-button');
const editButton = document.querySelector('.profile__edit-button');


  function fillProfileForm(nameInput, jobInput, profileTitle, profileDescription) {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

function handleProfileFormSubmit(evt, nameInput, jobInput, profileTitle, profileDescription, profilePopup) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(profilePopup);
}

editButton.addEventListener('click', () => {
  fillProfileForm(nameInput, jobInput, profileTitle, profileDescription);
  openModal(profilePopup);
});

initialCards.forEach(info => {
  const card = createCard(info, '#card-template', '.popup_type_image');
  placesList.append(card);
});

addCardButton.addEventListener('click', () => {
  cardNameInput.value = '';
  cardLinkInput.value = '';
  openModal(cardPopup);
});

cardFormElement.addEventListener('submit', evt => {
  evt.preventDefault();
  const cardInfo = {
    name: cardNameInput.value,
    link: cardLinkInput.value
  };
  const newCard = createCard(cardInfo, '#card-template', '.popup_type_image');
  placesList.prepend(newCard);
  closeModal(cardPopup);
});
