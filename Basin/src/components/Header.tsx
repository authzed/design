import React from 'react';

interface HeaderProps {
  title: string;
  description: React.ReactNode;
  footnote?: React.ReactNode;
}

export function Header({ title, description, footnote }: HeaderProps) {
  return (
    <div className="mb-16">
      <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 tracking-tight leading-tight">
        {title}
      </h1>
      <div className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
        <div>{description}</div>
        {footnote}
      </div>
    </div>
  );
}