'use script';

const  createNoteForm = document.querySelector('#create__form');
const createNoteBtn = document.querySelector('#create_note_btn');

const  editForm = document.querySelector('#edit__form');
const readNotesBoard = document.querySelector('#read__notes_board');
const editBtn = document.querySelector('#edit__btn');

const myInput = document.getElementById('myInput');

createNoteBtn.addEventListener('click', () => {
    createNoteForm.classList.toggle('display');
    console.log('clicked')
});

if (editBtn) {
    editBtn.addEventListener('click', () => {
        editForm.classList.toggle('display');
    });
};

if (myInput) {
    myInput.addEventListener('keyup', (e) => {
        var filter, ul, li, a, i, txtValue;
        filter = e.target.value.toUpperCase();
        ul = document.getElementById("myUL");
        li = ul.getElementsByTagName("li");

        console.log(e.target.value)
        for (i = 0; i < li.length; i++) {
            a = li[i].getElementsByTagName("a")[0];
            txtValue = a.textContent || a.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "";
            } else {
                li[i].style.display = "none";
            }
        }
    })
}
