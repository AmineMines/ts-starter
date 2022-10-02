class Frame {
  constructor(private readonly rolls: number[]) {}

  getFirstRoll(): number {
    return this.rolls[0];
  }
  getRolls(): number[] {
    return this.rolls;
  }

  getScore = () => this.rolls.reduce((acc, roll) => acc + roll, 0);
  isSpare = () => this.getScore() === 10;
  isStrike = () => this.getFirstRoll() === 10;
}

export class BowlingGame {
  private readonly frames: Frame[];
  constructor(frames: number[][]) {
    this.frames = frames.map((frame) => new Frame(frame));
  }

  getScore = () => {
    return this.frames.reduce((score, frame, frameIndex) => {
      if (frame.isStrike()) {
        score += this.computeStrikeBonus(frameIndex);
      } else if (frame.isSpare()) {
        score += this.computeSpareBonus(frameIndex);
      }

      return score + frame.getScore();
    }, 0);
  };

  private computeSpareBonus = (frameIndex: number) => {
    const nextFrame = this.getNextFrame(frameIndex);
    return nextFrame?.getFirstRoll() ?? 0;
  };

  private computeStrikeBonus = (frameIndex: number) => {
    const [firstRoll, secondRoll] = this.getNextTwoRolls(frameIndex);

    return firstRoll + secondRoll;
  };

  private getNextTwoRolls = (frameIndex: number) => {
    const firstNextFrameRolls = this.getNextFrame(frameIndex)?.getRolls() ?? [];
    const secondNextFrameRolls =
      this.getNextFrame(frameIndex + 1)?.getRolls() ?? [];
    const nextRolls = [...firstNextFrameRolls, ...secondNextFrameRolls];

    return [nextRolls[0] ?? 0, nextRolls[1] ?? 0];
  };

  private getNextFrame = (frameIndex: number): Frame | undefined => {
    return this.frames[frameIndex + 1];
  };
}
