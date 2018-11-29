export const navbarOptions = [
  {
    id: 1,
    routing: 'animaltracking',
    name: 'Animal Tracking',
    icon: './assets/images/dashboard/animal-tracking.svg',
    description:
      'Animal Dashboard - Create and view animals present in the warehouse',
    role: ['Admin', 'Execution', 'Management']
  },
  // { id: 2, routing: 'warehouse', name: 'Warehouse' },
  {
    id: 3,
    routing: 'announcements',
    name: 'Ethical',
    icon: './assets/images/dashboard/announcement.svg',
    description: 'Ethicals - Create and view Ethicals',
    role: ['Admin', 'Execution']
  },
  {
    id: 9,
    routing: 'protocol',
    name: 'Protocols To Ethical',
    icon: './assets/images/dashboard/announcement.svg',
    description: 'Create & Edit Protocols on Ethicals and view them',
    role: ['Admin', 'Execution']
  },
  {
    id: 2,
    routing: 'projects',
    name: 'Projects',
    icon: './assets/images/dashboard/project-icon.svg',
    description: 'Projects - Create and view Projects',
    role: ['Admin', 'Execution']
  },
  {
    id: 4,
    routing: 'approveannouncements',
    name: 'Approve Ethical',
    icon: './assets/images/dashboard/approve-announcement.svg',
    description:
      'Approve Ethicals - This screen helps in viewing and approving Ethicals',
    role: ['Admin', 'Management']
  },
  {
    id: 5,
    routing: 'user/management',
    name: 'User Management',
    icon: './assets/images/dashboard/user-management.svg',
    description:
      'User Management - Create by adding Roles to a user & view Users of this Application',
    role: ['Admin']
  },
  {
    id: 6,
    routing: 'masterconfiguration',
    name: 'Master Configuration',
    icon: './assets/images/dashboard/master-configuration.svg',
    description:
      'Master Configuration - Configure required data into this application & view them in multiple tabs',
    role: ['Admin', 'Execution']
  },
  {
    id: 7,
    routing: 'study',
    name: 'Study',
    icon: './assets/images/dashboard/study-icon.svg',
    description: 'Studies - Create and view Studies',
    role: ['Admin', 'Execution']
  },
  {
    id: 8,
    routing: 'resources',
    name: 'Resources',
    icon: './assets/images/dashboard/study-icon.svg',
    description: 'Resources - Create resources & view them in multiple tabs',
    role: ['Admin']
  },
  {
    id: 10,
    routing: '',
    name: 'Help',
    icon: './assets/images/dashboard/help.svg',
    description:
      'This screen helps in understanding the application - currently in development',
    role: ['Admin', 'Execution', 'Management']
  }
];
