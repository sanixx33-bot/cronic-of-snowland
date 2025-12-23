
export interface CustomSkill {
  name: string;
  dice: string;
  damageType: string;
  description: string;
}

export interface Race {
  id: string;
  name: string;
  description: string;
  appearance: string;
  culture: string;
  abilities: { name: string; desc: string }[];
  ageRange: string;
  holidayAttitude: string;
}

export interface Class {
  id: string;
  name: string;
  role: 'tank' | 'dps' | 'support' | 'control';
  playstyle: string;
  startingSkills: { name: string; desc: string }[];
  mechanic: string;
  progression: string;
}

export interface Artifact {
  id: string;
  name: string;
  description: string;
  effect: string;
  limitations: string;
  worldImpact: string;
}

export interface Monster {
  id: string;
  name: string;
  threatLevel: number;
  category: 'minor' | 'pack' | 'elite' | 'miniboss' | 'boss' | 'legend';
  description: string;
  behavior: string;
  abilities: string[];
  role: string;
}

export interface Synergy {
  raceId: string;
  classId: string;
  newName: string;
  bonusStats: Record<string, number>;
  specialSkill: string;
  description: string;
}

export interface Character {
  name: string;
  raceId: string;
  classId: string;
  age: string;
  height: string;
  appearance: string;
  backstory: string;
  traits: string;
  fears: string;
  desires: string;
  holidayAttitude: string;
  stats: {
    str: number;
    dex: number;
    con: number;
    int: number;
    wis: number;
    cha: number;
  };
  inventory: string[];
  artifacts: string[];
  customSkills: CustomSkill[];
}
