import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {setActive, setHide} from "../../reducers/apps/calculator";
import '../../components/utils/window/Window.scss';
import TopBar from '../../components/utils/window/TopBar';
import WindowBody from '../../components/utils/window/WindowBody';
import DockItem from '../../components/DockItem';
import './assets/calculator.scss';
import TopBarInteraction from '../../components/utils/window/TopBarInteraction';
import StartApp from '../../components/startMenu/StartApp';
import {setHeaderActive} from "../../reducers/header";

export const CalculatorApp = () => {
  const isActive = useSelector(state => state.appsCalculator.active);
  const isHide = useSelector(state => state.appsCalculator.hide);
  const icon = useSelector(state => state.appearance.iconTheme);
  const dispatch = useDispatch();

  document.addEventListener('keydown', (e) => {
    if(e.ctrlKey && e.keyCode === 55){
      dispatch(setActive(true));
    }
  });

  useEffect(() => {
    if(isActive){
      document.getElementsByClassName('CalculatorApp')[0].classList.add('clicked');
      setTimeout(() => document.getElementsByClassName('calculator')[0].classList.add('active'), 500);
    } else {
      document.getElementsByClassName('CalculatorApp')[0].classList.remove('clicked');
      document.getElementsByClassName('calculator')[0].classList.remove('active');
    }
    if(isHide){
      document.getElementsByClassName('CalculatorApp')[0].classList.add('hide');
      document.getElementsByClassName('calculator')[0].classList.add('hide');
    } else {
      document.getElementsByClassName('CalculatorApp')[0].classList.remove('hide');
      document.getElementsByClassName('calculator')[0].classList.remove('hide');
    }
  }, [isActive, isHide]);
    
	return (
    <DockItem id='calculator' class="CalculatorApp" title='Calculator' icon={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/original/calc.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/accessories-calculator.svg'} onClick={() => isHide ? dispatch(setHide(false)) : dispatch(setActive(true))}/>
	)
};

export const CalculatorStartApp = () => {
    const isHide = useSelector(state => state.appsCalculator.hide);
    const dispatch = useDispatch();
    const icon = useSelector(state => state.appearance.iconTheme);
    
    const toggle = () => {
        document.getElementsByClassName('StartMenuWrapper')[0].classList.remove('active');
        dispatch(setHeaderActive(true));
        document.getElementsByClassName('DesktopBody')[0].classList.add('active');
        if(isHide){
          dispatch(setHide(false));
        } else {
          dispatch(setActive(true));
        }
    };

    return (
        <StartApp key='calculator' icon={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/original/calc.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/accessories-calculator.svg'} name='Calculator' onClick={toggle}/>
    )
}

export default function Calculator() {
    const dispatch = useDispatch();

    const CalculatorWindow = () => {
        const btnValues = [
          ["C", "+-", "%", "÷"],
          [7, 8, 9, "×"],
          [4, 5, 6, "-"],
          [1, 2, 3, "+"],
          [0, ".", "="],
        ];
        
        const toLocaleString = (num) =>
          String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1");
        
        const removeSpaces = (num) => num.toString().replace(/\s/g, "");

        let [calc, setCalc] = useState({
          sign: "",
          num: 0,
          res: 0,
        });
      
        const numClickHandler = (e) => {
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
      
        const commaClickHandler = (e) => {
          e.preventDefault();
          const value = e.target.innerHTML;
      
          setCalc({
            ...calc,
            num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
          });
        };
      
        const signClickHandler = (e) => {
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
            const math = (a, b, sign) =>
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
            num: (num /= Math.pow(100, 1)),
            res: (res /= Math.pow(100, 1)),
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

        function close(){
            dispatch(setActive(false));
            resetClickHandler();
        }

        return (
            <>
                <TopBar title='Calculator'>
                    <TopBarInteraction action='hide' onHide={() => dispatch(setHide(true))}/>
                    <TopBarInteraction action='close' onClose={close}/>
                </TopBar>
                <WindowBody>
                    <div className='Calculator'>
                        <div className='CalculatorScreen'>
                            <p>{calc.num ? calc.num : calc.res}</p>
                        </div>
                        <div className='CalculatorSection'>
                            {btnValues.flat().map((btn, i) => {
                                return (
                                    <div key={i} className={`CalculatorButton ${btn === "=" ? "equals" : ""}`} onClick={
                                            btn === "C"
                                            ? resetClickHandler
                                            : btn === "+-"
                                            ? invertClickHandler
                                            : btn === "%"
                                            ? percentClickHandler
                                            : btn === "="
                                            ? equalsClickHandler
                                            : btn === "÷" || btn === "×" || btn === "-" || btn === "+"
                                            ? signClickHandler
                                            : btn === "."
                                            ? commaClickHandler
                                            : numClickHandler
                                        }
                                    >{btn}</div>
                                );
                            })}
                        </div>
                    </div>
                </WindowBody>
            </>
        )
    }

    return (
        <div className='CalculatorWindow'>   
                <div
                    className='Window calculator'
                    key={Math.random()}
                >
                    <CalculatorWindow/>
                </div> 
        </div>
    )
}
