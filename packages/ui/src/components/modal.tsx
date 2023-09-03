import {
  Modal as AriaModal,
  Dialog,
  DialogTrigger as AriaDialogTrigger,
  Heading as AriaHeading,
  ModalOverlay,
  HeadingProps as AriaHeadingProps,
  ModalOverlayProps,
  DialogTriggerProps as AriaDialogTriggerProps,
  DialogProps,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";
import { borderPressedClassName } from "../utilities/border";
import { resolveClassname } from "../utilities/resolve-classname";

interface ModalProps extends Omit<ModalOverlayProps, "children"> {
  modalOverlayClassName?: ModalOverlayProps["className"];
  dialogProps?: Omit<DialogProps, "children">;
  children?: DialogProps["children"];
}

export function Modal({
  modalOverlayClassName,
  dialogProps = {},
  children,
  className,
  ...modalProps
}: ModalProps) {
  return (
    <ModalOverlay
      {...modalProps}
      className={(values) => {
        return twMerge(
          "fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-25 flex min-h-full items-center justify-center text-center backdrop-blur flex-col px-4",
          resolveClassname(modalOverlayClassName, values),
        );
      }}
    >
      <AriaModal
        {...modalProps}
        className={(values) =>
          twMerge("w-full max-w-md", resolveClassname(className, values))
        }
      >
        <Dialog
          role="alertdialog"
          {...dialogProps}
          className={twMerge(
            "outline-none relative max-h-screen py-4",
            dialogProps.className,
          )}
        >
          {(dialogRenderProps) => (
            <>
              <div className="relative h-1">
                <div className="border-lol-gold-700 border bg-black absolute border-b-0 rounded-full h-full left-5 right-5"></div>
              </div>
              <div
                className={twMerge(
                  "text-left align-middle shadow-xl p-0.5 bg-gradient-to-t",
                  borderPressedClassName,
                )}
              >
                <div className="bg-black">
                  {typeof children === "function"
                    ? children(dialogRenderProps)
                    : children}
                </div>
              </div>
              <div className="relative h-1">
                <div className="border-lol-gold-600 border bg-black absolute border-t-0 rounded-full h-full left-5 right-5"></div>
              </div>
            </>
          )}
        </Dialog>
      </AriaModal>
    </ModalOverlay>
  );
}

export function Heading(props: AriaHeadingProps) {
  return (
    <AriaHeading
      {...props}
      className={twMerge(
        "text-lol-gold-100 uppercase font-beaufort font-bold text-lg",
        props.className,
      )}
    ></AriaHeading>
  );
}

export function DialogButtons({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center translate-y-0.5">
      <div className="flex gap-1 bg-black px-1">{children}</div>
    </div>
  );
}

export function DialogTrigger(props: AriaDialogTriggerProps) {
  return <AriaDialogTrigger {...props} />;
}
