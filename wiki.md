# Project Summary
Aporo is a modern web application tailored for outdoor enthusiasts to discover and explore various trails. It features a visually appealing landing page with search functionality, detailed trail cards, and a clean, responsive design, built using React and Tailwind CSS. Aporo enhances the outdoor experience by providing essential information about trails, including difficulty, time, distance, and altitude. Recent updates have improved mobile usability, making it more accessible for users on smaller screens.

# Project Module Description
- **Landing Page**: The main entry point of the application featuring a header, hero section, search bar, and a grid of trail cards.
- **Trail Cards**: Displays information about different trails, including difficulty, estimated time, distance, and altitude.
- **Search Functionality**: Allows users to search for specific trails based on their preferences.
- **Mobile Menu**: A responsive sandwich menu added for mobile devices, enhancing navigation.

# Directory Tree
```
shadcn-ui/
├── README.md                # Project documentation
├── components.json          # Component configuration
├── eslint.config.js         # ESLint configuration
├── index.html               # Main HTML file
├── package.json             # Project dependencies and scripts
├── postcss.config.js        # PostCSS configuration
├── public/                  # Public assets
│   ├── favicon.svg          # Favicon for the application
│   └── robots.txt           # Robots.txt file for SEO
├── src/                     # Source code
│   ├── App.css              # Global styles
│   ├── App.tsx              # Main application component
│   ├── components/          # UI components
│   │   └── ui/              # UI components directory
│   ├── hooks/               # Custom hooks
│   ├── pages/               # Application pages
│   │   └── Index.tsx        # Landing page component
│   ├── index.css            # Additional styles
│   ├── lib/                 # Utility functions
│   ├── main.tsx             # Entry point for the application
│   └── vite-env.d.ts        # Type definitions for Vite
├── tailwind.config.ts       # Tailwind CSS configuration
├── template_config.json      # Template configuration
├── tsconfig.app.json        # TypeScript configuration for the app
├── tsconfig.json            # General TypeScript configuration
└── vite.config.ts           # Vite configuration
```

# File Description Inventory
- **README.md**: Contains project overview and setup instructions.
- **components.json**: Configuration file for components.
- **eslint.config.js**: Configuration for linting JavaScript and TypeScript code.
- **index.html**: The main HTML file that serves the application.
- **package.json**: Lists project dependencies and scripts for development.
- **postcss.config.js**: Configuration for PostCSS processing.
- **public/**: Contains static assets like favicon and robots.txt.
- **src/**: Contains all source code, including components, hooks, and pages.
- **tailwind.config.ts**: Configuration for Tailwind CSS.
- **template_config.json**: Configuration for templates used in the project.
- **tsconfig.app.json**: TypeScript configuration specific to the application.
- **tsconfig.json**: General TypeScript configuration for the project.
- **vite.config.ts**: Configuration for Vite, the build tool used for the project.

# Technology Stack
- **Frontend**: React, TypeScript, Tailwind CSS, Material Icons
- **Build Tool**: Vite
- **Linting**: ESLint with TypeScript support

# Usage
To set up the project, follow these steps:
1. Install dependencies:
   ```bash
   pnpm install
   ```
2. Build the project:
   ```bash
   pnpm run build
   ```
3. Run the development server:
   ```bash
   pnpm run dev
   ```
