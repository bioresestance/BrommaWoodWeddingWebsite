import React from "react";

type ModalProps = {
  isOpen: boolean;
  severity: "info" | "warning" | "error";
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  severity,
  title,
  message,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  const severityIcon = {
    info: "ℹ️",
    warning: "⚠️",
    error: "❌",
  };

  const severityColor = {
    info: "bg-blue-200 text-blue-700",
    warning: "bg-yellow-200 text-yellow-700",
    error: "bg-red-200 text-red-700",
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur">
      <div className="relative px-4 min-h-screen md:flex md:items-center md:justify-center">
        <div className="opacity-25 w-full h-full absolute z-10 inset-0"></div>
        <div className="bg-white rounded-lg md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative shadow-lg">
          <div className="md:flex items-center">
            <div className="rounded-full border border-gray-300 flex items-center justify-center w-16 h-16 flex-shrink-0 mx-auto">
              <span className="text-3xl">{severityIcon[severity]}</span>
            </div>
            <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
              <p className="font-bold">{title}</p>
              <p className="text-sm text-gray-700 mt-1">{message}</p>
            </div>
          </div>
          <div className="text-center md:text-right mt-4 md:flex md:justify-end">
            <button
              onClick={onConfirm}
              className={`block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 ${severityColor[severity]} rounded-lg font-semibold text-sm md:ml-2 md:order-2`}
            >
              Confirm
            </button>
            <button
              onClick={onCancel}
              className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-gray-200 rounded-lg font-semibold text-sm mt-4 md:mt-0 md:order-1"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
