"use strict";

import PopUp from "./popup.js";
// import Field from "./Field.js";
// import * as sound from "./sound.js";
//import Game from "./game.js";
import { GameBuilder, Reason } from "./game.js";

const gameFinishBanner = new PopUp();
const game = new GameBuilder()
  .gameDuration(5)
  .carrotCount(3)
  .bugCount(3)
  .build();

game.setGameStopListener((reason) => {
  let message;
  switch (reason) {
    case Reason.cancel:
      message = "replay?";
      break;
    case Reason.win:
      message = "YOU WON";
      break;
    case Reason.lose:
      message = "YOU LOST";
      break;
  }
  gameFinishBanner.showWithText(message);
});

gameFinishBanner.setClickListener(() => {
  game.start();
});
