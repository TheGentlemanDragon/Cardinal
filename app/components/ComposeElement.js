import { h } from 'hyperapp'
import './ComposeElement.styl'

export default ({ index, item }) => (
  { editIndex, mouseIndex, selectedIndex },
  { deleteElement, mouseElement, selectElement }
) => (
  <div
    class={'compose-element ' + (index === selectedIndex && 'selected')}
    container="row #spread @center"
    onmouseenter={() => mouseElement(index)}
    onmouseleave={() => mouseElement(-1)}
    onclick={() => selectElement(index)}
  >
    {/* Element Icon */}
    <i class="element-type" />

    {/* Element Name */}
    <span flex>{item.name}</span>

    {/* Mouse Over Buttons */}
    {index === mouseIndex && [
      <i class="icon-view-show" />,
      <i class="icon-trash" onclick={() => deleteElement(index)} />,
    ]}
  </div>
)
