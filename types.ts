export interface Kanji {
  kanji: string;
  onyomi: string;
  kunyomi: string;
  meaning_jp: string;
  meaning_en: string;
  meaning_bn: string;
  strokes: number;
  examples: string[];
  related?: string[];
  category: string;
}

export interface Category {
  id: string;
  name: string;
  name_jp: string;
}

export enum ViewMode {
  GRID = 'GRID',
  LIST = 'LIST',
  STATS = 'STATS'
}