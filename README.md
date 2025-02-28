# Full-stack Test case

This project is a very simple project that allow an user to:

- Create a new account
- Login and logout
- Create and delete a new Document (CV, Resume, Cover letter)

It serves as a starting point to our Technical interview.

[Internal documentation](https://novoresume.atlassian.net/wiki/spaces/MAN/pages/2355429378/Test+case+description)

## API Implementations

This project now includes two API implementations:

1. **Express API (Original)**: The original implementation using Express.js
   - Run with: `npm run dev` or `npm run server`

2. **Fastify API (New)**: A more performant implementation using Fastify
   - Run with: `npm run dev-fastify` or `npm run server-fastify`
   - Documentation: See [FASTIFY_API.md](./FASTIFY_API.md)
   - Migration Guide: See [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md)

Both implementations provide the same API endpoints and functionality.

## Instruction

> Note: The interviewer clone this repository and run the project locally to verify if it works. The interviewer will provide the candidate with the URL to the project.

Minimal expected completion time: 2 hour

Note that you are not required to make any changes to the project or submit any code. You are only required to understand the project and note down improvements that can be made to the project. However **writing code to demonstrate your skill is a big plus and it shows your commitment for the position.**

## Assignments

### Up and running

Please complete the tasks below:

- [ ] Start the project and have both the frontend and backend running
- [ ] Play around with the project and understand how it works
- [ ] Note down improvements that can be made to the project: libraries, framework, etc.
- [ ] Answer what are the 3 things that you would spend your time on to improve this project significantly?
- [ ] Answer what are the other technologies that you would choose instead?
- [ ] Complete the [Scaling the project](#scaling-the-project) section below (code is not mandatory)
- [ ] (Optional): Implement the changes that you would like to make

### Scaling the project

This is an artificial roadmap for the project. The items below are in a **chronological order**. You are required to provide a brief description of how you would go about implementing each item, assuming that you know the full roadmap.

#### 1. Editing Documents

We would like to add a feature to allow users to edit their documents. Requirements for this feature are:

- Users should be able to edit the name of the document
- Users should be able to edit the content of the document: Experience, Education, Skills, etc. The content should be in a structured format, for example, a list of items (like Experience section can have multiple Experiences.).
- Users should be able to display and modify the content of the document in a selected template.
- Users should be able to save the document and download it as a PDF.

How would you go about implementing this feature?

#### 2. Production Readiness

The project is currently not ready for production. What are the things that you would do to make it ready for production?

#### 3. Add Job Tracking

We would like to add a feature to help users track the jobs they have applied to. Requirements for this feature are:

- Users should be able to add a new job application
- Users should be able to update the status of the job application (Applied, Interview, Offer, Rejected, etc.)
- Users can create Documents (CV, Resume, Cover letter) from a template and attach it to the job application
- Users can create Documents (CV, Resume, Cover letter) from a created job application

How would you go about implementing this feature?
