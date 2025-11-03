import { Check, LucideIcon, X } from "lucide-preact";
import { useState } from "preact/hooks";

type Props = {
  icon: LucideIcon;
  size?: "small" | "medium" | "large";
  onConfirm: () => void;
};

const SIZE_MAP = {
  small: 16,
  medium: 24,
  large: 32,
};

/** Button component with confirmation popover */
export const IconAction = ({
  icon: Icon,
  size = "medium",
  onConfirm,
}: Props) => {
  const [isConfirm, setIsConfirm] = useState(false);

  const iconSize = SIZE_MAP[size];

  const showConfirm = () => {
    setIsConfirm(true);
  };

  const cancelConfirmation = () => {
    setIsConfirm(false);
  };

  const confirmAction = () => {
    setIsConfirm(false);
    onConfirm();
  };

  return (
    <div class="opacity-0 inline-block group-hover:opacity-100">
      {isConfirm ? (
        <div
          class="flex p-1 rounded-lg bg-base-200"
          onMouseLeave={cancelConfirmation}
        >
          <button
            type="button"
            class="btn btn-ghost btn-sm p-1 hover:bg-success/20"
            onClick={confirmAction}
          >
            <Check size={iconSize} class="text-success" />
          </button>

          <button
            type="button"
            class="btn btn-ghost btn-sm p-1 hover:bg-error/20"
            onClick={cancelConfirmation}
          >
            <X size={iconSize} class="text-error" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          class="btn btn-ghost btn-sm rounded-lg m-1 p-1 hover:bg-base-200"
          onClick={showConfirm}
        >
          <Icon size={iconSize} />
        </button>
      )}
    </div>
  );
};
