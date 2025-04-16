'use client';

import React, { useState, useEffect } from 'react';

interface ProjectProps {
  _id: string;
  title: string;
  description: string;
  technologies: string[];
  repoUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  featured: boolean;
}

type ProcessProps = {
  project: ProjectProps;
};

// These functions were replaced with deterministic values based on project ID
// to prevent flickering and ensure stable display

// Generate a command based on technologies
const generateCommand = (technologies: string[]) => {
  const tech = technologies[0]?.toLowerCase() || 'node';

  const commands: Record<string, string> = {
    'react': 'npm start -- --port=300',
    'vue': 'vue-cli-service serve',
    'angular': 'ng serve',
    'node': 'node server.js',
    'express': 'node app.js',
    'java': 'java -jar app.jar',
    'spring': 'mvn spring-boot:run',
    'python': 'python app.py',
    'django': 'python manage.py runserver',
    'flask': 'flask run',
    'go': './main',
    'rust': './target/release/app',
    'php': 'php -S localhost:8000',
    'laravel': 'php artisan serve',
    'ruby': 'ruby app.rb',
    'rails': 'rails server',
    'c#': 'dotnet run',
    '.net': 'dotnet run',
    'docker': 'docker-compose up',
    'kubernetes': 'kubectl apply -f deployment.yaml',
    'terraform': 'terraform apply',
    'aws': 'aws cloudformation deploy',
    'gcp': 'gcloud app deploy',
    'azure': 'az webapp up',
  };

  return commands[tech] || `run-project --name=${tech}`;
};

// Process component representing a single project
const Process = ({ project }: ProcessProps) => {
  // Use project ID to generate stable values for each project
  const projectIdNum = parseInt(project._id.substring(0, 8), 16) || 1000;

  // Use React state to create slightly varying CPU and memory values
  const [cpuVariation, setCpuVariation] = useState(0);
  const [memVariation, setMemVariation] = useState(0);

  // Update variations every few seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCpuVariation(Math.random() * 2 - 1); // -1 to +1 variation
      setMemVariation(Math.random() * 1 - 0.5); // -0.5 to +0.5 variation
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  // Generate stable base values based on project ID
  const pid = 1000 + (projectIdNum % 9000);
  const user = 'developer';

  // Base CPU between 1-10% with small variations
  const baseCpu = (projectIdNum % 10) + 1; // 1-10%
  const cpuUsage = Math.max(1, Math.min(10, baseCpu + cpuVariation)).toFixed(1);

  // Base memory between 1-5% with small variations
  const baseMem = ((projectIdNum % 5) + 1); // 1-5%
  const memUsage = Math.max(1, Math.min(5, baseMem + memVariation)).toFixed(1);

  const hours = (projectIdNum % 24).toString().padStart(2, '0');
  const minutes = (projectIdNum % 60).toString().padStart(2, '0');
  const seconds = ((projectIdNum * 7) % 60).toString().padStart(2, '0');
  const uptime = `${hours}:${minutes}:${seconds}`;
  const command = generateCommand(project.technologies);

  // Calculate CPU bar width (max 6 chars to prevent overlap)
  const cpuBarWidth = Math.floor(parseFloat(cpuUsage) * 0.6); // 10% * 0.6 = 6 chars max
  // Use horizontal bars instead of blocks
  const cpuBar = '═'.repeat(Math.min(cpuBarWidth, 6)) + '┈'.repeat(Math.max(0, 6 - cpuBarWidth));

  // Calculate memory bar width (max 6 chars to prevent overlap)
  const memBarWidth = Math.floor(parseFloat(memUsage) * 1.2); // 5% * 1.2 = 6 chars max
  // Use horizontal bars instead of blocks
  const memBar = '═'.repeat(Math.min(memBarWidth, 6)) + '┈'.repeat(Math.max(0, 6 - memBarWidth));

  // Determine process color based on featured status
  const processColor = project.featured ? 'text-green-400' : 'text-blue-300';

  return (
    <div className="mb-1">
      {/* Process header line */}
      <div className={`flex items-center ${processColor}`}>
        <span className="w-16 mr-2">{pid}</span>
        <span className="w-20 mr-2">{user}</span>
        <span className="w-12 mr-2">{cpuUsage}%</span>
        <span className="w-12 mr-2">{memUsage}%</span>
        <span className="w-16 mr-2">{uptime}</span>
        <span className="font-bold">
          {project.title}
          {project.featured && <span className="text-yellow-400 ml-2">[featured]</span>}
        </span>
      </div>

      {/* CPU and memory bars */}
      <div className="ml-4 flex items-center">
        <span className="w-16 text-gray-400 mr-2">CPU[%]:</span>
        <span className="w-20 mr-4 inline-block h-4 overflow-hidden">
          <span className="text-green-500 leading-none">{cpuBar}</span>
        </span>
        <span className="text-gray-400">{cpuUsage}%</span>
      </div>

      <div className="ml-4 flex items-center">
        <span className="w-16 text-gray-400 mr-2">MEM[%]:</span>
        <span className="w-20 mr-4 inline-block h-4 overflow-hidden">
          <span className="text-blue-500 leading-none">{memBar}</span>
        </span>
        <span className="text-gray-400">{memUsage}%</span>
      </div>

      {/* Command line */}
      <div className="ml-4 flex">
        <span className="w-16 text-gray-400 mr-2">Command:</span>
        <span className="text-yellow-300">{command}</span>
      </div>

      {/* Description */}
      <div className="ml-4 flex">
        <span className="w-16 text-gray-400 mr-2">Details:</span>
        <span className="text-gray-300">{project.description}</span>
      </div>

      {/* Technologies */}
      <div className="ml-4 flex flex-wrap">
        <span className="w-16 text-gray-400 mr-2">Tech:</span>
        <span className="text-purple-300">{project.technologies.join(', ')}</span>
      </div>

      {/* Links */}
      {(project.repoUrl || project.liveUrl) && (
        <div className="ml-4 flex">
          <span className="w-16 text-gray-400 mr-2">Links:</span>
          <span>
            {project.repoUrl && (
              <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:underline mr-4">Repository</a>
            )}
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-green-300 hover:underline">Live Demo</a>
            )}
          </span>
        </div>
      )}
    </div>
  );
};

const Apps = () => {
  const [projects, setProjects] = useState<ProjectProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'cpu' | 'mem' | 'name'>('cpu');
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every 10 seconds to reduce flickering
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 10000); // 10 seconds instead of 1 second

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/v1/projects');

        if (!response.ok) {
          throw new Error(`Failed to fetch projects data: ${response.statusText}`);
        }

        const data = await response.json();
        setProjects(data.items);
      } catch (err) {
        console.error('Error fetching projects data:', err);
        setError('Failed to load projects. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Sort projects based on current sort criteria
  const sortedProjects = [...projects].sort((a, b) => {
    if (sortBy === 'name') {
      return a.title.localeCompare(b.title);
    } else if (sortBy === 'cpu') {
      // Sort by featured first, then by ID to maintain stable order
      return b.featured === a.featured ? a._id.localeCompare(b._id) : b.featured ? 1 : -1;
    } else {
      // Sort by featured first, then by ID to maintain stable order
      return b.featured === a.featured ? a._id.localeCompare(b._id) : b.featured ? 1 : -1;
    }
  });

  if (isLoading) {
    return (
      <pre className="font-mono">
        <div className="text-terminal-text">Loading process information...</div>
      </pre>
    );
  }

  if (error) {
    return (
      <pre className="font-mono">
        <div className="text-red-400">{error}</div>
        <div className="text-yellow-400 mt-2">Try running: htop --retry</div>
      </pre>
    );
  }

  // Format current time for htop header
  const formattedTime = currentTime.toLocaleTimeString();

  // Use stable values for system stats to prevent flickering
  const uptime = `12h 34m`; // Fixed value
  const loadAvg = `1.25, 0.75, 0.42`; // Fixed value
  const tasks = `${projects.length} total, ${Math.floor(projects.length * 0.8)} running, ${Math.floor(projects.length * 0.2)} sleeping`;
  const memUsage = `32% used, 24% buff/cache`; // Fixed value
  const swapUsage = `5% used`; // Fixed value

  return (
    <pre className="font-mono text-xs">
      {/* htop header */}
      <div className="mb-2 border-b border-gray-700 pb-2">
        <div className="flex justify-between text-gray-400">
          <span>htop - {formattedTime}</span>
          <span>Uptime: {uptime}</span>
        </div>
        <div className="flex justify-between text-gray-400">
          <span>Load average: {loadAvg}</span>
          <span>Tasks: {tasks}</span>
        </div>
        <div className="flex justify-between text-gray-400">
          <span>Memory: {memUsage}</span>
          <span>Swap: {swapUsage}</span>
        </div>
      </div>

      {/* Column headers */}
      <div className="flex mb-1 text-gray-300 font-bold border-b border-gray-700 pb-1">
        <span className="w-16 mr-2 cursor-pointer hover:text-white" onClick={() => setSortBy('name')}>PID</span>
        <span className="w-20 mr-2">USER</span>
        <span className="w-12 mr-2 cursor-pointer hover:text-white" onClick={() => setSortBy('cpu')}>CPU%</span>
        <span className="w-12 mr-2 cursor-pointer hover:text-white" onClick={() => setSortBy('mem')}>MEM%</span>
        <span className="w-16 mr-2">TIME+</span>
        <span className="cursor-pointer hover:text-white" onClick={() => setSortBy('name')}>COMMAND</span>
      </div>

      {/* Process list */}
      {sortedProjects.map((project) => (
        <Process
          key={project._id}
          project={project}
        />
      ))}

      {/* htop footer */}
      <div className="mt-2 border-t border-gray-700 pt-2 text-gray-400 text-xs">
        <div className="flex justify-between">
          <span>F1Help</span>
          <span>F2Setup</span>
          <span>F3Search</span>
          <span>F4Filter</span>
          <span>F5Tree</span>
          <span>F6SortBy</span>
          <span>F7Nice</span>
          <span>F8Kill</span>
          <span>F9Kill</span>
          <span>F10Quit</span>
        </div>
      </div>
    </pre>
  );
};

export default Apps;