import React from 'react';

interface NeonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  fullWidth?: boolean;
}

const NeonButton: React.FC<NeonButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "relative overflow-hidden font-bold transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-black border-2 border-neonRed text-neonRed shadow-[0_0_10px_#FF003C] hover:bg-neonRed hover:text-white hover:shadow-[0_0_30px_#FF003C]",
    secondary: "bg-black border-2 border-neonBlue text-neonBlue shadow-[0_0_10px_#04D9FF] hover:bg-neonBlue hover:text-black hover:shadow-[0_0_30px_#04D9FF]",
    danger: "bg-black border-2 border-neonPurple text-neonPurple shadow-[0_0_10px_#BC13FE] hover:bg-neonPurple hover:text-white hover:shadow-[0_0_30px_#BC13FE]"
  };

  const widthClass = fullWidth ? "w-full py-4 text-xl tracking-widest uppercase" : "px-6 py-2";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`} 
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
      {/* Glow effect overlay */}
      <div className="absolute inset-0 z-0 bg-white opacity-0 hover:opacity-10 transition-opacity duration-300"></div>
    </button>
  );
};

export default NeonButton;
