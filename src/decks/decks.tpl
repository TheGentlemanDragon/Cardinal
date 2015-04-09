
<div class="sub-title">My Decks</div>

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
