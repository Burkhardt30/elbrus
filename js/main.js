(function () {

    if (typeof Swiper !== 'undefined') {
        new Swiper('.banners__slider', {
            slidesPerView: 'auto',
            spaceBetween: 6,
            pagination: {
                el: '.banners__pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.banners__next',
                prevEl: '.banners__prev',
            },
            breakpoints: {
                900: {
                    slidesPerView: 1,
                    spaceBetween: 0,
                },
            },
        });

        new Swiper('.locations__body', {
            slidesPerView: 'auto',
            spaceBetween: 20,
            breakpoints: {
                1170: {
                    slidesPerView: 5,
                },
            },
        });
        new Swiper('.product-tabs__buttons-slider', {
            slidesPerView: 'auto',
            spaceBetween: 15,
            breakpoints: {
                768: {
                    spaceBetween: 40,
                },
            },
        });
        new Swiper('.contacts__buttons-slider', {
            slidesPerView: 'auto',
        });
        new Swiper('.contact-info__images-slider', {
            slidesPerView: 'auto',
            spaceBetween: 6,
        });
        new Swiper('.jobs__tabs-slider', {
            slidesPerView: 'auto',
        });

        new Swiper('.product__slider', {
            loop: true,
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            thumbs: {
                swiper: {
                    el: '.product__nav-slider',
                    slidesPerView: 4.5,
                    spaceBetween: 5,
                    breakpoints: {
                        400: {
                            spaceBetween: 10,
                        }
                    }
                },
            },
            navigation: {
                nextEl: '.product__next',
                prevEl: '.product__prev',
            },
        });
    }

    if (typeof $ !== 'undefined') {

        // Инициализация форм-стайлера

        if (jQuery().styler) {
            $('.cart-list__counter, .city-select, .sorting__select-body').styler()
        }

        // Выпадающие фильтры

        $('.filter-aside__group-title').click(function (e) {

            e.preventDefault()

            $(this).toggleClass('filter-aside__group-title--closed')

            $(this).next().slideToggle();

        });

        // Выпадающие поля в регистрации

        $('[name="for-wholesales"]').on('change', function () {
            $('.auth__wholesale').slideToggle();
        })

        // Выбор города в шапке хэдера

        changeLocAndTel()
        $('select.city-select').on('change', changeRectSelects)
        $('select.city-select').on('change', changeLocAndTel)

        function changeLocAndTel() {

            const values = $('select.city-select').val().split(' ')
            const tel = values[0]
            const location = values[1]

            $(`.header-desk__tel,
                .header-mobile__tel,
                .fixed-header__tel,
                .header-desk__location,
                .header-mobile__location`).css('display', 'none')

            $(`[href*="${tel}"]`).css('display', 'block')
            $(`.${location}`).css('display', 'flex')

        }

        function changeRectSelects() {

            const allSelects = $('select.city-select')
            const allSelectsText = allSelects.next().children('.jq-selectbox__select-text')

            const value = $(this).val()
            const text = $(this).next().children('.jq-selectbox__select-text').text()

            allSelects.val(value)
            allSelectsText.text(text)

        }

        // Маска для телефона

        $('[type="tel"]').on('focus', (e) => {

            const maskOptions = {
                mask: '+7(000)000-00-00',
                lazy: false
            }

            new IMask(e.currentTarget, maskOptions)

            hidePlaceholder(e)

        })
    }

    document.addEventListener('scroll', setFollowForHeader)

    document.addEventListener('input', hidePlaceholder)

    document.addEventListener('click', selectLocationSlide)
    document.addEventListener('click', switchCatalogDisplay)
    document.addEventListener('click', toggleBuyPopup)
    document.addEventListener('click', toggleBurgerMenu)
    document.addEventListener('click', toggleFilters)

    function hidePlaceholder(e) {

        let target = e.target.closest('.auth__input') ||
            e.target.closest('.user-data__input') ||
            e.target.closest('.director__input')

        if (!target) return

        let placeholder = target.nextElementSibling

        target.value != '' ?
            placeholder.hidden = true :
            placeholder.hidden = false

    }
    function selectLocationSlide(e) {

        const target = e.target.closest('.locations__slide')

        if (!target) return

        setActive(target, 'locations__slide', 'locations__slide--active')

    }
    let currentSorting = 'grid'
    function switchCatalogDisplay(e) {

        const target = e.target.closest('.sorting__filter-btn')

        if (!target) return

        const catalog = document.querySelector('.catalog-main__inner')
        const catalogItems = document.querySelectorAll('.catalog-item')

        if (target.classList.contains('catalog-grid')) {
            catalog.classList.add('catalog-main__inner--grid')
            for (let item of catalogItems) {
                item.classList.add('catalog-item--in-grid')
            }
            currentSorting = 'grid'
        } else {
            catalog.classList.remove('catalog-main__inner--grid')
            for (let item of catalogItems) {
                item.classList.remove('catalog-item--in-grid')
            }
            currentSorting = 'list'
        }

        setActive(
            target,
            'sorting__filter-btn',
            'sorting__filter-btn--active'
        )

    }
    window.addEventListener('resize', () => {

        if (currentSorting === 'grid') return

        const sortButtonGrid = document.querySelector('.catalog-grid')
        const sortButtonList = document.querySelector('.catalog-list')
        const catalog = document.querySelector('.catalog-main__inner')
        const catalogItems = document.querySelectorAll('.catalog-item')

        if (window.innerWidth >= 768) {

            catalog.classList.remove('catalog-main__inner--grid')
            for (let item of catalogItems) {
                item.classList.remove('catalog-item--in-grid')
            }

            setActive(
                sortButtonList,
                'sorting__filter-btn',
                'sorting__filter-btn--active'
            )

            return false
        }


        catalog.classList.add('catalog-main__inner--grid')
        for (let item of catalogItems) {
            item.classList.add('catalog-item--in-grid')
        }

        setActive(
            sortButtonGrid,
            'sorting__filter-btn',
            'sorting__filter-btn--active'
        )
    })
    function toggleBuyPopup(e) {

        const target = e.target.closest('.buy-popup__cross') ||
            e.target.closest('.buy-popup__overlay') ||
            e.target.closest('.buy-btns__click')

        if (!target) return

        e.preventDefault()

        const popup = document.querySelector('.buy-popup')

        if (!popup.closest('.buy-popup--show')) {
            let width = document.documentElement.clientWidth
            document.body.style.overflow = "hidden"
            width -= document.documentElement.clientWidth
            document.body.style.paddingRight = -width + 'px'
        } else {
            document.body.style.paddingRight = 0
            document.body.style.overflow = "visible"
        }

        popup.classList.toggle('buy-popup--show')

    }

    document.addEventListener('click', showCatalogDropdown)
    document.addEventListener('input', showSearchDropdown)

    function showCatalogDropdown(e) {

        const caller = e.target.closest('.catalog-row__button')

        if (!caller) return

        const container = caller.closest('.container')
        const dropdown = caller.querySelector('.catalog-row__dropdown')

        const setPosition = () => {

            const left = caller.getBoundingClientRect().left
            const right = document.documentElement.clientWidth -
                container.getBoundingClientRect().right + 15
            const top = caller.getBoundingClientRect().bottom + 30

            dropdown.style.top = top + 'px'
            dropdown.style.left = left + 'px'
            dropdown.style.right = right + 'px'

        }

        window.addEventListener('resize', setPosition)
        document.addEventListener('scroll', setPosition)
        setPosition()

        if (caller.classList.contains('dropdown-caller--active')) {
            caller.classList.remove('dropdown-caller--active')
            return
        }

        hideAllDropdowns()

        caller.classList.add('dropdown-caller--active')

    }
    function showSearchDropdown(e) {

        const caller = e.target.closest('.search__input')

        if (!caller) return

        const container = caller.closest('.container')
        const dropdown = caller.parentElement.querySelector('.search__dropdown')

        const setPosition = () => {

            const left = caller.getBoundingClientRect().left
            const right = document.documentElement.clientWidth -
                container.getBoundingClientRect().right + 15
            const top = caller.getBoundingClientRect().bottom + 30

            dropdown.style.top = top + 'px'
            dropdown.style.left = left + 'px'
            dropdown.style.right = right + 'px'

        }

        window.addEventListener('resize', setPosition)
        document.addEventListener('scroll', setPosition)
        setPosition()

        hideAllDropdowns()

        if (caller.value == '') {
            caller.parentElement.classList.remove('dropdown-caller--active')
            return
        }

        caller.parentElement.classList.add('dropdown-caller--active')

    }
    function hideAllDropdowns() {

        const callers = document.querySelectorAll('.dropdown-caller')

        for (let caller of callers) {
            if (caller.classList.contains('dropdown-caller--active')) {
                caller.classList.remove('dropdown-caller--active')
            }
        }

    }

    function toggleFilters(e) {

        const target = e.target.closest('.catalog-main__filter-button') ||
            e.target.closest('.filter-aside__close')

        if (!target) return

        const filters = document.querySelector('.filter-aside')

        if (!filters.closest('.filter-aside--show')) {
            let width = document.documentElement.clientWidth
            document.body.style.overflow = "hidden"
            width -= document.documentElement.clientWidth
            document.body.style.paddingRight = -width + 'px'
        } else {
            document.body.style.paddingRight = 0
            document.body.style.overflow = "visible"
        }

        filters.classList.toggle('filter-aside--show')

    }
    function setFollowForHeader() {

        const header = document.querySelector('.header')
        const headerHeight = header.offsetHeight

        if (window.pageYOffset > headerHeight) {
            hideAllDropdowns()
            header.classList.add('header--follow')
        } else {
            header.classList.remove('header--follow')
        }

    }
    function toggleBurgerMenu(e) {

        const target = e.target.closest('.header-mobile__burger-button') ||
            e.target.closest('.header-mobile__burger-overlay')

        if (!target) return

        e.preventDefault()

        const burgerButton = document.querySelector('.header-mobile__burger-button')
        const burgerMenu = document.querySelector('.header-mobile__burger-menu')

        if (!burgerMenu.closest('.header-mobile__burger-menu--show')) {
            let width = document.documentElement.clientWidth
            document.body.style.overflow = "hidden"
            width -= document.documentElement.clientWidth
            document.body.style.paddingRight = -width + 'px'
        } else {
            document.body.style.paddingRight = 0
            document.body.style.overflow = "visible"
        }

        burgerButton.classList.toggle('header-mobile__burger-button--active')
        burgerMenu.classList.toggle('header-mobile__burger-menu--show')

    }

    document.addEventListener('click', function (e) {

        const target = e.target.closest('.buy-btns__to-cart')

        if (!target) return

        e.preventDefault()

        target.classList.toggle('btn--added-to-cart')

    })

    // Удаляет все события у элементов
    let itemCounters = document.querySelectorAll('.jq-number')

    for (let counter of itemCounters) {
        counter.outerHTML = counter.outerHTML
    }

    // Элементы нужно определить ещё раз, иначе работать не будет
    itemCounters = document.querySelectorAll('.jq-number')

    // Вешаем свои обработчики
    for (let counter of itemCounters) {
        counter.onclick = () => {
            console.log('Сработало');
        }
    }

    // Вызов попапа

    document.addEventListener('click', togglePopup)

    function togglePopup(e) {

        const target = e.target.closest('.popup__cross') ||
            e.target.closest('.popup__overlay') ||
            e.target.closest('.contact-info__btn')

        if (!target) return

        e.preventDefault()

        const popup = document.querySelector('.popup')

        if (!popup.closest('.popup--show')) {
            let width = document.documentElement.clientWidth
            document.body.style.overflow = "hidden"
            width -= document.documentElement.clientWidth
            document.body.style.paddingRight = -width + 'px'
        } else {
            document.body.style.paddingRight = 0
            document.body.style.overflow = "visible"
        }

        popup.classList.toggle('popup--show')

    }

    // Скрипт для табов на всём сайте

    document.addEventListener('click', switchTab)

    function switchTab(e) {

        const tab = e.target.closest('.tab')
        const button = e.target.closest('.tab-button')

        if (!tab) return
        if (!button) return

        e.preventDefault()

        const content = tab.querySelector('.tab-sections')
        const section = content.querySelector(
            `[data-tab="${button.dataset.tab}"]`
        )

        setActive(button, 'tab-button', 'tab-button-active')
        setActive(section, 'tab-section', 'tab-section-show')

    }

    // Карты

    if (typeof ymaps !== 'undefined') {
        ymaps.ready(() => {
            initYmaps('map-1', [55.57136017671344, 37.75413504365536])
            initYmaps('map-2', [59.81598414712444, 30.400363216622008])
            initYmaps('map-3', [55.847861507757926, 49.13834014129537])
            initYmaps('map-4', [56.869660187853825, 60.58485729474866])
            initYmaps('map-5', [45.09639769536104, 39.09951325644873])
        });
    }
    function initYmaps(mapID, coord) {
        // Создание карты.
        const map = new ymaps.Map(mapID, {
            center: coord,
            zoom: 16,
        });
        const myPlacemark = new ymaps.Placemark(coord, {
            // hintContent: 'Подсказка при наведении на метку',
            // balloonContent: 'Текст при нажатии на метку'
        }, {
            iconLayout: 'default#image',
            iconImageHref: '/images/icons/mark-2.svg',
            iconImageSize: [44, 56],
            iconImageOffset: [-22, -56],
        });

        map.geoObjects.add(myPlacemark);

        // map.controls.remove('geolocationControl'); // удаляем геолокацию
        // map.controls.remove('searchControl'); // удаляем поиск
        // map.controls.remove('trafficControl'); // удаляем контроль трафика
        // map.controls.remove('typeSelector'); // удаляем тип
        // map.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
        // map.controls.remove('zoomControl'); // удаляем контрол зуммирования
        // map.controls.remove('rulerControl'); // удаляем контрол правил
        // map.behaviors.disable(['scrollZoom']); // отключаем скролл карты (опционально)
    }

    // Общие функции

    function setActive(item, defaultClass, activeClass) {
        if (item.classList.contains(`.${activeClass}`)) return

        const all = document.querySelectorAll(`.${defaultClass}`)

        for (let item of all) {
            item.classList.remove(activeClass)
        }
        item.classList.add(activeClass)
    }

    // Обращение к теневому дереву

    setStyleBottom()

    function setStyleBottom() {

        setTimeout(function set() {

            const chat24 = document.querySelector('chat-24')

            if (chat24) {

                const widget = chat24.shadowRoot.querySelector('.widget--vertical')
    
                if (widget) {
                    // chat24.shadowRoot.innerHTML += '<style>.widget--center{bottom:calc(58px + (87 - 58) * ((100vw - 320px) / (900 - 320))) !important}</style>'
                    widget.style.bottom = 'calc(58px + (87 - 58) * ((100vw - 320px) / (900 - 320)))'
                } else {
                    setTimeout(set, 1000)
                }
                
            } else {
                setTimeout(set, 1000)
            }

        }, 1000);
    }

})()