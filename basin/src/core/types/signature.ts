export type WebsafeFont =
  | 'Arial'
  | 'Helvetica'
  | 'Times New Roman'
  | 'Times'
  | 'Courier New'
  | 'Courier'
  | 'Verdana'
  | 'Georgia'
  | 'Palatino'
  | 'Garamond'
  | 'Bookman'
  | 'Tahoma'
  | 'Trebuchet MS';

export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  phoneNumber: string;
  companyWebsite: string;
  ctaUrl: string;
  logoUrl?: string;
}

export interface FontSizes {
  name: number;
  title: number;
  contact: number;
  cta: number;
}

export interface TypographySettings {
  fontFamily: WebsafeFont;
  fontSize: FontSizes;
  color: string;
  fontWeight: 'normal' | 'medium' | 'semibold' | 'bold';
  lineHeight: number;
}

export interface DividerSettings {
  style: 'solid' | 'dashed' | 'dotted';
  color: string;
  thickness: number;
  orientation: 'horizontal' | 'vertical';
}

export type LayoutType = 
  | 'stacked'           // Traditional vertical stack
  | 'horizontal'        // All elements in a row
  | 'logo-left'         // Logo on left, content stacked right
  | 'logo-right'        // Logo on right, content stacked left
  | 'centered'          // Everything centered
  | 'compact'           // Minimal spacing, dense layout
  | 'modern'            // Spacious with modern typography
  | 'classic';          // Traditional business layout

export interface LayoutSettings {
  type: LayoutType;
  spacing: {
    between: number;     // Space between elements
    padding: number;     // Padding around signature
  };
  alignment: 'left' | 'center' | 'right';
  maxWidth?: number;     // Maximum width of signature
  logoSize?: {
    width: number;
    height: number;
  };
}

export interface SignatureConfig {
  personalInfo: PersonalInfo;
  typography: TypographySettings;
  divider: DividerSettings;
  layout: LayoutSettings;
}

export interface SignatureTemplate extends Omit<SignatureConfig, 'personalInfo'> {
  id: string;
  name: string;
  description?: string;
  category: 'modern' | 'classic' | 'minimal' | 'creative';
  preview?: string;     // URL to preview image
}
