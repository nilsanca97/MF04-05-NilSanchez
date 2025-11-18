# Vaadin Migration

## Approaches

We have two approaches for adding Vaadin to our car rental project:

1. Migration Approach: Add vaadin-spring-boot-starter dependency to your existing [pom.xml](cci:7://file:///home/albert/MyProjects/Sandbox/rentingCarTest/rentingCar-boot/pom.xml:0:0-0:0), remove Thymeleaf dependency, and replace controllers with Vaadin @Route views. Your JPA entities, repositories, and services remain untouched. Create new UI components like Grid, Form, and Button for car management and booking interfaces.
2. Fresh Start Approach: Create a new Vaadin Spring Boot project using Vaadin's starter template, then copy your existing model classes, repositories, and services.
   This ensures clean Vaadin integration without legacy dependencies but requires more setup time.

### Step-by-step Migration Guide

#### 1. Create Vaadin Hilla Project

Download the latest Vaadin Hilla Spring Boot starter from [Vaadin Start](https://start.vaadin.com), select React as the UI technology and Spring Boot for the backend.

**Vaadin Playground**: [Create a new Vaadin app: configure views and theme](https://start.vaadin.com/app/p)

#### 2. Extract the Starter

Unzip the downloaded project archive to your desired workspace directory, e.g., `~/MyProjects/rentingCarHilla`.

#### 3. Remove IDE-specific and Git Files

Navigate into the new project folder. Remove existing version control and IDE configs to avoid issues:

```bash
rm -rf .git .idea .vscode
```

This ensures a clean state before initializing your own repository.

#### 4. Check Java & Node SDK Versions

Check and set Java version (11, 17, or compatible with Vaadin Hilla) and Node.js (latest LTS recommended):

```bash
java -version
node -v
```

Update your IDE settings if needed.

#### 5. Build with Maven \& Vite

Run an initial build. Maven compiles the backend; Vite sets up the React frontend:

```bash
./mvnw clean install
npm install
npm run build
```

This ensures all dependencies and build tools are set up.

#### 6. Run the Project

Start the app and check that both backend (Spring Boot) and React frontend (Vite) run correctly:

```bash
./mvnw spring-boot:run
# or in development:
npm run dev
```

#### 7. Initialize Git, Commit & Push

Initialize a new Git repository, make your initial commit, and push to your remote (GitHub, GitLab, etc.):

```bash
git init
git add .
git commit -m "Initial Vaadin Hilla React project setup"
git remote add origin <your_repo_url>
git push -u origin main
```

#### 8. Update pom.xml with Dependencies

Copy all required dependencies (JPA, H2, Spring Data, etc.) from your original `pom.xml` and add them to the new `pom.xml`.

- Make sure you do not duplicate Vaadin or Hilla/Spring Boot dependencies.

#### 9. Migrate Java Classes (Model, Repo, Service)

Copy your JPA entity classes, repository interfaces, and service classes (from your old project) into the corresponding backend packages (`src/main/java/...`) in the new project. Adjust package imports if needed.

#### 10. Update Application Properties

Copy and merge relevant settings (database URL, JPA config, etc.) from your old `application.properties` into the new project's `src/main/resources/application.properties`.

#### 11. Remove Thymeleaf and Controllers

Delete all Thymeleaf templates (HTML files in `resources/templates`) and any code using `@Controller`, `@RequestMapping`, or `th:` syntax. Your presentation layer will now be in React via Hilla Endpoints.

## Migration Tips

- Endpoint replacement: Replace old REST/Controller endpoints with Hilla endpoints (`@Endpoint`) for each domain logic you want exposed to the frontend.

- React UI: Design new React components (Grid, Forms, etc.) for managing cars and bookings, and connect them to Hilla endpoints using the generated client stubs.

- Clean up legacy code as you migrate, ensuring no unused dependencies or templates linger.

- IntelliJ Project Structure
  
  - Open `File > Project Structure` and check the "Project SDK" setting. Make sure it's set to the intended Java version (e.g., Java 17 or Java 21) used by Vaadin Hilla.
  
  - Under "Modules," ensure that your source folders (`src/main/java`) are correctly marked as "Sources (blue-folder)" and not excluded.
+ Reload All from Disk

+ If changes aren’t reflected, select `File > Reload All from Disk` in IntelliJ IDEA. This refreshes the project files and ensures your latest copied classes and changes are recognized by the IDE.
- Invalidate Caches and Restart
  
  - For persistent issues with code recognition, go to `File > Invalidate Caches / Restart`. This will clear internal caches, re-index your project, and resolve many issues with file/class detection.


