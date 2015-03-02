<div class="content-main">

  <div class="header">
    <span class="title">Cardinal</span>
    <span class="slash">/</span>
    <span><a href="#/decks">My Decks</a></span>
    <span class="slash">/</span>
    <span>{{ template.name }}</span>
  </div>


  <div class="editor-controls"
      layout="column" layout-align="start start">
    
    <span md-ink-ripple
        ng-class="{ selected: control==='settings' }"
        ng-click="control='settings'">
      <i class="mdi mdi-cog"></i>
      <md-tooltip md-direction="left" md-delay="100">
        Settings
      </md-tooltip>
    </span>

    <span md-ink-ripple
        ng-class="{ selected: control==='layout' }"
        ng-click="control='layout'"
        >
      <i class="mdi mdi-crop-portrait"></i>
      <!-- <i class="mdi mdi-drawing"></i> -->
      <!-- <i class="mdi mdi-file-document-box"></i> -->
      <md-tooltip md-direction="left" md-delay="100">
        Layout
      </md-tooltip>
    </span>

    <span md-ink-ripple
        ng-class="{ selected: control==='data' }"
        ng-click="control='data'">
      <i class="mdi mdi-database-outline"></i>
      <!-- <i class="mdi mdi-database-outline"></i> -->
      <md-tooltip md-direction="left" md-delay="100">
        Data
      </md-tooltip>
    </span>

    <span md-ink-ripple
        ng-class="{ selected: control==='preview' }"
        ng-click="control='preview'">
      <i class="mdi mdi-eye"></i>
      <md-tooltip md-direction="left" md-delay="100">
        Preview
      </md-tooltip>
    </span>

  </div>
</div>
