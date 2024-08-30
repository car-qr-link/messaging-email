# Сервис сообщений - E-Mail

Отвечает за отправку сообщений и уведомлений по электронной почте с использованием сервиса Unisender Go.

Имя пакета: `@car-qr-link/messaging-sms`

## Используемые технологии, библиотеки

- [unisender-ts](https://github.com/zhelvis/unisender-ts)
- [Redis](https://redis.io)
- [Joi](https://joi.dev)
- [Pino](https://github.com/pinojs/pino)
- [dotenv](https://github.com/motdotla/dotenv)

## Настройки

Для настройки используются переменные окружения:

| Название        | Описание                                                  | По умолчанию                                       |
| --------------- | --------------------------------------------------------- | -------------------------------------------------- |
| `BROKER_URL`    | URL брокера сообщений                                     | `redis://localhost:6379/0`                         |
| `SEND_QUEUE`    | Имя очереди для отправки сообщений                        | `messages:send:email`                              |
| `RECEIVE_QUEUE` | Имя очереди для полученных сообщений                      | `messages:received`                                |
| `GATEWAY_URL`   | Адрес сервера Unisender Go с API-ключом в качестве пароля | `https://go1.unisender.ru/ru/transactional/api/v1` |

## Входящие взаимодействия

Сервис принимает сообщения `SendMessage` из очереди `SEND_QUEUE` и включает текст сообщения в [шаблон](./assets/notification.html) с дальнейшей отправкой на указанный адрес.

## Исходящие взаимодействия

Входящие взаимодействия не предусмотрены.
