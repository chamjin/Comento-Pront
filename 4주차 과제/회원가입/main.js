document.addEventListener('DOMContentLoaded', () => {
    const members = [];
    const form = document.getElementsByTagName('form')[0];

    form.onsubmit = handleFormSubmit;

    function handleFormSubmit(event) {
        event.preventDefault();
        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        if (isDuplicateId(data)) {
            form.reset();
            members.push(data);
            alert('회원가입 성공');
        }
    }

    function isDuplicateId(data) {
        for (let i = 0; i < members.length; i++) {
            if (data['id'] === members[i]['id']) {
                alert('중복 아이디입니다.');
                return false;
            }
        }
        return true;
    }
});
