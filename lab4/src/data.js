// data.js — константи та статичні дані додатку
// Примітка: LESSONS_DATA та INITIAL_GALLERY більше не використовуються
// безпосередньо в компонентах — дані завантажуються з Firebase Firestore.
// Залишені для сумісності / резервного використання.

export const ROUTES = {
  home:     'home',
  lessons:  'lessons',
  gallery:  'gallery',
  progress: 'progress',
  comments: 'comments',
};

// Інформація про модулі (статична — не потребує БД)
export const MODULE_INFO = [
  { title: 'Модуль 1: Основи фотографії',  desc: 'Трикутник експозиції, типи камер, режими зйомки, фокусування. Ідеальний старт для початківців.' },
  { title: 'Модуль 2: Композиція',          desc: 'Правило третин, золота спіраль, провідні лінії, негативний простір та рамкування.' },
  { title: 'Модуль 3: Освітлення',          desc: 'Натуральне та студійне світло, золота година, схеми освітлення та робота зі спалахом.' },
  { title: 'Модуль 4: Редагування',         desc: 'Lightroom, Photoshop, Camera Raw — від базової корекції до кольорового грейдингу.' },
];

// Прогрес по модулях (статична — для ProgressPage)
export const MODULE_PROGRESS_DATA = [
  { label: 'Основи',      pct: 100 },
  { label: 'Композиція',  pct: 80  },
  { label: 'Редагування', pct: 45  },
  { label: 'Портрет',     pct: 20  },
];

// Підписи типів фото (статичні)
export const TYPE_LABELS = {
  portrait:  'Портрет',
  landscape: 'Пейзаж',
  macro:     'Макро',
  street:    'Вулиця',
};

// Резервні дані уроків (на випадок відсутності з'єднання з Firestore)
export const LESSONS_DATA = [
  { id: 1, module: 0, title: 'Трикутник експозиції',              type: 'Відео',         duration: '18 хв', difficulty: 'easy',   diffLabel: 'Початківець', module_label: 'Модуль 1', img: 'https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?w=600&q=80', desc: 'Витримка, діафрагма та ISO — як три параметри визначають результат знімка.',         full: 'Детально розглядаємо кожен елемент трикутника: що таке витримка і як вона впливає на рух у кадрі, як діафрагма керує глибиною різкості, і чому ISO — це компроміс між світлом і шумом. Практичні вправи у режимі M.' },
  { id: 2, module: 0, title: "Типи об'єктивів та їх використання", type: 'Відео',         duration: '22 хв', difficulty: 'easy',   diffLabel: 'Початківець', module_label: 'Модуль 1', img: 'https://images.unsplash.com/photo-1520390138845-fd2d229dd553?w=600&q=80', desc: "Прайм vs зум, кутові та телеоб'єктиви — який обрати для вашого жанру.",           full: "Від широкого кута 14мм до телеоб'єктива 400мм. Розбираємо кожен фокусний діапазон, типові сценарії використання та як фокусна відстань впливає на перспективу і стиснення зображення." },
  { id: 3, module: 1, title: 'Правило третин та золота спіраль',   type: 'Відео',         duration: '24 хв', difficulty: 'easy',   diffLabel: 'Початківець', module_label: 'Модуль 2', img: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&q=80', desc: 'Правило третин, золота спіраль та провідні лінії для ефектних знімків.',            full: 'Вивчаємо класичні правила побудови кадру, які використовують найкращі фотографи світу. Після цього уроку ви навчитесь свідомо порушувати ці правила для досягнення художнього ефекту.' },
  { id: 4, module: 2, title: 'Натуральне та штучне освітлення',    type: 'Текст + Відео', duration: '31 хв', difficulty: 'medium', diffLabel: 'Середній',    module_label: 'Модуль 3', img: 'https://images.unsplash.com/photo-1616400619175-5beda3a17896?w=600&q=80', desc: 'Золота година, блакитна година, студійне світло та портативні спалахи.',            full: 'Як читати природне світло протягом дня. Що таке золота та блакитна година. Основні схеми студійного освітлення: Rembrandt, butterfly, split. Практичний гайд по роботі зі спалахом у режимі TTL.' },
  { id: 5, module: 3, title: 'Lightroom: базова корекція',          type: 'Відео',         duration: '35 хв', difficulty: 'medium', diffLabel: 'Середній',    module_label: 'Модуль 4', img: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=600&q=80', desc: 'Кольорова корекція, тональний контраст та робота з масками.',                       full: 'Повний огляд панелі Basic у Lightroom. Робота з гістограмою, експозицією, світлами і тінями. Введення в HSL та криві тонів. Наприкінці уроку — створення власного пресету.' },
  { id: 6, module: 3, title: 'Кольоровий грейдинг',                type: 'Відео',         duration: '28 хв', difficulty: 'hard',   diffLabel: 'Просунутий',  module_label: 'Модуль 4', img: 'https://images.unsplash.com/photo-1587145820266-a5951ee6f620?w=600&q=80', desc: 'Split-toning, кольорові схеми та кінематографічний стиль обробки.',                 full: 'Як досягнути кінематографічного look у своїх знімках. Детальна робота зі Color Grading у Lightroom та Camera Raw. Теорія кольору: комплементарні кольори, тріади, аналогові схеми.' },
];

// Резервні дані галереї
export const INITIAL_GALLERY = [
  { id: 1, type: 'landscape', author: 'Марія К.',    img: 'photo/forests-mountains.jpg' },
  { id: 2, type: 'portrait',  author: 'Олег Д.',     img: 'photo/portrait1.png' },
  { id: 3, type: 'street',    author: 'Тетяна Б.',   img: 'photo/street.png' },
  { id: 4, type: 'landscape', author: 'Іван С.',     img: 'photo/mountain.png' },
  { id: 5, type: 'portrait',  author: 'Юлія М.',     img: 'photo/portrait2.png' },
  { id: 6, type: 'macro',     author: 'Дмитро Л.',   img: 'photo/macro1.png' },
  { id: 7, type: 'street',    author: 'Катерина Р.', img: 'photo/street2.png' },
  { id: 8, type: 'macro',     author: 'Андрій П.',   img: 'photo/macro2.png' },
];
