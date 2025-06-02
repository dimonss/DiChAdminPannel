# DiChAdmin Panel

A modern admin panel built with React, TypeScript, and Chakra UI, based on the Horizon UI template.

## Features

- 🚀 Built with React 18 and TypeScript
- 💅 Modern UI with Chakra UI components
- 📊 Data visualization with ApexCharts
- 🔐 Redux-based state management with persistence
- 📱 Responsive design for all devices
- 🎨 Customizable theme and styling
- 🔄 Form handling with Formik and Yup validation

## Prerequisites

- Node.js LTS version
- npm or yarn package manager

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/dimonss/DiChAdminPannel.git
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:

For local development:
```bash
npm run start:local
```

For staging environment:
```bash
npm run start:stage
```

The application will be available at `http://localhost:3000/admin`

## Environment Configuration

The project supports different environment configurations:

- Local development: Uses local API endpoints
- Staging: Uses staging environment endpoints
- Production: Uses production endpoints

Environment variables can be configured through `.env` files or during the build process.

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Application pages/routes
├── store/         # Redux store configuration
├── theme/         # Chakra UI theme customization
├── utils/         # Utility functions
└── App.tsx        # Main application component
```

## Available Scripts

- `npm run start:local` - Start development server with local configuration
- `npm run start:stage` - Start development server with staging configuration
- `npm run build` - Create production build
- `npm run test` - Run tests
- `npm run deploy` - Deploy to production

## Dependencies

Main dependencies include:
- React 18.2.0
- Chakra UI 1.8.8
- Redux Toolkit
- React Router 6
- Formik & Yup
- ApexCharts
- And more...

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
