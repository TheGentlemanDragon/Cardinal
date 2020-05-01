import { h } from 'preact'
import PropTypes from 'proptypes'

/**
 * Some documented component
 *
 * @component
 * @param {object} props
 * @param {string} props.templateId ID of template to load
 * @example
 * const templateId = 'ILSUMGQVg80sjZ18T6Xl'
 * return (
 *   <Template templateId={templateId} />
 * )
 */
function TemplatePage({ templateId }) {
  return <>Template</>
}

TemplatePage.propTypes = {
  templateId: PropTypes.string.isRequired,
}

export default TemplatePage
