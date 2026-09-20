import React from 'react';
import { Clock, Compass, ExternalLink, Calendar, MapPin, User, Sparkles } from 'lucide-react';
import { MONUMENTS } from '../../data/monumentsData';
import { heritageAudio } from '../../services/audioSynthesizer';

export const TimelineView = ({ onSelectMonument, translations, currentLang = 'en' }) => {
  // Chronologically sorted timeline events for the 8 official monuments
  const rawTimelineEvents = [
    {
      id: 'sanchi-stupa',
      century: '3rd Century BCE',
      eraTitle: 'Mauryan Imperial Buddhist Epoch & Relic Sanctuaries',
      dynasty: 'Maurya Empire',
      monument: MONUMENTS.find((m) => m.id === 'sanchi-stupa'),
      highlight: 'Emperor Ashoka commissions the Great Stupa enshrining sacred Buddha relics; master ivory carvers of Vidisha sculpt four monumental Torana gateways.',
      tag: 'Ancient Mauryan',
      localized: {
        hi: {
          century: 'तीसरी शताब्दी ईसा पूर्व',
          eraTitle: 'मौर्य साम्राज्य एवं बौद्ध स्तूप युग',
          highlight: 'सम्राट अशोक ने भगवान बुद्ध की पवित्र अस्थियों को संजोने हेतु महान स्तूप का निर्माण कराया; विदिशा के हाथीदांत शिल्पकारों ने चार भव्य तोरण द्वार उकेरे।',
          tag: 'प्राचीन मौर्य युग'
        },
        ta: {
          century: 'கி.மு 3 ஆம் நூற்றாண்டு',
          eraTitle: 'மௌரிய பௌத்த பேரரசு & ஸ்தூபி காலம்',
          highlight: 'பேரரசர் அசோகர் புத்தாளின் புனித சின்னங்களைப் பாதுகாக்கும் மாபெரும் சாஞ்சி ஸ்தூபியைக் கட்டினார்; நான்கு அலங்கார வாயில்கள் செதுக்கப்பட்டன.',
          tag: 'பண்டைய மௌரியம்'
        },
        fr: {
          century: 'IIIe siècle av. J.-C.',
          eraTitle: 'Époque bouddhique mauryan & Sanctuaires',
          highlight: 'L\'empereur Ashoka fait ériger le Grand Stūpa abritant les reliques du Bouddha ; quatre portes cérémonielles Torana sont sculptées.',
          tag: 'Mauryan Ancien'
        },
        es: {
          century: 'Siglo III a.C.',
          eraTitle: 'Época Budista Maurya y Santuarios',
          highlight: 'El emperador Ashoka encarga el Gran Stupa para albergar las reliquias sagradas de Buda; con cuatro monumentales puertas Torana.',
          tag: 'Antiguo Imperio Maurya'
        }
      }
    },
    {
      id: 'brihadisvara-temple',
      century: '1010 CE',
      eraTitle: 'Imperial Chola Zenith & Monolithic Granite Vimana',
      dynasty: 'Chola Dynasty',
      monument: MONUMENTS.find((m) => m.id === 'brihadisvara-temple'),
      highlight: 'Rajaraja Chola I consecrates the 216-foot soaring granite Vimana crowned by an 80-ton single stone Kumbam hauled up a 6km earthen ramp.',
      tag: 'Imperial South',
      localized: {
        hi: {
          century: '1010 ईस्वी',
          eraTitle: 'चोल साम्राज्य का स्वर्ण काल एवं विशाल ग्रेनाइट विमानम',
          highlight: 'राजराजा चोल प्रथम ने 216 फीट ऊँचे ग्रेनाइट विमानम की स्थापना की, जिसके शिखर पर 80 टन का एक ही पत्थर से निर्मित कुंभम स्थापित है।',
          tag: 'शाही चोल काल'
        },
        ta: {
          century: 'கி.பி 1010',
          eraTitle: 'சோழப் பேரரசின் பொற்காலம் & பெருவுடையார் கோவில்',
          highlight: 'முதலாம் ராஜராஜ சோழன் 216 அடி உயரமிக்க பிரம்மாண்டமான தஞ்சை பெரிய கோயிலைக் கட்டி 80 டன் எடையுள்ள ஒரே கல் சிகரத்தை நிறுவினார்.',
          tag: 'சோழர் பொற்காலம்'
        },
        fr: {
          century: '1010 apr. J.-C.',
          eraTitle: 'Apogée Chola & Vimana monolithique en granite',
          highlight: 'Rajaraja Chola Ier consacre le sommet en granite de 66 mètres couronné d\'un dôme monolithique de 80 tonnes.',
          tag: 'Chola Impérial'
        }
      }
    },
    {
      id: 'konark-sun-temple',
      century: '1250 CE',
      eraTitle: 'Kalinga Solar Chariot & Astronomical Apex',
      dynasty: 'Eastern Ganga Dynasty',
      monument: MONUMENTS.find((m) => m.id === 'konark-sun-temple'),
      highlight: 'King Narasimhadeva I commands 1,200 craftsmen to sculpt the 24 astronomical stone sundial wheels pulled by 7 solar steeds across the Bay of Bengal.',
      tag: 'Medieval Kalinga',
      localized: {
        hi: {
          century: '1250 ईस्वी',
          eraTitle: 'कलिंग सूर्य रथ एवं खगोलीय कला का शिखर',
          highlight: 'राजा नरसिंहदेव प्रथम ने 1200 शिल्पकारों के माध्यम से 24 खगोलीय धूपघड़ी पहियों और 7 घोड़ों से खिंचे जा रहे विशाल सूर्य रथ की रचना कराई।',
          tag: 'मध्यकालीन कलिंग'
        },
        ta: {
          century: 'கி.பி 1250',
          eraTitle: 'கலிங்க சூரிய ரதம் & வானியல் சக்கரம்',
          highlight: 'முதலாம் நரசிம்மதேவ மன்னர் 1200 சிற்பிகளைக் கொண்டு 24 சூரிய கடிகார சக்கரங்கள் கொண்ட பிரம்மாண்டமான சூரியக் கோயிலைச் செதுக்கினார்.',
          tag: 'கலிங்கப் பண்பாடு'
        }
      }
    },
    {
      id: 'taj-mahal',
      century: '1631 – 1653 CE',
      eraTitle: 'Mughal Architectural Zenith & The Marble Tear',
      dynasty: 'Mughal Empire',
      monument: MONUMENTS.find((m) => m.id === 'taj-mahal'),
      highlight: 'Pure white Makrana marble inlaid with 28 varieties of semi-precious stones, outward-tilted minarets, and 28-second double-dome acoustic resonance.',
      tag: 'Mughal Golden Age',
      localized: {
        hi: {
          century: '1631 – 1653 ईस्वी',
          eraTitle: 'मुग़ल वास्तुकला का स्वर्णिम काल एवं अमर संगमरमर',
          highlight: 'मकराना के श्वेत संगमरमर में 28 बहुमूल्य रत्नों की पच्चीकारी, बाहर की ओर झुकी मीनारें और 28-सेकंड की गूंज वाला दोहरा गुंबद।',
          tag: 'मुग़ल स्वर्ण युग'
        },
        ta: {
          century: 'கி.பி 1631 – 1653',
          eraTitle: 'முகலாயக் கட்டிடக்கலை & வெண் பளிங்கு அற்புதம்',
          highlight: '28 வகை நவரத்தினங்கள் பதிக்கப்பட்ட வெண் பளிங்கு மாளிகை, வெளிப்புறமாகச் சாய்ந்த 4 கோபுரங்கள் மற்றும் 28 வினாடி எதிரொலி குவிமாடம்.',
          tag: 'முகலாய பொற்காலம்'
        },
        fr: {
          century: '1631 – 1653 apr. J.-C.',
          eraTitle: 'Apogée Moghol & Chef-d’œuvre en marbre',
          highlight: 'Marbre blanc de Makrana incrusté de 28 types de pierres fines, minarets inclinés et résonance acoustique de 28 secondes.',
          tag: 'Âge d\'or Moghol'
        }
      }
    },
    {
      id: 'hawa-mahal',
      century: '1799 CE',
      eraTitle: 'Rajput Honeycomb Facade & Crown of Krishna',
      dynasty: 'Kachhwaha Rajput Dynasty',
      monument: MONUMENTS.find((m) => m.id === 'hawa-mahal'),
      highlight: 'Maharaja Sawai Pratap Singh erects the five-story pink sandstone pyramid with 953 jharokhas cooling the palace via the natural Venturi breeze effect.',
      tag: 'Rajput Splendor',
      localized: {
        hi: {
          century: '1799 ईस्वी',
          eraTitle: 'राजपूत स्थापत्य एवं मुकुट रूपी हवा महल',
          highlight: 'महाराजा सवाई प्रताप सिंह ने 953 झरोखों वाले 5-मंजिला गुलाबी बलुआ पत्थर के हवा महल का निर्माण कराया जो स्वाभाविक वेंटुरी प्रभाव से ठंडा रहता है।',
          tag: 'राजपूत वैभव'
        },
        ta: {
          century: 'கி.பி 1799',
          eraTitle: 'ராஜபுத்திர காற்று மாளிகை',
          highlight: 'மகாராஜா சவாய் பிரதாப் சிங் 953 ஜன்னல்கள் கொண்ட 5 அடுக்கு இளஞ்சிவப்பு மணற்கல் காற்று மாளிகையைக் கட்டினார்.',
          tag: 'ராஜபுத்திர வீரம்'
        }
      }
    },
    {
      id: 'victoria-memorial',
      century: '1906 – 1921 CE',
      eraTitle: 'Kolkata White Marble Renaissance & Winged Angel',
      dynasty: 'British Imperial Architecture',
      monument: MONUMENTS.find((m) => m.id === 'victoria-memorial'),
      highlight: 'William Emerson designs the Makrana marble memorial on Kolkata Maidan, topped by a 16-foot, 3-ton rotating bronze Angel of Victory turning with the wind.',
      tag: 'Colonial Renaissance',
      localized: {
        hi: {
          century: '1906 – 1921 ईस्वी',
          eraTitle: 'कोलकाता श्वेत संगमरमर स्मारक एवं विजय परी',
          highlight: 'विलियम एमर्सन द्वारा डिज़ाइन किया गया मकराना संगमरमर स्मारक, जिसके 184 फीट ऊँचे गुंबद पर 3-टन वजनी कांस्य की विजय परी हवा के साथ घूमती है।',
          tag: 'औपनिवेशिक वास्तुकला'
        }
      }
    },
    {
      id: 'gateway-of-india',
      century: '1911 – 1924 CE',
      eraTitle: 'Indo-Saracenic Gateway & Departure of British Troops',
      dynasty: 'British Raj to Indian Independence',
      monument: MONUMENTS.find((m) => m.id === 'gateway-of-india'),
      highlight: 'Sir George Wittet fuses 16th-century Gujarati temple jali screens with Roman triumphal arches; ceremonial exit port of the final British regiment on Feb 28, 1948.',
      tag: 'Independence Port',
      localized: {
        hi: {
          century: '1911 – 1924 ईस्वी',
          eraTitle: 'गेटवे ऑफ़ इंडिया एवं ब्रिटिश सेना की अंतिम विदाई',
          highlight: 'जॉर्ज विटेट द्वारा निर्मित पीले बेसाल्ट पत्थर का विशाल मेहराब; 28 फरवरी 1948 को अंतिम ब्रिटिश रेजिमेंट (समरसेट लाइट इन्फैंट्री) की ऐतिहासिक विदाई का साक्षी।',
          tag: 'स्वतंत्रता स्मारक'
        }
      }
    },
    {
      id: 'mysore-palace',
      century: '1912 CE',
      eraTitle: 'Indo-Saracenic Royal Residence & Amba Vilas Splendor',
      dynasty: 'Wadiyar Dynasty',
      monument: MONUMENTS.find((m) => m.id === 'mysore-palace'),
      highlight: 'Nalwadi Krishnaraja Wadiyar IV rebuilds the royal palace with fine grey granite, 145ft gilded tower, pink marble domes, and 97,000 illumination bulbs.',
      tag: 'Royal Wodeyar',
      localized: {
        hi: {
          century: '1912 ईस्वी',
          eraTitle: 'अम्बा विलास राजमहल एवं 97,000 दीपकों का जगमगाता वैभव',
          highlight: 'महाराजा कृष्णराज वाडियार चतुर्थ द्वारा निर्मित इंडो-सारसेनिक राजमहल, जो 97,000 बल्बों की स्वर्णिम रोशनी और गुलाबी संगमरमर गुंबदों से सुशोभित है।',
          tag: 'वाडियार राजशाही'
        }
      }
    }
  ];

  const timelineEvents = rawTimelineEvents.map((evt) => {
    const loc = evt.localized?.[currentLang];
    return {
      ...evt,
      century: loc?.century || evt.century,
      eraTitle: loc?.eraTitle || evt.eraTitle,
      highlight: loc?.highlight || evt.highlight,
      tag: loc?.tag || evt.tag
    };
  });

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-[#060913] min-h-[calc(100vh-4rem)] text-white">
      {/* Header Banner */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0b1120] border border-[#e5b869]/30 text-xs text-[#e5b869] mb-3">
          <Clock className="w-3.5 h-3.5" />
          <span>Historical Timeline Across 2,300 Years</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold font-['Cinzel'] text-white">
          Chronicles of the Subcontinent
        </h2>
        <p className="text-xs sm:text-sm text-stone-400 max-w-xl mx-auto mt-2 font-serif italic">
          From ancient Mauryan Buddhist stupas and imperial Chola granite towers to Mughal marble domes and royal Rajput palaces.
        </p>
      </div>

      {/* Vertical Connected Timeline */}
      <div className="relative border-l-2 border-[#e5b869]/30 ml-4 sm:ml-32 pl-6 sm:pl-10 space-y-10">
        {timelineEvents.map((evt, idx) => {
          const mon = evt.monument || MONUMENTS[0];
          return (
            <div key={idx} className="relative group">
              {/* Timeline Marker Node */}
              <div className="absolute -left-[33px] sm:-left-[49px] top-1.5 w-6 h-6 rounded-full bg-[#060913] border-2 border-[#e5b869] flex items-center justify-center group-hover:scale-125 transition-transform shadow-[0_0_15px_rgba(229,184,105,0.6)]">
                <span className="w-2 h-2 rounded-full bg-[#e5b869]" />
              </div>

              {/* Time Label on Left for Desktop */}
              <div className="hidden sm:block absolute -left-36 top-1.5 w-24 text-right">
                <span className="text-xs font-mono font-bold text-[#e5b869] block">
                  {evt.century}
                </span>
                <span className="text-[10px] text-stone-400 block uppercase tracking-wider">
                  {evt.dynasty.split(' ')[0]}
                </span>
              </div>

              {/* Card Container */}
              <div className="bg-[#0b1120] border border-[#e5b869]/25 hover:border-[#e5b869] rounded-3xl p-5 sm:p-6 transition-all shadow-xl group-hover:shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-md">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#e11d48]/20 border border-[#e11d48]/40 text-[#fca5a5]">
                      {evt.tag}
                    </span>
                    <span className="sm:hidden text-xs font-mono text-[#e5b869] font-bold">
                      {evt.century}
                    </span>
                  </div>
                  <span className="text-xs text-stone-400 font-medium">
                    {evt.dynasty}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold font-['Cinzel'] text-white group-hover:text-[#e5b869] transition-colors">
                  {evt.eraTitle}
                </h3>

                <p className="text-xs sm:text-sm text-stone-300 mt-2 leading-relaxed font-serif">
                  {evt.highlight}
                </p>

                {/* Monument Link Footer */}
                {mon && (
                  <div className="mt-4 pt-3 border-t border-[#e5b869]/15 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={mon.heroImage}
                        alt={`${mon.name} - ${mon.subtitle} in ${mon.state}`}
                        loading="lazy"
                        decoding="async"
                        className="w-12 h-12 rounded-xl object-cover border border-[#e5b869]/30"
                      />
                      <div>
                        <div className="font-bold text-sm text-white font-['Cinzel']">
                          {mon.name}
                        </div>
                        <div className="text-[11px] text-stone-400 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#e5b869]" />
                          <span>{mon.state}</span>
                          <span className="mx-1">•</span>
                          <User className="w-3 h-3 text-[#e5b869]" />
                          <span>
                            {mon.historicalDuo
                              ? `${mon.historicalDuo.maleHost.name} & ${mon.historicalDuo.femaleHost.name}`
                              : mon.historicalHost?.name}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        heritageAudio.playSitarPluck(523.25);
                        onSelectMonument(mon.id);
                      }}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#e5b869] to-[#d4af37] text-[#060913] text-xs font-bold flex items-center gap-1.5 hover:shadow-lg hover:shadow-[#e5b869]/30 transition-all cursor-pointer transform hover:scale-105 active:scale-95"
                    >
                      <span>Explore 3D & Time Travel</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
