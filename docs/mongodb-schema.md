# MongoDB Schema Documentation

This document outlines the schema design for the MongoDB database used in the terminal-style portfolio application.

## Database: `portfolio`

### Collection: `about`

Contains paragraphs for the "About Me" section.

```javascript
{
  _id: ObjectId,        // MongoDB generated ID
  content: String       // Paragraph text content
}
```

#### Indexes

- None required for this collection as it's small and infrequently queried

#### Example Document

```javascript
{
  _id: ObjectId("60d21b4667d0d8992e610c85"),
  content: "I am a seasoned software developer with a self-taught background in programming. My journey in technology began at the age of 10 (2000) when I first delved into programming and IT fundamentals."
}
```

### Collection: `tech_profile`

Contains technical profile information for the neofetch display.

```javascript
{
  _id: ObjectId,        // MongoDB generated ID
  category: String,     // Category of the tech info (e.g., 'os', 'languages')
  value: String         // Value for the category
}
```

#### Indexes

- `category`: 1 (ascending) - For quickly finding entries by category

#### Example Document

```javascript
{
  _id: ObjectId("60d21b4667d0d8992e610c86"),
  category: "languages",
  value: "C#, Java, JavaScript, C, C++, Go"
}
```

### Collection: `timeline`

Contains work history and experience entries.

```javascript
{
  _id: ObjectId,           // MongoDB generated ID
  company: String,         // Company name
  position: String,        // Job title/position
  description: String,     // Job description
  startDate: String,       // ISO date format (YYYY-MM-DD)
  endDate: String | null,  // ISO date format or null for "Present"
  skills: [String]         // Array of skills used in this position
}
```

#### Indexes

- `startDate`: -1 (descending) - For sorting entries by date

#### Example Document

```javascript
{
  _id: ObjectId("60d21b4667d0d8992e610c86"),
  company: "Tech Innovations Inc.",
  position: "Senior Software Engineer",
  description: "Led the development of a cloud-native microservices architecture that improved system scalability by 300%.",
  startDate: "2020-01-01",
  endDate: null,
  skills: ["Kubernetes", "Docker", "Go", "TypeScript", "AWS", "CI/CD"]
}
```

### Collection: `projects`

Contains project showcase entries.

```javascript
{
  _id: ObjectId,                // MongoDB generated ID
  title: String,                // Project title
  description: String,          // Project description
  technologies: [String],       // Array of technologies used
  repoUrl: String | undefined,  // GitHub/repository URL (optional)
  liveUrl: String | undefined,  // Live demo URL (optional)
  imageUrl: String | undefined, // Project image URL (optional)
  featured: Boolean             // Whether the project should be featured
}
```

#### Indexes

- `featured`: 1 (ascending) - For quickly finding featured projects

#### Example Document

```javascript
{
  _id: ObjectId("60d21b4667d0d8992e610c87"),
  title: "Cloud Orchestration Platform",
  description: "A comprehensive platform for managing and orchestrating cloud resources across multiple providers with a unified interface.",
  technologies: ["Go", "React", "Kubernetes", "Terraform", "AWS", "GCP", "Azure"],
  repoUrl: "https://github.com/mycompany/cloud-orchestrator",
  liveUrl: "https://cloud-orchestrator.example.com",
  imageUrl: "/projects/cloud-orchestrator.jpg",
  featured: true
}
```

### Collection: `blogs`

Contains blog posts.

```javascript
{
  _id: ObjectId,        // MongoDB generated ID
  title: String,        // Blog post title
  slug: String,         // URL-friendly identifier
  description: String,  // Short description/excerpt
  content: String,      // Full Markdown content
  date: String,         // ISO date format (YYYY-MM-DD)
  tags: [String],       // Array of tags/categories
  author: String,       // Author name
  createdAt: Date       // Timestamp when the post was created
}
```

#### Indexes

- `slug`: 1 (ascending) - For quickly finding posts by slug
- `createdAt`: -1 (descending) - For sorting posts by creation date
- `tags`: 1 (ascending) - For filtering posts by tag

#### Example Document

```javascript
{
  _id: ObjectId("60d21b4667d0d8992e610c88"),
  title: "Building a Terminal-Style Portfolio Website",
  slug: "building-terminal-portfolio",
  description: "A deep dive into creating an interactive terminal-style portfolio website using Next.js and Tailwind CSS.",
  content: "# Building a Terminal-Style Portfolio Website\n\nAs a developer who spends most of my time in the terminal...",
  date: "2023-08-14",
  tags: ["nextjs", "tailwindcss", "portfolio", "frontend"],
  author: "mycompany",
  createdAt: ISODate("2023-08-14T00:00:00Z")
}
```

### Collection: `contact_submissions`

Contains form submissions from the contact page.

```javascript
{
  _id: ObjectId,        // MongoDB generated ID
  name: String,         // Sender's name
  email: String,        // Sender's email
  subject: String,      // Message subject
  message: String,      // Message content
  createdAt: Date,      // Timestamp when the message was submitted
  read: Boolean         // Whether the message has been read
}
```

#### Indexes

- `createdAt`: -1 (descending) - For sorting submissions by date
- `read`: 1 (ascending) - For filtering unread messages

#### Example Document

```javascript
{
  _id: ObjectId("60d21b4667d0d8992e610c89"),
  name: "John Doe",
  email: "john.doe@example.com",
  subject: "Project Inquiry",
  message: "I'm interested in discussing a potential project for my company. Could we schedule a call to discuss details?",
  createdAt: ISODate("2023-09-15T14:30:00Z"),
  read: false
}
```

## Data Relationships

This database uses a denormalized data model, where each collection is independent and contains all the data needed for its specific functionality. There are no explicit relationships between collections that require joins or lookups.

## Validation Rules

The application performs validation in the API layer before inserting documents into MongoDB. Key validation rules include:

- **Contact Submissions**: Email must be in a valid format
- **Blog Posts**: Slugs must be unique
- **Timeline Entries**: Start date must be before end date (if end date exists)

## Performance Considerations

- The database is relatively small and simple, so performance optimizations are minimal
- Indexes are created on fields used for sorting and filtering
- The application uses connection pooling to minimize connection overhead
