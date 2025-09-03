export const PropertiesMenu = () => {
  return (
    <div class="flex flex-col bg-base-200 rounded-box shadow-md p-4">
      <div class="font-medium mb-2">Properties</div>

      <fieldset class="fieldset">
        <legend class="fieldset-legend">Name</legend>
        <input type="text" class="input" />
      </fieldset>

      <fieldset class="fieldset">
        <legend class="fieldset-legend">Content</legend>
        <textarea type="text" class="textarea" />
      </fieldset>
    </div>
  );
};
