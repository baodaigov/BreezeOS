import { useState, useEffect } from "react";
import { setRecentResult } from "@/store/reducers/calculator";
import "@/components/utils/window/Window.scss";
import TopBar from "@/components/utils/window/TopBar";
import WindowBody from "@/components/utils/window/WindowBody";
import "./assets/calculator.scss";
import TopBarInteraction from "@/components/utils/window/TopBarInteraction";
import { useTranslation } from "react-i18next";
import Draggable from "react-draggable";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  hideApp,
  maximizeApp,
  minimizeApp,
  quitApp,
} from "@/store/reducers/apps";

export default function Calculator({ id }: { id: string }) {
  const dispatch = useAppDispatch();
  const appIsActive = useAppSelector((state) => state.apps.appIsActive);
  const isActive = appIsActive[id].status === "active";
  const isHide = appIsActive[id].status === "hide";
  const isMinimized = appIsActive[id].minimized;
  const { t } = useTranslation();
  const [keysType, setKeysType] = useState<string[][] | null>(null);
  const [isShift, setIsShift] = useState<boolean>(false);
  const [isRad, setIsRad] = useState<boolean>(false);
  const btnValues = [
    ["C", "+-", "%", "÷"],
    [7, 8, 9, "×"],
    [4, 5, 6, "-"],
    [1, 2, 3, "+"],
    [0, ".", "="],
  ];

  const advancedBtnValues = [
    ["(", ")", "MC", "M+", "M-", "MR"],
    ["Shift", "x²", "x³", "xʸ", "yˣ", "2ˣ"],
    ["1/x", "√x", "³√x", "ʸ√x", "logₓ", "log₂"],
    ["x!", "sin⁻¹", "cos⁻¹", "tan⁻¹", "e", "EE"],
    ["Rad", "sinh⁻¹", "cosh⁻¹", "tanh⁻¹", "π", "Rand"],
    ["(", ")", "MC", "M+", "M-", "MR"],
    ["Shift", "x²", "x³", "xʸ", "eˣ", "10ˣ"],
    ["1/x", "√x", "³√x", "ʸ√x", "ln", "log₁₀"],
    ["x!", "sin", "cos", "tan", "e", "EE"],
    ["Rad", "sinh", "cosh", "tanh", "π", "Rand"],
  ];

  useEffect(() => {
    const shiftKeys = JSON.parse(JSON.stringify(advancedBtnValues));

    if (isShift) {
      setKeysType(shiftKeys.splice(0, 5));
    } else {
      setKeysType(shiftKeys.splice(-5, 5));
    }
  }, [isShift]);

  const toLocaleString = (num: any) =>
    String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1");

  const removeSpaces = (num: any) => num.toString().replace(/\s/g, "");

  let [calc, setCalc] = useState<{
    sign: string;
    num: any;
    res: any;
  }>({
    sign: "",
    num: 0,
    res: 0,
  });

  const numClickHandler = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent> &
      React.ChangeEvent<HTMLDivElement>,
  ) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    if (removeSpaces(calc.num).length < 16) {
      setCalc({
        ...calc,
        num:
          calc.num === 0 && value === "0"
            ? "0"
            : removeSpaces(calc.num) % 1 === 0
            ? toLocaleString(Number(removeSpaces(calc.num + value)))
            : toLocaleString(calc.num + value),
        res: !calc.sign ? 0 : calc.res,
      });
    }
  };

  const commaClickHandler = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent> &
      React.ChangeEvent<HTMLDivElement>,
  ) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setCalc({
      ...calc,
      num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
    });
  };

  const signClickHandler = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent> &
      React.ChangeEvent<HTMLDivElement>,
  ) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setCalc({
      ...calc,
      sign: value,
      res: !calc.res && calc.num ? calc.num : calc.res,
      num: 0,
    });
  };

  const equalsClickHandler = () => {
    if (calc.sign && calc.num) {
      const math = (a: number, b: number, sign: string) =>
        sign === "+"
          ? a + b
          : sign === "-"
          ? a - b
          : sign === "×"
          ? a * b
          : a / b;

      setCalc({
        ...calc,
        res:
          calc.num === "0" && calc.sign === "÷"
            ? "Error"
            : toLocaleString(
                math(
                  Number(removeSpaces(calc.res)),
                  Number(removeSpaces(calc.num)),
                  calc.sign,
                ),
              ),
        sign: "",
        num: 0,
      });

      dispatch(
        setRecentResult(
          calc.num === "0" && calc.sign === "÷"
            ? "Error"
            : toLocaleString(
                math(
                  Number(removeSpaces(calc.res)),
                  Number(removeSpaces(calc.num)),
                  calc.sign,
                ),
              ),
        ),
      );
    }
  };

  const invertClickHandler = () => {
    setCalc({
      ...calc,
      num: calc.num ? toLocaleString(removeSpaces(calc.num) * -1) : 0,
      res: calc.res ? toLocaleString(removeSpaces(calc.res) * -1) : 0,
      sign: "",
    });
  };

  const percentClickHandler = () => {
    let num = calc.num ? parseFloat(removeSpaces(calc.num)) : 0;
    let res = calc.res ? parseFloat(removeSpaces(calc.res)) : 0;

    setCalc({
      ...calc,
      num: (num /= 100),
      res: (res /= 100),
      sign: "",
    });
  };

  const powerClickHandler = (value: number) => {
    let num = calc.num ? parseFloat(removeSpaces(calc.num)) : 0;
    let res = calc.res ? parseFloat(removeSpaces(calc.res)) : 0;

    setCalc({
      ...calc,
      num: Math.pow(num, value),
      res: Math.pow(res, value),
      sign: "",
    });
  };

  const equationPowerClickHandler = () => {
    let num = calc.num ? parseFloat(removeSpaces(calc.num)) : 0;
    let res = calc.res ? parseFloat(removeSpaces(calc.res)) : 0;

    setCalc({
      ...calc,
      num: Math.pow(Math.E, num),
      res: Math.pow(Math.E, res),
      sign: "",
    });
  };

  const tenPowerClickHandler = () => {
    let num = calc.num ? parseFloat(removeSpaces(calc.num)) : 0;
    let res = calc.res ? parseFloat(removeSpaces(calc.res)) : 0;

    setCalc({
      ...calc,
      num: Math.pow(10, num),
      res: Math.pow(10, res),
      sign: "",
    });
  };

  const twoPowerClickHandler = () => {
    let num = calc.num ? parseFloat(removeSpaces(calc.num)) : 0;
    let res = calc.res ? parseFloat(removeSpaces(calc.res)) : 0;

    setCalc({
      ...calc,
      num: Math.pow(2, num),
      res: Math.pow(2, res),
      sign: "",
    });
  };

  const fractionClickHandler = () => {
    let num = calc.num ? parseFloat(removeSpaces(calc.num)) : 0;
    let res = calc.res ? parseFloat(removeSpaces(calc.res)) : 0;

    setCalc({
      ...calc,
      num: 1 / num,
      res: 1 / res,
      sign: "",
    });
  };

  const squareRootClickHandler = () => {
    let num = calc.num ? parseFloat(removeSpaces(calc.num)) : 0;
    let res = calc.res ? parseFloat(removeSpaces(calc.res)) : 0;

    setCalc({
      ...calc,
      num: Math.sqrt(num),
      res: Math.sqrt(res),
      sign: "",
    });
  };

  const cubeRootClickHandler = () => {
    let num = calc.num ? parseFloat(removeSpaces(calc.num)) : 0;
    let res = calc.res ? parseFloat(removeSpaces(calc.res)) : 0;

    setCalc({
      ...calc,
      num: Math.cbrt(num),
      res: Math.cbrt(res),
      sign: "",
    });
  };

  const naturalLogarithmClickHandler = () => {
    let num = calc.num ? parseFloat(removeSpaces(calc.num)) : 0;
    let res = calc.res ? parseFloat(removeSpaces(calc.res)) : 0;

    setCalc({
      ...calc,
      num: Math.log(num),
      res: Math.log(res),
      sign: "",
    });
  };

  const naturalLogarithmBaseTenClickHandler = () => {
    let num = calc.num ? parseFloat(removeSpaces(calc.num)) : 0;
    let res = calc.res ? parseFloat(removeSpaces(calc.res)) : 0;

    setCalc({
      ...calc,
      num: Math.log10(num),
      res: Math.log10(res),
      sign: "",
    });
  };

  const sinClickHandler = () => {
    let num = calc.num ? parseFloat(removeSpaces(calc.num)) : 0;
    let res = calc.res ? parseFloat(removeSpaces(calc.res)) : 0;

    setCalc({
      ...calc,
      num: isRad ? Math.sin(num) : Math.sin(num * (Math.PI / 180)),
      res: isRad ? Math.sin(res) : Math.sin(res * (Math.PI / 180)),
      sign: "",
    });
  };

  const cosClickHandler = () => {
    let num = calc.num ? parseFloat(removeSpaces(calc.num)) : 0;
    let res = calc.res ? parseFloat(removeSpaces(calc.res)) : 0;

    setCalc({
      ...calc,
      num: isRad ? Math.cos(num) : Math.cos(num * (Math.PI / 180)),
      res: isRad ? Math.cos(res) : Math.cos(res * (Math.PI / 180)),
      sign: "",
    });
  };

  const tanClickHandler = () => {
    let num = calc.num ? parseFloat(removeSpaces(calc.num)) : 0;
    let res = calc.res ? parseFloat(removeSpaces(calc.res)) : 0;

    setCalc({
      ...calc,
      num: isRad ? Math.tan(num) : Math.tan(num * (Math.PI / 180)),
      res: isRad ? Math.tan(res) : Math.tan(res * (Math.PI / 180)),
      sign: "",
    });
  };

  const arcsinClickHandler = () => {
    let num = calc.num ? parseFloat(removeSpaces(calc.num)) : 0;
    let res = calc.res ? parseFloat(removeSpaces(calc.res)) : 0;

    setCalc({
      ...calc,
      num: isRad ? Math.asin(num) : Math.asin(num * (Math.PI / 180)),
      res: isRad ? Math.asin(res) : Math.asin(res * (Math.PI / 180)),
      sign: "",
    });
  };

  const arccosClickHandler = () => {
    let num = calc.num ? parseFloat(removeSpaces(calc.num)) : 0;
    let res = calc.res ? parseFloat(removeSpaces(calc.res)) : 0;

    setCalc({
      ...calc,
      num: isRad ? Math.acos(num) : Math.acos(num * (Math.PI / 180)),
      res: isRad ? Math.acos(res) : Math.acos(res * (Math.PI / 180)),
      sign: "",
    });
  };

  const arctanClickHandler = () => {
    let num = calc.num ? parseFloat(removeSpaces(calc.num)) : 0;
    let res = calc.res ? parseFloat(removeSpaces(calc.res)) : 0;

    setCalc({
      ...calc,
      num: isRad ? Math.atan(num) : Math.atan(num * (Math.PI / 180)),
      res: isRad ? Math.atan(res) : Math.atan(res * (Math.PI / 180)),
      sign: "",
    });
  };

  const sinhClickHandler = () => {
    let num = calc.num ? parseFloat(removeSpaces(calc.num)) : 0;
    let res = calc.res ? parseFloat(removeSpaces(calc.res)) : 0;

    setCalc({
      ...calc,
      num: Math.sinh(num),
      res: Math.sinh(res),
      sign: "",
    });
  };

  const coshClickHandler = () => {
    let num = calc.num ? parseFloat(removeSpaces(calc.num)) : 0;
    let res = calc.res ? parseFloat(removeSpaces(calc.res)) : 0;

    setCalc({
      ...calc,
      num: Math.cosh(num),
      res: Math.cosh(res),
      sign: "",
    });
  };

  const tanhClickHandler = () => {
    let num = calc.num ? parseFloat(removeSpaces(calc.num)) : 0;
    let res = calc.res ? parseFloat(removeSpaces(calc.res)) : 0;

    setCalc({
      ...calc,
      num: Math.tanh(num),
      res: Math.tanh(res),
      sign: "",
    });
  };

  const arcsinhClickHandler = () => {
    let num = calc.num ? parseFloat(removeSpaces(calc.num)) : 0;
    let res = calc.res ? parseFloat(removeSpaces(calc.res)) : 0;

    setCalc({
      ...calc,
      num: Math.asinh(num),
      res: Math.asinh(res),
      sign: "",
    });
  };

  const arccoshClickHandler = () => {
    let num = calc.num ? parseFloat(removeSpaces(calc.num)) : 0;
    let res = calc.res ? parseFloat(removeSpaces(calc.res)) : 0;

    setCalc({
      ...calc,
      num: Math.acosh(num),
      res: Math.acosh(res),
      sign: "",
    });
  };

  const arctanhClickHandler = () => {
    let num = calc.num ? parseFloat(removeSpaces(calc.num)) : 0;
    let res = calc.res ? parseFloat(removeSpaces(calc.res)) : 0;

    setCalc({
      ...calc,
      num: Math.atanh(num),
      res: Math.atanh(res),
      sign: "",
    });
  };

  const equationClickHandler = () => {
    setCalc({
      ...calc,
      num: Math.E,
      res: Math.E,
      sign: "",
    });
  };

  const factorialClickHandler = () => {
    let num = calc.num ? parseFloat(removeSpaces(calc.num)) : 0;
    let res = calc.res ? parseFloat(removeSpaces(calc.res)) : 0;

    function factorial(n: number) {
      let fact = 1;
      for (let i = 1; i <= n; i++) {
        fact *= i;
      }
      return fact;
    }

    setCalc({
      ...calc,
      num: factorial(num),
      res: factorial(res),
      sign: "",
    });
  };

  const randClickHandler = () => {
    setCalc({
      ...calc,
      num: Math.random(),
      res: Math.random(),
      sign: "",
    });
  };

  const piClickHandler = () => {
    setCalc({
      ...calc,
      num: Math.PI,
      res: Math.PI,
      sign: "",
    });
  };

  const resetClickHandler = () => {
    setCalc({
      ...calc,
      sign: "",
      num: 0,
      res: 0,
    });
  };

  return (
    <div className="CalculatorWindow">
      <Draggable handle="#TopBar">
        <div
          className={`Window calculator ${isActive && "active"} ${
            isHide && "hide"
          } ${isMinimized && "minimize"}`}
        >
          <TopBar
            title={t(`apps.${id}.name`)}
            onDblClick={() =>
              isMinimized
                ? dispatch(maximizeApp(id))
                : dispatch(minimizeApp(id))
            }
          >
            <TopBarInteraction
              action="hide"
              onHide={() => dispatch(hideApp(id))}
            />
            <TopBarInteraction
              action={isMinimized ? "max" : "min"}
              onMinMax={() =>
                isMinimized
                  ? dispatch(maximizeApp(id))
                  : dispatch(minimizeApp(id))
              }
            />
            <TopBarInteraction
              action="close"
              onClose={() => dispatch(quitApp(id))}
            />
          </TopBar>
          <WindowBody>
            <div className="Calculator">
              <div className="CalculatorScreen">
                <p>{calc.num ? calc.num : calc.res}</p>
              </div>
              <div className="CalculatorWrapper">
                <div
                  className={`CalculatorAdvanced ${!isMinimized && "expand"}`}
                >
                  <div
                    className="CalculatorSection"
                    style={{ paddingRight: 0 }}
                  >
                    {keysType?.flat().map((btn, i) => {
                      return (
                        <div
                          key={i}
                          className={`CalculatorButton ${
                            btn === "Shift" && `shift ${isShift && "active"}`
                          } ${btn === "Rad" && `rad ${isRad && "active"}`}`}
                          onClick={
                            btn === "Shift"
                              ? () => setIsShift(!isShift)
                              : btn === "√x"
                              ? squareRootClickHandler
                              : btn === "³√x"
                              ? cubeRootClickHandler
                              : btn === "x²"
                              ? () => powerClickHandler(2)
                              : btn === "x³"
                              ? () => powerClickHandler(3)
                              : btn === "eˣ"
                              ? equationPowerClickHandler
                              : btn === "10ˣ"
                              ? tenPowerClickHandler
                              : btn === "2ˣ"
                              ? twoPowerClickHandler
                              : btn === "1/x"
                              ? fractionClickHandler
                              : btn === "ln"
                              ? naturalLogarithmClickHandler
                              : btn === "log₁₀"
                              ? naturalLogarithmBaseTenClickHandler
                              : btn === "sin"
                              ? sinClickHandler
                              : btn === "cos"
                              ? cosClickHandler
                              : btn === "tan"
                              ? tanClickHandler
                              : btn === "sinh"
                              ? sinhClickHandler
                              : btn === "cosh"
                              ? coshClickHandler
                              : btn === "tanh"
                              ? tanhClickHandler
                              : btn === "sin⁻¹"
                              ? arcsinClickHandler
                              : btn === "cos⁻¹"
                              ? arccosClickHandler
                              : btn === "tan⁻¹"
                              ? arctanClickHandler
                              : btn === "sinh⁻¹"
                              ? arcsinhClickHandler
                              : btn === "cosh⁻¹"
                              ? arccoshClickHandler
                              : btn === "tanh⁻¹"
                              ? arctanhClickHandler
                              : btn === "e"
                              ? equationClickHandler
                              : btn === "x!"
                              ? factorialClickHandler
                              : btn === "Rand"
                              ? randClickHandler
                              : btn === "π"
                              ? piClickHandler
                              : btn === "Rad"
                              ? () => setIsRad(!isRad)
                              : undefined
                          }
                        >
                          {btn}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="CalculatorBasic">
                  <div className="CalculatorSection">
                    {btnValues.flat().map((btn, i) => {
                      return (
                        <div
                          key={i}
                          className={`CalculatorButton ${
                            btn === "=" && "equals"
                          }`}
                          onClick={
                            btn === "C"
                              ? resetClickHandler
                              : btn === "+-"
                              ? invertClickHandler
                              : btn === "%"
                              ? percentClickHandler
                              : btn === "="
                              ? equalsClickHandler
                              : btn === "÷" ||
                                btn === "×" ||
                                btn === "-" ||
                                btn === "+"
                              ? signClickHandler
                              : btn === "."
                              ? commaClickHandler
                              : numClickHandler
                          }
                        >
                          {btn}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </WindowBody>
        </div>
      </Draggable>
    </div>
  );
}
