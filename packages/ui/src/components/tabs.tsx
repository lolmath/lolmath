import {
  Tabs as AriaTabs,
  TabList as AriaTabList,
  Tab as AriaTab,
  TabPanel as AriaTabPanel,
  TabsProps,
  TabListProps,
  TabProps,
  TabPanelProps,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";
import { useCssId } from "../utilities/css-id";
import { createContext, useContext } from "react";
import { startViewTransition } from "../utilities/view-transition";

export function Tabs({ onSelectionChange, ...rest }: TabsProps) {
  const id = useCssId();
  return (
    <TabsContext.Provider value={{ id }}>
      <AriaTabs
        {...rest}
        onSelectionChange={(key) => {
          startViewTransition(() => {
            onSelectionChange?.(key);
          });
        }}
      />
    </TabsContext.Provider>
  );
}

export function TabList<T extends object>({ ...rest }: TabListProps<T>) {
  return <AriaTabList<T> {...rest} className={() => "flex gap-0 -ml-4"} />;
}

export function Tab({ children, ...rest }: TabProps) {
  const { id } = useTabsContext();
  return (
    <AriaTab
      {...rest}
      className={(values) =>
        twMerge(
          "font-beaufort text-lol-gold-300 uppercase font-medium text-xs tracking-widest px-4 relative py-1 cursor-pointer select-none",
          (values.isSelected || values.isHovered) && "text-lol-gold-50",
          values.isPressed && "text-lol-gold-500",
          values.isDisabled && "text-lol-gray-500 cursor-default",
        )
      }
    >
      {(values) => (
        <>
          {typeof children === "function" ? children(values) : children}
          {values.isSelected && (
            <div
              style={{
                viewTransitionName: `tab-indicator-${id}`,
              }}
              className={twMerge(
                "h-px bg-gradient-to-r from-transparent via-lol-gold-200 to-transparent absolute bottom-0 w-full left-0",
              )}
            ></div>
          )}
        </>
      )}
    </AriaTab>
  );
}

export function TabPanel({ ...rest }: TabPanelProps) {
  return <AriaTabPanel {...rest} />;
}

const TabsContext = createContext<
  | {
      id: string;
    }
  | undefined
>(undefined);

function useTabsContext() {
  const context = useContext(TabsContext);
  if (context === undefined) {
    throw new Error("useTabsContext must be used within a Tabs");
  }
  return context;
}
