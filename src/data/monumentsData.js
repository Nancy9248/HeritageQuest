// HeritageQuest - Official Monuments Database
// Curated list of 8 iconic Indian heritage monuments across North, South, East, and West
// Equipped with authentic historical hosts, full-body period costume configurations, 3D hotspots, artifacts, and quizzes

export const MONUMENTS = [
  // 1. TAJ MAHAL (Agra, Uttar Pradesh)
  {
    id: 'taj-mahal',
    name: 'Taj Mahal',
    hindiName: 'ताज महल',
    subtitle: 'The Crown of Palaces & Monument of Eternal Love',
    direction: 'North',
    state: 'Uttar Pradesh (Agra)',
    coordinates: [27.1751, 78.0421],
    era: '1631 – 1653 CE (Mughal Golden Age)',
    dynasty: 'Mughal Empire',
    unescoYear: 1983,
    heroImage: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80',
    description: 'Commissioned by Mughal Emperor Shah Jahan to house the tomb of his favorite consort Mumtaz Mahal. Built entirely of ivory-white Makrana marble with Pietra Dura inlays of 28 types of semi-precious stones, set within a grand Persian Charbagh garden on the banks of the Yamuna River.',
    stats: [{'label': 'Construction Period', 'value': '1631 – 1653 CE'}, {'label': 'Master Artisans', 'value': '20,000+ Workers'}, {'label': 'Structure Height', 'value': '73 Meters (240 ft)'}],
    sources: ['Archaeological Survey of India (ASI)', 'UNESCO World Heritage Center (Ref: 252)', 'Koch, Ebba - The Complete Taj Mahal (2006)'],

    
    historicalDuo: {
      "maleHost": {
            "id": "shah-jahan",
            "name": "Emperor Shah Jahan",
            "title": "Fifth Mughal Emperor & Master Builder",
            "role": "Imperial Builder & Chronicler",
            "gender": "male",
            "portrait": "/assets/hosts/taj-mahal-male.svg",
            "voicePitch": 0.88,
            "costumeStyle": "mughal-imperial",
            "attireDescription": "Emerald silk Jama tunic with Zardozi gold embroidery, crimson Farji overcoat, and jeweled Khanjar dagger"
      },
      "femaleHost": {
            "id": "mumtaz-mahal",
            "name": "Empress Mumtaz Mahal",
            "title": "Chief Consort & Inspiration of the Taj",
            "role": "Artistic & Aesthetic Narrator",
            "gender": "female",
            "portrait": "/assets/hosts/taj-mahal-female.svg",
            "voicePitch": 1.15,
            "costumeStyle": "mughal-regal",
            "attireDescription": "Fine ivory silk Peshwaz, sheer organza Dupatta with gold Zari border, Basra pearls, and floral jhumkas"
      },
      "introExchange": [
            {
                  "speaker": "male",
                  "speakerName": "Emperor Shah Jahan",
                  "text": "Marhaba, distinguished traveler of future centuries! I am Shahab-ud-din Muhammad Khurram, Emperor Shah Jahan. You stand before the Rauza-i-Munawwara, commissioned as an earthly mirror of Paradise for my beloved Mumtaz Mahal."
            },
            {
                  "speaker": "female",
                  "speakerName": "Empress Mumtaz Mahal",
                  "text": "And I am Mumtaz Mahal. While my emperor envisioned monumental marble domes, twenty thousand master craftsmen spent twenty-two years carving delicate jali screens and setting twenty-eight gemstone varieties so light itself would weep with wonder."
            }
      ],
      "dialogueExchanges": [
            {
                  "id": "dome-acoustics",
                  "label": "Why does the inner dome echo for nearly 30 seconds?",
                  "exchange": [
                        {
                              "speaker": "male",
                              "speakerName": "Emperor Shah Jahan",
                              "text": "My imperial master mason, Ismail Khan of the Ottoman realm, designed the double-dome with hollow acoustic chambers so sacred prayers would reverberate eternally."
                        },
                        {
                              "speaker": "female",
                              "speakerName": "Empress Mumtaz Mahal",
                              "text": "When holy verses are whispered beneath the cenotaph, the notes float upward, echoing for twenty-eight celestial seconds before dissolving into the Makrana marble."
                        }
                  ]
            },
            {
                  "id": "gemstone-sourcing",
                  "label": "Where were the 28 varieties of gemstones sourced?",
                  "exchange": [
                        {
                              "speaker": "male",
                              "speakerName": "Emperor Shah Jahan",
                              "text": "From every corner of Asia: lapis lazuli from Badakhshan, turquoise from Tibet, jade from China, and fiery carnelians from the Red Sea."
                        },
                        {
                              "speaker": "female",
                              "speakerName": "Empress Mumtaz Mahal",
                              "text": "More than one thousand royal elephants transported the materials, while Italian and Persian lapidaries inlaid them using Parchin Kari so precisely that no seam can be felt by a human finger."
                        }
                  ]
            },
            {
                  "id": "minaret-safety",
                  "label": "How were the four minarets engineered against earthquakes?",
                  "exchange": [
                        {
                              "speaker": "male",
                              "speakerName": "Emperor Shah Jahan",
                              "text": "Observe their posture closely: the four 40-meter minarets do not stand perpendicular. We intentionally tilted them outward by a few deliberate degrees."
                        },
                        {
                              "speaker": "female",
                              "speakerName": "Empress Mumtaz Mahal",
                              "text": "Should a catastrophic earthquake strike Agra, the minarets will collapse safely outward into the gardens, preserving the sacred mausoleum from destruction."
                        }
                  ]
            }
      ]
},
    historicalHost: {
      "id": "shah-jahan",
      "name": "Emperor Shah Jahan",
      "title": "Fifth Mughal Emperor & Master Builder",
      "periodGreeting": "Marhaba, distinguished traveler of future centuries! I am Shahab-ud-din Muhammad Khurram, Emperor Shah Jahan. You stand before the Rauza-i-Munawwara, commissioned as an earthly mirror of Paradise for my beloved Mumtaz Mahal.",
      "dialogueOptions": [
            {
                  "label": "Why does the inner dome echo for nearly 30 seconds?",
                  "response": "Emperor Shah Jahan: \"My imperial master mason, Ismail Khan of the Ottoman realm, designed the double-dome with hollow acoustic chambers so sacred prayers would reverberate eternally.\" \n\nEmpress Mumtaz Mahal: \"When holy verses are whispered beneath the cenotaph, the notes float upward, echoing for twenty-eight celestial seconds before dissolving into the Makrana marble.\""
            },
            {
                  "label": "Where were the 28 varieties of gemstones sourced?",
                  "response": "Emperor Shah Jahan: \"From every corner of Asia: lapis lazuli from Badakhshan, turquoise from Tibet, jade from China, and fiery carnelians from the Red Sea.\" \n\nEmpress Mumtaz Mahal: \"More than one thousand royal elephants transported the materials, while Italian and Persian lapidaries inlaid them using Parchin Kari so precisely that no seam can be felt by a human finger.\""
            },
            {
                  "label": "How were the four minarets engineered against earthquakes?",
                  "response": "Emperor Shah Jahan: \"Observe their posture closely: the four 40-meter minarets do not stand perpendicular. We intentionally tilted them outward by a few deliberate degrees.\" \n\nEmpress Mumtaz Mahal: \"Should a catastrophic earthquake strike Agra, the minarets will collapse safely outward into the gardens, preserving the sacred mausoleum from destruction.\""
            }
      ],
      "avatarConfig": {
            "type": "shah-jahan",
            "costumeStyle": "mughal-imperial",
            "attire": "Emerald silk Jama tunic with Zardozi gold embroidery, crimson Farji overcoat, and jeweled Khanjar dagger"
      }
},
    localGuideTips: {
      ticketInfo: '₹50 for Indian citizens (₹250 with main mausoleum), ₹1100 for foreign tourists. ASI online booking mandatory (no cash at gates).',
      visitingHours: 'Sunrise to Sunset (approx. 6:00 AM – 6:30 PM). Closed on Fridays for prayers.',
      dressCodeAndEtiquette: 'Shoe covers or barefoot required on marble plinth. Strict security: no tripods, large backpacks, tobacco, or food allowed.',
      secretTip: 'Enter via the South Gate at 5:45 AM. Morning sunrise mist off the Yamuna produces an ethereal pink pearl radiance with minimal crowds.',
      localFood: 'Try Agra Petha (Kesar & Angoori) at the authentic Panchhi Petha shop near Noori Gate, paired with spicy Bedmi Puri for breakfast.',
      nearestTransit: 'Agra Cantt Railway Station (5 km) or Kheria Airport (12 km). Battery-operated e-rickshaws only within 500m of the monument.'
    },

    hotspots: [
      { id: 'dome', title: 'Main Onion Dome', x: 0, y: 3.5, z: 0, info: 'Double-dome reaching 73 meters, crowned with a gilded bronze finial bearing Islamic moon and Hindu trident motifs.' },
      { id: 'minaret', title: 'Outward-Tilted Minaret', x: 2.8, y: 2.2, z: 2.8, info: 'Engineered with a 2-degree outward slant so seismic shocks would never damage the central tomb.' },
      { id: 'pool', title: 'Reflecting Canal (Hauz-i-Kausar)', x: 0, y: -0.8, z: 2.5, info: 'Alabaster lotus tank reflecting the perfect symmetry of the mausoleum in calm waters.' }
    ],

    artifact: {
      id: 'mughal-dagger',
      title: 'Imperial Jade-Hilted Khanjar',
      dynasty: 'Mughal Empire (c. 1640 CE)',
      material: 'Nephrite White Jade, Damascus Steel, Rubies & Gold',
      shape: 'dagger',
      description: 'An exquisitely balanced court dagger presented to Emperor Shah Jahan. The hilt is carved from pure white nephrite jade in the form of an imperial horse head, inlaid with floral rubies set in 24k Kundan gold.'
    },

    quiz: [
      {
        question: 'Why are the four minarets of the Taj Mahal slightly tilted outward?',
        options: [
          'To withstand high wind pressure from the Yamuna',
          'To collapse away from the central mausoleum during earthquakes',
          'Due to an optical illusion caused by the marble',
          'Because of foundation settlement over centuries'
        ],
        correct: 1,
        explanation: 'Engineers tilted the 40-meter minarets outward by approximately 2 degrees so that if an earthquake occurred, they would fall outward rather than crushing the central dome.'
      }
    ]
  },

  // 2. MYSORE PALACE (Mysuru, Karnataka)
  {
    id: 'mysore-palace',
    name: 'Mysore Palace',
    hindiName: 'मैसूर पैलेस',
    subtitle: 'Amba Vilas • Jewel of the Wadiyar Dynasty',
    direction: 'South',
    state: 'Karnataka (Mysuru)',
    coordinates: [12.3052, 76.6552],
    era: '1897 – 1912 CE (Indo-Saracenic Golden Era)',
    dynasty: 'Wadiyar Dynasty',
    unescoYear: 'State Heritage',
    heroImage: 'https://images.unsplash.com/photo-1590766940554-634a7ed41450?auto=format&fit=crop&w=1200&q=80',
    description: 'The monumental royal residence of the Wadiyar Maharajas of Mysore. Designed by legendary British architect Henry Irwin in Indo-Saracenic grandeur, blending Hindu, Mughal, Rajput, and Gothic styles with three tiers of granite arches, pink marble domes, and 97,000 illumination lamps.',
    stats: [{'label': 'Construction Period', 'value': '1897 – 1912 CE'}, {'label': 'Architectural Style', 'value': 'Indo-Saracenic Revival'}, {'label': 'Palace Illumination', 'value': '97,000+ Bulbs'}],
    sources: ['Karnataka State Tourism Development Corporation (KSTDC)', 'Henry Irwin Architectural Archives (1897)', 'Mysore Royal Palace Board'],

    
    historicalDuo: {
      "maleHost": {
            "id": "krishnaraja-wadiyar",
            "name": "Maharaja Krishnaraja Wadiyar IV",
            "title": "Rajarshi Ruler of Mysore & Modern Visionary",
            "role": "Statecraft & Architectural Visionary",
            "gender": "male",
            "portrait": "/assets/hosts/mysore-palace-male.svg",
            "voicePitch": 0.88,
            "costumeStyle": "wadiyar-royal",
            "attireDescription": "Midnight navy Durbar Sherwani with 24kt gold buttons, Mysore Silk Sash, and Peta turban with Gandaberunda emblem"
      },
      "femaleHost": {
            "id": "vani-vilasa",
            "name": "Maharani Vani Vilasa Sannidhana",
            "title": "Regent Queen of Mysore & Palace Patron",
            "role": "Royal Matriarch & Palace Founder",
            "gender": "female",
            "portrait": "/assets/hosts/mysore-palace-female.svg",
            "voicePitch": 1.15,
            "costumeStyle": "mysore-crepe-royal",
            "attireDescription": "Royal peacock-green Mysore Crepe Silk Saree with pure gold Zari pallu, diamond Vaddanam waist belt, and traditional Kasu Mala"
      },
      "introExchange": [
            {
                  "speaker": "male",
                  "speakerName": "Maharaja Krishnaraja Wadiyar IV",
                  "text": "Namaskara! I am Krishnaraja Wadiyar IV. Welcome to the Amba Vilas Palace, a confluence of Indo-Saracenic grandeur, Dravidian granite, and enlightened statecraft."
            },
            {
                  "speaker": "female",
                  "speakerName": "Maharani Vani Vilasa Sannidhana",
                  "text": "And I am Kempananjammanni, Maharani Regent Vani Vilasa. When our wooden palace burned during my daughter's wedding in 1897, I commissioned British architect Henry Irwin to construct this unburnable citadel of stone and pink marble so Mysore's flame would shine forever."
            }
      ],
      "dialogueExchanges": [
            {
                  "id": "illumination",
                  "label": "How many incandescent bulbs illuminate the palace during Dussehra?",
                  "exchange": [
                        {
                              "speaker": "male",
                              "speakerName": "Maharaja Krishnaraja Wadiyar IV",
                              "text": "Exactly ninety-seven thousand incandescent lamps light up every arch and dome simultaneously during the Vijayadashami festival, powered by our pioneering Shivanasamudra hydroelectric dam."
                        },
                        {
                              "speaker": "female",
                              "speakerName": "Maharani Vani Vilasa Sannidhana",
                              "text": "When the switch is thrown from the Durbar Hall, the entire granite facade transforms into a radiant palace of starlight that can be seen across the Chamundi hills."
                        }
                  ]
            },
            {
                  "id": "golden-howdah",
                  "label": "What is the history of the 750kg Golden Howdah?",
                  "exchange": [
                        {
                              "speaker": "male",
                              "speakerName": "Maharaja Krishnaraja Wadiyar IV",
                              "text": "The Chinnada Ambari is crafted from 750 kilograms of pure gold, carved with motifs of Chamundeshwari, and mounted upon the lead royal elephant during the Jamboo Savari procession."
                        },
                        {
                              "speaker": "female",
                              "speakerName": "Maharani Vani Vilasa Sannidhana",
                              "text": "It carries the idol of Goddess Chamundeshwari, symbolizing righteousness conquering all darkness. For four centuries, our citizens have gathered to receive its blessings."
                        }
                  ]
            },
            {
                  "id": "durbar-stained-glass",
                  "label": "Where was the peacock stained-glass ceiling manufactured?",
                  "exchange": [
                        {
                              "speaker": "male",
                              "speakerName": "Maharaja Krishnaraja Wadiyar IV",
                              "text": "Our Public Durbar Hall features a soaring Belgian stained-glass ceiling cast with peacock motifs and cast-iron pillars crafted by Glasgow artisans."
                        },
                        {
                              "speaker": "female",
                              "speakerName": "Maharani Vani Vilasa Sannidhana",
                              "text": "The glass disperses the tropical midday sun into soothing turquoise and emerald jewel tones, keeping our royal durbar cool and dignified throughout the year."
                        }
                  ]
            }
      ]
},
    historicalHost: {
      "id": "krishnaraja-wadiyar",
      "name": "Maharaja Krishnaraja Wadiyar IV",
      "title": "Rajarshi Ruler of Mysore & Modern Visionary",
      "periodGreeting": "Namaskara! I am Krishnaraja Wadiyar IV. Welcome to the Amba Vilas Palace, a confluence of Indo-Saracenic grandeur, Dravidian granite, and enlightened statecraft.",
      "dialogueOptions": [
            {
                  "label": "How many incandescent bulbs illuminate the palace during Dussehra?",
                  "response": "Maharaja Krishnaraja Wadiyar IV: \"Exactly ninety-seven thousand incandescent lamps light up every arch and dome simultaneously during the Vijayadashami festival, powered by our pioneering Shivanasamudra hydroelectric dam.\" \n\nMaharani Vani Vilasa Sannidhana: \"When the switch is thrown from the Durbar Hall, the entire granite facade transforms into a radiant palace of starlight that can be seen across the Chamundi hills.\""
            },
            {
                  "label": "What is the history of the 750kg Golden Howdah?",
                  "response": "Maharaja Krishnaraja Wadiyar IV: \"The Chinnada Ambari is crafted from 750 kilograms of pure gold, carved with motifs of Chamundeshwari, and mounted upon the lead royal elephant during the Jamboo Savari procession.\" \n\nMaharani Vani Vilasa Sannidhana: \"It carries the idol of Goddess Chamundeshwari, symbolizing righteousness conquering all darkness. For four centuries, our citizens have gathered to receive its blessings.\""
            },
            {
                  "label": "Where was the peacock stained-glass ceiling manufactured?",
                  "response": "Maharaja Krishnaraja Wadiyar IV: \"Our Public Durbar Hall features a soaring Belgian stained-glass ceiling cast with peacock motifs and cast-iron pillars crafted by Glasgow artisans.\" \n\nMaharani Vani Vilasa Sannidhana: \"The glass disperses the tropical midday sun into soothing turquoise and emerald jewel tones, keeping our royal durbar cool and dignified throughout the year.\""
            }
      ],
      "avatarConfig": {
            "type": "krishnaraja-wadiyar",
            "costumeStyle": "wadiyar-royal",
            "attire": "Midnight navy Durbar Sherwani with 24kt gold buttons, Mysore Silk Sash, and Peta turban with Gandaberunda emblem"
      }
},
    localGuideTips: {
      ticketInfo: '₹100 for adults, ₹50 for students. Foreign tourists ₹100. Sound & Light Show ₹90 in the evening.',
      visitingHours: '10:00 AM – 5:30 PM daily. Palace illumination on Sundays & public holidays from 7:00 PM – 7:45 PM.',
      dressCodeAndEtiquette: 'Footwear strictly prohibited inside the main palace (free shoe counters available). Photography inside the museum halls requires permission.',
      secretTip: 'Visit on Sunday evening at 6:30 PM. Watch the twilight descend as 97,000 golden bulbs simultaneously switch on to royal brass band fanfares!',
      localFood: 'Indulge in authentic Mysore Pak at Guru Sweet Mart (origin of the sweet) and crispy Mysore Masala Dosa at Mylari Hotel near Nazarbad.',
      nearestTransit: 'Mysuru Junction Railway Station is just 2 km away. KSRTC central bus stand is 1.5 km.'
    },

    hotspots: [
      { id: 'central-tower', title: '145-Foot Central Gilded Tower', x: 0, y: 3.8, z: 0, info: 'Soaring five-story central tower topped by a golden dome bearing the royal coat of arms.' },
      { id: 'arched-colonnade', title: 'Indo-Saracenic Colonnade', x: -1.8, y: 1.0, z: 1.2, info: 'Multi-tiered granite arches with deep carvings of Gajalakshmi, the goddess of royal wealth.' },
      { id: 'durbar-hall', title: 'Gombe Thotti (Doll Pavilion)', x: 1.5, y: 0.8, z: 0.5, info: 'Galleries displaying traditional Dasara royal palanquins and bronze sculptures.' }
    ],

    artifact: {
      id: 'golden-howdah',
      title: 'Golden Howdah (Chinnada Ambari)',
      dynasty: 'Wadiyar Dynasty (19th Century)',
      material: '80 kg Pure Gold Sheets, Teak Wood, Precious Rubies',
      shape: 'throne',
      description: 'The ceremonial elephant throne used during the grand Mysore Dasara Jamboo Savari. Elaborately embossed with sacred motifs of Goddess Chamundeshwari and royal heraldry.'
    },

    quiz: [
      {
        question: 'How many light bulbs illuminate the Mysore Palace on Sunday evenings?',
        options: ['12,000', '45,000', '97,000', '150,000'],
        correct: 2,
        explanation: 'The Mysore Palace is illuminated by approximately 97,000 incandescent light bulbs, creating an awe-inspiring golden spectacle.'
      }
    ]
  },

  // 3. KONARK SUN TEMPLE (Konark, Odisha)
  {
    id: 'konark-sun-temple',
    name: 'Konark Sun Temple',
    hindiName: 'कोणार्क सूर्य मंदिर',
    subtitle: 'Black Pagoda • The Colossal Sun Chariot of Surya',
    direction: 'East',
    state: 'Odisha (Puri Coast)',
    coordinates: [19.8876, 86.0945],
    era: '1250 CE (Eastern Ganga Dynasty)',
    dynasty: 'Eastern Ganga Dynasty',
    unescoYear: 1984,
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Konarka_Temple.jpg/1280px-Konarka_Temple.jpg',
    description: 'A monument of epic cosmic imagination: a colossal stone chariot of Surya, the Sun God, with 24 intricately carved wheels drawn by 7 leaping horses. Constructed from Khondalite stone on the Bay of Bengal coast by King Narasimhadeva I.',
    stats: [{'label': 'Construction Period', 'value': '1238 – 1264 CE'}, {'label': 'Chariot Wheels', 'value': '24 Carved Stone Wheels'}, {'label': 'Sculpted Horses', 'value': '7 Galloping Horses'}],
    sources: ['Archaeological Survey of India (ASI)', 'UNESCO World Heritage Center (Ref: 262)', 'Kalinga Temple Architecture Studies'],

    
    historicalDuo: {
      "maleHost": {
            "id": "narasimhadeva",
            "name": "King Narasimhadeva I",
            "title": "Eastern Ganga Dynasty King & Arkakshetra Builder",
            "role": "Warrior Monarch & Celestial Builder",
            "gender": "male",
            "portrait": "/assets/hosts/konark-sun-temple-male.svg",
            "voicePitch": 0.88,
            "costumeStyle": "odisha-royal",
            "attireDescription": "Royal draped Silk Dhoti with golden Sambalpuri borders, Kiritamukuta golden crown, Vanamala victory garland, and royal sword"
      },
      "femaleHost": {
            "id": "kasturi-kamodini",
            "name": "Queen Kasturi Kamodini",
            "title": "Queen Consort & Patron of Odissi Dance",
            "role": "Cultural Patron & Temple Chronicler",
            "gender": "female",
            "portrait": "/assets/hosts/konark-sun-temple-female.svg",
            "voicePitch": 1.15,
            "costumeStyle": "odisha-classical",
            "attireDescription": "Crimson Bomkai silk saree with gold temple borders, Odissi silver filigree waist belt (Bengapatia), and floral headpiece"
      },
      "introExchange": [
            {
                  "speaker": "male",
                  "speakerName": "King Narasimhadeva I",
                  "text": "Jaya Jagannatha! I am King Langula Narasimhadeva of the Eastern Ganga realm. Here upon the golden sands of Chandrabhaga, I built this immense stone chariot for Lord Surya, pulled across the cosmic skies by seven galloping horses."
            },
            {
                  "speaker": "female",
                  "speakerName": "Queen Kasturi Kamodini",
                  "text": "And I am Queen Kasturi Kamodini. Twelve hundred master sculptors devoted twelve sacred years carving celestial musicians, dancers, and twenty-four sundial chariot wheels that tell the exact minute from solar shadows."
            }
      ],
      "dialogueExchanges": [
            {
                  "id": "sundial-wheels",
                  "label": "How do the 24 stone chariot wheels calculate precise time?",
                  "exchange": [
                        {
                              "speaker": "male",
                              "speakerName": "King Narasimhadeva I",
                              "text": "Each of the twenty-four wheels represents an hour of the day, with eight major spokes dividing the three-hour praharas, and minor spokes dividing the quarters."
                        },
                        {
                              "speaker": "female",
                              "speakerName": "Queen Kasturi Kamodini",
                              "text": "Place your fingertip at the center of a spoke's hub; the shadow cast by the sun reveals the exact minute of the day, calibrated precisely to Odisha's latitude."
                        }
                  ]
            },
            {
                  "id": "magnetic-legend",
                  "label": "Did loadstones and magnetic iron beams really suspend the Surya idol?",
                  "exchange": [
                        {
                              "speaker": "male",
                              "speakerName": "King Narasimhadeva I",
                              "text": "Our temple masons interlocked heavy iron beams between khondalite blocks, anchoring a lodestone pinnacle atop the 229-foot sanctuary spire."
                        },
                        {
                              "speaker": "female",
                              "speakerName": "Queen Kasturi Kamodini",
                              "text": "According to sailor folklore, the magnetic attraction was so potent that European trading ships sailing past the coast found their compasses seized, leading them to call it the Black Pagoda."
                        }
                  ]
            }
      ]
},
    historicalHost: {
      "id": "narasimhadeva",
      "name": "King Narasimhadeva I",
      "title": "Eastern Ganga Dynasty King & Arkakshetra Builder",
      "periodGreeting": "Jaya Jagannatha! I am King Langula Narasimhadeva of the Eastern Ganga realm. Here upon the golden sands of Chandrabhaga, I built this immense stone chariot for Lord Surya, pulled across the cosmic skies by seven galloping horses.",
      "dialogueOptions": [
            {
                  "label": "How do the 24 stone chariot wheels calculate precise time?",
                  "response": "King Narasimhadeva I: \"Each of the twenty-four wheels represents an hour of the day, with eight major spokes dividing the three-hour praharas, and minor spokes dividing the quarters.\" \n\nQueen Kasturi Kamodini: \"Place your fingertip at the center of a spoke's hub; the shadow cast by the sun reveals the exact minute of the day, calibrated precisely to Odisha's latitude.\""
            },
            {
                  "label": "Did loadstones and magnetic iron beams really suspend the Surya idol?",
                  "response": "King Narasimhadeva I: \"Our temple masons interlocked heavy iron beams between khondalite blocks, anchoring a lodestone pinnacle atop the 229-foot sanctuary spire.\" \n\nQueen Kasturi Kamodini: \"According to sailor folklore, the magnetic attraction was so potent that European trading ships sailing past the coast found their compasses seized, leading them to call it the Black Pagoda.\""
            }
      ],
      "avatarConfig": {
            "type": "narasimhadeva",
            "costumeStyle": "odisha-royal",
            "attire": "Royal draped Silk Dhoti with golden Sambalpuri borders, Kiritamukuta golden crown, Vanamala victory garland, and royal sword"
      }
},
    localGuideTips: {
      ticketInfo: '₹40 for Indian citizens, ₹600 for foreign visitors. Sound & Light Show ₹50 at night.',
      visitingHours: '6:00 AM – 8:00 PM daily. Excellent night illumination.',
      dressCodeAndEtiquette: 'Comfortable cotton clothing and hats for coastal sun. No shoes needed on the outer sandy grounds, but keep reverence.',
      secretTip: 'Watch the sunrise through the eastern Natya Mandapa (Dance Pavilion). The morning sun aligns directly through the main gateway as calculated 770 years ago.',
      localFood: 'Try hot Chhena Poda (baked cardamom cottage cheese cake) and coastal Odia Dalma with steamed rice at Chandrabhaga beach stalls.',
      nearestTransit: 'Puri Railway Station is 35 km away. Biju Patnaik International Airport (Bhubaneswar) is 65 km.'
    },

    hotspots: [
      { id: 'sundial-wheel', title: 'Astronomical Sundial Wheel', x: 2.2, y: 0.8, z: 1.5, info: 'Carved wheel with 8 major and 8 minor spokes capable of measuring time to minute accuracy by shadow.' },
      { id: 'horses', title: 'Galloping Solar Steeds', x: -2.0, y: 0.5, z: 2.5, info: 'Seven stone horses sculpted in dynamic galloping motion, facing the morning dawn.' },
      { id: 'jagamohana', title: 'Jagamohana (Audience Hall)', x: 0, y: 2.8, z: 0, info: 'Pyramidal tiered shikhara reaching 39 meters, crowned by sacred Kalasha and Amalaka.' }
    ],

    artifact: {
      id: 'sun-wheel-model',
      title: 'Sacred Wheel of Konark',
      dynasty: 'Eastern Ganga (13th Century)',
      material: 'Carved Chlorite & Khondalite Stone',
      shape: 'wheel',
      description: 'An exact miniature casting of the 12-spoke Konark Sundial wheel, showing the intricate beadings, floral scrolls, and erotic sculptures carved into the rim.'
    },

    quiz: [
      {
        question: 'How many wheels are carved around the platform of the Konark Sun Temple?',
        options: ['12 wheels', '18 wheels', '24 wheels', '36 wheels'],
        correct: 2,
        explanation: 'The Konark Sun Temple features 24 wheels (12 pairs), symbolizing the 12 months of the Hindu solar calendar.'
      }
    ]
  },

  // 4. GATEWAY OF INDIA (Mumbai, Maharashtra)
  {
    id: 'gateway-of-india',
    name: 'Gateway of India',
    hindiName: 'गेटवे ऑफ़ इंडिया',
    subtitle: 'Triumphal Portal of the Arabian Sea',
    direction: 'West',
    state: 'Maharashtra (Mumbai Waterfront)',
    coordinates: [18.9220, 72.8347],
    era: '1911 – 1924 CE (Indo-Saracenic Triumphal Arch)',
    dynasty: 'British Raj Architecture',
    unescoYear: 'National Heritage',
    heroImage: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=80',
    description: 'The monumental 83-foot yellow basalt triumphal arch standing proud on the waterfront of Apollo Bunder. Designed by George Wittet in grand Indo-Saracenic style, fusing 16th-century Gujarati Sultanate jali screens with Roman triumphal arches. The ceremonial gateway where the last British troops departed India in 1948.',
    stats: [{'label': 'Construction Period', 'value': '1911 – 1924 CE'}, {'label': 'Basalt Arch Height', 'value': '26 Meters (85 ft)'}, {'label': 'Lead Architect', 'value': 'George Wittet'}],
    sources: ['Maharashtra Tourism Development Corporation (MTDC)', 'ASI Mumbai Circle Archives', 'British India Public Works Records (1924)'],

    
    historicalDuo: {
      "maleHost": {
            "id": "george-wittet",
            "name": "Sir George Wittet",
            "title": "Consulting Architect & Indo-Saracenic Master",
            "role": "Master Architect & City Planner",
            "gender": "male",
            "portrait": "/assets/hosts/gateway-of-india-male.svg",
            "voicePitch": 0.88,
            "costumeStyle": "edwardian-architect",
            "attireDescription": "Edwardian three-piece charcoal tweed suit, tailored waistcoat with pocket watch chain, architectural calipers, and linen collar"
      },
      "femaleHost": {
            "id": "lady-sydenham",
            "name": "Lady Sydenham (Lady Clarke)",
            "title": "Patron of Bombay Arts & Cultural Societies",
            "role": "Civic Patron & Historical Eyewitness",
            "gender": "female",
            "portrait": "/assets/hosts/gateway-of-india-female.svg",
            "voicePitch": 1.15,
            "costumeStyle": "edwardian-regal",
            "attireDescription": "High-collared Edwardian silk damask afternoon dress with lace ruffles, feathered wide-brim hat, and pearl brooch"
      },
      "introExchange": [
            {
                  "speaker": "male",
                  "speakerName": "Sir George Wittet",
                  "text": "Good day! I am George Wittet, Consulting Architect to the Government of Bombay. Standing here at Apollo Bunder, I forged this ceremonial triumphal arch by wedding 16th-century Gujarati Sultanate stone filigree with monumental Roman majesty."
            },
            {
                  "speaker": "female",
                  "speakerName": "Lady Sydenham",
                  "text": "And I am Lady Sydenham. On March 31, 1911, my husband and I laid the formal foundation stone in the Arabian Sea mud to commemorate the royal landing of King George V, creating Mumbai's most iconic maritime entrance."
            }
      ],
      "dialogueExchanges": [
            {
                  "id": "basalt-stone",
                  "label": "Why was yellow Kharodi basalt chosen instead of white marble?",
                  "exchange": [
                        {
                              "speaker": "male",
                              "speakerName": "Sir George Wittet",
                              "text": "Yellow Kharodi basalt from local Maharashtra quarries withstands the salty Arabian Sea gale and torrential monsoons far better than porous marble, weathering with a warm golden patina."
                        },
                        {
                              "speaker": "female",
                              "speakerName": "Lady Sydenham",
                              "text": "The stone absorbs the afternoon sun over the harbor, echoing the ancient cave basalt of Elephanta across the bay."
                        }
                  ]
            },
            {
                  "id": "independence-exit",
                  "label": "What historic event occurred here in February 1948?",
                  "exchange": [
                        {
                              "speaker": "male",
                              "speakerName": "Sir George Wittet",
                              "text": "Though built as an imperial arrival portal, history granted the Gateway a profound poetic destiny on February 28, 1948."
                        },
                        {
                              "speaker": "female",
                              "speakerName": "Lady Sydenham",
                              "text": "The final British troops, the Somerset Light Infantry, marched through this arch to board their ship home, bringing two centuries of colonial rule to a formal, peaceful conclusion as free India saluted."
                        }
                  ]
            }
      ]
},
    historicalHost: {
      "id": "george-wittet",
      "name": "Sir George Wittet",
      "title": "Consulting Architect & Indo-Saracenic Master",
      "periodGreeting": "Good day! I am George Wittet, Consulting Architect to the Government of Bombay. Standing here at Apollo Bunder, I forged this ceremonial triumphal arch by wedding 16th-century Gujarati Sultanate stone filigree with monumental Roman majesty.",
      "dialogueOptions": [
            {
                  "label": "Why was yellow Kharodi basalt chosen instead of white marble?",
                  "response": "Sir George Wittet: \"Yellow Kharodi basalt from local Maharashtra quarries withstands the salty Arabian Sea gale and torrential monsoons far better than porous marble, weathering with a warm golden patina.\" \n\nLady Sydenham: \"The stone absorbs the afternoon sun over the harbor, echoing the ancient cave basalt of Elephanta across the bay.\""
            },
            {
                  "label": "What historic event occurred here in February 1948?",
                  "response": "Sir George Wittet: \"Though built as an imperial arrival portal, history granted the Gateway a profound poetic destiny on February 28, 1948.\" \n\nLady Sydenham: \"The final British troops, the Somerset Light Infantry, marched through this arch to board their ship home, bringing two centuries of colonial rule to a formal, peaceful conclusion as free India saluted.\""
            }
      ],
      "avatarConfig": {
            "type": "george-wittet",
            "costumeStyle": "edwardian-architect",
            "attire": "Edwardian three-piece charcoal tweed suit, tailored waistcoat with pocket watch chain, architectural calipers, and linen collar"
      }
},
    localGuideTips: {
      ticketInfo: 'Free public entry 24/7. Ferry rides to Elephanta Caves cost ₹260 return.',
      visitingHours: 'Open 24 hours. Best experienced early morning at sunrise or illuminated after dusk.',
      dressCodeAndEtiquette: 'Casual attire. Be vigilant with luggage due to strict coastal police security cordons.',
      secretTip: 'Catch the 9:00 AM heritage ferry to Elephanta Island right behind the Gateway for unmatched photography of the arch framed against the sea.',
      localFood: 'Walk across to the iconic Leopold Cafe on Colaba Causeway, or grab hot Mumbai Vada Pav and Pav Bhaji at Cannon Pav Bhaji near CST.',
      nearestTransit: 'Churchgate (Western) and CSMT (Central) railway stations are 2.5 km away. Frequent BEST AC buses connect directly.'
    },

    hotspots: [
      { id: 'central-arch', title: '83-Foot Grand Central Portal', x: 0, y: 2.2, z: 0, info: 'Triumphal central archway with a span of 15 meters, flanked by pierced stone screens.' },
      { id: 'jali-domes', title: 'Corner Pierced Jali Turrets', x: 1.8, y: 3.2, z: 0.6, info: 'Four corner octagonal turrets crowned by small ribbed domes inspired by Ahmedabad mosques.' },
      { id: 'seafront-promenade', title: 'Apollo Bunder Promenade', x: 0, y: -0.6, z: 2.5, info: 'Broad stone promenade meeting the Arabian Sea where heritage ferries dock.' }
    ],

    artifact: {
      id: 'gateway-blueprint',
      title: 'Original Architectural Drafting Plan',
      dynasty: 'Public Works Dept (1914 CE)',
      material: 'Cyanotype Blueprint Paper & Indian Ink',
      shape: 'scroll',
      description: 'Sir George Wittet’s original hand-drafted structural elevation drawing of the Gateway of India, showing the mathematical ratio between the central arch and corner minarets.'
    },

    quiz: [
      {
        question: 'When did the last British troops depart India through the Gateway of India?',
        options: ['August 15, 1947', 'January 26, 1948', 'February 28, 1948', 'August 15, 1950'],
        correct: 2,
        explanation: 'On February 28, 1948, the last British regiment (Somerset Light Infantry) marched through the Gateway of India, ending British military presence in India.'
      }
    ]
  },

  // 5. BRIHADISVARA TEMPLE (Thanjavur, Tamil Nadu)
  {
    id: 'brihadisvara-temple',
    name: 'Brihadisvara Temple',
    hindiName: 'बृहदीश्वर मंदिर',
    subtitle: 'Peruvudaiyar Kovil • The Great Living Chola Temple',
    direction: 'South',
    state: 'Tamil Nadu (Thanjavur)',
    coordinates: [10.7828, 79.1318],
    era: '1010 CE (Imperial Chola Empire)',
    dynasty: 'Chola Dynasty',
    unescoYear: 1987,
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Brihadisvara_Temple_during_Maha_Shivaratri-WUS03611_%28edit%29.jpg/1280px-Brihadisvara_Temple_during_Maha_Shivaratri-WUS03611_%28edit%29.jpg',
    description: 'A monolithic marvel of granite engineering built by Emperor Rajaraja Chola I. Its colossal 216-foot 16-story Vimana tower is crowned by an 80-ton single granite capstone (Kumbam). Contains a massive monolithic Nandi bull and celebrated Chola bronze sculptures.',
    stats: [{'label': 'Construction Period', 'value': '1003 – 1010 CE'}, {'label': 'Vimana Tower Height', 'value': '66 Meters (216 ft)'}, {'label': 'Granite Capstone', 'value': '80 Ton Single Block'}],
    sources: ['Archaeological Survey of India (ASI)', 'UNESCO Great Living Chola Temples (Ref: 250bis)', 'K.A. Nilakanta Sastri - A History of South India'],

    
    historicalDuo: {
      "maleHost": {
            "id": "rajaraja-chola",
            "name": "Emperor Raja Raja Chola I",
            "title": "Great Chola Sovereign & Dakshina Meru Builder",
            "role": "Sovereign Builder & Military Genius",
            "gender": "male",
            "portrait": "/assets/hosts/brihadisvara-temple-male.svg",
            "voicePitch": 0.88,
            "costumeStyle": "chola-imperial",
            "attireDescription": "Draped white-and-gold Silk Veshti with 6-inch Zari borders, Ratnamakuta golden crown, Tiger Sengol (scepter), and gold chest harness"
      },
      "femaleHost": {
            "id": "kundavai-pirattiyar",
            "name": "Princess Kundavai Pirattiyar",
            "title": "Elder Chola Princess, Stateswoman & Chief Patron",
            "role": "Royal Mentor, Philanthropist & Epigraphist",
            "gender": "female",
            "portrait": "/assets/hosts/brihadisvara-temple-female.svg",
            "voicePitch": 1.15,
            "costumeStyle": "chola-regal",
            "attireDescription": "Crimson Kanchipuram silk saree with pure gold kasavu borders, gold temple Kasu Mala necklace, Vanki armlets, and braided flower ornaments"
      },
      "introExchange": [
            {
                  "speaker": "male",
                  "speakerName": "Emperor Raja Raja Chola I",
                  "text": "Vazhga Tamizh! I am Raja Raja Chola I. One thousand years ago, in 1010 CE, I consecrated this soaring 216-foot granite Vimana, Dakshina Meru, constructed entirely of interlocking granite without a single ounce of binding mortar."
            },
            {
                  "speaker": "female",
                  "speakerName": "Princess Kundavai Pirattiyar",
                  "text": "And I am Kundavai, his elder sister and advisor. While Raja Raja commanded the empire from the Kaveri to Sri Lanka, I endowed this sanctum with sixty-six bronze murtis, ruby-encrusted crowns, and temple endowments carved permanently into the granite walls."
            }
      ],
      "dialogueExchanges": [
            {
                  "id": "kumbam-engineering",
                  "label": "How was the 80-ton monolithic Kumbam stone hoisted to the apex?",
                  "exchange": [
                        {
                              "speaker": "male",
                              "speakerName": "Emperor Raja Raja Chola I",
                              "text": "Our chief architect, Kunjara Mallan Raja Raja Perunthachan, constructed an earthen ramp stretching four miles from the village of Sarapallam."
                        },
                        {
                              "speaker": "female",
                              "speakerName": "Princess Kundavai Pirattiyar",
                              "text": "Thousands of royal elephants and war veterans rolled the single eighty-ton octagonal granite capstone up the gentle earthen incline to crown the spire 216 feet in the heavens."
                        }
                  ]
            },
            {
                  "id": "no-granite-mystery",
                  "label": "How did granite reach Thanjavur when none exists within 50 miles?",
                  "exchange": [
                        {
                              "speaker": "male",
                              "speakerName": "Emperor Raja Raja Chola I",
                              "text": "Thanjavur is situated in a fertile alluvial river delta with not a single rocky outcrop. Over one hundred and thirty thousand tons of hard granite were quarried near Tiruchirappalli."
                        },
                        {
                              "speaker": "female",
                              "speakerName": "Princess Kundavai Pirattiyar",
                              "text": "Massive timber rafts floated the stones down the swollen Kaveri and Kollidam rivers during monsoon surges directly to the construction quays."
                        }
                  ]
            }
      ]
},
    historicalHost: {
      "id": "rajaraja-chola",
      "name": "Emperor Raja Raja Chola I",
      "title": "Great Chola Sovereign & Dakshina Meru Builder",
      "periodGreeting": "Vazhga Tamizh! I am Raja Raja Chola I. One thousand years ago, in 1010 CE, I consecrated this soaring 216-foot granite Vimana, Dakshina Meru, constructed entirely of interlocking granite without a single ounce of binding mortar.",
      "dialogueOptions": [
            {
                  "label": "How was the 80-ton monolithic Kumbam stone hoisted to the apex?",
                  "response": "Emperor Raja Raja Chola I: \"Our chief architect, Kunjara Mallan Raja Raja Perunthachan, constructed an earthen ramp stretching four miles from the village of Sarapallam.\" \n\nPrincess Kundavai Pirattiyar: \"Thousands of royal elephants and war veterans rolled the single eighty-ton octagonal granite capstone up the gentle earthen incline to crown the spire 216 feet in the heavens.\""
            },
            {
                  "label": "How did granite reach Thanjavur when none exists within 50 miles?",
                  "response": "Emperor Raja Raja Chola I: \"Thanjavur is situated in a fertile alluvial river delta with not a single rocky outcrop. Over one hundred and thirty thousand tons of hard granite were quarried near Tiruchirappalli.\" \n\nPrincess Kundavai Pirattiyar: \"Massive timber rafts floated the stones down the swollen Kaveri and Kollidam rivers during monsoon surges directly to the construction quays.\""
            }
      ],
      "avatarConfig": {
            "type": "rajaraja-chola",
            "costumeStyle": "chola-imperial",
            "attire": "Draped white-and-gold Silk Veshti with 6-inch Zari borders, Ratnamakuta golden crown, Tiger Sengol (scepter), and gold chest harness"
      }
},
    localGuideTips: {
      ticketInfo: 'Free public entry. Maintained by the Archaeological Survey of India (ASI).',
      visitingHours: '6:00 AM – 12:30 PM, and 4:00 PM – 8:30 PM daily.',
      dressCodeAndEtiquette: 'Traditional attire preferred (Dhoti/Kurta or Sarees/Salwar). Strictly remove footwear before entering the temple compound.',
      secretTip: 'Visit during the evening Pradosham ritual (around 5:30 PM). As priests bathe the 12-foot Shiva Lingam in milk and sandal, the granite corridors reverberate with sacred chanting.',
      localFood: 'Taste authentic Thanjavur Kadappa (lentil-potato curry with idlis) and rich degree filter coffee at heritage eateries near the East Main Street.',
      nearestTransit: 'Thanjavur Junction Railway Station is 1.5 km away. Tiruchirappalli International Airport (TRZ) is 55 km.'
    },

    hotspots: [
      { id: 'vimana-tower', title: '216-Foot Granitic Vimana', x: 0, y: 4.2, z: 0, info: 'Sixteen-story pyramid tower carved entirely from granite, crowned by an 80-ton single stone Kumbam.' },
      { id: 'nandi-mandapa', title: 'Monolithic Nandi Bull', x: 0, y: 0.8, z: 3.2, info: 'Single-stone Nandi bull measuring 6 meters long and 3.7 meters high, facing the sanctum.' },
      { id: 'cloisters', title: 'Pillared Prakara Cloisters', x: -2.5, y: 1.0, z: 0, info: 'Endless pillared corridors adorned with 252 Shiva Lingams and 1,000-year-old Chola frescoes.' }
    ],

    artifact: {
      id: 'chola-nataraja',
      title: 'Chola Lost-Wax Bronze Nataraja',
      dynasty: 'Chola Dynasty (11th Century)',
      material: 'Panchaloha (Five-Metal Alloy) Bronze',
      shape: 'sculpture',
      description: 'The sublime cosmic dance of Lord Shiva (Ananda Tandava), cast using the ancient Madhuchishtavidhana (lost-wax) technique pioneered by Chola artisans.'
    },

    quiz: [
      {
        question: 'What is the weight of the single granite capstone atop the Brihadisvara Vimana?',
        options: ['20 tons', '45 tons', '80 tons', '120 tons'],
        correct: 2,
        explanation: 'The monolithic granite capstone (Kumbam) atop the 216-foot tower weighs approximately 80 tons.'
      }
    ]
  },

  // 6. SANCHI STUPA (Sanchi, Madhya Pradesh)
  {
    id: 'sanchi-stupa',
    name: 'Sanchi Stupa',
    hindiName: 'साँची स्तूप',
    subtitle: 'Great Stupa 1 • The Cradle of Buddhist Art & Dharma',
    direction: 'North',
    state: 'Madhya Pradesh (Raisen)',
    coordinates: [23.4795, 77.7397],
    era: '3rd Century BCE – 1st Century CE (Mauryan to Satavahana)',
    dynasty: 'Maurya & Satavahana Dynasties',
    unescoYear: 1989,
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/East_Gateway_-_Stupa_1_-_Sanchi_Hill_2013-02-21_4398.JPG/1280px-East_Gateway_-_Stupa_1_-_Sanchi_Hill_2013-02-21_4398.JPG',
    description: 'The oldest stone structure in India, commissioned by Emperor Ashoka the Great in the 3rd century BCE over the relics of the Buddha. Features a monumental hemispherical sandstone dome (Anda), stone circumambulation railings, and four world-famous carved Torana gateways.',
    stats: [{'label': 'Construction Period', 'value': '3rd Century BCE – 1st Century BCE'}, {'label': 'Commissioned By', 'value': 'Emperor Ashoka the Great'}, {'label': 'Torana Gateways', 'value': '4 Carved Directional Gates'}],
    sources: ['Archaeological Survey of India (ASI)', 'UNESCO World Heritage Center (Ref: 524)', 'Sir John Marshall - The Monuments of Sanchi (1940)'],

    
    historicalDuo: {
      "maleHost": {
            "id": "emperor-ashoka",
            "name": "Emperor Ashoka the Great",
            "title": "Mauryan Sovereign & Patron of Dhamma",
            "role": "Dhamma Sovereign & Founder",
            "gender": "male",
            "portrait": "/assets/hosts/sanchi-stupa-male.svg",
            "voicePitch": 0.88,
            "costumeStyle": "maurya-imperial",
            "attireDescription": "Draped saffron-ochre Antariya, flowing Uttariya robe with Ashokan Lion Capital medallion, and sacred lotus garland"
      },
      "femaleHost": {
            "id": "empress-devi",
            "name": "Empress Devi (Vidisha Mahadevi)",
            "title": "Chief Consort & Buddhist Patroness of Sanchi",
            "role": "Monastic Overseer & Sacred Matron",
            "gender": "female",
            "portrait": "/assets/hosts/sanchi-stupa-female.svg",
            "voicePitch": 1.15,
            "costumeStyle": "maurya-classical",
            "attireDescription": "Ivory handspun muslin Stanapatta and draped Uttariya with fine lotus-thread embroidery, gold earrings, and fresh waterlily blossoms"
      },
      "introExchange": [
            {
                  "speaker": "male",
                  "speakerName": "Emperor Ashoka the Great",
                  "text": "Namo Buddhaya. I am Emperor Ashoka. After the tears and bloodshed of Kalinga, I laid down the sword and embraced the Dhamma, enshrining the sacred relics of the Buddha within this sandstone Anda dome."
            },
            {
                  "speaker": "female",
                  "speakerName": "Empress Devi",
                  "text": "And I am Devi, born to the merchant guilds of neighboring Vidisha. Here on Chetiyagiri hill, I supervised the vihara chambers and gardens, where our children Mahendra and Sanghamitta meditated before carrying the Buddha's olive branch to Sri Lanka."
            }
      ],
      "dialogueExchanges": [
            {
                  "id": "torana-carvings",
                  "label": "What sacred stories do the four carved Torana gateways narrate?",
                  "exchange": [
                        {
                              "speaker": "male",
                              "speakerName": "Emperor Ashoka the Great",
                              "text": "The four Toranas, aligned with the cardinal directions, chronicle the Jataka tales of Buddha's past lives and his miraculous conquest of suffering."
                        },
                        {
                              "speaker": "female",
                              "speakerName": "Empress Devi",
                              "text": "Notice that the Buddha himself is never sculpted in human form; he is revered through sacred aniconic symbols \u2014 an empty throne under the Bodhi tree, footprints in the dust, and the wheel of Law."
                        }
                  ]
            },
            {
                  "id": "harmika-cosmology",
                  "label": "What is the cosmic significance of the Harmika and three-tiered Chhatras?",
                  "exchange": [
                        {
                              "speaker": "male",
                              "speakerName": "Emperor Ashoka the Great",
                              "text": "The square Harmika atop the dome represents the railing of the cosmic heavens, enclosing the axis mundi connecting earth to the absolute."
                        },
                        {
                              "speaker": "female",
                              "speakerName": "Empress Devi",
                              "text": "The three royal umbrellas ascending above signify the Triple Gem: the Buddha, the Dhamma (his teachings), and the Sangha (the spiritual community)."
                        }
                  ]
            }
      ]
},
    historicalHost: {
      "id": "emperor-ashoka",
      "name": "Emperor Ashoka the Great",
      "title": "Mauryan Sovereign & Patron of Dhamma",
      "periodGreeting": "Namo Buddhaya. I am Emperor Ashoka. After the tears and bloodshed of Kalinga, I laid down the sword and embraced the Dhamma, enshrining the sacred relics of the Buddha within this sandstone Anda dome.",
      "dialogueOptions": [
            {
                  "label": "What sacred stories do the four carved Torana gateways narrate?",
                  "response": "Emperor Ashoka the Great: \"The four Toranas, aligned with the cardinal directions, chronicle the Jataka tales of Buddha's past lives and his miraculous conquest of suffering.\" \n\nEmpress Devi: \"Notice that the Buddha himself is never sculpted in human form; he is revered through sacred aniconic symbols \u2014 an empty throne under the Bodhi tree, footprints in the dust, and the wheel of Law.\""
            },
            {
                  "label": "What is the cosmic significance of the Harmika and three-tiered Chhatras?",
                  "response": "Emperor Ashoka the Great: \"The square Harmika atop the dome represents the railing of the cosmic heavens, enclosing the axis mundi connecting earth to the absolute.\" \n\nEmpress Devi: \"The three royal umbrellas ascending above signify the Triple Gem: the Buddha, the Dhamma (his teachings), and the Sangha (the spiritual community).\""
            }
      ],
      "avatarConfig": {
            "type": "emperor-ashoka",
            "costumeStyle": "maurya-imperial",
            "attire": "Draped saffron-ochre Antariya, flowing Uttariya robe with Ashokan Lion Capital medallion, and sacred lotus garland"
      }
},
    localGuideTips: {
      ticketInfo: '₹40 for Indian citizens, ₹600 for foreign visitors. Children under 15 enter free.',
      visitingHours: 'Sunrise to Sunset (approx. 6:30 AM – 6:30 PM). Open all days.',
      dressCodeAndEtiquette: 'Remove shoes when walking upon the elevated stone pradakshina terrace. Always circumambulate in a clockwise direction.',
      secretTip: 'Inspect the southern gateway closely: you will see an inscription by the ivory workers guild of ancient Vidisha, proving that stone carving evolved directly from delicate ivory chiseling!',
      localFood: 'Try hot Poha-Jalebi in Sanchi town or traditional Malpua and Dal Bafla at local heritage dhabas along the Bhopal highway.',
      nearestTransit: 'Sanchi Railway Station is just 1.5 km away. Bhopal Junction (major hub) is 48 km. Raja Bhoj Airport (Bhopal) is 55 km.'
    },

    hotspots: [
      { id: 'hemisphere-dome', title: 'Hemispherical Anda Dome', x: 0, y: 2.2, z: 0, info: 'Sandstone hemispherical mound reaching 16.5 meters, containing relics of Lord Buddha.' },
      { id: 'torana-gate', title: 'Carved South Torana Gateway', x: 0, y: 1.8, z: 2.8, info: 'Monumental gateway with three architraves supported by sculpted elephant and lion capitals.' },
      { id: 'chhatra-umbrella', title: 'Harmika & 3-Tiered Chhatra', x: 0, y: 3.6, z: 0, info: 'Spindle of three discs symbolizing the Three Jewels of Buddhism (Buddha, Dharma, Sangha).' }
    ],

    artifact: {
      id: 'ashoka-pillar-fragment',
      title: 'Polished Mauryan Lion Capital',
      dynasty: 'Maurya Empire (3rd Century BCE)',
      material: 'Chunar Sandstone with Mirror Polish',
      shape: 'pillar',
      description: 'The famous Mauryan sandstone pillar featuring the legendary glass-like Mauryan polish, four Asiatic lions, and the 24-spoked Dharma Chakra.'
    },

    quiz: [
      {
        question: 'Who commissioned the construction of the Great Stupa at Sanchi?',
        options: ['Kanishka', 'Emperor Ashoka', 'Chandragupta Maurya', 'Harshavardhana'],
        correct: 1,
        explanation: 'Emperor Ashoka the Great commissioned the original Great Stupa at Sanchi in the 3rd century BCE.'
      }
    ]
  },

  // 7. HAWA MAHAL (Jaipur, Rajasthan)
  {
    id: 'hawa-mahal',
    name: 'Hawa Mahal',
    hindiName: 'हवा महल',
    subtitle: 'Palace of Winds • The Crown of Pink Sandstone',
    direction: 'North',
    state: 'Rajasthan (Jaipur)',
    coordinates: [26.9239, 75.8267],
    era: '1799 CE (Kachhwaha Rajput Dynasty)',
    dynasty: 'Kachhwaha Dynasty',
    unescoYear: 2019,
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/East_facade_Hawa_Mahal_Jaipur_from_ground_level_%28July_2022%29_-_img_01.jpg/1280px-East_facade_Hawa_Mahal_Jaipur_from_ground_level_%28July_2022%29_-_img_01.jpg',
    description: 'A pyramidal five-story palace of red and pink sandstone shaped like the crown of Lord Krishna. Designed by Lal Chand Ustad for Maharaja Sawai Pratap Singh, featuring 953 honeycomb casements (jharokhas) decorated with intricate latticework that allowed royal women to observe street festivities without being seen.',
    stats: [{'label': 'Construction Period', 'value': '1799 CE'}, {'label': 'Honeycomb Jharokhas', 'value': '953 Carved Windows'}, {'label': 'Structure Height', 'value': '5 Storeys (50 ft)'}],
    sources: ['Department of Archaeology & Museums, Rajasthan', 'Maharaja Sawai Pratap Singh Royal Archives (1799)', 'Jaipur Heritage Foundation'],

    
    historicalDuo: {
      "maleHost": {
            "id": "pratap-singh",
            "name": "Maharaja Sawai Pratap Singh",
            "title": "Poet-King of Jaipur & Krishna Devotee",
            "role": "Architectural Visionary & Poet Monarch",
            "gender": "male",
            "portrait": "/assets/hosts/hawa-mahal-male.svg",
            "voicePitch": 0.88,
            "costumeStyle": "rajput-royal",
            "attireDescription": "Vibrant saffron-and-crimson Leheriya Pagri turban with royal peacock feather, pleated Rajput Angarkha with gold Kamarband, and curved Talwar"
      },
      "femaleHost": {
            "id": "anand-kunwar",
            "name": "Maharani Anand Kunwar",
            "title": "Senior Royal Kachhwaha Queen",
            "role": "Royal Matron & Festival Observer",
            "gender": "female",
            "portrait": "/assets/hosts/hawa-mahal-female.svg",
            "voicePitch": 1.15,
            "costumeStyle": "rajput-poshak",
            "attireDescription": "Traditional royal Rajasthani Poshak in rani pink with Gota Patti embroidery, heavy Borla forehead jewel, and sheer Bandhani veil"
      },
      "introExchange": [
            {
                  "speaker": "male",
                  "speakerName": "Maharaja Sawai Pratap Singh",
                  "text": "Khamma Ghani! I am Maharaja Sawai Pratap Singh. Inspired by the divine crown of Lord Krishna, I built this five-tiered palace of pink and red sandstone in 1799 as an architectural hymn for Jaipur."
            },
            {
                  "speaker": "female",
                  "speakerName": "Maharani Anand Kunwar",
                  "text": "And I am Maharani Anand Kunwar. Behind its nine hundred and fifty-three delicate screened jharokha bay windows, we watched festive Teej and Gangaur processions while cool mountain breezes circulated through our chambers without ever compromising Purdah."
            }
      ],
      "dialogueExchanges": [
            {
                  "id": "venturi-effect",
                  "label": "How does the Venturi air effect cool the palace naturally?",
                  "exchange": [
                        {
                              "speaker": "male",
                              "speakerName": "Maharaja Sawai Pratap Singh",
                              "text": "Our royal master architect, Lal Chand Ustad, aligned 953 micro-latticed jharokhas into narrow aerodynamic flutes facing the street."
                        },
                        {
                              "speaker": "female",
                              "speakerName": "Maharani Anand Kunwar",
                              "text": "Hot desert winds entering the narrow jalis compress and expand, dropping in temperature due to the Venturi effect, so our interior corridors remain remarkably cool even in peak summer."
                        }
                  ]
            },
            {
                  "id": "no-stairs",
                  "label": "Why does Hawa Mahal have ramps instead of traditional stairs?",
                  "exchange": [
                        {
                              "speaker": "male",
                              "speakerName": "Maharaja Sawai Pratap Singh",
                              "text": "The entire five-story structure is so slender that stairs would occupy too much interior volume, with walls at the top tier measuring barely twelve inches thick."
                        },
                        {
                              "speaker": "female",
                              "speakerName": "Maharani Anand Kunwar",
                              "text": "Smooth brick-paved ramps allowed royal palanquins and heavy gold-embroidered ghagras to glide effortlessly between tiers without tripping on steep steps."
                        }
                  ]
            }
      ]
},
    historicalHost: {
      "id": "pratap-singh",
      "name": "Maharaja Sawai Pratap Singh",
      "title": "Poet-King of Jaipur & Krishna Devotee",
      "periodGreeting": "Khamma Ghani! I am Maharaja Sawai Pratap Singh. Inspired by the divine crown of Lord Krishna, I built this five-tiered palace of pink and red sandstone in 1799 as an architectural hymn for Jaipur.",
      "dialogueOptions": [
            {
                  "label": "How does the Venturi air effect cool the palace naturally?",
                  "response": "Maharaja Sawai Pratap Singh: \"Our royal master architect, Lal Chand Ustad, aligned 953 micro-latticed jharokhas into narrow aerodynamic flutes facing the street.\" \n\nMaharani Anand Kunwar: \"Hot desert winds entering the narrow jalis compress and expand, dropping in temperature due to the Venturi effect, so our interior corridors remain remarkably cool even in peak summer.\""
            },
            {
                  "label": "Why does Hawa Mahal have ramps instead of traditional stairs?",
                  "response": "Maharaja Sawai Pratap Singh: \"The entire five-story structure is so slender that stairs would occupy too much interior volume, with walls at the top tier measuring barely twelve inches thick.\" \n\nMaharani Anand Kunwar: \"Smooth brick-paved ramps allowed royal palanquins and heavy gold-embroidered ghagras to glide effortlessly between tiers without tripping on steep steps.\""
            }
      ],
      "avatarConfig": {
            "type": "pratap-singh",
            "costumeStyle": "rajput-royal",
            "attire": "Vibrant saffron-and-crimson Leheriya Pagri turban with royal peacock feather, pleated Rajput Angarkha with gold Kamarband, and curved Talwar"
      }
},
    localGuideTips: {
      ticketInfo: '₹50 for Indian citizens, ₹200 for foreign tourists. Composite ticket covering Amber Fort and City Palace is also available.',
      visitingHours: '9:00 AM – 5:00 PM daily.',
      dressCodeAndEtiquette: 'Comfortable walking shoes recommended for climbing ramps. Narrow corridors require caution.',
      secretTip: 'Head to the Wind View Cafe or Tattoo Cafe directly across the street for a rooftop seat. You will get a panoramic photograph of the entire 953-window honeycomb facade glowing pink in the morning sun!',
      localFood: 'Sample Pyaaz Kachori and Ghewar at Rawat Mishthan Bhandar, followed by authentic Rajasthani Dal Baati Churma at Laxmi Mishthan Bhandar (LMB) in Johari Bazaar.',
      nearestTransit: 'Badi Chaupar Metro Station (Pink Line) is just 100 meters away. Jaipur Junction Railway Station is 5 km.'
    },

    hotspots: [
      { id: 'jharokha-facade', title: '953 Honeycomb Jharokhas', x: 0, y: 2.5, z: 0.5, info: 'Five-tiered facade of 953 intricately screened bay windows that channel cool breezes.' },
      { id: 'hawa-mandir', title: 'Hawa Mandir (Top Storey)', x: 0, y: 4.2, z: 0, info: 'The uppermost floor after which the monument is named, barely one room in width.' },
      { id: 'courtyard-fountains', title: 'Inner Ramped Courtyard', x: 0, y: 0.5, z: -1.5, info: 'Internal royal courtyards with fountains and smooth stone slopes for palanquin transit.' }
    ],

    artifact: {
      id: 'rajput-poshak',
      title: 'Royal Zardozi Silk Poshak',
      dynasty: 'Kachhwaha Dynasty (18th Century)',
      material: 'Pure Chanderi Silk, Real Silver & Gold Zari Thread',
      shape: 'costume',
      description: 'A lavish four-piece royal Rajput court dress embroidered with real silver gota-patti and peacock motifs, as worn by the royal ladies of Hawa Mahal.'
    },

    quiz: [
      {
        question: 'How many small casements (jharokhas) are built into the facade of Hawa Mahal?',
        options: ['365', '540', '720', '953'],
        correct: 3,
        explanation: 'Hawa Mahal features exactly 953 intricately carved stone jharokhas that provided natural air conditioning through the Venturi effect.'
      }
    ]
  },

  // 8. VICTORIA MEMORIAL (Kolkata, West Bengal)
  {
    id: 'victoria-memorial',
    name: 'Victoria Memorial',
    hindiName: 'विक्टोरिया मेमोरियल',
    subtitle: 'The White Marble Jewel of the Maidan',
    direction: 'East',
    state: 'West Bengal (Kolkata)',
    coordinates: [22.5448, 88.3426],
    era: '1906 – 1921 CE (British Renaissance & Indo-Saracenic)',
    dynasty: 'British Imperial Architecture',
    unescoYear: 'National Landmark',
    heroImage: 'https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=1200&q=80',
    description: 'A monumental white Makrana marble palace set in 64 acres of landscaped gardens on the Kolkata Maidan. Designed by Sir William Emerson and Lord Curzon, fusing Italian Renaissance architecture with Mughal architectural elements such as corner chattris and domed pavilions.',
    stats: [{'label': 'Construction Period', 'value': '1906 – 1921 CE'}, {'label': 'Marble Source', 'value': 'Makrana White Marble'}, {'label': 'Angel of Victory', 'value': '16 ft Revolving Bronze'}],
    sources: ['Victoria Memorial Hall Trust Kolkata', 'Sir William Emerson Architectural Records (1902)', 'Ministry of Culture, Govt of India'],

    
    historicalDuo: {
      "maleHost": {
            "id": "lord-curzon",
            "name": "Lord Curzon",
            "title": "Viceroy of India & Historic Preservationist",
            "role": "Imperial Proposer & Curator",
            "gender": "male",
            "portrait": "/assets/hosts/victoria-memorial-male.svg",
            "voicePitch": 0.88,
            "costumeStyle": "british-viceregal",
            "attireDescription": "Ceremonial British Viceregal dress uniform with gold bullion epaulettes, Order of the Star of India sky-blue sash, and dress sword"
      },
      "femaleHost": {
            "id": "lady-curzon",
            "name": "Lady Mary Curzon",
            "title": "Vicereine of India & Cultural Arts Patron",
            "role": "Heritage Advocate & Aesthetic Patron",
            "gender": "female",
            "portrait": "/assets/hosts/victoria-memorial-female.svg",
            "voicePitch": 1.15,
            "costumeStyle": "edwardian-viceregal",
            "attireDescription": "Famous Peacock Gown inspired by Delhi Durbar with emerald beetle-wing gold Zardozi embroidery and pearl coronet"
      },
      "introExchange": [
            {
                  "speaker": "male",
                  "speakerName": "Lord Curzon",
                  "text": "Welcome to Calcutta! I am Lord Curzon, Viceroy of India. Following Queen Victoria's passing in 1901, I resolved to raise a monumental white marble museum worthy of the Indian Empire, funded entirely by voluntary subscriptions."
            },
            {
                  "speaker": "female",
                  "speakerName": "Lady Mary Curzon",
                  "text": "And I am Mary Curzon. Carved from the very same Makrana marble quarries as the Taj Mahal, this palace houses over thirty thousand treasures, paintings, and manuscripts, crowned above by the rotating sixteen-foot bronze Angel of Victory."
            }
      ],
      "dialogueExchanges": [
            {
                  "id": "angel-of-victory",
                  "label": "How does the rotating 16-foot bronze Angel of Victory work?",
                  "exchange": [
                        {
                              "speaker": "male",
                              "speakerName": "Lord Curzon",
                              "text": "We commissioned sculptor Thomas Brock to cast this three-ton bronze figure atop ball bearings at the peak of the central dome, 184 feet above ground."
                        },
                        {
                              "speaker": "female",
                              "speakerName": "Lady Mary Curzon",
                              "text": "Holding a trumpet and laurel wreath, the entire angel rotates smoothly with the Hooghly river winds, serving as Calcutta's most grand weather vane."
                        }
                  ]
            },
            {
                  "id": "taj-connection",
                  "label": "What is the architectural connection between the Taj Mahal and Victoria Memorial?",
                  "exchange": [
                        {
                              "speaker": "male",
                              "speakerName": "Lord Curzon",
                              "text": "Architect Sir William Emerson drew heavily on Mughal proportions: chamfered octagonal corners, four subsidiary domed chattris, and a grand reflective water pool."
                        },
                        {
                              "speaker": "female",
                              "speakerName": "Lady Mary Curzon",
                              "text": "Even the stone was extracted from the exact quarries of Makrana in Jodhpur, bringing Rajasthan's crystalline white marble to Bengal's colonial capital."
                        }
                  ]
            }
      ]
},
    historicalHost: {
      "id": "lord-curzon",
      "name": "Lord Curzon",
      "title": "Viceroy of India & Historic Preservationist",
      "periodGreeting": "Welcome to Calcutta! I am Lord Curzon, Viceroy of India. Following Queen Victoria's passing in 1901, I resolved to raise a monumental white marble museum worthy of the Indian Empire, funded entirely by voluntary subscriptions.",
      "dialogueOptions": [
            {
                  "label": "How does the rotating 16-foot bronze Angel of Victory work?",
                  "response": "Lord Curzon: \"We commissioned sculptor Thomas Brock to cast this three-ton bronze figure atop ball bearings at the peak of the central dome, 184 feet above ground.\" \n\nLady Mary Curzon: \"Holding a trumpet and laurel wreath, the entire angel rotates smoothly with the Hooghly river winds, serving as Calcutta's most grand weather vane.\""
            },
            {
                  "label": "What is the architectural connection between the Taj Mahal and Victoria Memorial?",
                  "response": "Lord Curzon: \"Architect Sir William Emerson drew heavily on Mughal proportions: chamfered octagonal corners, four subsidiary domed chattris, and a grand reflective water pool.\" \n\nLady Mary Curzon: \"Even the stone was extracted from the exact quarries of Makrana in Jodhpur, bringing Rajasthan's crystalline white marble to Bengal's colonial capital.\""
            }
      ],
      "avatarConfig": {
            "type": "lord-curzon",
            "costumeStyle": "british-viceregal",
            "attire": "Ceremonial British Viceregal dress uniform with gold bullion epaulettes, Order of the Star of India sky-blue sash, and dress sword"
      }
},
    localGuideTips: {
      ticketInfo: '₹50 for Indian citizens (Garden ₹20), ₹500 for foreign visitors. Free for school students in uniform.',
      visitingHours: 'Museum: 10:00 AM – 5:00 PM (Closed on Mondays). Gardens: 5:30 AM – 6:15 PM daily.',
      dressCodeAndEtiquette: 'Casual attire. Photography permitted in gardens; check museum gallery restrictions.',
      secretTip: 'Stroll through the south gardens around 5:00 PM. Watch the twilight reflect the massive white dome in the ornamental lake waters, accompanied by horse-drawn carriage sounds.',
      localFood: 'Head to Park Street (1 km) for legendary Chelo Kebabs at Peter Cat, or relish Kolkata Kathi Rolls at Kusum Rolls and warm Mishti Doi at KC Das.',
      nearestTransit: 'Rabindra Sadan and Maidan Metro Stations are within 800 meters. Howrah Railway Station is 5 km.'
    },

    hotspots: [
      { id: 'victoria-dome', title: '184-Foot Central Marble Dome', x: 0, y: 3.5, z: 0, info: 'Grand dome topped by the rotating 16-foot bronze Angel of Victory.' },
      { id: 'corner-chattris', title: 'Indo-Saracenic Corner Domes', x: 2.2, y: 2.0, z: 1.2, info: 'Octagonal domed pavilions harmonizing Mughal chattri elements with classical colonnades.' },
      { id: 'reflecting-lake', title: 'Ornamental South Pool', x: 0, y: -0.8, z: 2.8, info: 'Reflecting water body framed by royal palm trees and English formal gardens.' }
    ],

    artifact: {
      id: 'angel-of-victory-bronze',
      title: 'Bronze Angel of Victory (Model)',
      dynasty: 'British Imperial (1921 CE)',
      material: 'Cast Bronze & Mercury Ball Bearings',
      shape: 'angel',
      description: 'A scale replica of the 16-foot, 3-ton bronze rotating Angel of Victory that crowns the central dome of Victoria Memorial.'
    },

    quiz: [
      {
        question: 'What figure crowns the summit of the Victoria Memorial dome in Kolkata?',
        options: ['A Bronze Lion', 'The Angel of Victory', 'A Golden Trishul', 'An Imperial Crown'],
        correct: 1,
        explanation: 'The central dome is crowned by a 16-foot-tall, 3-ton bronze rotating statue of the Angel of Victory that turns with the wind.'
      }
    ]
  }
];

// Curated Heritage Trails connecting the 8 iconic monuments across India
export const HERITAGE_TRAILS = [
  {
    id: 'grand-bharat-trail',
    name: 'The Great Indian Sovereign Trail',
    description: 'An epic journey across the 8 greatest architectural landmarks of India, spanning ancient Mauryan stupas, imperial Chola granite towers, Sun God chariots, and royal palaces.',
    estimatedDays: '14 Days',
    region: 'Pan-India',
    distanceKm: 4200,
    themeColor: '#e5b869',
    waypoints: [
      { monumentId: 'sanchi-stupa', name: 'Sanchi Stupa', lat: 23.4795, lng: 77.7397 },
      { monumentId: 'taj-mahal', name: 'Taj Mahal', lat: 27.1751, lng: 78.0421 },
      { monumentId: 'hawa-mahal', name: 'Hawa Mahal', lat: 26.9239, lng: 75.8267 },
      { monumentId: 'gateway-of-india', name: 'Gateway of India', lat: 18.9220, lng: 72.8347 },
      { monumentId: 'mysore-palace', name: 'Mysore Palace', lat: 12.3052, lng: 76.6552 },
      { monumentId: 'brihadisvara-temple', name: 'Brihadisvara Temple', lat: 10.7828, lng: 79.1318 },
      { monumentId: 'konark-sun-temple', name: 'Konark Sun Temple', lat: 19.8876, lng: 86.0945 },
      { monumentId: 'victoria-memorial', name: 'Victoria Memorial', lat: 22.5448, lng: 88.3426 }
    ]
  },
  {
    id: 'royal-palaces-and-monuments',
    name: 'Imperial Dynasties & Citadels',
    description: 'Explore the royal courts of the Wadiyars, Kachhwahas, and Mughals from Jaipur to Mysore.',
    estimatedDays: '7 Days',
    region: 'North-South Royal Axis',
    distanceKm: 2100,
    themeColor: '#e11d48',
    waypoints: [
      { monumentId: 'hawa-mahal', name: 'Hawa Mahal (Jaipur)', lat: 26.9239, lng: 75.8267 },
      { monumentId: 'taj-mahal', name: 'Taj Mahal (Agra)', lat: 27.1751, lng: 78.0421 },
      { monumentId: 'mysore-palace', name: 'Mysore Palace (Mysuru)', lat: 12.3052, lng: 76.6552 }
    ]
  },
  {
    id: 'sacred-spiritual-wonders',
    name: 'Sacred Stone Wonders of India',
    description: 'From the earliest Buddhist Stupa at Sanchi to the cosmic Sun Chariot at Konark and the granite Vimana of Thanjavur.',
    estimatedDays: '8 Days',
    region: 'Spiritual Heritage',
    distanceKm: 2600,
    themeColor: '#059669',
    waypoints: [
      { monumentId: 'sanchi-stupa', name: 'Sanchi Stupa', lat: 23.4795, lng: 77.7397 },
      { monumentId: 'konark-sun-temple', name: 'Konark Sun Temple', lat: 19.8876, lng: 86.0945 },
      { monumentId: 'brihadisvara-temple', name: 'Brihadisvara Temple', lat: 10.7828, lng: 79.1318 }
    ]
  }
];
