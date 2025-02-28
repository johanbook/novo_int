const bcrypt = require('bcryptjs');
const User = require('../../models/User');

module.exports = async function (fastify, opts) {
  // Register a new user
  fastify.post('/', async (request, reply) => {
    try {
      const { name, email, password } = request.body;

      // Simple validation
      if (!name || !email || !password) {
        return reply.code(400).send({ msg: 'Please enter all fields' });
      }

      // Check for existing user
      const existingUser = await User.findOne({ email });
      
      if (existingUser) {
        return reply.code(400).send({ msg: 'User already exists...' });
      }

      // Create new user
      const newUser = new User({
        name,
        email,
        password
      });

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(newUser.password, salt);
      newUser.password = hash;

      // Save user
      const savedUser = await newUser.save();

      // Generate token
      const token = fastify.jwt.sign(
        { id: savedUser.id },
        { expiresIn: '1y' }
      );

      return {
        token,
        user: {
          id: savedUser.id,
          name: savedUser.name,
          email: savedUser.email
        }
      };
    } catch (err) {
      reply.code(500).send({ error: err.message });
    }
  });
};