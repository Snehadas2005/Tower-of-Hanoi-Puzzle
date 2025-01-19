# Tower of Hanoi Project 🎮

## Team Members: 🙌
**•	Sneha Das - 23SCSE1280020                              
•	Ritik Kumar  - 23SCSE1280018                               
• Kushagr Singh - 23SCSE1280072                          
•	Sahil Raj    - 23SCSE1280059**

## Objective 🎯
The object of the Tower of Hanoi puzzle is to move all the disks from the source peg to the target peg, following these rules:
1. Only one disk can be moved at a time.
2. Each move consists of taking the upper disk from one of the stacks and placing it on top of another stack. In other words, a disk can only be moved if it the uppermost disk on a stack.
3. No larger disk may be placed on top of a smaller disk.
   The puzzle's challenge lies in finding the optimal sequence of moves to complete the task efficiently.

## Problem Statement 🤔
Given a set of n disks of different sizes stacked on a source peg, the problem is finding the minimum number of moves required to transfer all the disks to the target peg, following the Tower of Hanoi puzzle rules.

## Project Website 
### Home Page
[hanoihome.webm](https://github.com/user-attachments/assets/59e707b4-0c47-4067-95d7-e44871207946)

### Sign up Page
![Screenshot 2024-12-07 122505](https://github.com/user-attachments/assets/4f185397-45a0-4192-94eb-10c4ad8e9608)

### Login Page
![Screenshot 2024-12-07 122401](https://github.com/user-attachments/assets/f4d7fef3-b14f-4140-815f-76fda85225a4)

### Game Page
![Image](https://github.com/user-attachments/assets/fc5a5953-1c97-4c46-8db6-64aa1fd7f516)

### Game History Page
![Screenshot 2024-12-07 122205](https://github.com/user-attachments/assets/32869f7f-b4ce-4731-9f93-a602c47701e6)

## Project Setup Guide 🛠️
### 1. Development Environment Setup
- Install Java JDK (version 8 or higher)
- Install MySQL Server
- Install Apache Tomcat (version 9.0 or higher)
- Set up your preferred IDE (Eclipse, IntelliJ, etc.)
- Configure Maven for dependency management

### 2. Database Setup
- Create MySQL database schema
- Configure database connection properties
- Execute initial database scripts
- Set up user authentication tables
- Configure connection pooling
  
### 3. The application features:
- Secure user registration and login system
- Interactive Tower of Hanoi game
- Score tracking and history
- Responsive design using Bootstrap
- Form validation with server-side checks
- Database persistence of user data and scores
- Session management
- JSP-based dynamic content generation

### 4. Project Structure 📁
```
tower-of-hanoi-puzzle/
├── .gitattributes
├── .gitignore
├── README.md
├── Tower_of_Hanoi.iml
├── build.xml
├── dependency-reduced-pom.xml
├── manifest.iml
├── pom.xml
├── .vscode/
├── database/
├── HanoiPuzzle/
│   ├── ExternalLibraries/
│   │   ├── mysql-connector-java-8.0.28.jar
│   │   └── protobuf-java-3.19.4.jar
│   ├── TowerOfHanoi/
│   │   ├── .idea/
│   │   │   ├── compiler.xml
│   │   │   ├── encodings.xml
│   │   │   ├── jarRepositories.xml
│   │   │   ├── misc.xml
│   │   │   ├── modules.xml
│   │   │   ├── vcs.xml
│   │   │   └── workspace.xml
│   │   └── database/
│   │       └── database_schema.sql
│   ├── launch project/
│   │   └── config.xml
│   ├── lib/
│   │   └── DatabaseConnection.java
│   └── src/main/
│       └── com/hanoiheights/
│           ├── dao/
│           │   ├── ScoreDAO.java
│           │   └── UserDAO.java
│           └── model/
│               ├── disc.java
│               ├── game_state.java
│               ├── move.java
│               └── tower.java
├── nproject/
│   ├── private/
│   │   ├── private.properties
│   │   ├── private.xml
│   │   ├── build-impl.xml
│   │   ├── genfiles.properties
│   │   ├── project.properties
│   │   └── project.xml
│   └── target/
│       ├── maven-archiver/
│       │   └── pom.properties
│       └── maven-status/maven-compiler-...
│           ├── createdFiles.lst
│           └── inputFiles.lst
├── util/
│   └── Main.java
└── webapp/
    ├── WEB-INF/
    │   └── web.xml
    ├── css/
    │   └── styles.css
    ├── extra/
    │   ├── Hanoi.jpg
    │   ├── Hanoiloop.mp4
    │   └── towerofhanoi.png
    ├── js/
    │   ├── components/
    │   │   ├── game-history.js
    │   │   └── game.js
    │   ├── login.js
    │   └── scoreboard.js
    └── servlets/
        ├── HttpServlet.java
        ├── game-servlet.java
        ├── servlet-implementation.java
        ├── game.html
        ├── game_history.html
        ├── home.html
        ├── jsp-pages.txt
        ├── login.html
        ├── register.html
        └── scoreboard.html

```

## Technical Stack Overview ⚙
### 1. Programming Languages
   - Java (Backend logic)
   - HTML5/CSS3 (Frontend structure and styling)
   - JavaScript (Frontend logic and interactivity)
   - SQL (Database operations)

### 2. Server-side Technologies
   - Java Servlets
   - JavaServer Pages (JSP)
   - JSTL (JSP Standard Tag Library)
   - Expression Language (EL)
   - Apache Tomcat Server
   - Maven for dependency management

### 3. Core Components
   - Java Classes:
     * TowerOfHanoi: Main game logic
     * UserServlet: User management
     * GameServlet: Game progress tracking
     * DAO Classes: Database operations
     * Model Classes: Data structures
   
   - Web Components:
     * JSP Pages: Dynamic content generation
     * JSTL Tags: Server-side logic
     * CSS/Bootstrap: Styling and responsiveness
     * JavaScript: Client-side game logic
     * JDBC: Database connectivity

### 4. Data Management
   - MySQL Database
   - JDBC for database operations
   - Session management
   - Form validation
   - Data persistence
   - Connection pooling

### 5. Features
   - User authentication with database integration
   - Session-based user tracking
   - Interactive gameplay
   - Score tracking with persistence
   - Server-side validation
   - Profile management
   - Game history tracking
   - Responsive UI design

### 6. Development Environment
   - Java Development Kit (JDK)
   - Apache Tomcat Server
   - MySQL Database
   - Maven
   - Git for version control
   - Eclipse/IntelliJ IDE

## Servlet Implementation
### User Management
- `/register` - User registration servlet
  - Handles new user registration
  - Validates user input
  - Creates user profiles
  
- `/login` - Authentication servlet
  - Manages user login
  - Creates user sessions
  - Handles authentication

### Game Management
- `/game` - Game progress servlet
  - Tracks game progress
  - Stores game statistics
  - Manages game history

### Profile Management
- `/profile` - User profile servlet
  - Displays user information
  - Shows game statistics
  - Handles profile updates

## JSP Components
### Core Pages
- `game_history.jsp`: Displays user game history with JSTL
- `profile.jsp`: Shows user profile and statistics
- `game.jsp`: Main game interface
- `error.jsp`: Error handling page

### Features
- JSTL integration for dynamic content
- Expression Language (EL) for data access
- Custom tag libraries
- Bootstrap styling
- Form validation
- Session tracking

## Database Schema 💾
### Tables:

1. Users
   - user_id (PK)
   - username (UNIQUE)
   - first_name
   - last_name
   - email (UNIQUE)
   - password_hash
   - profile_picture_url
   - created_at
   - updated_at


3. GameProgress
   - progress_id (PK)
   - user_id (FK → Users.user_id)
   - level_number
   - moves_taken
   - time_taken
   - date_played
   - is_completed
   - score


3. UserStatus
   - status_id (PK)
   - user_id (FK → Users.user_id)
   - total_games
   - highest_score
   - best_accuracy
   - most_attempted_disks
   - avg_disks_per_game
   - skill_level
   - last_played_at



### Indexes:

1. Users:
   - idx_user_email (email)
   - idx_user_username (username)


2. GameProgress:
   - idx_game_progress_user (user_id)
   - idx_game_progress_date (date_played)


3. UserStatus:
   - idx_user_status_user (user_id)

## Future Development Plans 🎮
### Planned Enhancements:
- OAuth integration for social login
- RESTful API implementation
- WebSocket for real-time multiplayer
- Advanced statistics tracking
- Mobile responsiveness improvements
- Performance optimization
- Security enhancements
- Accessibility features
- Localization support
- Advanced difficulty levels
- Achievement system
- Social sharing features

## Getting Started 🚀
1. Clone the repository
2. Install dependencies using Maven
3. Configure Tomcat server
4. Set up MySQL database
5. Update database credentials in `context.xml`
6. Deploy the application
7. Access at `http://localhost:8080/hanoi-heights`

## Security Considerations 🔒
- Password hashing implementation
- SQL injection prevention
- XSS protection
- CSRF tokens
- Session management
- Input validation
- Error handling
- Secure configuration

🌟 Contributing to this project? Please read our contribution guidelines and code of conduct before submitting pull requests. Join us in making learning fun! 🎯
