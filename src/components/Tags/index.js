import { mapStatesToProps } from 'inferno-fluxible'

import PropertyGroup from '../SideBar/PropertyGroup'

const Tags = ({ assets }) => {
  const { tags = [] } = assets
  return (
    <>
      <PropertyGroup
        label="Image"
        collapsable={false}
        actions={[
          <i class="icon-add-element clickable" onClick={() => {}} />,
          // <i
          //   class={'icon-restore clickable' + (!modified ? ' clean' : '')}
          //   onClick={modified && resetElement}
          // />,
          // <i
          //   class={'icon-cloud-upload clickable' + (!modified ? ' clean' : '')}
          //   onClick={modified && saveTemplate}
          // />,
        ]}
      >
        {tags
          .filter(tag => tag.type === 'image')
          .map((tag, index) => (
            <div
              key={`image-tag-${index}`}
              class={'sidebar-list-item clickable '}
              container="row #even @center"
              // onClick={linkEvent(index, selectElement)}
            >
              <span class="sidebar-list-item" container="row #middle @center">
                {tag.name}
              </span>

              <img
                class={`element-type static`}
                src={tag.value}
                alt={tag.name}
              />
            </div>
          ))}
      </PropertyGroup>

      <PropertyGroup
        label="Status"
        collapsable={false}
        actions={[<i class="icon-add-element clickable" onClick={() => {}} />]}
      >
        {tags
          .filter(tag => tag.type === 'style')
          .map((tag, index) => (
            <div
              key={`style-tag-${index}`}
              class={'sidebar-list-item clickable '}
              // container="row #middle @center"
              // onClick={linkEvent(index, selectElement)}
            >
              <div class="sidebar-list-item" container="row #even @center">
                <span>{tag.name}</span>
                <span style={tag.style}>ABC</span>
              </div>
            </div>
          ))}
      </PropertyGroup>
    </>
  )
}

const map = ({ assets }) => ({ assets })

export default mapStatesToProps(Tags, map)
