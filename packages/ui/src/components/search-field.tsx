import {
  SearchField as AriaSearchField,
  Input as AriaInput,
  Button as AriaButton,
  type SearchFieldProps as AriaSearchFieldProps,
} from "react-aria-components";
import { borderGradient, borderGradientDisabled } from "../utilities/border";
import { ComponentProps } from "react";
import { resolveClassName } from "../utilities/resolve-class-name";
import { tv } from "../utilities/tv";

const searchFieldBorder = tv({
  base: [
    "flex bg-gradient-to-t p-px outline-none",
    borderGradient,
    "focus-within:from-lol-gold-300 focus-within:via-lol-gold-200 focus-within:to-lol-gold-100",
  ],
  variants: {
    isDisabled: {
      true: borderGradientDisabled,
    },
  },
});

const searchFieldInput = tv({
  base: [
    "bg-lol-grey-hextech-black min-h-full w-full px-3 py-2 pl-6 outline-none",
    "text-lol-gold-100 font-spiegel text-xs font-medium tracking-wide",
  ],
  variants: {
    isDisabled: {
      true: "text-lol-grey-150",
    },

    // TODO: make sure both the background image of the gradient and the search
    // icon are displayed
    // isFocused: {
    //   true: "from-lol-grey-200 via-lol-grey-300 to-lol-grey-300 bg-gradient-to-t",
    // },
  },
});

const searchFieldButton = tv({
  base: "bg-lol-grey-hextech-black text-lol-gold-300 px-4 text-xs font-black",
  variants: {
    isHovered: { true: "text-lol-gold-100" },
    isPressed: { true: "text-lol-gold-600" },
  },
});

export function SearchField({
  inputProps = {},
  borderProps = {},
  children,
  ...props
}: AriaSearchFieldProps & {
  inputProps?: ComponentProps<typeof AriaInput>;
  borderProps?: ComponentProps<"div">;
}) {
  return (
    <AriaSearchField {...props}>
      {(values) => (
        <>
          {typeof children === "function" ? children(values) : children}
          <div
            {...borderProps}
            className={searchFieldBorder({
              ...values,
              className: resolveClassName(borderProps.className, values),
            })}
          >
            <AriaInput
              {...inputProps}
              className={(values) =>
                searchFieldInput({
                  ...values,
                  className: resolveClassName(inputProps.className, values),
                })
              }
              type="text"
              style={{
                backgroundImage:
                  "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAAERElEQVR42uycz0tVQRTH54lamBakLUStQKhEW6V/gC2qhRgRqJURVJj9oBL7oWVBWFj0O/pd2EbJ3ARt2uW6tFUWZkhkiYQVSBZk6esc7rkgkXfm3rkzb957c+CL8Obcc+d+5vcPjESjUWZtdkuxCCwgC8gCsoAsIAvIArKArFlAASzVj/P46KuE+OgFuSvVAJKsqWWgclApaBkoDzSP0n+ARkCDoD5QD6gXNB1XNSiA5YP2graACjz85oAWgrBoN9JvH0GdoBugT4nWB2XThw2BmjhwZrMCenaIYmUnCqAq0ABoDyg9hHjpFAtjVsczIGyut0CPQDkK8ooxu+gdqfEGKAP0GFSvIc/19K6MeAGEpfkQVKGx5lfQO1PjAdB1UGUM+s9KerfRgLDT3OXDfxh0FrSWRqm5oCxQEWgdpb33EQ/fvUkloIifTft/ZtLZNLLkCILBIbsbNCVQaNUEa7FA7G+gFaAxFTNpmRp0WhDOE1AJ9RlTAv7T5FtMf3mGE8xW05oYluwOAb+roA2g7wHeMUEz8MsCvtsFa5s2QLtBaRwfnA81SK6nsP03UiwvS6M8GQEIn6kV6HN20gfKWpRiDXP8alWsDIIELKNFqJc1UxMJyzDWUYGFcZkJgFZz0j/QkiBs66bYXlZuAqBVnPQuRfs40wLgS00AtJyT3qNw3tYjmTctgHI56f0KAfVL5k0LoCxO+heFgMYk8xaz7Y6EtSCAeLPiHIX5XSSZNy2ARjnpxQoBlUjmTQugt5LzJBkrl8ybFkAvOenVivo2dxvEy/pMAMSbiyxlzslG2FZFsbXOwYIAesH4B3nnQJkh5jOTYnoZ5qnXBEA45e/g+ODezD1QJIQ8RigWb7+nQ8USJ2hfgSedkxyfGuZsdqVIwjlPsbxskvLETAGE1fm+gN8B5pxhZQVsVlgrGgV825mi83uZ0j0J+irgV0lrqBrB96WQ72vQZgH/cVCLSTNp1xDOPkFf7D9wAx6PdNpAa5hz/SWNlEe/Ydo78hXdY54P2qoKkMyxj2u3mb+zMVWGTfGSiKOuYx/X9jPnaCfWdhF0yMTVPI4geLr51ABIOOIdMXG74ydoPeiOAZBwQtlkGiC038y5moK1ScWm2S8fvm1hjWwqFpW4sV5EnfdkSE0YYy0BPfDxXCtNRYwDxKgG4UlnIVX5kQAxRujZQor1mTkHiO0+YpwixXSYFy0IPNTDvSI8NsJrwPkzFrQTNBMepO2UZ2z2a8C4/LhLsEQNL1qcCDLM67rrhx/6nCRrWKJ1FLNO8JkWKqTjpjQx1RalAeGmj2eOgc4kCyAXEi51RK/h4d2kN8kEyIWEM/lrAnC2MefmflIBciEdBF0JG06iAHIhNfxnsSoFJ5EAzVzRXwgLjs5hXqcdBv1hziZdp2ywRASE1hxWoIj95ybJ1QdZQBaQBWQBWUAWkDULyAKygPTYXwEGAArW2QJagQgvAAAAAElFTkSuQmCC')",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "5px center",
                backgroundSize: "16px",
              }}
            />
            {values.state.value.length > 0 && !values.isDisabled && (
              <AriaButton
                className={(buttonValues) => searchFieldButton(buttonValues)}
              >
                ✕
              </AriaButton>
            )}
          </div>
        </>
      )}
    </AriaSearchField>
  );
}
