window.onload = function() {
    var nameInput = document.querySelector("#user-name");
    var messageInput = document.querySelector("#message");
    var sendBtn = document.querySelector("#send");
    var blogContainer = document.querySelector("#blog");
    var postTemplateContainer = document.querySelector("#postTemplateContainer");
    // просто скопировали контент из скрипта,
    // здесь этот контент - просто строка с текстом
    var postTemplate = postTemplateContainer.innerHTML;

    // функция возвращает true, если нет ошибок
    var checkValue = function(input) {
        if (input.value.trim() === "") {
            return false;
        }
        return true;
    };

    var showError = function(input) {
        input.classList.add("is-invalid");
    };

    var addPost = function() {
        var nameHasError = checkValue(nameInput) === false;
        var messageHasError = checkValue(messageInput) === false;

        if (nameHasError) {
            showError(nameInput);
            nameInput.focus();
        }

        if (messageHasError) {
            showError(messageInput);
            // на второе поле устанавливаем фокус, только если в первом нет ошибки
            if (nameHasError === false) {
                messageInput.focus();
            }
        }

        if (!nameHasError && !messageHasError) {
            var postContent = postTemplate
                .replace("{%username%}", nameInput.value)
                .replace("{%content%}", messageInput.value);

            blogContainer.innerHTML = postContent + blogContainer.innerHTML;
            nameInput.value = "";
            messageInput.value = "";
            nameInput.focus();
        }
    };

    var removeErrorClass = function() {
        this.classList.remove("is-invalid");
    };

    // просто сохраняем ссылку на функцию в свойство onclick
    // мы не вызываем функцию сами, её вызывать будет браузер по клику на кнопку
    sendBtn.onclick = addPost;
    messageInput.onkeypress = removeErrorClass;
    nameInput.onkeypress = removeErrorClass;

    // первым аргументом в обработчик всегда приходит
    // объект event
    // с информацией о событии (коды клавиш, координаты клика и т.д.)
    nameInput.onkeydown = function(event) {
        if (event.key === "Enter") {
            messageInput.focus();
            // предотвращаем выполнение действий по умолчанию
            // т.е. отображение символа в поле
            event.preventDefault();
        }
    };

    messageInput.onkeydown = function(e) {
        // если нажали enter и вместе с ней ctrl
        if (e.key === "Enter" && e.ctrlKey === true) {
            addPost();
            e.preventDefault();
        }
    };

};
