# Node JS Entrance Evaluation

This is REST API for authentication feature

## Technologies

- ExpressJs and mysql database. 
- Knex library to access to the mysql database
- Express-jwt linrary for token validation
- bscript library to encrypt the password

## Install

    yarn global add knex 


## Run the database

    knex migrate:latest

## Run the app

    yarn start

# REST API

All the API for the application are described below.

## Sign up

### Request

`POST /api/auth/signup`

    curl -X POST http://localhost:3000/api/auth/signup -H Content-Type: application/json" -d '{"email": "", "password": "", "fullname": ""}
### Response

    HTTP/1.1 200 OK
    Date: TTue, 07 Mar 2023 11:19:42 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 29
    {
        "message": "Create successful"
    }

## Sign in

### Request

`POST /api/auth/signin`

    curl -X POST http://localhost:3000/api/auth/signin -H Content-Type: application/json" -d '{"email": "", "password": ""}
### Response

    HTTP/1.1 200 OK
    Date: TTue, 07 Mar 2023 11:19:42 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 29
    {
        "message": "Login successful",
        "accessToken": "",
        "refreshToken": ""
    }

## Refresh token

### Request

`POST /api/auth/refresh`

    curl -X POST http://localhost:3000/api/auth/refresh -H Content-Type: application/json" -d '{"refreshToken": "" }
### Response

    HTTP/1.1 200 OK
    Date: TTue, 07 Mar 2023 11:19:42 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 29
    {
        "message": "Login successful",
        "accessToken": "",
        "refreshToken": ""
    }

## Logout

### Request

`POST /api/auth/logout`

    curl -X POST http://localhost:3000/api/auth/refresh -H Content-Type: application/json" -H authorization: Bearer ...}
### Response

    HTTP/1.1 200 OK
    Date: TTue, 07 Mar 2023 11:19:42 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 29
    {
        "message": "Log out successfully"
    }