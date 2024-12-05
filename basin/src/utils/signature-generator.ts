import { SignatureConfig } from '@/core/types/signature';
import DOMPurify from 'dompurify';

export class SignatureGenerationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SignatureGenerationError';
  }
}

export async function generateSignatureHtml(config: SignatureConfig): Promise<string> {
  try {
    if (!config) {
      throw new SignatureGenerationError('Signature configuration is required');
    }

    const { personalInfo, design, layout } = config;

    if (!personalInfo || !design || !layout) {
      throw new SignatureGenerationError('Invalid signature configuration: missing required fields');
    }

    // Basic validation of required fields
    const requiredFields = ['name', 'title', 'email'];
    for (const field of requiredFields) {
      if (!personalInfo[field as keyof typeof personalInfo]) {
        throw new SignatureGenerationError(`Missing required field: ${field}`);
      }
    }

    // Generate the base HTML structure
    let html = `
      <div style="
        font-family: ${design.fontFamily || 'Arial, sans-serif'};
        color: ${design.textColor || '#000000'};
        font-size: ${design.fontSize || '14px'};
        line-height: 1.4;
        ${layout.type === 'horizontal' ? 'display: flex; align-items: center; gap: 20px;' : ''}
      ">
    `;

    // Add profile image if available
    if (personalInfo.profileImage) {
      html += `
        <div style="
          ${layout.type === 'vertical' ? 'margin-bottom: 10px;' : ''}
          ${layout.type === 'compact' ? 'display: inline-block; margin-right: 10px;' : ''}
        ">
          <img 
            src="${DOMPurify.sanitize(personalInfo.profileImage)}" 
            alt="${DOMPurify.sanitize(personalInfo.name)}"
            style="
              width: ${design.imageSize || '80px'};
              height: ${design.imageSize || '80px'};
              border-radius: ${design.imageStyle === 'round' ? '50%' : '4px'};
              object-fit: cover;
            "
          />
        </div>
      `;
    }

    // Add personal information
    html += `
      <div>
        <div style="font-weight: bold; font-size: 1.1em;">
          ${DOMPurify.sanitize(personalInfo.name)}
        </div>
        <div style="color: ${design.accentColor || '#666666'};">
          ${DOMPurify.sanitize(personalInfo.title)}
        </div>
        <div>
          <a href="mailto:${DOMPurify.sanitize(personalInfo.email)}" style="color: ${design.linkColor || '#0066cc'}; text-decoration: none;">
            ${DOMPurify.sanitize(personalInfo.email)}
          </a>
        </div>
        ${personalInfo.phone ? `
          <div>
            <a href="tel:${DOMPurify.sanitize(personalInfo.phone)}" style="color: ${design.linkColor || '#0066cc'}; text-decoration: none;">
              ${DOMPurify.sanitize(personalInfo.phone)}
            </a>
          </div>
        ` : ''}
        ${personalInfo.website ? `
          <div>
            <a href="${DOMPurify.sanitize(personalInfo.website)}" style="color: ${design.linkColor || '#0066cc'}; text-decoration: none;">
              ${DOMPurify.sanitize(personalInfo.website)}
            </a>
          </div>
        ` : ''}
      </div>
    `;

    html += '</div>';

    // Sanitize the final HTML
    return DOMPurify.sanitize(html);
  } catch (error) {
    if (error instanceof SignatureGenerationError) {
      throw error;
    }
    throw new SignatureGenerationError(
      error instanceof Error ? error.message : 'An unexpected error occurred while generating the signature'
    );
  }
}
