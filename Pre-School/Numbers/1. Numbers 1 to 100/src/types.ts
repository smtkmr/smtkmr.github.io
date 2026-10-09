export interface ColorTheme {
  id: string;
  name: string;
  frontStart: string;
  frontEnd: string;
  side3d: string;
}

export type OverwritePattern =
  | '1-simple'
  | '1-slant-cap'
  | '1-base'
  | '1-fancy'
  | '1-pair'
  | '1-trio'
  | 'ONE-upper'
  | 'one-lower'
  | '1-and-ONE'
  | '1-and-one'
  | 'number-single'
  | 'number-pair'
  | 'number-trio'
  | 'number-word-upper'
  | 'number-word-lower'
  | 'number-and-word'
  | string;

export type ObjectType =
  | 'apple'
  | 'sun'
  | 'milk'
  | 'heart'
  | 'nose'
  | 'banana'
  | 'carrot'
  | 'toothbrush'
  | 'salad'
  | 'moon'
  | 'earth'
  | 'finger'
  | 'broccoli'
  | 'orange'
  | 'water'
  | 'soup'
  | 'trophy'
  | 'two-bananas'
  | 'three-strawberries';

export interface FrameItem {
  id: ObjectType;
  titleEn: string;
  titleHi: string;
  speakEn: string;
  speakHi: string;
  bg: string;
  border: string;
}

export interface GameCardItem {
  id: number;
  objectType: ObjectType;
  count: number;
  isTarget: boolean;
  labelEn: string;
  labelHi: string;
  solved: boolean;
  wrong: boolean;
}

export interface BigObjectItem {
  id: ObjectType;
  word: string;
  hiName: string;
  speakEn: string;
  speakHi: string;
  bg: string;
  border: string;
  funFact: string;
}

export interface StudioItem {
  id: string;
  pattern: OverwritePattern;
  label: string;
  labelHi: string;
  speak: string;
}

export interface TaskItem {
  num: number;
  title: string;
  prompt: string;
  pattern: OverwritePattern;
  objectType: ObjectType;
  objectName: string;
  objectNameHi: string;
  objectDescHi: string;
  themeIdx: number;
  speak: string;
  hint: string;
}
