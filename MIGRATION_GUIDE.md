# Express to Fastify Migration Guide

## Overview

This guide explains how to migrate from the Express API to the new Fastify implementation. The codebase now supports both implementations, allowing for a gradual transition.

## Migration Steps

### 1. File Structure Changes

| Express Pattern | Fastify Pattern |
|-----------------|----------------|
| `routes/api/resource.js` with router.get/post | `routes/fastify/resource.js` with fastify.get/post |
| Custom middleware | Fastify decorators and hooks |
| `app.use()` | `fastify.register()` |
| `req, res` | `request, reply` |

### 2. Authentication Changes

**Express:**
```javascript
const auth = require('../../middleware/auth');
router.post('/', auth, (req, res) => { ... });
```

**Fastify:**
```javascript
fastify.post('/', { onRequest: [fastify.authenticate] }, async (request, reply) => { ... });
```

### 3. Response Handling

**Express:**
```javascript
res.status(400).json({ msg: 'Error message' });
```

**Fastify:**
```javascript
reply.code(400).send({ msg: 'Error message' });
// OR simply return the object for 200 responses
return { success: true, data: result };
```

### 4. Async/Await Usage

Fastify is designed to work well with async/await. Convert callback-based code to use async/await for better readability and error handling.

**Express (callbacks):**
```javascript
router.get('/', (req, res) => {
  Model.find()
    .then(items => res.json(items))
    .catch(err => res.status(500).json({ error: err.message }));
});
```

**Fastify (async/await):**
```javascript
fastify.get('/', async (request, reply) => {
  try {
    const items = await Model.find();
    return items;
  } catch (err) {
    reply.code(500).send({ error: err.message });
  }
});
```

## Testing the Migration

1. Run the Fastify server with: `npm run server-fastify`
2. Test all API endpoints to ensure they work as expected
3. Compare performance between Express and Fastify implementations

## Rolling Back

If issues are encountered, you can switch back to the Express implementation by:
1. Using the original npm scripts: `npm run server` or `npm run dev`
2. No client changes are required as the API endpoints remain the same

## Future Recommendations

1. Once the Fastify implementation is stable, consider:
   - Removing the Express implementation
   - Updating package.json to make Fastify the default server
   - Converting remaining Express-specific patterns to Fastify patterns

2. Take advantage of Fastify's schema validation capabilities:
   - Define JSON schemas for request/response validation
   - Implement schema validation on routes for better error handling