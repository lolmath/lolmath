import { tv } from "../utilities/tv";

const divider = tv({
  base: "h-px grow border-0 bg-gradient-to-r",
  variants: {
    preset: {
      left: "to-lol-gold-600 from-transparent",
      right: "from-lol-gold-600 to-transparent",
      center: "via-lol-gold-600 from-transparent to-transparent",
    },
  },
});

interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  preset?: keyof typeof divider.variants.preset;
  hrProps?: React.HTMLAttributes<HTMLHRElement>;
}
export function Divider({ preset = "center", hrProps, ...rest }: DividerProps) {
  return (
    <div className="flex items-center" {...rest}>
      {preset === "right" && (
        <div className="border-lol-gold-600 h-[5px] w-[5px] rotate-45 border" />
      )}
      <hr
        {...hrProps}
        className={divider({ preset, className: hrProps?.className })}
      />
      {preset === "left" && (
        <div className="border-lol-gold-600 h-[5px] w-[5px] rotate-45 border" />
      )}
    </div>
  );
}
