'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useAppContext } from '@/context/AppContext';
import TerminalPrompt from '../common/TerminalPrompt';

type SmtpState =
  | 'connecting'
  | 'connected'
  | 'helo'
  | 'mail_from'
  | 'rcpt_to'
  | 'data'
  | 'subject'
  | 'message_content'
  | 'end_message'
  | 'sending'
  | 'sent'
  | 'error'
  | 'quit';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const { defaults, isHydrated } = useAppContext();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [smtpState, setSmtpState] = useState<SmtpState>('connecting');
  const [smtpLog, setSmtpLog] = useState<string[]>([]);
  const [currentInput, setCurrentInput] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showCursor, setShowCursor] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const logEndRef = useRef<HTMLDivElement>(null);

  // Blink cursor effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Initialize SMTP session
  useEffect(() => {
    // Only initialize if we're in the init state
    if (smtpState === 'init' || smtpState === 'connecting') {
      // Simulate connecting to SMTP server and automatically handle initial handshake
      const initSmtp = async () => {
        // Clear any existing logs first
        setSmtpLog([]);

        await new Promise(resolve => setTimeout(resolve, 500));
        addToLog('220-mrogal.ski ESMTP Exim 4.95 #1');
        await new Promise(resolve => setTimeout(resolve, 300));
        addToLog('220-We do not authorize the use of this system to transport unsolicited,');
        await new Promise(resolve => setTimeout(resolve, 300));
        addToLog('220 and/or bulk e-mail.');

        // Auto-send HELO command
        await new Promise(resolve => setTimeout(resolve, 800));
        addToLog(`> HELO ${window.location.hostname}`);
        await new Promise(resolve => setTimeout(resolve, 500));
        addToLog(`250-mrogal.ski Hello ${window.location.hostname}`);
        await new Promise(resolve => setTimeout(resolve, 200));
        addToLog('250-SIZE 52428800');
        await new Promise(resolve => setTimeout(resolve, 200));
        addToLog('250-8BITMIME');
        await new Promise(resolve => setTimeout(resolve, 200));
        addToLog('250-PIPELINING');
        await new Promise(resolve => setTimeout(resolve, 200));
        addToLog('250-AUTH PLAIN LOGIN');
        await new Promise(resolve => setTimeout(resolve, 200));
        addToLog('250 HELP');

        // Skip directly to MAIL FROM state
        setSmtpState('mail_from');
      };

      initSmtp();
    }

    // Cleanup function to prevent duplicate initialization
    return () => {
      // No cleanup needed
    };
  }, [smtpState]);

  // Focus input when component mounts or state changes
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [smtpState]);

  // Scroll to bottom of SMTP log when new messages are added
  useEffect(() => {
    if (logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [smtpLog]);

  // Handle keyboard input for SMTP navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+C to abort/quit
      if (e.ctrlKey && e.key === 'c') {
        e.preventDefault();
        handleQuit();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Add a line to the SMTP log
  const addToLog = (message: string) => {
    // Check if the last message is the same to prevent duplicates
    setSmtpLog(prev => {
      if (prev.length > 0 && prev[prev.length - 1] === message) {
        return prev; // Don't add duplicate consecutive messages
      }
      return [...prev, message];
    });
  };

  // Handle user input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentInput(e.target.value);
  };

  // Process user input based on current SMTP state
  const handleInputSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      const input = currentInput.trim();
      addToLog(`> ${input}`);

      processSmtpCommand(input);
      setCurrentInput('');
    }
  };

  // Process SMTP commands based on current state
  const processSmtpCommand = async (input: string) => {
    const command = input.toUpperCase();

    switch (smtpState) {
      case 'mail_from':
        // Handle email input - accept with or without MAIL FROM: prefix
        let email = input;
        if (command.startsWith('MAIL FROM:')) {
          const emailMatch = input.match(/<([^>]+)>/) || input.match(/MAIL FROM:\s*(.+)/i);
          if (emailMatch && emailMatch[1]) {
            email = emailMatch[1];
          }
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(email)) {
          setFormData(prev => ({ ...prev, email }));
          await new Promise(resolve => setTimeout(resolve, 300));
          addToLog('250 OK');

          // Auto-send RCPT TO command
          await new Promise(resolve => setTimeout(resolve, 500));
          addToLog(`> RCPT TO:<${defaults.email}>`);
          await new Promise(resolve => setTimeout(resolve, 300));
          addToLog('250 Accepted');

          // Auto-send DATA command
          await new Promise(resolve => setTimeout(resolve, 500));
          addToLog('> DATA');
          await new Promise(resolve => setTimeout(resolve, 300));
          addToLog('354 Enter message, ending with "." on a line by itself');

          // Move directly to name input
          setSmtpState('data');
        } else {
          addToLog('501 Invalid email format');
        }
        break;

      case 'data':
        // Handle name input
        let name = input;
        if (input.startsWith('From:')) {
          const nameMatch = input.match(/From:\s*([^<]+)/) || [];
          if (nameMatch[1]) {
            name = nameMatch[1].trim();
          }
        }

        if (name) {
          setFormData(prev => ({ ...prev, name }));
          setSmtpState('subject');
        } else {
          addToLog('501 Name cannot be empty');
        }
        break;

      case 'subject':
        // Handle subject input
        let subject = input;
        if (input.startsWith('Subject:')) {
          subject = input.substring(input.indexOf(':') + 1).trim();
        }

        if (subject) {
          setFormData(prev => ({ ...prev, subject }));
          setSmtpState('message_content');
        } else {
          addToLog('501 Subject cannot be empty');
        }
        break;

      case 'message_content':
        // Handle message content
        if (input === '.') {
          if (!formData.message) {
            addToLog('501 Message body cannot be empty');
          } else {
            setSmtpState('end_message');
            await submitMessage();
          }
        } else {
          setFormData(prev => ({ ...prev, message: prev.message ? prev.message + '\n' + input : input }));
        }
        break;

      case 'sent':
      case 'error':
        if (command === 'QUIT') {
          handleQuit();
        } else {
          addToLog('221 mrogal.ski closing connection');
          setSmtpState('quit');
        }
        break;

      default:
        // For any other state, just show a generic message
        addToLog('421 Service not available');
        break;
    }
  };

  // Submit the message to the server
  const submitMessage = async () => {
    try {
      setSmtpState('sending');
      addToLog('Sending message...');

      // Validate form data
      if (!formData.email) {
        throw new Error('Email address is required');
      }

      if (!formData.message) {
        throw new Error('Message content is required');
      }

      // Use name from email if not provided in From: header
      const name = formData.name || formData.email.split('@')[0];
      const subject = formData.subject || 'No subject';

      // Submit to the API
      const response = await fetch('/api/v1/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email: formData.email,
          subject,
          message: formData.message
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit message');
      }

      await new Promise(resolve => setTimeout(resolve, 1000));
      const messageId = Math.random().toString(36).substring(2, 15);
      addToLog(`250 OK id=${messageId}`);
      setSmtpState('sent');
    } catch (error) {
      console.error('Error submitting message:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Failed to submit message');
      addToLog(`554 Transaction failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setSmtpState('error');
    }
  };

  // Handle QUIT command
  const handleQuit = () => {
    addToLog('> QUIT');
    addToLog('221 mrogal.ski closing connection');
    setSmtpState('quit');
  };

  // Reset the form and start a new session
  const resetSession = () => {
    // Reset all form state
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    setCurrentInput('');
    setSmtpLog([]);
    setErrorMessage(null);

    // Set to init state directly to trigger the initialization effect
    setSmtpState('init');
  };

  return (
    <div className="terminal-form">
      <div className="command-output">
        {/* SMTP Log */}
        <div className="smtp-log mb-4 font-mono text-sm" style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}>
          {smtpLog.map((line, index) => (
            <div key={index} className={line.startsWith('>') ? 'text-green-400' : 'text-blue-400'}>
              {line}
            </div>
          ))}
          <div ref={logEndRef} />
        </div>

        {/* Input line - only show when in an active state */}
        {['connected', 'helo', 'mail_from', 'rcpt_to', 'data', 'subject', 'message_content'].includes(smtpState) && (
          <div className="command-line relative flex items-center">
            <span className="text-green-400">&gt;</span>
            <input
              ref={inputRef}
              type="text"
              value={currentInput}
              onChange={handleInputChange}
              onKeyDown={handleInputSubmit}
              className="bg-transparent border-none outline-none w-full text-green-400 ml-2 pr-4"
              autoFocus
              autoComplete="off"
              spellCheck="false"
            />
            {showCursor && currentInput.length === 0 && (
              <span className="absolute left-6 text-gray-500">_</span>
            )}
          </div>
        )}

        {/* Help text for users */}
        {smtpState === 'mail_from' && (
          <div className="mt-4 text-gray-400 text-xs">
            <p>Enter your email address (or type <span className="text-yellow-400">MAIL FROM:&lt;your@email.com&gt;</span> if you want to be technical)</p>
            <p className="mt-1">Example: <span className="text-yellow-400">john@example.com</span> or <span className="text-yellow-400">MAIL FROM:&lt;john@example.com&gt;</span></p>
          </div>
        )}

        {smtpState === 'data' && (
          <div className="mt-4 text-gray-400 text-xs">
            <p>Enter your name (or type <span className="text-yellow-400">From: Your Name</span> if you want to be technical)</p>
            <p className="mt-1">Example: <span className="text-yellow-400">John Doe</span> or <span className="text-yellow-400">From: John Doe</span></p>
          </div>
        )}

        {smtpState === 'subject' && (
          <div className="mt-4 text-gray-400 text-xs">
            <p>Enter the subject of your message (or type <span className="text-yellow-400">Subject: Your Subject</span> if you want to be technical)</p>
            <p className="mt-1">Example: <span className="text-yellow-400">Project Inquiry</span> or <span className="text-yellow-400">Subject: Project Inquiry</span></p>
          </div>
        )}

        {smtpState === 'message_content' && (
          <div className="mt-4 text-gray-400 text-xs">
            <p>Type your message. When you're done, enter a single <span className="text-yellow-400">.</span> (period) on a line by itself.</p>
            <p className="mt-1">Example:</p>
            <p className="text-yellow-400 mt-1">Hello,</p>
            <p className="text-yellow-400">I'm interested in your services.</p>
            <p className="text-yellow-400">Please contact me when you have time.</p>
            <p className="text-yellow-400">Thanks!</p>
            <p className="text-yellow-400">.</p>
          </div>
        )}

        {/* Success message */}
        {smtpState === 'sent' && (
          <div className="mt-4">
            <div className="text-green-400 mb-2">
              Message delivered successfully!
            </div>
            <div className="text-green-400 mb-4">
              Thank you for your message! I'll get back to you soon.
            </div>
            <button
              onClick={resetSession}
              className="text-yellow-400 hover:underline cursor-pointer"
            >
              Start a new SMTP session
            </button>
          </div>
        )}

        {/* Error message */}
        {smtpState === 'error' && (
          <div className="mt-4">
            <div className="text-red-400 mb-2">
              Error: {errorMessage || 'Connection error'}
            </div>
            <button
              onClick={resetSession}
              className="text-yellow-400 hover:underline cursor-pointer"
            >
              Reconnect to SMTP server
            </button>
          </div>
        )}

        {/* Quit message */}
        {smtpState === 'quit' && (
          <div className="mt-4">
            <div className="text-yellow-400 mb-2">
              Connection closed.
            </div>
            <button
              onClick={resetSession}
              className="text-yellow-400 hover:underline cursor-pointer"
            >
              Reconnect to SMTP server
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactForm;