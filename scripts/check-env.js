// Environment variables check script
// Run with: node scripts/check-env.js

// Check MongoDB environment variables
const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB;

console.log('Checking environment variables...\n');

// Check MongoDB URI
if (!MONGODB_URI) {
  console.log('❌ MONGODB_URI is not set');
  console.log('   This should be set to "mongodb://mongodb:27017" in the devcontainer');
} else {
  console.log(`✅ MONGODB_URI is set to: ${MONGODB_URI}`);
}

// Check MongoDB database name
if (!MONGODB_DB) {
  console.log('❌ MONGODB_DB is not set');
  console.log('   This should be set to "portfolio" in the devcontainer');
} else {
  console.log(`✅ MONGODB_DB is set to: ${MONGODB_DB}`);
}

// Check other environment variables
const COMPANY_NAME = process.env.COMPANY_NAME || 'MRogal.ski';
const PROJECT_NAME = process.env.PROJECT_NAME || 'homepage';
const URL = process.env.URL || 'https://mrogal.ski';

console.log('\nOther environment variables:');
console.log(`- COMPANY_NAME: ${COMPANY_NAME} ${process.env.COMPANY_NAME ? '(custom)' : '(default)'}`);
console.log(`- PROJECT_NAME: ${PROJECT_NAME} ${process.env.PROJECT_NAME ? '(custom)' : '(default)'}`);
console.log(`- URL: ${URL} ${process.env.URL ? '(custom)' : '(default)'}`);

// Provide instructions if environment variables are missing
if (!MONGODB_URI || !MONGODB_DB) {
  console.log('\nTo fix missing environment variables:');
  console.log('1. Make sure you are running in the devcontainer');
  console.log('2. Check the .devcontainer/docker-compose.yml file for environment variable definitions');
  console.log('3. Restart the devcontainer if you made changes to the environment variables');
}

console.log('\nEnvironment check complete.');
