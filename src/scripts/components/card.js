import { cardTemplate, imagePopup, openConfirmPopup} from './index.js';
import { openModal } from './modal.js';
import { toggleLikeOnServer, deleteCard, cohortId as currentUserId, token } from './api.js';

export function createCard(info) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCount = document.createElement('span');

  likeCount.classList.add('card__like-count');
  likeCount.textContent = info.likes.length; 
  likeButton.after(likeCount);
  console.log('Owner ID:', info.owner._id);
  console.log('Current User ID:', token);
  // Проверяем, является ли текущий пользователь владельцем карточки
  if (info.owner._id !== '12e7b86937b167477a9e7892') {
    deleteButton.style.display = 'none'; // Прячем кнопку удаления, если карточка не ваша
  }

  cardImage.src = info.link;
  cardImage.alt = info.name;
  cardTitle.textContent = info.name;

  // Обработчик удаления карточки
  deleteButton.addEventListener('click', () => {
    openConfirmPopup(() => {
      deleteCard(info._id)
        .then(() => {
          cardElement.remove(); // Удаляем карточку из DOM
        })
        .catch(err => console.error('Ошибка при удалении карточки:', err));
    });
  });

  // Обработчик лайка
  likeButton.addEventListener('click', () => {
    const isLiked = likeButton.classList.contains('card__like-button_is-active');
    toggleLikeOnServer(info._id, !isLiked)
      .then(updatedCard => {
        likeButton.classList.toggle('card__like-button_is-active', !isLiked);
        likeCount.textContent = updatedCard.likes.length;
      })
      .catch(err => console.error(`Ошибка изменения лайка: ${err}`));
  });

  // Обработчик клика на картинку
  cardImage.addEventListener('click', () => {
    const imagePopupImage = imagePopup.querySelector('.popup__image');
    const imagePopupCaption = imagePopup.querySelector('.popup__caption');

    imagePopupImage.src = info.link;
    imagePopupImage.alt = info.name;
    imagePopupCaption.textContent = info.name;

    openModal(imagePopup);
  });

  return cardElement;
}
