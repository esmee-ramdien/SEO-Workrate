# SEO Giphy

This project contains the code for an SEO that searches through the Giphy database to fetch and display relevant GIFs based on user input.


## Setup

Clone the project to your local device:
  
```bash

# git

git clone https://github.com/esmee-ramdien/SEO-Workrate.git

```

Make sure to install dependencies:

```bash

# npm

npm  install

or

npm i

```


## Development Server

Start the development server on `http://localhost:3000`:


```bash

# npm

npm  run  dev

```


## Tech Stack

-  **Vue 3 (Nuxt 3)**: The framework used for building the frontend of the application.

-  **Node.js 20 (LTS)**: The latest stable version of runtime environment for running the server-side code.

-  **Axios**: Used for making calls to the Giphy API.

-  **Tailwind CSS**: For styling the UI.

-  **Flowbite**: A lightweight UI component library built on Tailwind CSS.

-  **Giphy API**: Used to fetch GIFs from Giphy.


## Project Notes

### Custom Caching System

I initially considered using **TanStack**, since it was a requirement, but **TanStack** does not support Vue3. Hence, I created my own caching system. For future projects, a more suitable caching package should be used.

### Styling

For styling, **Flowbite** was chosen due to its lightweight nature, making it perfect for a project of this size. In larger projects, I would opt for more robust frameworks such as **Bulma**, **PrimeVue**, **Bootstrap**, or similar alternatives, depending on the project’s needs.

### API Handling

I am a strong proponent of using SDKs as they help with writing cleaner code and better development practices. However, the **Giphy SDK** did not cover all the required endpoints for this project, so I had to use **Axios** to handle the API calls.

### Project Structure 
For larger projects, I would consider separating the frontend and backend into separate repositories. This structure would help in organizing the codebase more effectively. A separate backend also allows for easier scaling of different technologies for the server-side.

But for this project I created a folder 'composables', which technically separates the frontend from the backend.

## Potential Improvements

### 1. **Optimize Caching**

-  **Persistent Caching**: Enhance the custom caching system to persist data locally (e.g., in `localStorage` or an npm package). This would improve performance by reducing the number of API calls for frequently accessed data.

-  **Cache Expiry**: Implement cache expiry mechanisms to ensure that data doesn't become stale and is refreshed after a specified time or condition.

### 2. **Error Handling & Feedback**

-  **User-Friendly Error Pages**: Display user-friendly error messages if there’s an issue with the website or API.

-  **Loading States**: Display a loading spinner or animation while GIFs are being fetched, improving user experience, especially for slower connections.

### 3. **User Experience (UX) Enhancements**

-  **Seamless Infinite Scroll**: Try to 'autoload' the data more seamlessly.

-  **Favorites or Saved GIFs**: Allow users to save or "favorite" specific GIFs.
-  **Sharing and Saving to Device GIFs**: Allow users to share and save GIFs to their local devices.
  
  
### 4. **Refactor Code for Maintainability**

-  **Modular Components**: Break down large components into smaller, reusable components for better maintainability and readability. For instance, separate the GIF card and search bar into distinct components.

-  **Store Management**: Use Vuex or Pinia for centralized state management, e.g., for cached data, search queries, and user preferences.

### 5. **Design Improvements**

- **Responsiveness**: Ensure the design is fully responsive and works seamlessly across all devices. 

-  **Accessibility Improvements**: Enhance accessibility for people with 'disabilities'.


### 6. **Deployment**

-  **Cloud Functions or Serverless**: If the backend logic grows in complexity, consider moving certain API-related operations to cloud functions (e.g., AWS) for better scalability.

-  **CI/CD Pipeline**: Set up continuous integration/continuous deployment (CI/CD) pipelines to automate building and deploying the application.