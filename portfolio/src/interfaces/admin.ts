export interface PictureData {
  name: string;
  image: File;
  alt: string;
  order: number;
}

export interface PictureDataList {
  pictures: PictureData[];
}

export interface SkillData {
  id: string;
  name: string;
  url: string;
  highlighted: boolean;
  is_hobbie: boolean;
  is_language: boolean;
}

export interface SkillDataList {
  skills: SkillData[];
}
