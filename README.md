Prerequisites: [Nodejs](https://nodejs.org/en/) and [XAMPP](https://www.apachefriends.org/index.html)

1. Checkout files with `git clone https://github.com/thinhphamcs/paw-umass.git && cd paw-umass`

2. Build all dependencies with `npm install` which will install:

```
"axios": "^0.21.1",
"bcryptjs": "^2.4.3",
"body-parser": "^1.19.0",
"concurrently": "^5.3.0",
"cookie-parser": "^1.4.5",
"cors": "^2.8.5",
"cryptr": "^6.0.2",
"dotenv": "^8.2.0",
"express": "^4.17.1",
"express-fileupload": "^1.2.1",
"http-proxy-middleware": "^1.0.6",
"jsonwebtoken": "^8.5.1",
"mysql": "^2.18.1",
"nodemon": "^2.0.7",
"react-bootstrap": "^1.5.0",
"react-icons": "^4.1.0",
"react-router-dom": "^5.2.0"
```

3. If package.json is missing please contact me at `phamtuongthinh@gmail.com`

4. Build and run both server and client with `npm run dev`

5. APIs: \
    Sign up:
    ```
     http://localhost:#/signup/
    ```
    Login:
    ```
     http://localhost:#/login/
    ```
    Home:
    ```
     http://localhost:#/home/
    ```
    reset:
    ```
     http://localhost:#/reset/
    ```
    forgot:
    ```
     http://localhost:#/forgot/
    ```
    profile:
    ```
     http://localhost:#/profile/
    ```
    submit:
    ```
     http://localhost:#/submit/
    ```
    donate:
    ```
     http://localhost:#/donate/
    ```