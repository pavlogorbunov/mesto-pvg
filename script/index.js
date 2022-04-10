const cardsBox = [{name: 'Архыз', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'},{name: 'Челябинская область', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'}, {name: 'Иваново', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'}, {name: 'Камчатка', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'}, {name: 'Холмогорский район', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'}, {name: 'Байкал', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'}];

const popupRename = document.querySelectorAll('.popup')[0];
const popupAddItem = document.querySelectorAll('.popup')[1];
const editButton = document.querySelector('.profile__info-editbutton');
const addItemBtn = document.querySelector('.profile__info-addbutton');
const escapeRenameButton = document.querySelectorAll('.popup__form-escape')[0];
const escapeAddItemButton = document.querySelectorAll('.popup__form-escape')[1];
const renameForm = document.querySelectorAll('.popup__form')[0];
const addItemForm = document.querySelectorAll('.popup__form')[1];

const cards = document.querySelector('.cards');

const inputs = document.querySelectorAll('.popup__form-input');
let inputProfileName = inputs[0];
let inputProfileOccupation = inputs[1];
let inputAddItemName = inputs[2];
let inputAddItemSrc = inputs[3];

function unboxCards(e) {
    e.forEach(card => cards.insertAdjacentHTML('afterbegin', `<div class="cards__card"><div class="cards__card-img-container"><img src="${card.link}" alt="" class="cards__card-img"><div class="crads__card-trash"></div></div><div class="cards__card-title">${card.name}<button class="cards__card-likebtn"></button></div></div>`));
}

unboxCards(cardsBox);
const deleteButtons = document.querySelectorAll('.crads__card-trash');
const likeButtons = document.querySelectorAll('.cards__card-likebtn');

function showOrHide(e) {
  if(e.classList.contains('popup_visible')) {
    e.classList.remove('fadein');
    e.classList.add('fadeout');
    function removec (a) {
      console.log('removec');
      a.classList.remove('popup_visible')
      a.classList.remove('fadeout');
    }
    setTimeout(() => removec(e), 1000);
    console.log(e);
  } else {
    e.classList.add('fadein', 'popup_visible');
  }
}

function openRenameForm() {
    let currentProfileName = document.querySelector('.profile__info-name').textContent;
    let currentProfileOccupation = document.querySelector('.profile__info-titles').textContent;
    inputProfileName.value = currentProfileName;
    inputProfileOccupation.value = currentProfileOccupation;
    showOrHide(popupRename);
}

function renameProfile(evt) {
    evt.preventDefault();
    document.querySelector('.profile__info-name').textContent = inputProfileName.value;
    document.querySelector('.profile__info-titles').textContent = inputProfileOccupation.value;
    showOrHide(popupRename);
}

function addCard(evt) {
    evt.preventDefault();
    const item = `<div class="cards__card"><div class="cards__card-img-container"><img src="${inputAddItemSrc.value}" alt="" class="cards__card-img"><div class="crads__card-trash"></div></div><div class="cards__card-title">${inputAddItemName.value}<button class="cards__card-likebtn"></button></div></div>`;
    cards.insertAdjacentHTML("afterbegin", item);
    cards.querySelector('.cards__card-likebtn').addEventListener('click',  like);
    cards.querySelector('.crads__card-trash').addEventListener('click',  deleteItem);
    inputAddItemSrc.value = '';
    inputAddItemName.value = '';
    showOrHide(popupAddItem);
}

function like(event) {
    event.currentTarget.classList.toggle('cards__card-likebtn_activated');
}

function deleteItem(event) {
    event.currentTarget.parentNode.parentNode.remove();
}

editButton.addEventListener('click', openRenameForm);
escapeRenameButton.addEventListener('click', () => showOrHide(popupRename));
popupRename.addEventListener('click', () => showOrHide(popupRename));
renameForm.addEventListener('click', event => event.stopPropagation());
renameForm.addEventListener('submit', renameProfile);

addItemBtn.addEventListener('click', () => showOrHide(popupAddItem));
escapeAddItemButton.addEventListener('click', () => showOrHide(popupAddItem));
popupAddItem.addEventListener('click', () => showOrHide(popupAddItem));
addItemForm.addEventListener('click', event => event.stopPropagation());
addItemForm.addEventListener('submit', addCard);

likeButtons.forEach(el => el.addEventListener('click',  like));
deleteButtons.forEach(el => el.addEventListener('click',  deleteItem));