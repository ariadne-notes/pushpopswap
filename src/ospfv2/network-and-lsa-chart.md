# Network and LSA Chart

<div><style>
  .ospf-table { border-collapse: collapse; width: 100%; font-size: 0.9em; }
  .ospf-table th, .ospf-table td { border: 1px solid var(--table-border-color, #ccc); padding: 6px 10px; vertical-align: top; }
  .ospf-table thead th { background-color: var(--sidebar-bg, #444); color: var(--sidebar-fg, #fff); text-align: center; }
  .ospf-table td.area-name { font-weight: bold; white-space: nowrap; }
  .ospf-table td.std { white-space: nowrap; color: var(--fg); opacity: 0.65; font-size: 0.85em; }
  .ospf-table td.config code { white-space: nowrap; }
  .ospf-table td.auto-inject { text-align: center; }
  .lsa-cell { padding: 0 !important; min-width: 60px; }
  .lsa-box { height: 20px; }
  .lsa-box.allowed { background-color: #6dbf6d; }
  .lsa-box.blocked { background-color: #d94f4f; }
  .lsa-notes-row td { font-size: 0.85em; color: var(--fg); padding: 4px 8px; border-top: none; font-style: italic; }
  .ospf-table tr.area-row td { border-top: 2px solid #333; }
  .ospf-table tr.lsa-notes-row td { border-top: none; }
</style>
<table class="ospf-table">
  <thead>
    <tr>
      <th>Area Type</th>
      <th>Standard</th>
      <th>Config</th>
      <th>Auto Inject Default?</th>
      <th>Type 1</th>
      <th>Type 2</th>
      <th>Type 3</th>
      <th>Type 4</th>
      <th>Type 5</th>
      <th>Type 7</th>
    </tr>
  </thead>
  <tbody>
    <!-- Backbone -->
    <tr class="area-row">
      <td class="area-name">Backbone</td>
      <td class="std">RFC 2328</td>
      <td class="config"><code>area 0</code></td>
      <td class="auto-inject">No</td>
      <td class="lsa-cell"><div class="lsa-box allowed"></div></td>
      <td class="lsa-cell"><div class="lsa-box allowed"></div></td>
      <td class="lsa-cell"><div class="lsa-box allowed"></div></td>
      <td class="lsa-cell"><div class="lsa-box allowed"></div></td>
      <td class="lsa-cell"><div class="lsa-box allowed"></div></td>
      <td class="lsa-cell"><div class="lsa-box blocked"></div></td>
    </tr>
    <tr class="lsa-notes-row">
      <td colspan="10">● <code>default-information originate [always]</code>, creates an <code>O E2</code> route, Type 5.<br>● Can be linked thru other areas via Virtual Links.</td>
    </tr>
    <!-- Regular Area -->
    <tr class="area-row">
      <td class="area-name">Regular Area</td>
      <td class="std">RFC 2328</td>
      <td class="config"><code>area 1</code></td>
      <td class="auto-inject">No</td>
      <td class="lsa-cell"><div class="lsa-box allowed"></div></td>
      <td class="lsa-cell"><div class="lsa-box allowed"></div></td>
      <td class="lsa-cell"><div class="lsa-box allowed"></div></td>
      <td class="lsa-cell"><div class="lsa-box allowed"></div></td>
      <td class="lsa-cell"><div class="lsa-box allowed"></div></td>
      <td class="lsa-cell"><div class="lsa-box blocked"></div></td>
    </tr>
    <tr class="lsa-notes-row">
      <td colspan="10">● 1 area per WAN linked remote site, to prevent Type 1 and Type 2 flooding across WAN links.<br></td>
    </tr>
    <!-- NSSA -->
    <tr class="area-row">
      <td class="area-name">NSSA</td>
      <td class="std">RFC 3101</td>
      <td class="config"><code>area 2 nssa</code></td>
      <td class="auto-inject">No</td>
      <td class="lsa-cell"><div class="lsa-box allowed"></div></td>
      <td class="lsa-cell"><div class="lsa-box allowed"></div></td>
      <td class="lsa-cell"><div class="lsa-box allowed"></div></td>
      <td class="lsa-cell"><div class="lsa-box blocked"></div></td>
      <td class="lsa-cell"><div class="lsa-box blocked"></div></td>
      <td class="lsa-cell"><div class="lsa-box allowed"></div></td>
    </tr>
    <tr class="lsa-notes-row">
      <td colspan="10">● Uses the N-Bit (NSSA) and P-Bit (propagate).<br>● ABR can inject a Default route via <code>area 3 nssa default-information-originate</code>. Default is a Type 7. </td>
    </tr>
    <!-- Stub -->
    <tr class="area-row">
      <td class="area-name">Stub</td>
      <td class="std">RFC 2328</td>
      <td class="config"><code>area 2 stub</code></td>
      <td class="auto-inject">Yes</td>
      <td class="lsa-cell"><div class="lsa-box allowed"></div></td>
      <td class="lsa-cell"><div class="lsa-box allowed"></div></td>
      <td class="lsa-cell"><div class="lsa-box allowed"></div></td>
      <td class="lsa-cell"><div class="lsa-box blocked"></div></td>
      <td class="lsa-cell"><div class="lsa-box blocked"></div></td>
      <td class="lsa-cell"><div class="lsa-box blocked"></div></td>
    </tr>
    <tr class="lsa-notes-row">
      <td colspan="10">● ABR automatically generates an <code>O IA</code> Type 3 default route.</td>
    </tr>
    <!-- Totally Stubby NSSA -->
    <tr class="area-row">
      <td class="area-name">Totally Stubby NSSA</td>
      <td class="std">Cisco</td>
      <td class="config"><code>area 2 nssa no-summary</code></td>
      <td class="auto-inject">Yes</td>
      <td class="lsa-cell"><div class="lsa-box allowed"></div></td>
      <td class="lsa-cell"><div class="lsa-box allowed"></div></td>
      <td class="lsa-cell"><div class="lsa-box blocked"></div></td>
      <td class="lsa-cell"><div class="lsa-box blocked"></div></td>
      <td class="lsa-cell"><div class="lsa-box blocked"></div></td>
      <td class="lsa-cell"><div class="lsa-box allowed"></div></td>
    </tr>
    <tr class="lsa-notes-row">
      <td colspan="10">● ABR gets <code>no-summary</code>, which generates an <code>O IA</code> Type 3 default route.<br>● Allows internally originated external routes via Type 7.<br>● Other Type 3 blocked.</td>
    </tr>
    <!-- Totally Stubby -->
    <tr class="area-row">
      <td class="area-name">Totally Stubby</td>
      <td class="std">Cisco</td>
      <td class="config"><code>area 2 stub no-summary</code></td>
      <td class="auto-inject">Yes</td>
      <td class="lsa-cell"><div class="lsa-box allowed"></div></td>
      <td class="lsa-cell"><div class="lsa-box allowed"></div></td>
      <td class="lsa-cell"><div class="lsa-box blocked"></div></td>
      <td class="lsa-cell"><div class="lsa-box blocked"></div></td>
      <td class="lsa-cell"><div class="lsa-box blocked"></div></td>
      <td class="lsa-cell"><div class="lsa-box blocked"></div></td>
    </tr>
    <tr class="lsa-notes-row">
      <td colspan="10">● ABR gets <code>no-summary</code>, which generates an <code>O IA</code> Type 3 default route.<br>● Other Type 3 blocked.</td>
    </tr>
  </tbody>
</table>
</div>
