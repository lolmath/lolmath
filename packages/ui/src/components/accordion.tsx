"use client";

import { createContext, useState, useContext } from "react";
import { twMerge } from "tailwind-merge";
import { useCssId } from "../utilities/css-id";
import { startViewTransition } from "../utilities/view-transition";

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
        className={twMerge(
          "bg-lol-blue-950 border-lol-gold-500 border",
          className,
        )}
        style={{
          viewTransitionName: `${id}`,
        }}
      >
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

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
      className={twMerge(
        "text-lol-grey-300 font-beaufort hover:bg-lol-blue-800 active:bg-lol-blue-700 active:text-lol-gold-200 hover:text-lol-grey-100 flex w-full items-center px-5 py-2 text-left font-bold uppercase",
        className,
      )}
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
        className={twMerge(
          "mr-2 inline-block transform text-sm transition-transform",
          item === activeItem && "rotate-90",
        )}
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
      <div className="border-lol-gold-500 border-b last-of-type:border-none">
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
    <div className="bg-lol-blue-900 border-lol-gold-500 font-spiegel text-lol-blue-100 border-t px-5 py-2">
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
