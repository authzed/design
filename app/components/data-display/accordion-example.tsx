"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const accordionItems = [
  {
    title: "What is a design system?",
    content: "A design system is a collection of reusable components, guided by clear standards, that can be assembled together to build any number of applications.",
  },
  {
    title: "How do I get started?",
    content: "Begin by exploring our components and understanding our design principles. You can then start implementing these components in your projects.",
  },
  {
    title: "Can I customize components?",
    content: "Yes, all components are built with customization in mind. You can modify colors, sizes, and other properties using Tailwind CSS classes.",
  },
];

export function AccordionExample() {
  return (
    <Accordion type="single" collapsible className="w-full">
      {accordionItems.map((item, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger>{item.title}</AccordionTrigger>
          <AccordionContent>{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}