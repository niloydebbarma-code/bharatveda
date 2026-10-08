export interface Festival {
  id: string;
  name: string;
  alternateName?: string;
  state: string;
  region: 'north' | 'south' | 'east' | 'west' | 'central' | 'northeast';
  seasonMonth: string;
  theme: 'lights' | 'colors' | 'harvest' | 'arts' | 'spiritual' | 'tribal';
  imageUrl: string;
  summary: string;
  culturalSignificance: string;
  mustExperience: string;
  traditionalTreat: string;
}

export const FESTIVALS: Festival[] = [
  {
    id: 'diwali-deepavali',
    name: 'Diwali (Deepavali)',
    alternateName: 'The Festival of Lights',
    state: 'Pan-India (Varanasi & Ayodhya highlights)',
    region: 'north',
    seasonMonth: 'October / November (Kartik Amavasya)',
    theme: 'lights',
    imageUrl: 'https://images.unsplash.com/photo-1561350111-7daa4f284bc6?auto=format&fit=crop&w=800&q=80',
    summary: 'The grandest celebration in India, illuminating homes, ghats, and monuments with millions of terracotta clay oil lamps (diyas), rangoli floor art, and sweets.',
    culturalSignificance: 'Celebrates the victory of light over darkness and knowledge over ignorance, honoring Lord Rama’s return to Ayodhya and Goddess Lakshmi’s blessings.',
    mustExperience: 'Dev Deepawali in Varanasi where all 84 ghats are illuminated with over one million earthen lamps reflecting upon the sacred Ganga.',
    traditionalTreat: 'Kaju Katli, Besan Ladoo, and freshly pressed Gujiya.',
  },
  {
    id: 'holi-spring-colors',
    name: 'Holi (Braj Mahotsav)',
    alternateName: 'The Festival of Colors & Spring Renewal',
    state: 'Uttar Pradesh & Rajasthan (Mathura, Vrindavan, Barsana)',
    region: 'north',
    seasonMonth: 'March (Phalguna Purnima)',
    theme: 'colors',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/6/6d/Holi-_The_festival_of_Colors.jpg',
    summary: 'An exuberant festival where whole towns celebrate the arrival of spring by showering organic colored powders (Gulal), fragrant flower petals, and festive music.',
    culturalSignificance: 'Commemorates the eternal divine love of Radha and Krishna and the victory of devotion symbolized by the legend of Prahlada.',
    mustExperience: 'Lathmar Holi in Barsana and the Phoolon wali Holi (flower petals celebration) at Banke Bihari Temple in Vrindavan.',
    traditionalTreat: 'Thandai spiced with saffron and almonds, and crispy sweet Mawa Gujiya.',
  },
  {
    id: 'durga-puja-kolkata',
    name: 'Durga Puja',
    alternateName: 'UNESCO Intangible Cultural Heritage of Humanity',
    state: 'West Bengal (Kolkata epicenter)',
    region: 'east',
    seasonMonth: 'September / October (Sharad Navratri)',
    theme: 'arts',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/e/e6/Idols_at_the_pandal_of_College_Square_Sarbojonin_Durgotsab_%28Durga_Puja%29_in_College_Street%2C_Kolkata%2C_West_Bengal.jpg',
    summary: 'An awe-inspiring public art spectacle where hundreds of intricately sculpted temporary art pavilions (Pandals) turn Kolkata into the world’s largest open-air art installation.',
    culturalSignificance: 'Honors the triumph of Goddess Durga over evil force Mahishasura, celebrating feminine cosmic power (Shakti), poetry, music, and homecoming.',
    mustExperience: 'Nighttime Pandal hopping across North and South Kolkata and the electrifying Dhunuchi Naach clay incense dance during Sandhi Puja.',
    traditionalTreat: 'Bhoger Khichuri with Labra, Sandesh, and Mishti Doi.',
  },
  {
    id: 'onam-harvest-kerala',
    name: 'Onam',
    alternateName: 'Kerala’s Sovereign Harvest Carnival',
    state: 'Kerala',
    region: 'south',
    seasonMonth: 'August / September (Chingam Month)',
    theme: 'harvest',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/5/5d/Onam_pookalam_Kerala.jpg',
    summary: 'A 10-day celebration marked by elaborate natural flower carpets (Pookkalam), traditional Vallam Kali snake boat races, and the colossal 26-dish vegetarian feast (Onasadya).',
    culturalSignificance: 'Welcomes the benevolent mythical King Mahabali on his annual visit to check upon the happiness and prosperity of his people.',
    mustExperience: 'Aranmula Boat Race on the Pamba River and traditional Pulikali (tiger mask dance) on the streets of Thrissur.',
    traditionalTreat: 'Onasadya served on fresh banana leaves with Payasam dessert.',
  },
  {
    id: 'hornbill-festival-nagaland',
    name: 'Hornbill Festival',
    alternateName: 'The Festival of Festivals',
    state: 'Nagaland (Naga Heritage Village, Kisama)',
    region: 'northeast',
    seasonMonth: 'December 1 to 10',
    theme: 'tribal',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/2/2c/Hornbill_Festival_of_Nagaland.jpg',
    summary: 'A vibrant showcase uniting 17 indigenous Naga tribes displaying ceremonial dances, ancestral warrior crafts, indigenous archery, indigenous music, and cuisine.',
    culturalSignificance: 'Named after the sacred Indian Hornbill bird revered in Naga folklore, fostering unity and preservation of ancient tribal heritage.',
    mustExperience: 'Night carnival in Kohima and traditional log drum performances in the Morung tribal houses.',
    traditionalTreat: 'Smoked Pork with Axone (fermented soya) and steamed sticky red rice.',
  },
  {
    id: 'pushkar-camel-fair',
    name: 'Pushkar Camel & Heritage Fair',
    alternateName: 'The Great Thar Desert Spectacle',
    state: 'Rajasthan (Pushkar)',
    region: 'north',
    seasonMonth: 'November (Kartik Purnima)',
    theme: 'arts',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/5/5e/A_decorated_camel_at_Pushkar_Camel_Fair.jpg',
    summary: 'One of the world’s largest livestock fairs where over 50,000 decorated camels, horses, and cattle assemble on the sand dunes alongside folk musicians, dancers, and acrobats.',
    culturalSignificance: 'Pairs economic nomadic trade with sacred holy dips in Pushkar Lake, home to one of the world’s few consecrated Lord Brahma temples.',
    mustExperience: 'Hot air ballooning over the sunrise dunes as thousands of camel campfires kindle into the desert dawn.',
    traditionalTreat: 'Pushkar Malpua sweetened in rabri and hot Masala Chai.',
  }
];
