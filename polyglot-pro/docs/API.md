# API Reference - Polyglot Pro

## Base URL
`http://localhost:5000/api`

## Authentication
All protected endpoints require JWT token in Authorization header:
```
Authorization: Bearer <token>
```

---

## Authentication Endpoints

### Register User
```
POST /auth/register

Request Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}

Response (201):
{
  "message": "User registered successfully",
  "token": "eyJhbGc...",
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "student"
  }
}

Validation:
- Name: Required, non-empty
- Email: Valid email format, unique
- Password: Minimum 6 characters
```

### Login
```
POST /auth/login

Request Body:
{
  "email": "john@example.com",
  "password": "securepassword"
}

Response (200):
{
  "message": "Login successful",
  "token": "eyJhbGc...",
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "student"
  }
}

Error (401):
{
  "message": "Invalid credentials"
}
```

### Logout
```
POST /auth/logout
Auth: Required

Response (200):
{
  "message": "Logout successful"
}
```

---

## User Endpoints

### Get User Profile
```
GET /users/profile
Auth: Required

Response (200):
{
  "id": "uuid",
  "name": "John Doe",
  "email": "john@example.com",
  "avatar": "url",
  "bio": "Learning languages...",
  "nativeLanguage": "English",
  "targetLanguages": ["Spanish", "French"],
  "proficiencyLevel": "beginner",
  "role": "student",
  "courses": [
    {
      "id": "uuid",
      "title": "Spanish Basics",
      "description": "..."
    }
  ]
}
```

### Update User Profile
```
PUT /users/profile
Auth: Required

Request Body:
{
  "name": "John Updated",
  "bio": "Updated bio",
  "avatar": "url",
  "targetLanguages": ["Spanish", "French", "German"],
  "proficiencyLevel": "intermediate"
}

Response (200):
{
  "message": "Profile updated successfully",
  "user": { ...updated user data }
}
```

### Get Learning Progress
```
GET /users/progress
Auth: Required

Response (200):
{
  "totalEnrolled": 3,
  "completed": 1,
  "inProgress": 2,
  "enrollments": [
    {
      "courseId": "uuid",
      "courseName": "Spanish Basics",
      "language": "Spanish",
      "progress": 75,
      "status": "in_progress"
    }
  ]
}
```

### Get Enrolled Courses
```
GET /users/courses
Auth: Required

Response (200):
[
  {
    "id": "enrollment-uuid",
    "userId": "user-uuid",
    "courseId": "course-uuid",
    "progress": 45,
    "status": "in_progress",
    "course": {
      "id": "course-uuid",
      "title": "Spanish Basics",
      "description": "...",
      "language": "Spanish",
      "thumbnail": "url",
      "price": 29.99
    }
  }
]
```

### Change Password
```
POST /users/change-password
Auth: Required

Request Body:
{
  "currentPassword": "oldpassword",
  "newPassword": "newpassword"
}

Response (200):
{
  "message": "Password changed successfully"
}
```

---

## Course Endpoints

### List All Courses
```
GET /courses?language=Spanish&level=beginner&search=basics&page=1&limit=10

Query Parameters:
- language: Filter by language (Spanish, French, etc.)
- level: Filter by level (beginner, intermediate, advanced)
- search: Search by title or description
- page: Pagination page number (default: 1)
- limit: Results per page (default: 10)

Response (200):
{
  "courses": [
    {
      "id": "uuid",
      "title": "Spanish Basics",
      "description": "Learn basic Spanish",
      "language": "Spanish",
      "level": "beginner",
      "thumbnail": "url",
      "price": 29.99,
      "rating": 4.5,
      "enrollmentCount": 1250,
      "lessonsCount": 20,
      "duration": 600
    }
  ],
  "pagination": {
    "total": 50,
    "page": 1,
    "limit": 10,
    "pages": 5
  }
}
```

### Get Course Details
```
GET /courses/:id

Response (200):
{
  "id": "uuid",
  "title": "Spanish Basics",
  "description": "...",
  "language": "Spanish",
  "level": "beginner",
  "thumbnail": "url",
  "price": 29.99,
  "instructorId": "uuid",
  "duration": 600,
  "lessonsCount": 20,
  "rating": 4.5,
  "enrollmentCount": 1250,
  "isPublished": true,
  "category": "Languages",
  "tags": ["spanish", "beginner", "interactive"],
  "lessons": [
    {
      "id": "uuid",
      "title": "Lesson 1: Basics",
      "duration": 30,
      "order": 1,
      "type": "video"
    }
  ]
}
```

### Get Course Lessons
```
GET /courses/:id/lessons

Response (200):
[
  {
    "id": "uuid",
    "title": "Lesson 1: Introduction",
    "description": "...",
    "videoUrl": "youtube-url",
    "duration": 30,
    "order": 1,
    "type": "video"
  }
]
```

### Enroll in Course
```
POST /courses/:id/enroll
Auth: Required

Response (201):
{
  "message": "Enrolled successfully",
  "enrollment": {
    "id": "uuid",
    "userId": "user-uuid",
    "courseId": "course-uuid",
    "status": "enrolled",
    "progress": 0,
    "enrolledAt": "2024-06-07T10:00:00Z"
  }
}

Error (400):
{
  "message": "Already enrolled in this course"
}
```

### Create Course (Instructor Only)
```
POST /courses
Auth: Required (Instructor role)

Request Body:
{
  "title": "Spanish for Beginners",
  "description": "Learn Spanish from scratch",
  "language": "Spanish",
  "level": "beginner",
  "price": 29.99,
  "thumbnail": "url",
  "category": "Languages",
  "tags": ["spanish", "beginner"]
}

Response (201):
{
  "id": "uuid",
  "title": "Spanish for Beginners",
  ...course data
}
```

### Update Course (Instructor Only)
```
PUT /courses/:id
Auth: Required (Instructor role)

Request Body:
{
  "title": "Updated Title",
  "price": 39.99,
  "isPublished": true
}

Response (200):
{
  "message": "Course updated successfully",
  "course": { ...updated course data }
}
```

---

## Lesson Endpoints

### Get Lesson
```
GET /lessons/:id

Response (200):
{
  "id": "uuid",
  "courseId": "uuid",
  "title": "Lesson 1: Basics",
  "description": "...",
  "content": { ...rich content },
  "videoUrl": "youtube-url",
  "duration": 30,
  "order": 1,
  "type": "video",
  "resources": [],
  "assessments": [
    {
      "id": "uuid",
      "title": "Quiz 1",
      "type": "quiz",
      "passingScore": 70
    }
  ]
}
```

### Complete Lesson
```
POST /lessons/:id/complete
Auth: Required

Response (200):
{
  "message": "Lesson marked as complete",
  "enrollment": {
    "id": "uuid",
    "progress": 5,
    "status": "in_progress",
    "completedLessons": ["uuid"]
  }
}
```

### Create Lesson (Instructor Only)
```
POST /lessons
Auth: Required (Instructor role)

Request Body:
{
  "courseId": "uuid",
  "title": "New Lesson",
  "description": "...",
  "content": { ...rich content },
  "videoUrl": "url",
  "duration": 30,
  "order": 1,
  "type": "video"
}

Response (201):
{
  "id": "uuid",
  ...lesson data
}
```

---

## Assessment Endpoints

### Get Assessment
```
GET /assessments/:id

Response (200):
{
  "id": "uuid",
  "lessonId": "uuid",
  "title": "Spanish Quiz 1",
  "type": "quiz",
  "questions": [
    {
      "id": "q1",
      "question": "What is 'hello' in Spanish?",
      "type": "multiple-choice",
      "options": ["Hola", "Adios", "Gracias"],
      "correctAnswer": "Hola",
      "points": 10
    }
  ],
  "passingScore": 70,
  "timeLimit": 30
}
```

### Submit Assessment
```
POST /assessments/:id/submit
Auth: Required

Request Body:
{
  "answers": ["Hola", "Adios", "Gracias"]
}

Response (200):
{
  "score": 70,
  "totalPoints": 100,
  "percentage": 70,
  "passed": true,
  "message": "Assessment passed!"
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "errors": [
    {
      "field": "email",
      "message": "Valid email is required"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "message": "Invalid token"
}
```

### 403 Forbidden
```json
{
  "message": "Access denied. Admin role required."
}
```

### 404 Not Found
```json
{
  "message": "Course not found"
}
```

### 500 Internal Server Error
```json
{
  "message": "Internal Server Error"
}
```

---

## Status Codes

- `200` - OK
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

---

## Rate Limiting

Currently not implemented. Will be added for production.

## CORS

Allowed origins configured in backend:
- http://localhost:5173 (development)
- Your production domain (production)

---

For more information, see the Implementation Guide.
