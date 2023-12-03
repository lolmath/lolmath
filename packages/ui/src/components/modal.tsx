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
import { borderGradientPressed } from "../utilities/border";
import { resolveClassName } from "../utilities/resolve-class-name";
import { tv } from "../utilities/tv";

const modalOverlay = tv({
  base: "bg-lol-grey-hextech-black fixed inset-0 z-10 flex min-h-full flex-col items-center justify-center overflow-y-auto bg-opacity-25 px-4 text-center backdrop-blur",
});

const modal = tv({
  base: "w-full max-w-md",
});

const dialog = tv({
  base: "relative max-h-screen py-4 outline-none",
});
const dialogBorder = tv({
  base: [
    "bg-gradient-to-b p-0.5 text-left align-middle shadow-xl",
    borderGradientPressed,
  ],
});

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
        return modalOverlay({
          className: resolveClassName(modalOverlayClassName, values),
        });
      }}
    >
      <AriaModal
        {...modalProps}
        className={(values) =>
          modal({
            className: resolveClassName(className, values),
          })
        }
      >
        <Dialog
          role="alertdialog"
          {...dialogProps}
          className={dialog({
            className: dialogProps.className,
          })}
        >
          {(dialogRenderProps) => (
            <>
              <div className="relative h-1">
                <div className="border-lol-gold-600 bg-lol-grey-hextech-black absolute left-5 right-5 h-full rounded-full border border-b-0"></div>
              </div>
              <div className={dialogBorder()}>
                <div className="bg-lol-grey-hextech-black">
                  {typeof children === "function"
                    ? children(dialogRenderProps)
                    : children}
                </div>
              </div>
              <div className="relative h-1">
                <div className="border-lol-gold-500 bg-lol-grey-hextech-black absolute left-5 right-5 h-full rounded-full border border-t-0"></div>
              </div>
            </>
          )}
        </Dialog>
      </AriaModal>
    </ModalOverlay>
  );
}

const dialogHeading = tv({
  base: "text-lol-gold-100 font-beaufort text-lol-h5 uppercase",
});

export function DialogHeading({ className, ...props }: AriaHeadingProps) {
  return (
    <AriaHeading
      {...props}
      className={dialogHeading({
        className,
      })}
    />
  );
}

export function DialogButtons({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex translate-y-0.5 justify-center">
      <div className="bg-lol-grey-hextech-black flex gap-1 px-1">
        {children}
      </div>
    </div>
  );
}

export function DialogTrigger(props: AriaDialogTriggerProps) {
  return <AriaDialogTrigger {...props} />;
}
