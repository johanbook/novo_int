const bcrypt = require('bcryptjs');
const User = require('../../models/User');

module.exports = async function (fastify, opts) {
  // Login user
  fastify.post('/', async (request, reply) => {
    try {
      const { email, password } = request.body;

      // Simple validation
      if (!email || !password) {
        return reply.code(400).send({ msg: 'Please enter all fields' });
      }

      // Check for existing user
      const user = await User.findOne({ email });
      
      if (!user) {
        return reply.code(400).send({ msg: 'User does not exist!' });
      }

      // Compare password with hash
      const isMatch = await bcrypt.compare(password, user.password);
      
      if (!isMatch) {
        return reply.code(400).send({ msg: 'Invalid credentials...' });
      }

      // Generate token
      const token = fastify.jwt.sign(
        { id: user.id },
        { expiresIn: '1y' }
      );

      return {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        }
      };
    } catch (err) {
      reply.code(500).send({ error: err.message });
    }
  });

  // Get user data - protected route
  fastify.get('/user', { onRequest: [fastify.authenticate] }, async (request, reply) => {
    try {
      const user = await User.findById(request.user.id).select('-password');
      return user;
    } catch (err) {
      reply.code(500).send({ error: err.message });
    }
  });
};