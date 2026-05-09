# EIGRP 32-bit Classic Metric Calculator

The RFC recommended way to modify a path with EIGRP is **changing the delay**, under the interface. This will not impact other protocols. Modifying bandwidth ... affects lots of things!

<h2 class="sr-only">EIGRP classic mode 32-bit composite metric calculator per RFC 7868 section 5.6.1.1</h2>

<div class="wrap">
<div class="card">

  <div class="sec-label">Interface</div>
  <div class="field-row">
    <label>Preset</label>
    <select id="preset" onchange="applyPreset()">
      <option value="56">56 kbps</option>
      <option value="1544">1544 kbps</option>
      <option value="10000">10 Mbps</option>
      <option value="100000">100 Mbps</option>
      <option value="1000000" selected>1 Gbps</option>
      <option value="2000000">2 Gbps</option>
      <option value="5000000">5 Gbps</option>
      <option value="10000000">10 Gbps</option>
      <option value="20000000">20 Gbps</option>
      <option value="50000000">50 Gbps</option>
      <option value="100000000">100 Gbps</option>
      <option value="200000000">200 Gbps</option>
      <option value="500000000">500 Gbps</option>
    </select>
  </div>
  <div class="field-row">
    <label>Bandwidth (kbps)</label>
    <input type="number" id="bw" value="1000000" min="1" oninput="document.getElementById('preset').value='';update()">
  </div>
  <div class="field-row">
    <label>Delay (μs - microseconds)</label>
    <input type="number" id="delay_us" value="10" min="1" step="any" oninput="update()">
  </div>
  <div class="field-row">
    <label>Load (1–255)</label>
    <input type="number" id="load" value="1" min="1" max="255" oninput="update()">
  </div>
  <div class="field-row">
    <label>Reliability (1–255)</label>
    <input type="number" id="rely" value="255" min="1" max="255" oninput="update()">
  </div>

  <div class="divider"></div>

  <div class="sec-label">K-values</div>
  <div class="kvals">
    <div class="kv"><label>K1</label><input type="number" id="k1" value="1" min="0" max="255" oninput="update()"></div>
    <div class="kv"><label>K2</label><input type="number" id="k2" value="0" min="0" max="255" oninput="update()"></div>
    <div class="kv"><label>K3</label><input type="number" id="k3" value="1" min="0" max="255" oninput="update()"></div>
    <div class="kv"><label>K4</label><input type="number" id="k4" value="0" min="0" max="255" oninput="update()"></div>
    <div class="kv"><label>K5</label><input type="number" id="k5" value="0" min="0" max="255" oninput="update()"></div>
  </div>

  <div class="result-card">
    <div class="rc-name">EIGRP classic — 32-bit composite metric</div>
    <div class="rc-metric" id="m32">—</div>
    <div class="components" id="components"></div>
  </div>

</div>
</div>

<script>
// From 5.6.1.2.  Cisco Interface Delay Compatibility
const PRESETS = {
  56:        { bw: 56,        us: 20000 },
  1544:      { bw: 1544,      us: 20000 },
  10000:     { bw: 10000,     us: 1000  },
  100000:    { bw: 100000,    us: 100   },
  1000000:   { bw: 1000000,   us: 10    },
  2000000:   { bw: 2000000,   us: 10    },
  5000000:   { bw: 5000000,   us: 10    },
  10000000:  { bw: 10000000,  us: 10    },
  20000000:  { bw: 20000000,  us: 10    },
  50000000:  { bw: 50000000,  us: 10    },
  100000000: { bw: 100000000, us: 10    },
  200000000: { bw: 200000000, us: 10    },
  500000000: { bw: 500000000, us: 10    },
};

function applyPreset(){
  const v = document.getElementById('preset').value;
  const p = PRESETS[v];
  if(!p) return;
  document.getElementById('bw').value       = p.bw;
  document.getElementById('delay_us').value = p.us;
  update();
}

function g(id){ return +document.getElementById(id).value || 0; }

function update(){
  const bw       = g('bw');
  const delay_us = g('delay_us');
  const load     = g('load');
  const rely     = g('rely');
  const K1       = g('k1');
  const K2       = g('k2');
  const K3       = g('k3');
  const K4       = g('k4');
  const K5       = g('k5');

  const bw_term    = Math.trunc(1e7 / bw);

  const bw_warn = bw >= 10000000 
  ? ' ⚠️ saturated — classic metric cannot differentiate above 10G' 
  : '';

  const delay_tens = delay_us / 10;

  const bw_component    = Math.trunc(256 * K1 * bw_term);
  const delay_component = Math.trunc(256 * K3 * delay_tens);
  const load_component  = K2 > 0 ? Math.trunc(256 * (K2 * bw_term) / (256 - load)) : 0;

  let inner = K1 * bw_term + (K2 > 0 ? (K2 * bw_term) / (256 - load) : 0) + K3 * delay_tens;
  if(K5 > 0 && (rely + K4) > 0) inner = inner * (K5 / (rely + K4));
  const m32 = Math.trunc(256 * inner);

  const rel_scale = (K5 > 0 && (rely + K4) > 0) ? K5 / (rely + K4) : null;

  const fmti = n => Math.trunc(n).toLocaleString();
  const fmtf = n => n.toLocaleString(undefined, {maximumFractionDigits: 4});

  document.getElementById('m32').textContent = fmti(m32);

  const total = bw_component + delay_component + load_component;
  function bar(value, cls=''){
    const pct = total > 0 ? Math.min(100, (value / total) * 100) : 0;
    return `<div class="component-bar-wrap"><div class="component-bar ${cls}" style="width:${pct}%"></div></div>`;
  }

  let rows = '';

  rows += `
    <div class="component-row">
      <span class="component-label">Bandwidth component</span>
      <span class="component-value">${fmti(bw_component)}</span>
      ${bar(bw_component, '')}
    </div>
    <div class="component-note">
      256 × K1(${K1}) × trunc(10⁷ ÷ ${bw.toLocaleString()}) = 256 × ${K1} × ${fmti(bw_term)}${bw_warn}
    </div>`;

  rows += `
    <div class="component-row">
      <span class="component-label">Delay component</span>
      <span class="component-value">${fmti(delay_component)}</span>
      ${bar(delay_component, 'delay')}
    </div>
    <div class="component-note">
      256 × K3(${K3}) × (${delay_us} μs ÷ 10) = 256 × ${K3} × ${fmtf(delay_tens)}
    </div>`;

  if(K2 > 0){
    rows += `
      <div class="component-row">
        <span class="component-label">Load component</span>
        <span class="component-value">${fmti(load_component)}</span>
        ${bar(load_component, 'load')}
      </div>
      <div class="component-note">
        256 × (K2(${K2}) × ${fmti(bw_term)}) ÷ (256 − ${load})
      </div>`;
  }

  if(rel_scale !== null){
    rows += `
      <div class="component-row">
        <span class="component-label">Reliability scaling</span>
        <span class="component-value">× ${fmtf(rel_scale)}</span>
        <div class="component-bar-wrap"></div>
      </div>
      <div class="component-note">
        K5(${K5}) ÷ (K4(${K4}) + reliability(${rely}))
      </div>`;
  }

  document.getElementById('components').innerHTML = rows;
}

applyPreset();
update();
</script>


<pre>

RFC 7868                      Cisco's EIGRP                     May 2016

5.6.1.1.  Classic Composite Formulation

   EIGRP calculates the composite metric with the following formula:

   metric = 256 * ({(K1*BW) + [(K2*BW)/(256-LOAD)] + (K3*DELAY)} *
            (K5/(REL+K4)))

   In this formula, Bandwidth (BW) is the lowest interface bandwidth
   along the path, and delay (DELAY) is the sum of all outbound
   interface delays along the path.  Load (LOAD) and reliability (REL)
   values are expressed percentages with a value of 1 to 255.

   Implementation note: Cisco IOS routers display reliability as a
   fraction of 255.  That is, 255/255 is 100% reliability or a perfectly
   stable link; a value of 229/255 represents a 90% reliable link.  Load
   is a value between 1 and 255.  A load of 255/255 indicates a
   completely saturated link.  A load of 127/255 represents a 50%
   saturated link.  These values are not dynamically measured; they are
   only measured at the time a link changes.

   Bandwidth is the inverse minimum bandwidth (in kbps) of the path in
   bits per second scaled by a factor of 10^7.  The formula for
   bandwidth is as follows:

                     (10^7)/BWmin

   Implementation note: When converting the real bandwidth to the
   composite bandwidth, truncate before applying the scaling factor.
   When converting the composite bandwidth to the real bandwidth, apply
   the scaling factor before the division and only then truncate.

   The delay is the sum of the outgoing interface delay (in tens of
   microseconds) to the destination.  A delay set to it maximum value
   (hexadecimal 0xFFFFFFFF) indicates that the network is unreachable.
   The formula for delay is as follows:

                     [sum of delays]

   The default composite metric, adjusted for scaling factors, for EIGRP
   is:

             metric = 256 * { [(10^7)/ BWmin] + [sum of delays]}
</pre>

## Validation
<pre>
R1# show ip protocols | i weight
    Metric weight K1=2, K2=2, K3=2, K4=0, K5=0

R1# show ip eigrp topology 10.0.0.0
EIGRP-IPv4 Topology Entry for AS(100)/ID(1.1.1.1) for 10.0.0.0/8
  State is Passive, Query origin flag is 1, 1 Successor(s), FD is 6164
  Descriptor Blocks:
  192.168.12.2 (GigabitEthernet0/0), from 192.168.12.2, Send flag is 0x0
      Composite metric is (6164/5652), route is Internal
      Vector metric:
        Minimum bandwidth is 1000000 Kbit
        Total delay is 20 microseconds
        Reliability is 255/255
        Load is 1/255
        Minimum MTU is 1500
        Hop count is 1
        Originating router is 2.2.2.2
</pre>

# References
[RFC 7868 - Cisco's Enhanced Interior Gateway Routing Protocol (EIGRP)](https://www.rfc-editor.org/rfc/rfc7868.html#section-5.6.2.1)