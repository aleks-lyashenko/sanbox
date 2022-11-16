const popupLinks = document.querySelectorAll('.popup-link');    //Массив ссылок на попап

const body = document.querySelector('body');    //чтобы заблокировать скролл body

//Элементы с фиксированным положением, чтобы выставить для них правильный padding
const lockPadding = document.querySelectorAll('.lock-padding');

let unlock = true; //чтобы не было двойных нажатий

const timeout = 800; //количество мс

if(popupLinks.length > 0) {
    for(let index = 0; index < popupLinks.length; index++) {
        const popupLink = popupLinks[index];
        popupLink.addEventListener('click', function (e) {
            const popupName = popupLink.getAttribute('href').replace('#','');
            const currentPopup = document.getElementById(popupName);
            openPopup(currentPopup);
            e.preventDefault();
        });
    }
}

const popupCloseIcons = document.querySelectorAll('.popup__close');

if(popupCloseIcons.length > 0) {
    for(let index=0; index<popupCloseIcons.length; index++) {
        const el = popupCloseIcons[index];
        el.addEventListener('click', function(e) {
            closePopup(el.closest('.popup'));
            e.preventDefault();
        });
    }
} 

function openPopup (currentPopup) {
    if(currentPopup && unlock) {
        const popupActive = document.querySelector('.popup.open');
        if(popupActive){
            closePopup(popupActive, false)
        } else {
            bodyLock();
        }
        currentPopup.classList.add('open');
        currentPopup.addEventListener('click', function (e) {
            if(!e.target.closest('.popup__content')) {
                closePopup(e.target.closest('.popup'));
            }
        });
    }
}

function closePopup(currentPopup, doUnlock = true) {
    if(unlock) {

        currentPopup.classList.remove('open');
        if(doUnlock) {
            bodyUnlock();
        }
    }
}

function bodyLock() {
    const lockPaddingValue = window.innerWidth - document.querySelector('.main').offsetWidth + 'px';
    if(lockPadding.length > 0) {
        for(let i = 0; i < lockPaddingValue; i++) {
            const el = lockPadding[index];
            el.style.paddingRight = lockPaddingValue;
        }
    }
    body.style.paddingRight = lockPaddingValue;
    body.classList.add('lock');

    unlock = false;
    setTimeout(function() {
        unlock = true;
    }, timeout);
}

function bodyUnlock() {
    setTimeout(function() {
        if(lockPadding) {
            for(let i = 0; i < lockPadding.length; i++) {
                const el = lockPadding[i];
                el.style.paddingRight = '0px';
            }
        }
        body.style.paddingRight = '0px';
        body.classList.remove('lock');
    }, timeout);

    unlock = false;
    setTimeout(function() {
        unlock = true;
    }), timeout;
}

// Закрытие активного попапа клавишей Esc
document.addEventListener('keydown', function(e) {
    if(e.which === 27) {
        const popupActive = document.querySelector('.popup.open');
        closePopup(popupActive);
    }
});

//Функции-полифилы

(function() {
    //проверяем поддержку
    if(!Element.prototype.closest){
        //реализуем
        Element.prototype.closest = function (css) {
            var node = this;
            while(node) {
                if(node.matches(css)) return node;
                else node = node.parentElement;
            }
            return null;
        }
    }
})();

(function() {
    //проверяем поддержку
    if(!Element.prototype.matches) {
        //определяем свойство
        Element.prototype.matches = Element.prototype.matchesSelector ||
            Element.prototype.webkitMatchesSelector ||
            Element.prototype.mozMatchesSelector ||
            Element.prototype.msMatchesSelector;
    }
})();
