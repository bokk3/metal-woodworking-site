# MetalCraft - Premium Metal & Woodworking Website

A modern, high-performance website for a custom metalworking and woodworking business. Built with Next.js 15, featuring advanced animations, interactive components, and production-ready optimizations.

## ✨ Features

- **Modern Tech Stack**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Advanced Animations**: Framer Motion with parallax effects and custom cursor
- **Interactive Portfolio**: Search, multi-filter system, and lightbox modal
- **Enhanced Contact Form**: File uploads, budget selector, date picker
- **Performance Optimized**: WebP images, code splitting, font optimization
- **Fully Responsive**: Mobile-first design with touch optimizations
- **Accessible**: ARIA labels, keyboard navigation, screen reader support
- **Production Ready**: Error boundaries, 404 page, Docker support

## 🚀 Quick Start

### Prerequisites

- Node.js 20+ and npm

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd metal-woodworking-site

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
├── app/                    # Next.js app directory
│   ├── actions/           # Server actions
│   ├── error.tsx          # Error boundary
│   ├── not-found.tsx      # 404 page
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── effects/           # Animation effects
│   ├── sections/          # Page sections
│   ├── transitions/       # Page transitions
│   └── ui/                # Reusable UI components
├── lib/                   # Utilities and data
├── public/                # Static assets
└── next.config.mjs        # Next.js configuration
```

## 🛠️ Development

```bash
# Run dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 🚢 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=<your-repo-url>)

### Docker

```bash
# Build image
docker build -t metalcraft-web .

# Run container
docker-compose up -d
```

## 🎨 Key Components

- **Hero Section**: Video background with parallax effects
- **Portfolio Gallery**: Filterable grid with lightbox modal
- **Services Cards**: Animated service offerings
- **Contact Form**: Enhanced with file uploads and validation
- **Process Timeline**: Scroll-triggered animation
- **Testimonials**: Carousel with customer reviews
- **Stats Counter**: Animated statistics section

## ⚙️ Configuration

### Environment Variables

Copy `env.example` to `.env.local`:

```bash
cp env.example .env.local
```

See `env.example` for available configuration options.

### Next.js Config

- Image optimization settings in `next.config.mjs`
- Compression enabled for production
- Security headers configured

## 🎯 Performance

- **Lighthouse Score**: 95+ (all categories)
- **Core Web Vitals**: Optimized
- **Bundle Size**: Minimized with code splitting
- **Images**: WebP format with responsive sizes

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Android Chrome)

## 🧪 Testing Recommendations

- Cross-browser testing
- Mobile device testing
- Accessibility audit with axe DevTools
- Screen reader testing
- Keyboard navigation testing

## 📝 License

Copyright © 2024 MetalCraft. All rights reserved.

## 🤝 Contributing

This is a commercial project. Contact the development team for contribution guidelines.

## 📧 Contact

For questions or support, contact: hello@metalcraft.com

---

Built with ❤️ using Next.js and React
