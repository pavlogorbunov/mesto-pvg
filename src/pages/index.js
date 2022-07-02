import './index.css';

import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { cardsBox, validationSettings, cardTemplateSelector} from '../utils/constants.js';

const editOpenButton = document.querySelector('.profile__info-editbutton');
const addOpenButton = document.querySelector('.profile__info-addbutton');

const currentProfileName = document.querySelector('.profile__info-name');
const currentProfileOccupation = document.querySelector('.profile__info-titles');

const formValidators = {};

const handleEditFormSubmit = data => {
    user.setUserInfo(data);
    editPopup.close();
}

const handleAddFormSubmit = data => {
    const newCard = createCard(data);
    cardList.setItem(newCard);
    addPopup.close();
}

const createCard = item => {
    const newCard = new Card(item, cardTemplateSelector, picPopup.open.bind(picPopup));
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

const addPopup = new PopupWithForm('.popup_type_card', handleAddFormSubmit);
addPopup.setEventListeners();
const editPopup = new PopupWithForm('.popup_type_profile', handleEditFormSubmit);
editPopup.setEventListeners();
const picPopup = new PopupWithImage('.popup_type_image');
picPopup.setEventListeners();
const user = new UserInfo(currentProfileName.textContent, currentProfileOccupation.textContent);

const cardList = new Section({ data: cardsBox, renderer: (item) => {
    const cardElement = createCard(item);
    cardList.setItem(cardElement);
} }, '.cards');

cardList.renderItems();

editOpenButton.addEventListener('click', () => {
    user.getUserInfo();
    formValidators['editProfile'].resetValidation();
    editPopup.open();
});

addOpenButton.addEventListener('click', () => {
    formValidators['addCard'].resetValidation();
    addPopup.open();
});