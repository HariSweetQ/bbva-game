import { translate as t } from "lit-i18n";
import { GameParams, Levels } from "../types/game";
import { LEVELS } from "../utils/constants";
import { SelectOption } from "../types/select";

class GameService {
  defaultLevel = LEVELS.MEDIUM.value;
  matrix: number[] = [...Array(9)].map((_, index) => index + 1);
  levels: Levels = LEVELS;
  levelOptions: SelectOption[] = Object.keys(this.levels).map(
    (key: string) => ({
      value: this.levels[key].value,
      text: t(`game.options.${this.levels[key].value}`),
    })
  );

  defaultParams: GameParams = { points: 0 };

  /**
   * Get shuffle matrix
   */
  getShuffledMatrix() {
    const matrix = [...this.matrix];
    let index = matrix.length;

    while (index !== 0) {
      let random = Math.floor(Math.random() * index);
      index--;

      [matrix[index], matrix[random]] = [matrix[random], matrix[index]];
    }

    return matrix;
  }

  getGridData() {
    const options = this.getShuffledMatrix();
    return {
      valid: options[Math.floor(Math.random() * options.length)],
      options
    };
  }

  getLevelTimer(level: string = this.defaultLevel) {
      return this.levels[level.toUpperCase()].seconds * 1000;
  }

  getLevelPoints(level: string = this.defaultLevel) {
    return this.levels[level.toUpperCase()].points;
  }
}

export const gameSvc = new GameService();