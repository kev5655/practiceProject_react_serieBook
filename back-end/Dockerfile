FROM openjdk:17-alpine

ARG JAR_FILE=target/serie_book_backend.jar

COPY ${JAR_FILE} serie_book_backend.jar

ENTRYPOINT ["java","-jar","/serie_book_backend.jar"]
