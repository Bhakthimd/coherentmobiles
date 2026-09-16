# CoherentMobiles - 100 Test Cases Specification

**Application Under Test**: `CoherentMobiles` Single-Page Web Application (`index.html`)  
**Technology Stack**: HTML5, Vanilla JavaScript (ES6+), CSS3 (Modern Glassmorphism & Custom Properties)  
**Scope**: End-to-end functionality, UI/UX, AI Valuation Engine, IMEI Verification, Phone Store & Filtering, Exchange Calculator, Checkout, Appointment Booking, and Confetti Celebration.

---

## Summary Matrix

| Module | Category | Test ID Range | Total Cases |
| :--- | :--- | :--- | :--- |
| **M1** | Splash Screen, Loading Engine & App Entry | `TC-001` to `TC-008` | 8 |
| **M2** | Global Navigation, Responsive Headers & SPA Routing | `TC-009` to `TC-018` | 10 |
| **M3** | User Authentication (Google Demo, Phone OTP & Email) | `TC-019` to `TC-028` | 10 |
| **M4** | Homepage Highlights, Quick Estimator & Trust Pillars | `TC-029` to `TC-036` | 8 |
| **M5** | Sell Phone Wizard - Device Configuration & Live Pricing | `TC-037` to `TC-050` | 14 |
| **M6** | Automated 6-Tier GSMA IMEI Verification System | `TC-051` to `TC-058` | 8 |
| **M7** | AI Valuation Diagnostics & Condition Certificate | `TC-059` to `TC-066` | 8 |
| **M8** | Buy Phone Catalogue, Storefront & Featured Cards | `TC-067` to `TC-074` | 8 |
| **M9** | Live Search, Multi-Brand Buttons & Price Slider Filters | `TC-075` to `TC-084` | 10 |
| **M10** | Phone Specifications Details Page | `TC-085` to `TC-089` | 5 |
| **M11** | Interactive Phone Exchange Calculator | `TC-090` to `TC-094` | 5 |
| **M12** | Checkout, Delivery, Verification & Appointment Celebration | `TC-095` to `TC-100` | 6 |
| **Total** | | | **100** |

---

## Detailed Test Cases

### Module 1: Splash Screen, Loading Engine & App Entry

#### TC-001: Initial Splash Screen Display on Page Load
- **Category**: Functional / UI
- **Priority**: P1 (Critical)
- **Preconditions**: User navigates to `index.html` with clean browser cache.
- **Test Steps**:
  1. Open `index.html` in browser.
  2. Observe the initial viewport before DOM interactive state resolves.
- **Expected Result**: `#loadingScreen` is visible with `display: flex` covering the entire viewport, displaying logo "CoherentMobiles", badge "✦ ✧ ✦", and loading subtitle.

#### TC-002: Loading Bar Progress Animation
- **Category**: UI / Animation
- **Priority**: P2 (High)
- **Preconditions**: Splash screen is active.
- **Test Steps**:
  1. Monitor `#loadingBarFill` over a 2.5-second interval.
- **Expected Result**: Progress bar smoothly animates width from `0%` to `100%` across 3 timed stages (30%, 70%, 100%).

#### TC-003: Dynamic Loading Status Text Messages
- **Category**: Functional
- **Priority**: P2 (High)
- **Preconditions**: Splash screen sequence is executing.
- **Test Steps**:
  1. Observe `#loadingStatusText` text content during the loading progression.
- **Expected Result**: Text dynamically updates through sequential calibration steps ("Calibrating AI Neural Valuation Engine...", "Fetching Secondary Device Market Indices...", "Diagnostic Engine Ready.").

#### TC-004: Reveal of "Enter Experience" Button Upon 100% Loading
- **Category**: Functional / UI
- **Priority**: P1 (Critical)
- **Preconditions**: Loading progress bar reaches 100%.
- **Test Steps**:
  1. Wait 2200ms until loading bar completes.
  2. Check visibility of `.splash-enter-btn`.
- **Expected Result**: `.splash-enter-btn` has class `show` added and becomes clickable with text "Enter Experience →".

#### TC-005: Dismissal of Splash Screen via "Enter Experience"
- **Category**: Functional
- **Priority**: P1 (Critical)
- **Preconditions**: Splash screen completed loading; "Enter Experience" button is visible.
- **Test Steps**:
  1. Click "Enter Experience →".
- **Expected Result**: `#loadingScreen` has class `hidden` applied (opacity fades to 0 and `pointer-events: none`), revealing `#homePage`.

#### TC-006: Auto-Dismiss Fallback on Direct Viewport Interaction
- **Category**: Functional / UX
- **Priority**: P2 (High)
- **Preconditions**: User triggers `enterApp()` directly from console or script.
- **Test Steps**:
  1. Execute `enterApp()` programmatically.
- **Expected Result**: Loading screen is hidden cleanly without JavaScript console errors.

#### TC-007: Image Assets Preloading During Splash Sequence
- **Category**: Performance / Assets
- **Priority**: P3 (Medium)
- **Preconditions**: Network tab open in developer tools.
- **Test Steps**:
  1. Reload page.
  2. Verify all local phone images in `images/` directory are requested without 404 errors.
- **Expected Result**: All 11 images (`iphone15.jpg`, `galaxy-s24.jpg`, etc.) resolve with HTTP 200/304 status codes.

#### TC-008: Error Graceful Fallback for Broken Mockup Images
- **Category**: Robustness
- **Priority**: P3 (Medium)
- **Preconditions**: Image source points to invalid URI or offline state.
- **Test Steps**:
  1. Trigger image error on hero backdrop image via `handleImageFallback(this)`.
- **Expected Result**: Placeholder fallback image with valid data URI SVG or unsplash fallback is assigned without layout breakage.

---

### Module 2: Global Navigation, Responsive Headers & SPA Routing

#### TC-009: Desktop Navbar Brand Logo Navigation
- **Category**: Functional
- **Priority**: P1 (Critical)
- **Preconditions**: Any inner view active (e.g. `cataloguePage` or `sellPage`).
- **Test Steps**:
  1. Click the header brand logo (`.logo-wrap`).
- **Expected Result**: `navigateTo('homePage')` is invoked; `#homePage` gets `.active-view`; other containers are hidden.

#### TC-010: Navbar Links Active State Synchronization
- **Category**: Functional / UI
- **Priority**: P2 (High)
- **Preconditions**: User is on `homePage`.
- **Test Steps**:
  1. Click "Sell Phone" in navbar.
  2. Verify class list of `#navSellLink` and `#navHomeLink`.
- **Expected Result**: `#navSellLink` receives class `active`; `#navHomeLink` loses `active` class.

#### TC-011: Navbar "Browse Store" Link Routing
- **Category**: Functional
- **Priority**: P1 (Critical)
- **Preconditions**: User is on `homePage`.
- **Test Steps**:
  1. Click "Browse Store" in navbar.
- **Expected Result**: View switches to `#cataloguePage`; `#buySection` and phone cards are displayed.

#### TC-012: Navbar "AI Valuation" Trigger
- **Category**: Functional
- **Priority**: P1 (Critical)
- **Preconditions**: Page loaded.
- **Test Steps**:
  1. Click "AI Valuation" in navbar (`startSellFlow()`).
- **Expected Result**: View switches to `#sellPage`, resets evaluation form to Step 1, and scrolls smoothly to top.

#### TC-013: Navbar "Exchange Quote" Direct Access
- **Category**: Functional
- **Priority**: P2 (High)
- **Preconditions**: Valuation has been performed previously.
- **Test Steps**:
  1. Click "Exchange Quote" in navbar (`navigateTo('aiEvaluationPage')`).
- **Expected Result**: `#aiEvaluationPage` receives `.active-view` class.

#### TC-014: Single-Page Application (SPA) Back Button History Stack
- **Category**: Functional
- **Priority**: P2 (High)
- **Preconditions**: User navigated: `homePage` -> `sellPage` -> `imeiPage`.
- **Test Steps**:
  1. Click the back button on `imeiPage` (`goBack()`).
- **Expected Result**: `navigationStack.pop()` triggers return to `sellPage`.

#### TC-015: Browser Scroll Reset on View Transition
- **Category**: UX
- **Priority**: P2 (High)
- **Preconditions**: Page scrolled down on `homePage`.
- **Test Steps**:
  1. Click "Sell Phone".
- **Expected Result**: Viewport automatically scrolls smoothly to `{top: 0}`.

#### TC-016: Mobile Bottom Navigation Bar Visibility
- **Category**: Responsive / UI
- **Priority**: P2 (High)
- **Preconditions**: Viewport resized to width `<= 820px`.
- **Test Steps**:
  1. Inspect bottom navigation bar (`.mobile-nav-bar`).
- **Expected Result**: `.mobile-nav-bar` displays fixed at screen bottom with 5 action buttons (Home, Sell, Buy, Valuation, Profile).

#### TC-017: Mobile Bottom Nav Route Switching
- **Category**: Functional / Mobile
- **Priority**: P2 (High)
- **Preconditions**: Mobile view active.
- **Test Steps**:
  1. Tap "Buy Store" on mobile navigation.
- **Expected Result**: `#cataloguePage` activates; mobile item gets `.active` class.

#### TC-018: Global Toast Notification Display and Auto-Dismiss
- **Category**: UI / UX
- **Priority**: P2 (High)
- **Preconditions**: Any action triggering `showToast(msg, isSuccess)`.
- **Test Steps**:
  1. Trigger `showToast('Item Added')`.
  2. Observe `#appToast` after 3500ms.
- **Expected Result**: Toast slides in with icon `✓`, stays visible for 3 seconds, and slides out automatically.

---

### Module 3: User Authentication (Google Demo, Phone OTP & Email)

#### TC-019: Sign In Button Modal / View Open
- **Category**: Functional
- **Priority**: P1 (Critical)
- **Preconditions**: User is signed out (`appState.isLoggedIn = false`).
- **Test Steps**:
  1. Click `#navAuthBtn` ("Sign In").
- **Expected Result**: App navigates to `#signinPage`; login options (Google, Mobile OTP, Email) are rendered.

#### TC-020: Authentication Tab Switching (Google / OTP / Email)
- **Category**: Functional / UI
- **Priority**: P2 (High)
- **Preconditions**: `#signinPage` active.
- **Test Steps**:
  1. Click "Google" tab.
  2. Click "Phone OTP" tab.
  3. Click "Email" tab.
- **Expected Result**: Respective panels (`#templateGooglePanel`, `#templatePhonePanel`, `#templateEmailPanel`) show/hide smoothly based on selected tab.

#### TC-021: Google One-Click Demo Sign-In
- **Category**: Functional
- **Priority**: P1 (Critical)
- **Preconditions**: Google tab selected on `#signinPage`.
- **Test Steps**:
  1. Click "Continue with Google (Demo)".
- **Expected Result**: `appState.isLoggedIn` set to `true`; username set to "Alex Henderson"; success toast displayed; redirects to `sellPage`.

#### TC-022: Phone Number Input Validation (10 Digits)
- **Category**: Validation
- **Priority**: P1 (Critical)
- **Preconditions**: Phone OTP tab selected.
- **Test Steps**:
  1. Enter "12345" in `#userPhoneInput`.
  2. Click "Get OTP".
- **Expected Result**: Alert/Toast indicates invalid mobile number; requires exactly 10 numeric digits.

#### TC-023: Demo OTP Generation and Display
- **Category**: Functional
- **Priority**: P1 (Critical)
- **Preconditions**: Valid 10-digit phone entered (e.g. `9876543210`).
- **Test Steps**:
  1. Click "Get OTP".
- **Expected Result**: View switches to `#signinStepOTP`; a 6-digit random code appears in `#displayDemoOTP`.

#### TC-024: Auto-Fill of 6 OTP Boxes via Demo Helper
- **Category**: Functional / UX
- **Priority**: P2 (High)
- **Preconditions**: OTP screen rendered.
- **Test Steps**:
  1. Observe the 6 inputs (`#otpBox1` to `#otpBox6`).
- **Expected Result**: MutationObserver detects generated OTP and automatically populates the 6 boxes.

#### TC-025: OTP Digit Auto-Focus and Backspace Navigation
- **Category**: UX
- **Priority**: P3 (Medium)
- **Preconditions**: User manually enters digits into OTP boxes.
- **Test Steps**:
  1. Type "5" in box 1.
  2. Press Backspace in box 2.
- **Expected Result**: Focus advances to box 2 on entry, and retreats to box 1 on backspace.

#### TC-026: Successful OTP Verification and Proceed Reveal
- **Category**: Functional
- **Priority**: P1 (Critical)
- **Preconditions**: Valid 6 digits populated in OTP boxes.
- **Test Steps**:
  1. Click "Verify & Continue".
- **Expected Result**: Success banner appears; `#signinProceedButton` becomes active; auto-proceed timer triggers navigation.

#### TC-027: Email/Password Form Client-Side Validation
- **Category**: Validation
- **Priority**: P2 (High)
- **Preconditions**: Email tab selected.
- **Test Steps**:
  1. Leave password blank and click "Sign In with Email".
- **Expected Result**: Toast alerts user: "Please enter your email and password."

#### TC-028: Header Profile State Transformation After Login
- **Category**: UI / State
- **Priority**: P2 (High)
- **Preconditions**: User completes login.
- **Test Steps**:
  1. Inspect `#navAuthLabel` and `#navAuthBtn`.
- **Expected Result**: Text changes from "Sign In" to "Alex H. ✓"; button receives `.logged-in` styling.

---

### Module 4: Homepage Highlights, Quick Estimator & Trust Pillars

#### TC-029: Quick Valuation Dropdown Selection Change
- **Category**: Functional
- **Priority**: P2 (High)
- **Preconditions**: User on `homePage`.
- **Test Steps**:
  1. Select "Samsung Galaxy" from `#quickBrandSelect`.
- **Expected Result**: `#quickValuationEst` updates price text to "Up to ₹69,000".

#### TC-030: Quick Valuation "Inspect Now" Button Action
- **Category**: Functional
- **Priority**: P2 (High)
- **Preconditions**: "Apple iPhone" selected in `#quickBrandSelect`.
- **Test Steps**:
  1. Click "Inspect Now →".
- **Expected Result**: Navigates to `sellPage`; pre-selects "Apple" brand and renders its series models.

#### TC-031: Hero Action "Exchange Old Phone" Button
- **Category**: Functional
- **Priority**: P1 (Critical)
- **Preconditions**: User on `homePage`.
- **Test Steps**:
  1. Click "Exchange Old Phone →".
- **Expected Result**: `startSellFlow()` executes; navigates directly to Step 1 of `sellPage`.

#### TC-032: Hero Action "Browse New & Refurbished" Button
- **Category**: Functional
- **Priority**: P1 (Critical)
- **Preconditions**: User on `homePage`.
- **Test Steps**:
  1. Click "Browse New & Refurbished".
- **Expected Result**: Navigates directly to `cataloguePage` showing all available devices.

#### TC-033: Curated Collection Featured Phones Rendering (4 Items)
- **Category**: Functional / UI
- **Priority**: P2 (High)
- **Preconditions**: Page loaded.
- **Test Steps**:
  1. Count child articles inside `#homeFeaturedGrid`.
- **Expected Result**: Exactly 4 featured phone cards are rendered with valid local images (`images/*.jpg`).

#### TC-034: Featured Card "View Specs" Action
- **Category**: Functional
- **Priority**: P2 (High)
- **Preconditions**: 4 cards visible in `#homeFeaturedGrid`.
- **Test Steps**:
  1. Click "View Specs" on iPhone 15 Pro card.
- **Expected Result**: Navigates to `cataloguePage` and displays the full specifications modal/page.

#### TC-035: Interactive Accordion FAQ Expansion
- **Category**: Functional / UI
- **Priority**: P3 (Medium)
- **Preconditions**: FAQ section visible on `homePage`.
- **Test Steps**:
  1. Click FAQ item: "How is the AI valuation calculated?".
- **Expected Result**: `.faq-item` receives `.open` class; answer expands with slide animation.

#### TC-036: Accordion FAQ Auto-Close on Sibling Toggle
- **Category**: Functional / UI
- **Priority**: P3 (Medium)
- **Preconditions**: First FAQ item is expanded.
- **Test Steps**:
  1. Click the second FAQ item.
- **Expected Result**: First item closes (removes `.open`) while second item opens.

---

### Module 5: Sell Phone Wizard - Device Configuration & Live Pricing

#### TC-037: Default Brand Selection on Sell Page Load
- **Category**: Functional
- **Priority**: P1 (Critical)
- **Preconditions**: User opens `sellPage`.
- **Test Steps**:
  1. Check selected brand button in `#brandGrid`.
- **Expected Result**: "Apple" is selected by default; series dropdown contains Apple series (iPhone 15, 14, 13).

#### TC-038: Brand Selection Change & Series Cascading
- **Category**: Functional
- **Priority**: P1 (Critical)
- **Preconditions**: User on `sellPage`.
- **Test Steps**:
  1. Click "Samsung" in `#brandGrid`.
- **Expected Result**: Series dropdown `#seriesSelect` populates with Samsung series ("Galaxy S Series", "Galaxy Z Fold/Flip").

#### TC-039: Series Change & Model Cascading
- **Category**: Functional
- **Priority**: P1 (Critical)
- **Preconditions**: Samsung selected.
- **Test Steps**:
  1. Select "Galaxy S Series" in `#seriesSelect`.
- **Expected Result**: Model dropdown `#modelSelect` populates with Galaxy S24 Ultra, S24+, S24, S23 Ultra.

#### TC-040: Dynamic Storage Pill Buttons Generation
- **Category**: Functional
- **Priority**: P2 (High)
- **Preconditions**: Model "iPhone 15 Pro Max" selected.
- **Test Steps**:
  1. Inspect buttons in `#storagePills`.
- **Expected Result**: Renders pills: `256GB`, `512GB`, `1TB`. `256GB` is active by default.

#### TC-041: Storage Selection Price Adjustment (+₹3,000 / +₹6,000)
- **Category**: Functional / Calculation
- **Priority**: P1 (Critical)
- **Preconditions**: Base model selected with price ₹50,000.
- **Test Steps**:
  1. Switch storage from `128GB` to `256GB`.
  2. Switch storage from `256GB` to `512GB`.
- **Expected Result**: Live price estimate increases by ₹2,500 (or ₹3,000 depending on model tier).

#### TC-042: Screen Physical Condition Selection (Flawless to Broken)
- **Category**: Functional / Calculation
- **Priority**: P1 (Critical)
- **Preconditions**: Base valuation ₹40,000.
- **Test Steps**:
  1. Select "Flawless (No Scratches)".
  2. Select "Broken / Cracked Glass".
- **Expected Result**: Flawless applies 1.0 factor; Broken applies 0.50 factor (price drops by ~50%).

#### TC-043: Body Cosmetic Condition Grading Impact
- **Category**: Functional / Calculation
- **Priority**: P2 (High)
- **Preconditions**: Body condition set to "Like New".
- **Test Steps**:
  1. Change to "Dented / Chipped Bezel".
- **Expected Result**: Valuation price decreases proportionally to account for cosmetic wear.

#### TC-044: Battery Health Presets Multiplier (100%, 90-99%, 80-89%, <80%)
- **Category**: Functional / Calculation
- **Priority**: P1 (Critical)
- **Preconditions**: Battery health defaults to 100%.
- **Test Steps**:
  1. Click "100% (Full Capacity)".
  2. Click "<80% (Service Alert)".
- **Expected Result**: 100% applies 1.0 multiplier; <80% applies 0.78 multiplier; badge reflects condition.

#### TC-045: Hardware Sensors Functional Checks Multi-Toggle
- **Category**: Functional
- **Priority**: P2 (High)
- **Preconditions**: All 6 functional checks (Camera, FaceID, Wi-Fi, Touch, Speakers, Charging) selected.
- **Test Steps**:
  1. Deselect "Face ID / Fingerprint".
  2. Deselect "Camera System".
- **Expected Result**: `appState.sensorsCond` becomes `'one_issue'` or `'faulty'`; price deducts -₹1,500 to -₹3,500.

#### TC-046: Device History Repair and Water Damage Toggles
- **Category**: Functional
- **Priority**: P2 (High)
- **Preconditions**: History checks active.
- **Test Steps**:
  1. Toggle "Past Liquid Damage Contact".
- **Expected Result**: Liquid contact flagged; price deducts ₹3,000.

#### TC-047: Activation Lock / iCloud Lock Safety Penalty
- **Category**: Security / Calculation
- **Priority**: P1 (Critical)
- **Preconditions**: Activation lock is "Disabled / Removed".
- **Test Steps**:
  1. Toggle Activation Lock to "Still Linked / Locked".
- **Expected Result**: Lock warning banner displays; price drops to 25% salvage value (0.25 multiplier).

#### TC-048: Original Accessories Checklist (Box, Bill, Charger)
- **Category**: Functional
- **Priority**: P3 (Medium)
- **Preconditions**: Accessories checklist rendered.
- **Test Steps**:
  1. Check Original Box (+₹500).
  2. Check Original Fast Charger (+₹1,000).
- **Expected Result**: Live estimate reflects additional accessory bonuses.

#### TC-049: Animated Counter on Live Price Estimate Bar
- **Category**: UI / Animation
- **Priority**: P2 (High)
- **Preconditions**: Price changes due to condition adjustment.
- **Test Steps**:
  1. Observe `#evalFinalPrice` or `#liveEstimatePrice`.
- **Expected Result**: Number counts up/down with animated easing (`animateLivePrice`) without NaN errors.

#### TC-050: Progression to Step 2 (IMEI Verification Page)
- **Category**: Functional
- **Priority**: P1 (Critical)
- **Preconditions**: Valid model and conditions chosen.
- **Test Steps**:
  1. Click "Verify IMEI & Finalize Payout →".
- **Expected Result**: Navigates to `#imeiPage`; header reflects selected phone name.

---

### Module 6: Automated 6-Tier GSMA IMEI Verification System

#### TC-051: IMEI Format Validation (15 Numeric Digits)
- **Category**: Validation
- **Priority**: P1 (Critical)
- **Preconditions**: User on `#imeiPage`.
- **Test Steps**:
  1. Enter `354890` (6 digits) in `#imeiInputField`.
  2. Click "Run Diagnostic Check".
- **Expected Result**: Alert/Toast specifies that IMEI must be exactly 15 numeric digits.

#### TC-052: Auto-Fill Demo IMEI Button
- **Category**: Functional / Demo
- **Priority**: P2 (High)
- **Preconditions**: User on `#imeiPage`.
- **Test Steps**:
  1. Click "Use Demo IMEI".
- **Expected Result**: `#imeiInputField` populates with valid 15-digit code (`356987114523901`); helper notice appears.

#### TC-053: Camera / Barcode Scanner Simulation Animation
- **Category**: UI / Animation
- **Priority**: P2 (High)
- **Preconditions**: IMEI check initiated.
- **Test Steps**:
  1. Observe the scanner viewfinder (`.scanner-frame`).
- **Expected Result**: Laser line (`.laser-scan-line`) sweeps vertically across simulated barcode.

#### TC-054: Sequential Execution of 6 Verification Tiers
- **Category**: Functional
- **Priority**: P1 (Critical)
- **Preconditions**: Diagnostic check running.
- **Test Steps**:
  1. Monitor `#criteriaList` items 1 through 6.
- **Expected Result**: Each criteria row transitions from "Validating..." to "Passed ✓" at 450ms intervals:
  1. GSMA Global Registry Whitelist
  2. Device Model & Serial Authenticity
  3. National Lost/Stolen Database Check
  4. Carrier Financial Blacklist Status
  5. Regional Frequency Hardware Compliance
  6. Warranty & Activation Registration

#### TC-055: Dynamic Overall Verification Progress Bar
- **Category**: UI / Animation
- **Priority**: P2 (High)
- **Preconditions**: Diagnostic check running.
- **Test Steps**:
  1. Observe `#imeiOverallBar`.
- **Expected Result**: Bar width smoothly increments: 16% -> 33% -> 50% -> 66% -> 83% -> 100%.

#### TC-056: Eligibility Percentage Calculation (100% Clean)
- **Category**: Functional
- **Priority**: P1 (Critical)
- **Preconditions**: All 6 checks pass.
- **Test Steps**:
  1. Check text in `#imeiEligibilityPercent`.
- **Expected Result**: Displays "100% Eligible"; status badge changes to emerald green.

#### TC-057: Reveal of "Proceed to AI Valuation Report" Button
- **Category**: Functional / UI
- **Priority**: P1 (Critical)
- **Preconditions**: 6 checks completed.
- **Test Steps**:
  1. Inspect visibility of `#startVerifyBtn`.
- **Expected Result**: Button changes text to "View AI Valuation Certificate →" and triggers `proceedToAIEvaluation()`.

#### TC-058: Preservation of Verified State in Application State
- **Category**: State Management
- **Priority**: P1 (Critical)
- **Preconditions**: Diagnostic check completed.
- **Test Steps**:
  1. Inspect `appState.imeiVerified` and `appState.imeiNumber` in JavaScript context.
- **Expected Result**: `appState.imeiVerified === true` and `appState.imeiNumber` matches input value.

---

### Module 7: AI Valuation Diagnostics & Condition Certificate

#### TC-059: Circular Score Ring Gauge SVG Animation
- **Category**: UI / Animation
- **Priority**: P1 (Critical)
- **Preconditions**: User lands on `#aiEvaluationPage`.
- **Test Steps**:
  1. Observe circular SVG ring (`#evalScoreRing`).
- **Expected Result**: Stroke-dashoffset animates to fill gauge to condition score (e.g. 96%).

#### TC-060: Diagnostic Breakdown Subscore Bars
- **Category**: Functional / UI
- **Priority**: P2 (High)
- **Preconditions**: `#aiEvaluationPage` active.
- **Test Steps**:
  1. Inspect subscore bars for Display, Battery, Logic Board, Cosmetic.
- **Expected Result**: `#subBarDisplay`, `#subBarBattery`, etc. fill to calibrated percentages based on earlier inputs.

#### TC-061: Official Verifiable Barcode Generation
- **Category**: Functional
- **Priority**: P2 (High)
- **Preconditions**: `#aiEvaluationPage` rendered.
- **Test Steps**:
  1. Inspect `#evalBarcode` and `#evalBarcodeSerial`.
- **Expected Result**: Generates dynamic barcode bars and displays unique serial: `CM-VAL-<TIMESTAMP>-<HASH>`.

#### TC-062: Certified Buyback Price Lock Display
- **Category**: Functional
- **Priority**: P1 (Critical)
- **Preconditions**: Price calculated as ₹42,500.
- **Test Steps**:
  1. Inspect `#evalFinalPrice`.
- **Expected Result**: Displays "₹42,500" with "Price Locked for 7 Days" guarantee badge.

#### TC-063: "Book Doorstep Pickup" Schedule Action
- **Category**: Functional
- **Priority**: P1 (Critical)
- **Preconditions**: Valuation report active.
- **Test Steps**:
  1. Click "Schedule Free Doorstep Pickup".
- **Expected Result**: Toast confirms pickup window booked; confirmation modal/toast confirms dispatch within 24 hours.

#### TC-064: "Browse Phones with Credit" Trade-in Transfer
- **Category**: Functional / Integration
- **Priority**: P1 (Critical)
- **Preconditions**: Valuation complete with credit of ₹42,500.
- **Test Steps**:
  1. Click "Browse New Phones with Credit →" (`browseNewPhonesWithCredit()`).
- **Expected Result**: Navigates to `cataloguePage`; `#activeTradeInRibbon` is displayed showing ₹42,500 credit active.

#### TC-065: Active Trade-In Credit Ribbon Dismissal / View Link
- **Category**: Functional / UI
- **Priority**: P3 (Medium)
- **Preconditions**: Trade-in ribbon visible on `cataloguePage`.
- **Test Steps**:
  1. Click "View Valuation Report ↗" on ribbon.
- **Expected Result**: Navigates back to `#aiEvaluationPage` to review certificate.

#### TC-066: Price Spark Celebration Animation
- **Category**: UI / Animation
- **Priority**: P3 (Medium)
- **Preconditions**: Final valuation revealed.
- **Test Steps**:
  1. Trigger `triggerPriceCelebration()`.
- **Expected Result**: `#priceSparkBlast` triggers CSS scale/opacity burst animation without overflow.

---

### Module 8: Buy Phone Catalogue, Storefront & Featured Cards

#### TC-067: Catalogue Page Loading with 11 Verified Phones
- **Category**: Functional
- **Priority**: P1 (Critical)
- **Preconditions**: User navigates to `cataloguePage`.
- **Test Steps**:
  1. Count `.phone-card` elements inside `#phoneCards`.
- **Expected Result**: Exactly 11 phone cards rendered from `buyPhones` dataset.

#### TC-068: Phone Card Local Image Assets Loading
- **Category**: UI / Assets
- **Priority**: P1 (Critical)
- **Preconditions**: Catalogue rendered.
- **Test Steps**:
  1. Check each card image source attribute (`img.src`).
- **Expected Result**: Cards reference local valid image paths (`images/iphone15.jpg`, `images/iphone15pro.jpg`, etc.).

#### TC-069: Phone Card Information Elements Verification
- **Category**: UI / Content
- **Priority**: P2 (High)
- **Preconditions**: Catalogue rendered.
- **Test Steps**:
  1. Inspect any `.phone-card`.
- **Expected Result**: Card contains: Phone Name, Brand, Storage (GB), Price (₹ formatted), Rating (⭐), and 3 Action buttons.

#### TC-070: Card Action 1 - "View Details" Button
- **Category**: Functional
- **Priority**: P1 (Critical)
- **Preconditions**: Cards displayed in `#phoneCards`.
- **Test Steps**:
  1. Click "View Details" on "Galaxy S24".
- **Expected Result**: `showPhoneDetails('Galaxy S24')` executes; phone details view replaces cards.

#### TC-071: Card Action 2 - "Buy Now" Direct Checkout Trigger
- **Category**: Functional
- **Priority**: P1 (Critical)
- **Preconditions**: Cards displayed.
- **Test Steps**:
  1. Click "Buy Now" on "OnePlus 12".
- **Expected Result**: `buyPhone('OnePlus 12')` executes; dynamically mounts `#purchasePage` in Step 1.

#### TC-072: Card Action 3 - "Exchange" Calculator Trigger
- **Category**: Functional
- **Priority**: P1 (Critical)
- **Preconditions**: Cards displayed.
- **Test Steps**:
  1. Click "Exchange" on "iPhone 15".
- **Expected Result**: `showExchange('iPhone 15')` executes; exchange configuration view renders.

#### TC-073: Automatic Net Upgrade Price Deduction with Active Trade-In
- **Category**: Integration / Pricing
- **Priority**: P1 (Critical)
- **Preconditions**: User evaluated old phone for ₹30,000 (`appState.predictedPrice = 30000`).
- **Test Steps**:
  1. Browse phone cards in catalogue.
- **Expected Result**: Each card shows original price, trade-in credit discount "-₹30,000", and bold Net Payable price.

#### TC-074: Responsive Grid Layout for Phone Cards
- **Category**: Responsive / UI
- **Priority**: P2 (High)
- **Preconditions**: Change viewport from 1440px to 768px to 375px.
- **Test Steps**:
  1. Inspect CSS grid column layout on `#phoneCards`.
- **Expected Result**: Cards reflow from 4 columns to 2 columns to 1 column without overlapping.

---

### Module 9: Live Search, Multi-Brand Buttons & Price Slider Filters

#### TC-075: Live Search Filtering by Exact Phone Name
- **Category**: Functional / Search
- **Priority**: P1 (Critical)
- **Preconditions**: Catalogue displayed with 11 phones.
- **Test Steps**:
  1. Type "OnePlus 12" into `#phoneSearch`.
- **Expected Result**: Cards filter in real-time to show only "OnePlus 12"; other cards hidden.

#### TC-076: Live Search Case-Insensitive Matching
- **Category**: Functional / Search
- **Priority**: P2 (High)
- **Preconditions**: Catalogue displayed.
- **Test Steps**:
  1. Type "xiaomi" in lowercase into `#phoneSearch`.
- **Expected Result**: Displays "Xiaomi 14" and "Redmi Note 13 Pro".

#### TC-077: Brand Filter Button Selection (Apple)
- **Category**: Functional / Filter
- **Priority**: P1 (Critical)
- **Preconditions**: All brands currently displayed.
- **Test Steps**:
  1. Click "Apple" brand button.
- **Expected Result**: Only Apple devices ("iPhone 15", "iPhone 15 Pro") render; Apple button receives `.active`.

#### TC-078: Brand Filter Button Selection (Samsung)
- **Category**: Functional / Filter
- **Priority**: P1 (Critical)
- **Preconditions**: Catalogue displayed.
- **Test Steps**:
  1. Click "Samsung" brand button.
- **Expected Result**: Only Samsung devices ("Galaxy S24", "Galaxy A55") render.

#### TC-079: Resetting Brand Filter to "All"
- **Category**: Functional / Filter
- **Priority**: P2 (High)
- **Preconditions**: "OnePlus" brand button is active.
- **Test Steps**:
  1. Click "All" brand button.
- **Expected Result**: All 11 phones are restored in grid; "All" receives `.active`.

#### TC-080: Price Range Slider Dynamic Filtering
- **Category**: Functional / Filter
- **Priority**: P1 (Critical)
- **Preconditions**: Max price slider set to ₹109,999.
- **Test Steps**:
  1. Slide `#maxPrice` down to ₹40,000.
- **Expected Result**: `#priceRangeValue` updates to "₹40,000"; only phones `<= ₹40,000` (e.g. Galaxy A55, OnePlus Nord 4, Redmi Note 13 Pro, Vivo V30, OPPO Reno 12) remain.

#### TC-081: Sort Filter - Price: Low to High
- **Category**: Functional / Sort
- **Priority**: P2 (High)
- **Preconditions**: Catalogue displayed.
- **Test Steps**:
  1. Select "Price: Low to High" in `#sortFilter`.
- **Expected Result**: First card is lowest price (₹29,999); last card is highest price (₹109,999).

#### TC-082: Sort Filter - Price: High to Low
- **Category**: Functional / Sort
- **Priority**: P2 (High)
- **Preconditions**: Catalogue displayed.
- **Test Steps**:
  1. Select "Price: High to Low" in `#sortFilter`.
- **Expected Result**: First card is "iPhone 15 Pro" (₹109,999); prices strictly descend.

#### TC-083: Sort Filter - Name: A to Z
- **Category**: Functional / Sort
- **Priority**: P2 (High)
- **Preconditions**: Catalogue displayed.
- **Test Steps**:
  1. Select "Name: A to Z" in `#sortFilter`.
- **Expected Result**: Cards sorted alphabetically by phone name.

#### TC-084: "No Phones Found" Zero-Results State
- **Category**: Edge Case / UI
- **Priority**: P2 (High)
- **Preconditions**: Catalogue active.
- **Test Steps**:
  1. Type "NonExistentModel999" into `#phoneSearch`.
- **Expected Result**: Grid displays fallback notice `<p class="no-phones">No phones found.</p>`.

---

### Module 10: Phone Specifications Details Page

#### TC-085: Phone Details Modal Rendering
- **Category**: Functional
- **Priority**: P1 (Critical)
- **Preconditions**: User on catalogue.
- **Test Steps**:
  1. Call `showPhoneDetails('Galaxy S24')`.
- **Expected Result**: `#phoneCards` displays `.phone-details-page` containing image, title, rating, price, brand, and storage.

#### TC-086: Phone Details Specifications List Verification
- **Category**: UI / Content
- **Priority**: P2 (High)
- **Preconditions**: Details page for "iPhone 15 Pro" open.
- **Test Steps**:
  1. Inspect `.specifications` container.
- **Expected Result**: Renders Brand (Apple), Storage (256 GB), Rating (⭐ 4.8 / 5), and Availability ("In Stock").

#### TC-087: Back Button on Details Page
- **Category**: Functional
- **Priority**: P1 (Critical)
- **Preconditions**: Details page open.
- **Test Steps**:
  1. Click "← Back to Phones" (`displayPhones(buyPhones)`).
- **Expected Result**: Returns to full 11 phone cards grid.

#### TC-088: Details Page "Buy Now" Navigation
- **Category**: Functional
- **Priority**: P1 (Critical)
- **Preconditions**: Details page open for "Xiaomi 14".
- **Test Steps**:
  1. Click "Buy Now" inside details view.
- **Expected Result**: `buyPhone('Xiaomi 14')` triggers purchase wizard.

#### TC-089: Details Page "Exchange" Navigation
- **Category**: Functional
- **Priority**: P1 (Critical)
- **Preconditions**: Details page open for "Vivo V30".
- **Test Steps**:
  1. Click "Exchange" inside details view.
- **Expected Result**: `showExchange('Vivo V30')` opens exchange calculator.

---

### Module 11: Interactive Phone Exchange Calculator

#### TC-090: Exchange Page Setup with Target Phone
- **Category**: Functional
- **Priority**: P1 (Critical)
- **Preconditions**: User clicks "Exchange" on "iPhone 15" (₹69,999).
- **Test Steps**:
  1. Observe `.exchange-page`.
- **Expected Result**: Header reads "Exchange Your Old Phone"; target phone image and price (₹69,999) are rendered.

#### TC-091: Old Phone Model Dropdown Population
- **Category**: Functional
- **Priority**: P2 (High)
- **Preconditions**: Exchange page open.
- **Test Steps**:
  1. Inspect options in `#exchangeModel`.
- **Expected Result**: Populated with keys from `sellBasePricesFinal` (iPhone 15, 14, 13, Galaxy S24, OnePlus 12, etc.).

#### TC-092: Exchange Calculator Validation for Empty Selections
- **Category**: Validation
- **Priority**: P2 (High)
- **Preconditions**: `#exchangeModel`, `#exchangeStorage`, `#exchangeCondition` are unselected.
- **Test Steps**:
  1. Click "Calculate Exchange Value".
- **Expected Result**: Browser alerts: "Please select all old phone details."

#### TC-093: Exchange Value Calculation Algorithm
- **Category**: Functional / Calculation
- **Priority**: P1 (Critical)
- **Preconditions**: New Phone: iPhone 15 (₹69,999). Old Phone: iPhone 14 (Base ₹42,000), 256GB (+₹3,000), Good (0.85).
- **Test Steps**:
  1. Select model "iPhone 14", storage "256GB", condition "Good".
  2. Click "Calculate Exchange Value".
- **Expected Result**: 
  - Trade-in value calculated: `(42000 + 3000) * 0.85 = ₹38,300`.
  - Final price calculated: `69999 - 38300 = ₹31,699`.
  - `#exchangeResult` displays summary.

#### TC-094: "Apply Exchange & Buy" Transition to Checkout
- **Category**: Functional
- **Priority**: P1 (Critical)
- **Preconditions**: Exchange result displayed.
- **Test Steps**:
  1. Click "Apply Exchange & Buy".
- **Expected Result**: Proceeds to `buyPhone()` with the calculated discount applied.

---

### Module 12: Checkout, Delivery, Verification & Appointment Celebration

#### TC-095: Purchase Wizard Step 1 (Phone Details Summary)
- **Category**: Functional
- **Priority**: P1 (Critical)
- **Preconditions**: User clicks "Buy Now" on "iPhone 15 Pro".
- **Test Steps**:
  1. Inspect `#purchasePage`.
- **Expected Result**: Step 1 is active; shows listed price, predicted price, warranty badges, and "Proceed to Checkout →".

#### TC-096: Purchase Wizard Step 2 (Customer Delivery & Coupon Form)
- **Category**: Functional
- **Priority**: P1 (Critical)
- **Preconditions**: User clicks "Proceed to Checkout →".
- **Test Steps**:
  1. Inspect step indicator and checkout form.
- **Expected Result**: Step 2 is active; input fields for customer name, mobile, address, and coupon code are visible.

#### TC-097: Promo Coupon Validation (SAVE10 - 10% Discount)
- **Category**: Functional / Calculation
- **Priority**: P1 (Critical)
- **Preconditions**: Phone price ₹109,999.
- **Test Steps**:
  1. Enter "SAVE10" in `#couponCode`.
  2. Click "Apply".
- **Expected Result**: 10% (₹11,000) discount applied; `#discountAmount` shows "-₹11,000"; `#totalAmount` updates to ₹98,999; green success message displayed.

#### TC-098: Invalid Promo Coupon Rejection
- **Category**: Functional / Validation
- **Priority**: P2 (High)
- **Preconditions**: Checkout form open.
- **Test Steps**:
  1. Enter "INVALIDCODE" in `#couponCode` and click "Apply".
- **Expected Result**: Rejection message: "Invalid coupon. Try SAVE10."; total amount unchanged.

#### TC-099: Verification Method Selection (Doorstep vs Store Visit)
- **Category**: Functional
- **Priority**: P1 (Critical)
- **Preconditions**: User advances to Step 3 (`showVerificationOptions`).
- **Test Steps**:
  1. Click "Doorstep Verification".
  2. Click "Store Visit & Instant Swap".
- **Expected Result**: Selected option highlights with `.selected` class; radio indicator switches from `○` to `●`; `#bookAppointmentBtn` becomes enabled.

#### TC-100: Appointment Scheduling & Confetti Celebration Trigger
- **Category**: Functional / UX / Celebration
- **Priority**: P1 (Critical)
- **Preconditions**: Verification method selected.
- **Test Steps**:
  1. Click "Book Appointment →".
  2. Pick Date (e.g. tomorrow), Time ("11:00 AM"), and Location.
  3. Click "Confirm Appointment →".
- **Expected Result**: 
  - Input validation confirms all fields selected.
  - Unique reference number generated (`CM` + 6 digits).
  - Appointment confirmed view displays with checkmark icon `✓`.
  - Celebration confetti animation triggers with all 10 confetti spans (`.c1` to `.c10`).
  - Summary lists Date, Time, Location, Verification method, and Reference Number.
  - "Replay journey" button allows returning to storefront cleanly.

---

## Execution Guidelines
1. **Manual Testing**: Walk through each test case sequentially using standard desktop (Chrome, Edge, Firefox) and mobile emulators.
2. **Automated Testing**: Run the automated test harness:
   ```bash
   node test_runner.js
   ```
3. **Pass Criteria**: 100% of P1 (Critical) and P2 (High) test cases must pass with zero console errors.
