
// Helper functions to categorize body parts
export function isMusculoskeletal(bodyPart: string): boolean {
  const muscularParts = ['muscle', 'tendon', 'ligament'];
  return muscularParts.some(part => bodyPart.toLowerCase().includes(part));
}

export function isSkeletal(bodyPart: string): boolean {
  const skeletalParts = ['bone', 'joint', 'spine', 'skull', 'rib'];
  return skeletalParts.some(part => bodyPart.toLowerCase().includes(part));
}

export function isOrgan(bodyPart: string): boolean {
  const organParts = ['heart', 'liver', 'kidney', 'lung', 'pancreas', 'thyroid', 'brain'];
  return organParts.some(part => bodyPart.toLowerCase().includes(part));
}

export function isVascular(bodyPart: string): boolean {
  const vascularParts = ['blood', 'vessel', 'artery', 'vein'];
  return vascularParts.some(part => bodyPart.toLowerCase().includes(part));
}

export function isNervous(bodyPart: string): boolean {
  const nervousParts = ['nerve', 'brain', 'spinal'];
  return nervousParts.some(part => bodyPart.toLowerCase().includes(part));
}

export function isSkin(bodyPart: string): boolean {
  const skinParts = ['skin', 'dermal'];
  return skinParts.some(part => bodyPart.toLowerCase().includes(part));
}
