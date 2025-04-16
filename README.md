# WeShop

WeShop is a comprehensive full-stack e-commerce web application designed to provide a seamless shopping experience. Built with Next.js, React, and TypeScript, WeShop offers a responsive user interface for browsing and purchasing products, while also featuring an intuitive admin panel for managing product catalogs, orders, and user accounts.

## Features

- **Product Catalog**: Explore and search through a wide range of products, each with detailed information and images.
- **Shopping Cart**: Easily add items to your cart, modify quantities, and proceed to checkout.
- **User Authentication**: Sign up, log in, and manage your account information.
- **Wishlist**: Save products to a wishlist for future reference.
- **Live Chat**: Get real-time assistance from customer support.
- **Admin Panel**: Admin users can manage products, process orders, and oversee user accounts.

## Tech Used

- **Next.js**: React framework for server-side rendering and static site generation.
- **React**: A JavaScript library used to build dynamic user interfaces.
- **TypeScript**: A superset of JavaScript that introduces optional static typing to improve code quality and maintainability.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **Jest**: JavaScript testing framework for unit and integration tests.
- **React Testing Library**: Utilities for testing React components.
- **Mock Service Worker**: API mocking library for browser and Node.js environments.

## Project Structure

- **app/**: Contains the main application code and components.
  - **about/**: Contains the About page component and its test.
  - **auth/**: Contains the Login and Signup page components and their tests.
  - **cart/**: Contains the Cart page component.
  - **components/**: Contains reusable UI components used throughout the application.
  - **mocks/**: Contains mock server and handler configurations for API mocking during development and testing.
  - **products/**: Contains the dynamic Product page component, its test, and a loading component.
  - **providers/**: Contains context providers for managing application state (auth, cart, theme, wishlist).
  - **utils/**: Contains utility functions and helpers.
  - **wishlist/**: Contains the Wishlist page component.
- **public/**: Contains static assets like images, icons, and favicons.
- **types/**: Contains TypeScript type definitions.
- Other files like .gitignore, package.json, tsconfig.json, etc. are standard configuration files.

## Getting Started

### Prerequisites

- Node.js (version 14 or later)
- npm (version 6 or later)

### Development

To start the development server, run:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

### Testing

To run the test suite, execute:

```bash
npm test
```

### Production

To build the production-ready application, run:

```bash
npm run build
```

Then, start the production server:

```bash
npm start
```

The application will be served at `http://localhost:3000`.

## Test Credentials

You can use this User and Pass to login

```bash
user : qwerty@asd.com
pass : 12345
```

or just sign up with your account

## Acknowledgments

- [Platzi Fake Store API](https://fakeapi.platzi.com/) for product data