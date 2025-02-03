# Учебный проект по образцу qa-fintech

## Шаги

- установить WS
- создать новый проект typescript (автоматически будут созданы папки .idea  и 
src, также файлы .gitignore, package.json, tsconfig.json)
- создать README.md
- создать первый коммит
- создать репозиторий на github
- установить зависимости( @types/node, @types/chai, @types/mocha,
  allure-commandline, allure-mocha, axios, chai, mocha, prettier, ts-node,
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
- 

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
