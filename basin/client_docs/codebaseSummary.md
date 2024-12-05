# Codebase Overview

## Directory Structure

### Core
- `core/app/` - Core application files
  - `App.tsx` - Main application container
  - `App.css` - Core application styles
- `core/types/` - Centralized type definitions
  - `signature.ts` - Core signature-related types and interfaces

### Features
- `features/signature/` - Signature generation feature
  - `SignaturePreview.tsx` - Real-time signature preview
  - `PersonalInfoForm.tsx` - Form for user details
  - `DesignCustomizer.tsx` - Styling controls
  - `LayoutSelector.tsx` - Layout selection component
  - `TemplateGrid.tsx` - Template display grid
  - `TemplateManager.tsx` - Template management UI

### Shared
- `shared/ui/` - Reusable UI components
  - Various shadcn/ui components
- `shared/hooks/` - Custom React hooks
  - `use-toast.ts` - Toast notification hook
- `shared/layouts/` - Layout components
- `shared/styles/` - Shared styles and themes

### Utils
- `utils/` - Utility functions and services
  - `signature-generator.ts` - HTML signature generation
  - `template-storage.ts` - Firebase template persistence
  - `utils.ts` - Common utility functions
  - `firebase.ts` - Firebase configuration
  - `signature-templates.ts` - Template definitions

## Data Flow
1. User inputs personal information via `PersonalInfoForm`
2. Design settings modified through `DesignCustomizer`
3. Changes trigger real-time preview in `SignaturePreview`
4. Templates saved/loaded via `TemplateManager`
5. Final signature exported as email-safe HTML

## State Management
- React state and context for application state
- Form state handled by React Hook Form
- Zod for form validation
- Firebase Firestore for template persistence

## Current Features
- Real-time signature preview
- Personal information form with validation
- Typography customization
- Divider styling options
- Template saving and loading
- Email-safe HTML generation
- Download signature functionality

## Recent Changes
- [2024-01-17] Refactored codebase for AI optimization
  - Implemented feature-based organization
  - Centralized types and utilities
  - Improved component structure
  - Moved core app files to dedicated directory
- [1970-01-01] Implemented Firebase integration
- [1970-01-01] Added email-safe HTML generation
- [1970-01-01] Integrated form validation
- [1970-01-01] Added real-time preview updates
