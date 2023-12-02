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
import { borderGradientPressed } from "../utilities/border";
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
          "fixed inset-0 z-10 flex min-h-full flex-col items-center justify-center overflow-y-auto bg-black bg-opacity-25 px-4 text-center backdrop-blur",
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
            "relative max-h-screen py-4 outline-none",
            dialogProps.className,
          )}
        >
          {(dialogRenderProps) => (
            <>
              <div className="relative h-1">
                <div className="border-lol-gold-700 absolute left-5 right-5 h-full rounded-full border border-b-0 bg-black"></div>
              </div>
              <div
                className={twMerge(
                  "bg-gradient-to-t p-0.5 text-left align-middle shadow-xl",
                  borderGradientPressed,
                )}
              >
                <div className="bg-black">
                  {typeof children === "function"
                    ? children(dialogRenderProps)
                    : children}
                </div>
              </div>
              <div className="relative h-1">
                <div className="border-lol-gold-600 absolute left-5 right-5 h-full rounded-full border border-t-0 bg-black"></div>
              </div>
            </>
          )}
        </Dialog>
      </AriaModal>
    </ModalOverlay>
  );
}

export function DialogHeading(props: AriaHeadingProps) {
  return (
    <AriaHeading
      {...props}
      className={twMerge(
        "text-lol-gold-100 font-beaufort text-lg font-bold uppercase",
        props.className,
      )}
    ></AriaHeading>
  );
}

export function DialogButtons({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex translate-y-0.5 justify-center">
      <div className="flex gap-1 bg-black px-1">{children}</div>
    </div>
  );
}

export function DialogTrigger(props: AriaDialogTriggerProps) {
  return <AriaDialogTrigger {...props} />;
}
