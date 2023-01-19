# Serie Book


## Description
This project was developed with Java Spring and React. It is used to store series. The series are stored in a MySQL database.
Each user can create his own account and save his own series, while he remains logged in for a certain time, which is granted via a json web token.


**IMPORTANT**

> For the project to work, a security configuration must be made and the application.properties may need to be adjusted.
> If you want the security configuration you can contact me
> You need to update the application.properties files of the Spring Backend

## Installation
> In the front-end folder, execute the installation command

`npm install`


## Run
> For running the application you need a MqSql database`

### Running the backend

> Switch to the back-end folder

`cd ./back-end`

> Uptate Spring Profiles `spring.profiles.active` to
`spring.profiles.active=prod`

> Run the Backend
`./mvnw spring-boot:run`

### Running the frontend
> Switch to the front-end folder

`cd ./front-end`

> Running the frontend

`npm start`

## Deploy on Docker

### Dev

>> Uptate Spring Profiles `spring.profiles.active` to
>
>`spring.profiles.active=prod`
>
>> Compile Java Project
>
>`mvn package -DskipTests=true`
>
>> Create Container and Run Local
>
>`docker compose up --build`
>
>`mvn clean package -DskipTests=true && docker compose up --build`
>
>> On Server
>
>`sudo docker-compose up --build`


### Prod

>> Uptate Spring Profiles `spring.profiles.active` to
>
>`spring.profiles.active=prod`
>
>> Compile Java Project
>
>`mvn package -DskipTests=true`
>
>> Create Container and Run Local
>
>`docker-compose -f docker-compose-prod.yml up --build`
>
>> Push Container to Docker Hub
>
>`docker tag <image-id> kevin5655/seriebook-app-client:1.0.0`
>
>`docker tag <image-id> kevin5655/seriebook-app-server:1.0.0`
>
>`docker push kevin5655/seriebook-app-client:1.0.0`
>
>`docker push kevin5655/seriebook-app-server:1.0.0`
>
>> On Server
>
>`sudo docker-compose up --build`