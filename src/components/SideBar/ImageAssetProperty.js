// import AssetsModal from '../AssetsModal'

const ImageAssetProperty = ({ label, value, options, onUpdate }) => (
  <div class="sidebar-property" container="row #spread @center">
    <span>{label}</span>
    <select onChange={onUpdate}>
      <option disabled>-Choose Image-</option>
      {/* TODO: {options.map(opt => (
        <option value={opt.url} selected={opt.url === value}>
          {opt.name}
        </option>
      ))} */}
      <option value="showModal">-Manage Files-</option>
    </select>

    {/* TODO: <AssetsModal /> */}
  </div>
)

export default ImageAssetProperty
