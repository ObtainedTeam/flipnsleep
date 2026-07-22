import { createContext, useContext, useState, useEffect } from "react";

// flip'nsleep verkoopt in de VS (USD) en Canada (CAD).
const CurrencyContext = createContext({ symbol: "$", isCA: false, region: "US" });

const CA_TZ = ["America/Toronto","America/Vancouver","America/Edmonton","America/Winnipeg",
  "America/Halifax","America/St_Johns","America/Regina","America/Moncton","America/Whitehorse",
  "America/Yellowknife","America/Iqaluit","America/Dawson","America/Creston","America/Fort_Nelson",
  "America/Glace_Bay","America/Goose_Bay","America/Inuvik","America/Cambridge_Bay","America/Dawson_Creek",
  "America/Swift_Current","America/Rankin_Inlet","America/Resolute","America/Atikokan","America/Blanc-Sablon"];

export function CurrencyProvider({ children }) {
  const [isCA, setIsCA] = useState(false);

  useEffect(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const lang = typeof navigator !== "undefined" ? navigator.language : "";
      setIsCA(CA_TZ.includes(tz) || /-CA$/i.test(lang));
    } catch {
      setIsCA(false);
    }
  }, []);

  const symbol = isCA ? "CA$" : "$";
  const region = isCA ? "CA" : "US";

  return (
    <CurrencyContext.Provider value={{ symbol, isCA, region }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}

export function formatPrice(amount, symbol) {
  return `${symbol}${amount.toFixed(2)}`;
}

// Regionale prijs voor een bundel/product met {usd, cad}.
export function getPrice(item, isCA) {
  if (item && item.prices) {
    return isCA ? item.prices.cad : item.prices.usd;
  }
  return item?.price ?? 0;
}
