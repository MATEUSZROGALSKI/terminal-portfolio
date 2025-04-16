export interface BlogPost {
  id: string;
  title: string;
  content: string;
  date: string;
  tags: string[];
  author: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 'building-terminal-portfolio',
    title: 'Building a Terminal-Style Portfolio Website',
    content: `# Building a Terminal-Style Portfolio Website

A terminal-themed portfolio site offers a unique way to showcase your work while demonstrating your technical skills and creativity.

## Why a Terminal Theme?

For developers, the terminal is our natural habitat. We spend hours interacting with command-line interfaces, so a terminal-themed portfolio creates an immediate connection with technical audiences. It's both nostalgic and modern - a perfect representation of the developer mindset.

## Key Components

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

- Balancing authenticity with usability
- Making the interface responsive
- Ensuring accessibility despite the unconventional UI
- Creating engaging content within the constraints

## Future Enhancements

This is just the beginning! Future updates might include:

- Interactive command execution
- Auto-complete functionality
- More extensive command history
- Custom themes and color schemes
- Easter eggs and hidden commands

Feel free to explore the site using terminal commands and discover all its features!`,
    date: 'Oct 15, 2023',
    tags: ['next.js', 'tailwind', 'react'],
    author: 'mycompany'
  },
  {
    id: 'modern-devops-practices',
    title: 'Modern DevOps Practices for Small Teams',
    content: `# Modern DevOps Practices for Small Teams

As small teams, we often struggle to implement DevOps practices that seem designed for large organizations with dedicated infrastructure teams. This post explores practical DevOps strategies that work for teams of any size.

## The DevOps Mindset

DevOps isn't just about tools - it's a philosophy that emphasizes:

- Collaboration between development and operations
- Automation to reduce manual work
- Measurement for continuous improvement
- Sharing of knowledge and responsibilities

## Essential Practices for Small Teams

### 1. Automate Your CI/CD Pipeline

Even a simple pipeline is better than none. Start with:
- Automated testing
- Code quality checks
- Automated deployments

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

- **GitHub Actions/GitLab CI**: For CI/CD pipelines
- **Docker**: For consistent environments
- **Terraform**: For infrastructure as code
- **Prometheus/Grafana**: For monitoring
- **Dependabot**: For dependency management

## Starting Small

DevOps is a journey, not a destination:
1. Identify your biggest pain points
2. Start with one improvement
3. Measure the impact
4. Iterate and expand

By implementing these practices incrementally, even the smallest teams can achieve DevOps success without becoming overwhelmed.`,
    date: 'Sep 28, 2023',
    tags: ['devops', 'CI/CD', 'docker'],
    author: 'mycompany'
  },
  {
    id: 'typescript-advanced-patterns',
    title: 'Advanced TypeScript Patterns I Use Every Day',
    content: `# Advanced TypeScript Patterns I Use Every Day

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
    date: 'Aug 14, 2023',
    tags: ['typescript', 'javascript', 'patterns'],
    author: 'mycompany'
  }
];

export const getBlogPost = (slug: string) => {
  return blogPosts.find(post => post.id === slug) || null;
}; 