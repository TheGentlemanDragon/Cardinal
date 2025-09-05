export const INPUT_ICON_CLS = `_
  w-8 h-8 absolute top-1/2 right-3
  transform -translate-y-1/2
  text-gray-400 pointer-events-none  
`;

export const MENU_BUTTON_CLS = "btn btn-neutral hover:bg-gray-700";

export const CARD_CLS = `_
  relative group
  card card-sm shadow-lg rounded-xl
  bg-white text-neutral
  hover:shadow-blue-950/80
  transition-all
  cursor-pointer
`;

export const TEXT_SHADOW_CLS = "[text-shadow:2px_2px_4px_rgb(0_0_0/30%)]";

export const TITLE_CLS = "text-2xl font-semibold";

export const HIDE_ARROWS =
  "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";

export const cls = (...args: string[]) => args.filter((item) => item).join(" ");
