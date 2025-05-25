export function FooterLogo() {
  return (
    <div className="flex items-center justify-center py-2">
      <a href="#home" className="flex items-center">
        <div className="relative">
          <div className="absolute -inset-1"></div>
          <img 
            src="/images/footer-logo.png" 
            alt="Sugar Shane Logo" 
            className="h-32 w-auto relative filter drop-shadow-glow" 
          />
        </div>
      </a>
    </div>
  );
}

// Add styles to your global CSS
const styles = `
.drop-shadow-glow {
  filter: drop-shadow(0 0 8px rgba(212, 175, 55, 0.3));
}
`;