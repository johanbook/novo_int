# Novo Int - Developer Guide

## Commands
- `npm start` - Run Express server with Node
- `npm run server` - Run Express server with Nodemon (auto-restart)
- `npm run start-fastify` - Run Fastify server with Node
- `npm run server-fastify` - Run Fastify server with Nodemon (auto-restart)
- `npm run client` - Start React client
- `npm run dev` - Run Express server and client concurrently
- `npm run dev-fastify` - Run Fastify server and client concurrently
- Run single test: `cd client && npm test -- -t "test name"`

## Code Style Guidelines
- **Imports**: Group imports by external libraries first, then internal modules
- **Formatting**: Use 2-space indentation, single quotes for strings
- **Architecture**: Use RESTful API design for backend routes
- **Error Handling**: Use try/catch blocks for async operations, return appropriate HTTP status codes
- **Naming**: Use camelCase for variables/functions, PascalCase for components/classes
- **State Management**: Use React hooks for local state, Redux for global state
- **Backend Models**: Follow Mongoose schema patterns with field validation
- **API Endpoints**: Document all endpoints with comments including params and responses

## Notes
- Backend runs on port 5000, frontend on port 3000
- JWT authentication middleware available in middleware/auth.js