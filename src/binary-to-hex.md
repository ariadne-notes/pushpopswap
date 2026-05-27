```html

  IPv4 Address:
  
  Convert

function convertIP() {
  const raw = document.getElementById('ip-input').value.trim();
  const out  = document.getElementById('ip-hex-output');

  const octets = raw.split('.');
  if (octets.length !== 4 || octets.some(o => isNaN(o) || o === '' || +o < 0 || +o > 255)) {
    out.innerHTML = 'Invalid IPv4 address.';
    return;
  }

  const nums    = octets.map(Number);
  const hexParts = nums.map(n => n.toString(16).padStart(2, '0').toUpperCase());

  const hexStr  = hexParts.join('');
  const hexDot  = hexParts.join('.');
  const hex0x   = '0x' + hexStr;
  const binary  = nums.map(n => n.toString(2).padStart(8, '0')).join('.');

  out.innerHTML = `
    
        Format
        Value
      
        Dotted decimal
        ${raw}
      
        Dotted hex
        ${hexDot}
      
        Hex (no delimiters)
        ${hexStr}
      
        Hex (0x prefix)
        ${hex0x}
      
        Binary
        ${binary}

  `;
}

// Allow Enter key to trigger conversion
document.getElementById('ip-input').addEventListener('keydown', function(e) {
  if (e.key === 'Enter') convertIP();
});

```