const cardsBox = [
    {name: 'Архыз', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'},
    {name: 'Челябинская область', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'},
    {name: 'Иваново', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'},
    {name: 'Камчатка', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'},
    {name: 'Холмогорский район', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'},
    {name: 'Байкал', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'}];

const editOpenButton = document.querySelector('.profile__info-editbutton');
const inputProfileName = document.querySelector('.popup__form-input_name_name');
const inputProfileOccupation = document.querySelector('.popup__form-input_name_occupation');
const editForm = inputProfileName.parentNode;
const editPopupContainer = editForm.parentNode;
const editPopup = editPopupContainer.parentNode;
const editEscapeButton = editPopupContainer.querySelector('.popup__form-escape');

const addOpenButton = document.querySelector('.profile__info-addbutton');
const inputPlaceName = document.querySelector('.popup__form-input_name_place');
const inputPlaceLink = document.querySelector('.popup__form-input_name_link');
const addForm = inputPlaceName.parentNode;
const addPopupContainer = addForm.parentNode;
const addPopup = addPopupContainer.parentNode;
const addEscapeButton = addPopupContainer.querySelector('.popup__form-escape');

const picPopupContainer = document.querySelector('.popup__pic-container');
const picPopup = picPopupContainer.parentNode;
const picPopupImg = picPopup.querySelector('.popup__pic-img');
const picPopupTitle = picPopup.querySelector('.popup__pic-title');
const picPopupEscapeBtn = picPopup.querySelector('.popup__pic-escape');

const cardsBlock = document.querySelector('.cards');
const images = document.querySelectorAll('.card__img');

const likeButtons = document.querySelectorAll('.card__likebtn');
const deleteButtons = document.querySelectorAll('.card__trash');

const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');

const showOrHidePopup = e => {
    if(e.classList.contains('popup_visible')) {
      e.classList.add('fadeout');
      setTimeout(() => e.classList.remove('popup_visible', 'fadeout'), 400);
    } else {
      e.classList.add('fadein', 'popup_visible');
      setTimeout(() => e.classList.remove('fadein'), 400);
    }
  }

const openEditForm = () => {
    const currentProfileName = document.querySelector('.profile__info-name').textContent;
    const currentProfileOccupation = document.querySelector('.profile__info-titles').textContent;
    inputProfileName.value = currentProfileName;
    inputProfileOccupation.value = currentProfileOccupation;
    showOrHidePopup(editPopup);
}

const renameProfile = evt => {
    evt.preventDefault();
    document.querySelector('.profile__info-name').textContent = inputProfileName.value;
    document.querySelector('.profile__info-titles').textContent = inputProfileOccupation.value;
    showOrHidePopup(editPopup);
}

const like = evt => evt.currentTarget.classList.toggle('cards__card-likebtn_activated');

const addFormHandler = evt => {
    evt.preventDefault();
    renderCard({name: inputPlaceName.value, link: inputPlaceLink.value});
    inputPlaceName.value = inputPlaceLink.value = '';
    showOrHidePopup(addPopup);
}

const generateCard = cardData => {
    const newCard = cardTemplate.cloneNode(true);
    
    const newCardTitle = newCard.querySelector('.card__title');
    newCardTitle.textContent = cardData.name;

    const newCardImage = newCard.querySelector('.card__img');
    newCardImage.src = cardData.link;
    newCardImage.alt = cardData.name;

    const newCardLikeBtn = newCard.querySelector('.card__likebtn');
    newCardLikeBtn.addEventListener('click', like);

    const newCardDeleteBtn = newCard.querySelector('.card__trash');
    newCardDeleteBtn.addEventListener('click', deleteCard);

    const newCardImg = newCard.querySelector('.card__img');
    newCardImg.addEventListener('click', openImage);

    return newCard;
}

const renderCard = item => cardsBlock.prepend(generateCard(item));

const deleteCard = evt => evt.target.closest('.card').remove();

const openImage = evt => {
    picPopupImg.src = evt.currentTarget.src;
    picPopupTitle.textContent = evt.currentTarget.parentNode.parentNode.querySelector('.card__title').textContent;
    showOrHidePopup(picPopup);
}

cardsBox.forEach(e => renderCard(e));

editOpenButton.addEventListener('click', openEditForm);
editEscapeButton.addEventListener('click', () => showOrHidePopup(editPopup));
editPopup.addEventListener('click', () => showOrHidePopup(editPopup));
editPopupContainer.addEventListener('click', e => e.stopPropagation());
editForm.addEventListener('submit', renameProfile);

addOpenButton.addEventListener('click', () => showOrHidePopup(addPopup));
addEscapeButton.addEventListener('click', () => showOrHidePopup(addPopup));
addPopup.addEventListener('click', () => showOrHidePopup(addPopup));
addPopupContainer.addEventListener('click', e => e.stopPropagation());
addForm.addEventListener('submit', addFormHandler);

images.forEach(el => el.addEventListener('click',  openImage));
picPopupEscapeBtn.addEventListener('click', () => showOrHidePopup(picPopup));
picPopup.addEventListener('click', () => showOrHidePopup(picPopup));
picPopupContainer.addEventListener('click', e => e.stopPropagation());

likeButtons.forEach(el => el.addEventListener('click',  like));
deleteButtons.forEach(el => el.addEventListener('click',  deleteCard));