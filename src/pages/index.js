import './index.css';

import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithConfirmation } from '../components/PopupWithConfirmation.js';
import { UserInfo } from '../components/UserInfo.js';
import { cardsBox, validationSettings, cardTemplateSelector, accesOptions} from '../utils/constants.js';
import { Api } from '../components/Api.js';

const editOpenButton = document.querySelector('.profile__info-editbutton');
const addOpenButton = document.querySelector('.profile__info-addbutton');
const avatarEditButton = document.querySelector('.profile__avatar-container');

const currentProfileName = document.querySelector('.profile__info-name');
const currentProfileOccupation = document.querySelector('.profile__info-titles');

const formValidators = {};

const handleEditFormSubmit = data => {
    editPopup.renderLoading(true);
    api.patchUserInfo(data).then(res => {
        if(res.ok) {
            return res.json();
        } else {
            return Promise.reject(res);
        }
    })
    .then(res => {
        user.setUserInfo(res);
        editPopup.renderLoading(false);
        editPopup.close();
    })
    .catch(err => console.log(err));
}

const handleAddFormSubmit = data => {
    addPopup.renderLoading(true);
    api.postNewCard(data).then(res => {
        if(res.ok) {
            return res.json();
        } else {
            return Promise.reject(res);
        }
    }).then((res) => {
        const newCard = createUserCard(res);
        cardList.setItem(newCard);
        addPopup.renderLoading(false);
        addPopup.close();
    })
    .catch(err => console.log(err));
}

const handleAreYouSureSubmit = () => {
    areYouSurePopup.close();
}

const handleAvatarSubmit = (data) => {
    avatarPopup.renderLoading(true);
    api.patchAvatar(data.link).then(res => { if(res.ok) {
        return res.json();
    } else {
        return Promise.reject(res);
    }}).catch(err => console.log(err));
    api.getUser().then(res => {
        if(res.ok) {
            return res.json();
        } else {
            return Promise.reject(res);
        }
    }).then(res => {
        user.setUserAvatar(res);
        avatarPopup.close();
        avatarPopup.renderLoading(false);
    }).catch(err => console.log(err));
}

const createUserCard = item => {
    if(!item.likes) {item.likes = []}
    const isliked = item.likes.map(like => like._id).includes(user._id);
    const newCard = new Card(item, cardTemplateSelector, picPopup.open.bind(picPopup), confirmDeleteCard, isliked, api.putLike.bind(api), api.deleteLike.bind(api));
    return newCard.generateUserCard();
}

const createDefaultCard = item => {
    if(!item.likes) {item.likes = []}
    const isliked = item.likes.map(like => like._id).includes(user._id);
    const newCard = new Card(item, cardTemplateSelector, picPopup.open.bind(picPopup), confirmDeleteCard, isliked, api.putLike.bind(api), api.deleteLike.bind(api));
    return newCard.generateDefaultCard();
}

const confirmDeleteCard = (id, cardElement) => {
    areYouSurePopup.open(id, () => deleteCard(id, cardElement));
}

const deleteCard = (id, cardElement) => {
    api.deleteCard(id)
    .then(res => {
        if(res.ok) {
            return res.json();
        } else {
            return Promise.reject(res);
        }
    })
    .then(cardElement.remove())
    .catch(err => console.log(err));
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
const areYouSurePopup = new PopupWithConfirmation('.popup_type_are-you-sure', handleAreYouSureSubmit, );
areYouSurePopup.setEventListeners();
const avatarPopup = new PopupWithForm('.popup_type_avatar', handleAvatarSubmit);
avatarPopup.setEventListeners();
const picPopup = new PopupWithImage('.popup_type_image');
picPopup.setEventListeners();
const user = new UserInfo(currentProfileName.textContent, currentProfileOccupation.textContent);

const cardList = new Section({ data: cardsBox, renderer: (item) => {
    const cardElement = createUserCard(item);
    cardList.setItem(cardElement);
} }, '.cards');

const api = new Api(accesOptions);

api.getUserInfo()
    .then(res => {
        if(res.ok) {
            return res.json();
        } else {
            return Promise.reject(res);
        }
    })
    .then(res => {
        user.setUserInfo(res);
        user.setUserAvatar(res);
        user._id = res._id;
    })
    .then(
        api.getInitialCards().then(res => {
            if(res.ok) {
                return res.json();
            } else {
                return Promise.reject(res);
            }
        }).then(res => {
            res.forEach(card => {
                if(card.owner._id === user._id) {
                    const cardElement = createUserCard(card);
                    cardList.setItemAppend(cardElement);
                } else {
                    const cardElement = createDefaultCard(card);
                    cardList.setItemAppend(cardElement);
                }
            })
        }).catch(err => console.log(err))
    ).catch(err => console.log(err));

editOpenButton.addEventListener('click', () => {
    user.getUserInfo();
    formValidators['editProfile'].resetValidation();
    editPopup.open();
});

addOpenButton.addEventListener('click', () => {
    formValidators['addCard'].resetValidation();
    addPopup.open();
});

avatarEditButton.addEventListener('click', () => {
    formValidators['avatar'].resetValidation();
    avatarPopup.open();
});