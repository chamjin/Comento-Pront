document.addEventListener('DOMContentLoaded', () => {
    const toDoList = [];
    const checkedList = [];
    const inputValue = document.getElementById('content');
    const toDoListSection = document.querySelector('.to-do-list');

    inputValue.addEventListener('keydown', (event) => {
        if (inputValue.value && event.key === 'Enter') {
            toDoList.push(inputValue.value);
            checkedList.push(false);
            updateToDoList();
            inputValue.value = '';
        }
    });

    function updateToDoList() {
        toDoListSection.innerHTML = '';
        toDoList.forEach((item, index) => {
            const listItem = document.createElement('div');
            listItem.classList.add('list');

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = checkedList[index];

            const span = document.createElement('span');
            span.classList.add('to-do');
            span.textContent = item;

            if (checkbox.checked) {
                span.classList.add('to-do-done');
            }

            checkbox.addEventListener('change', () => {
                checkedList[index] = checkbox.checked;
                if (checkbox.checked) {
                    span.classList.add('to-do-done');
                } else {
                    span.classList.remove('to-do-done');
                }
            });

            const button = document.createElement('button');
            button.textContent = '삭제';
            button.addEventListener('click', () => {
                toDoList.splice(index, 1);
                checkedList.splice(index, 1);
                updateToDoList();
            });

            listItem.appendChild(checkbox);
            listItem.appendChild(span);
            listItem.appendChild(button);

            toDoListSection.appendChild(listItem);
        });
    }
});
