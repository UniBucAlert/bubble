# Bubble

<div width="60%" margin="auto">
    <div width="70%">
    <img src="assets/react-logo.png" alt="react" height="60" /> &nbsp;&nbsp;&nbsp;&nbsp;
    <img src="assets/react-admin.png" alt="react-admin" height="60" /> &nbsp;&nbsp;&nbsp;&nbsp;
    <img src="assets/typescript.png" alt="typescript" height="60" /> &nbsp;&nbsp;&nbsp;&nbsp;
    </div>
</div>
</br>
<div>
<img src="assets/firebase.png" alt="firebase" height="60" />&nbsp;
<img src="assets/fastapi-logo.png" alt="fastapi" height="60"/> &nbsp;
<img src="assets/postgres.png" alt="porstgres" height="60" /> &nbsp;
<img src="assets/sql-alchemy.png" alt="sql-alchemy" height="60" />
</div>


## What is Bubble?
Instant messaging platforms are everywhere. And you’ve probably seen someone typing a message and wondered *“what are they typing?”*.

***Bubble*** is an instant messaging platform that actually enables **real-time** exchange of text messages. 

In other words, ***Bubble*** is all about **live texting**, reproducing a normal conversation in the online setting. 

The user will, therefore, see exactly what the response is, ever since the interlocutor types its first character.


## Who made Bubble?
- [Ciaușu Nicoleta](https://github.com/mehanix/)
- [Preda Mihai-Dragoș](https://github.com/PredaMihaiDragos/)
- [Radu Ștefan-Octavian](https://github.com/Stefan-Radu/)
- [Tudor Raluca](https://github.com/ralucatudor)
- [Țifui Alexandru](https://github.com/tifui-alexandru)


## Features

- **[FastAPI](https://fastapi.tiangolo.com/)** with Python 3.8
    - JWT authentication using [OAuth2 "password
    flow"](https://fastapi.tiangolo.com/tutorial/security/simple-oauth2/) and
    PyJWT
- **[React](https://reactjs.org/)** (with Typescript)
    - [react-router v5](https://reacttraining.com/react-router/) to handle routing
- **[PostgreSQL](https://www.postgresql.org/)** for the database
- **[SqlAlchemy](https://www.sqlalchemy.org/)** for ORM
- **[Alembic](https://alembic.sqlalchemy.org/en/latest/)** for database migrations
- **[Pytest](https://docs.pytest.org/en/latest/)** for backend tests
- **[Prettier](https://prettier.io/)**/**[ESLint](https://eslint.org/)** (Airbnb style guide)
- **[Docker Compose](https://docs.docker.com/compose/)** for easier development
- **[Nginx](https://www.nginx.com/)** as a reverse proxy to allow backend and frontend on the same port
- **[MaterialUI](https://material-ui.com/)** for styling
- **[react-admin](https://github.com/marmelab/react-admin)** for the admin dashboard
- **[Cloud Firestore](https://firebase.google.com/docs/firestore/)** for chat storage & syncing

## UML Use Case Diagram 

![UML Diagram](https://raw.githubusercontent.com/UniBucAlert/bubble/main/Bubble%20UML%20diagram.png)

## Project requirements
- **[user stories](https://github.com/UniBucAlert/bubble/issues?q=label%3A%22User+Story%22+)** (min 10) - 17 in total, [backlog creation](https://github.com/UniBucAlert/bubble/issues) - 2p ✅
- **design/arhitectura/UML** - 2p - TODO
- **source control** ([branch creation](https://github.com/UniBucAlert/bubble/branches), [merge/rebase](https://github.com/UniBucAlert/bubble/network), [min 10 commits](https://github.com/UniBucAlert/bubble/commits/main)) - ~100 commits in over 10 branches - 2p ✅
- **[automatic testing](https://github.com/UniBucAlert/bubble/tree/main/bubble/backend/app/api/api_v1/routers/tests)** - minim 5 - over 15 tests only for the api (7 written/edited by us, the rest from the boilerplate) - 3p ✅
- **[bug reporting](https://github.com/UniBucAlert/bubble/issues?q=label%3Abug+)** - 1p ✅
- **build tool** - used npm build tool to compress and make everything ready for deployment - 1p ✅
- **[refactoring](https://github.com/UniBucAlert/bubble/commit/e36920ccca081f26a1333394c992ef115dc6b85a)** (min 1), code standards - used PEP8 standard for Python3 and ESLint standard for Typescript / Javascript - 1p ✅
- **design patterns** - MVC for the backend and React Functional for the front - 1p - ✅
