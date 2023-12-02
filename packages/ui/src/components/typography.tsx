import { ReactNode } from "react";

interface BodyProps {
  children: ReactNode;
}

export function Body({ children }: BodyProps) {
  return (
    <p className="font-spiegel text-lol-grey-100 text-lol-body leading-lol-body tracking-wide [&:not(:first-child)]:mt-6">
      {children}
    </p>
  );
}

interface BlockquoteProps {
  children: ReactNode;
}

export function Blockquote({ children }: BlockquoteProps) {
  return (
    <blockquote className="text-lol-grey-100 mt-6 border-l-2 pl-6 italic">
      {children}
    </blockquote>
  );
}

interface InlineCodeProps {
  children: ReactNode;
}

export function InlineCode({ children }: InlineCodeProps) {
  return (
    <code className="text-lol-grey-100 bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
      {children}
    </code>
  );
}

interface LeadProps {
  children: ReactNode;
}

export function Lead({ children }: LeadProps) {
  return (
    <p className="text-lol-grey-100 text-muted-foreground text-xl">
      {children}
    </p>
  );
}

interface LargeProps {
  children: ReactNode;
}

export function Large({ children }: LargeProps) {
  return (
    <div className="text-lol-grey-100 text-lg font-semibold">{children}</div>
  );
}

interface SmallProps {
  children: ReactNode;
}

export function Small({ children }: SmallProps) {
  return (
    <small className="text-lol-grey-100 text-sm font-medium leading-none">
      {children}
    </small>
  );
}

interface MutedProps {
  children: ReactNode;
}

export function Muted({ children }: MutedProps) {
  return (
    <p className="text-lol-grey-100 text-sm font-medium leading-none">
      {children}
    </p>
  );
}
