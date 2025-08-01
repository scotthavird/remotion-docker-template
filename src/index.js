const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

/**
 * Simple hello world function
 * @returns {string} Greeting message
 */
function sayHello() {
  const name = process.env.APP_NAME || 'World';
  return `Hello, ${name}!`;
}

/**
 * Main application function
 */
async function main() {
  console.log('Node.js Docker Template Started');
  console.log(sayHello());
  
  const port = process.env.PORT || 3000;
  const env = process.env.NODE_ENV || 'development';
  
  console.log(`Environment: ${env}`);
  console.log(`Port: ${port}`);
  
  // Keep the process running
  process.on('SIGINT', () => {
    console.log('\nGracefully shutting down...');
    process.exit(0);
  });
  
  console.log('Application running successfully!');
  console.log('Press Ctrl+C to stop');
}

// Run the application if this file is executed directly
if (require.main === module) {
  main().catch(console.error);
}

module.exports = {
  sayHello
}; 