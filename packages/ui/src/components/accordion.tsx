"use client";

import { createContext, useState, useContext } from "react";
import { useCssId } from "../utilities/css-id";
import { startViewTransition } from "../utilities/view-transition";
import { tv } from "../utilities/tv";

const accordion = tv({
  base: "bg-lol-blue-950",
});

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
        className={accordion({
          className,
        })}
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
  base: "mr-2 inline-block transform text-sm transition-transform",
  variants: {
    isActive: {
      true: "rotate-90",
    },
  },
});

interface AccordionTriggerProps {
  children: React.ReactNode;
  className?: string;
}
export function AccordionTrigger({
  children,
  className,
}: AccordionTriggerProps) {
  const { setActiveItem, activeItem, id } = useContext(AccordionContext);
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
      style={{
        viewTransitionName: `${id}-${item}`,
      }}
    >
      <span
        className={accordionTriggerInner({
          isActive: item === activeItem,
        })}
      >
        ▶
      </span>
      {children}
    </button>
  );
}

interface AccordionItemProps {
  children: React.ReactNode;
  value: string;
}
export function AccordionItem({ children, value }: AccordionItemProps) {
  return (
    <AccordionItemContext.Provider
      value={{
        item: value,
      }}
    >
      <div className="border-lol-gold-600 border-b last-of-type:border-none">
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

  return (
    <div className="font-spiegel text-lol-grey-100 py-2">
      {children}
    </div>
  );
}

const AccordionContext = createContext<{
  activeItem: string;
  setActiveItem: React.Dispatch<React.SetStateAction<string>>;
  id: string;
}>(undefined as any);

const AccordionItemContext = createContext<{
  item: string;
}>(undefined as any);
