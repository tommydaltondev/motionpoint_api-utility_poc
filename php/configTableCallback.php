<?php
<div class="staticContainer">

// Build callback section
  <form id="cbForm">
    <table>
      <tr>
        <th>API Title</th>
        <th>Function</th>
        <th>Callback</th>
        <th>Configure</th>
        <th>Request</th>
      </tr>
      <tr>
        <td> Configure CallbackUrl </td>
        <td> POST /callbackurl </td>
        <td>
          <label for="cbURL"></label>
          <input type="text" id="cbURL" name="name" minlength="4" size="10" autocomplete="url" />
        </td>
        <td>
          <button id="cbSubmit" type="submit" value="Process" class="submit disabled">Process</button>
        </td>
        <td>
          <button id="cbRequest" type="submit" value="Process" class="submit">Get Current</button>
        </td>
      </tr>
    </table>
  </form>

</div>
?>