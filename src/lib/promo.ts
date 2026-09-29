// The look of a "quick special" slide. Shared by the TV and the dashboard preview.
// Sizes use --u (1% of the screen width): 1vw on the TV, 1cqw inside a preview box.
export const PROMO_CSS = `
.promo{position:absolute;inset:0;top:0;left:0;right:0;bottom:0;overflow:hidden;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:0 8%;box-sizing:border-box;font-family:'Grandstander','Nunito',Verdana,sans-serif}
.promo .p-head{font-weight:800;font-size:calc(var(--u,1vw)*7.2);line-height:1.02;letter-spacing:-.01em;max-width:88%;margin:0}
.promo .p-price{display:inline-block;margin-top:calc(var(--u,1vw)*2.6);font-weight:800;font-size:calc(var(--u,1vw)*8.5);line-height:1;padding:calc(var(--u,1vw)*1.4) calc(var(--u,1vw)*3.4);border-radius:calc(var(--u,1vw)*3);transform:rotate(-3deg)}
.promo .p-detail{font-family:'Nunito',Verdana,sans-serif;font-weight:700;font-size:calc(var(--u,1vw)*2.9);line-height:1.3;margin-top:calc(var(--u,1vw)*2.6);max-width:80%;opacity:.92}
.promo .p-venue{position:absolute;bottom:calc(var(--u,1vw)*2.4);left:0;right:0;font-family:'Nunito',Verdana,sans-serif;font-weight:800;font-size:calc(var(--u,1vw)*1.7);letter-spacing:.14em;text-transform:uppercase;opacity:.7}
.promo .p-dot{position:absolute;border-radius:50%;opacity:.16}
.promo .d1{width:calc(var(--u,1vw)*38);height:calc(var(--u,1vw)*38);top:calc(var(--u,1vw)*-12);left:calc(var(--u,1vw)*-10)}
.promo .d2{width:calc(var(--u,1vw)*26);height:calc(var(--u,1vw)*26);bottom:calc(var(--u,1vw)*-9);right:calc(var(--u,1vw)*-6)}
.promo.berry{background:#C23A64;color:#fff}.promo.berry .p-price{background:#FFC857;color:#2E2140}.promo.berry .p-dot{background:#FFC857}
.promo.night{background:#2E2140;color:#fff}.promo.night .p-price{background:#C23A64;color:#fff}.promo.night .p-dot{background:#C23A64;opacity:.35}
.promo.sun{background:#FFC857;color:#2E2140}.promo.sun .p-price{background:#2E2140;color:#FFC857}.promo.sun .p-dot{background:#C23A64}
.promo.fresh{background:#0F766E;color:#fff}.promo.fresh .p-price{background:#fff;color:#0F766E}.promo.fresh .p-dot{background:#FFC857}
.promo.clean{background:#F4F8FE;color:#2E2140}.promo.clean .p-price{background:#C23A64;color:#fff}.promo.clean .p-dot{background:#2E2140;opacity:.07}
`;

export const PROMO_STYLE_NAMES: Record<string, string> = {
  berry: 'Berry', night: 'Night', sun: 'Sunshine', fresh: 'Fresh', clean: 'Clean',
};
