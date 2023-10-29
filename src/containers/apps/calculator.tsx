import { useState, useEffect } from "react";
import {
  setActive,
  setHide,
  setRecentResult,
} from "../../store/reducers/apps/calculator";
import "../../components/utils/window/Window.scss";
import TopBar from "../../components/utils/window/TopBar";
import WindowBody from "../../components/utils/window/WindowBody";
import DockItem from "../../components/dock/DockItem";
import "./assets/calculator.scss";
import TopBarInteraction from "../../components/utils/window/TopBarInteraction";
import StartApp from "../../components/startMenu/StartApp";
import { setHeaderHide } from "../../store/reducers/header";
import { useTranslation } from "react-i18next";
import { setStartMenuActive } from "../../store/reducers/startmenu";
import { setDesktopBodyActive } from "../../store/reducers/desktopbody";
import Draggable from "react-draggable";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export const CalculatorApp = () => {
  const { t } = useTranslation();
  const isActive = useAppSelector((state) => state.appsCalculator.active);
  const isHide = useAppSelector((state) => state.appsCalculator.hide);
  const recentResult = useAppSelector(
    (state) => state.appsCalculator.recentResult
  );
  const icon = useAppSelector((state) => state.appearance.iconTheme);
  const dispatch = useAppDispatch();

  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.keyCode === 55) {
      dispatch(setActive(true));
    }
  });

  return (
    <DockItem
      id="calculator"
      className={`CalculatorApp ${isActive && "clicked"} ${isHide && "hide"}`}
      title={t("apps.calculator.name")}
      icon={
        icon === "WhiteSur-icon-theme"
          ? "https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/original/calc.svg"
          : "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/accessories-calculator.svg"
      }
      menu={[
        [
          {
            label: t("apps.calculator.recentResult"),
            description: `${recentResult}`,
            disabled: !recentResult,
            action: () => navigator.clipboard.writeText(`${recentResult}`),
          },
          {
            label: isHide ? t("apps.unhide") : t("apps.hide"),
            disabled: isActive ? false : true,
            action: () =>
              isHide ? dispatch(setHide(false)) : dispatch(setHide(true)),
          },
          {
            label: isActive ? t("apps.quit") : t("apps.open"),
            action: () =>
              isActive ? dispatch(setActive(false)) : dispatch(setActive(true)),
          },
        ],
      ]}
      onClick={() =>
        isHide ? dispatch(setHide(false)) : dispatch(setActive(true))
      }
    />
  );
};

export const CalculatorStartApp = () => {
  const { t } = useTranslation();
  const isHide = useAppSelector((state) => state.appsCalculator.hide);
  const dispatch = useAppDispatch();
  const icon = useAppSelector((state) => state.appearance.iconTheme);

  const toggle = () => {
    dispatch(setStartMenuActive(false));
    dispatch(setHeaderHide(false));
    dispatch(setDesktopBodyActive(true));
    if (isHide) {
      dispatch(setHide(false));
    } else {
      dispatch(setActive(true));
    }
  };

  return (
    <StartApp
      key="calculator"
      icon={
        icon === "WhiteSur-icon-theme"
          ? "https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/original/calc.svg"
          : "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/accessories-calculator.svg"
      }
      name={t("apps.calculator.name")}
      onClick={toggle}
    />
  );
};

export default function Calculator() {
  const dispatch = useAppDispatch();
  const isActive = useAppSelector((state) => state.appsCalculator.active);
  const isHide = useAppSelector((state) => state.appsCalculator.hide);
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
      React.ChangeEvent<HTMLDivElement>
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
      React.ChangeEvent<HTMLDivElement>
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
      React.ChangeEvent<HTMLDivElement>
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
                  calc.sign
                )
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
                  calc.sign
                )
              )
        )
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

  const [min, isMin] = useState(true);

  function close() {
    dispatch(setActive(false));
    resetClickHandler();
  }

  return (
    <div className="CalculatorWindow">
      <Draggable handle=".TopBar">
        <div
          className={`Window calculator ${isActive && "active"} ${
            isHide && "hide"
          } ${min && "minimize"}`}
        >
          <TopBar
            title={t("apps.calculator.name")}
            onDblClick={() => isMin(!min)}
          >
            <TopBarInteraction
              action="hide"
              onHide={() => dispatch(setHide(true))}
            />
            <TopBarInteraction
              action={min ? "max" : "min"}
              onMinMax={() => isMin(!min)}
            />
            <TopBarInteraction action="close" onClose={close} />
          </TopBar>
          <WindowBody>
            <div className="Calculator">
              <div className="CalculatorScreen">
                <p>{calc.num ? calc.num : calc.res}</p>
              </div>
              <div className="CalculatorWrapper">
                <div className={`CalculatorAdvanced ${!min && "expand"}`}>
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
