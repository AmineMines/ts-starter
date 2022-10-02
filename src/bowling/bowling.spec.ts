import { BowlingGame } from './bowling';

describe('Bowling rules', () => {
  describe('A complete game', () => {
    const buildGutterGame = () => Array(20).fill(0);
    const computeCompleteGame = (rolls: number[]) =>
      new BowlingGame([rolls]).getScore();

    it('should compute a score of 0 when a gutter game', () => {
      const gutterGame = buildGutterGame();

      const score = computeCompleteGame(gutterGame);

      const expectedBowlingScore = 0;
      expect(score).toBe(expectedBowlingScore);
    });

    it('should compute a score of 1 when one pin has been knocked down', () => {
      const pinsKnockedDown = 1;

      const score = computeCompleteGame([pinsKnockedDown]);

      const expectedBowlingScore = 1;
      expect(score).toBe(expectedBowlingScore);
    });

    it('should compute a score of 2 when 1 pin has been knocked down in two differents rolls', () => {
      const twoDifferentRolls = [1, 1];

      const score = computeCompleteGame(twoDifferentRolls);

      const expectedBowlingScore = 2;
      expect(score).toBe(expectedBowlingScore);
    });
  });

  describe('Spare', () => {
    it('should double next roll score when previous frame is a spare', () => {
      const spareFrame = [5, 5];

      const score = new BowlingGame([spareFrame, [1]]).getScore();

      const expectedBowlingScore = 12;
      expect(score).toBe(expectedBowlingScore);
    });

    it('should compute a spare only for given frame', () => {
      const firstFrame = [5, 0];
      const secondFrame = [5, 0];
      const thirdFrame = [1, 2];

      const score = new BowlingGame([
        firstFrame,
        secondFrame,
        thirdFrame,
      ]).getScore();

      const expectedBowlingScore = 13;
      expect(score).toBe(expectedBowlingScore);
    });

    it('should calculate a game with full spare', () => {
      const game = [...Array(9).fill([5, 5]), [5, 5, 5]];

      const score = new BowlingGame(game).getScore();

      const expectedBowlingScore = 15 * 10;
      expect(score).toBe(expectedBowlingScore);
    });

    it('should compute a score of there is a spare and strike in a row', () => {
      const frames = [[5, 5], [10]];

      const score = new BowlingGame(frames).getScore();

      const expectedBowlingScore = 20 + 10;
      expect(score).toBe(expectedBowlingScore);
    });
  });

  describe('Strike', () => {
    it('should double next frame score after a strike', () => {
      const firstFrame = [10];
      const secondFrame = [5, 3];

      const score = new BowlingGame([firstFrame, secondFrame]).getScore();

      const expectedBowlingScore = 10 + (5 + 3) * 2;
      expect(score).toBe(expectedBowlingScore);
    });

    it('should calculate three strike in a row', () => {
      const firstFrame = [10];
      const secondFrame = [10];
      const thirdFrame = [10];

      const score = new BowlingGame([
        firstFrame,
        secondFrame,
        thirdFrame,
      ]).getScore();

      const expectedBowlingScore = 30 + 20 + 10;
      expect(score).toBe(expectedBowlingScore);
    });

    it('should calculate two strike in a row and a regular frame with two rolls', () => {
      const firstFrame = [10];
      const secondFrame = [10];
      const thirdFrame = [5, 3];

      const score = new BowlingGame([
        firstFrame,
        secondFrame,
        thirdFrame,
      ]).getScore();

      const expectedBowlingScore = 25 + 18 + 8;
      expect(score).toBe(expectedBowlingScore);
    });

    it('should calculate a game with full strike', () => {
      const game = [...Array(9).fill([10]), [10, 10, 10]];

      const score = new BowlingGame(game).getScore();

      const expectedBowlingScore = 30 * 10;
      expect(score).toBe(expectedBowlingScore);
    });
  });

  it('should calculate a game with full regular frames', () => {
    const game = [...Array(10).fill([9, 0])];

    const score = new BowlingGame(game).getScore();

    const expectedBowlingScore = 9 * 10;
    expect(score).toBe(expectedBowlingScore);
  });
});
