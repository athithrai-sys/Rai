import React, { useState, useMemo } from "react";

// ---------- Swappo Design Tokens (from mockups v0.2) ----------
const C = {
  orange: "#EE7218",
  orangeDark: "#D9640F",
  peach: "#F0BE94",
  peachLight: "#F6D9BD",
  cream: "#FAF3EC",
  green: "#3FA43F",
  greenLight: "#E9F8DF",
  purple: "#7C4DFF",
  red: "#D93025",
  grey: "#9AA3AE",
  ink: "#1E1E1E",
};
const font = { fontFamily: "'Poppins','Nunito',ui-rounded,system-ui,sans-serif" };

// ---------- Sample inventory (matches mockup items) ----------
const INITIAL_ITEMS = [
  { id: 1, name: "Water pressure cleaner", model: "Kärcher K5", price: 15, cat: "Garden tools", rating: 4, emoji: "🚿", bg: "linear-gradient(135deg,#2c3e50,#4b6584)", pin: [22, 30] },
  { id: 2, name: "Guitar", model: "Model 7", price: 10, cat: "Music instruments", rating: 3, emoji: "🎸", bg: "linear-gradient(135deg,#b8860b,#e8c78e)", pin: [70, 22] },
  { id: 3, name: "Playstation4 Joystick", model: "PS4", price: 10, cat: "Gaming", rating: 1, emoji: "🎮", bg: "linear-gradient(135deg,#f7b733,#fc4a1a)", pin: [80, 38] },
  { id: 4, name: "Bean bag", model: "XL Red", price: 10, cat: "Furniture", rating: 4, emoji: "🛋️", bg: "linear-gradient(135deg,#c0392b,#e57368)", pin: [52, 55] },
  { id: 5, name: "Hammer", model: "Strike Pro", price: 1, cat: "Garden tools", rating: 4, emoji: "🔨", bg: "linear-gradient(135deg,#f5e6d3,#d9c7a9)", pin: [18, 68] },
  { id: 6, name: "Ladder", model: "3-step wood", price: 3, cat: "Garden tools", rating: 3, emoji: "🪜", bg: "linear-gradient(135deg,#8d99ae,#bfc9d4)", pin: [84, 80] },
  { id: 7, name: "Drum set", model: "Pearl Export", price: 15, cat: "Music instruments", rating: 4, emoji: "🥁", bg: "linear-gradient(135deg,#3d2b1f,#7a5c47)", pin: [30, 45] },
  { id: 8, name: "Electric Guitar", model: "Model 465", price: 10, cat: "Music instruments", rating: 3, emoji: "🎸", bg: "linear-gradient(135deg,#6a5acd,#b0a6e8)", pin: [50, 58] },
  { id: 9, name: "Saxophone", model: "Model 90", price: 8, cat: "Music instruments", rating: 1, emoji: "🎷", bg: "linear-gradient(135deg,#caa04b,#f0d495)", pin: [64, 70] },
  { id: 10, name: "Violin", model: "Classic 4/4", price: 8, cat: "Music instruments", rating: 4, emoji: "🎻", bg: "linear-gradient(135deg,#5d4037,#a1887f)", pin: [40, 15] },
  { id: 11, name: "Flute", model: "Silver C", price: 8, cat: "Music instruments", rating: 4, emoji: "🪈", bg: "linear-gradient(135deg,#90a4ae,#cfd8dc)", pin: [12, 50] },
  { id: 12, name: "Bosch accuboormachine", model: "GSR 18V", price: 4, cat: "Garden tools", rating: 5, emoji: "🛠️", bg: "linear-gradient(135deg,#0e5c4a,#2e8b6f)", pin: [60, 40] },
];

const CATEGORIES = [
  { name: "All items", icon: "🧰" },
  { name: "Garden tools", icon: "🌱" },
  { name: "Gaming", icon: "🎮" },
  { name: "Music instruments", icon: "🎸" },
  { name: "Furniture", icon: "🪑" },
  { name: "Others", icon: "➕" },
];

const INITIAL_CHATS = [
  {
    id: "c1", item: "Saxophone | Model 90", emoji: "🎷", unread: 1, time: "Mon 8:07pm",
    msgs: [
      { me: false, t: "8:01pm", text: "Hi! The saxophone is available this weekend." },
      { me: true, t: "8:05pm", text: "Great — I'll share my location shortly." },
      { me: false, t: "8:07pm", text: "Thanks for the location details." },
    ],
  },
  {
    id: "c2", item: "Guitar | Model 7", emoji: "🎸", unread: 0, time: "10/06 6:02pm",
    msgs: [
      { me: true, t: "5:58pm", text: "Picking it up tomorrow at 10, still okay?" },
      { me: false, t: "6:02pm", text: "Thanks! See you soon!" },
    ],
  },
  {
    id: "c3", item: "Playstation Joystick | PS4", emoji: "🎮", unread: 0, time: "28/05 9:05pm",
    msgs: [
      { me: true, t: "9:01pm", text: "Where should we meet for pickup?" },
      { me: false, t: "9:05pm", text: "How about near the station?" },
    ],
  },
];

// ---------- Small shared pieces ----------
const Stars = ({ n, size = 14 }) => (
  <span aria-label={`${n} of 5 stars`}>
    {[1, 2, 3, 4, 5].map((i) => (
      <span key={i} style={{ color: i <= n ? "#E8A33D" : "#D7D7D7", fontSize: size }}>★</span>
    ))}
  </span>
);

const CartIcon = ({ count, onClick, light }) => (
  <button onClick={onClick} aria-label="Rental cart" style={{ position: "relative", background: "none", border: "none", cursor: "pointer", fontSize: 26, color: light ? "#fff" : C.ink }}>
    🛒
    {count > 0 && (
      <span style={{ position: "absolute", top: -6, right: -8, background: "#F7D774", color: C.ink, borderRadius: "50%", width: 20, height: 20, fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>{count}</span>
    )}
  </button>
);

const Pill = ({ children, onClick, bg = C.orange, color = "#fff", disabled, style = {} }) => (
  <button onClick={onClick} disabled={disabled} style={{
    background: disabled ? C.peachLight : bg, color: disabled ? "#fff" : color, border: "none",
    borderRadius: 999, padding: "14px 22px", fontWeight: 700, fontSize: 16, cursor: disabled ? "default" : "pointer",
    width: "100%", ...font, ...style,
  }}>{children}</button>
);

// ---------- Main App ----------
export default function SwappoApp() {
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [screen, setScreen] = useState("login"); // login|signup|home|map|favorites|inbox|chat|detail|cart|confirm|account|dashboard|create
  const [tab, setTab] = useState("home");
  const [postcode, setPostcode] = useState("3451WD");
  const [radius, setRadius] = useState("5 Kms");
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("All items");
  const [favs, setFavs] = useState(new Set([2, 4, 8, 9]));
  const [cart, setCart] = useState([]);
  const [detail, setDetail] = useState(null);
  const [justAdded, setJustAdded] = useState(false);
  const [chats, setChats] = useState(INITIAL_CHATS);
  const [activeChat, setActiveChat] = useState(null);
  const [chatInput, setChatInput] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [fPrice, setFPrice] = useState([0, 10]);
  const [fStars, setFStars] = useState(1);
  const [promo, setPromo] = useState("");
  const [orders, setOrders] = useState(0);
  const [listing, setListing] = useState({ title: "", price: "", cat: "", cond: "", desc: "", anon: true });
  const [lang, setLang] = useState("Dutch");
  const [auth, setAuth] = useState({ name: "Nibhana Shetty", email: "", pw: "" });

  const filtered = useMemo(() => items.filter((it) =>
    (cat === "All items" || it.cat === cat) &&
    it.name.toLowerCase().includes(search.toLowerCase())
  ), [items, cat, search]);

  const mapMatches = useMemo(() => items.filter((it) =>
    (cat === "All items" || it.cat === cat) && it.price >= fPrice[0] && it.price <= fPrice[1] && it.rating >= fStars
  ), [items, cat, fPrice, fStars]);

  const cartTotal = cart.reduce((s, c) => s + c.price * 3, 0);

  const toggleFav = (id) => setFavs((f) => { const n = new Set(f); n.has(id) ? n.delete(id) : n.add(id); return n; });

  const goTab = (t) => { setTab(t); setScreen(t); };

  const addToCart = (it) => { if (!cart.find((c) => c.id === it.id)) setCart([...cart, it]); setJustAdded(true); };

  const buyNow = () => {
    const names = cart.map((c) => `${c.name} | ${c.model}`);
    setChats((cs) => [
      ...names.map((n, i) => ({
        id: "o" + Date.now() + i, item: n, emoji: cart[i].emoji, unread: 1, time: "3:43pm",
        msgs: [{ me: false, t: "3:43pm", text: `Great choice! You have chosen a beautiful ${cart[i].name.toLowerCase()}!` }],
      })), ...cs,
    ]);
    setOrders((o) => o + cart.length);
    setCart([]); setPromo("");
    setScreen("confirm");
  };

  const sendMsg = () => {
    if (!chatInput.trim()) return;
    setChats((cs) => cs.map((c) => c.id !== activeChat ? c : {
      ...c, unread: 0,
      msgs: [...c.msgs, { me: true, t: "now", text: chatInput.trim() }, { me: false, t: "now", text: "Sounds great! See you then. 👍" }],
    }));
    setChatInput("");
  };

  const publishListing = () => {
    if (!listing.title || !listing.price) return;
    setItems((its) => [{
      id: Date.now(), name: listing.title, model: listing.cond || "Good condition",
      price: Number(listing.price) || 5, cat: listing.cat || "Others", rating: 5, emoji: "📦",
      bg: "linear-gradient(135deg,#EE7218,#F0BE94)", pin: [45, 35],
    }, ...its]);
    setListing({ title: "", price: "", cat: "", cond: "", desc: "", anon: true });
    setCat("All items"); goTab("home");
  };

  // ---------- Header ----------
  const Header = () => (
    <div style={{ background: C.peach, padding: "12px 16px", display: "flex", alignItems: "center", gap: 10 }}>
      <button onClick={() => setScreen("account")} aria-label="Account" style={{ border: "3px solid #fff", borderRadius: "50%", width: 46, height: 46, background: "#2aa79b", fontSize: 22, cursor: "pointer", flexShrink: 0 }}>👩</button>
      <input value={postcode} onChange={(e) => setPostcode(e.target.value.toUpperCase())} aria-label="Postcode"
        style={{ ...font, flex: 1, minWidth: 0, border: "none", borderRadius: 10, padding: "12px 12px", fontWeight: 700, fontSize: 15, textAlign: "center" }} />
      <select value={radius} onChange={(e) => setRadius(e.target.value)} aria-label="Search radius"
        style={{ ...font, border: "none", borderRadius: 10, padding: "12px 8px", fontWeight: 700, fontSize: 15, background: "#fff", color: C.ink }}>
        {["1 Kms", "2 Kms", "5 Kms", "10 Kms", "25 Kms"].map((r) => <option key={r}>{r}</option>)}
      </select>
      <CartIcon count={cart.length} onClick={() => setScreen("cart")} />
    </div>
  );

  // ---------- Bottom nav ----------
  const unreadTotal = chats.reduce((s, c) => s + c.unread, 0);
  const NavBtn = ({ id, icon, label }) => (
    <button onClick={() => goTab(id)} aria-label={label} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 26, position: "relative", filter: tab === id ? "none" : "grayscale(1) opacity(.55)" }}>
      {icon}
      {id === "inbox" && unreadTotal > 0 && <span style={{ position: "absolute", top: -4, right: -6, background: C.red, color: "#fff", borderRadius: "50%", width: 16, height: 16, fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>{unreadTotal}</span>}
    </button>
  );
  const BottomNav = () => (
    <div style={{ background: "#fff", borderRadius: "18px 18px 0 0", padding: "14px 30px calc(14px + env(safe-area-inset-bottom))", display: "flex", justifyContent: "space-between", boxShadow: "0 -4px 16px rgba(0,0,0,.12)" }}>
      <NavBtn id="home" icon="🏠" label="Home" />
      <NavBtn id="map" icon="📍" label="Map" />
      <NavBtn id="favorites" icon={<span style={{ color: tab === "favorites" ? C.orange : undefined }}>❤️</span>} label="Favourites" />
      <NavBtn id="inbox" icon="✉️" label="Inbox" />
    </div>
  );

  // ---------- Listing card ----------
  const Card = ({ it }) => (
    <div style={{ background: "#fff", borderRadius: 22, overflow: "hidden", boxShadow: "0 3px 10px rgba(0,0,0,.10)" }}>
      <button onClick={() => { setDetail(it); setJustAdded(false); setScreen("detail"); }} style={{ all: "unset", cursor: "pointer", display: "block", width: "100%" }}>
        <div style={{ position: "relative", height: 130, background: it.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 52 }}>
          {it.emoji}
          <button onClick={(e) => { e.stopPropagation(); toggleFav(it.id); }} aria-label="Toggle favourite"
            style={{ position: "absolute", top: 8, right: 8, background: favs.has(it.id) ? C.red : "#ffffffcc", border: "none", borderRadius: "50%", width: 34, height: 34, cursor: "pointer", fontSize: 16 }}>
            <span style={{ color: favs.has(it.id) ? "#fff" : C.grey }}>♥</span>
          </button>
        </div>
        <div style={{ padding: "8px 10px 12px", textAlign: "center" }}>
          <Stars n={it.rating} />
          <div style={{ fontSize: 14.5, marginTop: 2 }}>{it.name}</div>
          <div style={{ fontWeight: 800, fontSize: 15 }}>{it.price}€ per Day</div>
        </div>
      </button>
    </div>
  );

  // ---------- Screens ----------
  const Login = () => (
    <div style={{ padding: "40px 26px", display: "flex", flexDirection: "column", gap: 14, flex: 1, justifyContent: "center" }}>
      <div style={{ textAlign: "center", marginBottom: 10 }}>
        <div style={{ fontSize: 46, fontWeight: 800, color: "#fff", letterSpacing: 1 }}>Swappo</div>
        <div style={{ color: "#fff", fontSize: 18, marginTop: 6 }}>Hello there!<br />Sign in to Continue</div>
      </div>
      <input placeholder="Please enter Email" value={auth.email} onChange={(e) => setAuth({ ...auth, email: e.target.value })} style={inputStyle} />
      <input placeholder="Please enter Password" type="password" value={auth.pw} onChange={(e) => setAuth({ ...auth, pw: e.target.value })} style={inputStyle} />
      <Pill bg="#fff" color={C.orange} onClick={() => { setScreen("home"); setTab("home"); }}>LOGIN</Pill>
      <div style={{ textAlign: "center", color: "#fff", fontWeight: 700 }}>OR</div>
      <Pill bg={C.orangeDark} onClick={() => setScreen("signup")}>SIGN UP</Pill>
    </div>
  );

  const Signup = () => (
    <div style={{ padding: "40px 26px", display: "flex", flexDirection: "column", gap: 14, flex: 1, justifyContent: "center" }}>
      <div style={{ textAlign: "center", color: "#fff", fontSize: 26, fontWeight: 800, marginBottom: 8 }}>Create new<br />Account</div>
      <input placeholder="Please enter your name" style={inputStyle} />
      <input placeholder="Please enter Email" style={inputStyle} />
      <input placeholder="Please enter Password" type="password" style={inputStyle} />
      <Pill bg="#fff" color={C.orange} onClick={() => { setScreen("home"); setTab("home"); }}>SIGN UP</Pill>
      <button onClick={() => setScreen("login")} style={{ ...font, background: "none", border: "none", color: "#fff", fontWeight: 600, cursor: "pointer" }}>Already Registered? Login</button>
    </div>
  );

  const Home = () => (
    <div style={{ padding: 16, overflowY: "auto", flex: 1 }}>
      <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
        <div style={{ flex: 1, background: "#fff", borderRadius: 14, display: "flex", alignItems: "center", padding: "0 14px" }}>
          <input placeholder="Search item here" value={search} onChange={(e) => setSearch(e.target.value)}
            style={{ ...font, border: "none", outline: "none", flex: 1, padding: "13px 0", fontSize: 15 }} />
          <span style={{ color: C.grey, fontSize: 18 }}>🔍</span>
        </div>
        <button onClick={() => { goTab("map"); setShowFilters(true); }} aria-label="Filters" style={{ background: "#fff", border: "none", borderRadius: 14, width: 50, fontSize: 20, cursor: "pointer" }}>⚙️</button>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
        {CATEGORIES.map((c) => (
          <button key={c.name} onClick={() => setCat(c.name)} style={{
            ...font, display: "flex", alignItems: "center", gap: 6, background: cat === c.name ? "#111" : "#fff",
            color: cat === c.name ? "#fff" : C.ink, border: "none", borderRadius: 12, padding: "9px 12px", fontWeight: 600, fontSize: 13.5, cursor: "pointer",
          }}><span>{c.icon}</span>{c.name}</button>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, paddingBottom: 10 }}>
        {filtered.map((it) => <Card key={it.id} it={it} />)}
      </div>
      {filtered.length === 0 && <div style={{ color: "#fff", textAlign: "center", padding: 30 }}>No items match your search. Try another word or category.</div>}
    </div>
  );

  const Favorites = () => {
    const favItems = items.filter((i) => favs.has(i.id));
    return (
      <div style={{ padding: 16, overflowY: "auto", flex: 1 }}>
        <div style={{ color: "#fff", fontWeight: 800, fontSize: 22, marginBottom: 12 }}>Favourites</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          {favItems.map((it) => <Card key={it.id} it={it} />)}
        </div>
        {favItems.length === 0 && <div style={{ color: "#fff", textAlign: "center", padding: 30 }}>Tap the ♥ on any item to save it here.</div>}
      </div>
    );
  };

  const MapView = () => (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#fff", overflow: "hidden", position: "relative" }}>
      <div style={{ textAlign: "center", padding: "16px 20px 8px" }}>
        <button onClick={() => setShowFilters(true)} aria-label="Open filters" style={{ position: "absolute", right: 16, top: 14, background: "none", border: "none", fontSize: 22, cursor: "pointer" }}>⚙️</button>
        <div style={{ fontSize: 30, fontWeight: 700 }}>Results</div>
        <div style={{ color: "#444", fontSize: 14.5, marginTop: 4 }}>
          {cat === "All items" ? "Check out the items in your area." : `Check out the ${cat.toLowerCase()} in your area.`}<br />
          Tap a pin to view rental price & reviews.
        </div>
      </div>
      <div style={{ flex: 1, position: "relative", background: "#EFEFEF" }}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
          {[[0,20,100,14],[0,52,100,10],[0,82,100,8]].map((r,i)=>(<rect key={"h"+i} x={r[0]} y={r[1]} width={r[2]} height={r[3]} fill="#fff" transform={`rotate(${i*7-6} 50 50)`} />))}
          {[[16,0,9,100],[44,0,7,100],[72,0,10,100]].map((r,i)=>(<rect key={"v"+i} x={r[0]} y={r[1]} width={r[2]} height={r[3]} fill="#fff" transform={`rotate(${i*9-8} 50 50)`} />))}
          {[[4,4],[30,6],[58,3],[84,6],[6,34],[34,32],[60,30],[86,32],[4,64],[32,62],[62,60],[88,64],[8,88],[40,88],[70,88]].map((p,i)=>(<rect key={"b"+i} x={p[0]} y={p[1]} width={12+(i%3)*4} height={10+(i%2)*6} rx={2} fill="#DBDBDB" />))}
        </svg>
        {mapMatches.map((it) => (
          <button key={it.id} onClick={() => { setDetail(it); setJustAdded(false); setScreen("detail"); }} aria-label={it.name}
            style={{ position: "absolute", left: `${it.pin[0]}%`, top: `${it.pin[1]}%`, transform: "translate(-50%,-100%)", background: "none", border: "none", fontSize: 30, cursor: "pointer", filter: `drop-shadow(0 2px 2px rgba(0,0,0,.25)) hue-rotate(${0}deg)` }}>
            <span style={{ color: C.orange }}>📍</span>
          </button>
        ))}
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 10, display: "flex", gap: 10, overflowX: "auto", padding: "0 14px" }}>
          {mapMatches.map((it) => (
            <button key={it.id} onClick={() => { setDetail(it); setJustAdded(false); setScreen("detail"); }}
              style={{ all: "unset", cursor: "pointer", flexShrink: 0, width: 190, borderRadius: 18, overflow: "hidden", boxShadow: "0 4px 12px rgba(0,0,0,.2)" }}>
              <div style={{ height: 90, background: it.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40 }}>{it.emoji}</div>
              <div style={{ background: C.orange, color: "#fff", textAlign: "center", padding: "6px 8px" }}>
                <Stars n={it.rating} size={12} />
                <div style={{ fontSize: 13.5 }}>{it.name}</div>
                <div style={{ fontWeight: 800, fontSize: 14 }}>{it.price}€ per Day</div>
              </div>
            </button>
          ))}
          {mapMatches.length === 0 && <div style={{ background: "#fff", borderRadius: 14, padding: 14, margin: "0 auto", fontSize: 14 }}>No items match these filters. Widen the price or star range.</div>}
        </div>
      </div>
      {showFilters && (
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.15)" }} onClick={() => setShowFilters(false)}>
          <div onClick={(e) => e.stopPropagation()} style={{ position: "absolute", top: 0, right: 0, bottom: 90, left: "12%", background: C.cream, borderRadius: "24px 0 0 24px", padding: 22, overflowY: "auto", boxShadow: "-6px 0 24px rgba(0,0,0,.2)" }}>
            <div style={{ fontSize: 26, fontWeight: 800, marginBottom: 14 }}>Filters</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 18 }}>
              {["Rental price", "Review", "Min. Duration"].map((f) => (
                <span key={f} style={{ background: C.orange, color: "#fff", borderRadius: 999, padding: "8px 14px", fontWeight: 700, fontSize: 13.5 }}>{f} ✕</span>
              ))}
            </div>
            <div style={{ fontWeight: 800, marginBottom: 6 }}>Rental price per day:</div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
              <select value={fPrice[0]} onChange={(e) => setFPrice([+e.target.value, fPrice[1]])} style={selStyle}>{[0,1,3,5,8].map((v)=><option key={v} value={v}>{v}€</option>)}</select>
              <b>to</b>
              <select value={fPrice[1]} onChange={(e) => setFPrice([fPrice[0], +e.target.value])} style={selStyle}>{[5,8,10,15,25].map((v)=><option key={v} value={v}>{v}€</option>)}</select>
            </div>
            <div style={{ fontWeight: 800, marginBottom: 6 }}>Review:</div>
            <div style={{ marginBottom: 4 }}>
              {[1,2,3,4,5].map((s)=>(
                <button key={s} onClick={()=>setFStars(s)} aria-label={`Minimum ${s} stars`} style={{ background:"none", border:"none", fontSize:26, cursor:"pointer", color: s<=fStars ? "#E8A33D" : "#D7D7D7" }}>★</button>
              ))}
            </div>
            <div style={{ fontSize: 13, color: "#555", marginBottom: 18 }}>to ★★★★★ (min. {fStars} star{fStars>1?"s":""})</div>
            <div style={{ fontWeight: 800, marginBottom: 6 }}>Rental duration:</div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
              <select style={selStyle}><option>1 day</option><option>2 days</option></select><b>to</b>
              <select style={selStyle}><option>3 days</option><option>7 days</option></select>
            </div>
            <div style={{ fontWeight: 800, marginBottom: 6 }}>Available dates:</div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 22, fontSize: 14 }}>
              <span style={dateBox}>25/07/2026</span><b>to</b><span style={dateBox}>28/07/2026</span>
            </div>
            <Pill onClick={() => setShowFilters(false)}>See {mapMatches.length} result{mapMatches.length !== 1 ? "s" : ""}</Pill>
          </div>
        </div>
      )}
    </div>
  );

  const Detail = () => detail && (
    <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
      <button onClick={() => setScreen(tab)} style={{ ...font, background: "none", border: "none", color: "#fff", fontWeight: 700, fontSize: 16, cursor: "pointer", marginBottom: 12 }}>« Back to other options</button>
      {!justAdded ? (
        <div style={{ background: "#fff", borderRadius: 26, padding: 22, textAlign: "center" }}>
          <div style={{ fontSize: 23, fontWeight: 800, marginBottom: 14 }}>{detail.name} | {detail.model}</div>
          <div style={{ height: 190, borderRadius: 20, background: detail.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 84, marginBottom: 16 }}>{detail.emoji}</div>
          <Stars n={detail.rating} size={22} />
          <div style={{ fontWeight: 800, marginTop: 6 }}>Rental price per day: {detail.price}€</div>
          <div style={{ color: C.orange, fontWeight: 700, marginTop: 18 }}>Available for pick up at</div>
          <div style={{ fontWeight: 800, fontSize: 18 }}>{postcode}</div>
          <div style={{ color: C.orange, fontWeight: 700, marginTop: 12 }}>on the following days</div>
          <div style={{ fontWeight: 800 }}>25/07/2026 to 28/07/2026</div>
          <div style={{ fontSize: 12.5, color: "#777", marginTop: 10 }}>Exact address is shared in chat after your order is confirmed.</div>
          <div style={{ marginTop: 22 }}>
            <Pill bg={cart.find((c) => c.id === detail.id) ? C.peachLight : C.peach} color="#fff" onClick={() => addToCart(detail)}>🛒 Add to rental cart</Pill>
          </div>
        </div>
      ) : (
        <div style={{ background: C.greenLight, borderRadius: 26, padding: 22, textAlign: "center" }}>
          <div style={{ fontSize: 23, fontWeight: 800, marginBottom: 14 }}>{detail.name} | {detail.model}</div>
          <div style={{ height: 190, borderRadius: 20, background: detail.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 84, marginBottom: 20 }}>{detail.emoji}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, textAlign: "left", marginBottom: 26 }}>
            <span style={{ background: "#2FA036", color: "#fff", borderRadius: "50%", width: 42, height: 42, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>✓</span>
            <b style={{ fontSize: 17 }}>This item has been added to your rental cart</b>
          </div>
          <Pill onClick={() => setScreen("cart")}>🛒 Go to rental cart</Pill>
          <div style={{ height: 10 }} />
          <Pill bg={C.peach} onClick={() => { setScreen(tab); }}>« Add more items to rental cart</Pill>
        </div>
      )}
    </div>
  );

  const Cart = () => (
    <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
      <div style={{ color: "#fff", fontWeight: 800, fontSize: 19, marginBottom: 8 }}>Items in your rental cart:</div>
      {cart.length === 0 && <div style={{ background: "#fff", borderRadius: 18, padding: 18, marginBottom: 16 }}>Your rental cart is empty. Browse the home tab and add an item.</div>}
      {cart.map((c) => (
        <div key={c.id} style={{ background: "#fff", borderRadius: 18, padding: 16, marginBottom: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
            <div>
              <div style={{ fontWeight: 800, color: "#555", fontSize: 16 }}>{c.name} | {c.model}</div>
              <div style={{ color: "#777", fontSize: 14 }}>{c.price}€ per day</div>
              <div style={{ color: "#777", fontSize: 14 }}>25/07/2026 - 28/07/2026</div>
            </div>
            <button onClick={() => setCart(cart.filter((x) => x.id !== c.id))} aria-label="Remove" style={{ background: "none", border: "none", cursor: "pointer", color: C.grey, fontSize: 18, alignSelf: "flex-start" }}>✕</button>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontWeight: 800, fontSize: 17 }}>
            <span>Total Rental price:</span><span style={{ color: C.orange }}>{c.price * 3}€</span>
          </div>
        </div>
      ))}
      {cart.length > 0 && (
        <>
          <div style={{ color: "#fff", fontWeight: 800, fontSize: 19, margin: "14px 0 8px" }}>Pick up address:</div>
          <div style={{ background: "#fff", borderRadius: 18, padding: 16, marginBottom: 14 }}>
            <div style={{ fontWeight: 800, fontSize: 18 }}>📍 {postcode}</div>
            <div style={{ color: "#666", fontSize: 13.5, marginTop: 6 }}>Address will be confirmed via message from renter once order has been confirmed.</div>
          </div>
          <div style={{ color: "#fff", fontWeight: 800, fontSize: 19, marginBottom: 8 }}>Payment information:</div>
          <div style={{ background: "#fff", borderRadius: 16, padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <b style={{ fontSize: 16 }}><span style={{ background: "#CC0066", color: "#fff", borderRadius: 4, padding: "2px 5px", fontSize: 12, marginRight: 8 }}>iDEAL</span>iDeal - ABN AMRO</b>
            <span style={{ color: C.orange, fontWeight: 900 }}>»</span>
          </div>
          <div style={{ background: "#fff", borderRadius: 16, padding: "12px 16px", marginBottom: 22 }}>
            <div style={{ fontWeight: 700, color: "#555", fontSize: 14, marginBottom: 8 }}>Gift Voucher and promotional codes:</div>
            <div style={{ display: "flex", gap: 10 }}>
              <input value={promo} onChange={(e) => setPromo(e.target.value)} placeholder="Enter code" style={{ ...font, flex: 1, border: "1.5px solid #999", borderRadius: 8, padding: "9px 10px", fontSize: 14 }} />
              <button style={{ ...font, background: C.orange, color: "#fff", border: "none", borderRadius: 999, padding: "9px 20px", fontWeight: 700, cursor: "pointer" }}>Apply</button>
            </div>
          </div>
          <div style={{ color: "#fff", textAlign: "right", fontWeight: 800, marginBottom: 10 }}>Order total: {cartTotal}€</div>
          <Pill bg={C.peach} onClick={buyNow}>Buy now</Pill>
        </>
      )}
    </div>
  );

  const Confirm = () => (
    <div style={{ flex: 1, padding: 20, display: "flex", flexDirection: "column" }}>
      <div style={{ background: "#fff", borderRadius: 8, padding: "36px 24px", marginTop: 30, position: "relative" }}>
        <span style={{ position: "absolute", top: -22, left: -6, fontSize: 40 }}>✨</span>
        <div style={{ fontSize: 40, fontWeight: 800, color: C.peach, lineHeight: 1.15 }}>Your ORDER<br />has been<br />PLACED!</div>
        <span style={{ position: "absolute", bottom: 8, right: 14, fontSize: 46 }}>🎉</span>
      </div>
      <div style={{ color: "#F6D9BD", fontWeight: 800, letterSpacing: 2, textAlign: "right", marginTop: 60, fontSize: 15 }}>
        YOU MAY CONTACT THE<br />LISTER BY CLICKING THE<br />MAILBOX ICON!
      </div>
      <div style={{ color: "#BFE8FF", fontWeight: 800, letterSpacing: 2, marginTop: 40, fontSize: 15 }}>
        CLICK ON THE<br />"HOME" ICON TO GO<br />BACK TO HOME PAGE
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 40, marginTop: 10 }}>
        <span>⤵️</span><span>⤵️</span>
      </div>
    </div>
  );

  const Inbox = () => (
    <div style={{ flex: 1, overflowY: "auto" }}>
      <div style={{ background: C.peach, padding: "0 16px 14px", color: "#fff", fontWeight: 800, fontSize: 21 }}>Inbox & Notifications</div>
      <div style={{ padding: 14 }}>
        <div style={{ background: "#fff", borderRadius: 20, overflow: "hidden" }}>
          {chats.map((c, i) => (
            <button key={c.id} onClick={() => { setActiveChat(c.id); setChats((cs) => cs.map((x) => x.id === c.id ? { ...x, unread: 0 } : x)); setScreen("chat"); }}
              style={{ ...font, all: "unset", cursor: "pointer", display: "flex", width: "100%", boxSizing: "border-box", gap: 12, padding: "16px 14px", borderTop: i ? "6px solid #EFEFEF" : "none", alignItems: "center" }}>
              <span style={{ width: 52, height: 52, borderRadius: "50%", background: "#eee", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, flexShrink: 0 }}>{c.emoji}</span>
              <span style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 800, fontSize: 15.5 }}>{c.item}</div>
                <div style={{ color: c.unread ? "#333" : "#999", fontSize: 13.5, fontWeight: c.unread ? 700 : 400, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.msgs[c.msgs.length - 1].text}</div>
              </span>
              <span style={{ textAlign: "right", fontSize: 12, color: "#888", flexShrink: 0 }}>
                <div style={{ fontWeight: c.unread ? 800 : 400, color: c.unread ? "#333" : "#888" }}>{c.time}</div>
                {c.unread > 0 && <div style={{ background: C.orange, color: "#fff", borderRadius: "50%", width: 22, height: 22, display: "inline-flex", alignItems: "center", justifyContent: "center", fontWeight: 800, marginTop: 4 }}>{c.unread}</div>}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const Chat = () => {
    const c = chats.find((x) => x.id === activeChat);
    if (!c) return null;
    return (
      <div style={{ flex: 1, display: "flex", flexDirection: "column", background: C.peach }}>
        <div style={{ padding: "0 16px 12px", color: "#fff", fontWeight: 800, fontSize: 19, display: "flex", gap: 10, alignItems: "center" }}>
          <button onClick={() => setScreen("inbox")} style={{ background: "none", border: "none", color: "#fff", fontSize: 22, cursor: "pointer" }}>«</button>
          {c.item}
        </div>
        <div style={{ flex: 1, background: "#fff", borderRadius: "22px 22px 0 0", padding: 16, overflowY: "auto", display: "flex", flexDirection: "column", gap: 14 }}>
          {c.msgs.map((m, i) => (
            <div key={i} style={{ display: "flex", gap: 10, flexDirection: m.me ? "row-reverse" : "row" }}>
              <span style={{ width: 44, height: 44, borderRadius: "50%", background: m.me ? "#2aa79b" : "#eee", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{m.me ? "👩" : c.emoji}</span>
              <div style={{ maxWidth: "72%" }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#666", textAlign: m.me ? "right" : "left" }}>{m.t}</div>
                <div style={{ background: m.me ? "#FDEBDD" : "#F2F2F2", borderRadius: 14, padding: "10px 12px", fontSize: 14.5 }}>{m.text}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ background: "#fff", padding: "10px 14px", display: "flex", gap: 10 }}>
          <input value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendMsg()} placeholder="Type your message here"
            style={{ ...font, flex: 1, border: "2px solid #555", borderRadius: 999, padding: "12px 16px", fontSize: 14.5, outline: "none" }} />
          <button onClick={sendMsg} aria-label="Send" style={{ background: "#43A047", border: "none", borderRadius: "50%", width: 50, height: 50, color: "#fff", fontSize: 20, cursor: "pointer" }}>➤</button>
        </div>
      </div>
    );
  };

  const MenuRow = ({ icon, label, right, onClick, highlight }) => (
    <button onClick={onClick} style={{ ...font, all: "unset", cursor: "pointer", display: "flex", alignItems: "center", gap: 16, background: highlight ? "#BDBDBD" : "#fff", color: highlight ? "#fff" : "#666", padding: "17px 18px", width: "100%", boxSizing: "border-box", borderRadius: 4, fontSize: 17, fontWeight: highlight ? 800 : 500 }}>
      <span style={{ fontSize: 21 }}>{icon}</span><span style={{ flex: 1 }}>{label}</span>{right && <span>{right}</span>}
    </button>
  );

  const Account = () => (
    <div style={{ flex: 1, overflowY: "auto" }}>
      <div style={{ background: C.peach, padding: "10px 20px 26px", display: "flex", alignItems: "center", gap: 16 }}>
        <span style={{ width: 76, height: 76, borderRadius: "50%", border: "4px solid #fff", background: "#2aa79b", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 38 }}>👩</span>
        <span style={{ color: "#fff", fontWeight: 800, fontSize: 28 }}>{auth.name}</span>
      </div>
      <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
        <MenuRow icon="✉️" label="Inbox" onClick={() => goTab("inbox")} />
        <MenuRow icon="🛒" label={`Orders${orders ? ` (${orders})` : ""}`} onClick={() => setScreen("cart")} />
        <MenuRow icon="🏷️" label="Your listings!" onClick={() => setScreen("dashboard")} />
        <div style={{ height: 8 }} />
        <MenuRow icon="⚙️" label="Settings" />
        <MenuRow icon="🌐" label="Language" right={lang} onClick={() => setLang(lang === "Dutch" ? "English" : "Dutch")} />
        <div style={{ height: 8 }} />
        <MenuRow icon="🤝" label="Need help?" />
        <MenuRow icon="⭐" label="Feedback" />
        <MenuRow icon="⚠️" label="Report a complaint" />
        <div style={{ height: 8 }} />
        <MenuRow icon="⏻" label="Sign out" onClick={() => setScreen("login")} />
      </div>
    </div>
  );

  const Stat = ({ big, label, sub, icon }) => (
    <div style={{ background: "#E9E9E9", borderRadius: 18, padding: 16, position: "relative" }}>
      <div style={{ fontSize: 30, fontWeight: 800 }}>{big}</div>
      <div style={{ fontWeight: 800, fontSize: 14.5 }}>{label}</div>
      {sub && <div style={{ fontSize: 12.5, color: "#666" }}>{sub}</div>}
      <span style={{ position: "absolute", top: 12, right: 14, fontSize: 22 }}>{icon}</span>
    </div>
  );

  const myListings = items.length - INITIAL_ITEMS.length;
  const Dashboard = () => (
    <div style={{ flex: 1, overflowY: "auto" }}>
      <div style={{ background: C.peach, padding: "10px 20px 20px", display: "flex", alignItems: "center", gap: 14 }}>
        <button onClick={() => setScreen("account")} style={{ background: "none", border: "none", color: "#fff", fontSize: 24, cursor: "pointer" }}>«</button>
        <span style={{ width: 62, height: 62, borderRadius: "50%", border: "4px solid #fff", background: "#2aa79b", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30 }}>👩</span>
        <span style={{ color: "#fff", fontWeight: 800, fontSize: 24 }}>{auth.name}</span>
      </div>
      <div style={{ background: "#fff", borderRadius: 24, margin: 14, padding: 18 }}>
        <Pill onClick={() => setScreen("create")}>📝 Create new listing !</Pill>
        <div style={{ fontWeight: 800, fontSize: 19, margin: "20px 0 10px" }}>Listing overview:</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <Stat big={chats.filter((c) => c.unread).length} label="Chats to answer" icon="💬" />
          <Stat big={9 + myListings} label="Active listings" icon="🏷️" />
          <Stat big="1" label="Listings to review" icon="🔄" />
        </div>
        <div style={{ fontWeight: 800, fontSize: 19, margin: "22px 0 10px" }}>Performance:</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <Stat big={`€ ${26 + orders * 10}`} label="Profit history" />
          <Stat big="72" label="Clicks on listings" sub="Last 7 days" />
          <Stat big="4.2 ★" label="Seller rating" sub="7 ratings" />
        </div>
      </div>
    </div>
  );

  const CreateListing = () => (
    <div style={{ flex: 1, overflowY: "auto" }}>
      <div style={{ background: C.peach, padding: "10px 20px 20px", display: "flex", alignItems: "center", gap: 14 }}>
        <button onClick={() => setScreen("dashboard")} style={{ background: "none", border: "none", color: "#fff", fontSize: 24, cursor: "pointer" }}>«</button>
        <span style={{ color: "#fff", fontWeight: 800, fontSize: 24 }}>New listing</span>
      </div>
      <div style={{ background: "#fff", borderRadius: 24, margin: 14, padding: 18 }}>
        <div style={{ background: "#E9E9E9", borderRadius: 18, padding: "28px 0", textAlign: "center", fontWeight: 800, cursor: "pointer" }}>🖼️➕<br />Add photos</div>
        <div style={{ fontSize: 12.5, color: "#555", margin: "8px 0 16px" }}>Photos: 0/10  |  Choose your listing's main photo first.</div>
        {[["Title", "title"], ["Price (€ per day)", "price"]].map(([ph, k]) => (
          <input key={k} placeholder={ph} value={listing[k]} onChange={(e) => setListing({ ...listing, [k]: e.target.value })}
            style={{ ...font, width: "100%", boxSizing: "border-box", border: "2px solid #555", borderRadius: 999, padding: "14px 18px", fontSize: 15.5, marginBottom: 12, outline: "none" }} />
        ))}
        <select value={listing.cat} onChange={(e) => setListing({ ...listing, cat: e.target.value })} style={{ ...font, width: "100%", border: "2px solid #555", borderRadius: 999, padding: "14px 18px", fontSize: 15.5, marginBottom: 12, background: "#fff", color: listing.cat ? C.ink : "#888" }}>
          <option value="">Category</option>{CATEGORIES.slice(1).map((c) => <option key={c.name}>{c.name}</option>)}
        </select>
        <select value={listing.cond} onChange={(e) => setListing({ ...listing, cond: e.target.value })} style={{ ...font, width: "100%", border: "2px solid #555", borderRadius: 999, padding: "14px 18px", fontSize: 15.5, marginBottom: 12, background: "#fff", color: listing.cond ? C.ink : "#888" }}>
          <option value="">Condition</option><option>Like new</option><option>Good</option><option>Used</option>
        </select>
        <input placeholder="Description (including brand)" value={listing.desc} onChange={(e) => setListing({ ...listing, desc: e.target.value })}
          style={{ ...font, width: "100%", boxSizing: "border-box", border: "2px solid #555", borderRadius: 999, padding: "14px 18px", fontSize: 15.5, marginBottom: 16, outline: "none" }} />
        <div style={{ fontWeight: 800, fontSize: 18 }}>Location</div>
        <div style={{ color: "#666", fontWeight: 700, marginBottom: 14 }}>Utrecht | {postcode} | <span style={{ color: "#1A73E8", cursor: "pointer" }}>Edit</span></div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div>
            <div style={{ fontWeight: 800, fontSize: 18 }}>Privacy Setting</div>
            <div style={{ color: "#888", fontWeight: 700 }}>Show listing anonymously</div>
          </div>
          <button onClick={() => setListing({ ...listing, anon: !listing.anon })} aria-label="Toggle anonymity"
            style={{ width: 56, height: 32, borderRadius: 999, border: "none", cursor: "pointer", background: listing.anon ? "#666" : "#ccc", position: "relative" }}>
            <span style={{ position: "absolute", top: 3, left: listing.anon ? 27 : 3, width: 26, height: 26, borderRadius: "50%", background: "#fff", transition: "left .15s" }} />
          </button>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <Pill bg="#43A047" onClick={publishListing} disabled={!listing.title || !listing.price} style={{ flex: 1 }}>Publish</Pill>
          <Pill bg="#8E8E8E" onClick={() => setScreen("dashboard")} style={{ flex: 1 }}>Cancel</Pill>
        </div>
      </div>
    </div>
  );

  // ---------- Layout shell ----------
  const showHeader = !["login", "signup", "inbox", "chat", "account", "dashboard", "create", "confirm"].includes(screen);
  const showNav = !["login", "signup", "chat"].includes(screen);

  const SCREENS = { login: Login, signup: Signup, home: Home, map: MapView, favorites: Favorites, inbox: Inbox, chat: Chat, detail: Detail, cart: Cart, confirm: Confirm, account: Account, dashboard: Dashboard, create: CreateListing };
  const Screen = SCREENS[screen] || Home;

  return (
    <div style={{ ...font, minHeight: "100vh", background: "#3a3a3a", display: "flex", justifyContent: "center", alignItems: "stretch", color: C.ink }}>
      <div style={{ width: "100%", maxWidth: 430, background: ["inbox", "chat", "account", "dashboard", "create"].includes(screen) ? C.peach : C.orange, display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        {showHeader && <Header />}
        <Screen />
        {showNav && <BottomNav />}
      </div>
    </div>
  );
}

const inputStyle = { fontFamily: "'Poppins','Nunito',ui-rounded,system-ui,sans-serif", border: "none", borderRadius: 999, padding: "15px 20px", fontSize: 15.5, outline: "none" };
const selStyle = { fontFamily: "'Poppins','Nunito',ui-rounded,system-ui,sans-serif", border: "1.5px solid #333", borderRadius: 6, padding: "8px 10px", fontSize: 15, fontWeight: 700, background: "#fff", color: "#7C4DFF" };
const dateBox = { border: "1.5px solid #333", borderRadius: 6, padding: "8px 10px", fontWeight: 700, background: "#fff" };
