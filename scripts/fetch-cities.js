const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://raw.githubusercontent.com/madurapa/sri-lanka-provinces-districts-cities/master';

async function fetchSQL(filename) {
    const res = await fetch(`${BASE_URL}/${filename}`);
    return await res.text();
}

function parseSQLValues(sql) {
    const values = [];
    const regex = /\((.*?)\)/g;
    let match;
    const insertSection = sql.split('INSERT INTO')[1] || sql;
    
    while ((match = regex.exec(insertSection)) !== null) {
        // Simple CSV parser for SQL values
        const rowStr = match[1];
        const row = [];
        let inQuotes = false;
        let currentVal = '';
        for (let i = 0; i < rowStr.length; i++) {
            const char = rowStr[i];
            if (char === "'" && (i === 0 || rowStr[i-1] !== '\\')) {
                inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
                row.push(currentVal);
                currentVal = '';
            } else {
                currentVal += char;
            }
        }
        row.push(currentVal);
        values.push(row.map(v => v.replace(/^'|'$/g, '').replace(/\\'/g, "'").trim()));
    }
    return values;
}

async function main() {
    console.log('Fetching SQL files...');
    const [provSql, distSql, citySql] = await Promise.all([
        fetchSQL('provinces.sql'),
        fetchSQL('districts.sql'),
        fetchSQL('cities.sql')
    ]);

    console.log('Parsing Provinces...');
    const provincesData = parseSQLValues(provSql);
    const provinces = {};
    // Table: id, name_en, name_si, name_ta
    provincesData.forEach(row => {
        if (row.length >= 2) provinces[row[0]] = { id: row[0], name: row[1], districts: {} };
    });

    console.log('Parsing Districts...');
    const districtsData = parseSQLValues(distSql);
    const districts = {};
    // Table: id, province_id, name_en, name_si, name_ta
    districtsData.forEach(row => {
        if (row.length >= 3) {
            const pId = row[1];
            const dId = row[0];
            const dName = row[2];
            districts[dId] = { id: dId, province_id: pId, name: dName, cities: [] };
            if (provinces[pId]) provinces[pId].districts[dId] = districts[dId];
        }
    });

    console.log('Parsing Cities...');
    const citiesData = parseSQLValues(citySql);
    // Table: id, district_id, name_en, name_si, name_ta, sub_name_en, sub_name_si, sub_name_ta, postcode, latitude, longitude
    citiesData.forEach(row => {
        if (row.length >= 11) {
            const dId = row[1];
            const name = row[2];
            const subName = row[5] !== 'NULL' ? row[5] : '';
            const lat = parseFloat(row[9]);
            const lon = parseFloat(row[10]);
            
            const fullName = subName ? `${name} (${subName})` : name;
            
            if (districts[dId] && lat && lon) {
                districts[dId].cities.push({
                    id: row[0],
                    name: fullName,
                    lat: lat,
                    lon: lon
                });
            }
        }
    });
    
    // Convert to a cleaner output format mapped to our app's province IDs
    // Our app uses: western, central, southern, north-western, sabaragamuwa, eastern, uva, north-central, northern
    const provIdMap = {
        'Western': 'western',
        'Central': 'central',
        'Southern': 'southern',
        'North Western': 'north-western',
        'Sabaragamuwa': 'sabaragamuwa',
        'Eastern': 'eastern',
        'Uva': 'uva',
        'North Central': 'north-central',
        'Northern': 'northern'
    };

    const finalOutput = {};
    Object.values(provinces).forEach(p => {
        const key = provIdMap[p.name];
        if (key) {
            finalOutput[key] = Object.values(p.districts).map(d => ({
                id: d.id,
                name: d.name,
                cities: d.cities.sort((a,b) => a.name.localeCompare(b.name))
            })).sort((a,b) => a.name.localeCompare(b.name));
        }
    });

    const dataDir = path.join(__dirname, '../src/data');
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(path.join(dataDir, 'cities.json'), JSON.stringify(finalOutput, null, 2));
    console.log('Done! Created src/data/cities.json');
}

main().catch(console.error);
