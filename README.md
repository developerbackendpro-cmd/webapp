# SpotLine — UI demo (Vercel)

Backendga bogʻliq emas. Barcha maʼlumot `script.js` ichidagi `DB` obyektida —
master, xizmatlar, mijozlar, yozuvlar, statistika. Qoʻshish/oʻchirish ishlaydi,
sahifa yangilansa boshlangʻich holatga qaytadi.

## Deploy

    cd home/templates/versal
    vercel

Yoki vercel.com → Add New → Project → papkani tashlang. Sozlash shart emas,
toza static sayt.

## Fayllar

    index.html   sahifa
    style.css    dizayn
    script.js    ilova + demo maʼlumotlar (DB obyekti)
    city.jpg     header fotosurati
    qrcode.jpg   QR plakat (QR-code tugmasi shuni ochadi)

## Demo maʼlumotni oʻzgartirish

`script.js` boshidagi `DB` obyekti:

    master      profil, ish vaqti, ish kunlari
    services    xizmatlar
    contacts    mijoz raqamlari
    bookings    yozuvlar (sana bugunga nisbatan: shift(0) = bugun)
    stats       oylik statistika (diagramma)

## Tashqi API

Ob-havo (open-meteo), valyuta (cbu.uz), shahar nomi (bigdatacloud) — haqiqiy,
kalitsiz. Internet boʻlmasa ularning oʻrni boʻsh qoladi, qolgan UI ishlayveradi.

## Mavzu

Demo doim qorongʻi rejimda ochiladi — Telegram oq mavzuda boʻlsa ham.
Avatar menyusidan qoʻlda almashtirish mumkin, tanlov saqlanadi.
