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
| `ALL`  | `/request`              | Returns a structured JSON dump of the incoming request.              |
| `ALL`  | `/status/{status}`      | Respond with a given HTTP status code (must be between 200 and 599). |
| `ALL`  | `/uuid`                 | Generate and return a random UUID (version 4).                       |

### Query Parameters

| Name       | Type   | Default | Description                                                 |
| ---------- | ------ | ------- | ----------------------------------------------------------- |
| `delay`    | Number | `0`     | Delays the response by the specified value in milliseconds. |

---

## ⚙️ Environment Variables

| Name                 | Required | Default       | Description                                                                                  |
| -------------------- | -------- | ------------- | -------------------------------------------------------------------------------------------- |
| `NODE_ENV`           | No       | `development` | Sets the environment mode. (`development`, `production`, `test`)                             |
| `LOG_LEVEL`          | No       | `info`        | Sets the logging level. (`trace`, `debug`, `info`, `warn`, `error`, `fatal`)                 |
| `MAX_DELAY`          | No       | `10000`       | Maximum allowed delay in milliseconds for the `delay` query parameter.                       |
| `PORT`               | No       | `8000`        | Port number for this application. If set to `0`, the OS will assign a random available port. |
| `KEEP_ALIVE_TIMEOUT` | No       | `5000`        | HTTP keep-alive timeout in milliseconds.                                                     |
| `HEADERS_TIMEOUT`    | No       | `10000`       | HTTP headers timeout in milliseconds. Must be > `KEEP_ALIVE_TIMEOUT`.                        |
| `REQUEST_TIMEOUT`    | No       | `30000`       | Request timeout in milliseconds. Must be > `HEADERS_TIMEOUT`.                                |

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
