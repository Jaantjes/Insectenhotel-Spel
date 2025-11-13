import { PieceType } from '@/types/game';

/**
 * Calculate score for a completed ship
 * 
 * Rules:
 * - First occurrence of each type: 1 point
 * - Each additional same type: +2 points
 * 
 * Examples:
 * - [cheese, butter, egg, tulip] = 4 points (1+1+1+1)
 * - [cheese, cheese, cheese, cheese] = 7 points (1+2+2+2)
 * - [cheese, cheese, egg, egg] = 6 points (1+2+1+2)
 */
export function calculateShipScore(goods: Array<PieceType | null>): number {
  const validGoods = goods.filter(Boolean) as PieceType[];
  
  // Empty ship scores 0
  if (validGoods.length === 0) return 0;
  
  // Count occurrences of each type
  const typeCounts: Partial<Record<PieceType, number>> = {};
  
  for (const good of validGoods) {
    typeCounts[good] = (typeCounts[good] || 0) + 1;
  }
  
  // Calculate score
  let score = 0;
  
  for (const count of Object.values(typeCounts)) {
    if (count === 1) {
      score += 1; // First occurrence
    } else {
      score += 1 + (count - 1) * 2; // First occurrence + extras
    }
  }
  
  return score;
}
