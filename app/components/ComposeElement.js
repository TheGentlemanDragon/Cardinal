import { h } from 'hyperapp'
import './ComposeElement.styl'

export default ({ index, item }) => (
  { editIndex, mouseIndex },
  {
    cancelElement,
    deleteElement,
    editElement,
    mouseElement,
    saveElement,
    updateElement,
  }
) => (
  <div
    class="compose-element"
    container="row #spread @center"
    onmouseover={() => mouseElement(index)}
    onmouseleave={() => mouseElement(-1)}
  >
    {index !== editIndex
      ? [
          /* Element Name */
          <span flex>{item.name}</span>,

          /* Mouse Over Buttons */
          index === mouseIndex && [
            <i class="icon-edit-pencil" onclick={() => editElement(index)} />,
            <i class="icon-view-show" />,
            <i class="icon-trash" onclick={() => deleteElement(index)} />,
          ],
        ]
      : [
          /* Edit Mode */
          <input
            value={item.name}
            oncreate={element => element.select() && element.focus()}
            onkeyup={event =>
              updateElement({ index, name: event.target.value })
            }
          />,
          <i class="icon-checkmark" onclick={() => saveElement(index)} />,
          <i class="icon-close" onclick={() => cancelElement(index)} />,
        ]}
  </div>
)
