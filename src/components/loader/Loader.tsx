import React from "react";

interface LoaderProps {
  size?: "sm" | "md" | "lg"; // control loader size
  fullHeight?: boolean; // fill parent container height
}

const Loader: React.FC<LoaderProps> = ({ size = "md", fullHeight = false }) => {
  const sizeClasses = {
    sm: "w-6 h-6 border-2",
    md: "w-12 h-12 border-4",
    lg: "w-16 h-16 border-4",
  };

  return (
    <div
      className={`flex justify-center items-center ${
        fullHeight ? "h-full" : "h-40"
      }`}
    >
      <div
        className={`${sizeClasses[size]} border-t-[color:var(--color-primary)] border-r-transparent border-b-[color:var(--color-primary)] border-l-transparent rounded-full animate-spin`}
      />
    </div>
  );
};

export default Loader;
