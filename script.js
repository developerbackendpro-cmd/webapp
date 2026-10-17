(() => {
'use strict';

const BOT = window.SPOTLINE_BOT || 'spotline_zone_bot';
const tg  = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;

const WEEK = ['Du-Пн', 'Se-Вт', 'Chr-Ср', 'Py-Чт', 'Ju-Пт', 'Shn-Сб', 'Yak-Вс'];

const MONTHS = {
    uz: ['Yanvar','Fevral','Mart','Aprel','May','Iyun','Iyul','Avgust','Sentabr','Oktabr','Noyabr','Dekabr'],
    ru: ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
};
const DAYS = {
    uz: ['Dushanba','Seshanba','Chorshanba','Payshanba','Juma','Shanba','Yakshanba'],
    ru: ['Понедельник','Вторник','Среда','Четверг','Пятница','Суббота','Воскресенье'],
};

const T = {
uz: {
    workplace:'Ish joyi',
    cabinet:'Kabinet', bookings:'Yozuvlar', services:'Xizmatlar', report:'Hisobot', settings:'Sozlamalar', workdays:'Ish kunlari',
    phone:'Telefon', telegram:'Telegram', instagram:'Instagram', location:'Lokatsiya',
    name:'Ismingiz', lunch:'Tushlik vaqti', interval:'Qabul davomiyligi',
    blocked:'Qora roʻyxat', language:'Til', rules:'Qoidalar', deleteAcc:'Hisobni oʻchirish',
    qr:'QR-code', openBot:'Botda ochish',
    save:'Saqlash', cancel:'Bekor', done:'Tayyor', del:'Oʻchirish', confirm:'Tasdiqlash',
    chooseDay:'Kunni tanlang', chooseTime:'Vaqtni tanlang', chooseDuration:'Davomiylik',
    noBookings:'Yozuvlar yoʻq', noBookingsText:'Bu oyda hali birorta yozuv yoʻq',
    noServices:'Xizmatlar yoʻq', noServicesText:'Mijozlar nimaga yozilishini bilishi uchun xizmat qoʻshing',
    noBlocked:'Roʻyxat boʻsh', noBlockedText:'Siz hali hech kimni bloklamadingiz',
    noFree:'Boʻsh vaqt yoʻq', noFreeText:'Bu kunda barcha oynalar band yoki tushlikka toʻgʻri keladi',
    noDays:'Boʻsh kun yoʻq', noDaysText:'Bu oyda ish kunlaringiz yoʻq yoki hammasi band',
    newBooking:'Yangi yozuv', addService:'Xizmat qoʻshish',
    svcNameUz:'Nomi (oʻzbekcha)', svcNameRu:'Nomi (ruscha)', svcTime:'Davomiyligi (daqiqa)',
    totalBookings:'Jami yozuvlar', thisMonth:'Shu oyda', services_:'Xizmatlar',
    hidePhone:'Telefonni yashirish', hideTelegram:'Telegramni yashirish',
    hideInstagram:'Instagramni yashirish', hideGoogle:'Google Maps yashirish',
    hideYandex:'Yandex Maps yashirish', searchOn:'Qidiruvda koʻrinish', lunchAccept:'Tushlikda qabul',
    saved:'Saqlandi', deleted:'Oʻchirildi', added:'Qoʻshildi', error:'Xatolik yuz berdi',
    confirmDelBooking:'Bu yozuvni bekor qilasizmi?', confirmDelService:'Bu xizmatni oʻchirasizmi?',
    confirmDelAcc:'Hisobingiz, barcha xizmatlar va yozuvlar butunlay oʻchiriladi. Davom etasizmi?',
    namePh:'Masalan: Aziz Rahimov', phonePh:'+998 90 123 45 67',
    tgPh:'https://t.me/username', igPh:'https://instagram.com/username', errEmpty:'Boʻsh qoldirib boʻlmaydi',
    errPhone:'Telefon raqami notoʻgʻri', errUrl:'Toʻliq havola kiriting (https://…)',
    errSvcTime:'1 dan 60 gacha son kiriting', errOrder:'Yopilish ochilishdan keyin boʻlsin',
    locGet:'Joriy joylashuvni olish', locSaved:'Joylashuv saqlandi', locDenied:'Joylashuvga ruxsat berilmadi',
    noMaster:'Profil topilmadi', noMasterText:'Bu Telegram hisobi uchun master profili mavjud emas',
    selfBlock:'Oʻzim uchun', opens:'Ochilish', closes:'Yopilish',
    today:'Bugungi jadval', all:'Barchasi', rate:'Valyuta kursi',
    tToday:'Bugun', noTodayText:'Bugungi kunga hali hech kim yozilmagan',
    stNext:'Keyingi', stWait:'Kutilmoqda', stDone:'Yakunlandi',
    refresh:'Yangilash', theme:'Mavzu', dark:'Qorongʻi', light:'Yorugʻ',
    contacts:'Mijozlar raqami', contactsSub:'Saqlangan telefon raqamlar', contactsTab:'Mijozlar',
    likes:'Layklar',
    noContacts:'Raqamlar yoʻq', noContactsText:'Botda saqlangan mijoz raqamlari shu yerda koʻrinadi',
    copied:'Raqam nusxalandi', selectCopy:'Raqam belgilandi — uzoq bosib nusxa oling',
    addContact:'Raqam qoʻshish',
    welcome:'Xush kelibsiz!', stLive:'Jarayonda', noteT:'Bildirishnomalar',
    noteEmpty:'Yangi bildirishnoma yoʻq', noteEmptyText:'Bugungi yozuvlar paydo boʻlganda shu yerda koʻrinadi', upd:'Yangilandi',
    subSvc:'Narxlar va davomiylik', subRep:'Statistika va dinamika',
    wxClear:'Ochiq', wxCloud:'Bulutli', wxFog:'Tuman', wxRain:'Yomgʻir',
    wxSnow:'Qor', wxStorm:'Momaqaldiroq', wxDrizzle:'Mayda yomgʻir',
},
ru: {
    cabinet:'Кабинет', bookings:'Записи', services:'Услуги', report:'Отчёт', settings:'Настройки', workdays:'Рабочие дни',
    phone:'Телефон', telegram:'Телеграм', instagram:'Инстаграм', location:'Местоположение',
    name:'Ваше имя', lunch:'Время обеда', interval:'Длительность приёма',
    blocked:'Чёрный список', language:'Язык', rules:'Правила', deleteAcc:'Удалить аккаунт',
    qr:'QR-code', openBot:'Открыть в боте',
    save:'Сохранить', cancel:'Отмена', done:'Готово', del:'Удалить', confirm:'Подтвердить', workplace:'Место работы',
    chooseDay:'Выберите день', chooseTime:'Выберите время', chooseDuration:'Длительность',
    noBookings:'Записей нет', noBookingsText:'В этом месяце пока нет ни одной записи',
    noServices:'Услуг нет', noServicesText:'Добавьте услугу, чтобы клиенты знали, на что записаться',
    noBlocked:'Список пуст', noBlockedText:'Вы пока никого не блокировали',
    noFree:'Свободного времени нет', noFreeText:'Все окна заняты или попадают на обед',
    noDays:'Свободных дней нет', noDaysText:'В этом месяце нет рабочих дней или все заняты',
    newBooking:'Новая запись', addService:'Добавить услугу',
    svcNameUz:'Название (узб.)', svcNameRu:'Название (рус.)', svcTime:'Длительность (минут)',
    totalBookings:'Всего записей', thisMonth:'В этом месяце', services_:'Услуги',
    hidePhone:'Скрыть телефон', hideTelegram:'Скрыть Телеграм',
    hideInstagram:'Скрыть Инстаграм', hideGoogle:'Скрыть Google Maps',
    hideYandex:'Скрыть Yandex Maps', searchOn:'Показ в поиске', lunchAccept:'Приём в обед',
    saved:'Сохранено', deleted:'Удалено', added:'Добавлено', error:'Произошла ошибка',
    confirmDelBooking:'Отменить эту запись?', confirmDelService:'Удалить эту услугу?',
    confirmDelAcc:'Аккаунт, все услуги и записи будут удалены полностью. Продолжить?',
    namePh:'Например: Азиз Рахимов', phonePh:'+998 90 123 45 67',
    tgPh:'https://t.me/username', igPh:'https://instagram.com/username', errEmpty:'Нельзя оставить пустым',
    errPhone:'Неверный номер телефона', errUrl:'Введите полную ссылку (https://…)',
    errSvcTime:'Введите число от 1 до 60', errOrder:'Закрытие должно быть позже открытия',
    locGet:'Получить местоположение', locSaved:'Местоположение сохранено',
    locDenied:'Доступ к геолокации не разрешён',
    noMaster:'Профиль не найден', noMasterText:'Для этого Telegram-аккаунта нет профиля мастера',
    selfBlock:'Для себя', opens:'Открытие', closes:'Закрытие',
    today:'Сегодняшний график', all:'Все', rate:'Курс валют',
    tToday:'Сегодня', noTodayText:'На сегодня ещё никто не записался',
    stNext:'Следующий', stWait:'Ожидает', stDone:'Завершено',
    refresh:'Обновить', theme:'Тема', dark:'Тёмная', light:'Светлая',
    contacts:'Номера клиентов', contactsSub:'Сохранённые номера', contactsTab:'Клиенты',
    likes:'Лайки',
    noContacts:'Номеров нет', noContactsText:'Здесь появятся номера клиентов, сохранённые в боте',
    copied:'Номер скопирован', selectCopy:'Номер выделен — зажмите, чтобы скопировать',
    addContact:'Добавить номер',
    welcome:'Добро пожаловать!', stLive:'В процессе', noteT:'Уведомления',
    noteEmpty:'Новых уведомлений нет', noteEmptyText:'Здесь появятся записи на сегодня', upd:'Обновлено',
    subSvc:'Цены и длительность', subRep:'Статистика и динамика',
    wxClear:'Ясно', wxCloud:'Облачно', wxFog:'Туман', wxRain:'Дождь',
    wxSnow:'Снег', wxStorm:'Гроза', wxDrizzle:'Морось',
}};

const I = {
    warn:'<path d="M12 3.6 2.3 20.4h19.4L12 3.6Z" stroke="currentColor" stroke-width="1.8"'
      + ' stroke-linejoin="round" fill="none"/>'
      + '<path d="M12 9.6v4.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>'
      + '<circle cx="12" cy="17.3" r="1.15" fill="currentColor"/>',
    copy:'<rect x="8.6" y="8.6" width="11.4" height="11.4" rx="3" stroke="currentColor" stroke-width="1.7"/>'
      + '<path d="M15.4 5.6a3 3 0 0 0-3-1.6H7a3 3 0 0 0-3 3v5.4a3 3 0 0 0 1.6 3"'
      + ' stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>',
    up:'<path d="M12 19.5V5M12 5l-5.6 5.6M12 5l5.6 5.6" stroke="currentColor" stroke-width="2"'
      + ' stroke-linecap="round" stroke-linejoin="round"/>',
    down2:'<path d="M12 4.5V19M12 19l-5.6-5.6M12 19l5.6-5.6" stroke="currentColor" stroke-width="2"'
      + ' stroke-linecap="round" stroke-linejoin="round"/>',
    minus:'<path d="M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
    locate:'<circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.8"/>'
      + '<path d="M12 2.4v3M12 18.6v3M2.4 12h3M18.6 12h3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
    navto:'<path d="M20.4 3.6 3.9 10.5c-.9.4-.8 1.7.1 1.9l6.6 1.6 1.6 6.6c.2.9 1.5 1 1.9.1L20.4 3.6Z"'
      + ' stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>',
    route:'<circle cx="6.3" cy="5.6" r="2.4" stroke="currentColor" stroke-width="1.7"/>'
      + '<circle cx="17.7" cy="18.4" r="2.4" stroke="currentColor" stroke-width="1.7"/>'
      + '<path d="M6.3 8v4.4a3.4 3.4 0 0 0 3.4 3.4h4.6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>',
    cabinet:'<circle cx="12" cy="8.4" r="3.9" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M4.5 20.2c.9-3.7 3.9-5.7 7.5-5.7s6.6 2 7.5 5.7" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>',
    bookings:'<rect x="3.2" y="5" width="17.6" height="15.8" rx="3.6" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M3.2 9.7h17.6M7.8 3.2v3.3M16.2 3.2v3.3" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><circle cx="8.4" cy="13.8" r="1.2" fill="currentColor"/><circle cx="12" cy="13.8" r="1.2" fill="currentColor"/>',
    services:'<path d="M12 2.8l1.65 4.3 4.3 1.65-4.3 1.65L12 14.7l-1.65-4.3-4.3-1.65 4.3-1.65L12 2.8Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M17.8 15.3l.82 2.13 2.13.82-2.13.82-.82 2.13-.82-2.13-2.13-.82 2.13-.82.82-2.13Z" fill="currentColor"/>',
    report:'<path d="M4.4 19.6V13m5.2 6.6V7.4m5.2 12.2v-4.4m5.2 4.4V4.4" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round"/>',
    settings:'<circle cx="12" cy="12" r="3.1" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M19.1 14.3a1.5 1.5 0 0 0 .3 1.65l.05.06a1.85 1.85 0 1 1-2.6 2.6l-.06-.05a1.5 1.5 0 0 0-1.65-.3 1.5 1.5 0 0 0-.9 1.37v.16a1.85 1.85 0 1 1-3.7 0v-.08a1.5 1.5 0 0 0-.98-1.37 1.5 1.5 0 0 0-1.65.3l-.06.05a1.85 1.85 0 1 1-2.6-2.6l.05-.06a1.5 1.5 0 0 0 .3-1.65 1.5 1.5 0 0 0-1.37-.9H3.9a1.85 1.85 0 1 1 0-3.7h.08a1.5 1.5 0 0 0 1.37-.98 1.5 1.5 0 0 0-.3-1.65l-.05-.06a1.85 1.85 0 1 1 2.6-2.6l.06.05a1.5 1.5 0 0 0 1.65.3h.07a1.5 1.5 0 0 0 .9-1.37V3.9a1.85 1.85 0 1 1 3.7 0v.08a1.5 1.5 0 0 0 .9 1.37 1.5 1.5 0 0 0 1.65-.3l.06-.05a1.85 1.85 0 1 1 2.6 2.6l-.05.06a1.5 1.5 0 0 0-.3 1.65v.07a1.5 1.5 0 0 0 1.37.9h.16a1.85 1.85 0 1 1 0 3.7h-.08a1.5 1.5 0 0 0-1.37.9Z" fill="none" stroke="currentColor" stroke-width="1.5"/>',
    person:'<circle cx="12" cy="9" r="3.6" fill="currentColor"/><path d="M5 20c.9-3.3 3.6-5.1 7-5.1s6.1 1.8 7 5.1" fill="currentColor"/>',
    phone:'<path d="M7.1 3.6h3l1.5 3.7-1.9 1.4a11 11 0 0 0 4.6 4.6l1.4-1.9 3.7 1.5v3a1.6 1.6 0 0 1-1.8 1.6C11.4 16.6 7.4 12.6 5.5 5.4A1.6 1.6 0 0 1 7.1 3.6Z" fill="currentColor"/>',
    pin:'<path d="M12 21.4s6.6-6 6.6-10.4a6.6 6.6 0 1 0-13.2 0C5.4 15.4 12 21.4 12 21.4Z" fill="currentColor"/><circle cx="12" cy="10.6" r="2.4" fill="#fff"/>',
    clock:'<circle cx="12" cy="12" r="8.6" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 7.3V12l3.2 2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
    cal:'<rect x="3.4" y="5.2" width="17.2" height="15.4" rx="3.4" fill="currentColor"/><path d="M3.4 9.8h17.2" stroke="#fff" stroke-width="1.4" opacity=".55"/><path d="M7.8 3.4v3.2M16.2 3.4v3.2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
    timer:'<circle cx="12" cy="13.3" r="7.5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 9.8v3.5l2.3 1.4M9.5 2.7h5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
    lock:'<rect x="4.6" y="10.2" width="14.8" height="10.4" rx="3.2" fill="currentColor"/><path d="M8.2 10.2V7.6a3.8 3.8 0 0 1 7.6 0v2.6" fill="none" stroke="currentColor" stroke-width="2"/>',
    eye:'<path d="M2.4 12s3.6-6.2 9.6-6.2S21.6 12 21.6 12s-3.6 6.2-9.6 6.2S2.4 12 2.4 12Z" fill="none" stroke="currentColor" stroke-width="1.9"/><circle cx="12" cy="12" r="2.9" fill="currentColor"/>',
    globe:'<circle cx="12" cy="12" r="8.6" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M3.4 12h17.2M12 3.4c2.3 2.4 3.4 5.3 3.4 8.6s-1.1 6.2-3.4 8.6c-2.3-2.4-3.4-5.3-3.4-8.6S9.7 5.8 12 3.4Z" fill="none" stroke="currentColor" stroke-width="1.8"/>',
    doc:'<path d="M6.4 3.4h7.4l5 5v12.2a1.8 1.8 0 0 1-1.8 1.8H6.4a1.8 1.8 0 0 1-1.8-1.8V5.2a1.8 1.8 0 0 1 1.8-1.8Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M13.6 3.6v5h5M8.4 13h7.2M8.4 16.6h5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>',
    send:'<path d="M20.6 3.4 10.4 13.6M20.6 3.4l-6.5 17.2-3.7-7-7-3.7 17.2-6.5Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>',
    star:'<path d="m12 3.4 2.65 5.37 5.93.86-4.29 4.18 1.01 5.9L12 16.92 6.7 19.71l1.01-5.9L3.42 9.63l5.93-.86L12 3.4Z" fill="currentColor"/>',
    trash:'<path d="M4 6.6h16M9.4 6.6V4.8a1.4 1.4 0 0 1 1.4-1.4h2.4a1.4 1.4 0 0 1 1.4 1.4v1.8M6.6 6.6l.9 12.6a1.8 1.8 0 0 0 1.8 1.6h5.4a1.8 1.8 0 0 0 1.8-1.6l.9-12.6" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/>',
    plus:'<path d="M12 5.4v13.2M5.4 12h13.2" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round"/>',
    down:'<path d="M12 3.4v12.2M7.8 11.6 12 15.8l4.2-4.2M4.6 19.4h14.8" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/>',
    refresh:'<path d="M20 11.4A8 8 0 1 0 18.3 17M20 4.6v6.8h-6.8" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/>',
};

const svg = (p, c) => '<svg viewBox="0 0 24 24" fill="currentColor"' + (c ? ' class="' + c + '"' : '') + '>' + p + '</svg>';
const svgChev = c => '<svg viewBox="0 0 8 13" fill="none"' + (c ? ' class="' + c + '"' : '') + '>'
    + '<path d="M1 1l6 5.5L1 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const svgArrow = () => '<svg viewBox="0 0 18 18" fill="none">'
    + '<path d="M3 9h12M10.5 3.5 16 9l-5.5 5.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

const ART = {
    calendar: '<svg viewBox="0 0 96 96" fill="none"><rect x="12" y="20" width="72" height="64" rx="14" fill="var(--fill-2)"/><rect x="12" y="20" width="72" height="18" rx="9" fill="var(--accent-soft)"/><path d="M30 12v14M66 12v14" stroke="var(--tx-3)" stroke-width="5" stroke-linecap="round"/><circle cx="34" cy="54" r="4.5" fill="var(--tx-3)"/><circle cx="48" cy="54" r="4.5" fill="var(--tx-3)"/><circle cx="62" cy="54" r="4.5" fill="var(--tx-3)"/><circle cx="34" cy="68" r="4.5" fill="var(--tx-3)"/><circle cx="48" cy="68" r="4.5" fill="var(--accent)"/></svg>',
    spark: '<svg viewBox="0 0 96 96" fill="none"><path d="M48 16l7.5 19.5L75 43l-19.5 7.5L48 70l-7.5-19.5L21 43l19.5-7.5L48 16Z" fill="var(--accent-soft)" stroke="var(--tx-3)" stroke-width="3.5" stroke-linejoin="round"/><path d="M74 60l3.2 8.3 8.3 3.2-8.3 3.2L74 83l-3.2-8.3-8.3-3.2 8.3-3.2L74 60Z" fill="var(--accent)"/></svg>',
    lock: '<svg viewBox="0 0 96 96" fill="none"><rect x="22" y="42" width="52" height="40" rx="12" fill="var(--fill-2)"/><path d="M34 42V31a14 14 0 0 1 28 0v11" stroke="var(--tx-3)" stroke-width="6" stroke-linecap="round"/><circle cx="48" cy="60" r="6" fill="var(--tx-3)"/></svg>',
    clock: '<svg viewBox="0 0 96 96" fill="none"><circle cx="48" cy="50" r="30" fill="var(--fill-2)" stroke="var(--tx-3)" stroke-width="4"/><path d="M48 32v18l12 8" stroke="var(--accent)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    ghost: '<svg viewBox="0 0 96 96" fill="none"><circle cx="48" cy="48" r="30" fill="var(--fill-2)" stroke="var(--tx-3)" stroke-width="4"/><path d="M34 48h28" stroke="var(--tx-3)" stroke-width="5" stroke-linecap="round"/></svg>',
};

const S = {
    lang: 'uz', masterUser: null, master: null, tab: 'cabinet', coords: null,
    services: [], bookings: [], today: [], contacts: null,
    month: new Date().getMonth() + 1, year: new Date().getFullYear(),
};

const t = k => (T[S.lang] && T[S.lang][k]) || T.uz[k] || k;
const $  = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, m =>
    ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[m]));
const pad = n => String(n).padStart(2, '0');

const haptic = (type) => {
    try {
        if (!tg || !tg.HapticFeedback) return;
        if (['success','error','warning'].indexOf(type) >= 0) tg.HapticFeedback.notificationOccurred(type);
        else tg.HapticFeedback.impactOccurred(type || 'light');
    } catch (_) {}
};

/* ============================================================
   DEMO MA'LUMOTLAR — backend yo'q, hammasi shu yerda.
   Qo'shish/o'chirish ishlaydi, sahifa yangilansa boshlanadi.
   ============================================================ */

const DB = (() => {
    const t = new Date();
    const ymd = d => d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
    const shift = n => { const d = new Date(t); d.setDate(d.getDate() + n); return ymd(d); };

    return {
        master: {
            id: 1,
            master_user: 'demo',
            full_name: 'Aziz-Rahimov',
            phone: '+998901234567',
            image: '',
            qrcode: 'qrcode.jpg',
            latitude: 41.31108,
            longitude: 69.24056,
            like: 12,
            booking: 48,
            telegram: 'https://t.me/spotline',
            instagram: 'https://instagram.com/spotline',
            google_maps_location: 'https://www.google.com/maps?q=41.31108,69.24056',
            yandex_maps_location: 'https://yandex.uz/maps/?ll=69.24056,41.31108&z=16',
            open: '09:00',
            closed: '21:00',
            service_duration: '45',
            lunch_time: '13:00',
            working_days: 'Du-Пн, Se-Вт, Chr-Ср, Py-Чт, Ju-Пт, Shn-Сб',
            status_search: true,
            show_lunch_time: true,
            hide_phone: false,
            hide_telegram: false,
            hide_instagram: false,
            hide_google_maps: false,
            hide_yandex_maps: false,
            blocked_clients: [
                { id: 1, client_full_name: 'Baxtiyor Qodirov', client_phone: '+998901119922' }
            ],
            services: []
        },
        services: [
            { id: 1, master: 1, service_name_uz: 'Soch olish',      service_name_ru: 'Стрижка',        service_time: 45 },
            { id: 2, master: 1, service_name_uz: 'Soqol olish',     service_name_ru: 'Бритьё',         service_time: 30 },
            { id: 3, master: 1, service_name_uz: 'Soch + soqol',    service_name_ru: 'Стрижка + бритьё', service_time: 60 },
            { id: 4, master: 1, service_name_uz: 'Bolalar sochi',   service_name_ru: 'Детская стрижка', service_time: 30 }
        ],
        contacts: [
            { id: 1, master: 1, full_name: 'Jasurbek Alimov',   phone: '+998901112233' },
            { id: 2, master: 1, full_name: 'Sardor Mahmudov',   phone: '+998935554411' },
            { id: 3, master: 1, full_name: 'Azizbek Rustamov',  phone: '+998977778899' },
            { id: 4, master: 1, full_name: 'Mirzohid Tursunov', phone: '+998903334455' }
        ],
        bookings: [
            { id: 1, master_user: 1, client_full_name: 'Jasurbek Alimov',   client_phone: '+998901112233', service_duration: 45, date: shift(0),  time: '09:30' },
            { id: 2, master_user: 1, client_full_name: 'Sardor Mahmudov',   client_phone: '+998935554411', service_duration: 60, date: shift(0),  time: '11:00' },
            { id: 3, master_user: 1, client_full_name: 'Azizbek Rustamov',  client_phone: '+998977778899', service_duration: 30, date: shift(0),  time: '14:00' },
            { id: 4, master_user: 1, client_full_name: 'Mirzohid Tursunov', client_phone: '+998903334455', service_duration: 45, date: shift(0),  time: '16:30' },
            { id: 5, master_user: 1, client_full_name: 'Shohruh Yoqubov',   client_phone: '+998909998877', service_duration: 60, date: shift(0),  time: '18:30' },
            { id: 6, master_user: 1, client_full_name: 'Bekzod Karimov',    client_phone: '+998901234455', service_duration: 45, date: shift(1),  time: '10:00' },
            { id: 7, master_user: 1, client_full_name: 'Doniyor Salimov',   client_phone: '+998905556677', service_duration: 30, date: shift(1),  time: '12:30' },
            { id: 8, master_user: 1, client_full_name: '+',                 client_phone: '',              service_duration: 60, date: shift(1),  time: '15:00' },
            { id: 9, master_user: 1, client_full_name: 'Ulugʻbek Nazarov',  client_phone: '+998933332211', service_duration: 45, date: shift(2),  time: '09:00' },
            { id:10, master_user: 1, client_full_name: 'Sanjar Toshev',     client_phone: '+998971112200', service_duration: 60, date: shift(2),  time: '13:30' },
            { id:11, master_user: 1, client_full_name: 'Islom Yusupov',     client_phone: '+998944445566', service_duration: 30, date: shift(4),  time: '11:00' },
            { id:12, master_user: 1, client_full_name: 'Jahongir Aliyev',   client_phone: '+998998887766', service_duration: 45, date: shift(5),  time: '17:00' },
            { id:13, master_user: 1, client_full_name: 'Rustam Olimov',     client_phone: '+998912223344', service_duration: 60, date: shift(7),  time: '10:30' },
            { id:14, master_user: 1, client_full_name: 'Farrux Xolmatov',   client_phone: '+998906667788', service_duration: 45, date: shift(9),  time: '14:30' }
        ],
        stats: { 1: 31, 2: 28, 3: 35, 4: 30, 5: 38, 6: 42, 7: 45, 8: 51, 9: 47, 10: 48, 11: 0, 12: 0 },
        seq: 100
    };
})();

const wait = ms => new Promise(r => setTimeout(r, ms || 160));

const A = {
    async getMaster() {
        await wait();
        return Object.assign({}, DB.master, { services: DB.services });
    },
    async putMaster(u, d) {
        await wait();
        Object.keys(d).forEach(k => {
            const v = d[k];
            DB.master[k] = (v === 'True') ? true : (v === 'False') ? false : v;
        });
        return DB.master;
    },
    async delMaster() { await wait(); return null; },

    async services() { await wait(); return DB.services.slice(); },
    async addService(d) {
        await wait();
        const s = Object.assign({ id: ++DB.seq, master: 1 }, d);
        s.service_time = parseInt(d.service_time, 10) || 30;
        DB.services.push(s);
        return s;
    },
    async delService(id) {
        await wait();
        DB.services = DB.services.filter(x => x.id !== +id);
        return null;
    },

    async monthBookings(u, y, m) {
        await wait();
        const pre = y + '-' + pad(m);
        return DB.bookings.filter(b => b.date.indexOf(pre) === 0)
                          .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
    },
    async dayBookings(u, y, m, d) {
        await wait();
        const ds = y + '-' + pad(m) + '-' + pad(d);
        return DB.bookings.filter(b => b.date === ds)
                          .sort((a, b) => a.time.localeCompare(b.time));
    },
    async addBooking(d) {
        await wait();
        const b = {
            id: ++DB.seq,
            master_user: 1,
            client_full_name: d.client_full_name || '+',
            client_phone: d.client_phone || '',
            service_duration: +d.service_duration,
            date: d.date,
            time: d.time
        };
        DB.bookings.push(b);
        DB.master.booking++;
        return b;
    },
    async delBooking(id) {
        await wait();
        DB.bookings = DB.bookings.filter(x => x.id !== +id);
        if (DB.master.booking > 0) DB.master.booking--;
        return null;
    },

    async unblock(id) {
        await wait();
        DB.master.blocked_clients = DB.master.blocked_clients.filter(x => x.id !== +id);
        return null;
    },

    async stats(u, y) {
        await wait();
        return { master_user: 'demo', full_name: DB.master.full_name, year: y, months: DB.stats };
    },

    async contacts() { await wait(); return DB.contacts.slice(); },
    async addContact(d) {
        await wait();
        const c = { id: ++DB.seq, master: 1, full_name: d.full_name, phone: d.phone };
        DB.contacts.push(c);
        return c;
    },
    async delContact(id) {
        await wait();
        DB.contacts = DB.contacts.filter(x => x.id !== +id);
        return null;
    }
};

let toastTimer;
function toast(msg, isErr) {
    const el = $('#toast');
    el.className = 'toast' + (isErr ? ' toast--e' : '');
    el.innerHTML = '<i class="toast__dot"></i><span>' + esc(msg) + '</span>';
    requestAnimationFrame(() => el.classList.add('is-show'));
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('is-show'), 2500);
    haptic(isErr ? 'error' : 'success');
}

let sheetDone = null;

function openSheet(o) {
    $('#sh-t').textContent = o.title || '';
    $('#sh-b').innerHTML = o.body || '';
    const b = $('#sh-ok');
    b.textContent = o.done || t('done');
    b.hidden = !o.done && !o.onDone;
    sheetDone = o.onDone || null;
    $('#sh-host').classList.add('is-open');
    if (o.onOpen) o.onOpen();
    haptic('light');
}
function closeSheet() { $('#sh-host').classList.remove('is-open'); sheetDone = null; }

function confirmSheet(text, onYes) {
    openSheet({
        title: t('confirm'),
        body: '<div class="cfm">'
            + '<span class="cfm__ic">' + svg(I.warn) + '</span>'
            + '<p class="cfm__t">' + esc(text) + '</p>'
            + '<div class="pair">'
              + '<button class="btn btn--n" id="cf-n">' + esc(t('cancel')) + '</button>'
              + '<button class="btn btn--d" id="cf-y">' + esc(t('confirm')) + '</button>'
            + '</div></div>',
        onOpen() {
            $('#cf-y').onclick = async () => { closeSheet(); await onYes(); };
            $('#cf-n').onclick = closeSheet;
        }
    });
}

const dayIdx = d => (d.getDay() + 6) % 7;
const workDays = () => ((S.master && S.master.working_days) || '').split(',').map(x => x.trim()).filter(Boolean);
const placeCache = {};
const dayShort = c => { const i = WEEK.indexOf(c); return i < 0 ? c : c.split('-')[S.lang === 'ru' ? 1 : 0]; };
const hm2min = s => { if (!s) return null; const p = String(s).split(':'); return (+p[0]) * 60 + (+p[1] || 0); };
const min2hm = m => pad(Math.floor(m / 60)) + ':' + pad(m % 60);

function plural(n, forms) {
    if (S.lang !== 'ru') return forms[0];
    const a = Math.abs(n) % 100, b = a % 10;
    if (a > 10 && a < 20) return forms[2];
    if (b > 1 && b < 5) return forms[1];
    if (b === 1) return forms[0];
    return forms[2];
}

const minLabel  = n => n + ' ' + plural(n, S.lang === 'ru' ? ['минута','минуты','минут'] : ['daqiqa']);
const hourLabel = n => n + ' ' + plural(n, S.lang === 'ru' ? ['час','часа','часов']    : ['soat']);

function durLabel(mins) {
    const h = Math.floor(mins / 60), m = mins % 60;
    if (!h) return minLabel(m);
    if (!m) return hourLabel(h);
    return hourLabel(h) + ' ' + minLabel(m);
}

function initials(name) {
    return (name || '?').replace(/-/g, ' ').trim().split(/\s+/).slice(0, 2).map(w => w[0]).join('').toUpperCase();
}

function freeSlots(bookings, dateStr) {
    const m = S.master;
    const step = parseInt(m.service_duration || 60, 10) || 60;
    const start = hm2min(m.open), end = hm2min(m.closed);
    if (start == null || end == null) return [];
    const busy = [];
    if (m.lunch_time && !m.show_lunch_time) {
        const ls = hm2min(m.lunch_time);
        if (ls != null) busy.push([ls, ls + 60]);
    }
    for (const b of bookings) {
        const bs = hm2min(b.time);
        if (bs == null) continue;
        busy.push([bs, bs + (parseInt(b.service_duration, 10) || step)]);
    }
    busy.sort((a, b) => a[0] - b[0]);
    busy.push([end, end]);
    const now = new Date();
    const today = dateStr === now.getFullYear() + '-' + pad(now.getMonth() + 1) + '-' + pad(now.getDate());
    const nowMin = now.getHours() * 60 + now.getMinutes();
    const out = [];
    let cur = start;
    for (const pair of busy) {
        while (cur + step <= pair[0]) {
            if (!(today && cur <= nowMin)) out.push(min2hm(cur));
            cur += step;
        }
        if (pair[1] > cur) cur = pair[1];
    }
    return out;
}

function empty(art, title, text) {
    return '<div class="emp">' + (ART[art] || ART.ghost)
        + '<div class="emp__t">' + esc(title) + '</div>'
        + '<div class="emp__s">' + esc(text) + '</div></div>';
}
const skel = n => Array.from({ length: n || 3 }, () => '<div class="sk sk-r"></div>').join('');

function buildWheel(cols) {
    return '<div class="wh"><div class="wh__band"></div>' + cols.map((c, i) =>
        (i ? '<span class="wh__s">:</span>' : '')
        + '<div class="wh__c" data-col="' + i + '">'
        + c.items.map(v => '<div class="wh__i">' + esc(v) + '</div>').join('')
        + '</div>').join('') + '</div>';
}

function wireWheel(root, cols, onChange) {
    const els = Array.from(root.querySelectorAll('.wh__c'));
    const probe = root.querySelector('.wh__i');
    const H = Math.round((probe && probe.getBoundingClientRect().height) || 32) || 32;
    els.forEach((col, i) => {
        col.scrollTop = cols[i].index * H;
        mark(col, cols[i].index);
        let tmr;
        col.addEventListener('scroll', () => {
            const idx = Math.max(0, Math.min(cols[i].items.length - 1, Math.round(col.scrollTop / H)));
            if (idx !== cols[i].index) {
                cols[i].index = idx;
                mark(col, idx);
                haptic('light');
                if (onChange) onChange(cols.map(c => c.items[c.index]));
            }
            clearTimeout(tmr);
            tmr = setTimeout(() => { col.scrollTop = cols[i].index * H; }, 120);
        }, { passive: true });
    });
    function mark(col, idx) {
        col.querySelectorAll('.wh__i').forEach((el, j) => el.classList.toggle('is-on', j === idx));
    }
    return () => cols.map(c => c.items[c.index]);
}

const HOURS = Array.from({ length: 24 }, (_, i) => pad(i));
const MINS  = Array.from({ length: 60 }, (_, i) => pad(i));

function timeWheelSheet(o) {
    const parts = (o.value || '09:00').split(':');
    const h0 = +parts[0] || 0, m0 = +parts[1] || 0;
    const cols = [
        { items: HOURS, index: Math.max(0, HOURS.indexOf(pad(h0))) },
        { items: MINS,  index: Math.min(59, Math.max(0, m0)) },
    ];
    let read;
    openSheet({
        title: o.title, done: t('save'),
        body: buildWheel(cols),
        onOpen() { read = wireWheel($('#sh-b'), cols); },
        onDone() { return o.onSave(read().join(':')); }
    });
}

function setHeader(title, sub) {
    const a = $('#hdr-title'), b = $('#hdr-sub');
    if (a) a.textContent = title;
    if (b) b.textContent = sub || '';
}

function wireHeaderScroll(screen) {
    const hdr = $('#hdr');
    if (screen._hdrFn) screen.removeEventListener('scroll', screen._hdrFn);
    screen._hdrFn = () => hdr.classList.toggle('is-stuck', screen.scrollTop > 12);
    screen.addEventListener('scroll', screen._hdrFn, { passive: true });
    screen._hdrFn();
}

const WX = {
    0:['wxClear','sun'], 1:['wxClear','sun'], 2:['wxCloud','cloudsun'], 3:['wxCloud','cloud'],
    45:['wxFog','fog'], 48:['wxFog','fog'],
    51:['wxDrizzle','rain'], 53:['wxDrizzle','rain'], 55:['wxDrizzle','rain'],
    61:['wxRain','rain'], 63:['wxRain','rain'], 65:['wxRain','rain'],
    71:['wxSnow','snow'], 73:['wxSnow','snow'], 75:['wxSnow','snow'],
    80:['wxRain','rain'], 81:['wxRain','rain'], 82:['wxRain','rain'],
    95:['wxStorm','storm'], 96:['wxStorm','storm'], 99:['wxStorm','storm'],
};

const WXART = {
    sun:'<circle cx="17" cy="17" r="7.5" fill="#FFB340"/><g stroke="#FFB340" stroke-width="2.6" stroke-linecap="round"><path d="M17 2.5v4M17 27.5v4M31.5 17h-4M6.5 17h-4M27.3 6.7l-2.8 2.8M9.5 24.5l-2.8 2.8M27.3 27.3l-2.8-2.8M9.5 9.5 6.7 6.7"/></g>',
    cloudsun:'<circle cx="12" cy="12" r="5.5" fill="#FFB340"/><g stroke="#FFB340" stroke-width="2.2" stroke-linecap="round"><path d="M12 1.5v3M12 19.5v1M23 12h-3M4 12H1M19.8 4.2l-2 2M6.2 17.8l-2 2"/></g><path d="M11 29a5.5 5.5 0 0 1 .7-10.95 7.5 7.5 0 0 1 14.2 2.2A4.9 4.9 0 0 1 25 29H11Z" fill="#C7D3E0"/>',
    cloud:'<path d="M9 27a6.5 6.5 0 0 1 .9-12.95 8.6 8.6 0 0 1 16.3 2.5A5.6 5.6 0 0 1 25 27H9Z" fill="#B9C6D4"/>',
    fog:'<path d="M9 22a6 6 0 0 1 .8-11.95 8 8 0 0 1 15.2 2.3A5.2 5.2 0 0 1 24 22H9Z" fill="#C7D0D8"/><g stroke="#9AA6B2" stroke-width="2.4" stroke-linecap="round"><path d="M6 26.5h22M9 30.5h16"/></g>',
    rain:'<path d="M9 20a6 6 0 0 1 .8-11.95 8 8 0 0 1 15.2 2.3A5.2 5.2 0 0 1 24 20H9Z" fill="#B9C6D4"/><g stroke="#0A84FF" stroke-width="2.6" stroke-linecap="round"><path d="M11 24.5l-1.5 5M17 24.5l-1.5 5M23 24.5l-1.5 5"/></g>',
    snow:'<path d="M9 20a6 6 0 0 1 .8-11.95 8 8 0 0 1 15.2 2.3A5.2 5.2 0 0 1 24 20H9Z" fill="#C7D3E0"/><g fill="#7FD4FF"><circle cx="11" cy="26.5" r="2"/><circle cx="17" cy="29" r="2"/><circle cx="23" cy="26.5" r="2"/></g>',
    storm:'<path d="M9 19a6 6 0 0 1 .8-11.95 8 8 0 0 1 15.2 2.3A5.2 5.2 0 0 1 24 19H9Z" fill="#9AA6B2"/><path d="M18 21l-5.5 7.5h4L15 34l6.5-8.5h-4L18 21Z" fill="#FFCC00"/>',
};

const FLAG = {
    USD:'<svg viewBox="0 0 21 15"><rect width="21" height="15" fill="#fff"/><g fill="#B22234"><rect width="21" height="1.15" y="0"/><rect width="21" height="1.15" y="2.3"/><rect width="21" height="1.15" y="4.6"/><rect width="21" height="1.15" y="6.9"/><rect width="21" height="1.15" y="9.2"/><rect width="21" height="1.15" y="11.5"/><rect width="21" height="1.15" y="13.8"/></g><rect width="9" height="8.05" fill="#3C3B6E"/></svg>',
    EUR:'<svg viewBox="0 0 21 15"><rect width="21" height="15" fill="#003399"/><g fill="#FFCC00"><circle cx="10.5" cy="4.2" r="1"/><circle cx="10.5" cy="10.8" r="1"/><circle cx="7.2" cy="5.1" r="1"/><circle cx="13.8" cy="5.1" r="1"/><circle cx="6.3" cy="7.5" r="1"/><circle cx="14.7" cy="7.5" r="1"/><circle cx="7.2" cy="9.9" r="1"/><circle cx="13.8" cy="9.9" r="1"/></g></svg>',
    RUB:'<svg viewBox="0 0 21 15"><rect width="21" height="5" fill="#fff"/><rect width="21" height="5" y="5" fill="#0039A6"/><rect width="21" height="5" y="10" fill="#D52B1E"/></svg>',
};

async function loadWeather(lat, lon) {
    const u = 'https://api.open-meteo.com/v1/forecast?latitude=' + lat + '&longitude=' + lon
        + '&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min'
        + '&timezone=auto&forecast_days=1';
    const r = await fetch(u);
    if (!r.ok) throw new Error('wx');
    return r.json();
}

async function loadRates() {
    const r = await fetch('https://cbu.uz/uz/arkhiv-kursov-valyut/json/');
    if (!r.ok) throw new Error('cbu');
    const all = await r.json();
    const want = ['USD', 'EUR', 'RUB'];
    return want.map(c => all.filter(x => x.Ccy === c)[0]).filter(Boolean);
}

function fmtSum(v) {
    const n = Math.round(parseFloat(v));
    return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '\u202F');
}

function iRow(color, icon, label, value) {
    return '<div class="row"><span class="ico" style="background:' + color + '">' + svg(icon) + '</span>'
        + '<span class="row__b"><span class="row__t">' + esc(label) + '</span></span>'
        + '<span class="row__v">' + value + '</span></div>';
}

function mapSrc(lat, lon, w, h, z) {
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const W = Math.min(650, Math.round(w * dpr)), H = Math.min(450, Math.round(h * dpr));
    return 'https://static-maps.yandex.ru/1.x/?l=map&z=' + (z || 16)
        + '&ll=' + lon + ',' + lat + '&size=' + W + ',' + H
        + '&pt=' + lon + ',' + lat + ',pm2rdm';
}

function mapCard(m) {
    return '<div class="mp2">'
      + '<div class="mp2__v">'
        + '<img class="mp2__img" id="mp-img" alt="" loading="lazy">'
        + '<div class="mp2__chip">'
          + '<span class="mp2__pin">' + svg(I.pin) + '</span>'
          + '<span class="mp2__tx"><b>' + esc(t('workplace')) + '</b>'
          + '<span>' + (+m.latitude).toFixed(5) + ', ' + (+m.longitude).toFixed(5) + '</span></span>'
        + '</div>'
        + '<div class="mp2__ctl">'
          + '<button class="mp2__b" id="mp-nav" aria-label="nav">' + svg(I.navto) + '</button>'
          + '<div class="mp2__z">'
            + '<button id="mp-in" aria-label="+">' + svg(I.plus) + '</button>'
            + '<button id="mp-out" aria-label="-">' + svg(I.minus) + '</button>'
          + '</div>'
          + '<span class="mp2__sp"></span>'
          + '<button class="mp2__b" id="mp-fit" aria-label="fit">' + svg(I.locate) + '</button>'
        + '</div>'
      + '</div></div>';
}

const MP = { z: 16, m: null };

function drawMap() {
    const img = $('#mp-img'), m = MP.m;
    if (!img || !m) return;
    const r = img.getBoundingClientRect();
    img.classList.add('is-load');
    img.onload = img.onerror = () => img.classList.remove('is-load');
    img.src = mapSrc(+m.latitude, +m.longitude, r.width || 340, r.height || 206, MP.z);
    const zi = $('#mp-in'), zo = $('#mp-out');
    if (zi) zi.disabled = MP.z >= 18;
    if (zo) zo.disabled = MP.z <= 10;
}

function openMapLink() {
    const m = MP.m;
    const url = m.yandex_maps_location || m.google_maps_location
        || ('https://yandex.uz/maps/?ll=' + m.longitude + ',' + m.latitude + '&z=16');
    if (tg && tg.openLink) tg.openLink(url); else window.open(url, '_blank');
    haptic('light');
}

function wireMap(m) {
    MP.m = m; MP.z = 16;
    drawMap();
    const zoom = d => { MP.z = Math.max(10, Math.min(18, MP.z + d)); drawMap(); haptic('light'); };
    const on = (id, fn) => { const e = $(id); if (e) e.onclick = fn; };
    on('#mp-in',  () => zoom(1));
    on('#mp-out', () => zoom(-1));
    on('#mp-fit', () => { MP.z = 16; drawMap(); haptic('light'); });
    on('#mp-nav', openMapLink);
}

let clockTimer = null;

function renderCabinet() {
    const m = S.master;
    const geo = m.latitude != null && m.longitude != null;
    setHeader(t('cabinet'), t('welcome'));

    const today = new Date();
    const ds = today.getFullYear() + '-' + pad(today.getMonth() + 1) + '-' + pad(today.getDate());

    $('#screen-cabinet').innerHTML =
      '<div class="wgrid">'
        + '<div class="wcol w-now">'
          + '<span class="w-now__dow" id="w-dow"></span>'
          + '<span class="w-now__t" id="w-time">--:<i>--</i></span>'
          + '<span class="w-now__date" id="w-date"></span>'
        + '</div>'
        + '<div class="wcol w-wx" id="w-wx">'
          + '<div class="w-wx__h"><span class="w-wx__ico"></span>'
            + '<b class="w-wx__pl">—</b></div>'
          + '<span class="w-wx__t">--°</span>'
          + '<span class="w-wx__mm"></span>'
        + '</div>'
        + '<div class="wcol w-cur" id="w-cur">' + curHead()
          + '<div class="sk" style="height:58px;border-radius:9px;margin-top:6px"></div></div>'
      + '</div>'

      + (geo ? mapCard(m) : '')

      + '<div class="tiles">'
        + tile('var(--accent)', m.like == null ? 0 : m.like, t('likes'), 'report')
        + tile('var(--amber)',  0, t('tToday'), 'bookings')
        + tile('var(--green)',  S.contacts ? S.contacts.length : 0, t('contactsTab'), 'contacts')
        + tile('var(--indigo)', (m.services || []).length, t('services_'), 'services')
      + '</div>'

      + '<div class="list" style="margin-bottom:16px">'
        + '<div class="chead"><span class="chead__gl">' + svg(I.cal) + '</span>'
        + '<b>' + esc(t('today')) + '</b>'
        + '<button id="go-bk">' + esc(t('all')) + svgArrow() + '</button></div>'
        + '<div class="tl2" id="sched">' + skel(2) + '</div></div>'

      + '<div class="pair">'
        + (m.qrcode ? '<button class="btn btn--2" id="qr-dl">' + svg(I.down) + esc(t('qr')) + '</button>' : '')
        + '<button class="btn btn--2" id="open-bot">' + svg(I.send) + esc(t('openBot')) + '</button>'
      + '</div>';

    startClock();
    if (geo) { requestAnimationFrame(() => wireMap(m)); fillWeather(+m.latitude, +m.longitude); }
    else fillWeather(41.311081, 69.240562);
    fillRates();
    fillToday(ds);

    $('#go-bk').onclick = () => switchTab('bookings');
    $$('#screen-cabinet [data-go]').forEach(b2 => b2.onclick = () => switchTab(b2.dataset.go));

    const q = $('#qr-dl');
    if (q) q.onclick = () => {
        if (tg && tg.openLink) tg.openLink(m.qrcode); else window.open(m.qrcode, '_blank');
        haptic('success');
    };
    $('#open-bot').onclick = () => {
        const url = 'https://t.me/' + BOT;
        if (tg && tg.openTelegramLink) tg.openTelegramLink(url); else window.open(url, '_blank');
    };
    wireHeaderScroll($('#screen-cabinet'));
}

function tile(color, value, label, go) {
    return '<button class="tile" data-go="' + go + '" style="--tc:' + color + '">'
        + '<b>' + esc(value) + '</b>'
        + '<span class="tile__f"><span>' + esc(label) + '</span></span></button>';
}

function startClock() {
    if (clockTimer) clearInterval(clockTimer);
    const tick = () => {
        const el = $('#w-time');
        if (!el) { clearInterval(clockTimer); clockTimer = null; return; }
        const d = new Date();
        el.innerHTML = pad(d.getHours()) + ':<i>' + pad(d.getMinutes()) + '</i>';
        const dow = $('#w-dow'), dt = $('#w-date');
        if (dow) dow.textContent = DAYS[S.lang][dayIdx(d)];
        if (dt) dt.textContent = d.getDate() + ' ' + MONTHS[S.lang][d.getMonth()] + ', ' + d.getFullYear();
    };
    tick();
    clockTimer = setInterval(tick, 1000);
}

function wxCard(icon, place, temp, hi, lo) {
    return '<div class="w-wx__h">'
         + '<span class="w-wx__ico">' + (icon ? '<svg viewBox="0 0 34 34">' + icon + '</svg>' : '') + '</span>'
         + '<b class="w-wx__pl">' + esc(place) + '</b></div>'
         + '<span class="w-wx__t">' + esc(temp) + '</span>'
         + '<span class="w-wx__mm">' + (hi == null ? '' :
             '<i>' + svg(I.up) + esc(hi) + '°</i><i>' + svg(I.down2) + esc(lo) + '°</i>') + '</span>';
}

async function loadPlace(lat, lon) {
    const key = lat.toFixed(3) + ',' + lon.toFixed(3) + ',' + S.lang;
    if (placeCache[key]) return placeCache[key];
    const r = await fetch('https://api.bigdatacloud.net/data/reverse-geocode-client'
        + '?latitude=' + lat + '&longitude=' + lon + '&localityLanguage=' + S.lang);
    if (!r.ok) throw new Error('geo');
    const d = await r.json();
    const name = d.city || d.locality || d.principalSubdivision || '';
    placeCache[key] = name;
    return name;
}

async function fillWeather(lat, lon) {
    const box = $('#w-wx');
    if (!box) return;
    let place = '';
    try { place = await loadPlace(lat, lon); } catch (_) {}
    try {
        const d = await loadWeather(lat, lon);
        const info = WX[d.current.weather_code] || ['wxCloud', 'cloud'];
        const c = Math.round(d.current.temperature_2m);
        box.innerHTML = wxCard(WXART[info[1]], place,
            (c > 0 ? '+' : '') + c + '°C',
            Math.round(d.daily.temperature_2m_max[0]),
            Math.round(d.daily.temperature_2m_min[0]));
        box.title = t(info[0]);
    } catch (_) {
        box.innerHTML = wxCard(null, place, '—°', null, null);
    }
}

function curHead() {
    return '<div class="w-cur__h"><span class="w-cur__k">' + esc(t('rate')) + '</span></div>';
}

async function fillRates() {
    const box = $('#w-cur');
    if (!box) return;
    try {
        const list = await loadRates();
        box.innerHTML = curHead() + '<div class="w-cur__list">'
            + list.map(c => {
                const diff = parseFloat(c.Diff || 0), rate = parseFloat(c.Rate) || 0;
                const pct = rate ? (diff / rate) * 100 : 0;
                const cls = diff > 0 ? 'up' : (diff < 0 ? 'down' : 'mut');
                return '<div class="w-cur__row">'
                    + '<span class="w-cur__f">' + (FLAG[c.Ccy] || '') + '</span>'
                    + '<span class="w-cur__c">' + esc(c.Ccy) + '</span>'
                    + '<span class="w-cur__v">' + fmtSum(c.Rate) + '</span>'
                    + '<span class="w-cur__d ' + cls + '">' + (diff > 0 ? '+' : '')
                      + pct.toFixed(1) + '%</span></div>';
            }).join('') + '</div>';
    } catch (_) {
        box.innerHTML = curHead() + '<div class="cn mut" style="padding:24px 0;font-size:12px">—</div>';
    }
}

function todayRows(list) {
    const now = new Date(), nowMin = now.getHours() * 60 + now.getMinutes();
    const rows = list.slice().sort((x, y) => x.time.localeCompare(y.time)).map(v => {
        const st = hm2min(v.time), dur = +v.service_duration || 0;
        let k = 'done';
        if (nowMin < st) k = 'wait';
        else if (nowMin < st + Math.max(dur, 1)) k = 'live';
        const fn = (v.client_full_name || '').trim();
        return { v, k, st, dur, name: (!fn || fn === '+') ? t('selfBlock') : fn };
    });
    const first = rows.findIndex(r => r.k === 'wait');
    if (first >= 0) rows[first].k = 'next';
    return rows;
}

const ST_LBL = { done:'stDone', live:'stLive', next:'stNext', wait:'stWait' };

async function fillToday(ds) {
    const box = $('#sched');
    if (!box) return;
    const d = new Date(ds + 'T00:00:00');
    let list = [];
    try { list = (await A.dayBookings(S.masterUser, d.getFullYear(), d.getMonth() + 1, d.getDate())) || []; }
    catch (_) {}
    S.today = list;

    const tl = $$('#screen-cabinet .tile')[1];
    if (tl) tl.querySelector('b').textContent = list.length;
    updateBell();

    if (!list.length) {
        box.innerHTML = '<div class="cn mut" style="padding:14px 14px 22px;font-size:13.5px">'
            + esc(t('noTodayText')) + '</div>';
        return;
    }

    box.innerHTML = todayRows(list).map(r => {
        const ph = (r.v.client_phone || '').trim();
        return '<button class="tl2__r tl2__r--' + r.k + '" data-bk="' + r.v.id + '">'
            + '<i class="tl2__dot"></i>'
            + '<span class="tl2__t">' + esc(r.v.time) + '</span>'
            + '<span class="tl2__b2"><span class="tl2__n">' + esc(r.name) + '</span>'
              + '<span class="tl2__sv">' + svg(I.clock) + '<span>' + esc(durLabel(r.dur))
              + (ph ? ' \u00B7 ' + esc(ph) : '') + '</span></span>'
            + '</span>'
            + '<span class="tl2__p tl2__p--' + r.k + '">' + esc(t(ST_LBL[r.k])) + '</span>'
            + svgChev('tl2__c') + '</button>';
    }).join('');

    box.querySelectorAll('[data-bk]').forEach(b2 => b2.onclick = () => switchTab('bookings'));
}

function updateBell() {
    const dot = $('#hdr-dot');
    if (!dot) return;
    dot.hidden = !(S.today || []).some(v => {
        const now = new Date(), nm = now.getHours() * 60 + now.getMinutes();
        return hm2min(v.time) + (+v.service_duration || 0) > nm;
    });
}

function notesSheet() {
    const rows = todayRows(S.today || []).filter(r => r.k !== 'done');
    openSheet({
        title: t('noteT'),
        body: rows.length
            ? '<div class="list">' + rows.map(r =>
                '<div class="row">'
                  + '<span class="ico" style="background:' + (r.k === 'next' ? 'var(--accent)'
                      : r.k === 'live' ? 'var(--amber)' : 'var(--gray)') + '">' + svg(I.clock) + '</span>'
                  + '<span class="row__b"><span class="row__t">' + esc(r.name) + '</span>'
                  + '<span class="row__s">' + esc(r.v.time) + ' · ' + esc(durLabel(r.dur))
                    + (r.v.client_phone ? ' · ' + esc(r.v.client_phone) : '') + '</span></span>'
                  + '<span class="row__v">' + esc(t(ST_LBL[r.k])) + '</span></div>').join('')
              + '</div>'
            : empty('ghost', t('noteEmpty'), t('noteEmptyText'))
    });
}

async function renderBookings() {
    const now = new Date();
    S.year = now.getFullYear();
    S.month = now.getMonth() + 1;
    setHeader(t('bookings'), MONTHS[S.lang][S.month - 1] + ' ' + S.year);
    const el = $('#screen-bookings');
    el.innerHTML = '<div id="bk">' + skel(3) + '</div>'
        + '<div class="group mt"><button class="btn" id="bk-add">' + svg(I.plus) + esc(t('newBooking')) + '</button></div>';
    $('#bk-add').onclick = flowBooking;
    wireHeaderScroll(el);
    await loadBookings();
}

async function loadBookings() {
    const box = $('#bk');
    if (!box) return;
    box.innerHTML = skel(3);
    try { S.bookings = (await A.monthBookings(S.masterUser, S.year, S.month)) || []; }
    catch (_) { S.bookings = []; }

    if (!S.bookings.length) { box.innerHTML = empty('calendar', t('noBookings'), t('noBookingsText')); return; }

    const byDate = {};
    for (const b of S.bookings) (byDate[b.date] = byDate[b.date] || []).push(b);

    box.innerHTML = Object.keys(byDate).sort().map(date => {
        const d = new Date(date + 'T00:00:00');
        const rows = byDate[date].sort((x, y) => x.time.localeCompare(y.time)).map(v => {
            const fn = (v.client_full_name || '').trim();
            const self = !fn || fn === '+';
            const nm = self ? t('selfBlock') : fn;
            return '<div class="bk' + (self ? ' bk--self' : '') + '">'
              + '<span class="bk__t"><b>' + esc(v.time) + '</b><span>'
              + esc(durLabel(+v.service_duration || 0)) + '</span></span>'
              + '<i class="bk__l"></i>'
              + '<span class="bk__b"><span class="bk__n">' + esc(nm) + '</span>'
              + (v.client_phone ? '<span class="bk__m">' + esc(v.client_phone) + '</span>' : '')
              + '</span>'
              + '<button class="xbtn xbtn--d" data-del="' + v.id + '">' + svg(I.trash) + '</button></div>';
        }).join('');
        return '<div class="group"><div class="dh"><b>' + d.getDate() + ' '
            + esc(MONTHS[S.lang][d.getMonth()].toLowerCase()) + '</b><span>'
            + esc(DAYS[S.lang][dayIdx(d)]) + '</span><i>' + byDate[date].length + '</i></div>'
            + '<div class="list">' + rows + '</div></div>';
    }).join('');

    box.querySelectorAll('[data-del]').forEach(b => b.onclick = () =>
        confirmSheet(t('confirmDelBooking'), async () => {
            try { await A.delBooking(b.dataset.del); toast(t('deleted')); await loadBookings(); await refreshMaster(); }
            catch (_) { toast(t('error'), true); }
        }));
}

function flowBooking() {
    const m = S.master;
    if (!m.open || !m.closed) { toast(t('error'), true); return; }
    openSheet({ title: t('chooseDay'), body: '<div id="cal"></div>',
        onOpen() { renderCal(0); } });
}

function monthAvail(offset) {
    const m = S.master;
    const days = workDays();
    const step = parseInt(m.service_duration || 60, 10) || 60;
    const closeMin = hm2min(m.closed);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const first = new Date(now.getFullYear(), now.getMonth() + offset, 1);
    const total = new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate();
    const cells = [];
    for (let n = 1; n <= total; n++) {
        const d = new Date(first.getFullYear(), first.getMonth(), n);
        let ok = days.indexOf(WEEK[dayIdx(d)]) >= 0 && d >= today;
        if (ok && d.getTime() === today.getTime()
            && now.getHours() * 60 + now.getMinutes() + step > closeMin) ok = false;
        cells.push({ d: d, n: n, ok: ok });
    }
    return { first: first, cells: cells, lead: dayIdx(first) };
}

function renderCal(offset) {
    const box = $('#cal');
    if (!box) return;
    const a = monthAvail(offset);
    const canPrev = offset > 0, canNext = offset < 2;

    box.innerHTML = '<div class="cal__h">'
        + '<button class="cal__nav" id="cal-p"' + (canPrev ? '' : ' disabled') + '>'
          + svgChev('cal__c cal__c--l') + '</button>'
        + '<b>' + esc(MONTHS[S.lang][a.first.getMonth()]) + ' ' + a.first.getFullYear() + '</b>'
        + '<button class="cal__nav" id="cal-n"' + (canNext ? '' : ' disabled') + '>'
          + svgChev('cal__c') + '</button></div>'
        + '<div class="cal__w">' + WEEK.map(c =>
            '<span>' + esc(dayShort(c)) + '</span>').join('') + '</div>'
        + '<div class="cal__g">'
        + Array.from({ length: a.lead }, () => '<span></span>').join('')
        + a.cells.map(c => '<button class="cal__d' + (c.ok ? '' : ' is-off') + '"'
            + (c.ok ? ' data-n="' + c.n + '"' : ' disabled') + '>' + c.n + '</button>').join('')
        + '</div>';

    const p = $('#cal-p'), n = $('#cal-n');
    if (p && canPrev) p.onclick = () => { renderCal(offset - 1); haptic('light'); };
    if (n && canNext) n.onclick = () => { renderCal(offset + 1); haptic('light'); };
    box.querySelectorAll('[data-n]').forEach(b => b.onclick = () =>
        stepTime(new Date(a.first.getFullYear(), a.first.getMonth(), +b.dataset.n)));
}

async function stepTime(date) {
    const y = date.getFullYear(), mo = date.getMonth() + 1, d = date.getDate();
    const ds = y + '-' + pad(mo) + '-' + pad(d);
    $('#sh-b').innerHTML = skel(2);
    let dayB = [];
    try { dayB = (await A.dayBookings(S.masterUser, y, mo, d)) || []; } catch (_) {}
    const times = freeSlots(dayB, ds);
    $('#sh-t').textContent = t('chooseTime') + ' · ' + d + ' ' + MONTHS[S.lang][mo - 1].slice(0,3);
    if (!times.length) { $('#sh-b').innerHTML = empty('clock', t('noFree'), t('noFreeText')); return; }

    const cols = [{ items: times, index: 0 }];
    $('#sh-b').innerHTML = buildWheel(cols) + '<button class="btn mt" id="tw-next">' + esc(t('done')) + '</button>';
    const read = wireWheel($('#sh-b'), cols);
    $('#tw-next').onclick = () => stepDuration(ds, read()[0]);
}

function stepDuration(ds, time) {
    const diff = hm2min(S.master.closed) - hm2min(time);
    const durs = [];
    for (let x = 15; x <= diff; x += 5) durs.push(x);
    if (!durs.length) { $('#sh-b').innerHTML = empty('clock', t('noFree'), t('noFreeText')); return; }

    const cols = [{ items: durs.map(durLabel), index: 0 }];
    $('#sh-t').textContent = t('chooseDuration') + ' · ' + time;
    $('#sh-b').innerHTML = buildWheel(cols) + '<button class="btn mt" id="dw-ok">' + esc(t('save')) + '</button>';
    wireWheel($('#sh-b'), cols);

    $('#dw-ok').onclick = async (e) => {
        const btn = e.currentTarget;
        btn.disabled = true; btn.innerHTML = '<i class="spin"></i>';
        try {
            await A.addBooking({ master_user: S.master.id, service_duration: durs[cols[0].index],
                                 date: ds, time: time, client_full_name: '+' });
            closeSheet(); toast(t('added'));
            await loadBookings(); await refreshMaster();
        } catch (_) {
            toast(t('error'), true);
            btn.disabled = false; btn.textContent = t('save');
        }
    };
}

async function renderServices() {
    setHeader(t('services'), t('subSvc'));
    const el = $('#screen-services');
    el.innerHTML = '<div id="sv">' + skel(3) + '</div>'
        + '<div class="group mt"><button class="btn" id="sv-add">' + svg(I.plus) + esc(t('addService')) + '</button></div>';
    $('#sv-add').onclick = flowService;
    wireHeaderScroll(el);
    await loadServices();
}

async function loadServices() {
    const box = $('#sv');
    if (!box) return;
    try { S.services = (await A.services(S.masterUser)) || []; } catch (_) { S.services = []; }
    if (!S.services.length) { box.innerHTML = empty('spark', t('noServices'), t('noServicesText')); return; }

    box.innerHTML = '<div class="group"><div class="list">' + S.services.map(s => {
        const nm = S.lang === 'ru' ? (s.service_name_ru || s.service_name_uz || '—')
                                   : (s.service_name_uz || s.service_name_ru || '—');
        return '<div class="row"><span class="ico" style="background:var(--violet)">' + svg(I.star) + '</span>'
            + '<span class="row__b"><span class="row__t">' + esc(nm) + '</span>'
            + '<span class="row__s">' + esc(durLabel(+s.service_time || 0)) + '</span></span>'
            + '<button class="xbtn xbtn--d" data-sv="' + s.id + '">' + svg(I.trash) + '</button></div>';
    }).join('') + '</div></div>';

    box.querySelectorAll('[data-sv]').forEach(b => b.onclick = () =>
        confirmSheet(t('confirmDelService'), async () => {
            try { await A.delService(b.dataset.sv); toast(t('deleted')); await loadServices(); await refreshMaster(); }
            catch (_) { toast(t('error'), true); }
        }));
}

function flowService() {
    openSheet({
        title: t('addService'), done: t('save'),
        body: '<div class="fld"><label class="fld__l">' + esc(t('svcNameUz')) + '</label>'
            + '<input class="inp" id="s-uz" placeholder="Soch olish" autocomplete="off"></div>'
            + '<div class="fld"><label class="fld__l">' + esc(t('svcNameRu')) + '</label>'
            + '<input class="inp" id="s-ru" placeholder="Стрижка волос" autocomplete="off"></div>'
            + '<div class="fld"><label class="fld__l">' + esc(t('svcTime')) + '</label>'
            + '<input class="inp" id="s-tm" inputmode="numeric" placeholder="45">'
            + '<div class="fld__h" id="s-err"></div></div>',
        async onDone() {
            const uz = $('#s-uz').value.trim(), ru = $('#s-ru').value.trim();
            const tm = parseInt($('#s-tm').value, 10);
            const err = $('#s-err');
            const fail = msg => { err.textContent = msg; err.className = 'fld__h fld__h--e'; haptic('error'); return false; };
            if (!uz || !ru) return fail(t('errEmpty'));
            if (!tm || tm < 1 || tm > 60) return fail(t('errSvcTime'));
            try {
                await A.addService({ master: S.master.id, service_name_uz: uz, service_name_ru: ru, service_time: tm });
                toast(t('added')); await loadServices(); await refreshMaster(); return true;
            } catch (_) { toast(t('error'), true); return false; }
        }
    });
}

async function renderReport() {
    setHeader(t('report'), t('subRep'));
    const el = $('#screen-report');
    el.innerHTML = '<div class="group"><div class="chart-card"><div class="sk" style="height:150px"></div></div></div>';
    wireHeaderScroll(el);

    let data = null;
    try { data = await A.stats(S.masterUser, S.year); } catch (_) {}
    const mm = (data && data.months) || {};
    const v = Array.from({ length: 12 }, (_, i) => +(mm[String(i + 1)] || 0));
    const max = Math.max(1, Math.max.apply(null, v));
    const total = v.reduce((a, b) => a + b, 0);
    const cur = new Date().getMonth();

    const W = 360, H = 150, PB = 26, PT = 18;
    const bw = (W - 12) / 12;
    const bars = v.map((n, i) => {
        const h = n ? Math.max(5, (n / max) * (H - PT - PB)) : 3;
        const x = 6 + i * bw, y = H - PB - h;
        const fill = i === cur ? 'var(--chart)' : (n ? 'var(--chart-soft)' : 'var(--fill-2)');
        return '<rect x="' + (x + bw * 0.18) + '" y="' + y + '" width="' + (bw * 0.64) + '" height="' + h
             + '" rx="' + Math.min(4, bw * 0.3) + '" fill="' + fill + '"/>'
             + (n ? '<text x="' + (x + bw / 2) + '" y="' + (y - 5) + '" text-anchor="middle" font-size="10"'
                  + ' font-weight="700" fill="var(--tx)">' + n + '</text>' : '')
             + '<text x="' + (x + bw / 2) + '" y="' + (H - 8) + '" text-anchor="middle" font-size="9.5"'
             + ' letter-spacing="-.1" fill="' + (i === cur ? 'var(--chart)' : 'var(--tx)') + '"'
             + ' font-weight="' + (i === cur ? 700 : 600) + '">'
             + esc(MONTHS[S.lang][i].slice(0, 3)) + '</text>';
    }).join('');

    el.innerHTML = '<div class="group"><div class="chart-card">'
        + '<svg class="chart" viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="xMidYMid meet">' + bars + '</svg>'
        + '</div></div><div class="group"><div class="list">'
        + iRow('var(--chart)',  I.report, t('totalBookings'), total)
        + iRow('var(--green)', I.cal,    t('thisMonth'),     v[cur])
        + '</div></div>';
    wireHeaderScroll(el);
}

function renderSettings() {
    const m = S.master;
    const days = workDays();
    setHeader(t('settings'), (S.master.full_name || '').replace(/-/g, ' '));

    const eRow = (id, color, icon, label, value) =>
        '<button class="row row--tap" data-edit="' + id + '">'
        + '<span class="ico" style="background:' + color + '">' + svg(icon) + '</span>'
        + '<span class="row__b"><span class="row__t">' + esc(label) + '</span></span>'
        + '<span class="row__v">' + esc(value || '—') + '</span>' + svgChev('chev') + '</button>';

    const PI = {
        status_search:    ['var(--accent)',   I.eye],
        show_lunch_time:  ['var(--amber)',  I.timer],
        hide_phone:       ['var(--green)',  I.phone],
        hide_telegram:    ['var(--teal)',    I.send],
        hide_instagram:   ['var(--pink)',   I.globe],
        hide_google_maps: ['var(--red)',    I.pin],
        hide_yandex_maps: ['var(--violet)', I.pin],
    };
    const tRow = (f, label) => '<div class="row">'
        + '<span class="ico" style="background:' + PI[f][0] + '">' + svg(PI[f][1]) + '</span>'
        + '<span class="row__b"><span class="row__t">' + esc(label) + '</span></span>'
        + '<button class="sw' + (m[f] ? ' is-on' : '') + '" data-tg="' + f + '"></button></div>';

    $('#screen-settings').innerHTML =
      '<div class="group"><div class="list">'
      + eRow('name', 'var(--accent)', I.person, t('name'), (m.full_name || '').replace(/-/g, ' '))
      + eRow('phone', 'var(--green)', I.phone, t('phone'), m.phone)
      + eRow('location', 'var(--red)', I.pin, t('location'), m.latitude ? (+m.latitude).toFixed(3) + ', ' + (+m.longitude).toFixed(3) : '')
      + eRow('telegram', 'var(--teal)', I.send, t('telegram'), m.telegram)
      + eRow('instagram', 'var(--pink)', I.globe, t('instagram'), m.instagram)
      + '</div></div>'

      + '<div class="group"><div class="list">'
      + eRow('open', 'var(--green)', I.clock, t('opens'), m.open)
      + eRow('closed', 'var(--red)', I.clock, t('closes'), m.closed)
      + eRow('days', 'var(--accent)', I.cal, t('workdays'), days.map(dayShort).join(', '))
      + eRow('lunch', 'var(--amber)', I.timer, t('lunch'), m.lunch_time)
      + eRow('interval', 'var(--violet)', I.timer, t('interval'), m.service_duration ? durLabel(parseInt(m.service_duration, 10) || 0) : '')
      + '</div></div>'

      + '<div class="group"><div class="list">'
      + tRow('status_search', t('searchOn'))
      + tRow('show_lunch_time', t('lunchAccept'))
      + tRow('hide_phone', t('hidePhone'))
      + tRow('hide_telegram', t('hideTelegram'))
      + tRow('hide_instagram', t('hideInstagram'))
      + tRow('hide_google_maps', t('hideGoogle'))
      + tRow('hide_yandex_maps', t('hideYandex'))
      + '</div></div>'

      + '<div class="group"><div class="list">'
      + '<button class="row row--tap" data-edit="services">'
      + '<span class="ico" style="background:var(--indigo)">' + svg(I.services) + '</span>'
      + '<span class="row__b"><span class="row__t">' + esc(t('services')) + '</span>'
      + '<span class="row__s">' + esc(t('subSvc')) + '</span></span>'
      + '<span class="row__v">' + (m.services || []).length + '</span>'
      + svgChev('chev') + '</button>'
      + '<button class="row row--tap" data-edit="contacts">'
      + '<span class="ico" style="background:var(--teal)">' + svg(I.phone) + '</span>'
      + '<span class="row__b"><span class="row__t">' + esc(t('contacts')) + '</span>'
      + '<span class="row__s">' + esc(t('contactsSub')) + '</span></span>'
      + '<span class="row__v" id="ct-n">' + (S.contacts ? S.contacts.length : '') + '</span>'
      + svgChev('chev') + '</button>'
      + '<button class="row row--tap" data-edit="blocked">'
      + '<span class="ico" style="background:var(--red)">' + svg(I.lock) + '</span>'
      + '<span class="row__b"><span class="row__t">' + esc(t('blocked')) + '</span></span>'
      + '<span class="row__v">' + (m.blocked_clients || []).length + '</span>' + svgChev('chev') + '</button>'
      + '<button class="row row--tap" data-edit="lang">'
      + '<span class="ico" style="background:#5856D6">' + svg(I.globe) + '</span>'
      + '<span class="row__b"><span class="row__t">' + esc(t('language')) + '</span></span>'
      + '<span class="row__v">' + (S.lang === 'ru' ? 'Русский' : 'O’zbekcha') + '</span>' + svgChev('chev') + '</button>'
      + '<button class="row row--tap" data-edit="rules">'
      + '<span class="ico" style="background:var(--amber)">' + svg(I.doc) + '</span>'
      + '<span class="row__b"><span class="row__t">' + esc(t('rules')) + '</span></span>'
      + svgChev('chev') + '</button></div></div>'

      + '<div class="group"><div class="list">'
      + '<button class="row row--tap row--mid row--dang" data-edit="delete">'
      + '<span class="row__t">' + esc(t('deleteAcc')) + '</span></button></div></div>';

    $$('#screen-settings [data-edit]').forEach(b => b.onclick = () => openEdit(b.dataset.edit));
    $$('#screen-settings [data-tg]').forEach(b => b.onclick = () => toggle(b));
    wireHeaderScroll($('#screen-settings'));
}

async function toggle(btn) {
    const f = btn.dataset.tg;
    const next = !S.master[f];
    btn.classList.add('busy');
    try {
        await A.putMaster(S.masterUser, { [f]: next ? 'True' : 'False' });
        S.master[f] = next;
        btn.classList.toggle('is-on', next);
        haptic('light');
    } catch (_) { toast(t('error'), true); }
    btn.classList.remove('busy');
}

async function patch(data) {
    try {
        await A.putMaster(S.masterUser, data);
        Object.assign(S.master, data);
        toast(t('saved'));
        await refreshMaster();
        return true;
    } catch (_) { toast(t('error'), true); return false; }
}

function openEdit(kind) {
    const m = S.master;
    if (kind === 'name') return textEdit({ title: t('name'), value: (m.full_name || '').replace(/-/g, ' '),
        ph: t('namePh'), check: v => v.trim().length >= 2 || t('errEmpty'), save: v => ({ full_name: v.trim() }) });
    if (kind === 'phone') return textEdit({ title: t('phone'), value: m.phone || '', ph: t('phonePh'), type: 'tel',
        check: v => /^\+?9?9?8?\d{9}$/.test(v.replace(/\D/g, '')) || t('errPhone'),
        save: v => { let d = v.replace(/\D/g, ''); if (d.indexOf('998') === 0) d = d.slice(3); return { phone: '+998' + d }; } });
    if (kind === 'telegram') return textEdit({ title: t('telegram'), value: m.telegram || '', ph: t('tgPh'), type: 'url',
        check: v => !v.trim() || /^https?:\/\//.test(v.trim()) || t('errUrl'), save: v => ({ telegram: v.trim() }) });
    if (kind === 'instagram') return textEdit({ title: t('instagram'), value: m.instagram || '', ph: t('igPh'), type: 'url',
        check: v => !v.trim() || /^https?:\/\//.test(v.trim()) || t('errUrl'), save: v => ({ instagram: v.trim() }) });
    if (kind === 'interval') {
        const opts = [];
        for (let x = 20; x <= 60; x += 1) opts.push(x);
        const cur = Math.max(0, opts.indexOf(parseInt(m.service_duration, 10) || 45));
        const cols = [{ items: opts.map(durLabel), index: cur }];
        let read;
        return openSheet({
            title: t('interval'), done: t('save'),
            body: buildWheel(cols),
            onOpen() { read = wireWheel($('#sh-b'), cols); },
            onDone() { return patch({ service_duration: String(opts[cols[0].index]) }); }
        });
    }
    if (kind === 'open') return timeWheelSheet({ title: t('opens'), value: m.open,
        onSave: v => hm2min(v) >= hm2min(m.closed) ? (toast(t('errOrder'), true), false) : patch({ open: v }) });
    if (kind === 'closed') return timeWheelSheet({ title: t('closes'), value: m.closed,
        onSave: v => hm2min(v) <= hm2min(m.open) ? (toast(t('errOrder'), true), false) : patch({ closed: v }) });
    if (kind === 'lunch') return timeWheelSheet({ title: t('lunch'), value: m.lunch_time || '13:00',
        onSave: v => patch({ lunch_time: v }) });
    if (kind === 'days')     return editDays();
    if (kind === 'location') return editLocation();
    if (kind === 'services') return switchTab('services');
    if (kind === 'contacts') return switchTab('contacts');
    if (kind === 'blocked')  return editBlocked();
    if (kind === 'lang')     return editLang();
    if (kind === 'rules')    return showRules();
    if (kind === 'delete')   return confirmSheet(t('confirmDelAcc'), async () => {
        try { await A.delMaster(S.masterUser); toast(t('deleted'));
              setTimeout(() => { if (tg && tg.close) tg.close(); }, 900); }
        catch (_) { toast(t('error'), true); }
    });
}

function textEdit(o) {
    openSheet({
        title: o.title, done: t('save'),
        body: '<div class="fld"><input class="inp" id="te"'
            + (o.type ? ' type="' + o.type + '"' : '') + (o.mode ? ' inputmode="' + o.mode + '"' : '')
            + ' value="' + esc(o.value) + '" placeholder="' + esc(o.ph || '') + '" autocomplete="off">'
            + '<div class="fld__h" id="te-e"></div></div>',
        onOpen() { setTimeout(() => $('#te').focus(), 340); },
        async onDone() {
            const v = $('#te').value;
            const ok = o.check ? o.check(v) : true;
            if (ok !== true) {
                $('#te-e').textContent = ok;
                $('#te-e').className = 'fld__h fld__h--e';
                $('#te').classList.add('inp--e');
                haptic('error');
                return false;
            }
            return patch(o.save(v));
        }
    });
}

function editDays() {
    const sel = {};
    workDays().forEach(c => sel[c] = true);
    openSheet({
        title: t('workdays'), done: t('save'),
        body: '<div class="wk" id="wd">' + WEEK.map((c, i) =>
            '<button class="wk__d' + (sel[c] ? ' is-on' : '') + '" data-c="' + esc(c) + '">'
            + '<b>' + esc(dayShort(c)) + '</b></button>').join('')
            + '</div>',
        onOpen() {
            $('#wd').querySelectorAll('.wk__d').forEach(b => b.onclick = () => {
                const c = b.dataset.c;
                if (sel[c]) delete sel[c]; else sel[c] = true;
                b.classList.toggle('is-on');
                haptic('light');
            });
        },
        onDone: () => patch({ working_days: WEEK.filter(c => sel[c]).join(', ') })
    });
}

function editLocation() {
    const m = S.master;
    openSheet({
        title: t('location'),
        body: (m.latitude ? '<div class="map-card" style="margin-bottom:16px"><div class="map" id="lmap">'
                + '<div class="map__tiles" id="lmap-t"></div><i class="map__wave"></i>' + MAPMARK
                + '<span class="map__cred">© OpenStreetMap</span></div></div>' : '')
            + '<button class="btn" id="lg">' + svg(I.pin) + esc(t('locGet')) + '</button>'
            + '<div class="fld__h cn" id="le"></div>',
        onOpen() {
            if (m.latitude) setTimeout(() => drawTiles($('#lmap-t'), +m.latitude, +m.longitude, 16), 80);
            $('#lg').onclick = async () => {
                const b = $('#lg');
                b.disabled = true; b.innerHTML = '<i class="spin"></i>';
                const c = await getLocation();
                b.disabled = false; b.innerHTML = svg(I.pin) + esc(t('locGet'));
                if (!c) {
                    $('#le').textContent = t('locDenied');
                    $('#le').className = 'fld__h fld__h--e cn';
                    haptic('error'); return;
                }
                if (await patch({ latitude: c.lat, longitude: c.lon })) { toast(t('locSaved')); closeSheet(); }
            };
        }
    });
}

function editBlocked() {
    const list = S.master.blocked_clients || [];
    openSheet({
        title: t('blocked'),
        body: list.length ? '<div class="list">' + list.map(c =>
            '<div class="row"><span class="ico" style="background:var(--red)">' + svg(I.person) + '</span>'
            + '<span class="row__b"><span class="row__t">' + esc(c.client_full_name || '—') + '</span>'
            + '<span class="row__s">' + esc(c.client_phone || '—') + '</span></span>'
            + '<button class="btn btn--2 btn--s" style="width:auto;padding:0 14px" data-ub="' + c.id + '">'
            + esc(t('del')) + '</button></div>').join('') + '</div>'
            : empty('lock', t('noBlocked'), t('noBlockedText')),
        onOpen() {
            $$('#sh-b [data-ub]').forEach(b => b.onclick = async () => {
                b.disabled = true;
                try { await A.unblock(b.dataset.ub); toast(t('deleted')); await refreshMaster(); closeSheet(); }
                catch (_) { toast(t('error'), true); b.disabled = false; }
            });
        }
    });
}

function editLang() {
    openSheet({
        title: t('language'),
        body: '<div class="list">'
            + '<button class="row row--tap" data-l="uz"><span class="row__b"><span class="row__t">O’zbekcha</span></span>'
            + (S.lang === 'uz' ? '<span class="row__v">✓</span>' : '') + '</button>'
            + '<button class="row row--tap" data-l="ru"><span class="row__b"><span class="row__t">Русский</span></span>'
            + (S.lang === 'ru' ? '<span class="row__v">✓</span>' : '') + '</button></div>',
        onOpen() {
            $$('#sh-b [data-l]').forEach(b => b.onclick = () => {
                S.lang = b.dataset.l;
                try { localStorage.setItem('spotline_lang', S.lang); } catch (_) {}
                closeSheet(); tabLabels(); switchTab(S.tab, true); toast(t('saved'));
            });
        }
    });
}

function showRules() {
    const R = {
    uz: [['Tozalik va gigiyena','ish joyi, uskunalar va qoʻllar har doim toza boʻlishi shart'],
         ['Mijozga hurmat','doim muloyim va madaniyatli muomala qiling'],
         ['Dezinfeksiya','har bir mijozdan keyin asboblarni tozalang'],
         ['Faqat oʻzlashtirilgan xizmat','sifatli bajara oladiganini bajaring'],
         ['Narxni oldindan ayting','ish boshlashdan oldin tushuntiring'],
         ['Maʼlumot maxfiyligi','mijoz maʼlumotlarini begonalarga bermang'],
         ['Intizom','ish vaqtida spirtli ichimlik va chekish man etiladi'],
         ['Vaqtga rioya','kelishilgan vaqtga qatʼiy amal qiling'],
         ['Shaxsiy hayot','mijozning shaxsiy hayotini muhokama qilmang'],
         ['Reyting','10 daqiqadan kam qolganda bekor qilish yoki 10 daqiqadan koʻp kechikish reytingni tushiradi']],
    ru: [['Чистота и гигиена','рабочее место, инструменты и руки всегда чистые'],
         ['Уважение к клиенту','всегда вежливо и культурно'],
         ['Дезинфекция','после каждого клиента очищайте инструменты'],
         ['Только освоенные услуги','выполняйте то, чем владеете'],
         ['Цена заранее','объясните стоимость до начала'],
         ['Конфиденциальность','не передавайте данные клиента третьим лицам'],
         ['Дисциплина','алкоголь и курение во время работы запрещены'],
         ['Пунктуальность','строго соблюдайте согласованное время'],
         ['Личная жизнь','не обсуждайте личную жизнь клиента'],
         ['Рейтинг','отмена менее чем за 10 минут или опоздание более 10 минут снижают рейтинг']],
    };
    openSheet({ title: t('rules'),
        body: '<ol class="rules">' + R[S.lang].map(r =>
            '<li class="rules__i"><span class="rules__n"></span>'
            + '<span class="rules__b"><b>' + esc(r[0]) + '</b>'
            + '<span>' + esc(r[1]) + '</span></span></li>').join('') + '</ol>' });
}

function getLocation() {
    return new Promise(resolve => {
        const LM = tg && tg.LocationManager;
        if (LM && typeof LM.getLocation === 'function') {
            try {
                const ask = () => LM.getLocation(d => {
                    if (d && d.latitude != null) resolve({ lat: d.latitude, lon: d.longitude });
                    else browserLoc(resolve);
                });
                if (LM.isInited) ask(); else LM.init(ask);
                return;
            } catch (_) {}
        }
        browserLoc(resolve);
    });
}
function browserLoc(resolve) {
    if (!navigator.geolocation) return resolve(null);
    navigator.geolocation.getCurrentPosition(
        p => resolve({ lat: p.coords.latitude, lon: p.coords.longitude }),
        () => resolve(null), { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 });
}

const SCREENS = [
    { id:'cabinet',  icon:I.cabinet,  key:'cabinet',     render:renderCabinet,  tab:true },
    { id:'bookings', icon:I.bookings, key:'bookings',    render:renderBookings, tab:true },
    { id:'contacts', icon:I.phone,    key:'contactsTab', render:renderContacts, tab:true },
    { id:'report',   icon:I.report,   key:'report',      render:renderReport,   tab:true },
    { id:'settings', icon:I.settings, key:'settings',    render:renderSettings, tab:true },
    { id:'services', icon:I.services, key:'services',    render:renderServices, parent:'settings' },
];
const TABS = SCREENS.filter(x => x.tab);

function tabLabels() {
    $$('.tab').forEach(b => {
        const x = SCREENS.filter(v => v.id === b.dataset.tab)[0];
        if (x) b.querySelector('span').textContent = t(x.key);
    });
}

function switchTab(id, force) {
    const tab = SCREENS.filter(x => x.id === id)[0];
    if (!tab) return;
    if (id !== S.tab || force) haptic('light');
    S.tab = id;
    const mark = tab.parent || id;
    $$('.tab').forEach(b => b.classList.toggle('is-active', b.dataset.tab === mark));
    $$('.screen').forEach(s => s.hidden = s.id !== 'screen-' + id);
    $('#hdr').classList.remove('is-stuck');
    tab.render();
}

async function refreshMaster() {
    try {
        S.master = await A.getMaster(S.masterUser);
        setHeaderAvatar();
        if (S.tab === 'settings') renderSettings();
        if (S.tab === 'cabinet')  renderCabinet();
    } catch (_) {}
}

function setHeaderAvatar() {
    const m = S.master, name = (m.full_name || '').replace(/-/g, ' ');
    $('#hdr-ava').innerHTML = m.image
        ? '<img src="' + esc(m.image) + '" alt="">'
        : '<span>' + esc(initials(name)) + '</span>';
}

function quickMenu() {
    const m = S.master, name = (m.full_name || '').replace(/-/g, ' ');
    openSheet({
        title: name,
        body: '<div class="list">'
            + '<button class="row row--tap" data-q="cabinet">'
              + '<span class="ico" style="background:var(--accent)">' + svg(I.person) + '</span>'
              + '<span class="row__b"><span class="row__t">' + esc(t('cabinet')) + '</span></span>'
              + svgChev('chev') + '</button>'
            + '<button class="row row--tap" data-q="contacts">'
              + '<span class="ico" style="background:var(--teal)">' + svg(I.phone) + '</span>'
              + '<span class="row__b"><span class="row__t">' + esc(t('contacts')) + '</span></span>'
              + '<span class="row__v">' + (S.contacts ? S.contacts.length : '') + '</span>'
              + svgChev('chev') + '</button>'
            + '<button class="row row--tap" data-q="refresh">'
              + '<span class="ico" style="background:var(--green)">' + svg(I.refresh) + '</span>'
              + '<span class="row__b"><span class="row__t">' + esc(t('refresh')) + '</span></span>'
              + '</button>'
            + '<button class="row row--tap" data-q="lang">'
              + '<span class="ico" style="background:#5856D6">' + svg(I.globe) + '</span>'
              + '<span class="row__b"><span class="row__t">' + esc(t('language')) + '</span></span>'
              + '<span class="row__v">' + (S.lang === 'ru' ? 'Русский' : 'O\u2019zbekcha') + '</span>'
              + svgChev('chev') + '</button>'
            + '<button class="row row--tap" data-q="theme">'
              + '<span class="ico" style="background:var(--amber)">' + svg(I.eye) + '</span>'
              + '<span class="row__b"><span class="row__t">' + esc(t('theme')) + '</span></span>'
              + '<span class="row__v">' + esc(document.documentElement.dataset.theme === 'dark' ? t('dark') : t('light')) + '</span>'
              + '</button>'
            + '</div>',
        onOpen() {
            $$('#sh-b [data-q]').forEach(b => b.onclick = async () => {
                const k = b.dataset.q;
                if (k === 'cabinet') { closeSheet(); switchTab('cabinet'); }
                else if (k === 'contacts') { closeSheet(); switchTab('contacts'); }
                else if (k === 'refresh') { closeSheet(); await refreshMaster(); switchTab(S.tab, true); toast(t('saved')); }
                else if (k === 'lang') { closeSheet(); editLang(); }
                else if (k === 'theme') {
                    const dk = document.documentElement.dataset.theme !== 'dark';
                    document.documentElement.dataset.theme = dk ? 'dark' : 'light';
                    try { localStorage.setItem('spotline_theme', dk ? 'dark' : 'light'); } catch (_) {}
                    const mt = document.querySelector('meta[name=theme-color]');
                    if (mt) mt.content = dk ? '#000000' : '#F5F5F7';
                    closeSheet(); haptic('light');
                }
            });
        }
    });
}

function renderContacts() {
    setHeader(t('contacts'), t('contactsSub'));
    const el = $('#screen-contacts');
    const paint = () => {
        const list = S.contacts || [];
        el.innerHTML = (list.length
                ? '<div class="list">' + list.map((c, i) => contactRow(c, i)).join('') + '</div>'
                : empty('ghost', t('noContacts'), t('noContactsText')))
            + '<div class="group mt"><button class="btn" id="ct-add">' + svg(I.plus)
            + esc(t('addContact')) + '</button></div>';
        wireContacts(paint, el);
    };
    if (!S.contacts) {
        el.innerHTML = skel(4);
        A.contacts(S.masterUser)
            .then(r => { S.contacts = r || []; })
            .catch(() => { S.contacts = []; })
            .then(paint);
    } else paint();
    wireHeaderScroll(el);
}

function syncContactCount() {
    const n = S.contacts ? S.contacts.length : 0;
    const t3 = $$('#screen-cabinet .tile')[2];
    if (t3) t3.querySelector('b').textContent = n;
    const r = $('#ct-n');
    if (r) r.textContent = n;
}

function contactRow(c, i) {
    const nm = (c.full_name || '').replace(/-/g, ' ').trim() || '—';
    const ph = (c.phone || '').trim();
    return '<div class="row">'
         + '<span class="ava-s">' + esc(initials(nm)) + '</span>'
         + '<span class="row__b"><span class="row__t">' + esc(nm) + '</span>'
         + '<span class="row__s">' + esc(ph || '—') + '</span></span>'
         + (ph ? '<button class="xbtn xbtn--c" data-cp="' + i + '" aria-label="copy">'
                + svg(I.copy) + '</button>' : '')
         + '<button class="xbtn xbtn--d" data-rm="' + i + '" aria-label="del">'
         + svg(I.minus) + '</button></div>';
}

function contactForm(onDone) {
    let nameEl, phEl;
    openSheet({
        title: t('addContact'), done: t('save'),
        body: '<div class="fld"><label class="fld__l">' + esc(t('name')) + '</label>'
            + '<input class="inp" id="ct-nm" placeholder="' + esc(t('namePh')) + '"></div>'
            + '<div class="fld"><label class="fld__l">' + esc(t('phone')) + '</label>'
            + '<input class="inp" id="ct-ph" type="tel" placeholder="' + esc(t('phonePh')) + '"></div>',
        onOpen() { nameEl = $('#ct-nm'); phEl = $('#ct-ph'); nameEl.focus(); },
        async onDone() {
            const nm = (nameEl.value || '').trim();
            const raw = (phEl.value || '').replace(/\D/g, '');
            if (nm.length < 2) { toast(t('errEmpty'), true); return false; }
            if (!/^\+?9?9?8?\d{9}$/.test(phEl.value.replace(/\D/g, ''))) { toast(t('errPhone'), true); return false; }
            const d = raw.indexOf('998') === 0 ? raw.slice(3) : raw;
            try {
                const c = await A.addContact({ master: S.master.id, full_name: nm, phone: '+998' + d });
                S.contacts = (S.contacts || []).concat([c]);
                toast(t('added')); haptic('success'); onDone();
                syncContactCount();
            } catch (_) { toast(t('error'), true); return false; }
        }
    });
}

async function copyText(txt) {
    txt = String(txt == null ? '' : txt).trim();
    if (!txt) return false;

    const prev = document.activeElement;
    try {
        const el = document.createElement('textarea');
        el.value = txt;
        el.readOnly = false;
        el.style.cssText = 'position:fixed;top:0;left:-9999px;width:1px;height:1px;opacity:0;'
            + 'font-size:16px;-webkit-user-select:text;user-select:text;';
        document.body.appendChild(el);

        el.focus({ preventScroll: true });
        el.select();
        el.setSelectionRange(0, txt.length);

        const ok = document.execCommand('copy');
        document.body.removeChild(el);
        if (prev && prev.focus) { try { prev.focus({ preventScroll: true }); } catch (_) {} }
        if (ok) return true;
    } catch (_) {}

    try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(txt);
            return true;
        }
    } catch (_) {}
    return false;
}

function wireContacts(repaint, root) {
    const q = sel => Array.from((root || $('#sh-b') || document).querySelectorAll(sel));
    q('[data-cp]').forEach(b => b.onclick = async () => {
        const c = (S.contacts || [])[+b.dataset.cp];
        if (!c) return;
        const ok = await copyText((c.phone || '').trim());
        if (ok) { haptic('success'); toast(t('copied')); return; }
        const el = b.closest('.row').querySelector('.row__s');
        if (el) {
            el.style.webkitUserSelect = el.style.userSelect = 'text';
            const r = document.createRange();
            r.selectNodeContents(el);
            const sel = window.getSelection();
            sel.removeAllRanges(); sel.addRange(r);
        }
        haptic('light'); toast(t('selectCopy'));
    });
    const add = (root || document).querySelector('#ct-add');
    if (add) add.onclick = () => contactForm(() => { if (repaint) repaint(); });
    q('[data-rm]').forEach(b => b.onclick = async () => {
        const c = (S.contacts || [])[+b.dataset.rm];
        if (!c) return;
        b.classList.add('busy');
        try {
            await A.delContact(c.id);
            S.contacts = S.contacts.filter(x => x.id !== c.id);
            haptic('success'); toast(t('deleted'));
            if (repaint) repaint();
            syncContactCount();
        } catch (_) { toast(t('error'), true); b.classList.remove('busy'); }
    });
}

function fatal(title, text) {
    $('#app').innerHTML = '<div class="screen" style="display:grid;place-items:center">' + empty('ghost', title, text) + '</div>';
    $('#app').hidden = false;
    const b = $('#boot'); if (b) b.remove();
}

async function boot() {
    let dark = true;
    try {
        const sv = localStorage.getItem('spotline_theme');
        if (sv) dark = sv === 'dark';
    } catch (_) {}
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    const mt = document.querySelector('meta[name=theme-color]');
    if (mt) mt.content = dark ? '#000000' : '#F5F5F7';

    try {
        const saved = localStorage.getItem('spotline_lang');
        if (saved) S.lang = saved;
        else if (tg && tg.initDataUnsafe && tg.initDataUnsafe.user
                 && tg.initDataUnsafe.user.language_code === 'ru') S.lang = 'ru';
    } catch (_) {}

    if (tg) {
        try {
            tg.ready(); tg.expand();
            if (tg.setHeaderColor) tg.setHeaderColor(dark ? '#000000' : '#F5F5F7');
            if (tg.setBackgroundColor) tg.setBackgroundColor(dark ? '#000000' : '#F5F5F7');
            if (tg.disableVerticalSwipes) tg.disableVerticalSwipes();
        } catch (_) {}
    }

    S.masterUser = 'demo';

    getLocation().then(c => {
        if (!c) return;
        S.coords = c;
        window.dispatchEvent(new CustomEvent('spotline:location', { detail: c }));
    });

    try { S.master = await A.getMaster(S.masterUser); }
    catch (_) { fatal(t('noMaster'), t('noMasterText')); return; }

    try { S.services = (await A.services(S.masterUser)) || []; } catch (_) {}
    try { S.contacts = (await A.contacts(S.masterUser)) || []; } catch (_) { S.contacts = []; }

    $('#boot').remove();
    $('#app').hidden = false;
    setHeaderAvatar();

    $('#tabbar').innerHTML = TABS.map(x =>
        '<button class="tab" data-tab="' + x.id + '">' + svg(x.icon) + '<span>' + esc(t(x.key)) + '</span></button>').join('');
    $$('.tab').forEach(b => b.onclick = () => switchTab(b.dataset.tab));

    $('#hdr-ava').onclick = quickMenu;
    $('#hdr-bell').onclick = () => { haptic('light'); notesSheet(); };
    $('#hdr-refresh').onclick = async () => {
        const b = $('#hdr-refresh');
        b.classList.remove('is-spin'); void b.offsetWidth; b.classList.add('is-spin');
        await refreshMaster();
        switchTab(S.tab, true);
        haptic('success');
        toast(t('upd'));
    };

    $('#sh-x').onclick = closeSheet;
    $('#sh-scrim').onclick = closeSheet;
    $('#sh-ok').onclick = async () => {
        if (!sheetDone) { closeSheet(); return; }
        const b = $('#sh-ok');
        b.disabled = true;
        const ok = await sheetDone();
        b.disabled = false;
        if (ok !== false) closeSheet();
    };

    switchTab('cabinet', true);
}

document.addEventListener('DOMContentLoaded', boot);
})();
