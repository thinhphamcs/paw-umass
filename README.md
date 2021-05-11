Prerequisites: [Nodejs](https://nodejs.org/en/) and [XAMPP](https://www.apachefriends.org/index.html)

1. Checkout files with `git clone https://github.com/thinhphamcs/paw-umass.git && cd paw-umass`

2. Build all dependencies with `npm install` which will install:

```
"@stripe/react-stripe-js": "^1.4.0",
"@stripe/stripe-js": "^1.14.0",
"axios": "^0.21.1",
"bcryptjs": "^2.4.3",
"body-parser": "^1.19.0",
"bootstrap": "^4.6.0",
"concurrently": "^5.3.0",
"cookie-parser": "^1.4.5",
"cors": "^2.8.5",
"cryptr": "^6.0.2",
"dotenv": "^8.2.0",
"express": "^4.17.1",
"express-fileupload": "^1.2.1",
"http-proxy-middleware": "^1.0.6",
"jsonwebtoken": "^8.5.1",
"multer": "^1.4.2",
"mysql": "^2.18.1",
"nodemon": "^2.0.7",
"react-bootstrap": "^1.5.2",
"react-icons": "^4.1.0",
"react-router-dom": "^5.2.0",
"react-timeago": "^5.2.0",
"react-transition-group": "^4.4.1",
"stripe": "^8.145.0"
```

3. If package.json is missing please contact me at `phamtuongthinh@gmail.com`

4. Build and run both server and client with `npm run dev`

5. APIs: \
    Choose:
    ```
     http://localhost:#/
    ```
    Sign up:
    ```
     http://localhost:#/signup/
    ```
    Login:
    ```
     http://localhost:#/login/
    ```
    Forgot:
    ```
     http://localhost:#/forgot/
    ```
    Home:
    ```
     http://localhost:#/home/
    ```
    reset:
    ```
     http://localhost:#/reset/
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
