
import '../../pages/index.css';
import { openModal, closeModal, addCloseButtonListeners, addPopupClickListeners, addEscapeKeyListener } from './modal.js';
import { createCard } from './card.js';
import { enableValidation, toggleButtonState } from './validate.js';
import {
  fetchUserData,
  fetchInitialCards,
  createCard as createCardOnServer,
  updateUserData,
} from './api.js';

import logo from '../../images/logo.svg';

const logoImage = document.querySelector('.header__logo');
logoImage.src = logo;

export const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');
const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
export const imagePopup = document.querySelector('.popup_type_image');
const editButton = document.querySelector('.profile__edit-button');
const profileFormElement = profilePopup.querySelector('.popup__form');
const nameInput = profilePopup.querySelector('.popup__input_type_name');
const jobInput = profilePopup.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');
const cardFormElement = cardPopup.querySelector('.popup__form');
const cardNameInput = cardPopup.querySelector('.popup__input_type_card-name');
const cardLinkInput = cardPopup.querySelector('.popup__input_type_url');
const addCardButton = document.querySelector('.profile__add-button');

const validationSettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
enableValidation(validationSettings);

function showError(message) {
  const errorElement = document.querySelector('.error-message');
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.classList.add('error-message_visible');
    setTimeout(() => errorElement.classList.remove('error-message_visible'), 5000);
  } else {
    console.error(message);
  }
}

function loadUserProfile() {
  fetchUserData()
    .then(user => {
      profileTitle.textContent = user.name;
      profileDescription.textContent = user.about;
      
      profileImage.style.backgroundImage = `url('${user.avatar}')`;
    })
    .catch(err => showError(`Ошибка загрузки данных пользователя: ${err}`));
}

function fillProfileForm() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const userData = {
    name: nameInput.value,
    about: jobInput.value,
  };
  updateUserData(userData)
    .then(user => {
      profileTitle.textContent = user.name;
      profileDescription.textContent = user.about;
      closeModal(profileFormElement.closest('.popup'));
    })
    .catch(err => showError(`Ошибка обновления профиля: ${err}`));
}

editButton.addEventListener('click', () => {
  fillProfileForm();
  openModal(profilePopup);
});

addCardButton.addEventListener('click', () => {
  cardNameInput.value = '';
  cardLinkInput.value = '';
  const inputs = [cardNameInput, cardLinkInput];
  const submitButton = cardFormElement.querySelector(validationSettings.submitButtonSelector);
  toggleButtonState(inputs, submitButton, validationSettings);
  openModal(cardPopup);
});


function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const cardData = {
    name: cardFormElement.querySelector('.popup__input_type_card-name').value,
    link: cardFormElement.querySelector('.popup__input_type_url').value,
  };

  createCardOnServer(cardData)
    .then(card => {
      const cardElement = createCard(card);
      placesList.prepend(cardElement);
      closeModal(cardFormElement.closest('.popup'));
    })
    .catch(err => showError(`Ошибка добавления карточки: ${err}`));
}

function loadInitialCards() {
  fetchInitialCards()
    .then(cards => {
      cards.forEach(cardData => {
        const cardElement = createCard(cardData);
        placesList.append(cardElement);
      });
    })
    .catch(err => showError(`Ошибка загрузки карточек: ${err}`));
}

document.addEventListener('DOMContentLoaded', () => {
  addCloseButtonListeners();
  addPopupClickListeners();
  addEscapeKeyListener();
  loadUserProfile();
  loadInitialCards();
  const popups = document.querySelectorAll('.popup');
  popups.forEach(popup => {
    popup.classList.add('popup_is-animated');
  });
});

document.querySelectorAll('.popup__close').forEach(button => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closeModal(popup));
});

document.querySelectorAll('.popup').forEach(popup => {
  popup.addEventListener('click', evt => {
      if (evt.target === popup) closeModal(popup);
  });
});

document.addEventListener('keydown', evt => {
  if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_is-opened');
      if (openedPopup) closeModal(openedPopup);
  }
});

cardFormElement.addEventListener('submit', handleCardFormSubmit);
profileFormElement.addEventListener('submit', handleProfileFormSubmit);
