export const useGenerateId = (): { generateId: () => string } => {
  const generateId = (): string => {
    return `${Math.floor(Date.now() / 1000)}`;
  }
  
  return { generateId };
}