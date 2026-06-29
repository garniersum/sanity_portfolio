# Carlos Gómez - Frontend Developer Portfolio

A modern, responsive portfolio website built with React, Vite, and Sanity CMS. Features smooth animations, dark mode support, and a clean design optimized for showcasing projects and skills.

## 🚀 Tech Stack

- **Frontend**: React 19, Vite 8
- **Styling**: SCSS, CSS Variables
- **Animations**: Framer Motion
- **CMS**: Sanity (headless CMS)
- **Icons**: React Icons
- **Build Tool**: Vite with React Compiler

## ✨ Features

- Responsive design with mobile-first approach
- Smooth animations and micro-interactions
- Dark mode support
- Dynamic content from Sanity CMS
- Optimized images with WebP format
- Accessibility-focused (ARIA labels, semantic HTML)
- SEO optimized with meta tags and Open Graph

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🛠️ Project Structure

```
src/
├── components/       # Reusable components (Navbar, SocialMedia)
├── container/        # Main sections (Header, About, Work, Skills, Testimonial, Footer)
├── wrapper/          # HOCs for layout and animations
├── client/           # Sanity CMS client configuration
├── constants/        # Images and static assets
├── assets/           # Static assets (images, icons)
└── App.jsx          # Main application component
```

## 🎨 Customization

### Sanity CMS
The portfolio content is managed through Sanity CMS. To connect your own Sanity project:

1. Create a project at [sanity.io](https://www.sanity.io)
2. Update `src/client/client.js` with your project ID
3. Configure your content models in the Sanity dashboard

### Styling
Global styles and CSS variables are defined in `src/App.scss`. Each component has its own SCSS file for component-specific styles.

## 🌐 Deployment

The portfolio is currently deployed on Vercel. To deploy:

```bash
# Build the project
npm run build

# Deploy to Vercel
vercel deploy
```

## 📄 License

This project is open source and available for personal use.

## 👤 Contact

- **Email**: carlos.gomez.mobile@gmail.com
- **Phone**: (502) 4568-5308
- **LinkedIn**: [linkedin.com/in/garniersum](https://www.linkedin.com/in/garniersum/)
- **GitHub**: [github.com/garniersum](https://github.com/garniersum)


If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
