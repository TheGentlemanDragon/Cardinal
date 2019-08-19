import { mapStatesToProps } from 'inferno-fluxible'
// import AssetsModal from '../AssetsModal'

const ImageAssetProperty = ({ label, value, assets, onUpdate }) => (
  <div class="sidebar-property" container="row #spread @center">
    <label>{label}</label>
    <select onChange={onUpdate}>
      <option disabled>-Choose Image-</option>
      {assets.map(opt => (
        <option value={opt.link} selected={opt.link === value}>
          {opt.description}
        </option>
      ))}
      {/* <option value="showModal">-Manage Files-</option> */}
    </select>

    {/* <AssetsModal /> */}
  </div>
)

const map = ({ assets }) => ({ assets })
export default mapStatesToProps(ImageAssetProperty, map)
