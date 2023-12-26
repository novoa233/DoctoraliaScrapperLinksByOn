const puppeteer = require('puppeteer');
const fs = require('fs');

async function handleDynamicWebPage(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const results = await page.evaluate(() => {
    const doctors = document.querySelectorAll(".card-body.p-0");
    const data = [];

    doctors.forEach(doctor => {
      const name = doctor.querySelector(".h4").innerText;
      const specialization = doctor.querySelector('.h5').innerText;
      const address = doctor.querySelector('.text-truncate').innerText;
      const mapLinkElement = doctor.querySelector('[data-test-id="address-map-link"]');
      const mapLink = mapLinkElement ? mapLinkElement.getAttribute('href') : '';
      const entityNameElement = doctor.querySelector('[data-test-id="entity-name"]');
      const entityName = entityNameElement ? entityNameElement.innerText.trim() : '';

      data.push({
        name,
        specialization,
        address,
        entityName,
        mapLink
      });
    });

    return data;
  });

  await browser.close();

  return results;
}

async function scrapeAndSaveData(urls, outputCSV, outputJSON) {
  const allData = [];

  for (const url of urls) {
    const data = await handleDynamicWebPage(url);
    allData.push(...data);
  }

  // Save to CSV
  const csvContent = 'Name,Specialization,Address,EntityName,MapLink\n' + allData.map(doctor => Object.values(doctor).join(',')).join('\n');
  fs.writeFileSync(outputCSV, csvContent, 'utf-8');

  // Save to JSON
  fs.writeFileSync(outputJSON, JSON.stringify(allData, null, 2), 'utf-8');

  console.log('Datos guardados exitosamente!');
}

// Ejemplo de uso con múltiples URLs
const urlsToScrape = [
  'https://www.doctoralia.cl/buscar?q=&loc=Talca',
  'https://www.doctoralia.cl/buscar?q=&loc=Talca&page=2',
  'https://www.doctoralia.cl/buscar?q=&loc=Talca&page=3',
  'https://www.doctoralia.cl/buscar?q=&loc=Talca&page=4',
  'https://www.doctoralia.cl/buscar?q=&loc=Talca&page=5',
  'https://www.doctoralia.cl/buscar?q=&loc=Talca&page=6',
  'https://www.doctoralia.cl/buscar?q=&loc=Talca&page=7',
  // Agrega más URLs según sea necesario
];

const outputCSV = 'talca_doctors_data.csv';
const outputJSON = 'talca_doctors_data.json';

scrapeAndSaveData(urlsToScrape, outputCSV, outputJSON);
