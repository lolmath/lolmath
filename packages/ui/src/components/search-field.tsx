import type { SearchFieldProps as AriaSearchFieldProps } from "react-aria-components";
import {
  SearchField as AriaSearchField,
  Input as AriaInput,
  Button as AriaButton,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";
import { borderClassName } from "../utilities/border";
import { ComponentProps } from "react";

export function SearchField({
  inputProps = {},
  ...props
}: AriaSearchFieldProps & {
  inputProps?: ComponentProps<typeof AriaInput>;
}) {
  return (
    <AriaSearchField
      className={(values) => {
        const finalClassName =
          typeof props.className === "function"
            ? props.className(values)
            : props.className;

        return twMerge(
          "flex flex-col outline-none [webkit-search-cancel-button]:hidden",
          borderClassName,
          "focus-within:from-lol-gold-300 focus-within:via-lol-gold-200 focus-within:to-lol-gold-50",
          props.isDisabled &&
            "from-lol-gray-700 via-lol-gray-700 to-lol-gray-700",
          finalClassName,
        );
      }}
      {...props}
    >
      {({ state }) => (
        <div
          className={twMerge(
            "m-px bg-[#000000] flex flex-row focus-within:from-[#071019] focus-within:to-[#20272c] focus-within:bg-gradient-to-b",
            props.isDisabled && "text-[#5c5b57] bg-[#1e2328]",
          )}
        >
          <AriaInput
            {...inputProps}
            className={(values) => {
              const finalClassName =
                typeof inputProps.className === "function"
                  ? inputProps.className(values)
                  : inputProps.className;

              return twMerge(
                "bg-transparent grow py-2 px-3 text-lol-gold-50 text-xs outline-none font-spiegel tracking-wide",
                finalClassName,
              );
            }}
            type="text"
            style={{
              backgroundImage:
                "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAAERElEQVR42uycz0tVQRTH54lamBakLUStQKhEW6V/gC2qhRgRqJURVJj9oBL7oWVBWFj0O/pd2EbJ3ARt2uW6tFUWZkhkiYQVSBZk6esc7rkgkXfm3rkzb957c+CL8Obcc+d+5vcPjESjUWZtdkuxCCwgC8gCsoAsIAvIArKArFlAASzVj/P46KuE+OgFuSvVAJKsqWWgclApaBkoDzSP0n+ARkCDoD5QD6gXNB1XNSiA5YP2graACjz85oAWgrBoN9JvH0GdoBugT4nWB2XThw2BmjhwZrMCenaIYmUnCqAq0ABoDyg9hHjpFAtjVsczIGyut0CPQDkK8ooxu+gdqfEGKAP0GFSvIc/19K6MeAGEpfkQVKGx5lfQO1PjAdB1UGUM+s9KerfRgLDT3OXDfxh0FrSWRqm5oCxQEWgdpb33EQ/fvUkloIifTft/ZtLZNLLkCILBIbsbNCVQaNUEa7FA7G+gFaAxFTNpmRp0WhDOE1AJ9RlTAv7T5FtMf3mGE8xW05oYluwOAb+roA2g7wHeMUEz8MsCvtsFa5s2QLtBaRwfnA81SK6nsP03UiwvS6M8GQEIn6kV6HN20gfKWpRiDXP8alWsDIIELKNFqJc1UxMJyzDWUYGFcZkJgFZz0j/QkiBs66bYXlZuAqBVnPQuRfs40wLgS00AtJyT3qNw3tYjmTctgHI56f0KAfVL5k0LoCxO+heFgMYk8xaz7Y6EtSCAeLPiHIX5XSSZNy2ARjnpxQoBlUjmTQugt5LzJBkrl8ybFkAvOenVivo2dxvEy/pMAMSbiyxlzslG2FZFsbXOwYIAesH4B3nnQJkh5jOTYnoZ5qnXBEA45e/g+ODezD1QJIQ8RigWb7+nQ8USJ2hfgSedkxyfGuZsdqVIwjlPsbxskvLETAGE1fm+gN8B5pxhZQVsVlgrGgV825mi83uZ0j0J+irgV0lrqBrB96WQ72vQZgH/cVCLSTNp1xDOPkFf7D9wAx6PdNpAa5hz/SWNlEe/Ydo78hXdY54P2qoKkMyxj2u3mb+zMVWGTfGSiKOuYx/X9jPnaCfWdhF0yMTVPI4geLr51ABIOOIdMXG74ydoPeiOAZBwQtlkGiC038y5moK1ScWm2S8fvm1hjWwqFpW4sV5EnfdkSE0YYy0BPfDxXCtNRYwDxKgG4UlnIVX5kQAxRujZQor1mTkHiO0+YpwixXSYFy0IPNTDvSI8NsJrwPkzFrQTNBMepO2UZ2z2a8C4/LhLsEQNL1qcCDLM67rrhx/6nCRrWKJ1FLNO8JkWKqTjpjQx1RalAeGmj2eOgc4kCyAXEi51RK/h4d2kN8kEyIWEM/lrAnC2MefmflIBciEdBF0JG06iAHIhNfxnsSoFJ5EAzVzRXwgLjs5hXqcdBv1hziZdp2ywRASE1hxWoIj95ybJ1QdZQBaQBWQBWUAWkDULyAKygPTYXwEGAArW2QJagQgvAAAAAElFTkSuQmCC')",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "5px center",
              backgroundSize: "16px",
            }}
          />
          {state.value.length > 0 && (
            <AriaButton
              className={(buttonValues) =>
                twMerge(
                  "font-black text-[#cdbe91] text-xs px-4",
                  buttonValues.isHovered && "text-[#f0e6d2]",
                  buttonValues.isPressed && "text-[#463714]",
                )
              }
            >
              ✕
            </AriaButton>
          )}
        </div>
      )}
    </AriaSearchField>
  );
}
