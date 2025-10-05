# Frontend Architecture

This document outlines the architecture of the frontend application, focusing on its project structure, file naming conventions, and the responsibilities of each layer.

## 1. Project Structure and File Naming Conventions

The application follows a modular structure, organizing code into logical directories within the `src/` folder. This approach enhances maintainability, scalability, and team collaboration.

```
src/
├── app/                        // Core application logic, components, modules, and routing
│   ├── app.component.html      // Main application HTML template
│   ├── app.component.scss      // Main application styles
│   ├── app.component.spec.ts   // Unit tests for the main application component
│   ├── app.component.ts        // Main application component logic
│   ├── app.config.ts           // Application-wide configuration constants
│   ├── app.module.ts           // Root Angular module
│   ├── app.routing.ts          // Main application routing module
│   ├── containers/             // Smart components/layouts that manage state and data flow
│   │   ├── common/             // Common container components
│   │   │   ├── breadcrumb-router/
│   │   │   ├── not-found/
│   │   │   ├── status-label/
│   │   │   ├── toggle-button/
│   │   │   └── view-modal/
│   │   ├── default-layout/     // Default layout components (header, footer, sidebar)
│   │   │   ├── default-footer/
│   │   │   └── default-header/
│   │   └── ... (other container modules)
│   ├── icons/                  // Icon definitions and related utilities
│   ├── model/                  // Data models/interfaces for entities
│   ├── services/               // Business logic, data fetching, and shared functionalities
│   │   ├── breadcumb/
│   │   ├── common/
│   │   ├── loading/
│   │   └── system/
│   ├── store/                  // State management (e.g., NgRx store, actions, reducers, selectors)
│   │   ├── actions/
│   │   ├── reducers/
│   │   ├── selectors/
│   │   └── states/
│   ├── utils/                  // Utility functions, helpers, and common directives
│   │   ├── consts/
│   │   ├── directive/
│   │   │   ├── inp-icon/
│   │   │   ├── inp-select-common/
│   │   │   └── inp-select-dropdown-common/
│   │   ├── enums/
│   │   └── helpers/
│   └── views/                  // Dumb components/pages that focus on UI presentation
│       ├── components/
│       │   ├── hqc/
│       │   ├── qc1qc2/
│       ├── dashboard/
│       ├── error/
│       │   └── p505/
│       └── ... (other feature modules or shared components)
├── assets/                     // Static assets like images, fonts, and environment configurations
│   ├── i18n/
│   ├── images/
│   │   ├── avatars/
│   │   ├── brand/
│   │   └── icon/
│   ├── img/
│   │   ├── avatars/
│   │   ├── brand/
│   │   └── icon/
│   └── ... (other asset folders)
├── declarations.d.ts           // TypeScript declaration file for modules without type definitions
├── environments/               // Environment-specific configuration files (e.g., production, development)
├── favicon.ico                 // Favicon for the application
├── index.html                  // Main HTML file, the entry point of the application
├── main.ts                     // Main TypeScript file for bootstrapping the Angular application
├── polyfills.ts                // Polyfills for browser compatibility
├── scss/                       // Global SCSS styles and vendor styles
│   └── vendors/
│       └── chart.js/
├── styles.scss                 // Global styles for the application
├── test.ts                     // Configuration for unit tests
└── typings.d.ts                // Custom TypeScript type definitions
```

### File Naming Conventions:

- **Components:** `[name].component.ts`, `[name].component.html`, `[name].component.scss`, `[name].component.spec.ts`
- **Modules:** `[name].module.ts`
- **Routing:** `[name].routing.ts`
- **Services:** `[name].service.ts`
- **Models/Interfaces:** `[name].model.ts` or `[name].interface.ts`
- **State Management (NgRx):**
  - Actions: `[feature].actions.ts`
  - Reducers: `[feature].reducer.ts`
  - Selectors: `[feature].selectors.ts`
  - State: `[feature].state.ts`
- **Utilities/Helpers:** `[name].util.ts` or `[name].helper.ts`
- **Constants:** `[name].const.ts`
- **Directives:** `[name].directive.ts`

## 2. Layers Description and Implementation

The application is structured into several distinct layers, each with specific responsibilities:

### 2.1. `app/` (Core Application Layer)

- **Description:** This layer contains the core application logic, including the root component, modules, routing configuration, and global services. It serves as the entry point for the application and orchestrates the interaction between different modules and components.
- **Implementation:**
  - [`app.component.ts`](src/app/app.component.ts): The root component that defines the main application structure and layout.
  - [`app.module.ts`](src/app/app.module.ts): The main application module that imports and declares all the necessary modules, components, and services.
  - [`app.routing.ts`](src/app/app.routing.ts): Defines the application's routing configuration, mapping URLs to specific components or modules.

### 2.2. `containers/` (Smart Components / Layouts Layer)

- **Description:** This layer contains smart components, also known as container components, which are responsible for managing the application state and interacting with services to fetch and process data. These components act as intermediaries between the core application logic and the presentational components in the `views/` layer.
- **Implementation:**
  - `DefaultLayoutComponent`: Provides the default layout for the application, including the header, footer, and sidebar.
  - `DefaultHeaderComponent`: Implements the application's header section, typically containing navigation links and user profile information.
  - `DefaultFooterComponent`: Implements the application's footer section, often displaying copyright information and links to relevant resources.
  - `common/`: Contains reusable container components like `breadcrumb-router`, `not-found`, `status-label`, `toggle-button`, and `view-modal`.

### 2.3. `icons/` (Icons Layer)

- **Description:** This layer manages the application's icons, providing a centralized location for storing and accessing icon assets.
- **Implementation:**
  - The directory likely contains icon files in various formats (e.g., SVG, PNG) and may include a service for dynamically loading and rendering icons.

### 2.4. `model/` (Data Models / Interfaces Layer)

- **Description:** This layer defines the data structures used throughout the application, ensuring type safety and consistency. It typically contains TypeScript interfaces or classes that represent the entities exchanged between the frontend and backend.
- **Implementation:**
  - The directory contains files defining the structure of data objects, such as `user.model.ts` and `product.interface.ts`.

### 2.5. `services/` (Business Logic / Data Access Layer)

- **Description:** This layer encapsulates the application's business logic and data access operations. It provides services for interacting with APIs, managing authentication, and performing other tasks that are not directly related to the UI.
- **Implementation:**
  - `AuthService`: Handles user authentication and authorization.
  - `UserService`: Manages user-related data and operations.
  - `DataService`: Provides a generic interface for fetching data from APIs.
  - `breadcumb/`, `common/`, `loading/`, and `system/` subdirectories likely contain specialized services for these domains.

### 2.6. `store/` (State Management Layer)

- **Description:** This layer implements a state management pattern, likely using NgRx, to centralize and manage the application's state. This provides a predictable state container and simplifies debugging.
- **Implementation:**
  - `actions/`: Defines actions that describe unique events in the application.
  - `reducers/`: Contains pure functions that take the current state and an action, and return a new state.
  - `selectors/`: Defines functions to query specific slices of the state.
  - `states/`: Defines the shape of the application state.

### 2.7. `utils/` (Utilities and Helpers Layer)

- **Description:** This layer provides a collection of reusable utility functions, helper classes, constants, directives, and enums that don't fit into other specific layers.
- **Implementation:**
  - `consts/`: Contains constant values used throughout the application.
  - `directive/`: Houses custom Angular directives, including `inp-icon`, `inp-select-common`, and `inp-select-dropdown-common`.
  - `enums/`: Defines enumerations for various application states or types.
  - `helpers/`: Contains generic helper functions.

### 2.8. `views/` (Presentational Components / Pages Layer)

- **Description:** This layer contains presentational components, also known as "dumb" components, which are responsible for rendering the UI based on input properties and emitting events for user interactions. These components have minimal or no direct interaction with services or the store.
- **Implementation:**
  - `DashboardComponent`: Implements the application's dashboard view.
  - `TemperatureComponent`: Displays temperature-related data.
  - `P403Component` and `P505Component`: Implement error pages for specific HTTP status codes.
  - `components/`, `dashboard/`, `error/`, and `qc1qc2/` subdirectories suggest organization by feature or domain.

### 2.9. `assets/` (Assets Layer)

- **Description:** This layer stores static assets such as images, fonts, and environment configurations.
- **Implementation:**
  - `i18n/`: Contains internationalization files for supporting multiple languages.
  - `images/`: Stores image assets used throughout the application.
  - `img/`: An alternative location for storing image assets.

### 2.10. Other Files

- `declarations.d.ts`: TypeScript declaration file for modules without type definitions.
- `environments/`: Environment-specific configuration files (e.g., production, development).
- `favicon.ico`: Favicon for the application.
- `index.html`: Main HTML file, the entry point of the application.
- `main.ts`: Main TypeScript file for bootstrapping the Angular application.
- `polyfills.ts`: Polyfills for browser compatibility.
- `scss/`: Global SCSS styles and vendor styles.
- `styles.scss`: Global styles for the application.
- `test.ts`: Configuration for unit tests.
- `typings.d.ts`: Custom TypeScript type definitions.
