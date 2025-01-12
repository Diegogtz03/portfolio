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
