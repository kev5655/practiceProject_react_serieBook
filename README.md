# Serie Book


## Description
This project was developed with Java Spring and React. It is used to store series. The series are stored in a MySQL database.
Each user can create his own account and save his own series, while he remains logged in for a certain time, which is granted via a json web token.


**IMPORTANT**

> For the project to work, a security configuration must be made and the application.properties may need to be adjusted.
> If you want the security configuration you can contact me

## Installation
> In the frontend order, execute the installation command
`npm install`


## Run
> For running the application you need a MqSql database`

### Running the backend
`./mvnw spring-boot:run`

### Running the frontend
> Switch to the frontend folder
`cd ./frontend`

> Running the frontend
`npm start`

## Deploy on Docker

> In root Folder run:
`mvn package -Dmaven.test.skip=true`
`docker compose up`