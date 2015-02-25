<div class="content-main">

  <h1 class="title">Cardinal</h1>

  <h3>My Decks</h3>

  <!-- Deck List -->

  <div class="deck-list">

    <div  class="deck-item" md-ink-ripple
          layout="column" layout-align="center center"
          ng-repeat="(deckId, deck) in decks"
          ng-click="openDeck(deck, $event)">
      <span>{{ deck.name }}</span>
    </div>

    <div  class="deck-item" md-ink-ripple
          layout="column" layout-align="center center"
          ng-click="newDeck($event)">
      <i class="mdi mdi-plus medium"></i>
    </div>
    
  </div>
</div>
