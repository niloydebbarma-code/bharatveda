import React, { createContext, useContext, useEffect, useState } from 'react';

export type LanguageCode = 'en' | 'hi' | 'bn' | 'ta' | 'te';

export interface LanguageOption {
  code: LanguageCode;
  label: string;
  nativeName: string;
  flag: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: 'en', label: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'hi', label: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'bn', label: 'Bengali', nativeName: 'বাংলা', flag: '🇮🇳' },
  { code: 'ta', label: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
  { code: 'te', label: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' },
];

export const TRANSLATIONS: Record<LanguageCode, Record<string, string>> = {
  en: {
    // Nav
    'nav.destinations': 'Destinations',
    'nav.stays': 'Book Stays',
    'nav.states': 'All States',
    'nav.planner': 'Smart Planner',
    'nav.costCalculator': 'Cost Calculator',
    'nav.culture': 'Culture & Food',
    'nav.trails': 'Trails',
    'nav.saved': 'Saved',
    'nav.planCustomTrip': 'Plan Custom Trip',
    
    // Hero
    'hero.badge': 'Authentic Cultural, Heritage & Stays Discovery Platform',
    'hero.headlinePart1': 'Discover 5,000 Years of Timeless',
    'hero.headlineHighlight': 'Indian Heritage',
    'hero.headlinePart2': '& Living Culture',
    'hero.subtitle': 'Explore India’s living heritage — from ancient temples and royal palaces to authentic regional food, verified stays, and smart day-by-day itineraries across all 28 states.',
    'hero.exploreBtn': 'Explore Destinations',
    'hero.plannerBtn': 'Smart Itinerary Planner',
    'hero.popularSearches': 'Popular Searches:',
    'hero.searchPlaceholder': 'Search places, cities, districts, states, or 6-digit PIN codes (e.g. 282001, Taj Mahal, Kerala)...',

    // Sections
    'section.exploreLocation': 'Explore Location:',
    'section.destinationsTitle': 'Explore Indian Heritage Destinations',
    'section.destinationsSubtitle': 'Filter through UNESCO world heritage sites, monumental dynasties, sacred rivers, and cultural sanctuaries across all zones of India.',
    'section.staysTitle': 'Search & Book Stays Near Indian Heritage Sites',
    'section.staysSubtitle': 'From regal palace suites and boutique heritage havelis to eco-resorts and social hostels. With verified review scores, real distance to landmarks, and transparent pricing.',
    'section.statesTitle': 'Discover India State by State',
    'section.statesSubtitle': 'Explore the capitals, folk traditions, GI-tagged handicrafts, classical dances, and monumental treasures across every state and union territory.',
    'section.plannerTitle': 'Curate Your Personalized Heritage Journey',
    'section.plannerSubtitle': 'Select your destination, duration, pace, and passions. Our engine structures a verified day-by-day plan with budget estimates, transport tips, and cultural etiquette.',
    'section.cultureTitle': 'Flavors, Festivals & Classical Arts',
    'section.cultureSubtitle': 'Beyond stone monuments, India’s true spirit lives in its generational recipes, sacred festival calendars, and millennia-old performing arts.',
    'section.trailsTitle': 'Signature Heritage Exploration Trails',
    'section.trailsSubtitle': 'Multi-destination thematic circuits harmonizing monuments, high-altitude passes, sacred waters, and ancient craft emporiums.',
    'section.guideTitle': 'Practical Guide for Cultural Travelers',
    'section.guideSubtitle': 'Everything you need to navigate visa processes, high-speed rail networks, seasonal weather patterns, and respectful heritage protocols.',

    // Stays & Map
    'stays.whereGoing': 'Where are you going?',
    'stays.checkIn': 'Check-in',
    'stays.checkOut': 'Check-out',
    'stays.guestsRooms': 'Guests & Rooms',
    'stays.seeRooms': 'See Rooms & Availability →',
    'stays.reserveRoom': 'Reserve Room →',
    'stays.startingFrom': 'Starting from',
    'stays.reviews': 'reviews',
    'stays.compare': 'Compare',
    'stays.allStays': 'All Stays',
    'stays.palaces': 'Royal Palaces',
    'stays.resorts': 'Resorts',
    'stays.hotels': 'Boutique Hotels',
    'stays.hostels': 'Hostels',
    'map.allPlaces': 'All Places',
    'map.heritage': 'Heritage & Sights',
    'map.food': 'Local Food & Cafes',
    'map.stays': 'Stays & Hotels',
    'map.transit': 'Transit & Rail',
    'map.services': 'Public Services',
    'map.recenter': 'Recenter View',

    // Common Buttons & Labels
    'btn.explorePlace': 'Explore Place & Map',
    'btn.planItinerary': 'Plan Itinerary',
    'btn.viewRooms': 'See Rooms & Availability →',
    'btn.reserveRoom': 'Reserve Room →',
    'btn.search': 'Search',
    'btn.resetFilters': 'Reset Filters',
    'btn.compareHotels': 'Compare Hotels',
    'label.freeCancellation': 'Free Cancellation',
    'label.breakfastIncluded': 'Breakfast Included',
    'label.recommended': 'Recommended',
    'label.startingFrom': 'Starting from',
    'label.perNight': '/ night',
  },

  hi: {
    // Nav
    'nav.destinations': 'पर्यटन स्थल',
    'nav.stays': 'होटल और आवास',
    'nav.states': 'सभी राज्य',
    'nav.planner': 'यात्रा योजना',
    'nav.costCalculator': 'लागत कैलकुलेटर',
    'nav.culture': 'संस्कृति एवं व्यंजन',
    'nav.trails': 'विरासत परिपथ',
    'nav.saved': 'सहेजे गए',
    'nav.planCustomTrip': 'कस्टम यात्रा योजना',

    // Hero
    'hero.badge': 'प्रमाणिक भारतीय सांस्कृतिक एवं विरासत खोज मंच',
    'hero.headlinePart1': 'अनुभव करें 5,000 वर्षों की अमर',
    'hero.headlineHighlight': 'भारतीय विरासत',
    'hero.headlinePart2': 'और जीवंत संस्कृति',
    'hero.subtitle': 'भारत की जीवंत विरासत का अन्वेषण करें — प्राचीन मंदिरों और शाही महलों से लेकर प्रामाणिक व्यंजनों, हेरिटेज होटलों और 28 राज्यों की स्मार्ट यात्रा योजनाओं तक।',
    'hero.exploreBtn': 'स्थल खोजें',
    'hero.plannerBtn': 'स्मार्ट यात्रा योजना',
    'hero.popularSearches': 'लोकप्रिय खोज:',
    'hero.searchPlaceholder': 'स्थल, शहर, जिला, राज्य या 6-अंकीय पिन कोड खोजें (उदा. 282001, ताजमहल, केरल)...',

    // Sections
    'section.exploreLocation': 'स्थान चुनें:',
    'section.destinationsTitle': 'भारतीय विरासत स्थलों का अन्वेषण करें',
    'section.destinationsSubtitle': 'भारत के सभी क्षेत्रों में यूनेस्को विश्व धरोहर स्थलों, ऐतिहासिक साम्राज्यों और पवित्र तीर्थों की खोज करें।',
    'section.staysTitle': 'विरासत स्थलों के निकट होटल और आवास खोजें',
    'section.staysSubtitle': 'शाही महलों, बुटीक हवेलियों, पर्यावरण अनुकूल रिसॉर्ट्स और हॉस्टलों में पारदर्शी मूल्यों पर ठहरें।',
    'section.statesTitle': 'राज्यवार भारत की विविधता जानें',
    'section.statesSubtitle': 'सभी 28 राज्यों और 8 केंद्र शासित प्रदेशों की राजधानियाँ, लोक नृत्य, जीआई हस्तशिल्प और ऐतिहासिक धरोहरों को जानें।',
    'section.plannerTitle': 'अपनी व्यक्तिगत विरासत यात्रा की योजना बनाएं',
    'section.plannerSubtitle': 'गंतव्य, दिन और अपनी पसंद चुनें। हमारा इंजन सटीक दैनिक योजना, बजट अनुमान और सांस्कृतिक नियम प्रदान करता है।',
    'section.cultureTitle': 'स्वाद, पावन त्यौहार और शास्त्रीय कलाएं',
    'section.cultureSubtitle': 'पत्थर के स्मारकों से परे, भारत की आत्मा पारंपरिक व्यंजनों, उत्सवों और सदियों पुरानी कलाओं में बसती है।',
    'section.trailsTitle': 'प्रमुख भारतीय विरासत परिपथ',
    'section.trailsSubtitle': 'स्मारकों, पर्वतीय दर्रों, पवित्र नदियों और शिल्प केंद्रों को जोड़ने वाले बहु-दिवसीय थीम आधारित परिपथ।',
    'section.guideTitle': 'सांस्कृतिक यात्रियों के लिए उपयोगी मार्गदर्शिका',
    'section.guideSubtitle': 'ई-वीज़ा, वंदे भारत ट्रेन कनेक्टिविटी, मौसम चक्र और मंदिर मर्यादा से जुड़ी आवश्यक जानकारी।',

    // Stays & Map
    'stays.whereGoing': 'आप कहाँ जाना चाहते हैं?',
    'stays.checkIn': 'आगमन तिथि',
    'stays.checkOut': 'प्रस्थान तिथि',
    'stays.guestsRooms': 'अतिथि एवं कमरे',
    'stays.seeRooms': 'कमरे और उपलब्धता देखें →',
    'stays.reserveRoom': 'कमरा बुक करें →',
    'stays.startingFrom': 'प्रारंभिक मूल्य',
    'stays.reviews': 'समीक्षाएं',
    'stays.compare': 'तुलना करें',
    'stays.allStays': 'सभी आवास',
    'stays.palaces': 'शाही महल',
    'stays.resorts': 'रिसॉर्ट्स',
    'stays.hotels': 'बुटीक होटल',
    'stays.hostels': 'हॉस्टल्स',
    'map.allPlaces': 'सभी स्थान',
    'map.heritage': 'धरोहर एवं स्मारक',
    'map.food': 'स्थानीय व्यंजन व कैफे',
    'map.stays': 'होटल और आवास',
    'map.transit': 'रेलवे व परिवहन',
    'map.services': 'आपातकालीन सेवाएं',
    'map.recenter': 'मानचित्र रीसेट',

    // Common Buttons & Labels
    'btn.explorePlace': 'स्थल और मानचित्र देखें',
    'btn.planItinerary': 'यात्रा योजना बनाएं',
    'btn.viewRooms': 'कमरे और उपलब्धता देखें →',
    'btn.reserveRoom': 'कमरा बुक करें →',
    'btn.search': 'खोजें',
    'btn.resetFilters': 'फ़िल्टर रीसेट करें',
    'btn.compareHotels': 'होटलों की तुलना करें',
    'label.freeCancellation': 'मुफ्त रद्दीकरण',
    'label.breakfastIncluded': 'नाश्ता शामिल',
    'label.recommended': 'अनुशंसित',
    'label.startingFrom': 'प्रारंभिक मूल्य',
    'label.perNight': '/ रात',
  },

  bn: {
    // Nav
    'nav.destinations': 'গন্তব্যসমূহ',
    'nav.stays': 'হোটেল ও বুকিং',
    'nav.states': 'সকল রাজ্য',
    'nav.planner': 'ভ্রমণ পরিকল্পনা',
    'nav.costCalculator': 'খরচ ক্যালকুলেটর',
    'nav.culture': 'সংস্কৃতি ও খাবার',
    'nav.trails': 'ঐতিহ্য ট্রেইল',
    'nav.saved': 'সংরক্ষিত',
    'nav.planCustomTrip': 'কাস্টম ট্রিপ প্ল্যান',

    // Hero
    'hero.badge': 'ভারতের ঐতিহ্য ও সংস্কৃতি আবিষ্কারের প্ল্যাটফর্ম',
    'hero.headlinePart1': 'আবিষ্কার করুন ৫,০০০ বছরের কালজয়ী',
    'hero.headlineHighlight': 'ভারতীয় ঐতিহ্য',
    'hero.headlinePart2': 'ও জীবন্ত সংস্কৃতি',
    'hero.subtitle': 'ভারতের জীবন্ত ঐতিহ্য আবিষ্কার করুন — প্রাচীন মন্দির ও রাজপ্রাসাদ থেকে শুরু করে আঞ্চলিক খাবার, বিশ্বস্ত হোটেল এবং ২৮টি রাজ্যের দৈনিক ভ্রমণ পরিকল্পনা।',
    'hero.exploreBtn': 'গন্তব্য দেখুন',
    'hero.plannerBtn': 'স্মার্ট ভ্রমণ প্ল্যানার',
    'hero.popularSearches': 'জনপ্রিয় অনুসন্ধান:',
    'hero.searchPlaceholder': 'স্থান, শহর, জেলা, রাজ্য বা ৬ সংখ্যার পিন কোড খুঁজুন (যেমন ২৮২০০১, তাজমহল)...',

    // Sections
    'section.exploreLocation': 'স্থান অন্বেষণ:',
    'section.destinationsTitle': 'ভারতের ঐতিহ্যবাহী গন্তব্য অন্বেষণ করুন',
    'section.destinationsSubtitle': 'ইউনেস্কো বিশ্ব ঐতিহ্যবাহী স্থান ও প্রাচীন স্থাপত্যের সমৃদ্ধ ইতিহাস জানুন।',
    'section.staysTitle': 'ঐতিহাসিক স্থানের কাছে সেরা হোটেল ও রিসর্ট খুঁজুন',
    'section.staysSubtitle': 'ঐতিহ্যবাহী প্রাসাদ, বুটিক হাভেলি ও বাজেট হোস্টেলে থাকার নিখুঁত ব্যবস্থা।',
    'section.statesTitle': 'রাজ্যভিত্তিক ভারতীয় সংস্কৃতি',
    'section.statesSubtitle': '২৮টি রাজ্য ও ৮টি কেন্দ্রশাসিত অঞ্চলের লোকনৃত্য, হস্তশিল্প ও স্থাপত্য।',
    'section.plannerTitle': 'আপনার কাস্টম ট্যুর তৈরি করুন',
    'section.plannerSubtitle': 'দিন ও পছন্দ নির্বাচন করে দিনভিত্তিক নির্ভুল পরিকল্পনা ও খরচের হিসাব পান।',
    'section.cultureTitle': 'ঐতিহ্যবাহী স্বাদ, উৎসব ও শাস্ত্রীয় শিল্পকলা',
    'section.cultureSubtitle': 'প্রাচীন রেসিপি, রঙিন উৎসব ও ভারতীয় শাস্ত্রীয় নৃত্যের এক অনন্য সমাহার।',
    'section.trailsTitle': 'ঐতিহাসিক ভ্রমণ পরিপথ',
    'section.trailsSubtitle': 'ভারতের সেরা স্থাপত্য ও প্রাকৃতিক সৌন্দর্যের ধারাবাহিক ভ্রমণ পথ।',
    'section.guideTitle': 'ভ্রমণকারীদের জন্য প্রয়োজনীয় নির্দেশিকা',
    'section.guideSubtitle': 'ভিসা, ট্রেন সংযোগ, আবহাওয়া ও স্থানীয় শিষ্টাচার সংক্রান্ত তথ্য।',

    // Stays & Map
    'stays.whereGoing': 'কোথায় যেতে চান?',
    'stays.checkIn': 'চেক-ইন তারিখ',
    'stays.checkOut': 'চেক-আউট তারিখ',
    'stays.guestsRooms': 'অতিথি ও রুম',
    'stays.seeRooms': 'রুম ও প্রাপ্যতা দেখুন →',
    'stays.reserveRoom': 'রুম বুক করুন →',
    'stays.startingFrom': 'শুরু হচ্ছে',
    'stays.reviews': 'রিভিউ',
    'stays.compare': 'তুলনা',
    'stays.allStays': 'সকল বাসস্থান',
    'stays.palaces': 'রাজকীয় প্রাসাদ',
    'stays.resorts': 'রিসর্ট',
    'stays.hotels': 'বুটিক হোটেল',
    'stays.hostels': 'হোস্টেল',
    'map.allPlaces': 'সকল স্থান',
    'map.heritage': 'ঐতিহ্য ও দর্শনীয় স্থান',
    'map.food': 'স্থানীয় খাবার ও ক্যাফে',
    'map.stays': 'হোটেল ও থাকার ব্যবস্থা',
    'map.transit': 'রেল ও পরিবহন',
    'map.services': 'জরুরী পরিষেবা',
    'map.recenter': 'রিসেন্টার ম্যাপ',

    // Common Buttons & Labels
    'btn.explorePlace': 'স্থান ও মানচিত্র দেখুন',
    'btn.planItinerary': 'পরিকল্পনা তৈরি করুন',
    'btn.viewRooms': 'রুম ও প্রাপ্যতা দেখুন →',
    'btn.reserveRoom': 'রুম বুক করুন →',
    'btn.search': 'খুঁজুন',
    'btn.resetFilters': 'ফিল্টার রিসেট',
    'btn.compareHotels': 'হোটেল তুলনা করুন',
    'label.freeCancellation': 'বিনামূল্যে বাতিল',
    'label.breakfastIncluded': 'সকালের নাস্তা অন্তর্ভুক্ত',
    'label.recommended': 'প্রস্তাবিত',
    'label.startingFrom': 'শুরু হচ্ছে',
    'label.perNight': '/ রাত',
  },

  ta: {
    // Nav
    'nav.destinations': 'சுற்றுலா தலங்கள்',
    'nav.stays': 'தங்குமிடங்கள்',
    'nav.states': 'அனைத்து மாநிலங்கள்',
    'nav.planner': 'பயணத் திட்டம்',
    'nav.costCalculator': 'செலவு கணக்கீடு',
    'nav.culture': 'கலாச்சாரம் & உணவு',
    'nav.trails': 'பாரம்பரிய சுற்றுகள்',
    'nav.saved': 'சேமிப்பு',
    'nav.planCustomTrip': 'தனிப்பயன் பயணம்',

    // Hero
    'hero.badge': 'இந்திய கலாச்சாரம் மற்றும் பாரம்பரிய தளங்கள்',
    'hero.headlinePart1': '5,000 ஆண்டுகால அழியாத',
    'hero.headlineHighlight': 'இந்திய பாரம்பரியம்',
    'hero.headlinePart2': 'மற்றும் கலாச்சாரத்தை அறியுங்கள்',
    'hero.subtitle': 'இந்தியாவின் பாரம்பரியத்தை அறியுங்கள் — பழங்கால கோவில்கள், அரண்மனைகள், பாரம்பரிய உணவுகள், தங்குமிடங்கள் மற்றும் 28 மாநிலங்களுக்கான பயணத் திட்டங்கள்.',
    'hero.exploreBtn': 'தலங்களை ஆராயுங்கள்',
    'hero.plannerBtn': 'பயணத் திட்டமிடுபவர்',
    'hero.popularSearches': 'பிரபலமான தேடல்கள்:',
    'hero.searchPlaceholder': 'இடம், நகரம், மாவட்டம், மாநிலம் அல்லது அஞ்சல் குறியீட்டைத் தேடுங்கள்...',

    // Sections
    'section.exploreLocation': 'இடத்தை தேர்வு செய்க:',
    'section.destinationsTitle': 'இந்திய பாரம்பரிய தலங்களை ஆராயுங்கள்',
    'section.destinationsSubtitle': 'யுனெஸ்கோ பாரம்பரிய சின்னங்கள், மன்னர் கால கட்டிடக்கலை மற்றும் புனித தலங்கள்.',
    'section.staysTitle': 'பாரம்பரிய தலங்களுக்கு அருகில் தங்குமிடங்கள்',
    'section.staysSubtitle': 'அரண்மனை தங்குமிடங்கள், விடுதிகள் மற்றும் ஹோட்டல்களை எளிதாக முன்பதிவு செய்யுங்கள்.',
    'section.statesTitle': 'மாநில வாரியாக இந்திய கலாச்சாரம்',
    'section.statesSubtitle': '28 மாநிலங்கள் மற்றும் 8 யூனியன் பிரதேசங்களின் நடனங்கள், கைவினைப் பொருட்கள்.',
    'section.plannerTitle': 'உங்கள் தனிப்பயனாக்கப்பட்ட பயணத்தை உருவாக்குங்கள்',
    'section.plannerSubtitle': 'நாட்கள் மற்றும் ஆர்வங்களை தேர்வு செய்து தினசரி பயண அட்டவணையை பெறுங்கள்.',
    'section.cultureTitle': 'பாரம்பரிய சுவைகள், திருவிழாக்கள் & கலைகள்',
    'section.cultureSubtitle': 'பாரம்பரிய உணவு வகைகள், பண்டிகைகள் மற்றும் பரதநாட்டியம் போன்ற கலைகள்.',
    'section.trailsTitle': 'சிறப்பு பாரம்பரிய பயண சுற்றுகள்',
    'section.trailsSubtitle': 'கோவில்கள், மலைகள் மற்றும் வரலாற்று தலங்களை இணைக்கும் பயண வழித்தடங்கள்.',
    'section.guideTitle': 'பயணிகளுக்கான நடைமுறை வழிகாட்டி',
    'section.guideSubtitle': 'ரயில் போக்குவரத்து, வானிலை மற்றும் பயண ஆலோசனைகள்.',

    // Stays & Map
    'stays.whereGoing': 'எங்கு செல்ல விரும்புகிறீர்கள்?',
    'stays.checkIn': 'வருகை தேதி',
    'stays.checkOut': 'வெளியேறும் தேதி',
    'stays.guestsRooms': 'விருந்தினர்கள் & அறைகள்',
    'stays.seeRooms': 'அறைகளை காண்க →',
    'stays.reserveRoom': 'அறை முன்பதிவு →',
    'stays.startingFrom': 'தொடக்க விலை',
    'stays.reviews': 'மதிப்புரைகள்',
    'stays.compare': 'ஒப்பிடுக',
    'stays.allStays': 'அனைத்து தங்குமிடங்கள்',
    'stays.palaces': 'அரண்மனைகள்',
    'stays.resorts': 'ரிசார்ட்ஸ்',
    'stays.hotels': 'ஹோட்டல்கள்',
    'stays.hostels': 'விடுதிகள்',
    'map.allPlaces': 'அனைத்து இடங்கள்',
    'map.heritage': 'பாரம்பரியம் & தலங்கள்',
    'map.food': 'உணவகங்கள் & கஃபே',
    'map.stays': 'ஹோட்டல்கள் & தங்குமிடம்',
    'map.transit': 'ரயில் & போக்குவரத்து',
    'map.services': 'அவசர சேவைகள்',
    'map.recenter': 'மறுசீரமை',

    // Common Buttons & Labels
    'btn.explorePlace': 'இடத்தை காண்க',
    'btn.planItinerary': 'பயணத்தை திட்டமிடு',
    'btn.viewRooms': 'அறைகளை காண்க →',
    'btn.reserveRoom': 'அறை முன்பதிவு →',
    'btn.search': 'தேடு',
    'btn.resetFilters': 'வடிப்பானை மீட்டமை',
    'btn.compareHotels': 'ஒப்பிடுக',
    'label.freeCancellation': 'இலவச ரத்து',
    'label.breakfastIncluded': 'காலை உணவு உண்டு',
    'label.recommended': 'பரிந்துரைக்கப்படுகிறது',
    'label.startingFrom': 'தொடக்கம்',
    'label.perNight': '/ இரவு',
  },

  te: {
    // Nav
    'nav.destinations': 'పర్యాటక ప్రదేశాలు',
    'nav.stays': 'హోటళ్లు & బస',
    'nav.states': 'అన్ని రాష్ట్రాలు',
    'nav.planner': 'ట్రిప్ ప్లానర్',
    'nav.costCalculator': 'ఖర్చు కాలిక్యులేటర్',
    'nav.culture': 'సంస్కృతి & ఆహారం',
    'nav.trails': 'హెరిటేజ్ మార్గాలు',
    'nav.saved': 'సేవ్ చేసినవి',
    'nav.planCustomTrip': 'కస్టమ్ ట్రిప్ ప్లాన్',

    // Hero
    'hero.badge': 'భారతీయ వారసత్వ మరియు సాంస్కృతిక వేదిక',
    'hero.headlinePart1': '5,000 సంవత్సరాల నిత్య నూతన',
    'hero.headlineHighlight': 'భారతీయ వారసత్వాన్ని',
    'hero.headlinePart2': 'మరియు సంస్కృతిని అన్వేషించండి',
    'hero.subtitle': 'భారతదేశ వారసత్వాన్ని అన్వేషించండి — పురాతన దేవాలయాలు, రాజభవనాలు, సాంప్రదాయ రుచులు, హోటళ్లు మరియు 28 రాష్ట్రాల సమగ్ర ప్రయాణ ప్రణాళికలు.',
    'hero.exploreBtn': 'ప్రదేశాలను చూడండి',
    'hero.plannerBtn': 'స్మార్ట్ ట్రిప్ ప్లానర్',
    'hero.popularSearches': 'ప్రసిద్ధ శోధనలు:',
    'hero.searchPlaceholder': 'ప్రదేశం, నగరం, జిల్లా, రాష్ట్రం లేదా పిన్ కోడ్‌ను శోధించండి...',

    // Sections
    'section.exploreLocation': 'ప్రదేశం ఎంచుకోండి:',
    'section.destinationsTitle': 'భారతీయ వారసత్వ ప్రదేశాల అన్వేషణ',
    'section.destinationsSubtitle': 'భారతదేశం అంతటా యునెస్కో ప్రపంచ వారసత్వ ప్రదేశాలు మరియు పవిత్ర క్షేత్రాలను చూడండి.',
    'section.staysTitle': 'చారిత్రక ప్రదేశాల సమీపంలో హోటళ్లు & బసలు',
    'section.staysSubtitle': 'రాజభవనాలు, హెరిటేజ్ హోటళ్ళు మరియు రిసార్టులలో బస సౌకర్యం.',
    'section.statesTitle': 'రాష్ట్రాల వారీగా భారతీయ సంస్కృతి',
    'section.statesSubtitle': '28 రాష్ట్రాలు, 8 కేంద్రపాలిత ప్రాంతాల నృత్యాలు, చేతివృత్తులు మరియు రాజధానులు.',
    'section.plannerTitle': 'మీ అనుకూల పర్యటన ప్రణాళికను సిద్ధం చేసుకోండి',
    'section.plannerSubtitle': 'రోజుల సంఖ్య మరియు ఆసక్తులను ఎంచుకుని ఖచ్చితమైన రోజువారీ షెడ్యూల్‌ను పొందండి.',
    'section.cultureTitle': 'రుచులు, పండుగలు & సంప్రదాయ కళలు',
    'section.cultureSubtitle': 'ప్రాచీన వంటకాలు, పవిత్ర పండుగలు మరియు శాస్త్రీయ నృత్యాల విశేషాలు.',
    'section.trailsTitle': 'ప్రత్యేక వారసత్వ పర్యటన మార్గాలు',
    'section.trailsSubtitle': 'దేవాలయాలు, కోటలు మరియు సుందర నగరాలను కలిపే పర్యాటక సర్క్యూట్లు.',
    'section.guideTitle': 'పర్యాటకులకు ఆచరణాత్మక మార్గదర్శిని',
    'section.guideSubtitle': 'రైలు ప్రయాణం, వీసా, వాతావరణం మరియు స్థానిక మర్యాదల వివరాలు.',

    // Stays & Map
    'stays.whereGoing': 'మీరు ఎక్కడికి వెళ్లాలనుకుంటున్నారు?',
    'stays.checkIn': 'చెక్-ఇన్ తేదీ',
    'stays.checkOut': 'చెక్-అవుట్ తేదీ',
    'stays.guestsRooms': 'అతిథులు & గదులు',
    'stays.seeRooms': 'రూములు చూడండి →',
    'stays.reserveRoom': 'రూమ్ బుక్ చేయండి →',
    'stays.startingFrom': 'ప్రారంభ ధర',
    'stays.reviews': 'సమీక్షలు',
    'stays.compare': 'పోల్చండి',
    'stays.allStays': 'అన్ని బసలు',
    'stays.palaces': 'రాజభవనాలు',
    'stays.resorts': 'రిసార్ట్‌లు',
    'stays.hotels': 'బొటిక్ హోటళ్ళు',
    'stays.hostels': 'హాస్టల్స్',
    'map.allPlaces': 'అన్ని ప్రదేశాలు',
    'map.heritage': 'వారసత్వ ప్రదేశాలు',
    'map.food': 'రెస్టారెంట్లు & ఆహారం',
    'map.stays': 'హోటళ్లు & బసలు',
    'map.transit': 'రైలు & రవాణా',
    'map.services': 'అత్యవసర సేవలు',
    'map.recenter': 'మ్యాప్ రీసెట్',

    // Common Buttons & Labels
    'btn.explorePlace': 'ప్రదేశం & మ్యాప్ చూడండి',
    'btn.planItinerary': 'ప్లాన్ చేయండి',
    'btn.viewRooms': 'రూములు చూడండి →',
    'btn.reserveRoom': 'రూమ్ బుక్ చేయండి →',
    'btn.search': 'శోధించండి',
    'btn.resetFilters': 'ఫిల్టర్లు రీసెట్',
    'btn.compareHotels': 'హోటళ్లను పోల్చండి',
    'label.freeCancellation': 'ఉచిత రద్దు',
    'label.breakfastIncluded': 'అల్పాహారం ఉచితం',
    'label.recommended': 'సిఫార్సు చేయబడినవి',
    'label.startingFrom': 'ప్రారంభ ధర',
    'label.perNight': '/ రాత్రి',
  },
};

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string, fallback?: string) => string;
  currentLanguageOption: LanguageOption;
  availableLanguages: LanguageOption[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANG_STORAGE_KEY = 'bharatveda_language_v1';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    try {
      const saved = localStorage.getItem(LANG_STORAGE_KEY) as LanguageCode;
      if (saved && TRANSLATIONS[saved]) return saved;
      return 'en';
    } catch {
      return 'en';
    }
  });

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(LANG_STORAGE_KEY, lang);
    } catch (e) {
      console.error('Failed to save language choice:', e);
    }
  };

  const t = (key: string, fallback = ''): string => {
    const dict = TRANSLATIONS[language] || TRANSLATIONS.en;
    if (dict[key]) return dict[key];
    if (TRANSLATIONS.en[key]) return TRANSLATIONS.en[key];
    return fallback || key;
  };

  const currentLanguageOption =
    LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        currentLanguageOption,
        availableLanguages: LANGUAGES,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
