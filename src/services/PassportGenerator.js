// HeritageQuest Shareable Digital Passport Generator (Client-Side Canvas Export)

export function generateHeritagePassport({
  userName = 'Cultural Explorer',
  visitedCount = 8,
  totalMonuments = 8,
  points = 450,
  badgesCount = 4,
  lang = 'en'
}) {
  return new Promise((resolve, reject) => {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 1200;
      canvas.height = 675;
      const ctx = canvas.getContext('2d');

      // 1. Background Fill: Deep Imperial Navy
      const bgGrad = ctx.createLinearGradient(0, 0, 1200, 675);
      bgGrad.addColorStop(0, '#060913');
      bgGrad.addColorStop(0.5, '#0b1120');
      bgGrad.addColorStop(1, '#140d2b');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, 1200, 675);

      // 2. Outer Decorative Gold Border
      ctx.strokeStyle = '#e5b869';
      ctx.lineWidth = 6;
      ctx.strokeRect(24, 24, 1152, 627);

      ctx.strokeStyle = 'rgba(229, 184, 105, 0.4)';
      ctx.lineWidth = 2;
      ctx.strokeRect(34, 34, 1132, 607);

      // Corner Flourish Circles
      const corners = [
        [34, 34],
        [1166, 34],
        [34, 641],
        [1166, 641]
      ];
      corners.forEach(([x, y]) => {
        ctx.beginPath();
        ctx.arc(x, y, 14, 0, Math.PI * 2);
        ctx.fillStyle = '#e5b869';
        ctx.fill();
      });

      // 3. Header Title & Brand Banner
      ctx.fillStyle = '#e5b869';
      ctx.font = 'bold 22px Cinzel, serif';
      ctx.textAlign = 'center';
      ctx.fillText('HERITAGEQUEST • OFFICIAL IMPERIAL CULTURAL PASSPORT', 600, 85);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 36px Outfit, sans-serif';
      ctx.fillText('I Traveled Through 2,300 Years of Indian Heritage', 600, 140);

      ctx.fillStyle = '#dfba73';
      ctx.font = 'italic 20px Cinzel, serif';
      ctx.fillText('वसुधैव कुटुम्बकम् • The World Is One Family', 600, 180);

      // 4. Center Gold Divider Line
      ctx.beginPath();
      ctx.moveTo(150, 210);
      ctx.lineTo(1050, 210);
      ctx.strokeStyle = 'rgba(229, 184, 105, 0.5)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // 5. Passport Details Box
      ctx.fillStyle = 'rgba(11, 17, 32, 0.85)';
      ctx.strokeStyle = 'rgba(229, 184, 105, 0.4)';
      ctx.lineWidth = 2;
      ctx.roundRect(150, 240, 900, 280, 20);
      ctx.fill();
      ctx.stroke();

      // Traveler Name
      ctx.textAlign = 'left';
      ctx.fillStyle = '#94a3b8';
      ctx.font = 'bold 16px Outfit, sans-serif';
      ctx.fillText('EXPLORER NAME', 200, 290);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 34px Cinzel, serif';
      ctx.fillText(userName || 'Cultural Traveler', 200, 335);

      // Stats Grid: Monuments Visited
      ctx.fillStyle = '#94a3b8';
      ctx.font = 'bold 16px Outfit, sans-serif';
      ctx.fillText('HERITAGE SITES VISITED', 650, 290);

      ctx.fillStyle = '#e5b869';
      ctx.font = 'bold 32px Outfit, sans-serif';
      ctx.fillText(`${visitedCount} / ${totalMonuments} Monuments Explored`, 650, 335);

      // Stats Grid: XP & Badges
      ctx.fillStyle = '#94a3b8';
      ctx.font = 'bold 16px Outfit, sans-serif';
      ctx.fillText('HERITAGE ACADEMY XP', 200, 410);

      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 30px Outfit, sans-serif';
      ctx.fillText(`${points} XP Earned`, 200, 450);

      ctx.fillStyle = '#94a3b8';
      ctx.font = 'bold 16px Outfit, sans-serif';
      ctx.fillText('UNLOCKED BADGES', 650, 410);

      ctx.fillStyle = '#f43f5e';
      ctx.font = 'bold 30px Outfit, sans-serif';
      ctx.fillText(`🏅 ${badgesCount} Imperial Badges Unlocked`, 650, 450);

      // 6. Gold Seal & Certification Stamp (Bottom Right)
      ctx.beginPath();
      ctx.arc(980, 560, 48, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(229, 184, 105, 0.15)';
      ctx.fill();
      ctx.strokeStyle = '#e5b869';
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.textAlign = 'center';
      ctx.fillStyle = '#e5b869';
      ctx.font = 'bold 12px Cinzel, serif';
      ctx.fillText('VERIFIED', 980, 553);
      ctx.fillText('PASSPORT', 980, 570);

      // 7. Footer Copyright & Verification
      ctx.textAlign = 'center';
      ctx.fillStyle = '#64748b';
      ctx.font = '14px monospace';
      ctx.fillText(`Issued by HeritageQuest • ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} • Verified Digital Certificate`, 600, 605);

      const dataUrl = canvas.toDataURL('image/png');
      resolve(dataUrl);
    } catch (err) {
      reject(err);
    }
  });
}

export function downloadPassportPNG(params) {
  generateHeritagePassport(params).then((dataUrl) => {
    const link = document.createElement('a');
    link.download = `HeritageQuest-Passport-${params.userName || 'Traveler'}.png`;
    link.href = dataUrl;
    link.click();
  });
}
