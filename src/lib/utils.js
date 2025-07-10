import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combina nombres de clase y utiliza tailwind-merge para resolver conflictos
 * @param {import('clsx').ClassValue[]} inputs
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
