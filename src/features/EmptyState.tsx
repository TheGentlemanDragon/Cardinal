import React from "preact/compat";

type Props = {
  children: React.ReactNode;
  title: string;
};

export const EmptyState = ({ children, title }: Props) => (
  <div class="hero min-h-72 col-span-3 bg-base-200">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <h1 class="text-4xl font-bold">{title}</h1>
        <p class="py-6">{children}</p>
      </div>
    </div>
  </div>
);
