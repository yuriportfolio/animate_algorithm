import { makeScene2D } from "@motion-canvas/2d/lib/scenes";
import { Node, Rect, Txt, View2D } from "@motion-canvas/2d/lib/components";
import { makeRef, range } from "@motion-canvas/core/lib/utils";
import { Colors, Typography } from "../styles";
import { ThreadGenerator } from "@motion-canvas/core/lib/threading";
import { all } from "@motion-canvas/core/lib/flow";

/* 
  These are the configuration values for the scene.
*/
const SceneConfig = {
  rectSize: 200,
  rectGap: 12,
  rectRadius: 100,
  rectStrokeWidth: 8,
  fontSize: 60,
  moveDuration: 0.5,
  backgroundColor: Colors.cyan,
  cardColor: "rgba(0, 0, 0, 0.3)",
  arraySize: 5,
};

enum Direction {
  Up,
  Down,
  Left,
  Right,
}

/* 
  This scene animates the reversal of an array of rectangles with an non-optimized algorithm.
*/
export default makeScene2D(function* (view) {
  const rects: Rect[] = [];

  setupInitialState(view, rects);
  yield* animateScene(rects);
});

function setupInitialState(view: View2D, rects: Rect[]) {
  const node = <Node />;
  setupView(node, view, rects);
  setupViewPositions(node, rects);
}

function setupView(node: Node, view: View2D, rects: Rect[]) {
  view.fill(SceneConfig.backgroundColor);

  view.add(node);
  range(SceneConfig.arraySize).map((i) =>
    node.add(
      <Rect
        radius={SceneConfig.rectRadius}
        size={SceneConfig.rectSize}
        fill={SceneConfig.cardColor}
        ref={makeRef(rects, i)}
        alignItems={"center"}
        lineWidth={SceneConfig.rectStrokeWidth}
      >
        <Txt
          text={i.toString()}
          fontSize={SceneConfig.fontSize}
          {...Typography.default}
        />
      </Rect>
    )
  );
}

function setupViewPositions(node: Node, rects: Rect[]) {
  // Positions the rectangles
  rects.forEach((rect, i) => {
    const targetX = i * (rect.width() + SceneConfig.rectGap);
    rect.position.x(targetX);
  });

  // Centralizes the node
  const firstItemOffset = SceneConfig.rectSize / 2;
  const groupSize = SceneConfig.rectSize + SceneConfig.rectGap;
  const moveDistance = (rects.length * groupSize) / 2;
  node.position.x(-moveDistance + firstItemOffset);
}

function* animateScene(rects: Rect[]) {
  yield* reverseArray(rects, Direction.Left);
  yield* reverseArray(rects, Direction.Right);
}

function* reverseArray(rects: Rect[], direction: Direction) {
  if (direction === Direction.Up || direction === Direction.Down)
    throw new Error("Invalid direction");

  for (
    let mainRectIndex = 0;
    mainRectIndex < rects.length - 1;
    mainRectIndex++
  ) {
    const mainRect = rects[mainRectIndex];

    yield* mainRect.hightlight(true);

    yield* mainRect.moveVertically(Direction.Up);

    // Moves all other rectangles to the left or right
    yield* moveAllFromIndex(rects, mainRectIndex, direction);

    // Moves the main rectangle to the right or left
    const oppositeDirection =
      direction === Direction.Left ? Direction.Right : Direction.Left;
    yield* mainRect.moveHorizontally(
      oppositeDirection,
      rects.length,
      mainRectIndex
    );

    yield* mainRect.moveVertically(Direction.Down);

    yield* mainRect.hightlight(false);
  }
}

function* moveAllFromIndex(rects: Rect[], index: number, direction: Direction) {
  if (direction === Direction.Up || direction === Direction.Down)
    throw new Error("Invalid direction");

  const offset =
    (direction === Direction.Left ? -1 : 1) *
    (SceneConfig.rectSize + SceneConfig.rectGap);

  for (let i = index + 1; i < rects.length; i++) {
    const rect = rects[i];
    yield* rect.moveToPosition(rect.position.x() + offset, rect.position.y());
  }
}

declare module "@motion-canvas/2d/lib/components" {
  interface Rect {
    hightlight(enable: boolean): ThreadGenerator;
    moveToPosition(targetX: number, targetY: number): ThreadGenerator;
    moveVertically(direction: Direction): ThreadGenerator;
    moveHorizontally(
      direction: Direction,
      unitCount: number,
      currentUnit: number
    ): ThreadGenerator;
  }
}

Rect.prototype.hightlight = function* (enable: boolean) {
  yield* this.stroke(
    enable ? Colors.whiteLabel : null,
    SceneConfig.moveDuration
  );
};

Rect.prototype.moveToPosition = function* (targetX: number, targetY: number) {
  const originalX = this.position.x();
  const originalY = this.position.y();

  yield* all(
    this.position.x(originalX, 0).to(targetX, SceneConfig.moveDuration),
    this.position.y(originalY, 0).to(targetY, SceneConfig.moveDuration)
  );
};

Rect.prototype.moveVertically = function* (direction: Direction) {
  let moveDistance = SceneConfig.rectSize + SceneConfig.rectGap;

  switch (direction) {
    case Direction.Up:
      yield* this.animate(this.position.x(), this.position.y() - moveDistance);
      break;
    case Direction.Down:
      yield* this.animate(this.position.x(), this.position.y() + moveDistance);
      break;
    default:
      throw new Error("Invalid direction");
  }
};

Rect.prototype.moveHorizontally = function* (
  direction: Direction,
  unitCount: number,
  currentUnit: number
) {
  if (direction === Direction.Up || direction === Direction.Down)
    throw new Error("Invalid direction");

  const sign = direction === Direction.Left ? -1 : 1;
  const targetX =
    this.position.x() +
    sign *
      (SceneConfig.rectSize + SceneConfig.rectGap) *
      (unitCount - (1 + currentUnit));
  yield* this.animate(targetX, this.position.y());
};
