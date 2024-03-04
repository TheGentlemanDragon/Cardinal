type Prop = {
  cls?: string;
};

export const PlusIcon = ({ cls }: Prop) => {
  return (
    <svg
      class={`form-icon icon ${cls}`}
      fill="currentColor"
      height="20"
      viewBox="0 0 20 20"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 2.5a.5.5 0 0 0-1 0V9H2.5a.5.5 0 0 0 0 1H9v6.5a.5.5 0 0 0 1 0V10h6.5a.5.5 0 0 0 0-1H10V2.5Z"
        fill="currentColor"
      ></path>
    </svg>
  );
};
