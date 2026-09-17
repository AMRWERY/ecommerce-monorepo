export interface MenuItem {
  title: string;
  to?: string;
  icon?: string;
  badge?: string | number;
  badgeClass?: string;
  children?: {
    title: string;
    to: string;
  }[];
}

export const useAdminLayout = () => {
  const isSidebarCollapsed = useState<boolean>("admin-sidebar-collapsed", () => false);
  const isMobileSidebarOpen = useState<boolean>("admin-mobile-sidebar-open", () => false);
  const unreadMessages = useState<number>("admin-unread-messages", () => 2);
  const unreadNotifications = useState<number>("admin-unread-notifications", () => 4);

  const activeStore = useState("admin-active-store", () => ({
    name: "Kanky Store",
    type: "Company",
  }));

  const userProfile = useState("admin-user-profile", () => ({
    name: "Guy Hawkins",
    role: "Admin",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&h=120&q=80",
  }));

  const toggleSidebarCollapse = () => {
    isSidebarCollapsed.value = !isSidebarCollapsed.value;
  };

  const toggleMobileSidebar = () => {
    isMobileSidebarOpen.value = !isMobileSidebarOpen.value;
  };

  const closeMobileSidebar = () => {
    isMobileSidebarOpen.value = false;
  };

  return {
    isSidebarCollapsed,
    isMobileSidebarOpen,
    unreadMessages,
    unreadNotifications,
    activeStore,
    userProfile,
    toggleSidebarCollapse,
    toggleMobileSidebar,
    closeMobileSidebar,
  };
};
