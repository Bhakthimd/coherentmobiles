# CoherentMobiles - High-Level Design (HLD) Architecture

**Project**: CoherentMobiles — AI-Powered Smartphone Valuation, Buy, Sell & Exchange  
**Document Version**: 1.0.0  
**Target System**: Single Page Web Application & Enterprise Device Lifecycle Architecture  

---

## 1. Executive Summary & Architecture Overview

**CoherentMobiles** is an end-to-end smartphone lifecycle platform providing instant automated device valuation, certified hardware diagnostics, 6-tier GSMA IMEI verification, an inventory storefront with dynamic trade-in credit deductions, and dual-mode fulfillment (doorstep technician dispatch and in-store instant exchange).

The application is architected around a reactive, component-oriented Single Page Application (SPA) model with decoupled business logic services, client-side caching, dynamic SVG telemetry visualization, and simulated external microservices (telecom registries, cryptographic device signatures, and payment rails).

```mermaid
graph TB
    subgraph Users ["User Personas"]
        U1["Smartphone Seller"]
        U2["Smartphone Buyer"]
        U3["Upgrade / Exchange User"]
    end

    subgraph Client ["Client Presentation Tier (SPA)"]
        UI["CoherentMobiles Frontend Application<br/>(HTML5 / Modern CSS3 / ES6+)"]
    end

    subgraph CoreServices ["Core Application Services Tier"]
        AUTH["Auth & Session Controller<br/>(OTP Auto-Verify, Google, Email)"]
        VAL["AI Valuation Engine<br/>(Algorithmic Depreciation & Grading)"]
        IMEI_SVC["6-Tier GSMA IMEI Diagnostic Pipeline"]
        CATALOG["Storefront & Search/Filter Engine"]
        EXCHANGE["Dynamic Trade-In & Net Offset Calculator"]
        CHECKOUT["Checkout & Appointment Logistics Service"]
    end

    subgraph External ["External & Telemetry Services Tier"]
        GSMA["GSMA / TAC Registry & CEIR Database"]
        OEM["OEM Lock Status (Apple GSX / Samsung Knox)"]
        BARCODE["BWIP-JS Code128 & QR Generator APIs"]
        PAYMENT["UPI / Instant Banking Payment Gateway"]
        LOGISTICS["Doorstep Fleet & Store Inventory Management"]
    end

    U1 --> UI
    U2 --> UI
    U3 --> UI

    UI --> AUTH
    UI --> VAL
    UI --> IMEI_SVC
    UI --> CATALOG
    UI --> EXCHANGE
    UI --> CHECKOUT

    IMEI_SVC --> GSMA
    IMEI_SVC --> OEM
    VAL --> BARCODE
    CHECKOUT --> PAYMENT
    CHECKOUT --> LOGISTICS
```

---

## 2. Multi-Tier High-Level Architecture (C4 Container View)

The system is decomposed into 4 core architectural tiers:
1. **Client / Presentation Tier**: Responsive SPA views with zero page reloads, breadcrumb state synchronizers, and particle animation engines.
2. **Controller & State Management Tier**: Centralized `appState` reactive store managing session, phone attributes, diagnostic results, and trade-in credits.
3. **Domain & Business Logic Services**: Mathematical pricing matrices, Luhn checksum & TAC validation algorithms, coupon calculation, and time-slot scheduling.
4. **Data & Integration Services Tier**: In-memory catalog indices, GSMA / CEIR mock bridges, barcode rendering endpoints, and media delivery CDN.

```mermaid
graph TB
    subgraph PresentationTier ["1. Client & Presentation Tier (SPA)"]
        direction TB
        VIEW_SPLASH["Splash Screen & Calibrator<br/>(loadingScreen)"]
        VIEW_NAV["Global Nav & Breadcrumbs<br/>(navbar / mobile-nav-bar)"]
        VIEW_HOME["Home & Quick Estimator<br/>(homePage)"]
        VIEW_AUTH["Unified Sign-In Portal<br/>(signinPage)"]
        VIEW_SELL["Sell Phone Wizard<br/>(sellPage)"]
        VIEW_IMEI["IMEI Diagnostic Terminal<br/>(imeiPage)"]
        VIEW_EVAL["Certified AI Valuation View<br/>(aiEvaluationPage)"]
        VIEW_STORE["Store & Filter Grid<br/>(cataloguePage / buySection)"]
        VIEW_DETAILS["Device Specifications<br/>(detailsPage)"]
        VIEW_CHECKOUT["Checkout & Verification<br/>(checkoutPage / purchasePage)"]
        VIEW_CONFIRM["Booking & Celebration<br/>(appointment-confirmed)"]
    end

    subgraph StateTier ["2. State Management & Routing Tier"]
        ROUTER["SPA View Router & History Stack<br/>(navigateTo, goBack, updateBackButtons)"]
        APP_STATE["Central Reactive State Store (appState)<br/>- Auth & User Profile<br/>- Old Phone Specs & Condition<br/>- IMEI & Diagnostic Matrix<br/>- Valuation Score, Payout & Token<br/>- Selected Store Phone & Net Cost<br/>- Fulfillment Method & Slot"]
    end

    subgraph ServiceTier ["3. Business Logic & Processing Tier"]
        SRV_AUTH["Authentication Service<br/>- 6-Digit OTP Generator<br/>- MutationObserver Auto-Fill<br/>- Demo Google & Email Auth"]
        SRV_EVAL["Valuation & Pricing Matrix<br/>- Base Model Lookup<br/>- Capacity & Wear Multipliers<br/>- Cosmetic Grading (Grade A+ to C)<br/>- Live Animated Counter"]
        SRV_IMEI["IMEI Verification Pipeline<br/>- Luhn Checksum Validator<br/>- GSMA TAC Matcher<br/>- CEIR Blacklist Interrogator<br/>- Cloud Lock & Carrier Lease Analyzer"]
        SRV_STORE["Catalogue & Filtering Engine<br/>- Full-text Model Search<br/>- Brand Chip Selection<br/>- Dual-range Slider Filter<br/>- Multi-key Sorting (Price/Alpha)"]
        SRV_EXCHANGE["Trade-In Offset Engine<br/>- Credit Ribbon Activator<br/>- Net Payable Price Derivation<br/>- Instant Coupon Engine (SAVE10/COHERENT10)"]
        SRV_LOGISTICS["Fulfillment & Appointment Engine<br/>- Doorstep Pickup Scheduler<br/>- Store Visit Instant Swap<br/>- Confetti Burst Particle Engine"]
    end

    subgraph DataTier ["4. Data Stores & External Integrations"]
        DB_CATALOG["buyPhones & CATALOGUE_PHONES<br/>(Curated Flagship Device Repository)"]
        DB_PRICING["PHONE_DATABASE & sellBasePricesFinal<br/>(Model Base Valuations & Series Hierarchies)"]
        EXT_BARCODE["External Media / Token APIs<br/>- QRServer API<br/>- BWIP-JS Code128 Barcode API"]
        EXT_REGISTRY["Simulated Telecom Registries<br/>- CEIR / GSMA Global Registry<br/>- OEM Activation Services"]
    end

    VIEW_NAV --> ROUTER
    VIEW_SPLASH --> ROUTER
    VIEW_HOME --> ROUTER
    VIEW_AUTH --> ROUTER
    VIEW_SELL --> ROUTER
    VIEW_IMEI --> ROUTER
    VIEW_EVAL --> ROUTER
    VIEW_STORE --> ROUTER
    VIEW_DETAILS --> ROUTER
    VIEW_CHECKOUT --> ROUTER
    VIEW_CONFIRM --> ROUTER

    ROUTER --> APP_STATE
    APP_STATE <--> SRV_AUTH
    APP_STATE <--> SRV_EVAL
    APP_STATE <--> SRV_IMEI
    APP_STATE <--> SRV_STORE
    APP_STATE <--> SRV_EXCHANGE
    APP_STATE <--> SRV_LOGISTICS

    SRV_STORE <--> DB_CATALOG
    SRV_EVAL <--> DB_PRICING
    SRV_EVAL --> EXT_BARCODE
    SRV_IMEI --> EXT_REGISTRY
```

---

## 3. End-to-End User Flow & State Lifecycle

The application orchestrates three primary user journeys:
1. **Device Valuation & Cash Buyback**: Home -> Sign In -> Sell Wizard -> IMEI Check -> AI Certificate -> Doorstep Pickup Schedule.
2. **Device Purchase**: Home -> Browse Store -> Filter by Brand/Price -> View Specs -> Checkout -> Appointment Confirmation.
3. **Integrated Trade-In & Upgrade Exchange**: AI Valuation -> Active Trade-In Credit Ribbon -> Storefront with Net Price Offset -> Verification Method Selection -> Order & Confetti Celebration.

```mermaid
sequenceDiagram
    autonumber
    actor User as Customer / Seller
    participant Nav as View Router & UI
    participant Auth as Auth & OTP Controller
    participant Sell as Valuation Form
    participant IMEI as IMEI 6-Tier Engine
    participant Cert as AI Certificate
    participant Store as Storefront & Filter
    participant Cart as Checkout & Logistics

    User->>Nav: Lands on index.html (Splash Screen)
    Nav-->>User: Auto-Calibrates & displays "Enter Experience"
    User->>Nav: Clicks "Enter Experience" -> #homePage
    
    rect rgb(255, 240, 245)
        note over User, Auth: Phase 1: Authentication
        User->>Nav: Clicks "Exchange Old Phone" / "Sign In"
        Nav->>Auth: switchTemplateAuth("phone")
        User->>Auth: Enters Mobile Number (e.g. 9876543210)
        Auth->>Auth: sendDemoOTP() -> Generates 6-digit OTP
        Auth->>Auth: MutationObserver detects OTP -> Auto-populates 6 boxes
        Auth->>Auth: verifyDemoOTP() -> Sets appState.isLoggedIn = true
        Auth-->>User: Reveals "Continue - verified" button
    end

    rect rgb(240, 248, 255)
        note over User, Sell: Phase 2: Device Profile & Condition Matrix
        User->>Sell: Selects Brand, Series, Model, Storage
        User->>Sell: Adjusts Battery Slider & selects cosmetic buttons
        Sell->>Sell: updateLiveEstimate() computes baseline & penalties
        User->>Sell: Clicks "Continue to IMEI Verification"
    end

    rect rgb(255, 250, 240)
        note over User, IMEI: Phase 3: 6-Tier GSMA Verification
        User->>IMEI: Enters 15-digit IMEI (or clicks "Use Test Demo IMEI")
        User->>IMEI: Clicks "Start Verification Check"
        IMEI->>IMEI: Check 1: Format & Luhn Checksum
        IMEI->>IMEI: Check 2: GSMA & TAC Database Match
        IMEI->>IMEI: Check 3: CEIR Lost/Stolen Police Blacklist Check
        IMEI->>IMEI: Check 4: iCloud & Knox Activation Lock Check
        IMEI->>IMEI: Check 5: Carrier Lease & Financial Clearance
        IMEI->>IMEI: Check 6: OEM Hardware Logic Board Authenticity
        IMEI-->>User: Renders 100% Eligible Badge & "Proceed to AI Evaluation"
    end

    rect rgb(245, 255, 245)
        note over User, Cert: Phase 4: Certified AI Evaluation & Quote
        User->>Cert: Navigates to #aiEvaluationPage
        Cert->>Cert: Calculates condition score (e.g. 94% Grade A+ Pristine)
        Cert->>Cert: Generates dynamic Token (CM-VAL-2026-XXXXXX)
        Cert->>Cert: Requests Code128 Barcode & QR Code via APIs
        Cert->>Cert: Animates live counter & triggers spark particle celebration
        Cert-->>User: Displays Guaranteed Payout (e.g. ₹52,400)
    end

    rect rgb(245, 240, 255)
        note over User, Cart: Phase 5: Trade-In Credit Application & Store Upgrade
        User->>Store: Clicks "Browse Store with Credit" -> #cataloguePage
        Store->>Store: Activates Trade-in Ribbon (₹52,400 Discount)
        Store->>Store: Deducts trade-in from all 11 catalog phones (Net Payable)
        User->>Store: Filters by brand (e.g. Apple) & price slider
        User->>Store: Clicks "Buy Now" on iPhone 15 Pro (₹109,999)
        Store->>Cart: Opens purchasePage with Step 1 (Phone Details)
        User->>Cart: Advances to Step 2 (Checkout) & applies coupon SAVE10
        User->>Cart: Advances to Step 3 (Verification: Doorstep vs Store Visit)
        User->>Cart: Selects Date, Time, Location & confirms
        Cart-->>User: Renders appointment-confirmed with Confetti Burst Celebration
    end
```

---

## 4. Deep-Dive Component Architectures

### 4.1. Valuation Neural Engine (`updateLiveEstimate` & `calculateExchange`)

The valuation subsystem utilizes a deterministic, multi-factor algorithmic matrix to calculate fair secondary market value:

$$\text{Final Price} = \left( \text{Base Price} + \Delta\text{Storage} \right) \times F_{\text{battery}} \times F_{\text{screen}} \times F_{\text{body}} \times F_{\text{sensors}} \times F_{\text{liquid}} \times F_{\text{lock}} + \sum \text{Accessories}$$

```mermaid
flowchart LR
    subgraph Inputs ["Diagnostic Parameters"]
        P_MODEL["Model Identity<br/>(Base Price from PHONE_DATABASE)"]
        P_STORAGE["Storage Tier<br/>(128GB: +0 | 256GB: +3.5k | 512GB: +7k | 1TB: +12k)"]
        P_BATTERY["Battery Capacity<br/>(90%+: 1.0x | 80-89%: 0.92x | <80%: 0.82x)"]
        P_SCREEN["Screen Condition<br/>(Flawless: 1.0x | Minor: 0.92x | Cracked: 0.68x)"]
        P_BODY["Body Condition<br/>(Pristine: 1.0x | Minor: 0.94x | Dents: 0.78x)"]
        P_SENSORS["Hardware Sensors<br/>(All Pass: 1.0x | 1-2 Issues: 0.88x | Faulty: 0.65x)"]
        P_LOCK["Cloud / Activation Lock<br/>(Unlocked: 1.0x | Locked: 0.40x)"]
        P_ACCESS["Accessories Bonus<br/>(Box: +600 | Charger: +600 | Bill: +500 | Warranty: +800)"]
    end

    subgraph Processing ["Valuation Engine"]
        CALC["Algorithmic Matrix Calculator<br/>(Multiplicative Depreciation)"]
        SCORE["Condition Score Normalizer<br/>(Range: 40% - 99%)"]
        GRADE["Grade Classifier<br/>(Grade A+, A, B, C)"]
    end

    subgraph Output ["Quotation Output"]
        OUT_PRICE["Guaranteed Payout<br/>(appState.predictedPrice)"]
        OUT_SCORE["AI Health Score<br/>(appState.evaluationScore)"]
        OUT_BADGE["Grade Certificate & Token"]
    end

    P_MODEL --> CALC
    P_STORAGE --> CALC
    P_BATTERY --> CALC
    P_SCREEN --> CALC
    P_BODY --> CALC
    P_SENSORS --> CALC
    P_LOCK --> CALC
    P_ACCESS --> CALC

    CALC --> SCORE
    SCORE --> GRADE
    CALC --> OUT_PRICE
    SCORE --> OUT_SCORE
    GRADE --> OUT_BADGE
```

---

### 4.2. 6-Tier GSMA IMEI Verification Subsystem

The IMEI diagnostic engine operates as an asynchronous, sequential state machine running 6 independent verification tiers:

```mermaid
stateDiagram-v2
    [*] --> Idle: User Enters 15-Digit IMEI
    Idle --> Tier1_Luhn: User Clicks "Start Verification Check"
    
    state Tier1_Luhn {
        [*] --> LuhnCheck
        LuhnCheck --> LuhnPass: Mod-10 Mathematical Checksum Valid
        LuhnCheck --> Fail: Invalid Parity or Length != 15
    }

    Tier1_Luhn --> Tier2_TAC: Tier 1 Passed
    
    state Tier2_TAC {
        [*] --> TACCheck
        TACCheck --> TACPass: First 8 Digits Match Model Database
        TACCheck --> Fail: Mismatch with Chosen Make/Series
    }

    Tier2_TAC --> Tier3_Blacklist: Tier 2 Passed
    
    state Tier3_Blacklist {
        [*] --> CEIRCheck
        CEIRCheck --> CleanPass: 0 Lost/Stolen/FIR Police Flags
        CEIRCheck --> Fail: Blacklisted IMEI
    }

    Tier3_Blacklist --> Tier4_CloudLock: Tier 3 Passed
    
    state Tier4_CloudLock {
        [*] --> ActivationCheck
        ActivationCheck --> UnlockedPass: iCloud / Knox / FRP Inactive
        ActivationCheck --> Fail: Active MDM / Hardware Locked
    }

    Tier4_CloudLock --> Tier5_CarrierLease: Tier 4 Passed
    
    state Tier5_CarrierLease {
        [*] --> FinancialCheck
        FinancialCheck --> ClearPass: Zero Outstanding Carrier EMI / Contract Debt
        FinancialCheck --> Fail: Unpaid Leases / Carrier Barred
    }

    Tier5_CarrierLease --> Tier6_OEMAuth: Tier 5 Passed
    
    state Tier6_OEMAuth {
        [*] --> CryptoCheck
        CryptoCheck --> AuthenticPass: OEM Logic Board Cryptographic Signature Valid
        CryptoCheck --> Fail: Tampered Component / Unofficial Board
    }

    Tier6_OEMAuth --> Complete: All 6 Checks Passed
    Complete --> [*]: Sets appState.imeiVerified = true & Enables Step 3
    Fail --> [*]: Halts Verification & Alerts User
```

---

### 4.3. Storefront Query, Filter & Dual Slider Engine

The catalogue storefront combines multi-dimensional filtering over in-memory dataset `buyPhones`:

```mermaid
flowchart TD
    RAW["Raw Catalogue Dataset<br/>(11 Verified Flagship Phones)"] --> F_SEARCH{"Search Input<br/>(#phoneSearch)"}
    
    F_SEARCH -- Match Name Substring --> F_BRAND{"Brand Filter<br/>(All, Apple, Samsung, OnePlus, etc.)"}
    F_SEARCH -- No Match --> EMPTY["Display 'No phones found.'"]
    
    F_BRAND -- Match Brand Key --> F_STORAGE{"Storage Filter<br/>(All, 128GB, 256GB, 512GB)"}
    F_BRAND -- No Match --> EMPTY
    
    F_STORAGE -- Match Storage --> F_PRICE{"Price Slider Range<br/>(minPrice <= price <= maxPrice)"}
    F_STORAGE -- No Match --> EMPTY
    
    F_PRICE -- Within Bounds --> SORT{"Sort Selector<br/>(Popular, Price Low-High, Price High-Low, Name A-Z)"}
    F_PRICE -- Out of Bounds --> EMPTY

    SORT --> DEDUCT{"Active Trade-In Credit?<br/>(appState.predictedPrice > 0)"}
    DEDUCT -- Yes --> RENDER_CREDIT["Compute Net Payable:<br/>Net = Math.max(1, Price - Credit)<br/>Render Net Price & Discount Ribbon"]
    DEDUCT -- No --> RENDER_STANDARD["Render Standard Retail Price"]

    RENDER_CREDIT --> GRID["Render Responsive CSS Grid<br/>(#phoneCards)"]
    RENDER_STANDARD --> GRID
```

---

### 4.4. Checkout, Delivery & Appointment Booking Architecture

```mermaid
flowchart TD
    subgraph Step1 ["Step 1: Phone Specifications Review"]
        C1["Device Card Display<br/>(Image, Model, Rating, Storage, Highlights)"]
        C1 --> C1_ACTION["Click 'Proceed to Checkout'"]
    end

    subgraph Step2 ["Step 2: Price Calculation & Coupon Validation"]
        C2_PRICE["Price Breakdown:<br/>Retail Price + Free Insured Delivery"]
        C2_COUPON{"Coupon Applied?<br/>('SAVE10' or 'COHERENT10')"}
        C2_COUPON -- SAVE10 --> C2_DISC["Apply 10% Discount"]
        C2_COUPON -- COHERENT10 --> C2_FLAT["Apply Flat ₹1,500 Discount"]
        C2_COUPON -- Other --> C2_ERR["Display 'Invalid Coupon'"]
        C2_DISC --> C2_TOTAL["Compute Net Payable Balance"]
        C2_FLAT --> C2_TOTAL
        C2_ERR --> C2_TOTAL
        C2_TOTAL --> C2_ACTION["Click 'Continue'"]
    end

    subgraph Step3 ["Step 3: Verification Method & Logistics Scheduling"]
        C3_SELECT{"Choose Verification Channel"}
        C3_SELECT -- Option 1: Doorstep --> V_DOOR["Doorstep Verification<br/>(Agent visits customer address)"]
        C3_SELECT -- Option 2: Store Visit --> V_STORE["Store Visit & Instant Swap<br/>(Customer visits physical branch)"]
        
        V_DOOR --> V_LOC_DOOR["Select Location:<br/>Home Address / Other Address"]
        V_STORE --> V_LOC_STORE["Select Location:<br/>Main Store / City Store"]
        
        V_LOC_DOOR --> APPT["Pick Date (input[type='date']) & Time Slot<br/>(10 AM, 11 AM, 12 PM, 2 PM, 3 PM, 4 PM, 5 PM)"]
        V_LOC_STORE --> APPT
        
        APPT --> APPT_CONFIRM["Click 'Confirm Appointment'"]
    end

    subgraph Step4 ["Step 4: Celebration & Order Finalization"]
        FINAL_TOKEN["Generate Order Token:<br/>CM + Random 6-digit Integer"]
        CONFETTI["Trigger Confetti Burst Engine<br/>(10 Floating Animated DOM Confetti Spans)"]
        FINAL_UI["Render Appointment Confirmed Card<br/>(Date, Time, Location, Verification Method, Ref No)"]
    end

    Step1 --> Step2
    Step2 --> Step3
    Step3 --> Step4
```

---

## 5. State Management & Data Flow Architecture

The platform centralizes all runtime state in a mutable singleton `appState` coupled with explicit helper dispatchers:

```mermaid
classDiagram
    class AppState {
        +Boolean isLoggedIn
        +String userPhone
        +String userEmail
        +String demoOTP
        +String activeBrand
        +String activeSeries
        +String activeModel
        +String activeStorage
        +Number batteryHealth
        +String screenCond
        +String bodyCond
        +String sensorsCond
        +String liquidCond
        +Boolean hasBox
        +Boolean hasCharger
        +Boolean hasBill
        +Boolean hasWarranty
        +Boolean hasParts
        +Boolean hasEarphones
        +String currentIMEI
        +Boolean imeiVerified
        +Number evaluationScore
        +Number predictedPrice
        +String valuationToken
        +Object selectedPhoneForBuy
        +Number appliedCouponDiscount
        +String activationLock
        +Object history
    }

    class RouterController {
        +Array navigationStack
        +navigateTo(viewId, replaceHistory)
        +goBack()
        +updateNavActiveState(viewId)
        +updateBackButtons()
    }

    class ValuationController {
        +selectBrand(brand)
        +handleSeriesChange(series)
        +handleModelChange(model)
        +selectStorage(storage)
        +setBatteryHealth(val, button)
        +selectCondition(type, value, button)
        +toggleIncluded(button)
        +toggleFunctional(button)
        +toggleHistory(type, button)
        +updateLiveEstimate()
        +populateAIEvaluation()
    }

    class IMEIController {
        +fillDemoIMEI()
        +startAutomatedIMEICheck()
        +proceedToAIEvaluation()
    }

    class StoreController {
        +filterPhones()
        +displayPhones(phones)
        +showPhoneDetails(phoneName)
        +showExchange(newPhoneName)
        +calculateExchange(newPhoneName)
        +buyPhone(phoneName)
    }

    class CheckoutController {
        +proceedToCheckout(phoneName)
        +applyCoupon(phoneName)
        +showVerificationOptions(phoneName)
        +selectVerification(element, method)
        +bookAppointment(phoneName)
        +confirmAppointment(phoneName)
        +closePurchasePage()
    }

    AppState <-- RouterController : Reads/Writes Active Views
    AppState <-- ValuationController : Updates Model Specs & Live Price
    AppState <-- IMEIController : Updates IMEI Status & Cleared Flag
    AppState <-- StoreController : Applies Trade-In Deduction
    AppState <-- CheckoutController : Generates Order ID & Reads Totals
```

---

## 6. Security, Compliance & Data Sanitization Architecture

1. **256-Bit Encrypted Data Transit**:
   - All external API communications (QR code, barcode, external image assets) use HTTPS/TLS 1.3 endpoints.
2. **PII Sanitization**:
   - Customer phone numbers and OTP entries are masked in DOM telemetry.
3. **DoD 5220.22-M Compliance Simulation**:
   - Old phone pickup workflow issues a certified military-grade data sanitization certificate before payout disbursement.
4. **GSMA & CEIR Verification**:
   - Prevents fencing of stolen, leased, or blacklisted devices via multi-point integrity checks.

---

## 7. Technology Stack Summary

| Layer | Technologies / Libraries Used | Architecture Responsibility |
| :--- | :--- | :--- |
| **Presentation Tier** | HTML5, CSS3 Custom Properties, Responsive CSS Grid / Flexbox | View containers, dynamic island HUD, glassmorphism, responsive navigation |
| **Animation Engine** | CSS `@keyframes`, SVG conic gradients, requestAnimationFrame | Conic score ring, spark blast, live counter ease-out, confetti burst |
| **Logic & Controller** | Vanilla JavaScript (ES6+), DOM MutationObserver | Router, OTP auto-fill, reactive calculation, state persistence |
| **External APIs** | QRServer API, BWIP-JS Barcode API | Dynamic cryptographic inspection tokens & scannable Code128 barcodes |
| **Testing Framework** | Node.js Built-in Runner (`node:test`, `node:assert/strict`) | 100 comprehensive test case assertions covering M1-M12 |

---

## 8. Conclusion

This High-Level Design defines the modular, decoupled architecture of CoherentMobiles. By separating the UI presentation layer, algorithmic valuation engines, 6-tier verification state machines, and logistics workflows into clean functional subsystems, the application ensures maximum reliability, high performance, and rapid maintainability.
