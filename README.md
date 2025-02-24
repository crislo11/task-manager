# Task Manager Real-Time Updates

This project is a task manager built with **Next.js**, **React**, **TypeScript**, **TailwindCSS**, and **ShadCN UI**. It uses **Firebase** as the backend for real-time data storage, and task management. The project is designed to be scalable, efficient, and easy to maintain.

## Real-time Demo

[![Watch the video]()](https://jumpshare.com/embed/TeHN9iUo4TLF5JLdfWXO)
## Project Architecture

The project follows a modular and scalable architecture, organized as follows:

```
.
task-manager/
├── public                               # Static assets (images, fonts, etc.)
├── src                                  # Source code for the application
│   ├── app
│   │   ├── [projectId]                  # Project board for a specific project
|   |   |   ├── components               # Components for the task board
|   |   |   ├── page.tsx                 # Page component for the task board
│   │   ├── layout.tsx                   # Layout component for the entire application
│   │   ├── page.tsx                     # Main page component for the application (project list)
│   ├── components                       # Reusable components for the application
│   │   ├── theme                        # Theme-related components (e.g., theme toggle)
│   │   ├── ui                           # ShadUI components for the application (buttons, inputs, etc.)
│   ├── hooks                            # Custom hooks for the application
│   ├── lib                              # Utility functions and libraries
│   └── utils                            # Utility functions for the application
│   └── types.tsx                        # Type definitions for the application
├── .gitignore                           # Git ignore file
├── next.config.js                       # Next.js configuration file
├── tailwind.config.js                   # TailwindCSS configuration file
├── tsconfig.json                        # TypeScript configuration file
├── package.json                         # Package manifest
└── README.md                            # Project README file
```

## Firebase Diagram

```bash
   graph TD;
    A["Collection: projects"]-->B["Document: projectId"]
    B-->C["title: string"]
    B-->D["description: string"]
    B-->E["createdAt: timestamp"]
    B-->F["updatedAt: timestamp"]
    B-->G["ownerId: string"]
    B-->H["members: string#91;#93;"]

    N["Collection: tasks"]-->O["Document: taskId"]
    O-->P["projectId: string"]
    O-->Q["columnId: string"]
    O-->R["title: string"]
    O-->S["description: string"]
    O-->T["createdAt: timestamp"]
    O-->U["updatedAt: timestamp"]
    O-->V["assignedTo: string#91;#93;"]
    O-->W["order: number"]

```

## Key Technical Decisions

**Use of Firebase:**

- Firebase was chosen for its ease of integration, scalability, and real-time capabilities. It eliminates the need for a separate backend, reducing project complexity.
- **Firestore** is used for storing tasks, while Realtime Database is used for synchronizing changes in real-time without requiring page reloads.

**No State Management Library:**

- Since Firebase handles most of the application state (authentication, real-time data), adding a state management library like Redux or Zustand would be redundant and unnecessarily increase complexity. Instead, custom hooks are used to manage the remaining application state efficiently.

**Integration of ShadCN UI:**

- ShadCN UI was chosen for its modern and customizable design, enabling the creation of attractive and consistent user interfaces with minimal effort.

**TailwindCSS:**

- TailwindCSS is used for rapid and efficient styling, allowing for responsive and highly customizable designs.

**TypeScript:**

- TypeScript was integrated to improve code quality by providing static typing and reducing errors during development.

## Key Technical Decisions

**Firebase Real-time Features:**

- Real-time synchronization is a key feature for a task manager, as it allows users to see changes immediately without reloading the page. Firebase simplifies this functionality without requiring complex solutions like WebSockets.

**No State Management Library:**

- Since Firebase already handles much of the application state (authentication, real-time data), adding a global state management library would be redundant and increase unnecessary complexity. Custom hooks are sufficient for managing the remaining state.

**Testing:**

- Jest and React Testing Library were used for testing the application.

**Accessibility:**

- The application is designed to be accessible, with a focus on providing a good user experience for all users. using aria-labels and aria-roles.

**ShadCN UI and TailwindCSS:**

- These tools enable rapid and consistent development, making them ideal for small to medium-sized projects where development speed is crucial.

## Key Features

- **Server-Side Rendering (SSR)**: Task manager pages are rendered on the server for better performance and SEO.
- **Real-Time features**: Users can add projects, tasks and see them update in real time.
- **Modular Design**: Components are organized by responsibility and follow best development practices.

## Project Setup

### Prerequisites

- Node.js (v20 or higher)
- npm (v9 or higher)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/crislo11/task-manager.git
   cd task-manager

   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory and add the following environment variables:

   ```bash
    NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyCz-VaFYSiOTJTnI1trWAB8dTohPigeL3M     #TESTING PURPOSES ONLY
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=project-management-592ce.firebaseapp.com     #TESTING PURPOSES ONLY
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=project-management-592ce     #TESTING PURPOSES ONLY
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=project-management-592ce.firebasestorage.app     #TESTING PURPOSES ONLY
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=747759643266     #TESTING PURPOSES ONLY
    NEXT_PUBLIC_FIREBASE_APP_IDNEXT_PUBLIC_FIREBASE_APP_ID=1:747759643266:web:289f4919ac09adf3ae229b     #TESTING PURPOSES ONLY
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the task management app.

## License

This project is licensed under the MIT License.
