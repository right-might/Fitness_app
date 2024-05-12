# Use an OpenJDK base image
FROM openjdk:17-alpine

# Set the working directory in the container
WORKDIR /app

# Print contents of the directory before copying
RUN ls -la 

# Copy the packaged JAR file into the container
COPY target/Binaire-0.0.1-SNAPSHOT.jar /app/binaire.jar

# Expose the port your application runs on
EXPOSE 8080

# Command to run the Spring Boot application
CMD ["java", "-jar", "binaire.jar"]
