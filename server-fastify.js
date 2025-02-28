const fastify = require('fastify')({ logger: true });
const mongoose = require('mongoose');
const path = require('path');
const { JWT_SECRET } = require('./config');

// Register plugins
fastify.register(require('@fastify/cors'));
fastify.register(require('@fastify/jwt'), { secret: JWT_SECRET });

// Register static file serving for production
if (process && process.env.NODE_ENV === 'production') {
  fastify.register(require('@fastify/static'), {
    root: path.join(__dirname, 'client', 'build'),
    prefix: '/'
  });
}

// Auth middleware decorator
fastify.decorate('authenticate', async (request, reply) => {
  try {
    await request.jwtVerify();
  } catch (err) {
    reply.code(401).send({ msg: 'Authorization Denied' });
  }
});

// Register routes
fastify.register(require('./routes/fastify/documents'), { prefix: '/api/documents' });
fastify.register(require('./routes/fastify/users'), { prefix: '/api/users' });
fastify.register(require('./routes/fastify/auth'), { prefix: '/api/auth' });

// Serve React app in production
if (process && process.env.NODE_ENV === 'production') {
  fastify.get('*', (request, reply) => {
    reply.sendFile('index.html');
  });
}

// Database connection
const MONGO_URI = 'mongodb://root:rootpassword@localhost:27000/default?authSource=admin';

const start = async () => {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true });
    console.log('MongoDB Connected...');
    
    await fastify.listen({ port: 5001, host: '0.0.0.0' });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();