
# Styles Directory Structure

This directory contains all the CSS styles for the application, organized in a modular and maintainable way. The styles are separated into different categories to make them easier to maintain and update.

## Main Structure

- `main.css` - The entry point that imports all other CSS files
- `base.css` - Basic styling and CSS reset
- `utilities.css` - Utility classes for common styling patterns
- `components.css` - Component-specific styles
- `animations.css` - Animation definitions and keyframes

## Responsive Styles

The `responsive` directory contains styles that handle the responsive behavior of components across different screen sizes:

- `layout.css` - Grid layouts and page structure responsiveness
- `cards.css` - Card component responsive styles (imports all card-related styles)
- `exercise-page.css` - Exercise page specific responsive styles
- `anatomy.css` & `anatomy-components.css` - Anatomy visualization responsive styles
- `buttons.css` - Button component responsive styles
- `elements.css` - Basic HTML elements responsive styles
- `tabs.css` - Tab component responsive styles
- `hotspots.css` - Interactive hotspots on anatomy models

### Card Styles Structure

Card styles are further organized into:

- `card-base.css` - Base card styles for all card components
- `exercise-cards.css` - Exercise-specific card styles
- `biomarker-cards.css` - Biomarker-specific card styles
- `metric-cards.css` - Metric and statistics card styles
- `motion-cards.css` - Motion tracking cards styles

## Motion Tracking Styles

The motion tracking styles have been optimized and split into focused files:

### Motion Tracking Structure

- `motion-tracker.css` - Main import file for all motion-tracking related styles
- `motion-layout.css` - Grid and layout structure for motion tracking components
- `motion-cards.css` - Card styles specific to motion analysis features
- `motion-metrics.css` - Statistical metrics display for motion tracking
- `camera-styles.css` - Camera view and video feed styling

### Purpose of Each Motion Tracking File

- **motion-tracker.css**: Acts as an entry point that imports all motion tracking related styles. No actual styles are defined here, it just centralizes the imports.

- **motion-layout.css**: Contains responsive grid layouts for the motion tracking components, including:
  - Media queries for different screen sizes
  - Grid template definitions
  - Container padding and spacing
  - Layout adjustments for different viewport widths

- **motion-cards.css**: Styles for card components in the motion tracking interface:
  - Card shadows and hover effects
  - Header and content styling
  - Card separators
  - Interactive card behaviors
  - Instruction cards format

- **motion-metrics.css**: Styles related to metric and statistics display:
  - Stat cards styling
  - Value and label typography
  - Grid layouts for stat groupings
  - Responsive adjustments for stat cards

- **camera-styles.css**: Camera and video feed specific styles:
  - Camera container dimensions and positioning
  - Aspect ratio handling
  - Active tracking indicators
  - Animation for tracking indicators

## Card Styling System

Our card system is built on a hierarchy of styles:

1. **Base styles** (`card-base.css`): Define the fundamental structure of cards.
2. **Variant styles** (`cards/variants.css`): Different visual styles that can be applied.
3. **Specialized cards** (`cards/specialized.css`): Styles for specific functional cards.
4. **Utility extensions** (`cards/utilities.css`): Helper classes for card layout and behaviors.

## Best Practices

- Keep related styles together in their specific files
- Avoid long CSS files; split them into logical focused modules
- Use media queries for responsive design
- Keep the specificity of selectors as low as possible
- Use consistent naming conventions

## Maintenance Notes

When adding new features:

1. Determine if styles fit into an existing category
2. If not, create a new file for the specific component type
3. Update `main.css` to import the new file
4. Document the purpose of new files in this README

For complex components with many style variations, consider creating a subdirectory within `responsive/` to group related style files.
