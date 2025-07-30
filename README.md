# Simple Term Deposit Calculator

Term Deposit Calculator built with React Native, Expo, and TypeScript.

## Project Structure

```
simple-term-deposit/
├── src/
│   ├── app/                    # Expo Router pages
│   │   ├── _layout.tsx         # Root layout
│   │   └── index.tsx           # Home screen
│   ├── components/             # Reusable UI components
│   │   ├── InputField.tsx      # Form input with validation
│   │   ├── Label.tsx           # Form labels
│   │   ├── Result.tsx          # Calculation results display
│   │   ├── Select.tsx          # Dropdown selector
│   │   └── TermDepositForm.tsx # Main calculator form
│   └── utils/                  # Business logic & utilities
│       ├── calculator.ts       # Interest calculation logic
│       ├── validator.ts        # Form validation rules
│       └── __test__/           # Unit tests
│           ├── calculator.test.ts
│           └── validator.test.ts
```

## Quick Start

### Prerequisites

Make sure you have the following installed on your machine:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **Expo CLI** - Install globally: `npm install -g @expo/cli`
- **Expo Go app** on your mobile device:
  - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
  - [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

### Installation Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/AhsanT4riq/simple-term-deposit.git
   cd simple-term-deposit
   ```

2. **Install dependencies**

   ```bash
   bun install
   ```

3. **Start the development server**

   ```bash
   bun start
   ```

4. **Run on your device/simulator**

   After starting the dev server, you'll see a QR code in your terminal. You can:
   - Press `a` in terminal or run `bun run android`
   - Press `i` in terminal or run `bun run ios`

## Running Tests

```bash
# Run tests
bun test

# Run with coverage
bun test --coverage
```

## Calculation Methods

The app uses different formulas based on payment frequency:

- **Compound Interest**: `A = P(1 + r/n)^(nt)`
  - P = Principal amount
  - r = Annual interest rate (decimal)
  - n = Compounding frequency per year
  - t = Time in years
- **Simple Interest** (At Maturity): `A = P(1 + rt)`
