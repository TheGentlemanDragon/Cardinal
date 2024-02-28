/** Show welcome message and login/signup options */
export const SplashPage = () => {
  return (
    <div class="splash-bg size-full text-gray-800">
      <article class="flex flex-col items-center max-w-2xl m-auto text-center">
        <h1 class="text-3xl mt-32">Cardinal</h1>

        <h3 class="text-7xl font-bold mt-16">
          Make your dream card game a reality
        </h3>

        <p class="text-2xl text-gray-500 mt-12">
          Cardinal aims to be the easiest ways to get the card game you have in
          your head out on to the table top.
        </p>

        <div class="mt-12">
          <a href="/signin" class="btn btn-primary btn-lg">
            Get Started
          </a>
        </div>
      </article>
    </div>
  );
};
