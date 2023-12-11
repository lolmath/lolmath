import { tv } from "../utilities/tv";

const divider = tv({
  base: "h-px grow bg-gradient-to-r border-0",
  variants: {
    preset: {
      left: "to-lol-gold-600 from-transparent",
      right: "from-lol-gold-600 to-transparent",
      center: "via-lol-gold-600 from-transparent to-transparent",
    },
  },
});

interface DividerProps {
  preset?: keyof typeof divider.variants.preset;
}
export function Divider({ preset = "center" }: DividerProps) {
  return (
    <div className="flex items-center">
      {preset === "right" && (
        <div className="border-lol-gold-600 h-[5px] w-[5px] rotate-45 border" />
      )}
      <hr className={divider({ preset })} />
      {preset === "left" && (
        <div className="border-lol-gold-600 h-[5px] w-[5px] rotate-45 border" />
      )}
    </div>
  );
}
