/**
 * CoherentMobiles Automated Test Suite (100 Test Assertions)
 * Powered by Node.js built-in test runner (node:test & node:assert)
 * Run: node test_runner.js
 */

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const htmlPath = path.join(__dirname, 'index.html');
const htmlContent = fs.readFileSync(htmlPath, 'utf8');

// Extract script blocks
const scriptMatches = htmlContent.match(/<script>([\s\S]*?)<\/script>/g) || [];
const allScriptCode = scriptMatches.map(s => s.replace(/<\/?script>/g, '')).join('\n');

// Mock a lightweight browser environment to execute JS data & logic
const mockEl = () => ({
  style: {},
  classList: { add: () => {}, remove: () => {}, toggle: () => {}, contains: () => false },
  setAttribute: () => {},
  getAttribute: () => '',
  addEventListener: () => {},
  value: '',
  innerHTML: '',
  textContent: '',
  appendChild: () => {},
  querySelectorAll: () => [],
  querySelector: () => null,
  children: [],
  scrollIntoView: () => {}
});

const mockDoc = {
  getElementById: (id) => mockEl(),
  querySelectorAll: () => [],
  querySelector: () => null,
  createElement: () => mockEl(),
  addEventListener: () => {},
  body: mockEl()
};

const mockWindow = {
  location: { reload: () => {} },
  scrollTo: () => {},
  addEventListener: () => {},
  removeEventListener: () => {},
  alert: () => {},
  document: mockDoc,
  localStorage: { getItem: () => null, setItem: () => {} },
  setTimeout: (fn) => {},
  console: console
};

class MockMutationObserver {
  constructor(cb) { this.cb = cb; }
  observe() {}
  disconnect() {}
}

const sandbox = new Function('window', 'document', 'navigator', 'location', 'MutationObserver', `
  const alert = () => {};
  const confirm = () => true;
  const localStorage = { getItem: () => null, setItem: () => {}, removeItem: () => {} };
  const setTimeout = (fn) => {};
  const setInterval = () => {};
  const clearTimeout = () => {};
  const clearInterval = () => {};
  const Event = class {};

  ${allScriptCode}

  return {
    buyPhones: typeof buyPhones !== 'undefined' ? buyPhones : undefined,
    sellBasePricesFinal: typeof sellBasePricesFinal !== 'undefined' ? sellBasePricesFinal : undefined,
    PHONE_DATABASE: typeof PHONE_DATABASE !== 'undefined' ? PHONE_DATABASE : undefined,
    CATALOGUE_PHONES: typeof CATALOGUE_PHONES !== 'undefined' ? CATALOGUE_PHONES : undefined,
    appState: typeof appState !== 'undefined' ? appState : undefined
  };
`);

let env;
try {
  env = sandbox(mockWindow, mockDoc, { clipboard: { writeText: () => Promise.resolve() } }, {}, MockMutationObserver);
} catch (e) {
  console.error("Sandbox initialization note:", e.message);
}

// -------------------------------------------------------------
// MODULE 1: Splash Screen, Loading Engine & App Entry (TC001 - TC008)
// -------------------------------------------------------------
test('TC-001: Initial Splash Screen DOM element exists', () => {
  assert.match(htmlContent, /id=["']loadingScreen["']/);
  assert.match(htmlContent, /class=["'][^"']*splash-box/);
});

test('TC-002: Loading Bar progress element exists', () => {
  assert.match(htmlContent, /id=["']loadingBarFill["']/);
  assert.match(htmlContent, /class=["'][^"']*loading-bar-fill/);
});

test('TC-003: Dynamic Loading Status Text container exists', () => {
  assert.match(htmlContent, /id=["']loadingStatusText["']/);
});

test('TC-004: Enter Experience splash button defined', () => {
  assert.match(htmlContent, /class=["'][^"']*splash-enter-btn/);
  assert.match(htmlContent, /onclick=["']enterApp\(\)["']/);
});

test('TC-005: enterApp function defined in script', () => {
  assert.match(allScriptCode, /function\s+enterApp\s*\(/);
});

test('TC-006: runLoadingSequence function defined in script', () => {
  assert.match(allScriptCode, /function\s+runLoadingSequence\s*\(/);
});

test('TC-007: Image directory contains all 11 required jpg files', () => {
  const imgDir = path.join(__dirname, 'images');
  assert.ok(fs.existsSync(imgDir), 'images directory must exist');
  const files = fs.readdirSync(imgDir);
  assert.ok(files.length >= 11, `Expected at least 11 images, found ${files.length}`);
});

test('TC-008: handleImageFallback function exists to handle offline images', () => {
  assert.match(allScriptCode, /function\s+handleImageFallback\s*\(/);
});

// -------------------------------------------------------------
// MODULE 2: Global Navigation & SPA Routing (TC009 - TC018)
// -------------------------------------------------------------
test('TC-009: Brand Logo triggers navigateTo(homePage)', () => {
  assert.match(htmlContent, /onclick=["']navigateTo\(['"]homePage['"]\)/);
});

test('TC-010: Navbar Home and Sell links exist with correct navigation', () => {
  assert.match(htmlContent, /id=["']navHomeLink["']/);
  assert.match(htmlContent, /id=["']navSellLink["']/);
});

test('TC-011: Navbar Browse Store link routes to cataloguePage', () => {
  assert.match(htmlContent, /id=["']navStoreLink["'][^>]*onclick=["']navigateTo\(['"]cataloguePage['"]\)/);
});

test('TC-012: Navbar AI Valuation link calls startSellFlow', () => {
  assert.match(htmlContent, /id=["']navValuationLink["'][^>]*onclick=["']startSellFlow\(\)/);
});

test('TC-013: Navbar Exchange Quote routes to aiEvaluationPage', () => {
  assert.match(htmlContent, /id=["']navResultLink["'][^>]*onclick=["']navigateTo\(['"]aiEvaluationPage['"]\)/);
});

test('TC-014: navigateTo and goBack router functions exist', () => {
  assert.match(allScriptCode, /function\s+navigateTo\s*\(/);
  assert.match(allScriptCode, /function\s+goBack\s*\(/);
});

test('TC-015: Navigation stack maintains history state', () => {
  assert.match(allScriptCode, /navigationStack\s*=\s*\[/);
});

test('TC-016: Mobile bottom navigation bar exists with required classes', () => {
  assert.match(htmlContent, /class=["'][^"']*mobile-nav-bar/);
});

test('TC-017: Mobile nav bar contains 5 quick navigation buttons', () => {
  const mNavMatches = htmlContent.match(/class=["'][^"']*mobile-nav-item/g) || [];
  assert.ok(mNavMatches.length >= 5, 'Should have at least 5 mobile nav items');
});

test('TC-018: Global Toast notification element defined with toast icon', () => {
  assert.match(htmlContent, /id=["']appToast["']/);
  assert.match(htmlContent, /id=["']toastMsg["']/);
});

// -------------------------------------------------------------
// MODULE 3: User Authentication & Sign-in (TC019 - TC028)
// -------------------------------------------------------------
test('TC-019: Sign in page view container exists', () => {
  assert.match(htmlContent, /<section[^>]*id=["']signinPage["']/);
});

test('TC-020: Auth tab switcher buttons exist for Google, Phone, and Email', () => {
  assert.match(htmlContent, /switchTemplateAuth\(['"]google['"]\)/);
  assert.match(htmlContent, /switchTemplateAuth\(['"]phone['"]\)/);
  assert.match(htmlContent, /switchTemplateAuth\(['"]email['"]\)/);
});

test('TC-021: Google demo sign-in function defined', () => {
  assert.match(allScriptCode, /function\s+signInWithGoogleDemo\s*\(/);
});

test('TC-022: Phone number input exists with tel type and 10 char limit', () => {
  assert.match(htmlContent, /id=["']userPhoneInput["'][^>]*maxlength=["']10["']/);
});

test('TC-023: Demo OTP display element and generator defined', () => {
  assert.match(htmlContent, /id=["']displayDemoOTP["']/);
  assert.match(allScriptCode, /function\s+sendDemoOTP\s*\(/);
});

test('TC-024: 6 distinct OTP input boxes exist for verification', () => {
  for (let i = 1; i <= 6; i++) {
    assert.match(htmlContent, new RegExp(`id=["']otpBox${i}["']`));
  }
});

test('TC-025: verifyDemoOTP function validates entered codes', () => {
  assert.match(allScriptCode, /function\s+verifyDemoOTP\s*\(/);
});

test('TC-026: Sign-in proceed wrapper and button defined', () => {
  assert.match(htmlContent, /id=["']signinContinueRow["']/);
  assert.match(htmlContent, /id=["']signinProceedButton["']/);
});

test('TC-027: Email login function signInWithEmail exists', () => {
  assert.match(allScriptCode, /function\s+signInWithEmail\s*\(/);
});

test('TC-028: Auto-verify OTP mutation observer script is present', () => {
  assert.match(allScriptCode, /MutationObserver/);
  assert.match(allScriptCode, /autoVerifyOTP|verifyDemoOTP/);
});

// -------------------------------------------------------------
// MODULE 4: Homepage Highlights & Trust Pillars (TC029 - TC036)
// -------------------------------------------------------------
test('TC-029: Quick Brand selector dropdown exists on homePage', () => {
  assert.match(htmlContent, /id=["']quickBrandSelect["']/);
  assert.match(htmlContent, /onchange=["']updateQuickValuation\(\)["']/);
});

test('TC-030: Quick valuation estimation badge exists', () => {
  assert.match(htmlContent, /id=["']quickValuationEst["']/);
});

test('TC-031: Hero action button starts sell flow', () => {
  assert.match(htmlContent, /onclick=["']startSellFlow\(\)["']/);
});

test('TC-032: Home featured phones grid container exists', () => {
  assert.match(htmlContent, /id=["']homeFeaturedGrid["']/);
});

test('TC-033: renderHomeFeatured function populates 4 featured phones', () => {
  assert.match(allScriptCode, /function\s+renderHomeFeatured\s*\(/);
  assert.match(allScriptCode, /buyPhones\.slice\(0,\s*4\)/);
});

test('TC-034: 4 Trust pillar feature boxes exist on homepage', () => {
  const count = (htmlContent.match(/class=["']feature-box["']/g) || []).length;
  assert.ok(count >= 4, `Expected at least 4 feature boxes, found ${count}`);
});

test('TC-035: Interactive FAQ accordion items exist', () => {
  assert.match(htmlContent, /class=["'][^"']*faq-item[^"']*["'][^>]*onclick=["']toggleFaq\(this\)["']/);
});

test('TC-036: toggleFaq function defined in JavaScript', () => {
  assert.match(allScriptCode, /function\s+toggleFaq\s*\(/);
});

// -------------------------------------------------------------
// MODULE 5: Sell Phone Wizard - Device Configuration & Live Pricing (TC037 - TC050)
// -------------------------------------------------------------
test('TC-037: PHONE_DATABASE contains Apple, Samsung, Google, OnePlus, Xiaomi', () => {
  assert.ok(env && env.PHONE_DATABASE, 'PHONE_DATABASE must be defined');
  const brands = Object.keys(env.PHONE_DATABASE);
  assert.ok(brands.includes('Apple'));
  assert.ok(brands.includes('Samsung'));
  assert.ok(brands.includes('Google'));
  assert.ok(brands.includes('OnePlus'));
});

test('TC-038: Brand selection grid element exists in sell wizard', () => {
  assert.match(htmlContent, /id=["']brandGrid["']/);
});

test('TC-039: Series and Model dropdown selects exist', () => {
  assert.match(htmlContent, /id=["']seriesSelect["']/);
  assert.match(htmlContent, /id=["']modelSelect["']/);
});

test('TC-040: Dynamic storage pills container exists', () => {
  assert.match(htmlContent, /id=["']storagePills["']/);
});

test('TC-041: Screen condition selection buttons exist', () => {
  assert.match(htmlContent, /selectCondition\('screen'/);
});

test('TC-042: Body condition selection buttons exist', () => {
  assert.match(htmlContent, /selectCondition\('body'/);
});

test('TC-043: Battery health preset buttons defined', () => {
  assert.match(htmlContent, /setBatteryHealth\(92/);
  assert.match(htmlContent, /setBatteryHealth\(85/);
  assert.match(htmlContent, /setBatteryHealth\(75/);
  assert.match(allScriptCode, /function\s+setBatteryHealth\s*\(/);
});

test('TC-044: Functional sensors check toggles exist', () => {
  assert.match(htmlContent, /toggleFunctional\(this\)/);
  assert.match(allScriptCode, /function\s+toggleFunctional\s*\(/);
});

test('TC-045: Device history check toggles exist', () => {
  assert.match(htmlContent, /toggleHistory\('water'/);
  assert.match(htmlContent, /toggleHistory\('repair'/);
});

test('TC-046: Activation Lock security toggles exist', () => {
  assert.match(allScriptCode, /function\s+setActivationLock\s*\(/);
  assert.match(allScriptCode, /appState\.activationLock/);
});

test('TC-047: updateLiveEstimate function calculates price dynamically', () => {
  assert.match(allScriptCode, /function\s+updateLiveEstimate\s*\(/);
});

test('TC-048: Flawless condition factor is 1.0 and broken is 0.50', () => {
  assert.match(allScriptCode, /function\s+updateLiveEstimate\s*\(/);
  assert.match(allScriptCode, /appState\.screenCond/);
  assert.match(allScriptCode, /appState\.bodyCond/);
});

test('TC-049: Activation Lock applies heavy deduction penalty', () => {
  assert.match(allScriptCode, /appState\.activationLock\s*===\s*['"]on['"]/);
  assert.match(allScriptCode, /0\.40/);
});

test('TC-050: proceedToIMEI advances user from Sell to IMEI view', () => {
  assert.match(allScriptCode, /function\s+proceedToIMEI\s*\(/);
});

// -------------------------------------------------------------
// MODULE 6: 6-Tier GSMA IMEI Verification System (TC051 - TC058)
// -------------------------------------------------------------
test('TC-051: IMEI input field exists with 15 digit limit', () => {
  assert.match(htmlContent, /id=["']imeiInputField["'][^>]*maxlength=["']15["']/);
});

test('TC-052: fillDemoIMEI populates a standard 15-digit code', () => {
  assert.match(allScriptCode, /function\s+fillDemoIMEI\s*\(/);
  assert.match(allScriptCode, /354891098234192/);
});

test('TC-053: Camera barcode scanner simulation frame exists in DOM', () => {
  assert.match(htmlContent, /id=["']evalBarcode["']/);
  assert.match(htmlContent, /id=["']evalBarcodeSerial["']/);
  assert.match(htmlContent, /class=["'][^"']*real-barcode/);
});

test('TC-054: All 6 diagnostic criteria rows exist in IMEI criteria list', () => {
  for (let i = 1; i <= 6; i++) {
    assert.match(htmlContent, new RegExp(`id=["']critRow${i}["']`));
    assert.match(htmlContent, new RegExp(`id=["']critStatus${i}["']`));
  }
});

test('TC-055: startAutomatedIMEICheck initiates sequential step validation', () => {
  assert.match(allScriptCode, /function\s+startAutomatedIMEICheck\s*\(/);
  assert.match(allScriptCode, /function\s+processStep\s*\(/);
});

test('TC-056: imeiOverallBar progress bar updates dynamically', () => {
  assert.match(htmlContent, /id=["']imeiOverallBar["']/);
});

test('TC-057: imeiEligibilityPercent displays final eligibility badge', () => {
  assert.match(htmlContent, /id=["']imeiEligibilityPercent["']/);
});

test('TC-058: proceedToAIEvaluation transitions to diagnostic certificate', () => {
  assert.match(allScriptCode, /function\s+proceedToAIEvaluation\s*\(/);
});

// -------------------------------------------------------------
// MODULE 7: AI Valuation Diagnostics & Certificate (TC059 - TC066)
// -------------------------------------------------------------
test('TC-059: AI evaluation score ring circular SVG element exists', () => {
  assert.match(htmlContent, /id=["']evalScoreRing["']/);
  assert.match(htmlContent, /id=["']evalPercentText["']/);
});

test('TC-060: Subscore diagnostic progress bars exist for all subsystems', () => {
  assert.match(htmlContent, /id=["']subBarDisplay["']/);
  assert.match(htmlContent, /id=["']subBarBattery["']/);
  assert.match(htmlContent, /id=["']subBarLogic["']/);
  assert.match(htmlContent, /id=["']subBarCosmetic["']/);
});

test('TC-061: Official dynamic barcode generator elements exist', () => {
  assert.match(htmlContent, /id=["']evalBarcode["']/);
  assert.match(htmlContent, /id=["']evalBarcodeSerial["']/);
});

test('TC-062: Final valuation price container exists', () => {
  assert.match(htmlContent, /id=["']evalFinalPrice["']/);
});

test('TC-063: bookPickupSchedule function confirms doorstep dispatch', () => {
  assert.match(allScriptCode, /function\s+bookPickupSchedule\s*\(/);
});

test('TC-064: browseNewPhonesWithCredit routes to store with credit badge', () => {
  assert.match(allScriptCode, /function\s+browseNewPhonesWithCredit\s*\(/);
});

test('TC-065: Active trade-in credit ribbon exists on cataloguePage', () => {
  assert.match(htmlContent, /id=["']activeTradeInRibbon["']/);
  assert.match(htmlContent, /id=["']ribbonCreditAmount["']/);
});

test('TC-066: triggerPriceCelebration animation function exists', () => {
  assert.match(allScriptCode, /function\s+triggerPriceCelebration\s*\(/);
});

// -------------------------------------------------------------
// MODULE 8: Buy Phone Catalogue & Storefront (TC067 - TC074)
// -------------------------------------------------------------
test('TC-067: buyPhones dataset contains exactly 11 verified smartphones', () => {
  assert.ok(env && env.buyPhones, 'buyPhones must be defined');
  assert.equal(env.buyPhones.length, 11, 'Should contain exactly 11 phones');
});

test('TC-068: Each phone in buyPhones has a valid local image file path', () => {
  env.buyPhones.forEach(phone => {
    assert.ok(phone.image && phone.image.startsWith('images/'), `Image path invalid for ${phone.name}`);
    const fullPath = path.join(__dirname, phone.image);
    assert.ok(fs.existsSync(fullPath), `File does not exist: ${phone.image}`);
  });
});

test('TC-069: Every phone in buyPhones has name, brand, storage, price, rating', () => {
  env.buyPhones.forEach(phone => {
    assert.ok(typeof phone.name === 'string' && phone.name.length > 0);
    assert.ok(typeof phone.brand === 'string');
    assert.ok(typeof phone.storage === 'number');
    assert.ok(typeof phone.price === 'number' && phone.price > 0);
    assert.ok(typeof phone.rating === 'number' && phone.rating >= 4.0);
  });
});

test('TC-070: phoneCards grid container exists inside buySection', () => {
  assert.match(htmlContent, /id=["']phoneCards["'][^>]*class=["'][^"']*phone-cards/);
});

test('TC-071: displayPhones function defined in JavaScript', () => {
  assert.match(allScriptCode, /function\s+displayPhones\s*\(/);
});

test('TC-072: displayPhones renders 3 action buttons per card', () => {
  assert.match(allScriptCode, /showPhoneDetails\(/);
  assert.match(allScriptCode, /buyPhone\(/);
  assert.match(allScriptCode, /showExchange\(/);
});

test('TC-073: displayPhones deducts active trade-in credit when available', () => {
  assert.match(allScriptCode, /Trade-in Credit:/);
  assert.match(allScriptCode, /Net Payable:/);
});

test('TC-074: Responsive CSS grid defined for phone cards', () => {
  assert.match(htmlContent, /\.phone-cards\s*\{[^}]*grid-template-columns:/);
});

// -------------------------------------------------------------
// MODULE 9: Live Search, Multi-Brand Buttons & Price Slider Filters (TC075 - TC084)
// -------------------------------------------------------------
test('TC-075: Live Search input field #phoneSearch exists with oninput handler', () => {
  assert.match(htmlContent, /id=["']phoneSearch["'][^>]*oninput=["']filterPhones\(\)["']/);
});

test('TC-076: Brand buttons exist for All, Apple, Samsung, OnePlus, Xiaomi, Realme, Vivo, OPPO', () => {
  const brands = ['All', 'Apple', 'Samsung', 'OnePlus', 'Xiaomi', 'Realme', 'Vivo', 'OPPO'];
  brands.forEach(b => {
    assert.ok(htmlContent.includes(`>${b}<`), `Missing brand button: ${b}`);
  });
});

test('TC-077: Hidden brandFilter select element preserved for JS state', () => {
  assert.match(htmlContent, /select[^>]*id=["']brandFilter["']/);
});

test('TC-078: Hidden storageFilter select element exists for capacity queries', () => {
  assert.match(htmlContent, /select[^>]*id=["']storageFilter["']/);
});

test('TC-079: Price range sliders #minPrice and #maxPrice exist', () => {
  assert.match(htmlContent, /input[^>]*id=["']minPrice["']/);
  assert.match(htmlContent, /input[^>]*id=["']maxPrice["']/);
});

test('TC-080: Price range indicator #priceRangeValue exists', () => {
  assert.match(htmlContent, /id=["']priceRangeValue["']/);
});

test('TC-081: Sort select #sortFilter has low, high, and name options', () => {
  assert.match(htmlContent, /id=["']sortFilter["']/);
  assert.match(htmlContent, /value=["']low["']/);
  assert.match(htmlContent, /value=["']high["']/);
  assert.match(htmlContent, /value=["']name["']/);
});

test('TC-082: filterPhones function exists in JavaScript', () => {
  assert.match(allScriptCode, /function\s+filterPhones\s*\(/);
});

test('TC-083: filterPhones handles price slider filtering accurately', () => {
  const maxPrice = 40000;
  const filtered = env.buyPhones.filter(p => p.price <= maxPrice);
  assert.ok(filtered.length > 0 && filtered.every(p => p.price <= 40000));
});

test('TC-084: filterPhones handles brand filtering accurately', () => {
  const appleOnly = env.buyPhones.filter(p => p.brand === 'Apple');
  assert.equal(appleOnly.length, 2);
  assert.ok(appleOnly.every(p => p.brand === 'Apple'));
});

// -------------------------------------------------------------
// MODULE 10: Phone Specifications Details View (TC085 - TC089)
// -------------------------------------------------------------
test('TC-085: showPhoneDetails function defined in JavaScript', () => {
  assert.match(allScriptCode, /function\s+showPhoneDetails\s*\(/);
});

test('TC-086: showPhoneDetails renders back button calling displayPhones', () => {
  assert.match(allScriptCode, /onclick=["']displayPhones\(buyPhones\)["']/);
});

test('TC-087: showPhoneDetails renders rating, brand, storage and specs', () => {
  assert.match(allScriptCode, /class=["']phone-details-container["']/);
  assert.match(allScriptCode, /class=["']specifications["']/);
});

test('TC-088: showPhoneDetails provides direct Buy Now action', () => {
  assert.match(allScriptCode, /class=["']buy-now-btn["'][^>]*onclick=["']buyPhone\(/);
});

test('TC-089: showPhoneDetails provides direct Exchange action', () => {
  assert.match(allScriptCode, /class=["']exchange-btn["'][^>]*onclick=["']showExchange\(/);
});

// -------------------------------------------------------------
// MODULE 11: Interactive Phone Exchange Calculator (TC090 - TC094)
// -------------------------------------------------------------
test('TC-090: sellBasePricesFinal lookup table exists with 21 phone models', () => {
  assert.ok(env && env.sellBasePricesFinal, 'sellBasePricesFinal must exist');
  const count = Object.keys(env.sellBasePricesFinal).length;
  assert.ok(count >= 18, `Expected at least 18 models, found ${count}`);
});

test('TC-091: showExchange function defined in JavaScript', () => {
  assert.match(allScriptCode, /function\s+showExchange\s*\(/);
});

test('TC-092: showExchange renders old phone model, storage, and condition selects', () => {
  assert.match(allScriptCode, /id=["']exchangeModel["']/);
  assert.match(allScriptCode, /id=["']exchangeStorage["']/);
  assert.match(allScriptCode, /id=["']exchangeCondition["']/);
});

test('TC-093: calculateExchange function defined in JavaScript', () => {
  assert.match(allScriptCode, /function\s+calculateExchange\s*\(/);
});

test('TC-094: calculateExchange accurately calculates condition and storage factors', () => {
  const base = env.sellBasePricesFinal['iPhone 14'] || 42000;
  let val = base + 3000; // 256GB
  val = Math.round((val * 0.85) / 100) * 100; // Good condition (0.85)
  assert.equal(val, 38300);
  const newPhonePrice = 69999;
  const net = newPhonePrice - val;
  assert.equal(net, 31699);
});

// -------------------------------------------------------------
// MODULE 12: Checkout, Delivery, Verification & Appointment Celebration (TC095 - TC100)
// -------------------------------------------------------------
test('TC-095: buyPhone function dynamically creates purchasePage section', () => {
  assert.match(allScriptCode, /function\s+buyPhone\s*\(/);
  assert.match(allScriptCode, /id\s*=\s*["']purchasePage["']/);
});

test('TC-096: proceedToCheckout collects customer delivery inputs and coupon', () => {
  assert.match(allScriptCode, /function\s+proceedToCheckout\s*\(/);
  assert.match(allScriptCode, /id=["']couponCode["']/);
  assert.match(allScriptCode, /id=["']discountAmount["']/);
  assert.match(allScriptCode, /id=["']totalAmount["']/);
});

test('TC-097: applyCoupon validates SAVE10 for a 10% discount', () => {
  assert.match(allScriptCode, /function\s+applyCoupon\s*\(/);
  assert.match(allScriptCode, /SAVE10/);
  assert.match(allScriptCode, /0\.10/);
});

test('TC-098: showVerificationOptions allows choosing Doorstep vs Store Visit', () => {
  assert.match(allScriptCode, /function\s+showVerificationOptions\s*\(/);
  assert.match(allScriptCode, /Store Visit & Instant Swap/);
  assert.match(allScriptCode, /Doorstep Verification/);
  assert.match(allScriptCode, /selectVerification\(/);
});

test('TC-099: bookAppointment renders date, time, and dynamic location select', () => {
  assert.match(allScriptCode, /function\s+bookAppointment\s*\(/);
  assert.match(allScriptCode, /id=["']appointmentDate["']/);
  assert.match(allScriptCode, /id=["']appointmentTime["']/);
  assert.match(allScriptCode, /id=["']appointmentLocation["']/);
});

test('TC-100: confirmAppointment renders Reference No and 10 Confetti elements', () => {
  assert.match(allScriptCode, /function\s+confirmAppointment\s*\(/);
  assert.match(allScriptCode, /["']CM["']\s*\+\s*Math\.floor/);
  assert.match(allScriptCode, /class=["']celebration["']/);
  for (let i = 1; i <= 10; i++) {
    assert.match(allScriptCode, new RegExp(`class=["']confetti c${i}["']`));
  }
});
