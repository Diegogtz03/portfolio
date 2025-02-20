export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string;
  link: string;
  date: string;
  shown: boolean;
}

export interface SimplifiedProject {
  id: string;
  title: string;
  tags: string;
  date: string;
  shown: boolean;
}

export interface ProjectList {
  projects: Project[];
}

export interface SimplifiedProjectList {
  projects: SimplifiedProject[];
}

export interface ProjectLink {
  name: string;
  link: string;
}

export interface ProjectImage {
  src: string
  width: number
  height: number
  aspect_ratio: string
}


export interface ProjectType {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  tag: string;
  links: ProjectLink[];
  date: string;
  accentColor: string;
  icon: string;
  backdrop: string;
  images: ProjectImage[];
  shown: boolean;
}

export interface SimplifiedProjectType {
  id: string;
  name: string;
  subtitle: string;
  icon: string;
  backdrop: string;
  shown: boolean;
}