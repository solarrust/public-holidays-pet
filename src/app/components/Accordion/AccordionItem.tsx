import React from 'react';

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  defaultChecked?: boolean;
}

export default function AccordionItem({ title, children, defaultChecked }: AccordionItemProps) {
  return (
    <div className="collapse collapse-arrow join-item border-base-300 border">
      <input type="radio" name="my-accordion-4" defaultChecked={defaultChecked} />
      <div className="collapse-title text-xl font-medium">{title}</div>
      {children}
    </div>
  );
}
