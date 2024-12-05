# Style and Design Guidelines

## Color Scheme
```css
:root {
  --background: 0 0% 100%;
  --foreground: 0 0% 3.9%;
  --card: 0 0% 100%;
  --card-foreground: 0 0% 3.9%;
  --popover: 0 0% 100%;
  --popover-foreground: 0 0% 3.9%;
  --primary: 0 0% 9%;
  --primary-foreground: 0 0% 98%;
  --secondary: 0 0% 96.1%;
  --secondary-foreground: 0 0% 9%;
  --muted: 0 0% 96.1%;
  --muted-foreground: 0 0% 45.1%;
  --accent: 0 0% 96.1%;
  --accent-foreground: 0 0% 9%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 0 0% 98%;
}
```

## Typography
- Font Family: Inter, system-ui, sans-serif
- Base Font Size: 14px
- Line Height: 1.5
- Font Weights: normal, medium, semibold, bold

## Component Styling
### Cards
- Rounded corners (0.5rem)
- Subtle shadows
- White background
- Consistent padding

### Forms
- Clear labels
- Visible focus states
- Error state highlighting
- Consistent spacing

### Buttons
- Clear hover states
- Consistent padding
- Icon alignment
- Multiple variants (primary, secondary, ghost)

## Layout
- Responsive grid system
- Consistent spacing scale
- Mobile-first approach
- Maximum content width constraints

## Accessibility
- WCAG 2.1 compliant color contrast
- Focus visible states
- Semantic HTML structure
- Screen reader friendly

## Email Output Styling
- Email-safe fonts
- Inline CSS
- Table-based layouts when needed
- Cross-client compatible colors