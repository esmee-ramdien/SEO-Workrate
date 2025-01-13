# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev
```
# Project Name

This is a web application built using Vue 3 (Nuxt 3) with integration of various technologies to provide efficient performance and a sleek design.

## Tech Stack

- **Vue 3 (Nuxt 3)**: The framework used for building the frontend of the application.
- **Node.js 20 (LTS)**: The runtime environment for running the server-side code.
- **Axios**: Used for making HTTP requests, especially for handling API calls not supported by SDKs.
- **Tailwind CSS**: Utility-first CSS framework for styling the UI components.
- **Flowbite**: A lightweight UI component library built on Tailwind CSS, chosen for its simplicity and performance. Ideal for projects of this size.
- **Giphy API**: Used to fetch GIFs and other media from Giphy.

## Project Notes

### Custom Caching System
I initially considered using **TanStack**, but at the time of development, **TanStack** (formerly React Query) only supported Vue 2. Since this project was built with Vue 3, I created my own caching system. For future projects, I plan to use a more suitable caching package when Vue 3 support becomes available.

### Styling
For styling, **Flowbite** was chosen due to its lightweight nature, making it perfect for a project of this size. In larger projects, I would opt for more robust frameworks such as **Bulma**, **PrimeVue**, **Bootstrap**, or similar alternatives depending on the project’s needs.

### API Handling
I am a strong proponent of using SDKs as they often lead to cleaner code and better development practices. However, the **Giphy SDK** did not cover all the required endpoints for this project, so I had to use **Axios** to manually handle some of the API calls.
