# Blog Backend

Бэкенд для блога, разработанный на Node.js с использованием Express.js и MongoDB. Проект предоставляет пользователям функционал регистрации, управления постами, комментариями и взаимодействия с контентом.

## 📋 Содержание
- [Основные возможности](#основные-возможности)
- [Используемые технологии](#используемые-технологии)
- [Быстрый старт](#быстрый-старт)
  - [Установка](#установка)
  - [Настройка окружения](#настройка-окружения)
  - [Запуск проекта](#запуск-проекта)
- [API Маршруты](#api-маршруты)
  - [Аутентификация](#аутентификация)
  - [Посты](#посты)
  - [Комментарии](#комментарии)
  - [Загрузка файлов](#загрузка-файлов)
- [Примечания](#примечания)
- [Контрибьюция](#контрибьюция)
- [Лицензия](#лицензия)

## 📌 Основные возможности
- Регистрация и авторизация пользователей с использованием JWT.
- CRUD-операции для постов (создание, чтение, обновление, удаление).
- Добавление комментариев и управление ими.
- Лайки к комментариям.
- Загрузка изображений для постов.

## 🛠️ Используемые технологии
- **Node.js & Express.js** — для создания и обработки REST API.
- **MongoDB** — NoSQL база данных для хранения информации о пользователях, постах и комментариях.
- **JWT (JSON Web Tokens)** — для безопасной аутентификации пользователей.
- **Multer** — для обработки загрузки файлов, таких как изображения.
- **bcrypt** — для безопасного хеширования паролей.

## 🚀 Быстрый старт

### Установка
1. Склонируйте репозиторий:

   ```bash
   git clone https://github.com/dblgq/Blog-backend.git
   ```

2. Перейдите в папку проекта:

   ```bash
   cd Blog-backend
   ```

3. Установите необходимые зависимости:

   ```bash
   npm install
   ```

### Настройка окружения
1. Создайте файл `.env` в корневой папке проекта и добавьте в него следующие переменные:

   ```env
   MONGODB_URL=your_mongodb_connection_string
   PORT=4444
   JWT_SECRET=your_jwt_secret_key
   ```

   - `MONGODB_URL`: строка подключения к вашей базе данных MongoDB.
   - `PORT`: порт, на котором будет запущен сервер (по умолчанию 4444).
   - `JWT_SECRET`: секретный ключ для генерации JWT токенов.

### Запуск проекта
1. Запустите сервер:

   ```bash
   npm start
   ```

2. Сервер будет доступен по адресу `http://localhost:4444` (или по порту, указанному в `.env` файле).

## 📚 API Маршруты

### Аутентификация
- `POST /auth/register` — Регистрация нового пользователя.
- `POST /auth/login` — Авторизация пользователя.
- `GET /auth/me` — Получение информации о текущем пользователе.

### Посты
- `GET /posts` — Получение всех постов.
- `GET /posts/tags` — Получение списка тегов из последних постов.
- `GET /posts/:id` — Получение конкретного поста по ID.
- `POST /posts` — Создание нового поста (требуется авторизация).
- `DELETE /posts/:id` — Удаление поста (требуется авторизация).
- `PATCH /posts/:id` — Обновление поста (требуется авторизация).

### Комментарии
- `POST /comments` — Добавление комментария к посту (требуется авторизация).
- `GET /posts/:id/comments` — Получение комментариев к посту по ID.
- `PATCH /comments/:id/` — Лайк комментария (требуется авторизация).
- `DELETE /comments/:id` — Удаление комментария (требуется авторизация).

### Загрузка файлов
- `POST /upload` — Загрузка изображений (требуется авторизация).

## ⚠️ Примечания
- **Безопасность**: Держите все чувствительные данные, такие как `JWT_SECRET` и строка подключения к базе данных, вне публичного доступа, используя `.env` файл.
- **Тестирование**: На данный момент в проекте отсутствуют автоматические тесты. Рекомендуется добавить тесты для стабильной работы API.

## 🤝 Контрибьюция
Будем рады вашим предложениям и улучшениям! Если у вас есть идеи, создайте `issue` или `pull request`. Приветствуется любой вклад в развитие проекта.

## 📄 Лицензия
Проект распространяется под лицензией MIT. Полные условия использования можно найти в файле [LICENSE](./LICENSE).

---

⭐️ Если вам нравится этот проект, поставьте звезду на GitHub, чтобы поддержать его развитие!