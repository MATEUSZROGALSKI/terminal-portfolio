// MongoDB initialization script
// Run with: node scripts/init-mongodb.js

const { MongoClient } = require('mongodb');

// Connection URL and Database Name from the devcontainer environment
const url = 'mongodb://mongodb:27017';
const dbName = 'portfolio';

// Sample data for each collection
const aboutData = [
  {
    content: "I am a seasoned software developer with a self-taught background in programming. My journey in technology began at the age of 10 (2000) when I first delved into programming and IT fundamentals. By age 11 (2001), I had already developed my first web application using HTML and JavaScript."
  },
  {
    content: "In the following years, I explored various programming languages, with a particular focus on C# and Java. I've developed a strong foundation in backend development, server architecture, and security practices."
  },
  {
    content: "I specialize in server-side development, creating robust APIs, implementing secure server-to-server communication protocols, and building high-performance game and web servers. My expertise extends to pentesting and identifying security vulnerabilities in systems."
  },
  {
    content: "As a backend engineer with a strong focus on software architecture and DevOps, I'm passionate about creating scalable, secure, and efficient systems that solve complex problems. I enjoy working with containerization technologies and implementing CI/CD pipelines for seamless deployment."
  }
];

// Technical profile data for neofetch display
const techProfileData = [
  {
    category: "os",
    value: "Windows & Debian Linux"
  },
  {
    category: "languages",
    value: "C#, Java, JavaScript, C, C++, Go"
  },
  {
    category: "databases",
    value: "MongoDB, PostgreSQL, SQL Server"
  },
  {
    category: "tools",
    value: "Visual Studio, VS Code, Docker"
  },
  {
    category: "specialties",
    value: "Web APIs, Server Architecture, Security, Pentesting"
  },
  {
    category: "focus",
    value: "Backend Engineering, DevOps, Software Architecture"
  }
];

const timelineData = [
  {
    company: "Tech Innovations Inc.",
    position: "Senior Software Engineer",
    description: "Led the development of a cloud-native microservices architecture that improved system scalability by 300%. Mentored junior developers and implemented CI/CD pipelines that reduced deployment time by 75%.",
    startDate: "2020-01-01",
    endDate: null, // Present
    skills: ["Kubernetes", "Docker", "Go", "TypeScript", "AWS", "CI/CD"]
  },
  {
    company: "DataSystems Corp",
    position: "Full Stack Developer",
    description: "Developed and maintained multiple web applications using React and Node.js. Implemented a new authentication system that improved security and reduced login issues by 90%.",
    startDate: "2017-03-15",
    endDate: "2019-12-31",
    skills: ["React", "Node.js", "MongoDB", "Express", "JavaScript", "AWS"]
  },
  {
    company: "WebSolutions Ltd",
    position: "Frontend Developer",
    description: "Created responsive web interfaces for various clients. Optimized application performance resulting in a 40% improvement in load times.",
    startDate: "2015-06-01",
    endDate: "2017-03-01",
    skills: ["HTML5", "CSS3", "JavaScript", "Angular", "SASS", "Webpack"]
  },
  {
    company: "StartupHub",
    position: "Junior Developer",
    description: "Assisted in the development of web applications and learned modern development practices. Contributed to an open-source project that gained over 500 stars on GitHub.",
    startDate: "2013-09-01",
    endDate: "2015-05-30",
    skills: ["PHP", "jQuery", "MySQL", "Bootstrap", "Git"]
  }
];

const projectsData = [
  {
    title: "Cloud Orchestration Platform",
    description: "A comprehensive platform for managing and orchestrating cloud resources across multiple providers with a unified interface.",
    technologies: ["Go", "React", "Kubernetes", "Terraform", "AWS", "GCP", "Azure"],
    repoUrl: "https://github.com/mycompany/cloud-orchestrator",
    liveUrl: "https://cloud-orchestrator.example.com",
    imageUrl: "/projects/cloud-orchestrator.jpg",
    featured: true
  },
  {
    title: "Real-time Analytics Dashboard",
    description: "A real-time data visualization dashboard for monitoring system metrics and business KPIs with customizable alerts.",
    technologies: ["TypeScript", "React", "Node.js", "Socket.io", "D3.js", "Redis", "TimescaleDB"],
    repoUrl: "https://github.com/mycompany/analytics-dashboard",
    liveUrl: "https://analytics.example.com",
    imageUrl: "/projects/analytics-dashboard.jpg",
    featured: true
  },
  {
    title: "Distributed Task Queue",
    description: "A high-performance distributed task queue system designed for reliability and horizontal scalability.",
    technologies: ["Rust", "Redis", "gRPC", "Prometheus", "Docker"],
    repoUrl: "https://github.com/mycompany/task-queue",
    featured: false
  },
  {
    title: "E-commerce Microservices",
    description: "A complete e-commerce platform built with a microservices architecture for high availability and scalability.",
    technologies: ["Java", "Spring Boot", "Kafka", "MongoDB", "PostgreSQL", "Docker", "Kubernetes"],
    repoUrl: "https://github.com/mycompany/ecommerce-microservices",
    liveUrl: "https://shop.example.com",
    imageUrl: "/projects/ecommerce.jpg",
    featured: false
  },
  {
    title: "DevOps Automation Toolkit",
    description: "A collection of tools and scripts for automating common DevOps tasks and infrastructure management.",
    technologies: ["Python", "Ansible", "Bash", "Terraform", "GitHub Actions"],
    repoUrl: "https://github.com/mycompany/devops-toolkit",
    featured: false
  }
];

const blogsData = [
  {
    title: "Building a Terminal-Style Portfolio Website",
    slug: "building-terminal-portfolio",
    description: "A deep dive into creating an interactive terminal-style portfolio website using Next.js and Tailwind CSS.",
    content: `# Building a Terminal-Style Portfolio Website

As a developer who spends most of my time in the terminal, I wanted my portfolio to reflect that experience. In this post, I'll walk through how I built this terminal-style portfolio website using Next.js and Tailwind CSS.

## Key Features

1. **Command Line Interface**: The core of the experience is simulating terminal commands and responses
2. **ASCII Art**: For that authentic terminal feel
3. **Monospace Fonts**: Essential for maintaining the terminal aesthetic
4. **Command History**: Shows previous interactions
5. **Blinking Cursor**: Adds life to the interface

## Implementation Details

This portfolio was built using Next.js and Tailwind CSS, with special attention to:

- Realistic terminal styling
- Command-based navigation
- Responsive design that works on all devices
- Accessibility considerations
- Performance optimization

## Challenges

Creating a terminal interface that's both authentic and user-friendly presented several challenges:

- Balancing authenticity with usability for non-technical visitors
- Ensuring responsive design works across all device sizes
- Maintaining accessibility despite the unconventional interface
- Optimizing performance with animated elements

## The Code

Here's a simplified version of the command component that powers the terminal:

\`\`\`typescript
const Command = ({ command, children }) => {
  const { defaults } = useAppContext();

  return (
    <div className="mb-6">
      <div className="command-line">
        <span className="prompt">$ {defaults.companyName.toLowerCase()}@{defaults.projectName}:</span>
        <span className="command">{command}</span>
      </div>
      <div className="command-output">
        {children}
      </div>
    </div>
  );
};
\`\`\`

## Lessons Learned

Building this portfolio taught me several valuable lessons:

1. **User Experience Matters**: Even when creating a developer-focused interface, user experience should be a priority
2. **CSS Can Be Powerful**: With modern CSS features, you can create rich, interactive experiences without heavy JavaScript
3. **Accessibility Requires Intention**: Making unconventional interfaces accessible requires deliberate planning
4. **Performance Optimization Is Worth It**: Taking time to optimize animations and transitions makes a noticeable difference

I hope this inspires you to create your own unique portfolio that showcases not just your work, but your personality and interests as a developer.`,
    date: "2023-08-14",
    tags: ["nextjs", "tailwindcss", "portfolio", "frontend"],
    author: "mycompany",
    createdAt: new Date("2023-08-14")
  },
  {
    title: "Mastering TypeScript: Advanced Patterns for Robust Applications",
    slug: "typescript-advanced-patterns",
    description: "Explore advanced TypeScript patterns that can help you build more robust and maintainable applications.",
    content: `# Mastering TypeScript: Advanced Patterns for Robust Applications

After years of working with TypeScript, I've collected patterns that have proven valuable across many projects. These aren't just academic exercises - they're practical tools I use daily.

## Type Utilities That Save Time

### The Safe Get Pattern

Safely access deeply nested properties with type checking:

\`\`\`typescript
// Define a type-safe getter function
function get<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

// For deeper paths, use a more complex utility
type PathsToString<T> = T extends object
  ? { [K in keyof T]: K extends string
      ? K | \`\${K}.\${PathsToString<T[K]>}\`
      : never
    }[keyof T]
  : never;

function deepGet<T, P extends PathsToString<T>>(
  obj: T,
  path: P
): any {
  return path.split('.').reduce((o, p) => o?.[p], obj as any);
}
\`\`\`

### Discriminated Unions

Essential for modeling state machines and complex domain logic:

\`\`\`typescript
type NetworkState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success', data: User[] }
  | { status: 'error', error: Error };

function handleNetworkState(state: NetworkState) {
  switch (state.status) {
    case 'idle':
      return 'Waiting to fetch data';
    case 'loading':
      return 'Loading...';
    case 'success':
      return \`Loaded \${state.data.length} users\`;
    case 'error':
      return \`Error: \${state.error.message}\`;
  }
}
\`\`\`

## Advanced Generic Patterns

### Builder Pattern with Method Chaining

Type-safe builders provide excellent developer experience:

\`\`\`typescript
class QueryBuilder<T> {
  private filters: Record<string, any> = {};

  where<K extends keyof T>(key: K, value: T[K]): QueryBuilder<T> {
    this.filters[key as string] = value;
    return this;
  }

  build(): Record<string, any> {
    return this.filters;
  }
}

// Usage
interface User {
  id: number;
  name: string;
  role: 'admin' | 'user';
}

const query = new QueryBuilder<User>()
  .where('role', 'admin')
  .where('name', 'John')
  .build();
\`\`\`

### Mapped Types for API Responses

Handle API responses consistently:

\`\`\`typescript
type ApiResponse<T> =
  | { status: 'success'; data: T }
  | { status: 'error'; error: string };

// Create typed API functions
function createApi<T extends Record<string, any>>(
  endpoints: { [K in keyof T]: (args: any) => Promise<T[K]> }
) {
  return endpoints;
}

// Usage
const api = createApi({
  getUser: async (id: number): Promise<ApiResponse<User>> => {
    // Implementation
    return { status: 'success', data: { id, name: 'John', role: 'admin' } };
  }
});
\`\`\`

## Type-Level Programming

### Conditional Types

Powerful for complex type transformations:

\`\`\`typescript
// Remove nullable properties from an interface
type NonNullableProperties<T> = {
  [P in keyof T]: NonNullable<T[P]>;
};

// Convert a type with callbacks to Promise-based
type PromisifyFn<T> = T extends (...args: infer A) => infer R
  ? (...args: A) => Promise<R>
  : never;
\`\`\`

These patterns have saved me countless hours of debugging and made my code more robust. The real value comes not just from catching errors at compile time, but from the improved developer experience and code clarity they provide.`,
    date: "2023-06-22",
    tags: ["typescript", "javascript", "patterns"],
    author: "mycompany",
    createdAt: new Date("2023-06-22")
  },
  {
    title: "Implementing DevOps in Small Teams: A Practical Guide",
    slug: "devops-small-teams",
    description: "Learn how small development teams can implement DevOps practices without overwhelming resources.",
    content: `# Implementing DevOps in Small Teams: A Practical Guide

DevOps doesn't have to be overwhelming for small teams. In this guide, I'll share practical approaches to implementing DevOps practices that scale with your team size.

## Start Small, Think Big

The key to successful DevOps adoption in small teams is to start with high-impact, low-effort practices:

1. **Automate the Build Process**: Set up a simple CI pipeline before anything else
2. **Standardize Environments**: Use containers to ensure consistency
3. **Implement Basic Monitoring**: Start with application logs and simple health checks
4. **Adopt Infrastructure as Code**: Begin with your most critical infrastructure components

## Essential Practices for Small Teams

### 1. Continuous Integration

Start with a simple CI pipeline that:
- Runs tests on every commit
- Builds artifacts
- Reports code quality issues

GitHub Actions, GitLab CI, or CircleCI are excellent starting points that require minimal setup.

### 2. Infrastructure as Code

Document your infrastructure decisions through code:
- Use tools like Terraform, AWS CloudFormation, or Pulumi
- Version control your infrastructure alongside your application code
- Create reproducible environments

### 3. Monitoring and Observability

You can't improve what you can't measure:
- Implement application and server monitoring
- Set up alerts for critical issues
- Track key performance metrics
- Create dashboards for visibility

### 4. Security as Code

Security shouldn't be an afterthought:
- Implement security scanning in your pipeline
- Use dependency vulnerability scanning
- Automate compliance checks

## Tools That Won't Overwhelm You

For small teams, these tools provide significant benefits without massive overhead:

1. **GitHub Actions or GitLab CI**: Simple CI/CD that integrates with your code repository
2. **Terraform**: Infrastructure as code that works with multiple cloud providers
3. **Docker**: Containerize your applications for consistency
4. **Prometheus + Grafana**: Open-source monitoring and visualization
5. **Dependabot**: Automated dependency updates

## Measuring Success

How do you know if your DevOps implementation is working? Track these metrics:

- **Deployment Frequency**: How often you can deploy to production
- **Lead Time for Changes**: Time from code commit to production deployment
- **Mean Time to Recovery**: How quickly you can recover from failures
- **Change Failure Rate**: Percentage of deployments causing failures

## Conclusion

DevOps isn't about implementing every practice at once. For small teams, the key is to focus on practices that provide the most value with the least overhead. Start small, measure the impact, and gradually expand your DevOps practices as your team grows.

Remember: The goal of DevOps is to improve your ability to deliver value to users, not to implement processes for their own sake.`,
    date: "2023-04-10",
    tags: ["devops", "ci-cd", "automation", "infrastructure"],
    author: "mycompany",
    createdAt: new Date("2023-04-10")
  }
];

const contactSubmissionsData = [
  {
    name: "John Doe",
    email: "john.doe@example.com",
    subject: "Project Inquiry",
    message: "I'm interested in discussing a potential project for my company. Could we schedule a call to discuss details?",
    createdAt: new Date("2023-09-15"),
    read: true
  },
  {
    name: "Jane Smith",
    email: "jane.smith@example.com",
    subject: "Collaboration Opportunity",
    message: "I came across your portfolio and I'm impressed with your work. I'd like to discuss a potential collaboration on an open-source project.",
    createdAt: new Date("2023-10-20"),
    read: false
  }
];

// Connect to MongoDB
async function seedDatabase() {
  let client;

  try {
    // Connect to MongoDB
    client = new MongoClient(url);
    await client.connect();
    console.log('Connected to MongoDB server');

    // Get database reference
    const db = client.db(dbName);

    // Clear existing collections
    await db.collection('about').deleteMany({});
    await db.collection('tech_profile').deleteMany({});
    await db.collection('timeline').deleteMany({});
    await db.collection('projects').deleteMany({});
    await db.collection('blogs').deleteMany({});
    await db.collection('contact_submissions').deleteMany({});

    // Insert data into collections
    if (aboutData.length > 0) {
      const aboutResult = await db.collection('about').insertMany(aboutData);
      console.log(`${aboutResult.insertedCount} about documents inserted`);
    }

    if (techProfileData.length > 0) {
      const techProfileResult = await db.collection('tech_profile').insertMany(techProfileData);
      console.log(`${techProfileResult.insertedCount} tech profile documents inserted`);
    }

    if (timelineData.length > 0) {
      const timelineResult = await db.collection('timeline').insertMany(timelineData);
      console.log(`${timelineResult.insertedCount} timeline documents inserted`);
    }

    if (projectsData.length > 0) {
      const projectsResult = await db.collection('projects').insertMany(projectsData);
      console.log(`${projectsResult.insertedCount} project documents inserted`);
    }

    if (blogsData.length > 0) {
      const blogsResult = await db.collection('blogs').insertMany(blogsData);
      console.log(`${blogsResult.insertedCount} blog documents inserted`);
    }

    if (contactSubmissionsData.length > 0) {
      const contactResult = await db.collection('contact_submissions').insertMany(contactSubmissionsData);
      console.log(`${contactResult.insertedCount} contact submissions inserted`);
    }

    console.log('Database seeding completed successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // Close the connection
    if (client) {
      await client.close();
      console.log('MongoDB connection closed');
    }
  }
}

// Run the seeding function
seedDatabase().catch(console.error);
