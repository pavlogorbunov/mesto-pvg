const cardsBox = [
    {name: 'Архыз', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'},
    {name: 'Челябинская область', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'},
    {name: 'Иваново', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'},
    {name: 'Камчатка', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'},
    {name: 'Холмогорский район', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'},
    {name: 'Байкал', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'}];

const editOpenButton = document.querySelector('.profile__info-editbutton');
const editPopup = document.querySelector('.popup_type_profile');
const editPopupContainer = editPopup.querySelector('.popup__container');
const editForm = editPopup.querySelector('.popup__form');
const inputProfileOccupation = editPopup.querySelector('.popup__form-input_name_occupation');
const inputProfileName = editPopup.querySelector('.popup__form-input_name_name');

const addOpenButton = document.querySelector('.profile__info-addbutton');
const addPopup = document.querySelector('.popup_type_card');
const addPopupContainer = addPopup.querySelector('.popup__container');
const addForm = addPopup.querySelector('.popup__form');
const inputPlaceName = addPopup.querySelector('.popup__form-input_name_place');
const inputPlaceLink = addPopup.querySelector('.popup__form-input_name_link');

const picPopup = document.querySelector('.popup_type_image');
const picPopupContainer = picPopup.querySelector('.popup__pic-container');
const picPopupImg = picPopup.querySelector('.popup__pic-img');
const picPopupTitle = picPopup.querySelector('.popup__pic-title');

const currentProfileName = document.querySelector('.profile__info-name');
const currentProfileOccupation = document.querySelector('.profile__info-titles');

const cardsBlock = document.querySelector('.cards');
const images = document.querySelectorAll('.card__img');

const closeButtons = document.querySelectorAll('.popup__close');

const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');

const showPopup = e => {
    e.classList.add('popup_visible');
}

const hidePopup = e => {
    e.classList.remove('popup_visible');
}

const openEditForm = () => {
    inputProfileName.value = currentProfileName.textContent;
    inputProfileOccupation.value = currentProfileOccupation.textContent;
    showPopup(editPopup);
}

const renameProfile = evt => {
    evt.preventDefault();
    currentProfileName.textContent = inputProfileName.value;
    currentProfileOccupation.textContent = inputProfileOccupation.value;
    hidePopup(editPopup);
}

const like = evt => evt.currentTarget.classList.toggle('cards__card-likebtn_activated');

const handleAddFormSubmit = evt => {
    evt.preventDefault();
    renderCard({name: inputPlaceName.value, link: inputPlaceLink.value});
    inputPlaceName.value = inputPlaceLink.value = '';
    hidePopup(addPopup);
}

const generateCard = cardData => {
    const newCard = cardTemplate.cloneNode(true);
    
    const newCardTitle = newCard.querySelector('.card__title');
    newCardTitle.textContent = cardData.name;

    const newCardImage = newCard.querySelector('.card__img');
    newCardImage.src = cardData.link;
    newCardImage.alt = cardData.name;
    newCardImage.addEventListener('click', () => openImage(cardData));

    const newCardLikeBtn = newCard.querySelector('.card__likebtn');
    newCardLikeBtn.addEventListener('click', like);

    const newCardDeleteBtn = newCard.querySelector('.card__trash');
    newCardDeleteBtn.addEventListener('click', deleteCard);

    return newCard;
}

const renderCard = e => cardsBlock.prepend(generateCard(e));

const deleteCard = evt => evt.target.closest('.card').remove();

const openImage = cardData => {
    picPopupImg.src = cardData.link;
    picPopupImg.alt = cardData.name;
    picPopupTitle.textContent = cardData.name;
    showPopup(picPopup);
}

cardsBox.forEach(e => renderCard(e));

closeButtons.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => hidePopup(popup));
});

editOpenButton.addEventListener('click', openEditForm);
editPopup.addEventListener('click', () => hidePopup(editPopup));
editPopupContainer.addEventListener('click', e => e.stopPropagation());
editForm.addEventListener('submit', renameProfile);

addOpenButton.addEventListener('click', () => showPopup(addPopup));
addPopup.addEventListener('click', () => hidePopup(addPopup));
addPopupContainer.addEventListener('click', e => e.stopPropagation());
addForm.addEventListener('submit', handleAddFormSubmit);

picPopup.addEventListener('click', () => hidePopup(picPopup));
picPopupContainer.addEventListener('click', e => e.stopPropagation());