import anime from "animejs";
import React, { useEffect } from "react";

const Wheel = (props) => {
  var totalNumbers = 37;
  var singleSpinDuration = 5000;
  var singleRotationDegree = 360 / totalNumbers;
  var lastNumber = 0;

  var rouletteWheelNumbers = props.rouletteData.numbers;
  console.log(props.rouletteData);
  console.log(props.number);

  const getRouletteIndexFromNumber = (number) => {
    return rouletteWheelNumbers.indexOf(parseInt(number));
  };

  const nextNumber = (number) => {
    var value = number;
    return value;
  };

  const getRotationFromNumber = (number) => {
    var index = getRouletteIndexFromNumber(number);
    return singleRotationDegree * index;
  };

  const getRandomEndRotation = (minNumberOfSpins, maxNumberOfSpins) => {
    var rotateTo = anime.random(
      minNumberOfSpins * totalNumbers,
      maxNumberOfSpins * totalNumbers
    );

    return singleRotationDegree * rotateTo;
  };

  const getZeroEndRotation = (totalRotation) => {
    var rotation = 360 - Math.abs(totalRotation % 360);

    return rotation;
  };

  const getBallEndRotation = (zeroEndRotation, currentNumber) => {
    return Math.abs(zeroEndRotation) + getRotationFromNumber(currentNumber);
  };

  const getBallNumberOfRotations = (minNumberOfSpins, maxNumberOfSpins) => {
    var numberOfSpins = anime.random(minNumberOfSpins, maxNumberOfSpins);
    return 360 * numberOfSpins;
  };

  function spinWheel(number) {
    const bezier = [0.165, 0.84, 0.44, 1.005];
    var ballMinNumberOfSpins = 2;
    var ballMaxNumberOfSpins = 4;
    var wheelMinNumberOfSpins = 2;
    var wheelMaxNumberOfSpins = 4;

    var currentNumber = nextNumber(number);

    var lastNumberRotation = getRotationFromNumber(lastNumber.toString());
    var endRotation = -getRandomEndRotation(
      ballMinNumberOfSpins,
      ballMaxNumberOfSpins
    );
    var zeroFromEndRotation = getZeroEndRotation(endRotation);
    var ballEndRotation =
      getBallNumberOfRotations(wheelMinNumberOfSpins, wheelMaxNumberOfSpins) +
      getBallEndRotation(zeroFromEndRotation, currentNumber);

    anime.set([".layer-2", ".layer-4"], {
      rotate: function () {
        return lastNumberRotation;
      },
    });

    anime.set(".ball-container", {
      rotate: function () {
        return 0;
      },
    });

    anime({
      targets: [".layer-2", ".layer-4"],
      rotate: function () {
        return endRotation;
      },
      duration: singleSpinDuration,
      easing: `cubicBezier(${bezier.join(",")})`,
      complete: function (anim) {
        lastNumber = currentNumber;
      },
    });

    anime({
      targets: ".ball-container",
      translateY: [
        { value: 0, duration: 2000 },
        { value: 20, duration: 1000 },
        { value: 25, duration: 900 },
        { value: 50, duration: 1000 },
      ],
      rotate: [{ value: ballEndRotation, duration: singleSpinDuration }],
      loop: 1,
      easing: `cubicBezier(${bezier.join(",")})`,
    });
  }

  useEffect(() => {
    var nextNumber = props.number.next;
    if (nextNumber != null && nextNumber !== "") {
      var nextNumberInt = parseInt(nextNumber);
      spinWheel(nextNumberInt);
    }
  }, [props]);

  return (
    <div className="roulette-wheel">
      <div
        className="layer-2 wheel"
        style={{ transform: "rotate(0deg)" }}
      ></div>
      <div className="layer-3"></div>
      <div
        className="layer-4 wheel"
        style={{ transform: "rotate(0deg)" }}
      ></div>
      <div className="layer-5"></div>
      <div className="mx-auto" style={{ transform: "rotate(0deg)" }}>
        <div
          className="ball"
          // style={{ transform: "translate(0, -163.221px)" }}
        ></div>
      </div>
    </div>
  );
};

export default Wheel;
