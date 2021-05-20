# Interview Scheduler

## Project Description

This project is a single page application (SPA) that can be used to help keep track of interview schedules with your organization. Users can book, update, and cancel interviews easily.

This project combines a concise API with a WebSocket server to build a realtime expereince. It was built using React, as well as a host of additional tools such as Storybook, Jest, Cypress, Axios, Babel, Webpack, and a PostgreSQL database.

## UI/UX Screenshots

!["Home page on load"](https://github.com/austinkret/scheduler/blob/master/docs/1.%20Load%20page.png)
_Homepage on load_
!["Create New Appointment"](https://github.com/austinkret/scheduler/blob/master/docs/2.%20Create%20New%20Appointment.png)
_Create a new appointment_
!["Rendering Animation"](https://github.com/austinkret/scheduler/blob/master/docs/3.%20Rendering%20Animation.png)
_Rendering animation shown for saving and deleting while the request processes_
!["Delete Confirmation"](https://github.com/austinkret/scheduler/blob/master/docs/4.%20Delete%20Confirmation.png)
_Confirmation box that appears to ensure that you wanted to delete the indicated interview_

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Dependencies

- axios: ^0.21.1
- classnames: ^2.3.1
- normalize.css: ^8.0.1
- react: ^16.9.0
- react-dom: ^16.9.0
- react-scripts: 3.0.0
- babel/core: ^7.4.3
- torybook/addon-actions: ^5.0.10
- torybook/addon-backgrounds: ^5.0.10
- torybook/addon-links: ^5.0.10
- storybook/addons: ^5.0.10
- storybook/react: ^5.0.10
- testing-library/jest-dom: ^4.0.0
- testing-library/react: ^8.0.7
- testing-library/react-hooks: ^5.1.2
- babel-loader: ^8.0.5
- node-sass: ^4.14.0
- prop-types: ^15.7.2
- react-test-renderer: ^16.14.0
