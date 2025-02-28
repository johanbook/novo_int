# Fastify API Implementation

This document provides information about the Fastify implementation of the API, which replaces the original Express implementation.

## Running the Fastify server

```bash
# Start the Fastify server with Nodemon (for development)
npm run server-fastify

# Start both Fastify server and React client 
npm run dev-fastify

# Start the Fastify server in production mode
npm run start-fastify
```

## Key Changes

1. **Improved Performance**: Fastify is designed to be faster than Express, with better JSON handling.

2. **JWT Authentication**: 
   - Uses `@fastify/jwt` plugin instead of manual JWT verification
   - The token is now validated using `request.jwtVerify()` 
   - Protected routes use `{ onRequest: [fastify.authenticate] }`

3. **Middleware Changes**:
   - Express middleware is replaced with Fastify plugins and decorators
   - Authentication is implemented as a Fastify decorator

4. **Route Structure**:
   - Routes are implemented as Fastify plugins
   - Each route file exports an async function that registers routes
   - Prefixes are defined at registration time in server.js

5. **Error Handling**:
   - Improved error handling with try/catch blocks
   - Proper HTTP status codes for different error cases

## API Endpoints (same as Express version)

- `GET /api/documents`: Get all documents
- `POST /api/documents`: Create a new document (requires authentication)
- `DELETE /api/documents/:id`: Delete a document (requires authentication)
- `POST /api/users`: Register a new user
- `POST /api/auth`: Login a user
- `GET /api/auth/user`: Get user data (requires authentication)

## Client Compatibility

The client continues to work without changes because:
1. The API endpoints remain the same
2. The request/response formats are maintained
3. The authentication token format is preserved

## Testing the API

You can test the API using tools like curl, Postman, or directly through the React client.

Example API calls:

```bash
# Register a user
curl -X POST http://localhost:5001/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User", "email":"test@example.com", "password":"password123"}'

# Login
curl -X POST http://localhost:5001/api/auth \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com", "password":"password123"}'

# Get documents (replace TOKEN with your JWT)
curl -X GET http://localhost:5001/api/documents \
  -H "Authorization: Bearer TOKEN"
```