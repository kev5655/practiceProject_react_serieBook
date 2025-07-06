# Dockerfile for development
FROM maven:3.8-openjdk-17 AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

FROM openjdk:17-alpine

ARG SPRING_PROFILES_ACTIVE=dev
ENV SPRING_PROFILES_ACTIVE=${SPRING_PROFILES_ACTIVE}

WORKDIR /app
COPY --from=build /app/target/serie_book_backend.jar serie_book_backend.jar

ENTRYPOINT ["java", "-jar", "serie_book_backend.jar"]
