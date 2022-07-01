import './index.css';

import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
//import { Popup } from './Popup.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
 
const cardsBox = [
    {place: 'Архыз', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'},
    {place: 'Челябинская область', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'},
    {place: 'Иваново', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'},
    {place: 'Камчатка', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'},
    {place: 'Холмогорский район', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'},
    {place: 'Байкал', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'}];

const validationSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__form-input',
    submitButtonSelector: '.popup__form-save',
    inactiveButtonClass: 'popup__form-save_disabled',
    inputErrorClass: 'popup__form-input_type_error',
    errorClass: 'popup__form-error_visible'
};

const cardTemplateSelector = '#card-template';

const editOpenButton = document.querySelector('.profile__info-editbutton');
const addOpenButton = document.querySelector('.profile__info-addbutton');

const currentProfileName = document.querySelector('.profile__info-name');
const currentProfileOccupation = document.querySelector('.profile__info-titles');

const formValidators = {};

const handleEditFormSubmit = data => {
    User.setUserInfo(data);
    EditPopup.close();
}

const handleAddFormSubmit = data => {
    const newCard = createCard(data);
    CardList.setItem(newCard);
    AddPopup.close();
}

const createCard = item => {
    const newCard = new Card(item, cardTemplateSelector, PicPopup.open.bind(PicPopup));
    return newCard.generateCard();
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

const AddPopup = new PopupWithForm('.popup_type_card', handleAddFormSubmit);
AddPopup.setEventListeners();
const EditPopup = new PopupWithForm('.popup_type_profile', handleEditFormSubmit);
EditPopup.setEventListeners();
const PicPopup = new PopupWithImage('.popup_type_image');
PicPopup.setEventListeners();
const User = new UserInfo(currentProfileName.textContent, currentProfileOccupation.textContent);
console.log(User.getUserInfo());

const CardList = new Section({ data: cardsBox, renderer: (item) => {
    const card = new Card(item, cardTemplateSelector, PicPopup.open.bind(PicPopup));
    const cardElement = card.generateCard();
    CardList.setItem(cardElement);
} }, '.cards');

CardList.renderItems();

editOpenButton.addEventListener('click', () => {
    User.getUserInfo();
    formValidators['editProfile'].resetValidation();
    EditPopup.open();
});

addOpenButton.addEventListener('click', () => {
    formValidators['addCard'].resetValidation();
    AddPopup.open();
});