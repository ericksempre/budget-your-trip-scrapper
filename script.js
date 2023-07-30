const puppeteer = require('puppeteer');
const fs = require('fs');

const targetCurrency = 'USD';
const budgetTypeCheap = '1';
const budgetTypeMidRange = '2';
const budgetTypeLuxury = '3';
const countries = [
    {
        "name": "Albania",
        "link": "https://www.budgetyourtrip.com/albania"
    },
    {
        "name": "Andorra",
        "link": "https://www.budgetyourtrip.com/andorra"
    },
    {
        "name": "Antigua and Barbuda",
        "link": "https://www.budgetyourtrip.com/antigua-and-barbuda"
    },
    {
        "name": "Argentina",
        "link": "https://www.budgetyourtrip.com/argentina"
    },
    {
        "name": "Armenia",
        "link": "https://www.budgetyourtrip.com/armenia"
    },
    {
        "name": "Aruba",
        "link": "https://www.budgetyourtrip.com/aruba"
    },
    {
        "name": "Australia",
        "link": "https://www.budgetyourtrip.com/australia"
    },
    {
        "name": "Austria",
        "link": "https://www.budgetyourtrip.com/austria"
    },
    {
        "name": "Azerbaijan",
        "link": "https://www.budgetyourtrip.com/azerbaijan"
    },
    {
        "name": "Bahamas",
        "link": "https://www.budgetyourtrip.com/bahamas"
    },
    {
        "name": "Bahrain",
        "link": "https://www.budgetyourtrip.com/bahrain"
    },
    {
        "name": "Bangladesh",
        "link": "https://www.budgetyourtrip.com/bangladesh"
    },
    {
        "name": "Barbados",
        "link": "https://www.budgetyourtrip.com/barbados"
    },
    {
        "name": "Belarus",
        "link": "https://www.budgetyourtrip.com/belarus"
    },
    {
        "name": "Belgium",
        "link": "https://www.budgetyourtrip.com/belgium"
    },
    {
        "name": "Belize",
        "link": "https://www.budgetyourtrip.com/belize"
    },
    {
        "name": "Bermuda",
        "link": "https://www.budgetyourtrip.com/bermuda"
    },
    {
        "name": "Bhutan",
        "link": "https://www.budgetyourtrip.com/bhutan"
    },
    {
        "name": "Bolivia",
        "link": "https://www.budgetyourtrip.com/bolivia"
    },
    {
        "name": "Bosnia and Herzegowina",
        "link": "https://www.budgetyourtrip.com/bosnia-and-herzegowina"
    },
    {
        "name": "Botswana",
        "link": "https://www.budgetyourtrip.com/botswana"
    },
    {
        "name": "Brazil",
        "link": "https://www.budgetyourtrip.com/brazil"
    },
    {
        "name": "British Virgin Islands",
        "link": "https://www.budgetyourtrip.com/british-virgin-islands"
    },
    {
        "name": "Bulgaria",
        "link": "https://www.budgetyourtrip.com/bulgaria"
    },
    {
        "name": "Burkina Faso",
        "link": "https://www.budgetyourtrip.com/burkina-faso"
    },
    {
        "name": "Cambodia",
        "link": "https://www.budgetyourtrip.com/cambodia"
    },
    {
        "name": "Canada",
        "link": "https://www.budgetyourtrip.com/canada"
    },
    {
        "name": "Cape Verde",
        "link": "https://www.budgetyourtrip.com/cape-verde"
    },
    {
        "name": "Caribbean Netherlands",
        "link": "https://www.budgetyourtrip.com/caribbean-netherlands"
    },
    {
        "name": "Cayman Islands",
        "link": "https://www.budgetyourtrip.com/cayman-islands"
    },
    {
        "name": "Chile",
        "link": "https://www.budgetyourtrip.com/chile"
    },
    {
        "name": "China",
        "link": "https://www.budgetyourtrip.com/china"
    },
    {
        "name": "Colombia",
        "link": "https://www.budgetyourtrip.com/colombia"
    },
    {
        "name": "Costa Rica",
        "link": "https://www.budgetyourtrip.com/costa-rica"
    },
    {
        "name": "Croatia",
        "link": "https://www.budgetyourtrip.com/croatia"
    },
    {
        "name": "Cuba",
        "link": "https://www.budgetyourtrip.com/cuba"
    },
    {
        "name": "Curacao",
        "link": "https://www.budgetyourtrip.com/curacao"
    },
    {
        "name": "Cyprus",
        "link": "https://www.budgetyourtrip.com/cyprus"
    },
    {
        "name": "Czech Republic",
        "link": "https://www.budgetyourtrip.com/czech-republic"
    },
    {
        "name": "Denmark",
        "link": "https://www.budgetyourtrip.com/denmark"
    },
    {
        "name": "Dominica",
        "link": "https://www.budgetyourtrip.com/dominica"
    },
    {
        "name": "Dominican Republic",
        "link": "https://www.budgetyourtrip.com/dominican-republic"
    },
    {
        "name": "Ecuador",
        "link": "https://www.budgetyourtrip.com/ecuador"
    },
    {
        "name": "Egypt",
        "link": "https://www.budgetyourtrip.com/egypt"
    },
    {
        "name": "Estonia",
        "link": "https://www.budgetyourtrip.com/estonia"
    },
    {
        "name": "Ethiopia",
        "link": "https://www.budgetyourtrip.com/ethiopia"
    },
    {
        "name": "Fiji",
        "link": "https://www.budgetyourtrip.com/fiji"
    },
    {
        "name": "Finland",
        "link": "https://www.budgetyourtrip.com/finland"
    },
    {
        "name": "France",
        "link": "https://www.budgetyourtrip.com/france"
    },
    {
        "name": "French Polynesia",
        "link": "https://www.budgetyourtrip.com/french-polynesia"
    },
    {
        "name": "Georgia",
        "link": "https://www.budgetyourtrip.com/georgia"
    },
    {
        "name": "Germany",
        "link": "https://www.budgetyourtrip.com/germany"
    },
    {
        "name": "Ghana",
        "link": "https://www.budgetyourtrip.com/ghana"
    },
    {
        "name": "Greece",
        "link": "https://www.budgetyourtrip.com/greece"
    },
    {
        "name": "Greenland",
        "link": "https://www.budgetyourtrip.com/greenland"
    },
    {
        "name": "Grenada",
        "link": "https://www.budgetyourtrip.com/grenada"
    },
    {
        "name": "Guadeloupe",
        "link": "https://www.budgetyourtrip.com/guadeloupe"
    },
    {
        "name": "Guatemala",
        "link": "https://www.budgetyourtrip.com/guatemala"
    },
    {
        "name": "Haiti",
        "link": "https://www.budgetyourtrip.com/haiti"
    },
    {
        "name": "Honduras",
        "link": "https://www.budgetyourtrip.com/honduras"
    },
    {
        "name": "Hong Kong",
        "link": "https://www.budgetyourtrip.com/hong-kong"
    },
    {
        "name": "Hungary",
        "link": "https://www.budgetyourtrip.com/hungary"
    },
    {
        "name": "Iceland",
        "link": "https://www.budgetyourtrip.com/iceland"
    },
    {
        "name": "India",
        "link": "https://www.budgetyourtrip.com/india"
    },
    {
        "name": "Indonesia",
        "link": "https://www.budgetyourtrip.com/indonesia"
    },
    {
        "name": "Iran",
        "link": "https://www.budgetyourtrip.com/iran"
    },
    {
        "name": "Ireland",
        "link": "https://www.budgetyourtrip.com/ireland"
    },
    {
        "name": "Israel",
        "link": "https://www.budgetyourtrip.com/israel"
    },
    {
        "name": "Italy",
        "link": "https://www.budgetyourtrip.com/italy"
    },
    {
        "name": "Jamaica",
        "link": "https://www.budgetyourtrip.com/jamaica"
    },
    {
        "name": "Japan",
        "link": "https://www.budgetyourtrip.com/japan"
    },
    {
        "name": "Jordan",
        "link": "https://www.budgetyourtrip.com/jordan"
    },
    {
        "name": "Kazakhstan",
        "link": "https://www.budgetyourtrip.com/kazakhstan"
    },
    {
        "name": "Kenya",
        "link": "https://www.budgetyourtrip.com/kenya"
    },
    {
        "name": "Laos",
        "link": "https://www.budgetyourtrip.com/laos"
    },
    {
        "name": "Latvia",
        "link": "https://www.budgetyourtrip.com/latvia"
    },
    {
        "name": "Lebanon",
        "link": "https://www.budgetyourtrip.com/lebanon"
    },
    {
        "name": "Lesotho",
        "link": "https://www.budgetyourtrip.com/lesotho"
    },
    {
        "name": "Liechtenstein",
        "link": "https://www.budgetyourtrip.com/liechtenstein"
    },
    {
        "name": "Lithuania",
        "link": "https://www.budgetyourtrip.com/lithuania"
    },
    {
        "name": "Luxembourg",
        "link": "https://www.budgetyourtrip.com/luxembourg"
    },
    {
        "name": "Macao",
        "link": "https://www.budgetyourtrip.com/macao"
    },
    {
        "name": "Madagascar",
        "link": "https://www.budgetyourtrip.com/madagascar"
    },
    {
        "name": "Malawi",
        "link": "https://www.budgetyourtrip.com/malawi"
    },
    {
        "name": "Malaysia",
        "link": "https://www.budgetyourtrip.com/malaysia"
    },
    {
        "name": "Maldives",
        "link": "https://www.budgetyourtrip.com/maldives"
    },
    {
        "name": "Mali",
        "link": "https://www.budgetyourtrip.com/mali"
    },
    {
        "name": "Malta",
        "link": "https://www.budgetyourtrip.com/malta"
    },
    {
        "name": "Martinique",
        "link": "https://www.budgetyourtrip.com/martinique"
    },
    {
        "name": "Mauritania",
        "link": "https://www.budgetyourtrip.com/mauritania"
    },
    {
        "name": "Mexico",
        "link": "https://www.budgetyourtrip.com/mexico"
    },
    {
        "name": "Micronesia",
        "link": "https://www.budgetyourtrip.com/micronesia"
    },
    {
        "name": "Monaco",
        "link": "https://www.budgetyourtrip.com/monaco"
    },
    {
        "name": "Mongolia",
        "link": "https://www.budgetyourtrip.com/mongolia"
    },
    {
        "name": "Montenegro",
        "link": "https://www.budgetyourtrip.com/montenegro"
    },
    {
        "name": "Morocco",
        "link": "https://www.budgetyourtrip.com/morocco"
    },
    {
        "name": "Mozambique",
        "link": "https://www.budgetyourtrip.com/mozambique"
    },
    {
        "name": "Myanmar",
        "link": "https://www.budgetyourtrip.com/myanmar"
    },
    {
        "name": "Namibia",
        "link": "https://www.budgetyourtrip.com/namibia"
    },
    {
        "name": "Nepal",
        "link": "https://www.budgetyourtrip.com/nepal"
    },
    {
        "name": "Netherlands",
        "link": "https://www.budgetyourtrip.com/netherlands"
    },
    {
        "name": "New Zealand",
        "link": "https://www.budgetyourtrip.com/new-zealand"
    },
    {
        "name": "Nicaragua",
        "link": "https://www.budgetyourtrip.com/nicaragua"
    },
    {
        "name": "Norway",
        "link": "https://www.budgetyourtrip.com/norway"
    },
    {
        "name": "Oman",
        "link": "https://www.budgetyourtrip.com/oman"
    },
    {
        "name": "Pakistan",
        "link": "https://www.budgetyourtrip.com/pakistan"
    },
    {
        "name": "Panama",
        "link": "https://www.budgetyourtrip.com/panama"
    },
    {
        "name": "Papua New Guinea",
        "link": "https://www.budgetyourtrip.com/papua-new-guinea"
    },
    {
        "name": "Paraguay",
        "link": "https://www.budgetyourtrip.com/paraguay"
    },
    {
        "name": "Peru",
        "link": "https://www.budgetyourtrip.com/peru"
    },
    {
        "name": "Philippines",
        "link": "https://www.budgetyourtrip.com/philippines"
    },
    {
        "name": "Poland",
        "link": "https://www.budgetyourtrip.com/poland"
    },
    {
        "name": "Portugal",
        "link": "https://www.budgetyourtrip.com/portugal"
    },
    {
        "name": "Puerto Rico",
        "link": "https://www.budgetyourtrip.com/puerto-rico"
    },
    {
        "name": "Qatar",
        "link": "https://www.budgetyourtrip.com/qatar"
    },
    {
        "name": "Romania",
        "link": "https://www.budgetyourtrip.com/romania"
    },
    {
        "name": "Russia",
        "link": "https://www.budgetyourtrip.com/russia"
    },
    {
        "name": "Rwanda",
        "link": "https://www.budgetyourtrip.com/rwanda"
    },
    {
        "name": "Saint Barthelemy",
        "link": "https://www.budgetyourtrip.com/saint-barthelemy"
    },
    {
        "name": "Saint Kitts and Nevis",
        "link": "https://www.budgetyourtrip.com/saint-kitts-and-nevis"
    },
    {
        "name": "Saint Lucia",
        "link": "https://www.budgetyourtrip.com/saint-lucia"
    },
    {
        "name": "Saint Vincent and the Grenadines",
        "link": "https://www.budgetyourtrip.com/saint-vincent-and-the-grenadines"
    },
    {
        "name": "Senegal",
        "link": "https://www.budgetyourtrip.com/senegal"
    },
    {
        "name": "Serbia",
        "link": "https://www.budgetyourtrip.com/serbia"
    },
    {
        "name": "Seychelles",
        "link": "https://www.budgetyourtrip.com/seychelles"
    },
    {
        "name": "Singapore",
        "link": "https://www.budgetyourtrip.com/singapore"
    },
    {
        "name": "Slovakia",
        "link": "https://www.budgetyourtrip.com/slovakia"
    },
    {
        "name": "Slovenia",
        "link": "https://www.budgetyourtrip.com/slovenia"
    },
    {
        "name": "Solomon Islands",
        "link": "https://www.budgetyourtrip.com/solomon-islands"
    },
    {
        "name": "South Africa",
        "link": "https://www.budgetyourtrip.com/south-africa"
    },
    {
        "name": "South Korea",
        "link": "https://www.budgetyourtrip.com/south-korea"
    },
    {
        "name": "Spain",
        "link": "https://www.budgetyourtrip.com/spain"
    },
    {
        "name": "Sri Lanka",
        "link": "https://www.budgetyourtrip.com/sri-lanka"
    },
    {
        "name": "Swaziland",
        "link": "https://www.budgetyourtrip.com/swaziland"
    },
    {
        "name": "Sweden",
        "link": "https://www.budgetyourtrip.com/sweden"
    },
    {
        "name": "Switzerland",
        "link": "https://www.budgetyourtrip.com/switzerland"
    },
    {
        "name": "Tahiti",
        "link": "https://www.budgetyourtrip.com/tahiti"
    },
    {
        "name": "Taiwan",
        "link": "https://www.budgetyourtrip.com/taiwan"
    },
    {
        "name": "Tanzania",
        "link": "https://www.budgetyourtrip.com/tanzania"
    },
    {
        "name": "Thailand",
        "link": "https://www.budgetyourtrip.com/thailand"
    },
    {
        "name": "Trinidad and Tobago",
        "link": "https://www.budgetyourtrip.com/trinidad-and-tobago"
    },
    {
        "name": "Turkey",
        "link": "https://www.budgetyourtrip.com/turkey"
    },
    {
        "name": "Turks and Caicos Islands",
        "link": "https://www.budgetyourtrip.com/turks-and-caicos-islands"
    },
    {
        "name": "Uganda",
        "link": "https://www.budgetyourtrip.com/uganda"
    },
    {
        "name": "Ukraine",
        "link": "https://www.budgetyourtrip.com/ukraine"
    },
    {
        "name": "United Arab Emirates",
        "link": "https://www.budgetyourtrip.com/united-arab-emirates"
    },
    {
        "name": "United Kingdom",
        "link": "https://www.budgetyourtrip.com/united-kingdom"
    },
    {
        "name": "United States of America",
        "link": "https://www.budgetyourtrip.com/united-states-of-america"
    },
    {
        "name": "Uruguay",
        "link": "https://www.budgetyourtrip.com/uruguay"
    },
    {
        "name": "US Virgin Islands",
        "link": "https://www.budgetyourtrip.com/us-virgin-islands"
    },
    {
        "name": "Vanautu",
        "link": "https://www.budgetyourtrip.com/vanautu"
    },
    {
        "name": "Vietnam",
        "link": "https://www.budgetyourtrip.com/vietnam"
    },
    {
        "name": "Zambia",
        "link": "https://www.budgetyourtrip.com/zambia"
    },
    {
        "name": "Zimbabwe",
        "link": "https://www.budgetyourtrip.com/zimbabwe"
    }
];

(async () => {
    await run();
})();

async function run() {
    const result = [];
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    for (let country of countries) {
        console.log(country.name);
        await page.goto(country.link);
        const dailyBudgetCheap = await getDailyBudgetAmount(page, budgetTypeCheap);
        const dailyBudgetMidRange = await getDailyBudgetAmount(page, budgetTypeMidRange);
        const dailyBudgetLuxury = await getDailyBudgetAmount(page, budgetTypeLuxury);
        result.push({
            country: country.name,
            dailyBudgetCheap: dailyBudgetCheap,
            dailyBudgetMidRange: dailyBudgetMidRange,
            dailyBudgetLuxury: dailyBudgetLuxury,
        });
    }
    const resultJson = JSON.stringify(result, null, 2);
    fs.writeFile('daily_budgets_by_country.json', resultJson, 'utf8', () => {});
    await browser.close();
}

async function getDailyBudgetAmount(page, budgetType) {
    await page.waitForSelector('#budgettypesel');
    await page.select('#budgettypesel', budgetType);
    await page.waitForSelector("#newcurrency");
    await page.select('#newcurrency', targetCurrency);
    await page.waitForFunction(
        () => document.querySelector("#daily-average-cost-totals > ul:nth-child(1) > li.cost-tile.cost-tile-main > div.cost-tile-value > span.symbol").textContent === '$',
        {},
        null
    );
    const elementSymbol = await page.waitForSelector("#daily-average-cost-totals > ul:nth-child(1) > li.cost-tile.cost-tile-main > div.cost-tile-value > span.symbol");
    const symbol = await elementSymbol.evaluate(el => el.textContent);
    const elementAmount = await page.waitForSelector("#daily-average-cost-totals > ul:nth-child(1) > li.cost-tile.cost-tile-main > div.cost-tile-value > span.curvalue");
    const amountStr = await elementAmount.evaluate(el => el.textContent);
    const amountNumber = Number(amountStr.trim().replace(',', ''));
    console.log("   ", symbol, amountNumber);
    return amountNumber;
}
