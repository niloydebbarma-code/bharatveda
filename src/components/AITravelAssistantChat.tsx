import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import {
  X,
  Send,
  Sparkles,
  Loader2,
  Trash2
} from 'lucide-react';
import { AIChatMessage, AIChatResponse } from '../types';
import { api } from '../services/api';
import { useLanguage } from '../context/LanguageContext';

interface AITravelAssistantChatProps {
  onSelectDestination?: (destId: string) => void;
  onOpenInquiry?: (destinationName?: string) => void;
}

const CHAT_COPY = {
  en: {
    live: 'Live',
    subtitle: 'Indian Heritage & Stays Assistant',
    welcome: 'Namaste! I am **VedaGuide**, your interactive Indian Heritage & Travel AI Assistant. 🇮🇳\n\nAsk me anything about monuments, verified hotels, regional food, train routes, or customized day-by-day itineraries!',
    clear: 'Clear conversation',
    loading: 'VedaGuide is analyzing travel knowledge...',
    matching: 'Matching Stays & Sights:',
    placeholder: 'Ask about hotels, food, trains, itineraries...',
    pills: ['Hotels near Taj Mahal under ₹5,000', 'Varanasi Ghat Aarti Timings', 'How to reach Hampi by Train', 'Estimate 3-Day Jaipur Budget'],
    refreshed: 'Chat session refreshed. How can I assist your India heritage travel plans?',
  },
  hi: {
    live: 'सक्रिय',
    subtitle: 'भारतीय विरासत और ठहरने का सहायक',
    welcome: 'नमस्ते! मैं **वेदागाइड**, आपका भारतीय विरासत और यात्रा AI सहायक हूँ। 🇮🇳\n\nस्मारकों, सत्यापित होटलों, क्षेत्रीय भोजन, ट्रेन मार्गों या यात्रा योजनाओं के बारे में पूछें!',
    clear: 'बातचीत साफ़ करें',
    loading: 'वेदागाइड यात्रा जानकारी देख रहा है...',
    matching: 'मिलते-जुलते ठहरने और दर्शनीय स्थल:',
    placeholder: 'होटल, भोजन, ट्रेन या यात्रा योजना पूछें...',
    pills: ['ताजमहल के पास होटल', 'वाराणसी गंगा आरती का समय', 'ट्रेन से हम्पी कैसे जाएँ', 'जयपुर यात्रा बजट'],
    refreshed: 'बातचीत नई हो गई। आपकी भारत यात्रा में कैसे सहायता करूँ?',
  },
  bn: {
    live: 'সক্রিয়',
    subtitle: 'ভারতীয় ঐতিহ্য ও থাকার সহায়ক',
    welcome: 'নমস্কার! আমি **বেদাগাইড**, আপনার ভারতীয় ঐতিহ্য ও ভ্রমণ AI সহায়ক। 🇮🇳\n\nস্মৃতিসৌধ, যাচাইকৃত হোটেল, আঞ্চলিক খাবার, ট্রেনের পথ বা ভ্রমণ পরিকল্পনা সম্পর্কে জিজ্ঞাসা করুন!',
    clear: 'কথোপকথন মুছুন',
    loading: 'বেদাগাইড ভ্রমণ তথ্য বিশ্লেষণ করছে...',
    matching: 'মিলছে এমন থাকার জায়গা ও দর্শনীয় স্থান:',
    placeholder: 'হোটেল, খাবার, ট্রেন বা ভ্রমণ পরিকল্পনা জিজ্ঞাসা করুন...',
    pills: ['তাজমহলের কাছে হোটেল', 'বারাণসী গঙ্গা আরতির সময়', 'ট্রেনে হামপি যাওয়ার পথ', 'জয়পুর ভ্রমণ বাজেট'],
    refreshed: 'কথোপকথন নতুন হয়েছে। ভারত ভ্রমণে কীভাবে সাহায্য করতে পারি?',
  },
  ta: {
    live: 'நேரலை',
    subtitle: 'இந்திய பாரம்பரியம் மற்றும் தங்குமிட உதவியாளர்',
    welcome: 'வணக்கம்! நான் **வேதாகைடு**, உங்கள் இந்திய பாரம்பரிய மற்றும் பயண AI உதவியாளர். 🇮🇳\n\nநினைவுச் சின்னங்கள், சரிபார்க்கப்பட்ட ஹோட்டல்கள், பிராந்திய உணவு, ரயில் வழிகள் அல்லது பயணத் திட்டங்கள் பற்றி கேளுங்கள்!',
    clear: 'உரையாடலை அழிக்கவும்',
    loading: 'வேதாகைடு பயணத் தகவலை ஆய்வு செய்கிறது...',
    matching: 'பொருந்தும் தங்குமிடங்கள் மற்றும் இடங்கள்:',
    placeholder: 'ஹோட்டல், உணவு, ரயில் அல்லது பயணத் திட்டம் பற்றி கேளுங்கள்...',
    pills: ['தாஜ்மஹால் அருகிலுள்ள ஹோட்டல்கள்', 'வாரணாசி கங்கை ஆரத்தி நேரம்', 'ரயிலில் ஹம்பி செல்வது எப்படி', 'ஜெய்ப்பூர் பயண பட்ஜெட்'],
    refreshed: 'உரையாடல் புதுப்பிக்கப்பட்டது. உங்கள் இந்தியப் பயணத்திற்கு எவ்வாறு உதவலாம்?',
  },
  te: {
    live: 'ప్రత్యక్షం',
    subtitle: 'భారతీయ వారసత్వం మరియు బస సహాయకుడు',
    welcome: 'నమస్తే! నేను **వేదాగైడ్**, మీ భారతీయ వారసత్వం మరియు ప్రయాణ AI సహాయకుడిని. 🇮🇳\n\nస్మారక చిహ్నాలు, ధృవీకరించిన హోటళ్లు, ప్రాంతీయ ఆహారం, రైలు మార్గాలు లేదా ప్రయాణ ప్రణాళికల గురించి అడగండి!',
    clear: 'సంభాషణను తొలగించండి',
    loading: 'వేదాగైడ్ ప్రయాణ సమాచారాన్ని విశ్లేషిస్తోంది...',
    matching: 'సరిపోలే బసలు మరియు ప్రదేశాలు:',
    placeholder: 'హోటళ్లు, ఆహారం, రైళ్లు లేదా ప్రయాణ ప్రణాళిక గురించి అడగండి...',
    pills: ['తాజ్ మహల్ సమీపంలోని హోటళ్లు', 'వారణాసి గంగా హారతి సమయాలు', 'రైలులో హంపికి ఎలా వెళ్లాలి', 'జైపూర్ ప్రయాణ బడ్జెట్'],
    refreshed: 'సంభాషణ రిఫ్రెష్ అయింది. మీ భారత ప్రయాణానికి ఎలా సహాయపడాలి?',
  },
} as const;

function FormattedMessage({ content }: { content: string }) {
  return (
    <div className="chat-markdown prose prose-sm max-w-none leading-relaxed text-xs sm:text-sm">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSanitize]}
        components={{
          h1: ({ children }) => <h3 className="font-heading font-black text-sm text-primary border-b border-primary/20 pb-1 mb-2">{children}</h3>,
          h2: ({ children }) => <h3 className="font-heading font-black text-sm text-primary border-b border-primary/20 pb-1 mb-2">{children}</h3>,
          h3: ({ children }) => <h3 className="font-heading font-black text-sm text-primary border-b border-primary/20 pb-1 mb-2">{children}</h3>,
          p: ({ children }) => <p className="my-1.5">{children}</p>,
          ul: ({ children }) => <ul className="my-1.5 space-y-1 pl-4 list-disc marker:text-accent">{children}</ul>,
          ol: ({ children }) => <ol className="my-1.5 space-y-1 pl-5 list-decimal marker:text-accent">{children}</ol>,
          li: ({ children }) => <li className="pl-0.5">{children}</li>,
          strong: ({ children }) => <strong className="font-extrabold text-foreground">{children}</strong>,
          em: ({ children }) => <em className="italic text-primary font-semibold">{children}</em>,
          a: ({ children, href }) => <a href={href} target="_blank" rel="noreferrer" className="text-primary underline underline-offset-2">{children}</a>,
          table: ({ children }) => <div className="my-2 overflow-x-auto rounded-lg border border-border"><table className="w-full min-w-max border-collapse text-[11px]">{children}</table></div>,
          thead: ({ children }) => <thead className="bg-primary/10 text-left">{children}</thead>,
          th: ({ children }) => <th className="border-b border-border px-2 py-1.5 font-bold whitespace-nowrap">{children}</th>,
          td: ({ children }) => <td className="border-b border-border px-2 py-1.5 align-top">{children}</td>,
          blockquote: ({ children }) => <blockquote className="my-2 border-l-2 border-primary pl-3 text-foreground/80">{children}</blockquote>,
          code: ({ children, className }) => <code className={`${className ? 'block overflow-x-auto rounded-lg bg-foreground/5 p-2' : 'rounded bg-foreground/5 px-1'} text-[11px]`}>{children}</code>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

export function AITravelAssistantChat({
  onSelectDestination,
  onOpenInquiry,
}: AITravelAssistantChatProps) {
  const { language } = useLanguage();
  const copy = CHAT_COPY[language];
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<AIChatMessage[]>([
    {
      role: 'assistant',
      content: copy.welcome,
    },
  ]);
  const [suggestedPills, setSuggestedPills] = useState<string[]>([
    ...copy.pills,
  ]);
  const [recommendedEntities, setRecommendedEntities] = useState<AIChatResponse['recommendedEntities']>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ block: 'nearest' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  useEffect(() => {
    setSuggestedPills([...copy.pills]);
    setMessages((currentMessages) => {
      const hasUserMessage = currentMessages.some((message) => message.role === 'user');
      if (hasUserMessage) return currentMessages;
      return [{ role: 'assistant', content: copy.welcome }];
    });
  }, [copy]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || loading) return;

    const newMessages: AIChatMessage[] = [
      ...messages.filter((message) => message.role !== 'system'),
      { role: 'user', content: text },
    ];
    setMessages(newMessages);
    setInputMessage('');
    setLoading(true);

    try {
      const res = await api.sendAIChat(newMessages, language);
      setMessages([...newMessages, { role: 'assistant', content: res.reply }]);
      if (language === 'en' && res.suggestedPills && res.suggestedPills.length > 0) {
        setSuggestedPills(res.suggestedPills);
      } else if (language !== 'en') {
        setSuggestedPills([...copy.pills]);
      }
      setRecommendedEntities(res.recommendedEntities ?? []);
    } catch (err) {
      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          content: err instanceof Error && err.message.includes('live AI assistant')
            ? err.message
            : language === 'ta'
            ? 'மன்னிக்கவும், தற்காலிக இணைப்பு தாமதம் ஏற்பட்டது. மீண்டும் கேளுங்கள் அல்லது கீழே உள்ள தலைப்பைத் தேர்ந்தெடுக்கவும்.'
            : language === 'hi'
              ? 'क्षमा करें, कुछ समय के लिए कनेक्शन में देरी हुई। फिर से पूछें या नीचे दिया गया विषय चुनें।'
              : language === 'bn'
                ? 'দুঃখিত, সাময়িক সংযোগ বিলম্ব হয়েছে। আবার জিজ্ঞাসা করুন অথবা নিচের বিষয় বেছে নিন।'
                : language === 'te'
                  ? 'క్షమించండి, తాత్కాలిక కనెక్షన్ ఆలస్యం జరిగింది. మళ్లీ అడగండి లేదా దిగువ అంశాన్ని ఎంచుకోండి.'
                  : 'I apologize, but I encountered a momentary connectivity delay. Please ask again or select one of the suggested topics below.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        role: 'assistant',
        content: copy.refreshed,
      },
    ]);
    setRecommendedEntities([]);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 px-3.5 py-3 sm:px-4 sm:py-3.5 rounded-full bg-primary text-surface shadow-2xl hover:bg-primary-dark transition-all duration-300 flex items-center gap-2 group hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 border border-surface/20"
          aria-label="Open AI Travel Assistant"
        >
          <div className="relative">
            <Sparkles className="w-5 h-5 text-accent stroke-[2.5]" aria-hidden="true" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent" />
            </span>
          </div>
          <span className="font-heading font-bold text-xs sm:text-sm">
            AI Travel Guide
          </span>
        </button>
      )}

      {/* Floating Chat Window with Mobile Backdrop */}
      {isOpen && (
        <>
          {/* Mobile Backdrop */}
          <div
            className="sm:hidden fixed inset-0 bg-foreground/40 backdrop-blur-xs z-50 animate-fadeIn"
            onClick={() => setIsOpen(false)}
          />

          <div className="fixed inset-x-2 top-2 bottom-2 sm:top-auto sm:inset-x-auto sm:right-6 sm:bottom-6 z-50 w-auto sm:w-[min(420px,calc(100vw-3rem))] h-auto sm:h-[82vh] sm:max-h-[640px] min-h-0 bg-surface rounded-3xl shadow-2xl border border-border flex flex-col overflow-hidden animate-fadeIn">
            
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-primary to-primary-dark text-surface flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-surface/15 flex items-center justify-center text-accent">
                  <Sparkles className="w-5 h-5 stroke-[2.5]" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-heading font-extrabold text-sm text-surface flex items-center gap-1.5 min-w-0 break-words">
                    <span>VedaGuide AI</span>
                    <span className="text-[10px] bg-accent/30 text-surface px-1.5 py-0.2 rounded font-bold uppercase">
                      {copy.live}
                    </span>
                  </h3>
                  <span className="text-[11px] text-surface/80 block">
                    <span className="break-words">                    {copy.subtitle}</span>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleClearChat}
                  className="p-1.5 rounded-lg text-surface/70 hover:text-surface hover:bg-surface/10 transition-colors"
                  title={copy.clear}
                >
                  <Trash2 className="w-4 h-4" aria-hidden="true" />
                </button>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-surface/70 hover:text-surface hover:bg-surface/10 transition-colors"
                  title="Close chat"
                >
                  <X className="w-5 h-5 stroke-[2.5]" aria-hidden="true" />
                </button>
              </div>
            </div>

          {/* Messages Body */}
          <div className="p-4 flex-1 min-h-0 overflow-y-auto space-y-3.5 bg-background text-xs sm:text-sm">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${
                  msg.role === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`p-3.5 rounded-2xl max-w-[88%] leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-primary text-surface rounded-br-xs'
                      : 'bg-surface border border-border text-foreground shadow-xs rounded-bl-xs'
                  }`}
                  style={{ overflowWrap: 'anywhere' }}
                >
                  <FormattedMessage content={msg.content} />
                </div>
              </div>
            ))}

            {/* Recommended Entities Cards in Chat */}
            {recommendedEntities && recommendedEntities.length > 0 && (
              <div className="space-y-2 pt-2 animate-fadeIn">
                <span className="text-[10px] font-bold uppercase tracking-wider text-foreground/60 block">
                  {copy.matching}
                </span>
                <div className="space-y-2">
                  {recommendedEntities.map((ent, eIdx) => (
                    <div
                      key={eIdx}
                      onClick={() => {
                        if (ent.type === 'destination' && onSelectDestination) {
                          onSelectDestination(ent.id);
                          setIsOpen(false);
                        } else if (onOpenInquiry) {
                          onOpenInquiry(ent.title);
                          setIsOpen(false);
                        }
                      }}
                      className="p-2.5 rounded-xl bg-surface border border-border hover:border-primary/50 transition-colors flex items-center justify-between gap-3 text-xs cursor-pointer"
                    >
                      <div>
                        <div className="font-bold text-foreground hover:text-primary transition-colors">{ent.title}</div>
                        <div className="text-[11px] text-foreground/70">{ent.subtitle}</div>
                      </div>
                      {ent.imageUrl && (
                        <img
                          src={ent.imageUrl}
                          alt=""
                          className="w-12 h-10 rounded-lg object-cover flex-shrink-0 order-first"
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      )}
                      {ent.priceOrTag && (
                        <span className="px-2 py-0.5 rounded bg-primary/10 text-primary font-bold text-[10px] flex-shrink-0">
                          {ent.priceOrTag}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {loading && (
              <div className="flex items-center gap-2 text-foreground/60 p-2 text-xs">
                <Loader2 className="w-4 h-4 animate-spin text-primary" aria-hidden="true" />
                <span>{copy.loading}</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestion Pills */}
          <div className="px-3 py-2 bg-surface border-t border-border/80 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {suggestedPills.map((pill, pIdx) => (
              <button
                key={pIdx}
                type="button"
                disabled={loading}
                onClick={() => handleSendMessage(pill)}
                className="px-2.5 py-1 rounded-full bg-background hover:bg-primary/10 hover:text-primary text-foreground/80 border border-border text-[11px] font-medium whitespace-nowrap transition-colors flex-shrink-0 disabled:opacity-50 disabled:cursor-wait"
              >
                {pill}
              </button>
            ))}
          </div>

          {/* Chat Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-surface border-t border-border flex items-center gap-2 min-w-0"
          >
            <input
              type="text"
              placeholder={copy.placeholder}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="min-w-0 flex-1 px-3.5 py-2.5 bg-background border border-border rounded-xl text-foreground text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />

            <button
              type="submit"
              disabled={loading || !inputMessage.trim()}
              className="p-2.5 rounded-xl bg-primary text-surface hover:bg-primary-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
              title="Send message"
            >
              <Send className="w-4 h-4" aria-hidden="true" />
            </button>
          </form>

        </div>
        </>
      )}
    </>
  );
}
