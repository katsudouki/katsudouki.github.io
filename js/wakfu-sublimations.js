    function convertSockets(socket) {
        return socket.replace(/R/g, '<img src="imgs/red.webp" class="inline-block">')
                     .replace(/G/g, '<img src="imgs/green.webp" class="inline-block">')
                     .replace(/B/g, '<img src="imgs/blue.webp" class="inline-block">');
    }

    function displayData(data) {
        const tableBody = $('#dataBody');
        tableBody.empty();
        data.forEach(item => {
            const sockets = convertSockets(item.Socket1 + item.Socket2 + item.Socket3);
            const row = `<tr class="hover:bg-gray-700 border-gray-600">
                            <td >${item.Name}</td>
                            <td class="">${sockets}</td>
                            <td >${item["I (Rare)"]}</td>
                            <td >${item["II (Mythical)"]}</td>
                            <td >${item["III (Legendary)"]}</td>
                            <td >${item.MaxLevel}</td>
                           
                         </tr>`;
            tableBody.append(row);
        });
    }

    function loadData() {
        $.getJSON('files/sublimations-pt.json', function (data) {
            displayData(data);

            $('#filterSocket1, #filterSocket2, #filterSocket3').on('change', function () {
                const filterSocket1 = $('#filterSocket1').val();
                const filterSocket2 = $('#filterSocket2').val();
                const filterSocket3 = $('#filterSocket3').val();

                const filteredData = data.filter(item => 
                    (filterSocket1 === 'white' || item.Socket1 === filterSocket1) &&
                    (filterSocket2 === 'white' || item.Socket2 === filterSocket2) &&
                    (filterSocket3 === 'white' || item.Socket3 === filterSocket3)
                );

                displayData(filteredData);
            });
        });
    }

    $(document).ready(function () {
        loadData();
    });
