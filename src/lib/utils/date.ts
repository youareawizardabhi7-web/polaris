/**
 * Reusable Date Utilities for POLARIS Portal
 */

export const getCurrentYear = (): number => {
  return new Date().getFullYear();
};

export const parseDateValue = (dateStr: string): number => {
  if (!dateStr) return 0;
  const parsed = new Date(dateStr).getTime();
  return isNaN(parsed) ? 0 : parsed;
};

export const sortByDateDesc = <T>(items: T[], dateKey: keyof T): T[] => {
  return [...items].sort((a, b) => {
    const timeA = parseDateValue(String(a[dateKey] || ''));
    const timeB = parseDateValue(String(b[dateKey] || ''));
    return timeB - timeA;
  });
};

export const formatDateDisplay = (isoString: string): string => {
  if (!isoString) return '';
  const date = new Date(isoString);
  if (isNaN(date.getTime())) return isoString;
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};
