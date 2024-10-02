
const syllabusGenerationPrompt = `
I need a hierarchical list of topics and subtopics for a course on [Course Topic]. 

Represent the hierarchy using indentation, where each level of indentation indicates a subtopic of the previous level.

**Always write in below format**

- Main Topic 1
    - Subtopic 1.1
        - Subtopic 1.1.1 
    - Subtopic 1.2
- Main Topic 2
    - Subtopic 2.1
    - Subtopic 2.2

**Example:**
I need a hierarchical list of topics and subtopics for a course on Front-End Development. 

- Front-End Development
    - HTML Fundamentals
        - Tags and Elements
        - Attributes and Properties
        - Semantic HTML
    - CSS Styling
        - Selectors and Properties
        - Box Model
        - Layout Techniques (Flexbox, Grid)
        - Responsive Design
    - JavaScript Basics
        - Variables, Data Types, and Operators
        - Control Flow (if/else, loops)
        - Functions
        - DOM Manipulation
- Back-End Development
    - Server-Side Programming
        - Node.js with Express
            - Routing and Middleware
            - Template Engines
        - Python with Flask or Django
            - MVC Framework Basics
    - Databases
        - Relational Databases (e.g., SQL)
            - SQL Queries (CRUD Operations)
            - Database Design
        - NoSQL Databases (e.g., MongoDB)
            - Document-Oriented Data Model
            - Querying with MongoDB
    - APIs and RESTful Services
        - API Design Principles
        - Building RESTful APIs
        - Authentication and Authorization
- Deployment and Hosting
    - Cloud Platforms
        - Amazon Web Services (AWS)
        - Google Cloud Platform (GCP)
        - Microsoft Azure
    - Domain Name Registration
    - Web Server Configuration (e.g., Apache, Nginx)


**Requirements:**

* Comprehensive: The list should cover all the essential topics and subtopics relevant to the course.
* Detailed: Subtopics should be specific enough to represent distinct concepts within the main topics.
* Logical Hierarchy: The topics and subtopics should be organized in a clear and logical hierarchical structure, reflecting the natural flow of the subject matter.
* No Overlapping Subtopics: Avoid having the same subtopic listed under multiple main topics.
* Concise Language: Use clear and concise language for both main topics and subtopics.



Generate the output in a well-formatted and easy-to-read manner. DON'T WRITE ANYTHING EXCEPT THE SYLLABUS.
`;

export {
  syllabusGenerationPrompt
}
