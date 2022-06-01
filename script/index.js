import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

const cardsBox = [
    {name: 'Архыз', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'},
    {name: 'Челябинская область', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'},
    {name: 'Иваново', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'},
    {name: 'Камчатка', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'},
    {name: 'Холмогорский район', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'},
    {name: 'Байкал', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'}];

const validationSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__form-input',
    submitButtonSelector: '.popup__form-save',
    inactiveButtonClass: 'popup__form-save_disabled',
    inputErrorClass: 'popup__form-input_type_error',
    errorClass: 'popup__form-error_visible'
};

const cardTemplateSelector = '#card-template';

const popups = document.querySelectorAll('.popup');

const editOpenButton = document.querySelector('.profile__info-editbutton');
const editPopup = document.querySelector('.popup_type_profile');
const editForm = editPopup.querySelector('.popup__form');
const inputProfileOccupation = editPopup.querySelector('.popup__form-input_name_occupation');
const inputProfileName = editPopup.querySelector('.popup__form-input_name_name');

const addOpenButton = document.querySelector('.profile__info-addbutton');
const addPopup = document.querySelector('.popup_type_card');
const addForm = addPopup.querySelector('.popup__form');
const inputPlaceName = addPopup.querySelector('.popup__form-input_name_place');
const inputPlaceLink = addPopup.querySelector('.popup__form-input_name_link');

const picPopup = document.querySelector('.popup_type_image');
const picPopupImg = picPopup.querySelector('.popup__pic-img');
const picPopupTitle = picPopup.querySelector('.popup__pic-title');

const currentProfileName = document.querySelector('.profile__info-name');
const currentProfileOccupation = document.querySelector('.profile__info-titles');

const cardsBlock = document.querySelector('.cards');

const formValidators = {};

//const cardTemplate = document.querySelector(cardTemplateSelector).content.querySelector('.card');

const handleKeyDown = evt => {
    if(evt.key === "Escape") {
        const pop = document.querySelector('.popup_visible');
        hidePopup(pop);
    }
}

const showPopup = popupElement => {
    popupElement.classList.add('popup_visible');
    document.addEventListener('keydown', handleKeyDown);
}

const hidePopup = popupElement => {
    popupElement.classList.remove('popup_visible');
    document.removeEventListener('keydown', handleKeyDown);
}

const openEditForm = () => {
    formValidators['editProfile'].resetValidation();
    inputProfileName.value = currentProfileName.textContent;
    inputProfileOccupation.value = currentProfileOccupation.textContent;
    showPopup(editPopup);
}

const handleEditFormSubmit = evt => {
    evt.preventDefault();
    currentProfileName.textContent = inputProfileName.value;
    currentProfileOccupation.textContent = inputProfileOccupation.value;
    hidePopup(editPopup);
}

const openAddCardForm = () => {
    formValidators['addCard'].resetValidation();
    showPopup(addPopup);
}

const handleAddFormSubmit = evt => {
    evt.preventDefault();
    
    const newCard = createCard({name: inputPlaceName.value, link: inputPlaceLink.value});
    renderCard(newCard);
    evt.target.reset();
    hidePopup(addPopup);
}

const createCard = item => {
    const newCard = new Card(item, cardTemplateSelector, openImage);
    return newCard.generateCard();
}

const renderCard = cardElem => cardsBlock.prepend(cardElem);

const openImage = cardData => {
    picPopupImg.src = cardData.link;
    picPopupImg.alt = cardData.name;
    picPopupTitle.textContent = cardData.name;
    showPopup(picPopup);
}

const enableValidation = (validationSettings) => {
  const formList = Array.from(document.querySelectorAll(validationSettings.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(validationSettings, formElement)
    const formName = formElement.getAttribute('name')
    formValidators[formName] = validator;
   validator.enableValidation();
  });
};

enableValidation(validationSettings);

cardsBox.forEach(cardData => renderCard(createCard(cardData)));

editOpenButton.addEventListener('click', openEditForm);
editForm.addEventListener('submit', handleEditFormSubmit);

addOpenButton.addEventListener('click', openAddCardForm);
addForm.addEventListener('submit', handleAddFormSubmit);

popups.forEach(popup => popup.addEventListener('mousedown', evt => {
    if (evt.target.classList.contains('popup_visible')) {
        hidePopup(popup);
    }
    if (evt.target.classList.contains('popup__close')) {
        hidePopup(popup);
    }
}));