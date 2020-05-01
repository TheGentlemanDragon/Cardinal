import { h } from 'preact'
import s from './style.css'

/** Component used to render an item in an FlixList
 * @callback ItemComponent
 * @param {Object} value value list item represents
 */

/** Lists the items in a row
 *  @arg {string} title title of list to display
 */
function FlixList({ title, children }) {
  return (
    <div class={s.FlixList}>
      <h2>{title}</h2>
      <div>{children}</div>
    </div>
  )
}

export default FlixList
