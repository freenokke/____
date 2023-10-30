export const capitalLetter = (name: string): string => {
  let processedName = name;
  return processedName[0].toUpperCase() + processedName.slice(1)
}