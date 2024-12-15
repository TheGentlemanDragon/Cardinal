type Prop = {
  cls?: string;
};

export const TrashIcon = ({ cls }: Prop) => {
  return (
    <svg
      class={`form-icon icon ${cls}`}
      fill="currentColor"
      fill-rule="evenodd"
      height="32"
      viewBox="0 0 32 32"
      width="32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M 4.758 8.761 L 27.418 8.761 C 28.505 8.761 29.285 9.373 29.176 10.522 L 27.252 30.348 C 27.175 31.183 26.69 32 25.668 32 L 6.505 32 C 5.653 31.954 5.019 31.39 4.934 30.491 L 3.028 10.566 C 2.919 9.416 3.638 8.761 4.758 8.761 Z M 3.26 2.385 L 11.802 2.385 L 11.802 1.757 C 11.802 0.76 12.441 0 13.494 0 L 18.582 0 C 19.665 0 20.313 0.736 20.313 1.751 L 20.313 2.385 L 28.993 2.385 C 29.028 2.385 29.062 2.39 29.098 2.393 C 29.739 2.451 30.235 2.957 30.268 3.595 C 30.27 3.644 30.272 3.682 30.272 3.731 L 30.272 6.404 C 30.272 6.779 29.976 7.085 29.607 7.104 C 29.574 7.104 29.539 7.106 29.505 7.106 L 2.429 7.106 C 2.058 7.106 1.755 6.818 1.728 6.457 C 1.728 6.412 1.727 6.365 1.727 6.317 L 1.727 3.848 C 1.727 3.164 1.991 2.553 2.779 2.408 C 2.938 2.38 3.099 2.385 3.26 2.385 Z M 8.504 15.414 C 8.472 14.778 9.018 14.236 9.726 14.206 C 10.435 14.176 11.038 14.669 11.07 15.305 L 11.614 25.347 C 11.646 25.984 11.099 26.525 10.392 26.555 C 9.683 26.585 9.081 26.092 9.049 25.456 L 8.504 15.414 Z M 21.13 15.305 C 21.162 14.669 21.765 14.176 22.474 14.206 C 23.182 14.236 23.728 14.778 23.696 15.414 L 23.154 25.456 C 23.121 26.092 22.519 26.585 21.81 26.555 C 21.103 26.525 20.556 25.984 20.588 25.347 L 21.13 15.305 Z M 14.686 15.359 C 14.686 14.72 15.264 14.201 15.975 14.201 C 16.684 14.201 17.263 14.72 17.263 15.359 L 17.263 25.402 C 17.263 26.042 16.684 26.561 15.975 26.561 C 15.264 26.561 14.686 26.042 14.686 25.402 L 14.686 15.359 Z" />
    </svg>
  );
};