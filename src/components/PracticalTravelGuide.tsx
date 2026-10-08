import { FileText, Sun, Train, ShieldCheck, HeartHandshake, Compass } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function PracticalTravelGuide() {
  const { t } = useLanguage();
  const guideCards = [
    {
      icon: FileText,
      title: 'Visa & Official Entry',
      tag: 'Formalities',
      points: [
        'Electronic Tourist Visa (e-Visa) is available for citizens of over 160 nations via the official portal.',
        'Carry physical and digital copies of your passport with at least 6 months remaining validity.',
        'Special permits (Inner Line Permit / PAP) are required for select border zones like Ladakh and Arunachal Pradesh.',
      ],
    },
    {
      icon: Sun,
      title: 'Climate & Best Seasons',
      tag: 'Weather Matrix',
      points: [
        'October to March: Golden winter window, optimal for North, Central, and South heritage circuits.',
        'April to June: Ideal for high Himalayan circuits (Ladakh, Kashmir, Himachal) and hill retreats.',
        'July to September: Monsoon transforms Western Ghats and Kerala into lush green waterfall landscapes.',
      ],
    },
    {
      icon: Train,
      title: 'High-Speed Rail & Transit',
      tag: 'Connectivity',
      points: [
        'Vande Bharat Express and Shatabdi trains connect key heritage hubs (Delhi-Agra-Jaipur, Chennai-Mysuru).',
        'Book verified rail tickets directly via IRCTC or authorized travel partners well in advance.',
        'Metros and pre-paid electric taxis operate across major gateways including Delhi, Bengaluru, and Kochi.',
      ],
    },
    {
      icon: ShieldCheck,
      title: 'Sanctum & Temple Attire',
      tag: 'Cultural Etiquette',
      points: [
        'Dress modestly when visiting active sacred sanctums (shoulders and knees covered).',
        'Remove footwear at designated shoe stands before stepping onto temple and mosque plinths.',
        'Avoid flash photography inside ancient fresco cave complexes like Ajanta to protect mineral pigments.',
      ],
    },
    {
      icon: HeartHandshake,
      title: 'Responsible Heritage Tourism',
      tag: 'Sustainability',
      points: [
        'Support certified GI-tagged generational artisans and handloom weavers rather than mass replicas.',
        'Carry refillable water flasks to minimize single-use plastics around sensitive ecological zones.',
        'Hire only ASI-licensed government tourist guides wearing official credentials.',
      ],
    },
    {
      icon: Compass,
      title: 'Currency & Digital Payments',
      tag: 'Practical Finance',
      points: [
        'UPI (Unified Payments Interface) is universally accepted across India, even at roadside stalls.',
        'International travelers can access UPI via approved wallet apps at major international airports.',
        'Keep small denominations of Indian Rupee (INR ₹50, ₹100) banknotes for shoe-counter tokens and village craft guilds.',
      ],
    },
  ];

  return (
    <section className="py-20 bg-background border-b border-border">
      <div className="container-custom">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">
            <Compass className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Essential Travel Intelligence</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-foreground tracking-tight mb-4">
            {t('section.guideTitle')}
          </h2>
          <p className="text-base sm:text-lg text-foreground/80 leading-relaxed font-sans">
            {t('section.guideSubtitle')}
          </p>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guideCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="bg-surface rounded-2xl p-6 border border-border shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                      <Icon className="w-5 h-5 stroke-[2]" aria-hidden="true" />
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-background border border-border text-[11px] font-bold uppercase tracking-wider text-foreground/70">
                      {card.tag}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-lg text-foreground mb-3">
                    {card.title}
                  </h3>

                  <ul className="space-y-2.5 text-xs sm:text-sm text-foreground/80">
                    {card.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2">
                        <span className="text-primary font-bold mt-0.5">•</span>
                        <span className="leading-relaxed">{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
