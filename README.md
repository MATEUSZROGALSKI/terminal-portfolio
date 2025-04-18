# Terminal-Style Portfolio Website

A terminal-themed portfolio website built with Next.js, Tailwind CSS, and MongoDB. This project creates an interactive terminal-like interface with a dark theme inspired by Garuda Mokka and Dr4gonized Linux terminals.

## Features

- Terminal-style interface with command-based navigation
- Responsive design that works on all devices
- Dark theme with animated background and terminal aesthetics
- Blog section with Markdown support and custom font size modifiers
- Projects showcase with process list visualization (htop-style)
- Timeline/history section displayed as git log
- About section styled like neofetch output
- Contact form with SMTP-like interaction
- MongoDB integration for dynamic content
- Docker support for development and production
- Unified font size system for consistent UI

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- MongoDB (included in the devcontainer)

### Using Docker

#### Option 1: Docker Compose (Recommended)

The easiest way to run the application with MongoDB is using Docker Compose:

```bash
# Clone the repository to get the docker-compose.yml file
git clone https://github.com/mateuszrogalski/terminal-portfolio.git
cd terminal-portfolio

# Start the application and MongoDB
docker-compose up -d

# Seed the database (first time only)
docker-compose exec app npm run seed-db
```

#### Option 2: Docker Run

You can also run just the application container:

```bash
# Pull the image from GitHub Container Registry
docker pull ghcr.io/mateuszrogalski/terminal-portfolio:latest

# Run the container
docker run -p 3000:3000 -e MONGODB_URI=your_mongodb_uri ghcr.io/mateuszrogalski/terminal-portfolio:latest
```

Visit http://localhost:3000 in your browser.

### Manual Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/mateuszrogalski/terminal-portfolio.git
   cd terminal-portfolio
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Seed the MongoDB database:

   ```bash
   npm run seed-db
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Dynamic Content Loading

The application is designed to load all content dynamically from MongoDB. This means:

- All blog posts, projects, timeline entries, and about information are fetched from the database at runtime
- No content is statically generated during the build process
- The application will work with any MongoDB instance as long as it has the correct schema
- Content can be updated without rebuilding the application

### MongoDB Data Structure

The application uses MongoDB to store the following collections:

### About Collection

Contains paragraphs for the "About Me" section.

```javascript
{
  _id: ObjectId,
  content: String
}
```

### Timeline Collection

Contains work history and experience entries.

```javascript
{
  _id: ObjectId,
  company: String,
  position: String,
  description: String,
  startDate: String, // ISO date format
  endDate: String | null, // ISO date format or null for "Present"
  skills: [String]
}
```

### Projects Collection

Contains project showcase entries.

```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  technologies: [String],
  repoUrl: String | undefined,
  liveUrl: String | undefined,
  imageUrl: String | undefined,
  featured: Boolean
}
```

### Blogs Collection

Contains blog posts.

```javascript
{
  _id: ObjectId,
  title: String,
  slug: String,
  description: String,
  content: String, // Markdown content
  date: String, // ISO date format
  tags: [String],
  author: String,
  createdAt: Date
}
```

### Contact Submissions Collection

Contains form submissions from the contact page.

```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  subject: String,
  message: String,
  createdAt: Date,
  read: Boolean
}
```

## Development

### MongoDB Connection

The application connects to MongoDB using the connection string specified in the environment variables:

- `MONGODB_URI`: The MongoDB connection string (default: `mongodb://mongodb:27017`)
- `MONGODB_DB`: The database name (default: `portfolio`)

When running in the devcontainer, these variables are automatically set in the `docker-compose.yml` file.

### Seeding the Database

To populate the database with sample data, run:

```bash
npm run seed-db
```

This script will clear any existing data and insert sample data into all collections.

## Documentation

Detailed documentation is available in the `docs/` directory:

- [UI Styling Guide](./docs/ui-styling.md) - Information about the styling approach, font system, and component styling
- [Blog Formatting Guide](./docs/blog-formatting.md) - How to format blog posts with Markdown and custom font size modifiers
- [MongoDB Schema Documentation](./docs/mongodb-schema.md) - Database schema design and collections
- [Dynamic Content Loading](./docs/dynamic-content.md) - Explanation of how the application loads content dynamically from MongoDB

## Customization

### Styling System

The project uses a unified font size system with CSS variables to ensure consistency across components. All terminal components use the same font size (`--terminal-font-size`), while blog posts support custom font size modifiers.

Key styling features:

- Dark theme with terminal aesthetics
- Monospace fonts (JetBrains Mono)
- Purple and orange accent colors
- Terminal-like UI elements
- Component-specific CSS files

See the [UI Styling Guide](./docs/ui-styling.md) for more details.

### Changing the Theme

The theme colors are defined in `src/app/globals.css` using CSS variables. You can modify these variables to change the color scheme.

### Adding Content

To add or modify content, you can either:

1. Update the seed data in `scripts/init-mongodb.js` and run `npm run seed-db` again
2. Use the MongoDB shell or a GUI tool like MongoDB Compass to directly edit the data

## Docker

### Docker Compose

The repository includes a `docker-compose.yml` file that sets up both the application and MongoDB:

```bash
# Start the application and MongoDB
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the application
docker-compose down

# Stop the application and remove volumes
docker-compose down -v
```

### Building the Docker Image Locally

To build the Docker image locally:

```bash
docker build -t terminal-portfolio .
```

To run the locally built image:

```bash
docker run -p 3000:3000 -e MONGODB_URI=your_mongodb_uri terminal-portfolio
```

### GitHub Container Registry

This project is automatically built and published to GitHub Container Registry (ghcr.io) using GitHub Actions. The workflow runs on pushes to the master branch and creates two tags:

- `latest`: Always points to the most recent build from the master branch
- `sha-<commit>`: Tagged with the short commit SHA for version tracking

You can pull specific versions using:

```bash
docker pull ghcr.io/mateuszrogalski/terminal-portfolio:latest
docker pull ghcr.io/mateuszrogalski/terminal-portfolio:sha-abc1234
```

See the [CI/CD Documentation](./docs/ci-cd.md) for more details on the build and deployment process.

### Docker Image Optimizations

The Docker image has been optimized for production use:

- Uses Alpine Linux base image for minimal size
- Multi-stage build process to reduce final image size
- Runs as a non-root user for improved security
- Leverages Next.js standalone output mode
- Disables Next.js telemetry
- Sets appropriate resource limits
- Properly handles caching for faster builds

## License

This project is licensed under the MIT License - see the LICENSE file for details.
