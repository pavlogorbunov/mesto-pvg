const popup = document.querySelector('.popup');
const editButton = document.querySelector('.profile__info-editbutton');
const escapeButton = document.querySelector('.popup__form-escape');
const saveButton = document.querySelector('.popup__form-save');
const likeButtons = document.querySelectorAll('.cards__card-likebtn');
const form = document.querySelector('.popup__form');

const inputs = document.querySelectorAll('.popup__form-input');
let inputProfileName = inputs[0];
let inputProfileOccupation = inputs[1];

function showOrHidePopup() {
    popup.classList.toggle('popup_visible');
}

function openForm() {
    let currentProfileName = document.querySelector('.profile__info-name').textContent;
    let currentProfileOccupation = document.querySelector('.profile__info-titles').textContent;
    inputProfileName.value = currentProfileName;
    inputProfileOccupation.value = currentProfileOccupation;
    showOrHidePopup();
}

function renameProfile(evt) {
    evt.preventDefault();
    document.querySelector('.profile__info-name').textContent = inputProfileName.value;
    document.querySelector('.profile__info-titles').textContent = inputProfileOccupation.value;
    showOrHidePopup();
}

function like(event) {
    event.currentTarget.classList.toggle('cards__card-likebtn_activated');
}

editButton.addEventListener('click', openForm);
escapeButton.addEventListener('click', showOrHidePopup);
popup.addEventListener('click', showOrHidePopup);
form.addEventListener('click', event => event.stopPropagation());
form.addEventListener('submit', renameProfile);
//saveButton.addEventListener('click', renameProfile);
likeButtons.forEach(el => el.addEventListener('click',  like));
window.addEventListener('keydown', event => console.log(event.code));