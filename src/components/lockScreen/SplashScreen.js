import React, { Component, useEffect, useState } from "react";
import { useBattery } from "react-use";
import "./LockScreen.scss";
import SplashScreenTime from "./SplashScreenTime";
import SplashScreenDate from "./SplashScreenDate";
import { useSelector, useDispatch } from "react-redux";
import { setLocked } from "../../reducers/settings";
import Avatar from "../Avatar";

export default function SplashScreen() {
  const settings = useSelector((state) => state.settings);
  const [passwordShown, setPasswordShown] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const [invalidCount, setInvalidCount] = useState(0);
  const invalidLimit = 7;
  const dispatch = useDispatch();

  function login() {
    dispatch(setLocked(false));
    setInvalidCount(0);
    setPasswordValue("");
  }

  function wrongPassword() {
    setInvalidCount((prev) => prev + 1);
    setPasswordValue("");
  }

  function action(e){
    if(e.key === "Enter"){
      if(passwordValue !== settings.user.password){
        wrongPassword();
      } else {
        login();
      }
    }
  }

  const batteryIcon = { icon: "fa-regular fa-battery-full" };

  const batteryState = useBattery();

  let batteryPercent = Math.round(batteryState.level * 100);

  return (
    <div className="SplashScreen">
      <div style={{ paddingTop: "60px" }}>
        <SplashScreenTime />
        <div className="SplashScreenDesc">
          <div className="SplashScreenItem">
            <SplashScreenDate />
          </div>
          <div className="SplashScreenItem">
            <i className={`${batteryIcon.icon} SplashScreenIcon`}></i>
            {isNaN(batteryPercent) ? "-" : batteryPercent + "%"}
          </div>
        </div>
      </div>
      <div className="SignInWrapper">
        <div className="SignInInfo">
          <Avatar size={40} />
          <p className="SignInName">{settings.user.name}</p>
        </div>
        <div className="SignIn">
          {settings.user.password ? (
            <>
              {invalidCount === invalidLimit ? (
                <p>{invalidLimit} invalid times. Try again for 1 minute.</p>
              ) : (
                <>
                  <div className="SignInPassword">
                    <input
                      type={passwordShown ? "text" : "password"}
                      value={passwordValue}
                      placeholder="Enter password..."
                      onInput={(e) => setPasswordValue(e.target.value)}
                      onKeyDown={action}
                    ></input>
                    {passwordValue.length !== 0 && (
                      <div
                        className="SignInRevealAndClear"
                        onClick={() =>
                          passwordShown
                            ? setPasswordShown(false)
                            : setPasswordShown(true)
                        }
                      >
                        <i
                          className={`fa-regular ${
                            passwordShown ? "fa-eye-slash" : "fa-eye"
                          }`}
                        ></i>
                      </div>
                    )}
                  </div>
                  <div
                    className={`LoginButton ${
                      passwordValue.length === 0 && "disabled"
                    }`}
                    onClick={
                      passwordValue !== settings.user.password
                        ? wrongPassword
                        : login
                    }
                  >
                    <i className="fa-regular fa-arrow-right SplashScreenIcon"></i>
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="LoginButton" onClick={login}>
              <i className="fa-regular fa-arrow-right SplashScreenIcon"></i>
            </div>
          )}
        </div>
        {invalidCount !== invalidLimit && (
          <p
            className="SignInFailedAttempts"
            style={{ opacity: invalidCount ? "1" : "0" }}
          >
            {invalidCount} failed {invalidCount > 1 ? "attempts" : "attempt"}
          </p>
        )}
      </div>
    </div>
  );
}
