FROM openjdk:17-alpine

COPY target/serie_book_app.jar app.jar

ENTRYPOINT ["java","-jar","/app.jar"]
