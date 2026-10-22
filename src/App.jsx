import { useState, useMemo } from "react";

/* ---------- MENU DATA ----------
   Images: Unsplash (free licence, commercial use ok). Agar koi link na chale to
   emoji automatically show hoga. Apni images ke liye bas `img` badal dein. */
const U = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=500&q=70`;

const MENU = [
  // Burgers
  { id: 1, cat: "Burgers", name: "Classic Cheese Burger", price: 650, emoji: "🍔", img: U("photo-1568901346375-23c9450c58cd") },
  { id: 2, cat: "Burgers", name: "Double Cheese Burger", price: 890, emoji: "🍔", img: U("photo-1550547660-d9450f859349") },
  { id: 3, cat: "Burgers", name: "Zinger Burger", price: 580, emoji: "🍔", img: U("photo-1606755962773-d324e0a13086") },
  { id: 4, cat: "Burgers", name: "BBQ Beef Burger", price: 790, emoji: "🍔", img: U("photo-1553979459-d2229ba7433b") },
  { id: 5, cat: "Burgers", name: "Mushroom Swiss Burger", price: 820, emoji: "🍔", img: U("photo-1572802419224-296b0aeee0d9") },
  { id: 6, cat: "Burgers", name: "Veggie Burger", price: 520, emoji: "🥬", img: U("photo-1520072959219-c595dc870360") },
  // Pizza
  { id: 7, cat: "Pizza", name: "Margherita Pizza", price: 950, emoji: "🍕", img: U("photo-1513104890138-7c749659a591") },
  { id: 8, cat: "Pizza", name: "Pepperoni Pizza", price: 1250, emoji: "🍕", img: U("photo-1565299624946-b28f40a0ae38") },
  { id: 9, cat: "Pizza", name: "Chicken Fajita Pizza", price: 1150, emoji: "🍕", img: U("photo-1604382354936-07c5d9983bd3") },
  { id: 10, cat: "Pizza", name: "Cheese Lover Pizza", price: 1100, emoji: "🧀", img: U("photo-1574071318508-1cdbab80d002") },
  // Fries & Sides
  { id: 11, cat: "Fries & Sides", name: "Crispy Fries", price: 250, emoji: "🍟", img: U("photo-1573080496219-bb080dd4f877") },
  { id: 12, cat: "Fries & Sides", name: "Loaded Cheese Fries", price: 420, emoji: "🍟", img: U("photo-1630384060421-cb20d0e0649d") },
  { id: 13, cat: "Fries & Sides", name: "Onion Rings", price: 320, emoji: "🧅", img: U("photo-1639024471283-03518883512d") },
  { id: 14, cat: "Fries & Sides", name: "Chicken Nuggets (6)", price: 450, emoji: "🍗", img: U("photo-1562967914-608f82629710") },
  // Chicken
  { id: 15, cat: "Chicken", name: "Fried Chicken (2 pc)", price: 590, emoji: "🍗", img: U("photo-1626645738196-c2a7c87a8f58") },
  { id: 16, cat: "Chicken", name: "Chicken Wings (6)", price: 540, emoji: "🍗", img: U("photo-1608039829572-78524f79c4c7") },
  { id: 17, cat: "Chicken", name: "Crispy Strips (4)", price: 520, emoji: "🍗", img: U("photo-1562967916-eb82221dfb92") },
  // Wraps & Sandwiches
  { id: 18, cat: "Wraps & Sandwiches", name: "Chicken Shawarma Wrap", price: 450, emoji: "🌯", img: U("photo-1561651823-34feb02250e4") },
  { id: 19, cat: "Wraps & Sandwiches", name: "Club Sandwich", price: 620, emoji: "🥪", img: U("photo-1528735602780-2552fd46c7af") },
  { id: 20, cat: "Wraps & Sandwiches", name: "Grilled Tikka Sandwich", price: 480, emoji: "🥪", img: U("photo-1509722747041-616f39b57569") },
  // Hot Dogs
  { id: 21, cat: "Hot Dogs", name: "Classic Hot Dog", price: 380, emoji: "🌭", img: U("photo-1612392062631-94dd858cba88") },
  { id: 22, cat: "Hot Dogs", name: "Cheesy Jumbo Hot Dog", price: 520, emoji: "🌭", img: U("photo-1619740455993-9e612b1af08a") },
  // Drinks
  { id: 23, cat: "Drinks", name: "Cola", price: 120, emoji: "🥤", img: U("photo-1622483767028-3f66f32aef97") },
  { id: 24, cat: "Drinks", name: "Fresh Lemonade", price: 220, emoji: "🍋", img: U("photo-1621263764928-df1444c5e859") },
  { id: 25, cat: "Drinks", name: "Chocolate Milkshake", price: 390, emoji: "🥛", img: U("photo-1572490122747-3968b75cc699") },
  { id: 26, cat: "Drinks", name: "Iced Coffee", price: 340, emoji: "🧋", img: U("photo-1461023058943-07fcbe16d735") },
  // Desserts
  { id: 27, cat: "Desserts", name: "Choco Lava Cake", price: 350, emoji: "🍰", img: U("photo-1624353365286-3f8d62daad51") },
  { id: 28, cat: "Desserts", name: "Vanilla Ice Cream", price: 220, emoji: "🍨", img: U("photo-1563805042-7684c019e1cb") },
  { id: 29, cat: "Desserts", name: "Glazed Donut", price: 180, emoji: "🍩", img: U("photo-1551024601-bec78aea704b") },
];

const CATS = ["All", ...Array.from(new Set(MENU.map((m) => m.cat)))];
const TAX = 0.05;
const rs = (n) => "Rs. " + Math.round(n).toLocaleString("en-PK");

/* ---------- STYLES (yellow + black + red accent) ---------- */
const css = `
:root{--y:#FFC400;--y2:#FFD84D;--k:#121212;--k2:#1E1E1E;--k3:#2A2A2A;--r:#E63946;--w:#fff;--mute:#a8a8a8}
*{box-sizing:border-box;margin:0}
body{font-family:'Poppins',system-ui,sans-serif;background:var(--k);color:var(--w)}
.app{display:grid;grid-template-columns:1fr 380px;height:100vh}
.main{display:flex;flex-direction:column;min-width:0;overflow:hidden}
.top{padding:16px 20px;background:var(--k2);border-bottom:3px solid var(--y);display:flex;gap:14px;align-items:center;flex-wrap:wrap}
.logo{font-weight:800;font-size:22px;color:var(--y);white-space:nowrap}
.logo span{color:var(--w)}
.search{flex:1;min-width:180px;padding:11px 16px;border-radius:30px;border:2px solid var(--k3);background:var(--k);color:var(--w);font-size:15px;outline:none}
.search:focus{border-color:var(--y)}
.cats{display:flex;gap:8px;padding:12px 20px;overflow-x:auto;background:var(--k2)}
.cat{flex:none;padding:8px 16px;border-radius:30px;border:2px solid var(--k3);background:transparent;color:var(--w);cursor:pointer;font-weight:600;font-size:14px}
.cat.on{background:var(--y);color:var(--k);border-color:var(--y)}
.grid{padding:20px;overflow-y:auto;display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:16px;align-content:start;flex:1}
.card{background:var(--k2);border-radius:16px;overflow:hidden;border:2px solid transparent;display:flex;flex-direction:column;transition:.15s}
.card:hover{border-color:var(--y);transform:translateY(-3px)}
.imgbox{height:130px;background:var(--k3);display:flex;align-items:center;justify-content:center;font-size:56px}
.imgbox img{width:100%;height:100%;object-fit:cover;display:block}
.cb{padding:12px;display:flex;flex-direction:column;gap:6px;flex:1}
.cn{font-weight:600;font-size:14px;line-height:1.3}
.cc{font-size:12px;color:var(--mute)}
.row{display:flex;justify-content:space-between;align-items:center;margin-top:auto;gap:8px}
.price{color:var(--y);font-weight:700}
.add{background:var(--y);color:var(--k);border:0;border-radius:10px;padding:8px 12px;font-weight:700;cursor:pointer}
.add:hover{background:var(--y2)}
.empty{grid-column:1/-1;text-align:center;color:var(--mute);padding:50px 0}
.cart{background:var(--k2);border-left:3px solid var(--y);display:flex;flex-direction:column;min-height:0}
.ch{padding:16px 20px;font-weight:700;font-size:18px;display:flex;justify-content:space-between;align-items:center}
.clear{background:none;border:0;color:var(--r);cursor:pointer;font-weight:600}
.items{flex:1;overflow-y:auto;padding:0 16px}
.ci{display:flex;gap:10px;align-items:center;padding:10px 0;border-bottom:1px solid var(--k3)}
.ci .t{flex:1;min-width:0}
.ci .n{font-size:14px;font-weight:600}
.ci .p{font-size:12px;color:var(--mute)}
.qty{display:flex;align-items:center;gap:8px}
.qb{width:28px;height:28px;border-radius:8px;border:0;background:var(--k3);color:var(--w);font-size:16px;cursor:pointer}
.qb:hover{background:var(--y);color:var(--k)}
.lt{width:80px;text-align:right;font-weight:700;color:var(--y);font-size:14px}
.rm{background:none;border:0;color:var(--r);cursor:pointer;font-size:16px}
.sum{padding:16px 20px;border-top:1px solid var(--k3);display:flex;flex-direction:column;gap:6px}
.sum div{display:flex;justify-content:space-between;font-size:14px;color:var(--mute)}
.sum .tot{color:var(--w);font-size:20px;font-weight:800}
.sum .tot b{color:var(--y)}
.pay{margin-top:8px;background:var(--r);color:#fff;border:0;border-radius:12px;padding:14px;font-size:16px;font-weight:700;cursor:pointer}
.pay:disabled{opacity:.4;cursor:not-allowed}
.fab{display:none}
.ov{position:fixed;inset:0;background:rgba(0,0,0,.75);display:flex;align-items:center;justify-content:center;z-index:50;padding:14px}
.bill{background:#fff;color:#111;width:100%;max-width:380px;border-radius:14px;padding:22px;max-height:92vh;overflow-y:auto;font-family:'Courier New',monospace}
.bill h2{text-align:center;font-family:'Poppins',sans-serif;font-weight:800}
.bill .c{text-align:center;font-size:12px;color:#555}
.bill hr{border:0;border-top:2px dashed #999;margin:12px 0}
.bl{display:flex;justify-content:space-between;font-size:13px;margin:4px 0;gap:8px}
.bl.g{font-size:17px;font-weight:800}
.pm{display:flex;gap:8px;margin:10px 0}
.pm button{flex:1;padding:8px;border-radius:8px;border:2px solid #ddd;background:#fff;cursor:pointer;font-weight:700}
.pm button.on{background:var(--y);border-color:var(--k)}
.acts{display:flex;gap:8px;margin-top:14px}
.acts button{flex:1;padding:11px;border-radius:10px;border:0;font-weight:700;cursor:pointer}
.b1{background:var(--k);color:var(--y)}.b2{background:var(--y);color:var(--k)}
.close{display:none}
@media(max-width:860px){
 .app{grid-template-columns:1fr;height:100dvh}
 .cart{position:fixed;inset:auto 0 0 0;height:85dvh;transform:translateY(110%);transition:.25s;z-index:40;border-left:0;border-top:3px solid var(--y);border-radius:20px 20px 0 0}
 .cart.open{transform:none}
 .close{display:block;background:none;border:0;color:var(--w);font-size:22px;cursor:pointer}
 .fab{display:flex;position:fixed;right:16px;bottom:16px;z-index:30;background:var(--y);color:var(--k);border:0;border-radius:30px;padding:14px 20px;font-weight:800;font-size:15px;gap:8px;box-shadow:0 6px 20px rgba(0,0,0,.5);cursor:pointer}
 .grid{grid-template-columns:repeat(2,1fr);gap:12px;padding:14px 14px 90px}
 .imgbox{height:105px}
}
@media print{body *{visibility:hidden}.bill,.bill *{visibility:visible}.bill{position:absolute;left:0;top:0}.acts,.pm{display:none}}
`;

function Img({ item }) {
  const [bad, setBad] = useState(false);
  return (
    <div className="imgbox">
      {bad ? item.emoji : <img src={item.img} alt={item.name} loading="lazy" onError={() => setBad(true)} />}
    </div>
  );
}

export default function App() {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const [cart, setCart] = useState({}); // id -> qty
  const [open, setOpen] = useState(false);
  const [bill, setBill] = useState(null);
  const [method, setMethod] = useState("Cash");

  const list = useMemo(
    () =>
      MENU.filter(
        (m) =>
          (cat === "All" || m.cat === cat) &&
          m.name.toLowerCase().includes(q.trim().toLowerCase())
      ),
    [cat, q]
  );

  const lines = MENU.filter((m) => cart[m.id]).map((m) => ({ ...m, qty: cart[m.id] }));
  const count = lines.reduce((s, l) => s + l.qty, 0);
  const sub = lines.reduce((s, l) => s + l.qty * l.price, 0);
  const tax = sub * TAX;
  const total = sub + tax;

  const add = (id) => setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
  const dec = (id) =>
    setCart((c) => {
      const n = { ...c };
      if (n[id] > 1) n[id]--;
      else delete n[id];
      return n;
    });
  const del = (id) =>
    setCart((c) => {
      const n = { ...c };
      delete n[id];
      return n;
    });

  const pay = () => {
    setBill({
      no: "CB-" + Math.floor(1000 + Math.random() * 9000),
      date: new Date().toLocaleString("en-GB"),
      lines, sub, tax, total,
    });
    setOpen(false);
  };
  const newOrder = () => { setBill(null); setCart({}); setMethod("Cash"); };

  return (
    <>
      <style>{css}</style>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800&display=swap" rel="stylesheet" />
      <div className="app">
        <div className="main">
          <div className="top">
            <div className="logo">🍔 CHEESE <span>BURGER</span></div>
            <input className="search" placeholder="Search burger, pizza, fries..." value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
          <div className="cats">
            {CATS.map((c) => (
              <button key={c} className={"cat" + (cat === c ? " on" : "")} onClick={() => setCat(c)}>{c}</button>
            ))}
          </div>
          <div className="grid">
            {list.length === 0 && <div className="empty">Koi item nahi mila. Dusra naam search karein.</div>}
            {list.map((m) => (
              <div className="card" key={m.id}>
                <Img item={m} />
                <div className="cb">
                  <div className="cn">{m.name}</div>
                  <div className="cc">{m.cat}</div>
                  <div className="row">
                    <span className="price">{rs(m.price)}</span>
                    <button className="add" onClick={() => add(m.id)}>+ Add</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className={"cart" + (open ? " open" : "")}>
          <div className="ch">
            <span>🛒 Current Order</span>
            <span>
              {count > 0 && <button className="clear" onClick={() => setCart({})}>Clear</button>}
              <button className="close" onClick={() => setOpen(false)}>✕</button>
            </span>
          </div>
          <div className="items">
            {lines.length === 0 && <div className="empty" style={{ padding: "40px 0" }}>Cart khali hai. Menu se item add karein.</div>}
            {lines.map((l) => (
              <div className="ci" key={l.id}>
                <div className="t">
                  <div className="n">{l.name}</div>
                  <div className="p">{rs(l.price)} each</div>
                </div>
                <div className="qty">
                  <button className="qb" onClick={() => dec(l.id)}>−</button>
                  <b>{l.qty}</b>
                  <button className="qb" onClick={() => add(l.id)}>+</button>
                </div>
                <div className="lt">{rs(l.price * l.qty)}</div>
                <button className="rm" onClick={() => del(l.id)} aria-label="Remove">🗑</button>
              </div>
            ))}
          </div>
          <div className="sum">
            <div><span>Subtotal</span><span>{rs(sub)}</span></div>
            <div><span>Tax (5%)</span><span>{rs(tax)}</span></div>
            <div className="tot"><span>Total</span><b>{rs(total)}</b></div>
            <button className="pay" disabled={!count} onClick={pay}>Pay Now</button>
          </div>
        </aside>

        <button className="fab" onClick={() => setOpen(true)}>🛒 {count} items · {rs(total)}</button>
      </div>

      {bill && (
        <div className="ov">
          <div className="bill">
            <h2>🍔 CHEESE BURGER</h2>
            <div className="c">Fast Food Restaurant</div>
            <hr />
            <div className="bl"><span>Bill #{bill.no}</span><span>{bill.date}</span></div>
            <hr />
            {bill.lines.map((l) => (
              <div className="bl" key={l.id}>
                <span>{l.qty} x {l.name}</span><span>{rs(l.qty * l.price)}</span>
              </div>
            ))}
            <hr />
            <div className="bl"><span>Subtotal</span><span>{rs(bill.sub)}</span></div>
            <div className="bl"><span>Tax (5%)</span><span>{rs(bill.tax)}</span></div>
            <div className="bl g"><span>TOTAL</span><span>{rs(bill.total)}</span></div>
            <hr />
            <div className="pm">
              {["Cash", "Card", "Easypaisa"].map((m) => (
                <button key={m} className={method === m ? "on" : ""} onClick={() => setMethod(m)}>{m}</button>
              ))}
            </div>
            <div className="bl"><span>Paid by</span><span>{method}</span></div>
            <div className="c" style={{ marginTop: 10 }}>Shukriya! Dobara tashreef layein 🙂</div>
            <div className="acts">
              <button className="b1" onClick={() => window.print()}>Print</button>
              <button className="b2" onClick={newOrder}>New Order</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
