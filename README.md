# Range Demo

## Table of Contents

## Overview

This web application serves as a demonstration of the functionality of a slider with two distinct values, ranging from a fixed to a continuous value.

## Features

### Home Page

- Collects limits and data for a slider with both a continuous range and a fixed value through a Mock API using [mockable.io](https://www.mockable.io/).
- Displays the sliders using the obtained data from the API.

![Home](docs/ranges.png)

### Storybook

A collection of stories has been implemented for testing and documenting the components utilized in the application.

## Technologies Used

This application was designed using TypeScript, React, and Vite. For querying and cache management, React Query is used. In terms of testing, Jest and Testing Library are employed to guarantee the application functions as intended. The data from Mock API is validated via Zod schemas to assure the data structure is as expected.

## Getting Started

### Prerequisites

- Node 20+ should be installed on your machine.
- Install the necessary dependencies using `npm i`.

### Production Mode

- Build the application using `npm run build`.
- In the `dist` directory, you'll find the static files that are ready for use. They can be tested using, for example, the [serve](https://www.npmjs.com/package/serve) command `npx serve dist`.

### Development Mode

- Start the development server with `npm run dev` for hot reloading and dynamic page behavior.

### Storybook Mode

- Execute `npm run storybook` to start a Storybook instance that showcases the components used in this application. You can manually change props on each component to see how it looks and behaves differently.

### Running Tests

- To run tests, simply execute `npm test`.

## License

This project falls under the GNU General Public License (GPL). For more details, please refer to the `LICENSE` file in this repository.
