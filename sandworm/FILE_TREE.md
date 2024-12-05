# Sandworm Project File Structure

```
sandworm/
├── app/                    # Next.js app directory (main application code)
│   └── globals.css        # Global styles
├── components/            # React components
├── config/               # Configuration files
│   └── logos.ts         # Logo configurations
├── hooks/               # Custom React hooks
├── lib/                 # Library code and utilities
│   └── types.ts        # TypeScript type definitions
├── public/              # Static assets
├── .bolt/              # Bolt-specific files
├── .github/            # GitHub configuration and workflows
├── node_modules/       # Dependencies
├── out/                # Build output directory
│
# Configuration Files
├── .eslintrc.json     # ESLint configuration
├── .gitignore         # Git ignore rules
├── components.json    # Component configuration
├── next.config.js     # Next.js configuration
├── package.json       # Project dependencies and scripts
├── postcss.config.js  # PostCSS configuration
├── tailwind.config.js # Tailwind CSS configuration
├── tailwind.config.ts # Tailwind CSS TypeScript configuration
├── tsconfig.json      # TypeScript configuration
└── next-env.d.ts      # Next.js TypeScript declarations

# Other Files
├── deploy.sh          # Deployment script
└── README.md         # Project documentation

## Key Directories

- **app/**: Contains the main application code using Next.js App Router
- **components/**: Reusable React components
- **config/**: Configuration files for various aspects of the application
- **hooks/**: Custom React hooks for shared functionality
- **lib/**: Utility functions, types, and shared code
- **public/**: Static assets like images, fonts, etc.

## Important Configuration Files

- **next.config.js**: Next.js framework configuration
- **tailwind.config.js/ts**: Tailwind CSS styling configuration
- **tsconfig.json**: TypeScript compiler configuration
- **package.json**: Project dependencies and scripts

This structure follows a typical Next.js application layout with TypeScript and Tailwind CSS integration.

## Logo Directory Structure

```
public/logos/
├── Authzed/           # Authzed brand logos
├── Logomark/         # Individual logomark assets
├── SpiceDB/          # SpiceDB-specific logos
└── Stacked/          # Stacked logo variations for compact spaces
```

### Logo Variations

The `logos` directory contains different variations of our brand assets:

- **Authzed/**: Main brand logos for Authzed
- **Logomark/**: Standalone logomark elements that can be used independently
- **SpiceDB/**: Logos specific to the SpiceDB product
- **Stacked/**: Compact, stacked logo variations optimized for spaces with limited horizontal real estate (e.g., competitor landscapes, mobile views)
