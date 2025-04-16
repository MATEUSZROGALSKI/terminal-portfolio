# Dynamic Content Loading

This document explains how the terminal portfolio website loads content dynamically from MongoDB.

## Overview

The application is designed to fetch all content from MongoDB at runtime, rather than generating static pages during the build process. This approach has several advantages:

1. **Content can be updated without rebuilding the application**
2. **The application works with any MongoDB instance with the correct schema**
3. **Content is always fresh and up-to-date**
4. **The same Docker image can be used with different content**

## Implementation Details

### API Routes

The application uses Next.js API routes to fetch data from MongoDB:

- `/api/v1/about` - Fetches about me information
- `/api/v1/blogs` - Fetches all blog posts
- `/api/v1/blogs/[slug]` - Fetches a specific blog post by slug
- `/api/v1/projects` - Fetches all projects
- `/api/v1/tech-profile` - Fetches technical profile information
- `/api/v1/timeline` - Fetches work history/timeline entries
- `/api/v1/contact` - Handles contact form submissions

### Client-Side Data Fetching

Each component that displays data fetches it from the API at runtime:

```typescript
// Example from AboutMe.tsx
useEffect(() => {
  const fetchData = async () => {
    try {
      // Fetch about data
      const aboutResponse = await fetch('/api/v1/about');
      if (!aboutResponse.ok) {
        throw new Error(`Failed to fetch about data: ${aboutResponse.statusText}`);
      }
      const aboutData = await aboutResponse.json();
      setAboutData(aboutData.items);

      // Fetch tech profile data
      const techProfileResponse = await fetch('/api/v1/tech-profile');
      if (!techProfileResponse.ok) {
        throw new Error(`Failed to fetch tech profile data: ${techProfileResponse.statusText}`);
      }
      const techProfileData = await techProfileResponse.json();
      setTechProfile(techProfileData.items);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load information. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  fetchData();
}, []);
```

### MongoDB Connection

The application connects to MongoDB using environment variables:

```typescript
// From src/lib/mongodb.ts
const MONGODB_URI = process.env.MONGODB_URI as string;
const MONGODB_DB = process.env.MONGODB_DB as string;

export async function connectToDatabase(): Promise<MongoConnection> {
  // If we already have a connection, use it
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  // Create a new connection
  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  const db = client.db(MONGODB_DB);

  // Cache the connection
  cachedClient = client;
  cachedDb = db;

  return { client, db };
}
```

### Next.js Configuration

The Next.js configuration is optimized for dynamic content:

```javascript
// next.config.js
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  swcMinify: true,
  // Disable static generation for dynamic content
  staticPageGenerationTimeout: 0,
  // Ensure all pages are server-side rendered by default
  experimental: {
    // Prefer server components for dynamic content
    serverComponentsExternalPackages: ['mongodb']
  }
}
```

## Environment Variables

To connect to MongoDB, the application requires the following environment variables:

- `MONGODB_URI`: The MongoDB connection string (default: `mongodb://mongodb:27017`)
- `MONGODB_DB`: The database name (default: `portfolio`)

These variables can be set in the Docker environment or in a `.env.local` file for local development.

## Seeding the Database

For initial setup or testing, you can seed the database with sample data:

```bash
npm run seed-db
```

This script will clear any existing data and insert sample data into all collections.

## Error Handling

All components that fetch data include error handling and loading states:

1. **Loading State**: Displays a loading message or animation while data is being fetched
2. **Error State**: Displays an error message if data fetching fails
3. **Empty State**: Handles cases where no data is returned

This ensures a good user experience even if there are issues with the database connection.

## Deployment Considerations

When deploying the application:

1. Ensure the MongoDB connection string is correctly set in the environment
2. Make sure the MongoDB instance is accessible from the application
3. Seed the database with initial content if needed
4. Consider using a MongoDB Atlas cluster for production deployments

## Testing Dynamic Content

To test that content is being loaded dynamically:

1. Start the application with a connection to a MongoDB instance
2. Add or modify content in the database
3. Refresh the application to see the changes without rebuilding

This confirms that the application is truly dynamic and not relying on static content.
