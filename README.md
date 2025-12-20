# Next.js Shopping Cart Application

A modern, full-featured e-commerce shopping cart application built with Next.js 16, TypeScript, and Tailwind CSS. This project includes a complete shopping experience with user authentication, product management, cart functionality, checkout process, and admin dashboard.

## Features

### Customer Features

- 🛍️ **Product Browsing**: Browse products with filtering and search
- 🛒 **Shopping Cart**: Add/remove items, quantity management
- 💳 **Checkout Process**: Complete order placement workflow
- 👤 **User Authentication**: Login/signup functionality
- 📱 **Responsive Design**: Mobile-first responsive interface
- 🌍 **Multi-language Support**: Internationalization (i18n) with English and Arabic
- 🌙 **Dark Mode**: Toggle between light and dark themes
- 📧 **Newsletter Subscription**: Email newsletter signup
- ⭐ **Product Reviews**: View and manage product ratings

### Admin Features

- 📊 **Dashboard**: Analytics and overview statistics
- 📦 **Product Management**: CRUD operations for products
- 👥 **Customer Management**: View and manage customers
- 🏪 **Vendor Management**: Multi-vendor support
- 📋 **Order Management**: Track and manage orders
- 📂 **Category Management**: Organize products by categories
- 📈 **Inventory Management**: Stock tracking and management
- ⚙️ **Settings**: System configuration options

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.0
- **State Management**: Redux Toolkit + React Query
- **Authentication**: JWT with custom auth system
- **Forms**: React Hook Form with Zod validation
- **UI Components**: Custom component library
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Internationalization**: next-intl

## Prerequisites

Before running this project, make sure you have:

- **Node.js** (version 18 or higher)
- **npm**, **yarn**, **pnpm**, or **bun** package manager
- **Git** for version control

## Installation

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd next_shoping_cart
   ```

2. **Install dependencies**:

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Set up environment variables**:
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   JWT_PASSWORD=your-jwt-secret-key
   ```

## Getting Started

1. **Run the development server**:

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

2. **Open your browser** and navigate to [http://localhost:3000](http://localhost:3000)

3. **Start exploring**:
   - Browse products on the homepage
   - Create an account or login
   - Add items to cart and proceed to checkout
   - Access admin dashboard at `/dashboard`

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint to check code quality
- `npm run lint:fix` - Fix ESLint issues automatically
- `npm run prod` - Build and start production server

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── [lang]/            # Internationalized routes
│   │   ├── (main)/        # Main application pages
│   │   ├── auth/          # Authentication pages
│   │   └── dashboard/     # Admin dashboard pages
│   └── api/               # API routes
├── components/            # Reusable UI components
│   ├── core/             # Core UI components
│   └── themes/           # Theme-specific components
├── lib/                  # Utility libraries
│   ├── auth/            # Authentication utilities
│   ├── redux/           # Redux store configuration
│   └── react-query/     # React Query setup
├── hooks/               # Custom React hooks
├── utils/               # Utility functions
├── constants/           # Application constants
├── context/             # React context providers
├── dictionaries/        # i18n translation files
└── types/               # TypeScript type definitions
```

## Key Routes

### Public Routes

- `/` - Homepage with featured products
- `/products` - Product listing page
- `/products/[id]` - Product detail page
- `/cart` - Shopping cart
- `/checkout` - Checkout process
- `/auth/login` - User login
- `/auth/signup` - User registration

### Protected Routes (Admin)

- `/dashboard` - Admin dashboard overview
- `/dashboard/products` - Product management
- `/dashboard/orders` - Order management
- `/dashboard/customers` - Customer management
- `/dashboard/vendors` - Vendor management
- `/dashboard/categories` - Category management
- `/dashboard/inventory` - Inventory management
- `/dashboard/analytics` - Analytics and reports

## Configuration

### Environment Variables

| Variable                   | Description      | Default                 |
| -------------------------- | ---------------- | ----------------------- |
| `NEXT_PUBLIC_API_BASE_URL` | API base URL     | `http://localhost:3000` |
| `NEXT_PUBLIC_SITE_URL`     | Site URL for SEO | `http://localhost:3000` |
| `JWT_PASSWORD`             | JWT secret key   | Required                |

### Internationalization

The app supports multiple languages:

- English (en)
- Arabic (ar)

Translation files are located in `src/dictionaries/`.

### Theming

The application supports:

- Light/Dark mode toggle
- Customizable color schemes
- Responsive design breakpoints

## Development Guidelines

### Code Style

- Use TypeScript for type safety
- Follow ESLint configuration
- Use Tailwind CSS for styling
- Implement responsive design patterns

### Component Structure

- Keep components small and focused
- Use custom hooks for logic reuse
- Implement proper error boundaries
- Follow accessibility best practices

### State Management

- Use Redux Toolkit for global state
- Use React Query for server state
- Implement proper loading states
- Handle errors gracefully

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Configure environment variables
4. Deploy automatically on push

### Other Platforms

1. **Build the application**:

   ```bash
   npm run build
   ```

2. **Start the production server**:
   ```bash
   npm run start
   ```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make your changes and commit: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## Troubleshooting

### Common Issues

1. **Port already in use**:

   ```bash
   # Kill process on port 3000
   npx kill-port 3000
   ```

2. **Module not found errors**:

   ```bash
   # Clear node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Build errors**:
   ```bash
   # Clear Next.js cache
   rm -rf .next
   npm run build
   ```

## License

This project is licensed under the MIT License.

## Support

For support and questions:

- Create an issue in the repository
- Check the [Next.js documentation](https://nextjs.org/docs)
- Review the [Tailwind CSS documentation](https://tailwindcss.com/docs)
