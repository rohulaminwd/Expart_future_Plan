import React from "react";
import { ValueType, Item } from "./Global";
import ChipComponent from "./ChipComponent";
import classNames from "classnames";

const Board = (props) => {
  //   const numbers = getNumbersList();
  const rouletteWheenNumbers = props.rouletteData.numbers;
  let totalNumbers = 37;

  const getRouletteColor = (number) => {
    const index = rouletteWheenNumbers.indexOf(number);
    const i =
      index >= 0
        ? index % totalNumbers
        : totalNumbers - Math.abs(index % totalNumbers);
    return i === 0 || number == null ? "none" : i % 2 === 0 ? "black" : "red";
  };

  const getClassNamesFromCellItemType = (type, number) => {
    let isEvenOdd = 0;
    if (number != null && type === ValueType.NUMBER && number !== 0) {
      if (number % 2 === 0) {
        isEvenOdd = 1;
      } else {
        isEvenOdd = 2;
      }
    }
    let numberValue = "value-" + number;
    const cellClass = classNames({
      "board-cell-number": type === ValueType.NUMBER,
      "board-cell-double-split": type === ValueType.DOUBLE_SPLIT,
      "board-cell-quad-split": type === ValueType.QUAD_SPLIT,
      "board-cell-triple-split": type === ValueType.TRIPLE_SPLIT,
      "board-cell-empty": type === ValueType.EMPTY,
      "board-cell-even": type === ValueType.EVEN || isEvenOdd === 1,
      "board-cell-odd": type === ValueType.ODD || isEvenOdd === 2,
      "board-cell-number-1-18":
        type === ValueType.NUMBERS_1_18 ||
        (number !== null &&
          number >= 1 &&
          number <= 18 &&
          type === ValueType.NUMBER),
      "board-cell-number-19-36":
        type === ValueType.NUMBERS_19_36 ||
        (number !== null &&
          number >= 19 &&
          number <= 36 &&
          type === ValueType.NUMBER),
      "board-cell-number-1-12":
        type === ValueType.NUMBERS_1_12 ||
        (number !== null &&
          number % 3 === 0 &&
          type === ValueType.NUMBER &&
          number !== 0),
      "board-cell-number-2-12":
        type === ValueType.NUMBERS_2_12 ||
        (number !== null && number % 3 === 2 && type === ValueType.NUMBER),
      "board-cell-number-3-12":
        type === ValueType.NUMBERS_3_12 ||
        (number !== null && number % 3 === 1 && type === ValueType.NUMBER),
      "board-cell-red":
        type === ValueType.RED ||
        (number !== null &&
          getRouletteColor(number) === "red" &&
          type === ValueType.NUMBER),
      "board-cell-black":
        type === ValueType.BLACK ||
        (number !== null &&
          getRouletteColor(number) === "black" &&
          type === ValueType.NUMBER),
    });

    return cellClass;
  };

  const getNumbersList = () => {
    let colList = [];
    const difference = 3;

    for (let i = 1; i <= 5; i++) {
      let rowList = [];
      let startNumberSub = 0;
      if (i === 3) {
        startNumberSub = 1;
      } else if (i === 5) {
        startNumberSub = 2;
      }

      let nextStartNumberSub = 0;
      if (i + 1 === 3) {
        nextStartNumberSub = 1;
      } else if (i + 1 === 5) {
        nextStartNumberSub = 2;
      }
      let prevStartNumberSub = 0;
      if (i - 1 === 3) {
        prevStartNumberSub = 1;
      } else if (i - 1 === 5) {
        prevStartNumberSub = 2;
      }
      if (i === 1) {
        let cell = {};
        cell.type = ValueType.NUMBER;
        cell.value = 0;
        rowList.push(cell);
      }
      for (let j = 1; j <= 26; j++) {
        let cell = {};

        if (j > 24) {
          cell.type = ValueType.EMPTY;
          rowList.push(cell);
          continue;
        }
        if (i % 2 === 0) {
          if (j === 1) {
            let leftNumber = 0;
            let topNumber = difference - prevStartNumberSub;
            let bottomNumber = difference - nextStartNumberSub;

            cell.type = ValueType.TRIPLE_SPLIT;
            cell.valueSplit = [leftNumber, topNumber, bottomNumber];
            rowList.push(cell);
          } else {
            if (j % 2 === 0) {
              let topNumber =
                ((j - 2) / 2) * difference + difference - prevStartNumberSub;
              let bottomNumber =
                ((j - 2) / 2) * difference + difference - nextStartNumberSub;
              cell.type = ValueType.DOUBLE_SPLIT;
              cell.valueSplit = [topNumber, bottomNumber];
              rowList.push(cell);
            } else {
              let leftNumber = ((j - 1) / 2) * difference - prevStartNumberSub;
              let rightNumber = leftNumber + difference;
              let bottomLeftNumber =
                ((j - 1) / 2) * difference - nextStartNumberSub;
              let bottomRightNumber = bottomLeftNumber + difference;
              cell.type = ValueType.QUAD_SPLIT;
              cell.valueSplit = [
                leftNumber,
                rightNumber,
                bottomLeftNumber,
                bottomRightNumber,
              ];
              rowList.push(cell);
            }
          }
        } else {
          if (j === 1) {
            let leftNumber = 0;
            let rightNumber = leftNumber + difference;
            cell.type = ValueType.DOUBLE_SPLIT;
            cell.valueSplit = [leftNumber, rightNumber];
            rowList.push(cell);
          } else {
            if (j % 2 === 0) {
              let currentNumber =
                ((j - 2) / 2) * difference + difference - startNumberSub;
              cell.type = ValueType.NUMBER;
              cell.value = currentNumber;
              rowList.push(cell);
            } else {
              let leftNumber = ((j - 1) / 2) * difference - startNumberSub;
              let rightNumber = leftNumber + difference;
              cell.type = ValueType.DOUBLE_SPLIT;
              cell.valueSplit = [leftNumber, rightNumber];
              rowList.push(cell);
            }
          }
        }
      }
      colList.push(rowList);
    }
    return colList;
  };

  const numbers = getNumbersList();

  const onCellClick = (item) => {
    props.onCellClick(item);
  };

  return (
    <div className="roulette-board-wrapper hideElementsTest">
      <div className="roulette-board">
        <div className="roulette-board-grid-numbers">
          <table>
            <tbody>
              {numbers.map((item, index) => {
                let keyId = 0;
                return (
                  <tr key={"tr_board_" + index}>
                    {item.map((cell, cellIndex) => {
                      let cellClass = getClassNamesFromCellItemType(
                        cell.type,
                        cell.value
                      );
                      if (cell.type === ValueType.NUMBER && cell.value === 0) {
                        let tdKey = "td_" + cell.type + "_" + cell.value;
                        let chipKey = "chip_" + cell.type + "_" + cell.value;

                        let currentItemChips =
                          props.chipsData.placedChips.get(cell);
                        return (
                          <ChipComponent
                            currentItemChips={currentItemChips}
                            tdKey={tdKey}
                            chipKey={chipKey}
                            cell={cell}
                            cellClass={cellClass}
                            rowSpan={5}
                            colSpan={1}
                            onCellClick={onCellClick}
                            leftMin={undefined}
                            leftMax={undefined}
                            topMin={undefined}
                            topMax={undefined}
                          />
                        );
                      } else {
                        let chipKeyValue = cell.value + "";
                        if (cell.value === undefined) {
                          let split = cell.valueSplit + "";
                          chipKeyValue = "split_" + split;
                        }
                        let tdKey = "td_" + cell.type + "_" + chipKeyValue;
                        let chipKey = "chip_" + cell.type + "_" + chipKeyValue;

                        if (cell.type === ValueType.EMPTY) {
                          keyId++;
                          return (
                            <td
                              key={"empty_" + keyId}
                              className={cellClass}
                            ></td>
                          );
                        } else {
                          let currentItemChips =
                            props.chipsData.placedChips.get(cell);

                          return (
                            <ChipComponent
                              currentItemChips={currentItemChips}
                              tdKey={tdKey}
                              chipKey={chipKey}
                              cell={cell}
                              rowSpan={1}
                              colSpan={1}
                              cellClass={cellClass}
                              onCellClick={onCellClick}
                              leftMin={undefined}
                              leftMax={undefined}
                              topMin={undefined}
                              topMax={undefined}
                            />
                          );
                        }
                      }
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="roulette-board-grid-other">
          <table>
            <tbody>
              <tr>
                <td colSpan={2}></td>
                <ChipComponent
                  currentItemChips={props?.chipsData?.placedChips?.get(
                    this?.other_1_12
                  )}
                  tdKey={"td_other_1_12"}
                  chipKey={"chip_other_1_12"}
                  cell={this?.other_1_12}
                  rowSpan={1}
                  colSpan={7}
                  cellClass={getClassNamesFromCellItemType(
                    ValueType.NUMBERS_1_12,
                    null
                  )}
                  leftMin={70}
                  leftMax={140}
                  onCellClick={onCellClick}
                  topMin={undefined}
                  topMax={undefined}
                />
                <td></td>
                <ChipComponent
                  currentItemChips={props?.chipsData?.placedChips?.get(
                    this?.other_2_12
                  )}
                  tdKey={"td_other_2_12"}
                  chipKey={"chip_other_2_12"}
                  cell={this?.other_2_12}
                  rowSpan={1}
                  colSpan={7}
                  leftMin={70}
                  leftMax={140}
                  cellClass={getClassNamesFromCellItemType(
                    ValueType.NUMBERS_2_12,
                    null
                  )}
                  onCellClick={onCellClick}
                  topMin={undefined}
                  topMax={undefined}
                />
                <td></td>
                <ChipComponent
                  currentItemChips={props?.chipsData?.placedChips?.get(
                    this?.other_3_12
                  )}
                  tdKey={"td_other_3_12"}
                  chipKey={"chip_other_3_12"}
                  cell={this?.other_3_12}
                  rowSpan={1}
                  colSpan={7}
                  leftMin={70}
                  leftMax={140}
                  cellClass={getClassNamesFromCellItemType(
                    ValueType.NUMBERS_3_12,
                    null
                  )}
                  onCellClick={onCellClick}
                  topMin={undefined}
                  topMax={undefined}
                />
              </tr>
              <tr>
                <td colSpan={2}></td>
                <ChipComponent
                  currentItemChips={props?.chipsData?.placedChips?.get(
                    this?.other_1_18
                  )}
                  tdKey={"td_other_1_18"}
                  chipKey={"chip_other_1_18"}
                  cell={this?.other_1_18}
                  rowSpan={1}
                  colSpan={3}
                  leftMin={30}
                  leftMax={60}
                  cellClass={getClassNamesFromCellItemType(
                    ValueType.NUMBERS_1_18,
                    null
                  )}
                  onCellClick={onCellClick}
                  topMin={undefined}
                  topMax={undefined}
                />
                <td></td>
                <ChipComponent
                  currentItemChips={props?.chipsData?.placedChips?.get(
                    this?.other_even
                  )}
                  tdKey={"td_other_even"}
                  chipKey={"chip_other_even"}
                  cell={this?.other_even}
                  rowSpan={1}
                  colSpan={3}
                  leftMin={30}
                  leftMax={60}
                  cellClass={getClassNamesFromCellItemType(
                    ValueType.EVEN,
                    null
                  )}
                  onCellClick={onCellClick}
                  topMin={undefined}
                  topMax={undefined}
                />
                <td></td>
                <ChipComponent
                  currentItemChips={props?.chipsData?.placedChips?.get(
                    this?.other_red
                  )}
                  tdKey={"td_other_red"}
                  chipKey={"chip_other_red"}
                  cell={this?.other_red}
                  rowSpan={1}
                  colSpan={3}
                  leftMin={30}
                  leftMax={60}
                  cellClass={getClassNamesFromCellItemType(ValueType.RED, null)}
                  onCellClick={onCellClick}
                  topMin={undefined}
                  topMax={undefined}
                />
                <td></td>
                <ChipComponent
                  currentItemChips={props?.chipsData?.placedChips?.get(
                    this?.other_black
                  )}
                  tdKey={"td_other_black"}
                  chipKey={"chip_other_black"}
                  cell={this?.other_black}
                  rowSpan={1}
                  colSpan={3}
                  leftMin={30}
                  leftMax={60}
                  cellClass={getClassNamesFromCellItemType(
                    ValueType.BLACK,
                    null
                  )}
                  onCellClick={onCellClick}
                  topMin={undefined}
                  topMax={undefined}
                />
                <td></td>
                <ChipComponent
                  currentItemChips={props?.chipsData?.placedChips?.get(
                    this?.other_odd
                  )}
                  tdKey={"td_other_odd"}
                  chipKey={"chip_other_odd"}
                  cell={this?.other_odd}
                  rowSpan={1}
                  colSpan={3}
                  leftMin={30}
                  leftMax={60}
                  cellClass={getClassNamesFromCellItemType(ValueType.ODD, null)}
                  onCellClick={onCellClick}
                  topMin={undefined}
                  topMax={undefined}
                />
                <td></td>
                <ChipComponent
                  currentItemChips={props?.chipsData?.placedChips.get(
                    this?.other_19_36
                  )}
                  tdKey={"td_other_19_36"}
                  chipKey={"chip_other_19_36"}
                  cell={this?.other_19_36}
                  rowSpan={1}
                  colSpan={3}
                  leftMin={30}
                  leftMax={60}
                  cellClass={getClassNamesFromCellItemType(
                    ValueType.NUMBERS_19_36,
                    null
                  )}
                  onCellClick={onCellClick}
                  topMin={undefined}
                  topMax={undefined}
                />
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Board;
