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
import { resolveClassName } from "../utilities/resolve-class-name";

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

export function TabList<T extends object>({
  className,
  ...rest
}: TabListProps<T>) {
  return (
    <AriaTabList<T>
      {...rest}
      className={(values) =>
        twMerge("-ml-4 flex gap-0", resolveClassName(className, values))
      }
    />
  );
}

export function Tab({ children, className, ...rest }: TabProps) {
  const { id } = useTabsContext();
  return (
    <AriaTab
      {...rest}
      className={(values) =>
        twMerge(
          "font-beaufort text-lol-gold-300 relative cursor-pointer select-none px-4 py-1 text-xs font-medium uppercase tracking-widest",
          (values.isSelected || values.isHovered) && "text-lol-gold-50",
          values.isPressed && "text-lol-gold-500",
          values.isDisabled && "text-lol-grey-500 cursor-default",
          "focus-visible:outline-lol-gold-100 focus:outline-none focus-visible:outline-1 focus-visible:outline-offset-4",
          resolveClassName(className, values),
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
                "via-lol-gold-200 absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent to-transparent",
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
