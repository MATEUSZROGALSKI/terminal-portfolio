'use client';

import React, { useState, useEffect } from 'react';
import './Timeline.css';

interface TimelineEntry {
  _id: string;
  company: string;
  position: string;
  description: string;
  startDate: string;
  endDate: string | null;
  skills: string[];
}

const Timeline = () => {
  const [entries, setEntries] = useState<TimelineEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTimelineData = async () => {
      try {
        const response = await fetch('/api/v1/timeline');

        if (!response.ok) {
          throw new Error(`Failed to fetch timeline data: ${response.statusText}`);
        }

        const data = await response.json();
        setEntries(data.items);
      } catch (err) {
        console.error('Error fetching timeline data:', err);
        setError('Failed to load employment history. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTimelineData();
  }, []);

  // Generate a random git commit hash
  const generateCommitHash = () => {
    const chars = '0123456789abcdef';
    let hash = '';
    for (let i = 0; i < 7; i++) {
      hash += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return hash;
  };

  // Format relative time for display (e.g., "2 years ago")
  const formatRelativeTime = (startDate: string, endDate: string | null) => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();

    const diffYears = end.getFullYear() - start.getFullYear();
    const diffMonths = end.getMonth() - start.getMonth() + (diffYears * 12);

    if (diffYears > 0) {
      return diffYears === 1 ? '1 year ago' : `${diffYears} years ago`;
    } else if (diffMonths > 0) {
      return diffMonths === 1 ? '1 month ago' : `${diffMonths} months ago`;
    } else {
      return 'recently';
    }
  };

  // Format branch and tag information
  const formatBranchInfo = (entry: TimelineEntry) => {
    const isCurrentJob = !entry.endDate;
    const tags = [];

    if (isCurrentJob) {
      tags.push('HEAD -> main');
    }

    // Add skills as branch names
    if (entry.skills && entry.skills.length > 0) {
      const skillBranches = entry.skills.slice(0, 2).map(skill => skill.toLowerCase().replace(/\s+/g, '-'));
      if (skillBranches.length > 0) {
        tags.push(...skillBranches);
      }
    }

    if (tags.length === 0) return '';
    return ` (${tags.join(', ')})`;
  };

  if (isLoading) {
    return (
      <pre className="timeline-container">
        <div>Loading git history...</div>
      </pre>
    );
  }

  if (error) {
    return (
      <pre className="timeline-container">
        <div className="timeline-error">{error}</div>
        <div className="timeline-retry">Try running: git fetch --retry</div>
      </pre>
    );
  }

  // Create a consistent git graph structure
  const createGitGraph = (index: number, total: number, isFirst = false) => {


    // For the first entry (future opportunity)
    if (isFirst) {
      return (
        <span className="git-graph-column">*</span>
      );
    }

    // For regular entries
    // Use a consistent pattern based on index to create a more realistic git graph
    if (index % 3 === 0) {
      // Main line commits
      return (
        <span className="git-graph-column">*</span>
      );
    } else if (index % 3 === 1) {
      // Merge commits
      return (
        <span className="git-graph-column">⦿</span>
      );
    } else {
      // Feature branch commits
      return (
        <span className="git-graph-column">◉</span>
      );
    }
  };

  // Create connecting lines between commits
  const createConnectingLine = (index: number, total: number, isFirst = false) => {


    if (isFirst || index >= total - 1) return null;

    // Create a pattern based on index for more realistic git graph
    if (index % 3 === 0) {
      // Main line
      return (
        <div className="my-1">
          <span className="git-graph-column">|</span>
        </div>
      );
    } else if (index % 3 === 1) {
      // Merge line
      return (
        <div className="my-1">
          <span className="git-graph-column">|</span>
        </div>
      );
    } else {
      // Branch line
      return (
        <div className="my-1">
          <span className="git-graph-column">|</span>
        </div>
      );
    }
  };

  return (
    <div className="timeline-container command-output overflow-hidden">
      {/* Git log header */}
      <div className="mb-4 text-gray-400 border-b border-gray-700 pb-2">
        <div className="flex items-center justify-between">
          <span>Showing career history as a git log</span>
          <span className="text-xs">Press ? for help</span>
        </div>
        <div className="text-xs mt-1">
          commit history | each position is represented as a commit | newest to oldest
        </div>
      </div>

      {/* Future opportunity entry - at the top as it's the newest */}
      <div className="flex mb-4">
        <div className="flex-shrink-0 mr-1 w-6 flex justify-center">
          {createGitGraph(0, entries.length, true)}
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap items-baseline">
            <span className="git-commit-hash mr-1">9774372</span>
            <span className="text-white mr-1">-</span>
            <span className="git-branch-info mr-1">(HEAD -> main, origin/main, origin/HEAD)</span>
            <span className="git-commit-message mr-1">feat: Ready for next career opportunity</span>
            <span className="git-commit-date mr-1">(coming soon)</span>
            <span className="git-commit-author">&lt;you@awesome-company.com&gt;</span>
          </div>
          <div className="mt-1 ml-4 timeline-future-opportunity whitespace-pre-wrap">
            Looking for new opportunities to make an impact with my backend engineering and security expertise.
          </div>
        </div>
      </div>

      {/* Connecting line after future opportunity */}
      <div className="flex my-1">
        <div className="flex-shrink-0 mr-1 w-6 flex justify-center">
          <span className="git-graph-column">|</span>
        </div>
      </div>

      {/* Past positions */}
      {entries.map((entry, index) => {
        const commitHash = generateCommitHash();
        const relativeTime = formatRelativeTime(entry.startDate, entry.endDate);
        const branchInfo = formatBranchInfo(entry);

        return (
          <div key={entry._id} className="mb-4">
            {/* Graph line */}
            <div className="flex">
              <div className="flex-shrink-0 mr-1 w-6 flex justify-center">
                {createGitGraph(index, entries.length)}
              </div>
              <div className="flex-1">
                {/* Commit line */}
                <div className="flex flex-wrap items-baseline">
                  <span className="git-commit-hash mr-1">{commitHash}</span>
                  <span className="text-white mr-1">-</span>
                  <span className="git-branch-info mr-1">{branchInfo}</span>
                  <span className="git-commit-message mr-1">{entry.position.includes(':') ? entry.position : `${entry.position}: Worked at ${entry.company}`}</span>
                  <span className="git-commit-date mr-1">({relativeTime})</span>
                  <span className="git-commit-author">&lt;{entry.company.split(' ')[0].toLowerCase()}@career.dev&gt;</span>
                </div>

                {/* Description */}
                <div className="mt-1 ml-4 text-gray-400 whitespace-pre-wrap">{entry.description}</div>

                {/* Skills as file changes */}
                {entry.skills && entry.skills.length > 0 && (
                  <div className="mt-2 ml-4 border-t border-gray-700 pt-2">
                    <div className="text-gray-400 mb-1">Changed files:</div>
                    {entry.skills.map((skill, i) => (
                      <div key={i} className="flex items-center">
                        <span className="text-green-400 mr-2">+</span>
                        <span className="text-gray-300">{skill.toLowerCase()}.skill</span>
                        <span className="text-gray-500 ml-2 text-xs">{Math.floor(Math.random() * 100) + 10} insertions(+)</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Connect lines between commits */}
            <div className="flex">
              <div className="flex-shrink-0 mr-1 w-6 flex justify-center">
                {createConnectingLine(index, entries.length)}
              </div>
            </div>
          </div>
        );
      })}

      {/* Git log footer */}
      <div className="mt-4 text-gray-400 border-t border-gray-700 pt-2">
        <div className="flex justify-between">
          <span>Use <span className="text-[#ff7b00]">↑</span>/<span className="text-[#ff7b00]">↓</span> to navigate history</span>
          <span>Press <span className="text-[#ff7b00]">q</span> to quit</span>
        </div>
        <div className="flex justify-between mt-1 text-xs">
          <span><span className="text-[#ff7b00]">j</span>/<span className="text-[#ff7b00]">k</span> to move up/down</span>
          <span><span className="text-[#ff7b00]">g</span> to go to top, <span className="text-[#ff7b00]">G</span> to go to bottom</span>
        </div>
      </div>
    </div>
  );
};

export default Timeline;