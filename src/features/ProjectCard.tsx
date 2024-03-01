const clsProjectCard = `_
  card card-compact shadow-lg rounded-lg
  bg-white text-neutral
  hover:shadow-2xl hover:scale-110 transition-all
  cursor-pointer
`;

type Props = {
  title: string;
};

export const ProjectCard = ({ title }: Props) => {
  return (
    <article class={clsProjectCard}>
      <figure class="max-h-32">
        <img
          src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
          alt="Shoes"
        />
      </figure>
      <div class="card-body gap-0">
        <h2 class="card-title text-base">{title}</h2>
        <p class="text-xs">22h ago</p>
      </div>
    </article>
  );
};
