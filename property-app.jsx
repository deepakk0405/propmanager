import { useState } from "react";

const COLORS = {
  bg: "#0F1117",
  surface: "#16181F",
  surface2: "#1E2028",
  border: "#2A2C36",
  accent: "#4F6EF7",
  accent2: "#7C3AED",
  green: "#22C55E",
  yellow: "#F59E0B",
  red: "#EF4444",
  text: "#F1F0EE",
  muted: "#8B8FA8",
  card: "#1A1C25",
};

const initialProperties = [
  { id: 1, name: "Sunset Apartments 4B", address: "42 Sunset Blvd, LA", type: "Apartment", rent: 2200, status: "Occupied", tenant: "Maria Garcia", image: "🏢", bedrooms: 2, bathrooms: 1, sqft: 890 },
  { id: 2, name: "Oak Street Villa", address: "18 Oak Street, Austin", type: "Villa", rent: 3500, status: "Occupied", tenant: "James Wilson", image: "🏡", bedrooms: 3, bathrooms: 2, sqft: 1600 },
  { id: 3, name: "Downtown Loft 9A", address: "200 Main St, NYC", type: "Loft", rent: 4200, status: "Vacant", tenant: null, image: "🏙️", bedrooms: 1, bathrooms: 1, sqft: 720 },
  { id: 4, name: "Riverside Studio", address: "5 River Rd, Chicago", type: "Studio", rent: 1400, status: "Occupied", tenant: "Priya Patel", image: "🏠", bedrooms: 0, bathrooms: 1, sqft: 480 },
  { id: 5, name: "Maple Grove 2C", address: "77 Maple Ave, Denver", type: "Apartment", rent: 1800, status: "Vacant", tenant: null, image: "🏘️", bedrooms: 2, bathrooms: 1, sqft: 950 },
];

const initialTenants = [
  { id: 1, name: "Maria Garcia", email: "maria@email.com", phone: "+1 555-0101", property: "Sunset Apartments 4B", leaseStart: "2024-01-01", leaseEnd: "2024-12-31", rent: 2200, status: "Active", paid: true, avatar: "MG" },
  { id: 2, name: "James Wilson", email: "james@email.com", phone: "+1 555-0102", property: "Oak Street Villa", leaseStart: "2023-06-01", leaseEnd: "2024-05-31", rent: 3500, status: "Active", paid: true, avatar: "JW" },
  { id: 3, name: "Priya Patel", email: "priya@email.com", phone: "+1 555-0103", property: "Riverside Studio", leaseStart: "2024-03-01", leaseEnd: "2025-02-28", rent: 1400, status: "Active", paid: false, avatar: "PP" },
];

const initialMaintenance = [
  { id: 1, property: "Sunset Apartments 4B", tenant: "Maria Garcia", issue: "Leaking faucet in kitchen", priority: "Medium", status: "In Progress", date: "2024-11-20", category: "Plumbing" },
  { id: 2, property: "Oak Street Villa", tenant: "James Wilson", issue: "AC unit not cooling properly", priority: "High", status: "Open", date: "2024-11-22", category: "HVAC" },
  { id: 3, property: "Riverside Studio", tenant: "Priya Patel", issue: "Broken window latch", priority: "Low", status: "Resolved", date: "2024-11-15", category: "Windows" },
  { id: 4, property: "Sunset Apartments 4B", tenant: "Maria Garcia", issue: "Hallway light burnt out", priority: "Low", status: "Open", date: "2024-11-23", category: "Electrical" },
];

const rentHistory = [
  { month: "Jun", collected: 7400, expected: 9300 },
  { month: "Jul", collected: 9300, expected: 9300 },
  { month: "Aug", collected: 8100, expected: 9300 },
  { month: "Sep", collected: 9300, expected: 9300 },
  { month: "Oct", collected: 7900, expected: 9300 },
  { month: "Nov", collected: 7800, expected: 9300 },
];

const Badge = ({ label, color }) => {
  const map = {
    green: { bg: "#22C55E22", text: "#22C55E" },
    yellow: { bg: "#F59E0B22", text: "#F59E0B" },
    red: { bg: "#EF444422", text: "#EF4444" },
    blue: { bg: "#4F6EF722", text: "#4F6EF7" },
    purple: { bg: "#7C3AED22", text: "#A78BFA" },
    gray: { bg: "#8B8FA822", text: "#8B8FA8" },
  };
  const c = map[color] || map.gray;
  return (
    <span style={{ background: c.bg, color: c.text, padding: "3px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: 600, letterSpacing: "0.5px" }}>
      {label}
    </span>
  );
};

const StatCard = ({ icon, label, value, sub, color }) => (
  <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: "12px", padding: "20px 24px", flex: 1, minWidth: "140px" }}>
    <div style={{ fontSize: "22px", marginBottom: "8px" }}>{icon}</div>
    <div style={{ fontSize: "26px", fontWeight: 700, color: color || COLORS.text, marginBottom: "2px" }}>{value}</div>
    <div style={{ fontSize: "12px", color: COLORS.muted }}>{label}</div>
    {sub && <div style={{ fontSize: "11px", color: color || COLORS.accent, marginTop: "4px" }}>{sub}</div>}
  </div>
);

// ── OVERVIEW ──────────────────────────────────────────────────────────────────
function Overview({ properties, tenants, maintenance, onNav }) {
  const occupied = properties.filter(p => p.status === "Occupied").length;
  const totalRent = tenants.reduce((a, t) => a + t.rent, 0);
  const unpaid = tenants.filter(t => !t.paid).length;
  const openMaint = maintenance.filter(m => m.status !== "Resolved").length;
  const maxVal = Math.max(...rentHistory.map(r => r.expected));

  return (
    <div>
      <div style={{ marginBottom: "28px" }}>
        <h2 style={{ fontSize: "24px", fontWeight: 700, margin: "0 0 4px" }}>Good morning 👋</h2>
        <p style={{ color: COLORS.muted, margin: 0, fontSize: "14px" }}>Here's your portfolio overview for November 2024</p>
      </div>

      {/* Stats */}
      <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", marginBottom: "28px" }}>
        <StatCard icon="🏠" label="Properties" value={properties.length} sub={`${occupied} occupied`} />
        <StatCard icon="💰" label="Monthly Rent" value={`$${totalRent.toLocaleString()}`} sub="collected this month" color={COLORS.green} />
        <StatCard icon="👥" label="Tenants" value={tenants.length} sub={unpaid > 0 ? `${unpaid} payment overdue` : "All paid"} color={unpaid > 0 ? COLORS.red : COLORS.green} />
        <StatCard icon="🔧" label="Maintenance" value={openMaint} sub="open requests" color={openMaint > 0 ? COLORS.yellow : COLORS.green} />
      </div>

      {/* Rent chart + recent activity */}
      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
        {/* Chart */}
        <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: "12px", padding: "24px", flex: 2, minWidth: "280px" }}>
          <div style={{ fontWeight: 600, marginBottom: "4px" }}>Rent Collection</div>
          <div style={{ fontSize: "12px", color: COLORS.muted, marginBottom: "20px" }}>Last 6 months</div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: "10px", height: "120px" }}>
            {rentHistory.map((r, i) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", height: "100%" }}>
                <div style={{ flex: 1, width: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: "2px" }}>
                  <div style={{ width: "100%", height: `${(r.collected / maxVal) * 100}%`, background: `linear-gradient(180deg, ${COLORS.accent}, ${COLORS.accent2})`, borderRadius: "4px 4px 0 0", minHeight: "4px", transition: "height 0.3s" }} />
                </div>
                <div style={{ fontSize: "10px", color: COLORS.muted }}>{r.month}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: "16px", marginTop: "12px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", color: COLORS.muted }}>
              <div style={{ width: "10px", height: "10px", borderRadius: "2px", background: `linear-gradient(${COLORS.accent}, ${COLORS.accent2})` }} /> Collected
            </div>
          </div>
        </div>

        {/* Recent activity */}
        <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: "12px", padding: "24px", flex: 1, minWidth: "240px" }}>
          <div style={{ fontWeight: 600, marginBottom: "16px" }}>Recent Activity</div>
          {[
            { icon: "💵", text: "Rent received from Maria Garcia", time: "2h ago", color: COLORS.green },
            { icon: "🔧", text: "New maintenance: AC issue at Oak St", time: "5h ago", color: COLORS.yellow },
            { icon: "📄", text: "Lease renewed for James Wilson", time: "1d ago", color: COLORS.accent },
            { icon: "⚠️", text: "Rent overdue: Priya Patel", time: "2d ago", color: COLORS.red },
          ].map((a, i) => (
            <div key={i} style={{ display: "flex", gap: "12px", marginBottom: "14px", alignItems: "flex-start" }}>
              <div style={{ fontSize: "16px", marginTop: "1px" }}>{a.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "12px", color: COLORS.text, lineHeight: 1.4 }}>{a.text}</div>
                <div style={{ fontSize: "11px", color: COLORS.muted, marginTop: "2px" }}>{a.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── PROPERTIES ────────────────────────────────────────────────────────────────
function Properties({ properties, setProperties }) {
  const [selected, setSelected] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [newProp, setNewProp] = useState({ name: "", address: "", type: "Apartment", rent: "", bedrooms: 1, bathrooms: 1, sqft: "" });

  const prop = selected ? properties.find(p => p.id === selected) : null;

  const addProperty = () => {
    if (!newProp.name || !newProp.address || !newProp.rent) return;
    setProperties(prev => [...prev, { ...newProp, id: Date.now(), status: "Vacant", tenant: null, image: "🏠", rent: parseInt(newProp.rent), sqft: parseInt(newProp.sqft) || 0 }]);
    setShowAdd(false);
    setNewProp({ name: "", address: "", type: "Apartment", rent: "", bedrooms: 1, bathrooms: 1, sqft: "" });
  };

  if (prop) return (
    <div>
      <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", color: COLORS.accent, cursor: "pointer", marginBottom: "20px", fontSize: "14px", padding: 0 }}>← Back to Properties</button>
      <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: "16px", padding: "32px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <div style={{ fontSize: "40px", marginBottom: "8px" }}>{prop.image}</div>
            <h2 style={{ fontSize: "22px", fontWeight: 700, margin: "0 0 4px" }}>{prop.name}</h2>
            <div style={{ color: COLORS.muted, fontSize: "13px" }}>{prop.address}</div>
          </div>
          <Badge label={prop.status} color={prop.status === "Occupied" ? "green" : "yellow"} />
        </div>
        <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", marginTop: "24px", padding: "20px", background: COLORS.surface2, borderRadius: "10px" }}>
          {[["Type", prop.type], ["Rent", `$${prop.rent}/mo`], ["Bedrooms", prop.bedrooms || "Studio"], ["Bathrooms", prop.bathrooms], ["Sq Ft", prop.sqft]].map(([k, v]) => (
            <div key={k}><div style={{ fontSize: "11px", color: COLORS.muted, marginBottom: "2px" }}>{k}</div><div style={{ fontWeight: 600 }}>{v}</div></div>
          ))}
        </div>
        {prop.tenant && (
          <div style={{ marginTop: "20px", padding: "16px", background: COLORS.surface2, borderRadius: "10px" }}>
            <div style={{ fontSize: "12px", color: COLORS.muted, marginBottom: "8px" }}>CURRENT TENANT</div>
            <div style={{ fontWeight: 600 }}>{prop.tenant}</div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h2 style={{ fontSize: "22px", fontWeight: 700, margin: "0 0 4px" }}>Properties</h2>
          <p style={{ color: COLORS.muted, margin: 0, fontSize: "13px" }}>{properties.length} total · {properties.filter(p => p.status === "Occupied").length} occupied</p>
        </div>
        <button onClick={() => setShowAdd(true)} style={{ background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accent2})`, color: "#fff", border: "none", borderRadius: "8px", padding: "10px 18px", cursor: "pointer", fontWeight: 600, fontSize: "13px" }}>+ Add Property</button>
      </div>

      {showAdd && (
        <div style={{ background: COLORS.card, border: `1px solid ${COLORS.accent}55`, borderRadius: "12px", padding: "24px", marginBottom: "20px" }}>
          <div style={{ fontWeight: 600, marginBottom: "16px" }}>New Property</div>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            {[["Property Name", "name", "text"], ["Address", "address", "text"], ["Monthly Rent ($)", "rent", "number"], ["Sq Ft", "sqft", "number"]].map(([label, key, type]) => (
              <div key={key} style={{ flex: 1, minWidth: "160px" }}>
                <div style={{ fontSize: "11px", color: COLORS.muted, marginBottom: "4px" }}>{label}</div>
                <input value={newProp[key]} onChange={e => setNewProp(p => ({ ...p, [key]: e.target.value }))} type={type}
                  style={{ width: "100%", background: COLORS.surface2, border: `1px solid ${COLORS.border}`, borderRadius: "6px", padding: "8px 10px", color: COLORS.text, fontSize: "13px", boxSizing: "border-box" }} />
              </div>
            ))}
            <div style={{ flex: 1, minWidth: "160px" }}>
              <div style={{ fontSize: "11px", color: COLORS.muted, marginBottom: "4px" }}>Type</div>
              <select value={newProp.type} onChange={e => setNewProp(p => ({ ...p, type: e.target.value }))}
                style={{ width: "100%", background: COLORS.surface2, border: `1px solid ${COLORS.border}`, borderRadius: "6px", padding: "8px 10px", color: COLORS.text, fontSize: "13px" }}>
                {["Apartment", "Villa", "Studio", "Loft", "House"].map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div style={{ display: "flex", gap: "10px", marginTop: "16px" }}>
            <button onClick={addProperty} style={{ background: COLORS.accent, color: "#fff", border: "none", borderRadius: "8px", padding: "9px 18px", cursor: "pointer", fontWeight: 600, fontSize: "13px" }}>Add</button>
            <button onClick={() => setShowAdd(false)} style={{ background: COLORS.surface2, color: COLORS.muted, border: `1px solid ${COLORS.border}`, borderRadius: "8px", padding: "9px 18px", cursor: "pointer", fontSize: "13px" }}>Cancel</button>
          </div>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "14px" }}>
        {properties.map(p => (
          <div key={p.id} onClick={() => setSelected(p.id)} style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: "12px", padding: "20px", cursor: "pointer", transition: "border-color 0.2s", hover: { borderColor: COLORS.accent } }}
            onMouseEnter={e => e.currentTarget.style.borderColor = COLORS.accent}
            onMouseLeave={e => e.currentTarget.style.borderColor = COLORS.border}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
              <span style={{ fontSize: "28px" }}>{p.image}</span>
              <Badge label={p.status} color={p.status === "Occupied" ? "green" : "yellow"} />
            </div>
            <div style={{ fontWeight: 600, fontSize: "15px", marginBottom: "2px" }}>{p.name}</div>
            <div style={{ fontSize: "12px", color: COLORS.muted, marginBottom: "14px" }}>{p.address}</div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div><div style={{ fontSize: "11px", color: COLORS.muted }}>Rent</div><div style={{ fontWeight: 700, color: COLORS.green }}>${p.rent.toLocaleString()}/mo</div></div>
              <div><div style={{ fontSize: "11px", color: COLORS.muted }}>Type</div><div style={{ fontSize: "13px" }}>{p.type}</div></div>
              <div><div style={{ fontSize: "11px", color: COLORS.muted }}>Beds</div><div style={{ fontSize: "13px" }}>{p.bedrooms || "Studio"}</div></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── TENANTS ───────────────────────────────────────────────────────────────────
function Tenants({ tenants, setTenants }) {
  const [selected, setSelected] = useState(null);
  const tenant = selected ? tenants.find(t => t.id === selected) : null;

  const togglePaid = (id) => setTenants(prev => prev.map(t => t.id === id ? { ...t, paid: !t.paid } : t));

  if (tenant) return (
    <div>
      <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", color: COLORS.accent, cursor: "pointer", marginBottom: "20px", fontSize: "14px", padding: 0 }}>← Back to Tenants</button>
      <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: "16px", padding: "32px" }}>
        <div style={{ display: "flex", gap: "20px", alignItems: "flex-start", flexWrap: "wrap" }}>
          <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accent2})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", fontWeight: 700, flexShrink: 0 }}>{tenant.avatar}</div>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: "22px", fontWeight: 700, margin: "0 0 4px" }}>{tenant.name}</h2>
            <div style={{ color: COLORS.muted, fontSize: "13px", marginBottom: "8px" }}>{tenant.email} · {tenant.phone}</div>
            <Badge label={tenant.status} color="green" />
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "12px", marginTop: "24px" }}>
          {[["Property", tenant.property], ["Monthly Rent", `$${tenant.rent}`], ["Lease Start", tenant.leaseStart], ["Lease End", tenant.leaseEnd]].map(([k, v]) => (
            <div key={k} style={{ background: COLORS.surface2, borderRadius: "8px", padding: "14px" }}>
              <div style={{ fontSize: "11px", color: COLORS.muted, marginBottom: "4px" }}>{k}</div>
              <div style={{ fontWeight: 600, fontSize: "14px" }}>{v}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: "20px", padding: "16px", background: COLORS.surface2, borderRadius: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: "12px", color: COLORS.muted }}>November Rent</div>
            <div style={{ fontWeight: 700, fontSize: "18px", color: tenant.paid ? COLORS.green : COLORS.red }}>{tenant.paid ? "Paid ✓" : "Overdue ✗"}</div>
          </div>
          <button onClick={() => togglePaid(tenant.id)} style={{ background: tenant.paid ? COLORS.surface : COLORS.green, color: tenant.paid ? COLORS.muted : "#fff", border: `1px solid ${COLORS.border}`, borderRadius: "8px", padding: "8px 16px", cursor: "pointer", fontSize: "12px", fontWeight: 600 }}>
            {tenant.paid ? "Mark Unpaid" : "Mark Paid"}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div style={{ marginBottom: "24px" }}>
        <h2 style={{ fontSize: "22px", fontWeight: 700, margin: "0 0 4px" }}>Tenants</h2>
        <p style={{ color: COLORS.muted, margin: 0, fontSize: "13px" }}>{tenants.length} active tenants</p>
      </div>
      <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: "12px", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${COLORS.border}` }}>
              {["Tenant", "Property", "Rent", "Lease End", "Status", "Payment"].map(h => (
                <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: "11px", color: COLORS.muted, fontWeight: 600, letterSpacing: "0.5px", textTransform: "uppercase" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tenants.map((t, i) => (
              <tr key={t.id} onClick={() => setSelected(t.id)} style={{ borderBottom: i < tenants.length - 1 ? `1px solid ${COLORS.border}` : "none", cursor: "pointer", transition: "background 0.15s" }}
                onMouseEnter={e => e.currentTarget.style.background = COLORS.surface2}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                <td style={{ padding: "14px 16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{ width: "34px", height: "34px", borderRadius: "50%", background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accent2})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 700, flexShrink: 0 }}>{t.avatar}</div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: "13px" }}>{t.name}</div>
                      <div style={{ fontSize: "11px", color: COLORS.muted }}>{t.email}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: "14px 16px", fontSize: "13px", color: COLORS.muted }}>{t.property}</td>
                <td style={{ padding: "14px 16px", fontWeight: 600, color: COLORS.green }}>${t.rent}</td>
                <td style={{ padding: "14px 16px", fontSize: "13px", color: COLORS.muted }}>{t.leaseEnd}</td>
                <td style={{ padding: "14px 16px" }}><Badge label={t.status} color="green" /></td>
                <td style={{ padding: "14px 16px" }}><Badge label={t.paid ? "Paid" : "Overdue"} color={t.paid ? "green" : "red"} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── MAINTENANCE ───────────────────────────────────────────────────────────────
function Maintenance({ maintenance, setMaintenance }) {
  const [showAdd, setShowAdd] = useState(false);
  const [newReq, setNewReq] = useState({ property: "", tenant: "", issue: "", priority: "Medium", category: "General" });

  const statusColor = { "Open": "red", "In Progress": "yellow", "Resolved": "green" };
  const priorityColor = { "High": "red", "Medium": "yellow", "Low": "blue" };

  const updateStatus = (id, status) => setMaintenance(prev => prev.map(m => m.id === id ? { ...m, status } : m));

  const addRequest = () => {
    if (!newReq.property || !newReq.issue) return;
    setMaintenance(prev => [...prev, { ...newReq, id: Date.now(), status: "Open", date: new Date().toISOString().split("T")[0] }]);
    setShowAdd(false);
    setNewReq({ property: "", tenant: "", issue: "", priority: "Medium", category: "General" });
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h2 style={{ fontSize: "22px", fontWeight: 700, margin: "0 0 4px" }}>Maintenance</h2>
          <p style={{ color: COLORS.muted, margin: 0, fontSize: "13px" }}>{maintenance.filter(m => m.status !== "Resolved").length} open requests</p>
        </div>
        <button onClick={() => setShowAdd(true)} style={{ background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accent2})`, color: "#fff", border: "none", borderRadius: "8px", padding: "10px 18px", cursor: "pointer", fontWeight: 600, fontSize: "13px" }}>+ New Request</button>
      </div>

      {showAdd && (
        <div style={{ background: COLORS.card, border: `1px solid ${COLORS.accent}55`, borderRadius: "12px", padding: "24px", marginBottom: "20px" }}>
          <div style={{ fontWeight: 600, marginBottom: "16px" }}>New Maintenance Request</div>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            {[["Property", "property", "text"], ["Tenant Name", "tenant", "text"], ["Issue Description", "issue", "text"]].map(([label, key, type]) => (
              <div key={key} style={{ flex: 1, minWidth: "180px" }}>
                <div style={{ fontSize: "11px", color: COLORS.muted, marginBottom: "4px" }}>{label}</div>
                <input value={newReq[key]} onChange={e => setNewReq(p => ({ ...p, [key]: e.target.value }))} type={type}
                  style={{ width: "100%", background: COLORS.surface2, border: `1px solid ${COLORS.border}`, borderRadius: "6px", padding: "8px 10px", color: COLORS.text, fontSize: "13px", boxSizing: "border-box" }} />
              </div>
            ))}
            <div style={{ flex: 1, minWidth: "140px" }}>
              <div style={{ fontSize: "11px", color: COLORS.muted, marginBottom: "4px" }}>Priority</div>
              <select value={newReq.priority} onChange={e => setNewReq(p => ({ ...p, priority: e.target.value }))}
                style={{ width: "100%", background: COLORS.surface2, border: `1px solid ${COLORS.border}`, borderRadius: "6px", padding: "8px 10px", color: COLORS.text, fontSize: "13px" }}>
                {["High", "Medium", "Low"].map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div style={{ display: "flex", gap: "10px", marginTop: "16px" }}>
            <button onClick={addRequest} style={{ background: COLORS.accent, color: "#fff", border: "none", borderRadius: "8px", padding: "9px 18px", cursor: "pointer", fontWeight: 600, fontSize: "13px" }}>Submit</button>
            <button onClick={() => setShowAdd(false)} style={{ background: COLORS.surface2, color: COLORS.muted, border: `1px solid ${COLORS.border}`, borderRadius: "8px", padding: "9px 18px", cursor: "pointer", fontSize: "13px" }}>Cancel</button>
          </div>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {maintenance.map(m => (
          <div key={m.id} style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: "12px", padding: "18px 20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "10px" }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "6px", flexWrap: "wrap" }}>
                  <Badge label={m.priority} color={priorityColor[m.priority]} />
                  <Badge label={m.category} color="blue" />
                  <span style={{ fontSize: "11px", color: COLORS.muted }}>{m.date}</span>
                </div>
                <div style={{ fontWeight: 600, marginBottom: "2px" }}>{m.issue}</div>
                <div style={{ fontSize: "12px", color: COLORS.muted }}>{m.property} · {m.tenant}</div>
              </div>
              <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
                <Badge label={m.status} color={statusColor[m.status]} />
                <select value={m.status} onChange={e => updateStatus(m.id, e.target.value)}
                  style={{ background: COLORS.surface2, border: `1px solid ${COLORS.border}`, borderRadius: "6px", padding: "5px 8px", color: COLORS.text, fontSize: "11px", cursor: "pointer" }}>
                  {["Open", "In Progress", "Resolved"].map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── RENT TRACKER ──────────────────────────────────────────────────────────────
function RentTracker({ tenants, setTenants }) {
  const totalExpected = tenants.reduce((a, t) => a + t.rent, 0);
  const totalCollected = tenants.filter(t => t.paid).reduce((a, t) => a + t.rent, 0);
  const pct = Math.round((totalCollected / totalExpected) * 100);

  const togglePaid = (id) => setTenants(prev => prev.map(t => t.id === id ? { ...t, paid: !t.paid } : t));

  return (
    <div>
      <div style={{ marginBottom: "24px" }}>
        <h2 style={{ fontSize: "22px", fontWeight: 700, margin: "0 0 4px" }}>Rent Tracker</h2>
        <p style={{ color: COLORS.muted, margin: 0, fontSize: "13px" }}>November 2024</p>
      </div>

      {/* Summary */}
      <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", marginBottom: "24px" }}>
        <StatCard icon="✅" label="Collected" value={`$${totalCollected.toLocaleString()}`} color={COLORS.green} />
        <StatCard icon="⏳" label="Outstanding" value={`$${(totalExpected - totalCollected).toLocaleString()}`} color={COLORS.red} />
        <StatCard icon="📊" label="Collection Rate" value={`${pct}%`} color={pct === 100 ? COLORS.green : COLORS.yellow} />
      </div>

      {/* Progress bar */}
      <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: "12px", padding: "20px 24px", marginBottom: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "13px" }}>
          <span style={{ color: COLORS.muted }}>Total collected this month</span>
          <span style={{ fontWeight: 600 }}>${totalCollected.toLocaleString()} / ${totalExpected.toLocaleString()}</span>
        </div>
        <div style={{ height: "10px", background: COLORS.surface2, borderRadius: "6px", overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${pct}%`, background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.green})`, borderRadius: "6px", transition: "width 0.4s" }} />
        </div>
      </div>

      {/* Per-tenant */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {tenants.map(t => (
          <div key={t.id} style={{ background: COLORS.card, border: `1px solid ${t.paid ? COLORS.border : COLORS.red + "44"}`, borderRadius: "12px", padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accent2})`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "13px", flexShrink: 0 }}>{t.avatar}</div>
              <div>
                <div style={{ fontWeight: 600 }}>{t.name}</div>
                <div style={{ fontSize: "12px", color: COLORS.muted }}>{t.property}</div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div style={{ fontWeight: 700, fontSize: "17px", color: COLORS.green }}>${t.rent.toLocaleString()}</div>
              <Badge label={t.paid ? "Paid" : "Overdue"} color={t.paid ? "green" : "red"} />
              <button onClick={() => togglePaid(t.id)} style={{ background: t.paid ? COLORS.surface2 : COLORS.green, color: t.paid ? COLORS.muted : "#fff", border: `1px solid ${COLORS.border}`, borderRadius: "7px", padding: "7px 14px", cursor: "pointer", fontSize: "12px", fontWeight: 600, transition: "all 0.2s" }}>
                {t.paid ? "Undo" : "Mark Paid"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── APP SHELL ─────────────────────────────────────────────────────────────────
const NAV = [
  { id: "overview", label: "Overview", icon: "📊" },
  { id: "properties", label: "Properties", icon: "🏠" },
  { id: "tenants", label: "Tenants", icon: "👥" },
  { id: "rent", label: "Rent Tracker", icon: "💰" },
  { id: "maintenance", label: "Maintenance", icon: "🔧" },
];

export default function App() {
  const [page, setPage] = useState("overview");
  const [properties, setProperties] = useState(initialProperties);
  const [tenants, setTenants] = useState(initialTenants);
  const [maintenance, setMaintenance] = useState(initialMaintenance);
  const [menuOpen, setMenuOpen] = useState(false);

  const renderPage = () => {
    if (page === "overview") return <Overview properties={properties} tenants={tenants} maintenance={maintenance} onNav={setPage} />;
    if (page === "properties") return <Properties properties={properties} setProperties={setProperties} />;
    if (page === "tenants") return <Tenants tenants={tenants} setTenants={setTenants} />;
    if (page === "rent") return <RentTracker tenants={tenants} setTenants={setTenants} />;
    if (page === "maintenance") return <Maintenance maintenance={maintenance} setMaintenance={setMaintenance} />;
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: COLORS.bg, color: COLORS.text, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      {/* Sidebar */}
      <div style={{ width: "220px", background: COLORS.surface, borderRight: `1px solid ${COLORS.border}`, padding: "24px 0", display: "flex", flexDirection: "column", flexShrink: 0, position: "sticky", top: 0, height: "100vh", overflowY: "auto" }}>
        <div style={{ padding: "0 20px 24px", borderBottom: `1px solid ${COLORS.border}` }}>
          <div style={{ fontSize: "18px", fontWeight: 800, background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accent2})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>PropManager</div>
          <div style={{ fontSize: "11px", color: COLORS.muted, marginTop: "2px" }}>Portfolio Dashboard</div>
        </div>
        <nav style={{ padding: "16px 10px", flex: 1 }}>
          {NAV.map(n => (
            <button key={n.id} onClick={() => setPage(n.id)} style={{
              display: "flex", alignItems: "center", gap: "10px", width: "100%", padding: "10px 12px", borderRadius: "8px", border: "none", cursor: "pointer", fontSize: "13px", fontWeight: page === n.id ? 600 : 400,
              background: page === n.id ? `${COLORS.accent}22` : "transparent",
              color: page === n.id ? COLORS.accent : COLORS.muted,
              marginBottom: "2px", transition: "all 0.15s", textAlign: "left",
            }}>
              <span style={{ fontSize: "16px" }}>{n.icon}</span>{n.label}
            </button>
          ))}
        </nav>
        <div style={{ padding: "16px 20px", borderTop: `1px solid ${COLORS.border}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accent2})`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "12px" }}>JD</div>
            <div><div style={{ fontSize: "12px", fontWeight: 600 }}>John Doe</div><div style={{ fontSize: "10px", color: COLORS.muted }}>Landlord</div></div>
          </div>
        </div>
      </div>

      {/* Main */}
      <div style={{ flex: 1, padding: "36px 40px", overflowY: "auto", maxWidth: "900px" }}>
        {renderPage()}
      </div>
    </div>
  );
}
