import { useState, useEffect } from 'react';

// flip'nsleep brand tokens — afgeleid uit het Figma-ontwerp.
export const c = {
  navy:"#201B5D", purple:"#3A217F", night:"#141040",
  cream:"#F9F8F3", sky:"#D5EBF9", sky2:"#C0E5FF", skyDeep:"#8FC4F4",
  amber:"#FDCA6F", amberD:"#F5B54A",
  pastelYellow:"#FBDD8E", pastelPink:"#F4A0B5", pastelMint:"#B9E4C1", pastelBlue:"#BFE0F8",
  white:"#FFFFFF", ink:"#201B5D", grayD:"#55507A", gray:"#8B86C9",
};

export const FONT_DISPLAY = "'Palo Wide Black','Archivo Black',sans-serif";
export const FONT_SUB = "'Masiva Medium','Poppins',sans-serif";
export const FONT_BODY = "'Poppins',sans-serif";

export const useIsMobile = () => {
  // Tijdens prerenderen bestaat window niet. Start op false (desktop) en
  // corrigeer in de effect, die draait alleen in de browser.
  const [isMobile, setIsMobile] = useState(
    typeof window === 'undefined' ? false : window.innerWidth < 768
  );
  useEffect(() => {
    const h = () => setIsMobile(window.innerWidth < 768);
    h();
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);
  return isMobile;
};

export const BTN = {
  background:`linear-gradient(180deg, ${c.amber}, ${c.amberD})`, color:c.navy, border:"none",
  borderRadius:999, padding:"14px 32px", fontSize:13, fontFamily:FONT_BODY,
  letterSpacing:"0.06em", textTransform:"uppercase", cursor:"pointer", fontWeight:700,
  display:"inline-block", boxShadow:"0 8px 18px rgba(245,181,74,.45)", textDecoration:"none",
};

export const BTNO = {
  background:"transparent", color:c.navy, border:`2px solid ${c.navy}`,
  borderRadius:999, padding:"12px 28px", fontSize:13, fontFamily:FONT_BODY,
  letterSpacing:"0.06em", textTransform:"uppercase", cursor:"pointer", fontWeight:700,
  display:"inline-block", textDecoration:"none",
};

export const H2 = {
  fontFamily:FONT_DISPLAY, fontSize:30, fontWeight:400, color:c.navy,
  marginBottom:10, letterSpacing:"0", lineHeight:1.2,
};

export const EYEBROW = {
  fontFamily:FONT_SUB, fontSize:12, fontWeight:500, letterSpacing:"0.14em",
  textTransform:"uppercase", color:c.purple,
};
