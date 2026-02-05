# HTTP Playground Server

[![CI](https://github.com/ryo8000/http-playground-server-fork/actions/workflows/ci.yml/badge.svg)](https://github.com/ryo8000/http-playground-server-fork/actions/workflows/ci.yml)
[![license: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

A lightweight **HTTP playground server** for instantly simulating requests and responses—no complex pre-configuration needed. Ideal for front-end, QA, or integration testing workflows.

Built with **Node.js** and **Express**.

---

## 📚 API Reference

| Method | Path                    | Description                                                          |
| ------ | ----------------------- | -------------------------------------------------------------------- |
| `ALL`  | `/error/timeout`        | Simulates a timeout by never sending a response.                     |
| `ALL`  | `/error/network`        | Simulates a network error by closing the connection.                 |
| `ALL`  | `/error/malformed-json` | Returns malformed JSON response.                                     |
| `ALL`  | `/error/error`          | Throws an unhandled exception to trigger Express error handler.      |
| `ALL`  | `/mirror`               | Returns the request body as a response.                              |
| `ALL`  | `/request`              | Return a structured JSON dump of the incoming request.               |
| `ALL`  | `/shutdown`             | Triggers a shutdown of the server. Requires `ENABLE_SHUTDOWN=true`.  |
| `ALL`  | `/status/{status}`      | Respond with a given HTTP status code (must be between 200 and 599). |
| `ALL`  | `/uuid`                 | Generate and return a random UUID (version 4).                       |

---

## ⚙️ Environment Variables

| Name              | Required | Default       | Description                                                                                  |
| ----------------- | -------- | ------------- | -------------------------------------------------------------------------------------------- |
| `NODE_ENV`        | No       | `development` | Sets the environment mode. (`development`, `production`, `test`)                             |
| `LOG_LEVEL`       | No       | `info`        | Sets the logging level. (`trace`, `debug`, `info`, `warn`, `error`, `fatal`)                 |
| `PORT`            | No       | `8000`        | Port number for this application. If set to `0`, the OS will assign a random available port. |
| `ENABLE_SHUTDOWN` | No       | `false`       | Enables the /shutdown endpoint.                                                              |

## 🚀 Build and Run the Application

### Using Yarn

1. Clone this repository:

   ```bash
   git clone https://github.com/ryo8000/http-playground-server-fork.git
   cd http-playground-server-fork
   ```

2. Install dependencies using Yarn:

   ```bash
   yarn install
   ```

3. Build the application:

   ```bash
   yarn build
   ```

4. Run the application:

   ```bash
   node dist/server.js
   ```

---

## 📜 License

Distributed under the MIT License. See [LICENSE](./LICENSE) for more information.
