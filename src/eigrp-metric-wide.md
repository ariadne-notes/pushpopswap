# EIGRP 64-bit metric Calculator

The RFC recommended way to modify a path with EIGRP is **changing the delay**, under the interface. This will not impact other protocols. Modifying bandwidth ... affects lots of things!


<h2 class="sr-only">EIGRP named mode 64-bit wide metric calculator per RFC 7868 with correct interface delay constants</h2>

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
    <label>Delay (μs)</label>
    <input type="number" id="delay_us" value="10" min="0" step="any" oninput="syncFromUs();update()">
  </div>
  <div class="field-row">
    <label>Delay (ps) <span class="linked">← tied to μs</span></label>
    <input type="number" id="delay_ps" value="10000000" min="1" oninput="syncFromPs();update()">
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
    <div class="kv"><label>K6</label><input type="number" id="k6" value="0" min="0" max="255" oninput="update()"></div>
  </div>
  <div class="field-row" style="margin-top:8px">
    <label>ExtAttr (K6 term)</label>
    <input type="number" id="extattr" value="0" min="0" oninput="update()">
  </div>
  <div class="field-row">
    <label>RIB scale</label>
    <input type="number" id="ribscale" value="128" min="1" oninput="update()">
  </div>

  <div class="results-grid">
    <div class="result-card rib">
      <div class="rc-name">RIB metric (FD)</div>
      <div class="rc-metric" id="m_rib">—</div>
      <div class="rc-breakdown" id="bd_rib"></div>
    </div>
    <div class="result-card wide">
      <div class="rc-name">EIGRP 64-bit metric (Topology)</div>
      <div class="rc-metric" id="m64">—</div>
      <div class="rc-breakdown components" id="breakdown"></div>
    </div>
  </div>

</div>
</div>

<script>
const EIGRP_BANDWIDTH  = 10_000_000;
const EIGRP_DELAY_PICO = 1_000_000;
const EIGRP_WIDE_SCALE = 65536;

// RFC 7868 §5.6.1.2 wide delay column, nanoseconds → converted to μs and ps for display
// ns * 1000 = ps ; ns / 1000 = μs
const PRESETS = {
  9:         { bw: 9,         us: 500000,    ps: 500000000000 },
  56:        { bw: 56,        us: 20000,     ps: 20000000000  },
  64:        { bw: 64,        us: 20000,     ps: 20000000000  },
  1544:      { bw: 1544,      us: 20000,     ps: 20000000000  },
  2048:      { bw: 2048,      us: 20000,     ps: 20000000000  },
  10000:     { bw: 10000,     us: 1000,      ps: 1000000000   },
  16000:     { bw: 16000,     us: 630,       ps: 630000000    },
  45045:     { bw: 45045,     us: 20000,     ps: 20000000000  },
  100000:    { bw: 100000,    us: 100,       ps: 100000000    },
  155000:    { bw: 155000,    us: 100,       ps: 100000000    },
  1000000:   { bw: 1000000,   us: 10,        ps: 10000000     },
  2000000:   { bw: 2000000,   us: 5,         ps: 5000000      },
  5000000:   { bw: 5000000,   us: 2,         ps: 2000000      },
  10000000:  { bw: 10000000,  us: 1,         ps: 1000000      },
  20000000:  { bw: 20000000,  us: 0.5,       ps: 500000       },
  50000000:  { bw: 50000000,  us: 0.2,       ps: 200000       },
  100000000: { bw: 100000000, us: 0.1,       ps: 100000       },
  200000000: { bw: 200000000, us: 0.05,      ps: 50000        },
  500000000: { bw: 500000000, us: 0.02,      ps: 20000        },
};

function syncFromUs(){
  const us = +document.getElementById('delay_us').value || 0;
  document.getElementById('delay_ps').value = us * 1_000_000;
}
function syncFromPs(){
  const ps = +document.getElementById('delay_ps').value || 0;
  document.getElementById('delay_us').value = ps / 1_000_000;
}

function applyPreset(){
  const v = document.getElementById('preset').value;
  const p = PRESETS[v];
  document.getElementById('bw').value       = p.bw;
  document.getElementById('delay_us').value = p.us;
  document.getElementById('delay_ps').value = p.ps;
  update();
}

function g(id){ return +document.getElementById(id).value || 0; }

function update(){
  const bw       = g('bw');
  const delay_ps = g('delay_ps');
  const load     = g('load');
  const rely     = g('rely');
  const K1       = g('k1');
  const K2       = g('k2');
  const K3       = g('k3');
  const K4       = g('k4');
  const K5       = g('k5');
  const K6       = g('k6');
  const extattr  = g('extattr');
  const ribscale = g('ribscale');

  const max_throughput = K1 * (EIGRP_BANDWIDTH * EIGRP_WIDE_SCALE) / bw;
  const net_throughput = K2 > 0
    ? max_throughput + (K2 * max_throughput) / (256 - load)
    : max_throughput;
  const latency = K3 * (delay_ps * EIGRP_WIDE_SCALE) / EIGRP_DELAY_PICO;
  const inner = (K1 * net_throughput) + latency + (K6 * extattr);
  const m64 = (K5 > 0 && (K4 + rely) > 0)
    ? inner * (K5 / (K4 + rely))
    : inner;
  const m_rib = m64 / ribscale;

  const fmt  = n => n.toLocaleString(undefined, {maximumFractionDigits: 2});
  const fmtf = n => n.toLocaleString(undefined, {maximumFractionDigits: 4});

  document.getElementById('m64').textContent   = fmt(Math.floor(m64));
  document.getElementById('m_rib').textContent = fmt(Math.floor(m_rib));
  document.getElementById('bd_rib').innerHTML  = `64-bit ÷ ${ribscale}`;

  const total = net_throughput + latency + (K6 * extattr);
  function bar(value, cls=''){
    const pct = total > 0 ? Math.min(100, (value / total) * 100) : 0;
    return `<div class="component-bar-wrap"><div class="component-bar ${cls}" style="width:${pct}%"></div></div>`;
  }

  let rows = '';

  rows += `
    <div class="component-row">
      <span class="component-label">Throughput component</span>
      <span class="component-value">${fmt(net_throughput)}</span>
      ${bar(net_throughput, '')}
    </div>
    <div class="component-note">
      K1(${K1}) × (${EIGRP_BANDWIDTH.toLocaleString()} × ${EIGRP_WIDE_SCALE.toLocaleString()}) ÷ ${bw.toLocaleString()}
      ${K2 > 0 ? ` + K2(${K2}) term` : ''}
    </div>`;

  rows += `
    <div class="component-row">
      <span class="component-label">Latency component</span>
      <span class="component-value">${fmt(latency)}</span>
      ${bar(latency, 'delay')}
    </div>
    <div class="component-note">
      K3(${K3}) × (${delay_ps.toLocaleString()} ps × ${EIGRP_WIDE_SCALE.toLocaleString()}) ÷ ${EIGRP_DELAY_PICO.toLocaleString()}
    </div>`;

  if(K6 > 0){
    rows += `
      <div class="component-row">
        <span class="component-label">ExtAttr component</span>
        <span class="component-value">${fmt(K6 * extattr)}</span>
        ${bar(K6 * extattr, 'load')}
      </div>
      <div class="component-note">
        K6(${K6}) × ExtAttr(${extattr})
      </div>`;
  }

  if(K5 > 0 && (K4 + rely) > 0){
    rows += `
      <div class="component-row">
        <span class="component-label">Reliability scaling</span>
        <span class="component-value">× ${fmtf(K5 / (K4 + rely))}</span>
        <div class="component-bar-wrap" style="background:transparent"></div>
      </div>
      <div class="component-note">
        K5(${K5}) ÷ (K4(${K4}) + reliability(${rely}))
      </div>`;
  }

  document.getElementById('breakdown').innerHTML = rows;
}

applyPreset();
update();
</script>


# Wide Network Vectors
<pre>
RFC 7868                      Cisco's EIGRP                     May 2016

5.6.2.1.  Wide Metric Vectors

   EIGRP uses five "vector metrics": minimum Throughput, latency, load,
   reliability, and MTU.  These values are calculated from destination
   to source as follows:

              o Throughput    - Minimum value
              o Latency       - accumulative
              o Load          - maximum
              o Reliability   - minimum
              o MTU           - minimum
              o Hop count     - accumulative
              
   There are two additional values: Jitter and energy.  These two values
   are accumulated from destination to source:

           o Jitter - accumulative
           o Energy - accumulative
</pre>

# Wide Metric Conversion Constants
<pre>

RFC 7868                      Cisco's EIGRP                     May 2016

5.6.2.2.  Wide Metric Conversion Constants

   EIGRP uses a number of defined constants for conversion and
   calculation of metric values.  These numbers are provided here for
   reference

           EIGRP_BANDWIDTH                    10,000,000
           EIGRP_DELAY_PICO                    1,000,000
           EIGRP_INACCESSIBLE       0xFFFFFFFFFFFFFFFFLL
           EIGRP_MAX_HOPS                            100
           EIGRP_CLASSIC_SCALE                       256
           EIGRP_WIDE_SCALE                        65536

   When computing the metric using the above units, all capacity
   information will be normalized to kilobytes and picoseconds before
   being used.  For example, delay is expressed in microseconds per
   kilobyte, and would be converted to kilobytes per second; likewise,
   energy would be expressed in power per kilobytes per second of usage.
</pre>

# Throughput
<pre>
RFC 7868                      Cisco's EIGRP                     May 2016

5.6.2.3.  Throughput Calculation

   The formula for the conversion for Max-Throughput value directly from
   the interface without consideration of congestion-based effects is as
   follows:

                                  (EIGRP_BANDWIDTH * EIGRP_WIDE_SCALE)
        Max-Throughput = K1 *     ------------------------------------
                                       Interface Bandwidth (kbps)

   If K2 is used, the effect of congestion as a measure of load reported
   by the interface will be used to simulate the "available Throughput"
   by adjusting the maximum Throughput according to the formula:

                                           K2 * Max-Throughput
        Net-Throughput = Max-Throughput + ---------------------
                                              256 - Load

   K2 has the greatest effect on the metric occurs when the load
   increases beyond 90%.
</pre>

# Latency
<pre>
RFC 7868                      Cisco's EIGRP                     May 2016

5.6.2.4.  Latency Calculation

   Transmission times derived from physical interfaces MUST be n units
   of picoseconds, converted to picoseconds prior to being exchanged
   between neighbors, or used in the composite metric determination.

   This includes delay values present in configuration-based commands
   (i.e., interface delay, redistribute, default-metric, route-map,
   etc.).

   The delay value is then converted to a "latency" using the formula:

                          Delay * EIGRP_WIDE_SCALE
        Latency = K3 *   --------------------------
                             EIGRP_DELAY_PICO
</pre>

# Composite Calculation
<pre>
RFC 7868                      Cisco's EIGRP                     May 2016

5.6.2.5.  Composite Calculation

                                                                K5
      metric =[(K1*Net-Throughput) + Latency)+(K6*ExtAttr)] * ------
                                                              K4+Rel

   By default, the path selection scheme used by EIGRP is a combination
   of Throughput and Latency where the selection is a product of total
   latency and minimum Throughput of all links along the path:

      metric = (K1 * min(Throughput)) + (K3 * sum(Latency)) }
</pre>

# Validations

<pre>
R1# show eigrp address-family ipv4 topology 2.2.2.2/32
EIGRP-IPv4 VR(EIGRP_100) Topology Entry for AS(100)/ID(1.1.1.1) for 2.2.2.2/32
  State is Passive, Query origin flag is 1, 7 Successor(s), FD is 1392640, RIB is 10880
  Descriptor Blocks:
  10.12.1.2 (GigabitEthernet0/1), from 10.12.1.2, Send flag is 0x0
      Composite metric is (1392640/163840), route is Internal
      Vector metric:
        Minimum bandwidth is 1000000 Kbit
        Total delay is 11250000 picoseconds
        Reliability is 255/255
        Load is 1/255
        Minimum MTU is 1500
        Hop count is 1
        Originating router is 2.2.2.2
</pre>

## Validation

<pre>
R1# show ip protocols | i weight
    Metric weight K1=1, K2=2, K3=3, K4=4, K5=5 K6=0
    
R1# show ip eigrp topology 2.2.2.2/32
EIGRP-IPv4 VR(EIGRP_100) Topology Entry for AS(100)/ID(1.1.1.1) for 2.2.2.2/32
  State is Passive, Query origin flag is 1, 7 Successor(s), FD is 55450, RIB is 433
  Descriptor Blocks:
  10.12.1.2 (GigabitEthernet0/1), from 10.12.1.2, Send flag is 0x0
      Composite metric is (55450/6338), route is Internal
      Vector metric:
        Minimum bandwidth is 1000000 Kbit
        Total delay is 11250000 picoseconds
        Reliability is 255/255
        Load is 1/255
        Minimum MTU is 1500
        Hop count is 1
        Originating router is 2.2.2.2
</pre>

# References
[RFC 7868 - Cisco's Enhanced Interior Gateway Routing Protocol (EIGRP)](https://www.rfc-editor.org/rfc/rfc7868.html#section-5.6.2.1)