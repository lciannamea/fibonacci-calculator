# Fibonacci Calculator

### Tool for the calculation of the n-th number in the Fibonacci sequence (https://en.wikipedia.org/wiki/Fibonacci_number).

This tool was realized for not commercial purposes, feel free to download it and test it.

It provides a REST API endpoint and a UI that lets user call the endpoint and view executions history.

Development was done with NodeJS, Express (backend: fibonacci-calculator) and Angular (frontend: fibonacci-calculator-ui), to build a fast, realtime and scalable application.

### Installation and running instructions.

First of all download and install the latest LTS version of NodeJS from here: https://nodejs.org/en/ (currently is 18.12.1).

Verify the installation with following commands:

```bash
node -v
npm -v
```

Open a terminal and install angular-cli on your machine as a global package:

```bash
npm install -g @angular/cli
```

Then clone the project, and startup both backend and frontend.

#### BACKEND

Open a terminal in the folder fibonacci-calculator and use the following commands:

```bash
npm install
npm run build
npm run start
```

#### FRONTEND

Open a terminal in the folder fibonacci-calculator-ui and use the following commands:

```bash
npm install
ng serve
```

Now you should be able to use Fibonacci Calculator, enjoy it!

### UI

http://localhost:4200

### API

http://localhost:8000/api-docs
