# to Hex

This uses in browser javascript.

<h2 class="sr-only">IPv4 to hexadecimal converter</h2>

<div class="wrap">
<div class="card">

  <div class="sec-label">IPv4 Address</div>
  <div class="field-row">
    <label for="ip-input">Address</label>
    <input type="text" id="ip-input" placeholder="192.168.1.1" oninput="ipConvert()" style="width:160px;font-size:13px;">
  </div>

  <div class="result-card classic">
    <div class="rc-name">Hex representation</div>
    <div class="rc-metric" id="ip-hex-out">—</div>
    <div class="components" id="ip-components"></div>
  </div>

</div>
</div>

<script>
function ipConvert() {
  const raw    = document.getElementById('ip-input').value.trim();
  const hexOut = document.getElementById('ip-hex-out');
  const comp   = document.getElementById('ip-components');

  const octets = raw.split('.');
  const valid  = octets.length === 4 &&
                 octets.every(o => o !== '' && !isNaN(o) && +o >= 0 && +o <= 255);

  if (!valid) {
    hexOut.textContent = raw.length ? 'invalid address' : '—';
    comp.innerHTML = '';
    return;
  }

  const nums   = octets.map(Number);
  const hex    = nums.map(n => n.toString(16).padStart(2, '0').toUpperCase());
  const binary = nums.map(n => n.toString(2).padStart(8, '0'));

  hexOut.textContent = '0x' + hex.join('');

  const formats = [
    ['Hex (plain)', hex.join('')],
    ['Dotted hex',  hex.join('.')],
    ['IS-IS', '0000.' + hex.slice(0,2).join('') + '.' + hex.slice(2,4).join('')],
  ];

  const rows = formats.map(([label, val]) => `
    <div class="component-row">
      <span class="component-label">${label}</span>
      <span class="component-value">${val}</span>
    </div>`).join('');

  const notes = nums.map((n, i) => `
    <div class="component-note">
      octet ${i + 1}: ${n} → 0x${hex[i]} → ${binary[i]}
    </div>`).join('');

//comp.innerHTML = rows + notes;
  comp.innerHTML = rows;
}

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('ip-input').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') ipConvert();
  });
});
</script>
