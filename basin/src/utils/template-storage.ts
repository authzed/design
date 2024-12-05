import { SignatureTemplate } from '@/core/types/signature';

// In-memory storage for now, can be replaced with Firebase or other storage
const templates: SignatureTemplate[] = [];

let nextId = 1;

export async function saveTemplate(template: Omit<SignatureTemplate, 'id'>): Promise<void> {
  const newTemplate: SignatureTemplate = {
    ...template,
    id: String(nextId++),
  };
  templates.push(newTemplate);
}

export async function getTemplates(): Promise<SignatureTemplate[]> {
  return [...templates];
}

export async function deleteTemplate(id: string): Promise<void> {
  const index = templates.findIndex(t => t.id === id);
  if (index !== -1) {
    templates.splice(index, 1);
  }
}
