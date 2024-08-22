'use script';

const  editForm = document.querySelector('#edit__form');
const cancelBtn = document.querySelector('#cancel__btn');
const readNotesBoard = document.querySelector('#read__notes_board');
const editBtn = document.querySelector('#edit__btn');

editBtn.addEventListener('click', () => {
    editForm.classList.toggle('display');
    readNotesBoard.classList.toggle('display');
});

cancelBtn.addEventListener('click', () => {
    editForm.classList.toggle('display');
    readNotesBoard.classList.toggle('display');
});