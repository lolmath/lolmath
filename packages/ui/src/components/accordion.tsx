"use client";

import { createContext, useState, useContext } from "react";
import { useCssId } from "../utilities/css-id";
import { startViewTransition } from "../utilities/view-transition";
import { tv } from "../utilities/tv";

interface AccordionProps {
  children: React.ReactNode;
  className?: string;
}
export function Accordion({ children, className }: AccordionProps) {
  const [activeItem, setActiveItem] = useState<string>("");
  const id = useCssId();

  return (
    <AccordionContext.Provider
      value={{
        activeItem,
        setActiveItem,
        id,
      }}
    >
      <div
        className={className}
        style={{
          viewTransitionName: `${id}`,
        }}
      >
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

export const accordionTrigger = tv({
  base: "text-lol-grey-100 font-beaufort active:text-lol-gold-100 hover:text-lol-gold-100 flex w-full items-center py-2 text-left font-bold uppercase",
});

export const accordionTriggerInner = tv({
  base: "ml-0.5 mr-2 inline-block rotate-90 transform text-xs",
});

interface AccordionTriggerProps {
  children: React.ReactNode;
  className?: string;
}
export function AccordionTrigger({
  children,
  className,
}: AccordionTriggerProps) {
  const { setActiveItem } = useContext(AccordionContext);
  const { item } = useContext(AccordionItemContext);

  return (
    <button
      className={accordionTrigger({
        className,
      })}
      onClick={() => {
        startViewTransition(() => {
          setActiveItem((currentItem) => (currentItem === item ? "" : item));
        });
      }}
    >
      <span className={accordionTriggerInner()}>❯</span>
      {children}
    </button>
  );
}

interface AccordionItemProps {
  children: React.ReactNode;
  value: string;
}
export function AccordionItem({ children, value }: AccordionItemProps) {
  const { id } = useContext(AccordionContext);

  return (
    <AccordionItemContext.Provider
      value={{
        item: value,
      }}
    >
      <div
        className="border-lol-gold-600 border-b last-of-type:border-none"
        style={{
          viewTransitionName: `${id}-${value}`,
        }}
      >
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
}

interface AccordionContentProps {
  children: React.ReactNode;
}
export function AccordionContent({ children }: AccordionContentProps) {
  const { activeItem } = useContext(AccordionContext);
  const { item } = useContext(AccordionItemContext);

  if (activeItem !== item) {
    return null;
  }

  return <div className="font-spiegel text-lol-grey-100 py-2">{children}</div>;
}

const AccordionContext = createContext<{
  activeItem: string;
  setActiveItem: React.Dispatch<React.SetStateAction<string>>;
  id: string;
}>(undefined as any);

const AccordionItemContext = createContext<{
  item: string;
}>(undefined as any);
