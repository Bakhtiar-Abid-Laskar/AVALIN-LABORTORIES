const path = require('path');
const sharp = require(path.join(__dirname, '../node_modules/sharp'));

const inputLogo = path.join(__dirname, '../public/brand/avalin-logo.png');
const outDir = path.join(__dirname, '../public/brand');

async function generateAssets() {
  console.log('Generating brand assets from:', inputLogo);

  // 1. icon-32.png
  await sharp(inputLogo)
    .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toFile(path.join(outDir, 'icon-32.png'));
  console.log('Created icon-32.png');

  // 2. icon-192.png
  await sharp(inputLogo)
    .resize(192, 192, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toFile(path.join(outDir, 'icon-192.png'));
  console.log('Created icon-192.png');

  // 3. icon-512.png
  await sharp(inputLogo)
    .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toFile(path.join(outDir, 'icon-512.png'));
  console.log('Created icon-512.png');

  // 4. apple-touch-icon.png (180x180, on clean light background #FBFAF7)
  const logo140 = await sharp(inputLogo)
    .resize(140, 140, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  await sharp({
    create: {
      width: 180,
      height: 180,
      channels: 4,
      background: { r: 251, g: 250, b: 247, alpha: 1 } // #FBFAF7
    }
  })
  .composite([{ input: logo140, gravity: 'center' }])
  .png()
  .toFile(path.join(outDir, 'apple-touch-icon.png'));
  console.log('Created apple-touch-icon.png');

  // 5. maskable-icon-512.png (512x512 with safe-zone padding on #FBFAF7)
  const logo360 = await sharp(inputLogo)
    .resize(360, 360, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  await sharp({
    create: {
      width: 512,
      height: 512,
      channels: 4,
      background: { r: 251, g: 250, b: 247, alpha: 1 } // #FBFAF7
    }
  })
  .composite([{ input: logo360, gravity: 'center' }])
  .png()
  .toFile(path.join(outDir, 'maskable-icon-512.png'));
  console.log('Created maskable-icon-512.png');

  // 6. favicon.ico
  await sharp(inputLogo)
    .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toFile(path.join(outDir, 'favicon.ico'));
  console.log('Created favicon.ico');

  // 7. OG Image (1200x630, logo centered with brand background)
  const logo260 = await sharp(inputLogo)
    .resize(260, 260, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  const textSvg = Buffer.from(`
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <style>
        .brand { font-family: system-ui, -apple-system, sans-serif; font-size: 52px; font-weight: 800; fill: #003666; text-anchor: middle; }
        .tagline { font-family: system-ui, -apple-system, sans-serif; font-size: 26px; font-weight: 500; fill: #5C6B73; text-anchor: middle; }
        .badge { font-family: system-ui, -apple-system, sans-serif; font-size: 16px; font-weight: 700; fill: #007799; text-anchor: middle; letter-spacing: 2px; }
      </style>
      <rect x="0" y="0" width="1200" height="630" fill="#FBFAF7"/>
      <rect x="40" y="40" width="1120" height="550" rx="24" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="2"/>
      <text x="600" y="380" class="badge">PHARMACEUTICAL MANUFACTURER &amp; MARKETER</text>
      <text x="600" y="445" class="brand">Avalin Laboratories</text>
      <text x="600" y="495" class="tagline">Excellence in Pharmaceuticals • Guwahati, Assam</text>
    </svg>
  `);

  await sharp(textSvg)
    .composite([{ input: logo260, top: 90, left: 470 }])
    .png()
    .toFile(path.join(outDir, 'og-image.png'));
  console.log('Created og-image.png');
}

generateAssets().catch(err => {
  console.error('Error generating assets:', err);
  process.exit(1);
});
