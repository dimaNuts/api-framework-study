# Учебный проект по образцу qa-fintech

## Шаги

- установить WS
- создать новый проект typescript (автоматически будут созданы папки .idea  и 
src, также файлы .gitignore, package.json, tsconfig.json)
- создать README.md
- создать первый коммит
- создать репозиторий на github
- установить зависимости( @types/node, @types/chai(4.2.19!!!), @types/mocha,
  allure-commandline, allure-mocha, axios, chai(4.3.6!!!), mocha, prettier, ts-node,
  tslib)
- добавить скрипты "scripts": {
  "report": "allure generate ./allure-results -c && allure open",
  "testALL": "mocha tests/**/*.ts",
  "test": "mocha tests/demo_allure_test.ts"
  }
- настроить конфигурации тест-ранера "mocha": {
  "timeout": 20000,
  "retries": 0,
  "reporter": "node_modules/allure-mocha",
  "require": [ "node_modules/ts-node/register"] }
- создать файл конфигурации для инструмента Prettier .prettierrc.js
- создать директорию @types с базовыми типами, для дальнейшего использования
- создать директорию http, которая будет содержать клиент и методы для API
- добавить метод в класс Client, который собирает конфиг http клиента в Client.ts
- добавить метод в класс Client получения дочерним классом конфига в Client.ts
- создать класс с методами для основного API в файле CoreApi.ts
- добавить метод получения кота по id в CoreApi
- создать директорию для тестов test
- создать демо- тестов для CoreApi demo_test.ts

## Для запуска необходимо

- java 1.8+ для построения allure репорта
- node v14+ и npm соответствующей версии

## GIT

- добавить файлы в .gitignore

## Команды для git
### Инициализировать репозиторий
```text
git init
```
### Посмотреть статус репозитория
```text
git status
```
### Добавить изменения в индекс
```text
git add -A
```
### Закоммитить изменения
```text
git commit -m 'message'
```
### Посмотреть информацию о коммитах
```text
git log
```
### Добавить удаленный репозиторий
```text
git remote add origin https://github.com/dimaNuts/api-framework-study.git
```
### Запушить в удалённый репозиторий в первый раз
```text
git push -u origin master
```
### ВАЖНО
Продолжить работу над проектом в своем репозитории,
если скачан с гитхаба.
Это делается командой git remote add,
но делать её можно только на существующем репозитории,
так что вам понадобится ещё и git init.
Потом вам понадобится получить из репозитория
коммиты командой git fetch и
сделать git reset чтобы вносить свои изменения не с нуля,
а начиная с головы репозитория.
```text
git init
git remote add origin url_репозитория
git fetch origin
git reset --mixed origin/master
git add измененные файлы
git commit -m "комментарий к коммиту"
git push -u origin master
```
