# 🪱 Sandworm

> **Note**
> 🚧 This project is currently under active development and is not yet ready for production use.
> Many features are still being implemented and the documentation is evolving.
> Feel free to watch or star the repository to stay updated!

> **Philosophy**
> 🏗️ We believe in building with the garage door open. This design system is being developed in public
> because we value transparency and community involvement. Watch us iterate, learn from our process,
> and feel free to contribute or provide feedback along the way.

Welcome to Sandworm—the foundation of AuthZed's design.

Sandworm is AuthZed's unified design system, quietly powering everything we build. Like the sandworms of Arrakis, it's always there—just beneath the surface—providing the structure and resources we need to create cohesive, scalable, and user-friendly experiences.

Whether you're designing something new or enhancing an existing feature, Sandworm ensures consistency and simplicity every step of the way. It's a living, evolving system, adapting to meet our needs while staying true to the core of what makes AuthZed, AuthZed.

Explore Sandworm, and build with confidence knowing it's always there to support you.

<div align="center">

![Tech Stack](https://skillicons.dev/icons?i=ts,next,tailwind)

</div>

## ✨ Features

- 🚀 Lightning-fast performance with Next.js 13+ App Router
- 🎭 Dark mode support out of the box
- 🧩 Modern, accessible UI components powered by shadcn/ui
- 📱 Fully responsive design
- 🛠 Type-safe development with TypeScript
- 🎯 Utility-first CSS with Tailwind
- 🔍 SEO optimized

## 🚀 Quick Start

```bash
# Clone the monorepo
git clone https://github.com/authzed/design.git
cd design

# Install dependencies
pnpm install

# Start the dev server
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the guidelines in action.

## 🏗 Project Structure

```
📦 design
├── 🚪 app                 # Next.js app router pages
├── 🧩 components         # Reusable UI components
├── ⚙️ config            # Site configuration
├── 🛠 lib               # Utility functions
├── 🌍 public            # Static assets
└── 🎣 hooks             # Custom React hooks
```

## 🛠 Development

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

## 📦 Tech Stack

- [Next.js 13+](https://nextjs.org/) – Framework
- [TypeScript](https://www.typescriptlang.org/) – Language
- [Tailwind](https://tailwindcss.com/) – CSS
- [shadcn/ui](https://ui.shadcn.com/) – UI Components
- [ESLint](https://eslint.org/) – Linting
- [Prettier](https://prettier.io/) – Code Formatting

## 🚀 Deployment

### Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fauthzed%2Fdesign&root-directory=sandworm)

Once deployed, we can update this section with the deployment status badge.

### Manual Deployment

1. Fork the repository
2. Connect your Vercel account
3. Import the project
4. Configure the deployment:
   - Root Directory: `sandworm`
   - Framework Preset: Next.js
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `.next` (auto-detected)

The deployment will be configured automatically using the `vercel.json` file in this directory.

## 📝 License

Apache License 2.0 - See [LICENSE](https://github.com/authzed/design/blob/main/LICENSE) for more details.

---

<div align="center">

Made with ❤️ by the [AuthZed](https://authzed.com) team

</div>
