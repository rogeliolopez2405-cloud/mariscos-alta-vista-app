import sharp from "sharp";
import { mkdir } from "fs/promises";

const MAROON = "#7a1f2b";
const LOGO_CROP = {
  input:
    "C:/Users/rogeliol/.claude/uploads/6b807661-0421-4221-968b-29fc2dbb0894/76f31bdc-IMG_7706.jpeg",
  left: 385,
  top: 15,
  width: 555,
  height: 630,
};

function circleMaskSvg(size) {
  return Buffer.from(
    `<svg width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="#fff"/></svg>`
  );
}

async function buildIcon(size) {
  const logoSize = Math.round(size * 0.86);

  const logoCircle = await sharp(LOGO_CROP.input)
    .extract(LOGO_CROP)
    .resize(logoSize, logoSize, { fit: "cover" })
    .composite([{ input: circleMaskSvg(logoSize), blend: "dest-in" }])
    .png()
    .toBuffer();

  await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: MAROON,
    },
  })
    .composite([{ input: logoCircle, gravity: "center" }])
    .png()
    .toFile(`public/icons/icon-${size}.png`);

  console.log(`Generated icon-${size}.png`);
}

async function buildFavicon() {
  const logoSize = 176;
  const logoCircle = await sharp(LOGO_CROP.input)
    .extract(LOGO_CROP)
    .resize(logoSize, logoSize, { fit: "cover" })
    .composite([{ input: circleMaskSvg(logoSize), blend: "dest-in" }])
    .png()
    .toBuffer();

  await sharp({
    create: { width: 192, height: 192, channels: 4, background: MAROON },
  })
    .composite([{ input: logoCircle, gravity: "center" }])
    .png()
    .toFile("public/favicon-source.png");
  console.log("Generated favicon-source.png");
}

async function main() {
  await mkdir("public/icons", { recursive: true });
  await buildIcon(192);
  await buildIcon(512);
  await buildFavicon();
}

main();
