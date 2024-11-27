# Nearby Places Finder
## Table of Contents
1. [Project Overview](#project-overview)
2. [Demo](#demo)
3. [Technologies Used](#technologies-used)
4. [Features](#features)
5. [Architecture](#architecture)
6. [Installation](#installation)
    - [Prerequisites](#prerequisites)
    - [Backend Setup](#backend-setup)
    - [Frontend Setup](#frontend-setup)
7. [API Documentation](#api-documentation)
    - [Base URL](#base-url)
    - [Endpoints](#endpoints)
8. [Running Tests](#running-tests)
    - [Backend Tests](#backend-tests)
    - [Frontend Tests](#frontend-tests)
9. [Deployment](#deployment)
10. [Troubleshooting](#troubleshooting)
11. [Contributing](#contributing)
12. [License](#license)
13. [Contact](#contact)

---

## Project Overview

**Nearby Places Finder** is a full-stack web application that allows users to search for nearby places based on their current location. Users can input their latitude, longitude, and a search radius to find places of interest within the specified area. The application leverages the Google Places API to fetch real-time data and displays results both in a list and on an interactive Google Map.

## Demo

Access the live application [here](http://65.52.125.4:8070/).

## Technologies Used

### Backend
- **Spring Boot 3.x**: A Java-based framework used to create stand-alone, production-grade Spring applications.
- **Java 11**: The primary programming language.
- **Spring Data JPA**: For database interactions.
- **H2 Database**: In-memory database for development and testing.
- **RestTemplate**: To make HTTP requests to external APIs.
- **Maven**: Dependency management and build automation.
- **JUnit 5 & Mockito**: Testing frameworks.

### Frontend
- **React.js**: A JavaScript library for building user interfaces.
- **Axios**: For making HTTP requests from the frontend.
- **@react-google-maps/api**: To integrate Google Maps into the React application.
- **Formik**: For form management.
- **CSS Modules / Tailwind CSS / Bootstrap**: For styling (based on preference).

### Other
- **Google Places API**: To fetch information about places.
- **Git & GitHub**: Version control and repository hosting.
- **Docker** (optional): Containerization of the application.
- **Vercel / Netlify**: For frontend deployment.
- **Heroku / AWS**: For backend deployment.

## Features

- **Search Nearby Places**: Input latitude, longitude, and radius to find nearby places.
- **Interactive Map**: View search results plotted on a Google Map.
- **Data Caching**: Stores API responses to improve performance and reduce redundant API calls.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **User-Friendly Interface**: Intuitive forms and clear presentation of results.

## Architecture

1. **Frontend (React.js)**: Handles user interactions, form submissions, and displays data.
2. **Backend (Spring Boot)**: Processes requests, interacts with the Google Places API, and manages data storage.
3. **Database (H2/PostgreSQL)**: Stores fetched place data for caching and quick retrieval.
4. **Google Places API**: Provides real-time data about nearby places.

## Installation

### Prerequisites

- **Java 11+**: [Download and Install Java](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html)
- **Node.js & npm**: [Download and Install Node.js](https://nodejs.org/)
- **Maven**: [Download and Install Maven](https://maven.apache.org/install.html)
- **Git**: [Download and Install Git](https://git-scm.com/downloads)
- **IDE**: IntelliJ IDEA, VS Code, or your preferred IDE.
- **Google API Key**: Obtain from [Google Cloud Console](https://console.cloud.google.com/).

### Backend Setup

1. **Clone the Repository**

    ```bash
    git clone https://github.com/kullaniciAdi/codexist-studycase.git
    cd codexist-studycase/backend
    ```

2. **Configure Google API Key**

    Open `src/main/resources/application.properties` and add your Google API key:

    ```properties
    google.api.key=YOUR_GOOGLE_API_KEY
    ```

3. **Database Configuration**

    - **Using H2 Database** (default):

        ```properties
        spring.datasource.url=jdbc:h2:mem:testdb
        spring.datasource.driverClassName=org.h2.Driver
        spring.datasource.username=sa
        spring.datasource.password=
        spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
        spring.h2.console.enabled=true
        ```

    - **Using PostgreSQL**:

        ```properties
        spring.datasource.url=jdbc:postgresql://localhost:5432/yourdbname
        spring.datasource.username=yourusername
        spring.datasource.password=yourpassword
        spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
        ```

4. **Build and Run the Backend**

    ```bash
    mvn clean install
    mvn spring-boot:run
    ```

    The backend server will start at `http://localhost:8070`.

### Frontend Setup

1. **Navigate to Frontend Directory**

    ```bash
    cd ../frontend
    ```

2. **Install Dependencies**

    ```bash
    npm install
    ```

3. **Configure Environment Variables**

    Create a `.env` file in the frontend directory and add your Google Maps API key and backend URL:

    ```env
    REACT_APP_GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY
    REACT_APP_BACKEND_URL=http://localhost:8070/api
    ```

4. **Start the Frontend**

    ```bash
    npm start
    ```

    The frontend application will run at `http://localhost:3000`.

## API Documentation

### Base URL

- **Development**: `http://localhost:8070/api`
- **Production**: `http://65.52.125.4:8070/api`

### Endpoints

#### 1. Fetch Places

- **URL**: `/places/fetch`
- **Method**: `GET`
- **Description**: Fetches nearby places based on provided latitude, longitude, and radius. Caches the results to reduce redundant API calls.
- **Parameters**:
    - `latitude` (double, required): Latitude of the location.
    - `longitude` (double, required): Longitude of the location.
    - `radius` (int, required): Search radius in meters.
- **Example Request**:

    ```
    GET http://65.52.125.4:8070/api/places/fetch?latitude=41.0082&longitude=28.9784&radius=1000
    ```

- **Success Response**:

    ```json
    [
        {
            "id": 1,
            "name": "Place Name",
            "address": "Place Address",
            "latitude": 41.0082,
            "longitude": 28.9784,
            "radius": 1000
        },
        {
            "id": 2,
            "name": "Another Place",
            "address": "Another Address",
            "latitude": 41.0083,
            "longitude": 28.9785,
            "radius": 1000
        }
    ]
    ```

- **Error Responses**:
    - **400 Bad Request**: Missing or invalid parameters.
    - **500 Internal Server Error**: Issues with fetching data from Google Places API or server-side errors.

#### 2. Get All Places

- **URL**: `/places`
- **Method**: `GET`
- **Description**: Retrieves all places stored in the database.
- **Parameters**: None.
- **Example Request**:

    ```
    GET http://65.52.125.4:8070/api/places
    ```

- **Success Response**:

    ```json
    [
        {
            "id": 1,
            "name": "Place Name",
            "address": "Place Address",
            "latitude": 41.0082,
            "longitude": 28.9784,
            "radius": 1000
        },
        {
            "id": 2,
            "name": "Another Place",
            "address": "Another Address",
            "latitude": 41.0083,
            "longitude": 28.9785,
            "radius": 1000
        }
    ]
    ```

## Running Tests

### Backend Tests

#### Unit Tests

- **Description**: Tests individual components (e.g., services) in isolation.
- **Run Tests**:

    ```bash
    mvn test
    ```

#### Integration Tests

- **Description**: Tests the interaction between different components (e.g., controllers and services).
- **Run Tests**:

    ```bash
    mvn test
    ```

### Frontend Tests

#### Component Tests

- **Description**: Tests individual React components for correct rendering and behavior.
- **Run Tests**:

    ```bash
    npm test
    ```

#### API Integration Tests

- **Description**: Ensures the frontend communicates correctly with the backend API.
- **Run Tests**:

    ```bash
    npm test
    ```

## Deployment

### Backend Deployment

1. **Docker Deployment (Optional)**

    - **Create Dockerfile**:

        ```dockerfile
        FROM openjdk:17-jdk-alpine
        VOLUME /tmp
        COPY target/studycase-backend.jar studycase-backend.jar
        ENTRYPOINT ["java","-jar","/studycase-backend.jar"]
        ```

    - **Build Docker Image**:

        ```bash
        mvn clean package
        docker build -t codexist-studycase-backend .
        ```

    - **Run Docker Container**:

        ```bash
        docker run -d -p 8070:8070 codexist-studycase-backend
        ```

2. **Cloud Deployment**

    - **Heroku Example**:

        ```bash
        heroku create your-app-name
        git push heroku main
        heroku config:set GOOGLE_API_KEY=YOUR_GOOGLE_API_KEY
        ```

### Frontend Deployment

1. **Vercel Deployment**

    - Connect your GitHub repository to Vercel.
    - Configure environment variables in the Vercel dashboard.
    - Deploy the project.

2. **Netlify Deployment**

    - Connect your GitHub repository to Netlify.
    - Configure environment variables in the Netlify dashboard.
    - Deploy the project.

## Troubleshooting

### 1. API Returns Empty Array (`[]`)

- **Possible Causes**:
    - Incorrect latitude, longitude, or radius values.
    - Invalid or restricted Google API key.
    - Exceeded Google Places API quota.

- **Solutions**:
    - Verify the input coordinates and radius.
    - Check the Google API key and its restrictions.
    - Monitor API usage in the Google Cloud Console.

### 2. CORS Errors

- **Solution**:
    - Ensure CORS is properly configured in the backend.

    ```java
    import org.springframework.context.annotation.Bean;
    import org.springframework.context.annotation.Configuration;
    import org.springframework.web.servlet.config.annotation.CorsRegistry;
    import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

    @Configuration
    public class CorsConfig {

        @Bean
        public WebMvcConfigurer corsConfigurer() {
            return new WebMvcConfigurer() {
                @Override
                public void addCorsMappings(CorsRegistry registry) {
                    registry.addMapping("/**")
                            .allowedOrigins("http://localhost:3000")
                            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS");
                }
            };
        }
    }
    ```

### 3. Database Issues

- **Solution**:
    - Verify database configurations in `application.properties`.
    - Check if the database server is running (if using PostgreSQL).
    - Review application logs for detailed error messages.

### 4. Google Maps Not Displaying

- **Solution**:
    - Ensure the Google Maps API key is correctly set in the frontend.
    - Check for errors in the browser console.
    - Verify that the API key has the necessary permissions.

## Contributing

We welcome contributions! Please follow these steps to contribute:

1. **Fork the Repository**

    Click the "Fork" button at the top right of this page.

2. **Clone Your Fork**

    ```bash
    git clone https://github.com/your-username/codexist-studycase.git
    cd codexist-studycase
    ```

3. **Create a New Branch**

    ```bash
    git checkout -b feature/YourFeatureName
    ```

4. **Make Changes and Commit**

    ```bash
    git commit -m "Add your feature or fix"
    ```

5. **Push to Your Fork**

    ```bash
    git push origin feature/YourFeatureName
    ```

6. **Create a Pull Request**

    Go to the original repository and create a pull request from your fork.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For any inquiries or support, please contact us at [ahmetfarukpala@gmail.com](mailto:ahmetfarukpala@gmail.com).

---

**Happy Coding!** 🚀 If you encounter any issues or have suggestions for improvement, feel free to open an issue or reach out to us.
