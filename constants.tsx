
import { Race, Class, Artifact, Monster, Synergy } from './types';

export const RACES: Race[] = [
  {
    id: 'human',
    name: 'Человек',
    description: 'Обычный житель Снежгарда, лишенный врожденной магии, но обладающий невероятной волей к жизни.',
    appearance: 'Разнообразная внешность, часто носят теплую одежду из меха и кожи.',
    culture: 'Выживание любой ценой, торговля и ремесла.',
    abilities: [
      { name: 'Адаптивность', desc: 'Вы получаете +5 дополнительных очков характеристик при создании персонажа.' },
      { name: 'Упорство', desc: '1 раз в долгий отдых вы можете перебросить любую неудачную проверку судьбы.' }
    ],
    ageRange: '60-90 лет',
    holidayAttitude: 'Ностальгия'
  },
  {
    id: 'winter_elf',
    name: 'Эльф Зимнего Полюса',
    description: 'Древние стражи ледяных границ, чьи стрелы поют в метель.',
    appearance: 'Бледные, с глазами как застывший океан.',
    culture: 'Военная меритократия.',
    abilities: [
      { name: 'Ледяные Стрелы', desc: 'Ваши атаки дальнего боя снижают скорость цели на 10 фт.' },
      { name: 'Аура Точности', desc: 'Союзники в радиусе 30 фт получают бонус +2 к урону.' }
    ],
    ageRange: '200-800 лет',
    holidayAttitude: 'Священный долг'
  },
  {
    id: 'santa_clone',
    name: 'Клон Санты',
    description: 'Био-дубликаты Великого Дарителя, созданные для работы в пустошах.',
    appearance: 'Бородатые, крепкие, удивительно похожие друг на друга.',
    culture: 'Братство.',
    abilities: [
      { name: 'Единство Рядов', desc: 'Вы можете совершить два дополнительных малых действия в свой ход.' },
      { name: 'Хлопок', desc: 'Мгновенное перемещение на 30 фт. Наносит урон холодом в точке прибытия.' }
    ],
    ageRange: '40 лет',
    holidayAttitude: 'Служение'
  },
  { id: 'reindeer_folk', name: 'Кентавр-Олень', description: 'Защитники ледяных рощ.', appearance: 'Торс человека на теле оленя.', culture: 'Кочевники.', abilities: [{ name: 'Топот', desc: 'Оглушает врагов в радиусе 10 фт.' }, { name: 'Гон', desc: 'Дает всей группе огромный бонус к скорости.' }], ageRange: '100 лет', holidayAttitude: 'Кочевье' },
  { id: 'snowman', name: 'Снеговик-Человек', description: 'Оживший снег с душой.', appearance: 'Холодное тело.', culture: 'Одиночки.', abilities: [{ name: 'Таяние и Сборка', desc: 'Если вы пали, вы можете собраться заново с частью сил.' }, { name: 'Обморожение', desc: 'Замораживает конечности врага при касании.' }], ageRange: 'До весны', holidayAttitude: 'Жизнь' },
  { id: 'toymaker', name: 'Игрушечник', description: 'Ожившая плюшевая игрушка.', appearance: 'Кукла с пуговицами.', culture: 'Наблюдатели.', abilities: [{ name: 'Окоченение', desc: 'Вы становитесь неотличимы от обычного предмета.' }, { name: 'Удар в Спину', desc: 'Огромный урон, если цель вас не видит.' }], ageRange: 'Бессрочно', holidayAttitude: 'Любопытство' },
  { id: 'candleborn', name: 'Свечерождённый', description: 'Люди из воска.', appearance: 'Огонь внутри.', culture: 'Свет.', abilities: [{ name: 'Лучистый Луч', desc: 'Выжигает тьму и плоть чистым светом.' }, { name: 'Затмение', desc: 'Поглощает свет вокруг, создавая зону непроглядного мрака.' }], ageRange: 'До фитиля', holidayAttitude: 'Свет' },
  { id: 'ice_spirit', name: 'Ледяной Дух', description: 'Существо эфира.', appearance: 'Пар и лед.', culture: 'Тишина.', abilities: [{ name: 'Осколки Льда', desc: 'Создает непроходимую ледяную стену.' }, { name: 'Удар Моржа', desc: 'Критический удар невероятной мощи.' }], ageRange: 'Вечны', holidayAttitude: 'Снег' },
  { id: 'fir_spirit', name: 'Дух Ёлки', description: 'Ожившая хвоя и кора.', appearance: 'Древесная кожа.', culture: 'Лес.', abilities: [{ name: 'Облик Хвои', desc: 'Невидимость среди зимней растительности.' }, { name: 'Разрастание', desc: 'Корни сковывают движения всех врагов.' }], ageRange: '1000 лет', holidayAttitude: 'Рост' },
  { id: 'frostborn', name: 'Морозорожденный', description: 'Люди, пережившие ледяную смерть.', appearance: 'Кожа в инее.', culture: 'Стойкость.', abilities: [{ name: 'Внутренний Жар', desc: 'Вас невозможно заморозить магией.' }, { name: 'Раскол', desc: 'При смерти или сильном ранении вы взрываетесь ледяными шипами.' }], ageRange: '80 лет', holidayAttitude: 'Вызов' },
  { id: 'midnighter', name: 'Полуночник', description: 'Существа из чистой тени.', appearance: 'Черный силуэт.', culture: 'Мрак.', abilities: [{ name: 'Шаг Тени', desc: 'Прыжок между тенями.' }, { name: 'Ужас Полночи', desc: 'Парализует страхом любого, кто посмотрит в ваши глаза.' }], ageRange: '150 лет', holidayAttitude: 'Тьма' },
  { id: 'bellborn', name: 'Колокольнорождённый', description: 'Воплощения звона.', appearance: 'Металлический блеск.', culture: 'Музыка.', abilities: [{ name: 'Резонанс', desc: 'Разрушает доспехи и кости звуковыми волнами.' }, { name: 'Оглушающий Звон', desc: 'Лишает врагов ориентации в пространстве.' }], ageRange: '200 лет', holidayAttitude: 'Мелодия' },
  { id: 'sugar_person', name: 'Сахарный Человек', description: 'Сладкие, но опасные.', appearance: 'Карамельная кожа.', culture: 'Пир.', abilities: [{ name: 'Липкая Кожа', desc: 'Враги застревают при попытке атаковать вас.' }, { name: 'Сахарный Рывок', desc: 'Невероятная скорость на короткий срок.' }], ageRange: '50 лет', holidayAttitude: 'Радость' },
  { id: 'glass_golem', name: 'Стеклянный Голем', description: 'Хрупкие отражения.', appearance: 'Прозрачное стекло.', culture: 'Архив.', abilities: [{ name: 'Зеркальное Отражение', desc: 'Создает ваши иллюзорные копии.' }, { name: 'Преломление', desc: 'Ослепляет врагов, отражая любой свет.' }], ageRange: 'Вечны', holidayAttitude: 'Сбор' },
  { id: 'shadow_weaver', name: 'Ткач Тени', description: 'Мастера нитей мрака.', appearance: 'Закутаны в саван.', culture: 'Убийцы.', abilities: [{ name: 'Пустотное Плетение', desc: 'Нити тьмы связывают врага по рукам и ногам.' }, { name: 'Фаза', desc: 'Вы становитесь бесплотным и проходите сквозь объекты.' }], ageRange: '300 лет', holidayAttitude: 'Охота' }
];

export const CLASSES: Class[] = [
  {
    id: 'fool',
    name: 'Дурак',
    role: 'support',
    playstyle: 'Безумная удача вместо магии.',
    startingSkills: [
      { name: 'Блаженство', desc: 'Вы получаете +5 дополнительных очков Духа при создании.' },
      { name: 'Шутливый Уворот', desc: 'Вы инстинктивно уклоняетесь от самых опасных ударов.' }
    ],
    mechanic: 'Удача',
    progression: 'Безумец'
  },
  { id: 'santa', name: 'Санта', role: 'tank', playstyle: 'Лидер.', startingSkills: [{ name: 'Святое Убеждение', desc: 'Заставляет врагов сложить оружие.' }, { name: 'Рука Дарителя', desc: 'Мощное исцеление всех союзников.' }], mechanic: 'Вера', progression: 'Аватар' },
  { id: 'confectioner', name: 'Кондитер', role: 'support', playstyle: 'Алхимик.', startingSkills: [{ name: 'Сахарный Взрыв', desc: 'Ослепляет и наносит урон.' }, { name: 'Ярость Глюкозы', desc: 'Кратковременное усиление всех параметров.' }], mechanic: 'Кухня', progression: 'Мастер' },
  { id: 'grinch', name: 'Гринч', role: 'dps', playstyle: 'Ассасин.', startingSkills: [{ name: 'Прыжок из Тени', desc: 'Мгновенная атака со спины.' }, { name: 'Дымовая Завеса', desc: 'Скрывает группу в облаке пепла.' }], mechanic: 'Злость', progression: 'Тень' },
  { id: 'bell_bard', name: 'Бард', role: 'support', playstyle: 'Мастер звука.', startingSkills: [{ name: 'Колыбельная Льда', desc: 'Усыпляет врагов звуками колокольчиков.' }, { name: 'Смертельный Аккорд', desc: 'Наносит урон по площади.' }], mechanic: 'Резонанс', progression: 'Виртуоз' },
  { id: 'ice_blacksmith', name: 'Кузнец', role: 'tank', playstyle: 'Мастер стали.', startingSkills: [{ name: 'Удар Молота', desc: 'Сминает доспехи и оглушает.' }, { name: 'Ледяной Горн', desc: 'Замораживает оружие противников.' }], mechanic: 'Ковка', progression: 'Мастер' },
  { id: 'gift_keeper', name: 'Хранитель Подарков', role: 'dps', playstyle: 'Магия сюрпризов.', startingSkills: [{ name: 'Случайный Дар', desc: 'Призывает мощный магический эффект.' }, { name: 'Ящик Пандоры', desc: 'Выпускает ужасы на поле боя.' }], mechanic: 'Случай', progression: 'Маг' },
  { id: 'blizzard_lord', name: 'Лорд Метели', role: 'control', playstyle: 'Маг льда.', startingSkills: [{ name: 'Поле Обморожения', desc: 'Замедляет и ранит всех вокруг.' }, { name: 'Холодное Копье', desc: 'Пронзает врагов насквозь.' }], mechanic: 'Холод', progression: 'Бог' },
  { id: 'snow_sage', name: 'Снежный Мудрец', role: 'support', playstyle: 'Знахарь.', startingSkills: [{ name: 'Заморозка Времени', desc: 'Останавливает одного врага.' }, { name: 'Ледяное Око', desc: 'Раскрывает все секреты и слабости.' }], mechanic: 'Знание', progression: 'Старец' },
  { id: 'time_keeper', name: 'Хранитель Времени', role: 'control', playstyle: 'Хронос.', startingSkills: [{ name: 'Петля Времени', desc: 'Возвращает союзника в состояние до ранения.' }, { name: 'Ускорение Потока', desc: 'Дает группе дополнительные действия.' }], mechanic: 'Время', progression: 'Вечный' },
  { id: 'inquisitor', name: 'Инквизитор', role: 'dps', playstyle: 'Воин веры.', startingSkills: [{ name: 'Божья Кара', desc: 'Удар огромной силы.' }, { name: 'Свет Истины', desc: 'Испепеляет нежить и демонов.' }], mechanic: 'Гнев', progression: 'Святой' },
  { id: 'architect', name: 'Архитектор Льда', role: 'tank', playstyle: 'Зодчий.', startingSkills: [{ name: 'Ледяной Бастион', desc: 'Создает непробиваемую крепость.' }, { name: 'Морозные Шипы', desc: 'Покрывает землю смертельными иглами.' }], mechanic: 'Лед', progression: 'Творец' },
  { id: 'masked', name: 'Масочник', role: 'control', playstyle: 'Манипулятор.', startingSkills: [{ name: 'Смена Личины', desc: 'Сбивает врагов с толку.' }, { name: 'Танец Теней', desc: 'Массовое ослепление.' }], mechanic: 'Маска', progression: 'Тень' },
  { id: 'tracker', name: 'Следопыт', role: 'dps', playstyle: 'Стрелок.', startingSkills: [{ name: 'Верный Выстрел', desc: 'Невозможно промахнуться.' }, { name: 'Капкан Стужи', desc: 'Сковывает цель.' }], mechanic: 'След', progression: 'Дух' },
  { id: 'firefighter', name: 'Огнеборец', role: 'dps', playstyle: 'Мастер огня.', startingSkills: [{ name: 'Огненный Щит', desc: 'Сжигает тех, кто вас атакует.' }, { name: 'Сверхновая', desc: 'Взрыв невероятной мощи.' }], mechanic: 'Жар', progression: 'Герой' },
  { id: 'wrapper', name: 'Упаковщик', role: 'control', playstyle: 'Оковы.', startingSkills: [{ name: 'Стальная Лента', desc: 'Стягивает врагов в одну точку.' }, { name: 'Запечатывание', desc: 'Лишает магии на время.' }], mechanic: 'Плен', progression: 'Мастер' },
  { id: 'coal_master', name: 'Мастер Угля', role: 'dps', playstyle: 'Тьма.', startingSkills: [{ name: 'Черный Пепел', desc: 'Удушающее облако.' }, { name: 'Тлеющие Угли', desc: 'Постепенный урон.' }], mechanic: 'Сажа', progression: 'Лорд' }
];

export const SYNERGIES: Synergy[] = [
  { raceId: 'human', classId: 'fool', newName: 'Самый Везучий Смертный', bonusStats: { str: 4, dex: 4, con: 4, wis: 4, cha: 4, int: 4 }, specialSkill: 'Улыбка Фортуны', description: 'Ваша обыденность стала вашим щитом.' },
  { raceId: 'winter_elf', classId: 'tracker', newName: 'Полярный Егерь', bonusStats: { dex: 8, wis: 4 }, specialSkill: 'Ледяной Снайпер', description: 'Каждая стрела несет в себе холод Полюса.' },
  { raceId: 'santa_clone', classId: 'santa', newName: 'Истинный Наследник', bonusStats: { str: 4, cha: 8 }, specialSkill: 'Голос Подарка', description: 'Вы почти не отличимы от оригинала.' },
  { raceId: 'reindeer_folk', classId: 'tracker', newName: 'Вестник Дикой Охоты', bonusStats: { str: 6, dex: 4 }, specialSkill: 'Великий Гон', description: 'Ярость северных небес в каждом шаге.' },
  { raceId: 'snowman', classId: 'blizzard_lord', newName: 'Владыка Ледника', bonusStats: { int: 8, con: 4 }, specialSkill: 'Абсолютный Нуль', description: 'Холод в вашем сердце стал абсолютным.' },
  { raceId: 'toymaker', classId: 'grinch', newName: 'Потрошитель Подарков', bonusStats: { dex: 8, int: 4 }, specialSkill: 'Кошмарная Коробка', description: 'Плюшевый ужас, несущий смерть.' },
  { raceId: 'candleborn', classId: 'inquisitor', newName: 'Солнечный Палач', bonusStats: { cha: 6, str: 4 }, specialSkill: 'Очищающее Пламя', description: 'Ваш свет выжигает тьму до основания.' },
  { raceId: 'ice_spirit', classId: 'santa', newName: 'Дух Дарения', bonusStats: { wis: 6, con: 4 }, specialSkill: 'Застывшее Добро', description: 'Магия холода теперь защищает жизнь.' },
  { raceId: 'fir_spirit', classId: 'architect', newName: 'Страж Древней Рощи', bonusStats: { con: 8, wis: 4 }, specialSkill: 'Живой Бастион', description: 'Вы и лес — одно целое.' },
  { raceId: 'frostborn', classId: 'firefighter', newName: 'Тепловой Парадокс', bonusStats: { str: 5, con: 5 }, specialSkill: 'Пламя во Льду', description: 'Ваш огонь не тает, ваш лед не гаснет.' },
  { raceId: 'midnighter', classId: 'coal_master', newName: 'Обсидиановый Владыка', bonusStats: { int: 6, dex: 6 }, specialSkill: 'Тень Пепла', description: 'Вы правите мраком и гарью.' },
  { raceId: 'bellborn', classId: 'bell_bard', newName: 'Маэстро Душ', bonusStats: { cha: 8, wis: 4 }, specialSkill: 'Реквием Снега', description: 'Ваша музыка управляет биением сердец.' },
  { raceId: 'sugar_person', classId: 'confectioner', newName: 'Гурман Пиршества', bonusStats: { con: 6, str: 6 }, specialSkill: 'Сахарная Кома', description: 'Ваша сладость смертельна.' },
  { raceId: 'glass_golem', classId: 'masked', newName: 'Призматический Маг', bonusStats: { int: 10 }, specialSkill: 'Тысяча Отражений', description: 'Никто не знает, где вы настоящий.' },
  { raceId: 'shadow_weaver', classId: 'wrapper', newName: 'Вечный Тюремщик', bonusStats: { str: 4, int: 8 }, specialSkill: 'Нити Вечности', description: 'От вашей хватки невозможно уйти.' }
];

export const ARTIFACTS: Artifact[] = [
  { id: '1', name: 'Изначальная Свеча', description: 'Свеча первого огня.', effect: 'Рассеивает любую магическую тьму.', limitations: 'Требует веры.', worldImpact: 'Свет во тьме.' },
  { id: '2', name: 'Часы Полуночи', description: 'Замершее время.', effect: 'Остановка времени на короткий срок.', limitations: '-1 год жизни за использование.', worldImpact: 'Судьба.' },
  { id: '3', name: 'Корона Инея', description: 'Регалия владыки.', effect: 'Контроль над метелью.', limitations: 'Замораживает сердце носителя.', worldImpact: 'Власть.' }
];

export const MONSTERS: Monster[] = [
  {
    id: 'boss_midnight_king',
    name: 'Король Без-Праздника',
    threatLevel: 10,
    category: 'boss',
    description: 'Падший эльфийский владыка, чей взгляд обращает кровь в лед. Он восседает на Троне Стужи и ненавидит само понятие тепла.',
    behavior: 'Хладнокровен, атакует магией абсолютного нуля и призывает тени павших героев.',
    abilities: ['Дыхание Бездны', 'Заморозка Времени', 'Армия Теней'],
    role: 'Верховный правитель пустошей'
  },
  {
    id: 'boss_eternal_winter',
    name: 'Вечная Зима',
    threatLevel: 10,
    category: 'boss',
    description: 'Древний элементаль, воплощение самого Снежгарда. Гигантское существо из застывшего шторма и костей древних гигантов.',
    behavior: 'Атакует массовыми метелями и физической мощью ледяных лавин.',
    abilities: ['Зов Бури', 'Раскол Земли', 'Вечное Сияние Смерти'],
    role: 'Гнев природы'
  },
  {
    id: 'boss_midnight_shadow',
    name: 'Тень Полночи',
    threatLevel: 9,
    category: 'boss',
    description: 'Сгусток чистой тьмы, который обрел сознание. Она питается страхами тех, кто остался во тьме.',
    behavior: 'Скрытна, атакует из теней, сводит с ума шепотом.',
    abilities: ['Пожирание Света', 'Ментальный Раскол', 'Фазовый Скачок'],
    role: 'Ужас из темноты'
  },
  {
    id: 'elite_frost_giant',
    name: 'Ледяной Гигант-Налетчик',
    threatLevel: 8,
    category: 'elite',
    description: 'Огромный воин, чьи шаги вызывают землетрясения. Его кожа прочнее любой стали.',
    behavior: 'Прямолинеен, использует дубину из застывшей вечности.',
    abilities: ['Крушащий Удар', 'Рев Мороза'],
    role: 'Разрушитель стен'
  },
  {
    id: 'elite_valkyrie',
    name: 'Ледяная Валькирия',
    threatLevel: 7,
    category: 'elite',
    description: 'Крылатая дева, собирающая души тех, кто замерз в одиночестве.',
    behavior: 'Стремительна, атакует с воздуха ледяным копьем.',
    abilities: ['Пике Смерти', 'Ледяные Узы'],
    role: 'Жнец полей боя'
  },
  // ... Generating 40 more varied monsters
  ...Array.from({ length: 40 }).map((_, i) => {
    const level = Math.floor(i / 5) + 1;
    const isPack = i % 3 === 0;
    const names = ['Ледяной Сталкер', 'Снежный Волк', 'Осколочный Паразит', 'Инеевый Скелет', 'Теневой Призрак', 'Стеклянный Паук', 'Сахарный Демон', 'Угольный Дух'];
    const name = names[i % names.length] + ` (Ранг ${level})`;
    return {
      id: `m_gen_${i}`,
      name: name,
      threatLevel: level,
      category: level > 7 ? 'elite' : level > 4 ? 'miniboss' : isPack ? 'pack' : 'minor',
      description: 'Опасное порождение Полночи, блуждающее в поисках тепла.',
      behavior: 'Агрессивно реагирует на свет костров и живых существ.',
      abilities: ['Морозный укус', 'Замедление'],
      role: 'Рядовой противник'
    } as Monster;
  })
];
