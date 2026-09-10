import React from 'react';

export default function SectionHeading({ badge, title, highlight, subtitle, align = "center", className = "" }) {
  const alignClass = align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <div className={`flex flex-col ${alignClass} mb-12 sm:mb-16 ${className}`}>
      {badge && (
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/25 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse"></span>
          {badge}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
        {title}{" "}
        {highlight && (
          <span className="text-gradient font-black">{highlight}</span>
        )}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
