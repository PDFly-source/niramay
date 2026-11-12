/**
 * Regression test for the duplicate-splash defect in the Android app.
 *
 * The app's WebView page carried its own BrandSplash. With broken (404) asset
 * paths it rendered as a blank cream screen with two broken-image icons right
 * after the native NiramaySplashView retired, before DisclaimerModal appeared.
 * Inside the AppMintly wrapper the web splash must not exist at all.
 *
 * These checks exercise the real component, not a copy of its logic.
 */
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import {
  BrandSplashMount,
  isNativeShell,
  splashAssets,
} from "../components/brand/BrandSplash";

let pass = 0;
const failures: string[] = [];

const check = (name: string, cond: boolean) => {
  if (cond) {
    pass += 1;
    console.log(`PASS  ${name}`);
  } else {
    failures.push(name);
    console.log(`FAIL  ${name}`);
  }
};

// --- native detection -------------------------------------------------------
check("native bridge reporting true is detected", isNativeShell({ AppMintlyNative: { isNativeApp: () => true } }));
check("native bridge reporting false is not native", !isNativeShell({ AppMintlyNative: { isNativeApp: () => false } }));
check("missing bridge is not native", !isNativeShell({}));
check("null bridge is not native", !isNativeShell({ AppMintlyNative: null }));
check("bridge without isNativeApp is not native", !isNativeShell({ AppMintlyNative: {} as never }));
check("throwing bridge is not native (fails open to the web splash)", !isNativeShell({ AppMintlyNative: { isNativeApp: () => { throw new Error("bridge"); } } }));
check("trusted-looking truthy string is not accepted as native", !isNativeShell({ AppMintlyNative: { isNativeApp: () => "true" as unknown as boolean } }));
check("no window at all (SSR pass) is not native", !isNativeShell(undefined));

// --- rendering: the wrapper must produce no splash markup -------------------
const stubWindow = (g: typeof globalThis, bridge: unknown) => {
  (g as { window?: unknown }).window = { AppMintlyNative: bridge };
};

stubWindow(globalThis, { isNativeApp: () => true });
const nativeMarkup = renderToStaticMarkup(React.createElement(BrandSplashMount));
check("native shell renders no splash markup at all", nativeMarkup === "");
check("native shell emits no bs-root element", !nativeMarkup.includes("bs-root"));
check("native shell emits no splash images", !nativeMarkup.includes("<img"));

stubWindow(globalThis, undefined);
const browserMarkup = renderToStaticMarkup(React.createElement(BrandSplashMount));
check("browser mount renders without throwing", typeof browserMarkup === "string");
check("browser mount does not emit native-only markup", !browserMarkup.includes("data-splash"));

// --- asset paths ------------------------------------------------------------
const deployed = splashAssets("/niramay");
check("mark resolves under the deployed base path", deployed.mark === "/niramay/brand/splash/mark.jpg");
check("wordmark resolves under the deployed base path", deployed.wordmark === "/niramay/brand/splash/wordmark.jpg");
check("dev base path has no doubled slash", !splashAssets("").mark.includes("//"));
// The default must follow the configured base path: "/brand/..." only when the
// site is served from the domain root (dev), "/niramay/brand/..." when deployed.
const configuredBase = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const defaults = splashAssets();
check(
  "default asset paths follow the configured base path",
  defaults.mark === `${configuredBase}/brand/splash/mark.jpg` &&
    defaults.wordmark === `${configuredBase}/brand/splash/wordmark.jpg`,
);

// --- integration: the layout mounts the gated wrapper -----------------------
const fs = require("fs") as typeof import("fs");
const layout = fs.readFileSync("app/layout.tsx", "utf8");
check("layout imports BrandSplashMount", layout.includes("BrandSplashMount"));
check("layout no longer mounts the raw BrandSplash", !/<BrandSplash\s*\/>/.test(layout));
const component = fs.readFileSync("components/brand/BrandSplash.tsx", "utf8");
check(
  "component source no longer uses root-absolute splash src",
  !/src="\/brand\/splash\//.test(component),
);
check(
  "native guard sits before the splash is made visible",
  component.indexOf("NATIVE_SHELL_AT_LOAD || isNativeShell()") < component.indexOf("setVisible(true)"),
);

console.log(`\n${pass}/${pass + failures.length} brand-splash checks passed`);
if (failures.length) {
  console.error(`FAILURES:\n- ${failures.join("\n- ")}`);
  process.exit(1);
}
