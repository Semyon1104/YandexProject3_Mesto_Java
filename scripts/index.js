const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');


function createCard(info) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
  
    cardImage.src = info.link;
    cardImage.alt = info.name;
    cardTitle.textContent = info.name;
  
    return cardElement;
  }

// @todo: Функция удаления карточки

initialCards.forEach(info => {
  const card = createCard(info);
  placesList.append(card);
});

