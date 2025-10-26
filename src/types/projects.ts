export interface Project {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  image: string;
  images?: string[];
  technologies: string[];
  category: ProjectCategory;
  status: ProjectStatus;
  featured: boolean;
  year: number;
  month: string;
  duration: string;
  teamSize: number;
  role: string;
  challenges: string[];
  achievements: string[];
  features: string[];
  links: ProjectLinks;
  color: string;
  order: number;
}

export interface ProjectCategory {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
}

export interface ProjectLinks {
  live?: string;
  github?: string;
  demo?: string;
  caseStudy?: string;
  figma?: string;
}

export interface ProjectStatus {
  id: string;
  name: string;
  color: string;
  description: string;
}

export interface ProjectsSectionProps {
  projects: Project[];
  categories: ProjectCategory[];
  onProjectSelect: (project: Project) => void;
  onProjectClose: () => void;
  selectedProject?: Project;
}

export interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
  index: number;
}

export interface ProjectModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

export interface ProjectsFilterProps {
  categories: ProjectCategory[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: string;
  onSortChange: (sortBy: string) => void;
}

export interface ProjectsGridProps {
  projects: Project[];
  onProjectSelect: (project: Project) => void;
  loading?: boolean;
}
