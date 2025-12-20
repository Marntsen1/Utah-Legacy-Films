# Utah Legacy Films

A beautiful, modern website for Utah Legacy Films - a cinematic video production service for capturing family legacies and stories.

## Features

- 🎬 Cinematic, elegant design with warm earth tones
- 📱 Fully responsive with mobile navigation
- ♿ Accessible with ARIA labels and keyboard navigation
- 🚀 Optimized for performance with lazy loading
- 🔍 SEO optimized with meta tags and structured data
- ✨ Smooth animations with Framer Motion
- 🎨 Custom cursor and animated background
- 📝 Form validation and error handling

## Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Framer Motion** - Animations
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd utah-legacy-films
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. (Optional) Set environment variables:
   Create a `.env.local` file and add:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run type-check` - Run TypeScript type checking

## Project Structure

```
utah-legacy-films/
├── components/          # React components
│   ├── ui/            # Reusable UI components
│   ├── Hero.tsx       # Hero section
│   ├── ValueProps.tsx # Value propositions
│   ├── Proof.tsx      # Testimonials
│   ├── Pricing.tsx    # Pricing packages
│   ├── CTA.tsx        # Call-to-action form
│   └── Layout.tsx     # Main layout with navigation
├── public/            # Static assets
├── App.tsx            # Main app component
├── index.tsx          # Entry point
└── types.ts           # TypeScript type definitions
```

## Customization

### Adding Your Logo

Place your logo image as `logo.png` in the `public` folder. The component will automatically fallback to a text-based logo if the image is not found.

### Updating Colors

Colors are defined in `tailwind.config.js` and can be customized to match your brand.

### Content Updates

- Update pricing packages in `components/Pricing.tsx`
- Modify testimonials in `components/Proof.tsx`
- Edit hero content in `components/Hero.tsx`

## Deployment

Build the project for production:

```bash
npm run build
```

The `dist` folder will contain the production-ready files that can be deployed to any static hosting service (Vercel, Netlify, etc.).

## License

All rights reserved © Utah Legacy Films
