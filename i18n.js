/* Shared UI catalog. Text is inserted through textContent, never HTML. */
(function () {
    'use strict';
    const catalog = [
  [
    "Overview",
    "Главная",
    "Übersicht"
  ],
  [
    "Map & Demo",
    "Карты и демо",
    "Karten & Demos"
  ],
  [
    "Team Colors",
    "Цвета команд",
    "Teamfarben"
  ],
  [
    "Media to Map",
    "Медиа в карту",
    "Medien zu Karte"
  ],
  [
    "Overview · DDNet Tools",
    "Главная · DDNet Tools",
    "Übersicht · DDNet Tools"
  ],
  [
    "Map & Demo Viewer · DDNet Tools",
    "Просмотр карт и демо · DDNet Tools",
    "Karten- & Demo-Viewer · DDNet Tools"
  ],
  [
    "Team Colors · DDNet Tools",
    "Цвета команд · DDNet Tools",
    "Teamfarben · DDNet Tools"
  ],
  [
    "Media to Map · DDNet Tools",
    "Медиа в карту · DDNet Tools",
    "Medien zu Karte · DDNet Tools"
  ],
  [
    "Main navigation",
    "Основная навигация",
    "Hauptnavigation"
  ],
  [
    "Language",
    "Язык",
    "Sprache"
  ],
  [
    "YOUR DDNET WORKSPACE",
    "ТВОИ ИНСТРУМЕНТЫ ДЛЯ DDNET",
    "DEINE DDNET-WERKZEUGE"
  ],
  [
    "Less setup.",
    "Меньше настроек.",
    "Weniger Aufwand."
  ],
  [
    "More",
    "Больше",
    "Mehr"
  ],
  [
    "possibilities.",
    "возможностей.",
    "Möglichkeiten."
  ],
  [
    "A small toolkit for a big playground. Explore maps, watch demos, and find your team's color — right in your browser.",
    "Инструменты для большого игрового мира. Изучай карты, смотри демо и выбирай цвет команды прямо в браузере.",
    "Ein kleines Toolkit für eine große Spielwelt. Erkunde Karten, sieh dir Demos an und finde deine Teamfarbe – direkt im Browser."
  ],
  [
    "Open the viewer",
    "Открыть просмотрщик",
    "Viewer öffnen"
  ],
  [
    "Explore tools ↓",
    "Все инструменты ↓",
    "Alle Werkzeuge ↓"
  ],
  [
    "DDNET / TOOLKIT",
    "DDNET / ИНСТРУМЕНТЫ",
    "DDNET / WERKZEUGE"
  ],
  [
    "A new perspective on your game.",
    "Новый взгляд на твою игру.",
    "Ein neuer Blick auf dein Spiel."
  ],
  [
    "THE TOOLBOX",
    "ИНСТРУМЕНТЫ",
    "WERKZEUGE"
  ],
  [
    "Pick your next move.",
    "Выбери, с чего начать.",
    "Wähle deinen nächsten Schritt."
  ],
  [
    "03 tools. Ready when you are.",
    "03 инструмента. Всё готово к работе.",
    "03 Werkzeuge. Bereit, wenn du es bist."
  ],
  [
    "MAPS & DEMOS",
    "КАРТЫ И ДЕМО",
    "KARTEN & DEMOS"
  ],
  [
    "Map & Demo Viewer",
    "Просмотр карт и демо",
    "Karten- & Demo-Viewer"
  ],
  [
    "Take a closer look. Open a map or replay a demo with the DDNet engine, directly in your browser.",
    "Открой карту или воспроизведи демо на движке DDNet прямо в браузере.",
    "Öffne eine Karte oder spiele eine Demo mit der DDNet-Engine ab – direkt im Browser."
  ],
  [
    "Launch viewer →",
    "Открыть просмотрщик →",
    "Viewer starten →"
  ],
  [
    "VISUALIZATION",
    "ВИЗУАЛИЗАЦИЯ",
    "VISUALISIERUNG"
  ],
  [
    "Every team has its own shade. Explore all 64 colors and compare the classic palette with the golden angle.",
    "У каждой команды свой оттенок. Изучи все 64 цвета и сравни классическую палитру с золотым углом.",
    "Jedes Team hat seinen eigenen Farbton. Entdecke alle 64 Farben und vergleiche die klassische Palette mit dem goldenen Winkel."
  ],
  [
    "Explore colors →",
    "Посмотреть цвета →",
    "Farben entdecken →"
  ],
  [
    "IMAGE & VIDEO CONVERTER",
    "КОНВЕРТЕР КАРТИНОК И ВИДЕО",
    "BILD- & VIDEOKONVERTER"
  ],
  [
    "Bring your own visuals into DDNet. Turn an image into a map or animate video frames with synchronized envelopes.",
    "Добавь свои изображения в DDNet. Преврати картинку в карту или анимируй видео через синхронизированные envelopes.",
    "Bringe eigene Bilder in DDNet. Wandle ein Bild in eine Karte um oder animiere Videoframes mit synchronisierten Envelopes."
  ],
  [
    "Image / Video → .map",
    "Картинка / Видео → .map",
    "Bild / Video → .map"
  ],
  [
    "Create a map →",
    "Создать карту →",
    "Karte erstellen →"
  ],
  [
    "No installation. Just open and explore.",
    "Без установки. Открой и пользуйся.",
    "Keine Installation. Einfach öffnen und loslegen."
  ],
  [
    "Powered by the DDNet community.",
    "Благодаря сообществу DDNet.",
    "Dank der DDNet-Community."
  ],
  [
    "/ Built for the community",
    "/ Создано для сообщества",
    "/ Für die Community entwickelt"
  ],
  [
    "Original project ↗",
    "Оригинальный проект ↗",
    "Originalprojekt ↗"
  ],
  [
    "01 / MAPS & DEMOS",
    "01 / КАРТЫ И ДЕМО",
    "01 / KARTEN & DEMOS"
  ],
  [
    "See the bigger",
    "Рассмотри всё",
    "Entdecke jedes"
  ],
  [
    "picture.",
    "в деталях.",
    "Detail."
  ],
  [
    "Load a local file to explore it with the DDNet engine.",
    "Выбери файл на устройстве, чтобы открыть его на движке DDNet.",
    "Wähle eine lokale Datei, um sie mit der DDNet-Engine zu öffnen."
  ],
  [
    "Open a map",
    "Открыть карту",
    "Karte öffnen"
  ],
  [
    "Explore a DDNet map in your browser.",
    "Просматривай карту DDNet в браузере.",
    "Erkunde eine DDNet-Karte im Browser."
  ],
  [
    "Choose a .map file",
    "Выбрать файл .map",
    ".map-Datei auswählen"
  ],
  [
    "or drop it here",
    "или перетащи сюда",
    "oder hierher ziehen"
  ],
  [
    "No file selected",
    "Файл не выбран",
    "Keine Datei ausgewählt"
  ],
  [
    "Open map ↗",
    "Открыть карту ↗",
    "Karte öffnen ↗"
  ],
  [
    "Play a demo",
    "Воспроизвести демо",
    "Demo abspielen"
  ],
  [
    "Replay a recorded DDNet session.",
    "Посмотри запись игры в DDNet.",
    "Sieh dir eine aufgezeichnete DDNet-Partie an."
  ],
  [
    "Choose a .demo file",
    "Выбрать файл .demo",
    ".demo-Datei auswählen"
  ],
  [
    "Play demo ↗",
    "Воспроизвести демо ↗",
    "Demo abspielen ↗"
  ],
  [
    "Files are opened locally. The engine downloads when you start the viewer.",
    "Файлы открываются локально. Движок загрузится при запуске просмотрщика.",
    "Dateien werden lokal geöffnet. Die Engine wird beim Start des Viewers geladen."
  ],
  [
    "DDNet Viewer",
    "Просмотрщик DDNet",
    "DDNet-Viewer"
  ],
  [
    "Open another file ↗",
    "Открыть другой файл ↗",
    "Andere Datei öffnen ↗"
  ],
  [
    "DDNet map and demo viewer",
    "Просмотр карт и демо DDNet",
    "DDNet-Karten- und Demo-Viewer"
  ],
  [
    "Desktop browser recommended. WebAssembly and browser threads are required.",
    "Рекомендуется браузер на компьютере. Нужна поддержка WebAssembly и браузерных потоков.",
    "Ein Desktop-Browser wird empfohlen. WebAssembly und Browser-Threads sind erforderlich."
  ],
  [
    "02 / VISUALIZATION",
    "02 / ВИЗУАЛИЗАЦИЯ",
    "02 / VISUALISIERUNG"
  ],
  [
    "Find your team's",
    "Найди свой",
    "Finde deine"
  ],
  [
    "color.",
    "цвет команды.",
    "Teamfarbe."
  ],
  [
    "64 teams. Two approaches. See how the golden angle changes the palette.",
    "64 команды. Два подхода. Посмотри, как золотой угол меняет палитру.",
    "64 Teams. Zwei Ansätze. Sieh dir an, wie der goldene Winkel die Palette verändert."
  ],
  [
    "CLASSIC PALETTE",
    "КЛАССИЧЕСКАЯ ПАЛИТРА",
    "KLASSISCHE PALETTE"
  ],
  [
    "Version 17.2 and older",
    "Версия 17.2 и старше",
    "Version 17.2 und älter"
  ],
  [
    "Evenly spaced hues",
    "Равномерное распределение оттенков",
    "Gleichmäßig verteilte Farbtöne"
  ],
  [
    "GOLDEN ANGLE",
    "ЗОЛОТОЙ УГОЛ",
    "GOLDENER WINKEL"
  ],
  [
    "Version 17.3 and newer",
    "Версия 17.3 и новее",
    "Version 17.3 und neuer"
  ],
  [
    "137.50776° between teams",
    "137,50776° между командами",
    "137,50776° zwischen den Teams"
  ],
  [
    "SORTED PALETTE",
    "ПАЛИТРА ПО ОТТЕНКАМ",
    "SORTIERTE PALETTE"
  ],
  [
    "Ordered by hue",
    "По цветовому тону",
    "Nach Farbton sortiert"
  ],
  [
    "Same colors. A different perspective.",
    "Те же цвета в другом порядке.",
    "Dieselben Farben. Eine andere Reihenfolge."
  ],
  [
    "Numbers identify teams.",
    "Числа обозначают номера команд.",
    "Die Zahlen kennzeichnen die Teams."
  ],
  [
    "About the golden angle update ↗",
    "Об обновлении с золотым углом ↗",
    "Über das Update zum goldenen Winkel ↗"
  ],
  [
    "03 / MEDIA TO MAP",
    "03 / МЕДИА В КАРТУ",
    "03 / MEDIEN ZU KARTE"
  ],
  [
    "Your media.",
    "Твои изображения.",
    "Deine Medien."
  ],
  [
    "A new",
    "Новое",
    "Eine neue"
  ],
  [
    " dimension.",
    "измерение.",
    "Dimension."
  ],
  [
    "dimension.",
    "измерение.",
    "Dimension."
  ],
  [
    "Turn an image or a video into a real DDNet map. Embedded textures, editable quads, and frame-perfect STEP envelopes.",
    "Преврати картинку или видео в карту DDNet. Встроенные текстуры, редактируемые квады и смена кадров через STEP envelopes.",
    "Verwandle ein Bild oder Video in eine DDNet-Karte. Eingebettete Texturen, bearbeitbare Quads und Framewechsel über STEP-Envelopes."
  ],
  [
    "Create your map",
    "Создай свою карту",
    "Erstelle deine Karte"
  ],
  [
    "Everything is processed on your device.",
    "Вся обработка происходит на твоём устройстве.",
    "Alles wird auf deinem Gerät verarbeitet."
  ],
  [
    "Choose an image or video",
    "Выбрать картинку или видео",
    "Bild oder Video auswählen"
  ],
  [
    "or drop a file here",
    "или перетащи файл сюда",
    "oder eine Datei hierher ziehen"
  ],
  [
    "Map layout",
    "Размещение на карте",
    "Platzierung auf der Karte"
  ],
  [
    "Full-screen background",
    "Фон на весь экран",
    "Bildschirmfüllender Hintergrund"
  ],
  [
    "Object inside the map",
    "Объект внутри карты",
    "Objekt innerhalb der Karte"
  ],
  [
    "Background is centered with 0/0 parallax, so it stays behind the player and covers the DDNet viewport. Proportions are preserved; edges may be cropped on different screens.",
    "Фон расположен по центру с параллаксом 0/0 и заполняет область просмотра DDNet. Пропорции сохраняются; на разных экранах края могут обрезаться.",
    "Der Hintergrund ist mit Parallaxe 0/0 zentriert und füllt den DDNet-Sichtbereich. Die Proportionen bleiben erhalten; je nach Bildschirm können die Ränder beschnitten werden."
  ],
  [
    "Texture quality · maximum edge",
    "Качество текстуры · максимальная сторона",
    "Texturqualität · maximale Kantenlänge"
  ],
  [
    "512 px · small file",
    "512 px · небольшой файл",
    "512 px · kleine Datei"
  ],
  [
    "Original · up to 4096 px",
    "Исходное · до 4096 px",
    "Original · bis zu 4096 px"
  ],
  [
    "Frames per second",
    "Кадров в секунду",
    "Bilder pro Sekunde"
  ],
  [
    "Playback",
    "Воспроизведение",
    "Wiedergabe"
  ],
  [
    "Synchronized loop",
    "Синхронное повторение",
    "Synchronisierte Schleife"
  ],
  [
    "Start (seconds)",
    "Начало (секунды)",
    "Start (Sekunden)"
  ],
  [
    "End (seconds)",
    "Конец (секунды)",
    "Ende (Sekunden)"
  ],
  [
    "Video only: audio is not exported. Every sampled frame is shown until the next frame. The last frame lasts until the selected end time.",
    "Звук видео не экспортируется. Каждый кадр отображается до следующего, а последний — до выбранного времени окончания.",
    "Die Audiospur wird nicht exportiert. Jeder Frame bleibt bis zum nächsten sichtbar; der letzte wird bis zum gewählten Ende angezeigt."
  ],
  [
    "Choose a file to see the export estimate.",
    "Выбери файл, чтобы увидеть параметры экспорта.",
    "Wähle eine Datei, um die Exportdaten zu sehen."
  ],
  [
    "Create .map ↗",
    "Создать .map ↗",
    ".map erstellen ↗"
  ],
  [
    "SOURCE PREVIEW",
    "ПРЕДПРОСМОТР ИСХОДНИКА",
    "QUELLVORSCHAU"
  ],
  [
    "No media selected",
    "Файл не выбран",
    "Keine Medien ausgewählt"
  ],
  [
    "From your screen",
    "С твоего экрана",
    "Von deinem Bildschirm"
  ],
  [
    "to your map.",
    "на твою карту.",
    "auf deine Karte."
  ],
  [
    "Choose a file to get started.",
    "Выбери файл, чтобы начать.",
    "Wähle eine Datei, um zu beginnen."
  ],
  [
    "Selected image preview",
    "Предпросмотр выбранной картинки",
    "Vorschau des ausgewählten Bildes"
  ],
  [
    "HOW IT WORKS",
    "КАК ЭТО РАБОТАЕТ",
    "SO FUNKTIONIERT ES"
  ],
  [
    "Made for the DDNet editor.",
    "Для редактора карт DDNet.",
    "Für den DDNet-Karteneditor."
  ],
  [
    "By default, images become full-screen backgrounds, centered with 0/0 parallax. High-resolution video frames use exact-size textures; smaller frames are packed into atlases, with one synchronized Color Envelope per frame. STEP curves switch visibility without blending.",
    "По умолчанию создаётся полноэкранный фон с параллаксом 0/0. Кадры высокого разрешения сохраняются отдельными текстурами, небольшие кадры собираются в атласы. Для каждого кадра создаётся синхронизированный Color Envelope. Кривая STEP переключает кадры без смешивания.",
    "Standardmäßig entsteht ein bildschirmfüllender Hintergrund mit Parallaxe 0/0. Hochauflösende Frames werden als einzelne Texturen gespeichert; kleinere Frames werden in Atlanten gepackt. Jeder Frame erhält ein synchronisiertes Color Envelope. STEP-Kurven schalten die Sichtbarkeit ohne Überblendung um."
  ],
  [
    "Background exports contain only the visible media and a minimal game layer. Object mode also includes a visible platform. Open the map in the editor to move the media, change envelopes, or build around it.",
    "В режиме фона карта содержит изображение и минимальный игровой слой. В режиме объекта добавляется видимая платформа. Открой карту в редакторе, чтобы переместить изображение, изменить envelopes или дополнить карту.",
    "Im Hintergrundmodus enthält die Karte die Medien und eine minimale Spielebene. Im Objektmodus kommt eine sichtbare Plattform hinzu. Öffne die Karte im Editor, um die Medien zu verschieben, Envelopes zu ändern oder weiterzubauen."
  ],
  [
    "Frames processed",
    "Обработано кадров",
    "Verarbeitete Frames"
  ],
  [
    "Choose an image or a video to get started.",
    "Выбери картинку или видео, чтобы начать.",
    "Wähle ein Bild oder Video, um zu beginnen."
  ],
  [
    "Cancel conversion",
    "Отменить конвертацию",
    "Konvertierung abbrechen"
  ],
  [
    "Download .map ↓",
    "Скачать .map ↓",
    ".map herunterladen ↓"
  ],
  [
    "Up to 600 frames · 64 textures · 512 MiB texture memory. Lower FPS and resolution for smaller maps. Animated images export as a still frame.",
    "До 600 кадров · 64 текстуры · 512 МиБ памяти текстур. Уменьши FPS и разрешение для меньшего размера карты. Анимированные изображения сохраняются как один кадр.",
    "Bis zu 600 Frames · 64 Texturen · 512 MiB Texturspeicher. Weniger FPS und eine niedrigere Auflösung ergeben kleinere Karten. Animierte Bilder werden als Einzelbild exportiert."
  ],
  [
    "Ready to create your map.",
    "Всё готово для создания карты.",
    "Bereit zum Erstellen deiner Karte."
  ],
  [
    "The browser could not decode this media. Try PNG/JPEG, MP4 (H.264), or WebM.",
    "Браузер не смог прочитать файл. Попробуй PNG/JPEG, MP4 (H.264) или WebM.",
    "Der Browser konnte die Datei nicht dekodieren. Versuche PNG/JPEG, MP4 (H.264) oder WebM."
  ],
  [
    "Conversion cancelled.",
    "Конвертация отменена.",
    "Konvertierung abgebrochen."
  ],
  [
    "Media decoding timed out. Try a shorter clip or another encoding.",
    "Истекло время чтения файла. Попробуй более короткий отрезок или другой кодек.",
    "Zeitüberschreitung beim Dekodieren. Versuche einen kürzeren Clip oder einen anderen Codec."
  ],
  [
    "Choose an image or video first.",
    "Сначала выбери картинку или видео.",
    "Wähle zuerst ein Bild oder Video."
  ],
  [
    "Choose a valid start and end within the video duration.",
    "Укажи начало и конец в пределах длительности видео.",
    "Wähle einen gültigen Start- und Endzeitpunkt innerhalb des Videos."
  ],
  [
    "FPS must be a whole number from 1 to 60.",
    "FPS должен быть целым числом от 1 до 60.",
    "FPS muss eine ganze Zahl zwischen 1 und 60 sein."
  ],
  [
    "The selected file is empty.",
    "Выбранный файл пуст.",
    "Die ausgewählte Datei ist leer."
  ],
  [
    "Choose an image or a video file.",
    "Выбери файл картинки или видео.",
    "Wähle eine Bild- oder Videodatei."
  ],
  [
    "Reading media…",
    "Чтение файла…",
    "Medien werden gelesen…"
  ],
  [
    "The video has no usable duration or frames.",
    "Не удалось определить длительность или кадры видео.",
    "Dauer oder Frames des Videos konnten nicht ermittelt werden."
  ],
  [
    "The image could not be decoded.",
    "Не удалось прочитать картинку.",
    "Das Bild konnte nicht dekodiert werden."
  ],
  [
    "This browser does not support CompressionStream. Use a current Chrome, Firefox, or Safari.",
    "Браузер не поддерживает CompressionStream. Используй актуальную версию Chrome, Firefox или Safari.",
    "Dieser Browser unterstützt CompressionStream nicht. Verwende eine aktuelle Version von Chrome, Firefox oder Safari."
  ],
  [
    "Writing map layers and envelopes…",
    "Запись слоёв карты и envelopes…",
    "Kartenebenen und Envelopes werden geschrieben…"
  ],
  [
    "Conversion cancelled. You can change settings and try again.",
    "Конвертация отменена. Можно изменить настройки и повторить.",
    "Konvertierung abgebrochen. Du kannst die Einstellungen ändern und es erneut versuchen."
  ],
  [
    "The map exceeds the DATA format size limit.",
    "Размер карты превышает ограничение формата DATA.",
    "Die Karte überschreitet die Größenbegrenzung des DATA-Formats."
  ],
  [
    "Use a valid source, 1–60 FPS, a 64–4096 px resolution, and a clip up to 600 seconds.",
    "Выбери корректный файл, 1–60 FPS, разрешение 64–4096 px и отрезок до 600 секунд.",
    "Wähle eine gültige Quelldatei, 1–60 FPS, 64–4096 px Auflösung und einen Clip von höchstens 600 Sekunden."
  ],
  [
    "{count} frames requested. Use at most 600 frames: reduce FPS or shorten the clip.",
    "Запрошено кадров: {count}. Допустимо не более 600: уменьши FPS или сократи отрезок.",
    "Angeforderte Frames: {count}. Höchstens 600 sind erlaubt: Verringere die FPS oder kürze den Clip."
  ],
  [
    "This clip needs too much texture memory. Lower the resolution, FPS, or duration (512 MiB / 64 textures maximum).",
    "Недостаточно памяти текстур. Уменьши разрешение, FPS или длительность (максимум 512 МиБ / 64 текстуры).",
    "Dieser Clip benötigt zu viel Texturspeicher. Verringere Auflösung, FPS oder Dauer (maximal 512 MiB / 64 Texturen)."
  ],
  [
    "The clip is too short for this frame rate.",
    "Отрезок слишком короткий для выбранного FPS.",
    "Der Clip ist für diese Bildrate zu kurz."
  ],
  [
    "Invalid atlas order or pixel data.",
    "Некорректный порядок атласов или данные пикселей.",
    "Ungültige Atlasreihenfolge oder Pixeldaten."
  ],
  [
    "Some animation frames are missing.",
    "Отсутствуют некоторые кадры анимации.",
    "Einige Animationsframes fehlen."
  ],
  [
    "{width} × {height} · {duration} seconds · video",
    "{width} × {height} · {duration} с · видео",
    "{width} × {height} · {duration} Sekunden · Video"
  ],
  [
    "{width} × {height} · still image",
    "{width} × {height} · картинка",
    "{width} × {height} · Einzelbild"
  ],
  [
    "{width} × {height} px · frames: {count} · textures: {textures} · {memory} MiB texture memory · {placement}{loop}",
    "{width} × {height} px · кадров: {count} · текстур: {textures} · {memory} МиБ памяти текстур · {placement}{loop}",
    "{width} × {height} px · Frames: {count} · Texturen: {textures} · {memory} MiB Texturspeicher · {placement}{loop}"
  ],
  [
    "map object",
    "объект на карте",
    "Kartenobjekt"
  ],
  [
    "full-screen background",
    "полноэкранный фон",
    "bildschirmfüllender Hintergrund"
  ],
  [
    " · {seconds} s loop",
    " · повтор каждые {seconds} с",
    " · Schleife: {seconds} s"
  ],
  [
    "Capturing frame {current} / {total}…",
    "Извлечение кадра {current} / {total}…",
    "Frame {current} / {total} wird erfasst…"
  ],
  [
    "Compressing atlas {current} / {total}…",
    "Сжатие текстуры {current} / {total}…",
    "Textur {current} / {total} wird komprimiert…"
  ],
  [
    "Map ready · {size} MiB · frames: {count}{animation}. Download and open it in the DDNet editor.",
    "Карта готова · {size} МиБ · кадров: {count}{animation}. Скачай и открой её в редакторе DDNet.",
    "Karte fertig · {size} MiB · Frames: {count}{animation}. Lade sie herunter und öffne sie im DDNet-Editor."
  ],
  [
    " · synchronized looping STEP envelopes",
    " · синхронизированные циклические STEP envelopes",
    " · synchronisierte STEP-Envelopes in Schleife"
  ],
  [
    "Engine ready. Click the viewer to interact.",
    "Движок готов. Нажми на область просмотра для управления.",
    "Engine bereit. Klicke in den Viewer, um ihn zu bedienen."
  ],
  [
    "Engine initialized. Opening your file…",
    "Движок запущен. Открытие файла…",
    "Engine initialisiert. Datei wird geöffnet…"
  ],
  [
    "The DDNet engine could not start. Reload the page to try again in a desktop browser.",
    "Не удалось запустить движок DDNet. Перезагрузи страницу в браузере на компьютере.",
    "Die DDNet-Engine konnte nicht gestartet werden. Lade die Seite in einem Desktop-Browser neu."
  ],
  [
    "Browser threads are not ready. Wait a moment and reload this page. Use HTTPS or localhost in a browser with WebAssembly threads support.",
    "Браузерные потоки ещё не готовы. Подожди и обнови страницу. Используй HTTPS или localhost и браузер с поддержкой потоков WebAssembly.",
    "Browser-Threads sind noch nicht bereit. Warte kurz und lade die Seite neu. Nutze HTTPS oder localhost und einen Browser mit WebAssembly-Threads."
  ],
  [
    "Downloading the DDNet engine. The first launch may take a moment…",
    "Загрузка движка DDNet. Первый запуск может занять некоторое время…",
    "Die DDNet-Engine wird geladen. Der erste Start kann etwas dauern…"
  ],
  [
    "Engine download failed. Reload the page and try again.",
    "Не удалось загрузить движок. Обнови страницу и повтори попытку.",
    "Die Engine konnte nicht geladen werden. Lade die Seite neu und versuche es erneut."
  ],
  [
    "Choose a .{kind} file first.",
    "Сначала выбери файл .{kind}.",
    "Wähle zuerst eine .{kind}-Datei."
  ],
  [
    "This tool needs a .{kind} file.",
    "Для этого инструмента нужен файл .{kind}.",
    "Dieses Werkzeug benötigt eine .{kind}-Datei."
  ],
  [
    "This file is empty. Choose another file.",
    "Этот файл пуст. Выбери другой.",
    "Diese Datei ist leer. Wähle eine andere Datei."
  ],
  [
    "This file could not be read. Please select it again.",
    "Не удалось прочитать файл. Выбери его ещё раз.",
    "Diese Datei konnte nicht gelesen werden. Wähle sie erneut aus."
  ],
  [
    "Reading {name}…",
    "Чтение файла {name}…",
    "Datei {name} wird gelesen…"
  ],
  [
    "Downloading map…",
    "Загрузка карты…",
    "Karte wird geladen…"
  ],
  [
    "Could not download the map. Check the link or choose a local file. {error}",
    "Не удалось загрузить карту. Проверь ссылку или выбери локальный файл. {error}",
    "Die Karte konnte nicht geladen werden. Prüfe den Link oder wähle eine lokale Datei. {error}"
  ],
  [
    "Empty map",
    "Пустая карта",
    "Leere Karte"
  ]
];
    const exact = new Map(catalog.map(([en, ru, de]) => [en, { en, ru, de }]));
    const escape = value => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const patterns = catalog.filter(([en]) => en.includes('{')).map(([en, ru, de]) => {
        const names = [];
        const parts = en.split(/(\{[a-zA-Z]+\})/g).map(part => {
            if (/^\{[a-zA-Z]+\}$/.test(part)) { names.push(part.slice(1, -1)); return '(.*?)'; }
            return escape(part);
        });
        return { regex: new RegExp('^' + parts.join('') + '$'), names, values: { en, ru, de } };
    });
    const supported = ['en', 'ru', 'de'];
    let saved;
    try { saved = localStorage.getItem('ddnet-tools-language'); } catch (_) { /* Private browsing can block storage. */ }
    let language = supported.includes(saved) ? saved : (navigator.languages || [navigator.language]).map(value => value.split('-')[0]).find(value => supported.includes(value)) || 'en';
    const textState = new WeakMap(), attrState = new WeakMap(), bound = new Map();
    function translate(source) {
        if (typeof source !== 'string') return String(source);
        const entry = exact.get(source);
        if (entry) return entry[language];
        for (const pattern of patterns) {
            const match = source.match(pattern.regex);
            if (!match) continue;
            const params = Object.fromEntries(pattern.names.map((key, i) => [key, match[i + 1]]));
            return pattern.values[language].replace(/\{([a-zA-Z]+)\}/g, (_, key) => params[key]);
        }
        return source;
    }
    function format(key, params = {}) {
        return translate(key).replace(/\{([a-zA-Z]+)\}/g, (match, name) => name in params ? translate(String(params[name])) : match);
    }
    function text(target, key, params = {}) {
        const element = typeof target === 'string' ? document.getElementById(target) : target;
        if (!element) return;
        bound.set(element, { key, params });
        element.dataset.i18nBound = '';
        const value = format(key, params);
        if (element.textContent !== value) element.textContent = value;
    }
    function apply(root = document.documentElement) {
        if (!root) return;
        const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
        while (walker.nextNode()) {
            const node = walker.currentNode, parent = node.parentElement;
            if (!parent || parent.closest('script,style,code,pre,canvas,[data-i18n-bound],[data-language-selector]')) continue;
            const previous = textState.get(node);
            const source = previous && node.nodeValue === previous.last ? previous.source : node.nodeValue;
            const trimmed = source.trim();
            if (!trimmed) continue;
            const value = source.replace(trimmed, translate(trimmed));
            textState.set(node, { source, last: value });
            if (node.nodeValue !== value) node.nodeValue = value;
        }
        for (const element of root.querySelectorAll('[aria-label],[alt],[title]')) {
            if (element.closest('[data-language-selector]')) continue;
            const state = attrState.get(element) || {};
            for (const attr of ['aria-label', 'alt', 'title']) {
                if (!element.hasAttribute(attr)) continue;
                const current = element.getAttribute(attr), previous = state[attr];
                const source = previous && current === previous.last ? previous.source : current;
                const value = translate(source); state[attr] = { source, last: value };
                if (current !== value) element.setAttribute(attr, value);
            }
            attrState.set(element, state);
        }
    }
    function setLanguage(value) {
        if (!supported.includes(value)) return;
        language = value;
        try { localStorage.setItem('ddnet-tools-language', value); } catch (_) { /* Session still works. */ }
        document.documentElement.lang = language;
        const selector = document.getElementById('site-language');
        if (selector) { selector.value = language; selector.setAttribute('aria-label', translate('Language')); }
        for (const [element, state] of bound) {
            if (!element.isConnected) { bound.delete(element); continue; }
            const value = format(state.key, state.params);
            if (element.textContent !== value) element.textContent = value;
        }
        apply();
        window.dispatchEvent(new CustomEvent('languagechange', { detail: { language } }));
    }
    window.I18n = { translate, format, text, setLanguage, get language() { return language; } };
    document.documentElement.lang = language;
    function init() {
        const header = document.querySelector('.topbar');
        if (header) {
            const wrapper = document.createElement('div'); wrapper.className = 'language-selector'; wrapper.dataset.languageSelector = '';
            const select = document.createElement('select'); select.id = 'site-language';
            for (const [value, label] of [['en', 'English'], ['ru', 'Русский'], ['de', 'Deutsch']]) {
                const option = document.createElement('option'); option.value = value; option.textContent = label; select.appendChild(option);
            }
            select.addEventListener('change', () => setLanguage(select.value)); wrapper.appendChild(select);
            header.insertBefore(wrapper, header.querySelector('.github'));
        }
        setLanguage(language);
        let queued = false;
        new MutationObserver(() => {
            if (queued) return;
            queued = true; queueMicrotask(() => { queued = false; apply(); });
        }).observe(document.documentElement, { subtree: true, childList: true, characterData: true });
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
    else init();
})();
