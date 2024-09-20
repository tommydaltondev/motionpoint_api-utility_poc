<?php
<div class="staticContainer">

// Build job table section
  <form id="mpForm">
    <table>
      <tr>
        <th>API Title</th>
        <th>Function</th>
        <th>Upload</th>
        <th>Submit Job</th>
        <th>Queue</th>
      </tr>
      <tr>
        <td> Create Translation Job </td>
        <td> POST /translationjobs </td>
        <td>
          <label for="mpFile"></label>
          <input type="file" id="mpFile" name="mpfile">
        </td>

        <td>
          <button id="jobSubmit" type="submit" value="Submit" class="submit disabled">Submit</button>
        </td>
        
        <td id="queueStatus">Upload a file</td>
      </tr>
    </table>
  </form>

  </div>
  ?>