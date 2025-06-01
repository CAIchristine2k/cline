// Navigation utility functions

export function scrollToSection(sectionId: string) {
  // Remove the # if it exists
  const id = sectionId.replace('#', '');
  const element = document.getElementById(id);

  if (element) {
    // Get header height for proper offset
    const header = document.querySelector('header');
    const headerHeight = header ? header.offsetHeight : 80;

    // Calculate the position with offset
    const elementPosition =
      element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - headerHeight - 20; // Extra 20px padding

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  }
}

export function handleNavigationClick(
  href: string,
  currentPath: string = window.location.pathname,
) {
  // If it's a hash link and we're on the homepage, scroll to section
  if (href.startsWith('#') && currentPath === '/') {
    scrollToSection(href);
    return true; // Indicates we handled the navigation
  }

  // If it's a hash link but we're not on homepage, redirect to homepage with hash
  if (href.startsWith('#') && currentPath !== '/') {
    window.location.href = `/${href}`;
    return true;
  }

  return false; // Let the router handle it
}
