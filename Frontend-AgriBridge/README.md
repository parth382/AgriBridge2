 # AgriBridge Frontend

AgriBridge is a modern web application that connects farmers and consumers directly, facilitating the sale of fresh agricultural products. This repository contains the frontend implementation of the AgriBridge platform.

## Features

- User authentication (Consumer, Farmer, Admin roles)
- Product browsing and search
- Order management
- Real-time notifications
- Responsive design
- Role-based access control

## Tech Stack

- **Framework:** React.js with TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Redux Toolkit
- **API Calls:** Axios / React Query
- **Routing:** React Router
- **Real-time:** Socket.IO
- **Build Tool:** Vite

## Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/agribridge-frontend.git
   cd agribridge-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```
   VITE_API_URL=http://localhost:5000/api
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
frontend/
├── assets/                  # Static assets (images, icons)
├── components/              # Reusable UI components
│   ├── ui/                  # Buttons, modals, cards, etc.
│   └── layout/              # Navbar, Footer, Sidebar
├── context/                 # Global state (Auth, Theme, etc.)
├── hooks/                   # Custom React hooks
├── pages/                   # Top-level route components
├── features/                # Feature modules (API + logic + UI)
├── routes/                  # Route definitions and role-based guards
├── services/                # Axios services and API handlers
└── utils/                   # Utility functions/helpers
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [React Query](https://tanstack.com/query/latest)
- [Vite](https://vitejs.dev/)