type ToastTypes =
	| "normal"
	| "action"
	| "success"
	| "info"
	| "warning"
	| "error"
	| "loading"
	| "default";
type PromiseT<Data = unknown> = Promise<Data> | (() => Promise<Data>);
interface PromiseIExtendedResult extends ExternalToast {
	message: React.ReactNode;
}
type PromiseTExtendedResult<Data = unknown> =
	| PromiseIExtendedResult
	| ((data: Data) => PromiseIExtendedResult | Promise<PromiseIExtendedResult>);
type PromiseTResult<Data = unknown> =
	| string
	| React.ReactNode
	| ((
			data: Data,
	  ) => React.ReactNode | string | Promise<React.ReactNode | string>);
type PromiseExternalToast = Omit<ExternalToast, "description">;
type PromiseData<ToastData = unknown> = PromiseExternalToast & {
	loading?: string | React.ReactNode;
	success?: PromiseTResult<ToastData> | PromiseTExtendedResult<ToastData>;
	error?: PromiseTResult | PromiseTExtendedResult;
	description?: PromiseTResult;
	finally?: () => void | Promise<void>;
};
interface ToastClassnames {
	toast?: string;
	title?: string;
	description?: string;
	loader?: string;
	closeButton?: string;
	cancelButton?: string;
	actionButton?: string;
	success?: string;
	error?: string;
	info?: string;
	warning?: string;
	loading?: string;
	default?: string;
	content?: string;
	icon?: string;
}

interface Action {
	label: React.ReactNode;
	onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	actionButtonStyle?: React.CSSProperties;
}
interface ToastT {
	id: number | string;
	title?: (() => React.ReactNode) | React.ReactNode;
	type?: ToastTypes;
	icon?: React.ReactNode;
	jsx?: React.ReactNode;
	richColors?: boolean;
	invert?: boolean;
	closeButton?: boolean;
	dismissible?: boolean;
	description?: (() => React.ReactNode) | React.ReactNode;
	duration?: number;
	delete?: boolean;
	action?: Action | React.ReactNode;
	cancel?: Action | React.ReactNode;
	onDismiss?: (toast: ToastT) => void;
	onAutoClose?: (toast: ToastT) => void;
	promise?: PromiseT;
	cancelButtonStyle?: React.CSSProperties;
	actionButtonStyle?: React.CSSProperties;
	style?: React.CSSProperties;
	unstyled?: boolean;
	className?: string;
	classNames?: ToastClassnames;
	descriptionClassName?: string;
	position?: Position;
}
type Position =
	| "top-left"
	| "top-right"
	| "bottom-left"
	| "bottom-right"
	| "top-center"
	| "bottom-center";

interface ToastToDismiss {
	id: number | string;
	dismiss: boolean;
}
type ExternalToast = Omit<
	ToastT,
	"id" | "type" | "title" | "jsx" | "delete" | "promise"
> & {
	id?: number | string;
};

type titleT = (() => React.ReactNode) | React.ReactNode;

export type Toast = ((
	message: titleT,
	data?: ExternalToast,
) => string | number) & {
	success: (
		message: titleT | React.ReactNode,
		data?: ExternalToast,
	) => string | number;
	info: (
		message: titleT | React.ReactNode,
		data?: ExternalToast,
	) => string | number;
	warning: (
		message: titleT | React.ReactNode,
		data?: ExternalToast,
	) => string | number;
	error: (
		message: titleT | React.ReactNode,
		data?: ExternalToast,
	) => string | number;
	custom: (
		jsx: (id: number | string) => React.ReactElement,
		data?: ExternalToast,
	) => string | number;
	message: (
		message: titleT | React.ReactNode,
		data?: ExternalToast,
	) => string | number;
	promise: <ToastData>(
		promise: PromiseT<ToastData>,
		data?: PromiseData<ToastData>,
	) =>
		| (string & {
				unwrap: () => Promise<ToastData>;
		  })
		| (number & {
				unwrap: () => Promise<ToastData>;
		  })
		| {
				unwrap: () => Promise<ToastData>;
		  };
	dismiss: (id?: number | string) => string | number;
	loading: (
		message: titleT | React.ReactNode,
		data?: ExternalToast,
	) => string | number;
} & {
	getHistory: () => (ToastT | ToastToDismiss)[];
	getToasts: () => (ToastT | ToastToDismiss)[];
};
