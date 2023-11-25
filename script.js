document.addEventListener('DOMContentLoaded', function () {
  const editableCells = document.querySelectorAll('[contenteditable]');

  editableCells.forEach(cell => {
    cell.addEventListener('input', function () {
      const rowIndex = this.parentNode.rowIndex - 1;
      const colIndex = this.cellIndex - 1;
      const header = this.parentNode.parentNode.rows[0].cells[colIndex].textContent;
      const editedValue = this.textContent.trim();

      console.log(`Header: ${header}, Row Index: ${rowIndex}, Column Index: ${colIndex}, Value: ${editedValue}`);

      const data = {
        header: header,
        rowIndex: rowIndex,
        colIndex: colIndex,
        value: editedValue
      };

      console.log("data: ", data)

      // Below code is for updating the data
      // const apiUrl = 'https://example.com/api/update';
      // fetch(apiUrl, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(data)
      // })
      // .then(response => response.json())
      // .then(responseData => {
      //   console.log('API Response:', responseData);
      // })
      // .catch(error => {
      //   console.error('Error:', error);
      // });
    });
  });
});
