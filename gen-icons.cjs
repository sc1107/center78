const sharp = require('sharp');
const path = require('path');

const src = path.join(__dirname, 'src/assets/profile78.jpeg');
const outDir = path.join(__dirname, 'public/icons');

const YELLOW = { r: 255, g: 184, b: 0, alpha: 1 };

async function makeIcon(size, outFile) {
  // 원본 이미지 메타데이터 확인
  const meta = await sharp(src).metadata();

  // 상체만 크롭: 상단 18% (머리) ~ 하단 38% (다리) 잘라내기 → 중간 44% 구간 사용
  const cropTop  = Math.round(meta.height * 0.18);
  const cropH    = Math.round(meta.height * 0.44);
  const cropLeft = 0;
  const cropW    = meta.width;

  // 1) 상체 크롭 → 스케치풍 B&W 처리
  const imgBuf = await sharp(src)
    .extract({ left: cropLeft, top: cropTop, width: cropW, height: cropH })
    .resize(size, size, { fit: 'cover', position: 'centre' })
    .greyscale()
    .sharpen({ sigma: 2.5, m1: 0.2, m2: 8 })  // 엣지 강조
    .linear(3.5, -90)                            // 고대비 스케치
    .normalise()
    .toBuffer();

  // 2) 노란 배경 위에 multiply 합성
  await sharp({
    create: { width: size, height: size, channels: 4, background: YELLOW }
  })
    .composite([{ input: imgBuf, blend: 'multiply' }])
    .png()
    .toFile(outFile);

  console.log(`Generated: ${outFile} (${size}x${size})`);
}

(async () => {
  await makeIcon(192, `${outDir}/icon-192.png`);
  await makeIcon(512, `${outDir}/icon-512.png`);
  await makeIcon(180, `${outDir}/apple-touch-icon.png`);
  await makeIcon(32,  `${outDir}/favicon-32.png`);
  console.log('All icons generated!');
})();
