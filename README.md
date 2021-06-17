Prerequisites: [Nodejs](https://nodejs.org/en/) and [XAMPP](https://www.apachefriends.org/index.html)

1. Checkout files with `git clone https://github.com/thinhphamcs/paw-umass.git && cd paw-umass`

2. Build all dependencies with `npm install` which will install:

```
"@stripe/react-stripe-js": "^1.4.0",
"@stripe/stripe-js": "^1.14.0",
"apollo-server": "^2.24.0",
"aws-sdk": "^2.919.0",
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
"graphql": "^15.5.0",
"http-proxy-middleware": "^1.0.6",
"jsonwebtoken": "^8.5.1",
"jwt-decode": "^3.1.2",
"multer": "^1.4.2",
"mysql": "^2.18.1",
"mysql2": "^2.2.5",
"react-bootstrap": "^1.5.2",
"react-icons": "^4.1.0",
"react-router-dom": "^5.2.0",
"react-timeago": "^5.2.0",
"react-transition-group": "^4.4.1",
"sequelize": "^6.6.2",
"sequelize-cli": "^6.2.0",
"stripe": "^8.145.0"
```

3. There is a problem with GraphQL File Upload, when executed the server will immediately crashed. So the temp solutions:
```
1. Delete the previous node_modules folder

2. Add "resolutions" to package.json script under "main"
"resolutions": {
    "fs-capacitor": "^6.2.0",
    "graphql-upload": "^11.0.0"
},

3. Add "preinstall" inside "scripts"
"preinstall": "npx npm-force-resolutions"

4. Run "npm install" again. DO NOT RUN "npm audit fix" after install since it will override the resolutions and preinstall.
```

4. If package.json is missing / problems above still does not fix please contact me at `phamtuongthinh@gmail.com`

5. Build and run server with `npm run dev`.

6. Build and run client by `cd .\react\client\` then `npm start`

7. ### APIs: \
    About: `http://localhost:#/about`
    Change: `http://localhost:#/settings/change`
    Choose: `http://localhost:#/`
    Cookies: `http://localhost:#/cookies`
    Deactivate: `http://localhost:#/settings/deactivate`
    Donate: `http://localhost:#/user/donate`
    Forgot: `http://localhost:#/forgot`
    Forgot Change: `http://localhost:#/change`
    Forgot: `http://localhost:#/forgot/`
    Home: `http://localhost:#/home`
    Login: `http://localhost:#/login`
    Privacy: `http://localhost:#/privacy`
    Profile: `http://localhost:#/settings/profile`
    Register: `http://localhost:#/register`
    Submit: `http://localhost:#/user/submit`
    ToS: `http://localhost:#/tos`

8. ### Response Codes
```
200: Success
204: No Content
400: Invalid request
401: Unauthorized
403: Forbidden
404: Cannot be found
```

9. ### Responses

`status` will be one of `"PASSED"`, `"FAILED"`, or `"ERRORED"`.

### Successful Response
```
200 OK
Content-Type: application/json

{
    "status": "PASSED",
    "message": <parameter> was passed
}
```
  
### Failed Responses

#### No Content
```
204 Bad Request
Content-Type: application/json

{
    "status": "ERROR",
    "message": "<parameter> does not exist."
}
```
#### Invalid request
```
400 Bad Request
Content-Type: application/json

{
    "status": "ERROR",
    "message": Invalid "<parameter> format."
}
```
#### Unauthorized
```
401 Bad Request
Content-Type: application/json

{
    "status": "ERROR",
    "message": "<parameter> does not exist."
}
```
#### Forbidden
```
403 Bad Request
Content-Type: application/json

{
    "status": "ERROR",
    "message": "Already in use" || "<parameter> do not match"
}
```
#### Missing
```
404 Fatal
Content-Type: application/json

{
    "status": "FAILED",
    "message": "<parameter> is missing"
}
```
10. ### Deploy
```
Store / Retrieve images from AWS S3
Server will be running from AWS EC2
```
