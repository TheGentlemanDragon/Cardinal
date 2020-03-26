import { h } from 'preact'
import s from './style.css'

/** Component used to render an item in an FlixList
 * @callback ItemComponent
 * @param {Object} value value list item represents
 */

/** Lists the items in a row
 *  @arg {string} title                 title of list to display
 *  @arg {Object[]} items               array of items to list
 *  @arg {ItemComponent} ItemComponent  component to render list item
 */
function FlixList({ title, items, ItemComponent }) {
  return (
    <section class={s.FlixList}>
      <h2 class={s.title}>{title}</h2>

      {/* Games List */}
      <ul class={s.list}>
        {items.map(item => (
          <ItemComponent value={item} />
        ))}
      </ul>
    </section>
  )
}

export default FlixList
