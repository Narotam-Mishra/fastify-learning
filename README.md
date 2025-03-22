# [Fastify API](https://fastify.dev/)

Fastify is a high-performance web framework for Node.js, optimized for speed and low overhead. This project provides a basic setup for building a RESTful API with Fastify.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [API Endpoints](#api-endpoints)
- [Plugins](#plugins)
- [Testing](#testing)
- [License](#license)

## Installation

Make sure you have Node.js installed (recommended version: 16+).

```sh
# Clone the repository
git clone <repository-url>
cd <project-directory>

# Install dependencies
npm install
```

## Usage

To start the Fastify server in development mode:

```sh
npm run dev
```

For production mode:

```sh
npm start
```

## Configuration

Environment variables can be set in a `.env` file:

```
PORT=3000
NODE_ENV=development
```

## API Endpoints

| Method | Endpoint | Description |
|--------|---------|-------------|
| GET | `/` | Returns a welcome message |
| GET | `/health` | Health check endpoint |
| POST | `/api/resource` | Creates a new resource |
| GET | `/api/resource/:id` | Fetches a resource by ID |
| PUT | `/api/resource/:id` | Updates a resource |
| DELETE | `/api/resource/:id` | Deletes a resource |

## Plugins

Fastify supports plugins for extending functionality. This project includes:

- `fastify-cors` - Enables CORS support
- `fastify-env` - Loads environment variables
- `fastify-jwt` - Handles authentication with JSON Web Tokens

## Testing

Run tests using:

```sh
npm test
```

## [Fastify Doc](https://fastify.dev/docs/latest/)

## [Fastify Hooks](https://fastify.dev/docs/latest/Reference/Hooks/)

## [Fastify Lifecycle](https://fastify.dev/docs/latest/Reference/Lifecycle/)

## License

This project is licensed under the MIT License.

