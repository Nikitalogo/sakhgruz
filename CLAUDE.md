# САХГРУЗ — Контекст для Claude Code

## Читай PRD.md перед каждой задачей

## Стек
- Next.js 14 (App Router)
- Tailwind CSS + TypeScript
- Supabase (БД + Auth + Storage)
- Vercel (деплой)

## Цвета
- Акцент: #F97316 (оранжевый)
- Фон: #111827 (тёмный)
- Текст: #FFFFFF
- Карточки: #1F2937

## Правила кода
- Русский язык везде в интерфейсе
- Mobile-first всегда
- Все тексты, цены, контакты — только из Supabase
- Никогда не хардкодить номера телефонов и ссылки
- /admin/* маршруты — только для авторизованного владельца
- Неавторизованных редиректить на /admin/login
- После каждой задачи npm run build не должен падать
- Проверять входные данные перед записью в БД

## Контакты
- Все контакты хранятся в таблице settings в Supabase
- Владелец заполняет их через админку

## Логотип
- Файл: /public/logo.png

## Структура БД
- services: id, title, description, price, icon, order, visible
- photos: id, url, caption, category, created_at
- reviews: id, author, text, rating, source, visible, created_at
- settings: key (primary key), value
