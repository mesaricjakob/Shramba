# Use a Java runtime as a base image
FROM openjdk:17-jdk-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the application's JAR file and its dependencies to the container
COPY build/libs/*.jar app.jar

# Expose the port that the application will listen on
EXPOSE 8081

# Start the application when the container starts
CMD ["java", "-jar", "app.jar"]
