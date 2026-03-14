const https = require('https');
const ids = [
    '1544814980-0ad5bdcfc2c6', '1582239420993-455b550543e3', '1566073771259-6a8506099945',
    '1542314831-c6a4d14d8c85', '1574580396417-ebcc41d77292', '1598425264353-83f60f6de9ca',
    '1582719508461-905c673771fd', '1571003123894-1f0594d2b5d9', '1565406086782-b7e28bfaf2bd',
    '1587595431973-160d0d94add1', '1445019980597-93fa8acb246c', '1520250497591-112f2f40a3f4',
    '1629731633513-e71e72b380bf', '1588096344356-65476a26cd39', '1551882547-ff40c0d129df',
    '1518733057094-95b5ee1404c3', '1596162954151-cdcb92b6eb26', '1552465011-b4e21bf6e79a',
    '1588636254707-1d2a106feda8', '1548695027-e4b2dcdb70ea', '1634567988358-1f14840e6db6',
    '1590425332306-0f8bc5aa7cb9', '1620601831454-e4c164ed2f41', '1539266184852-6b3a98eaadbf'
];

async function checkIds() {
    for (let id of ids) {
        const url = `https://images.unsplash.com/photo-${id}?q=80&w=200`;
        await new Promise(r => {
            https.get(url, (res) => {
                console.log(`${res.statusCode} : ${id}`);
                // Drain to prevent hang
                res.on('data', () => { });
                res.on('end', r);
            }).on('error', (e) => {
                console.log(`${e.message} : ${id}`);
                r();
            });
        });
    }
}
checkIds();

