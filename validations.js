import { body } from "express-validator";

export const loginValidation = [
  body("email", "Неверный формат почты").isEmail(),
  body("password", "Пароль должен минимум 5 символов").isLength({ min: 5 }),
];

export const registerValidation = [
  body("email", "Неверный формат почты").isEmail(),
  body("password", "Пароль должен минимум 5 символов").isLength({ min: 5 }),
  body("fullName", "Укажите имя").isLength({ min: 3 }),
  body("avatarUrl", "Неверный формат URL для аватара").optional().isURL(),
];

export const postCreateValidation = [
  body("title", "Введите заголовок статьи").isLength({ min: 3 }).isString(),
  body("text", "Введите текст статьи").isLength({ min: 3 }).isString(),
  body("tags", "Неверный формат тэгов (укажите массив)").optional().isArray(),
  body("tags.*", "Каждый тег должен быть строкой").optional().isString(),
  body("imageUrl", "Неверная ссылка на изображение").optional().isString(),
];

export const commentCreateValidation = [
  body("text", "Введите текст комментария").isLength({ min: 1 }),
  body("postId", "Неверный ID поста").isMongoId(),
];
