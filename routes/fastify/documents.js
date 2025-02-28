const Document = require('../../models/Document');

module.exports = async function (fastify, opts) {
  // Get all documents
  fastify.get('/', async (request, reply) => {
    try {
      const documents = await Document.find().sort({ date: -1 });
      return documents;
    } catch (err) {
      reply.code(500).send({ error: err.message });
    }
  });

  // Create a new document - protected route
  fastify.post('/', { onRequest: [fastify.authenticate] }, async (request, reply) => {
    try {
      const newDocument = new Document({
        name: request.body.name
      });
      
      const document = await newDocument.save();
      return document;
    } catch (err) {
      reply.code(500).send({ error: err.message });
    }
  });

  // Delete a document - protected route
  fastify.delete('/:id', { onRequest: [fastify.authenticate] }, async (request, reply) => {
    try {
      const document = await Document.findById(request.params.id);
      
      if (!document) {
        return reply.code(404).send({ failed: 'Document not found' });
      }
      
      await document.remove();
      return { success: 'Successfully Removed!' };
    } catch (err) {
      reply.code(500).send({ failed: 'Failed to remove document...' });
    }
  });
};