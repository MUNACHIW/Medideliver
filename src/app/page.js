"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

// Standardized Professional Chatbot Component
function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm MediBot, your healthcare delivery assistant. I can help you learn about our services, pricing, and application processes. How can I assist you today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [conversationContext, setConversationContext] = useState({
    messageCount: 0,
    topics: [],
    hasRedirected: false
  });

  // Standardized response system
  const responses = {
    greeting: [
      "Hello! Welcome to MediDeliver. I'm here to help you with information about our healthcare delivery services.",
      "Hi there! I can provide you with details about our medication delivery, caregiver services, and courier opportunities.",
      "Welcome! I'm MediBot and I'm ready to help you learn about MediDeliver's services."
    ],

    services_general: "MediDeliver offers three main services:\n\n🚚 **Medication Delivery** - Fast, secure prescription delivery\n👩‍⚕️ **Caregiver Services** - Professional in-home healthcare\n📦 **Medical Supply Transport** - Equipment and supply delivery\n\nWhich service would you like to know more about?",

    medication_delivery: "Our **Medication Delivery Service** includes:\n\n• Same-day delivery available\n• Temperature-controlled transport\n• Secure handling and verification\n• Direct pharmacy partnerships\n• Insurance coordination assistance\n\nWould you like information about pricing or how to get started?",

    caregiver_services: "Our **Caregiver Services** offer:\n\n• Licensed healthcare professionals\n• Flexible scheduling options\n• Personal care assistance\n• Medication management\n• Meal preparation support\n\nAre you looking for care services or interested in becoming a caregiver?",

    medical_supplies: "Our **Medical Supply Transport** covers:\n\n• Durable medical equipment (DME)\n• Mobility aids and equipment\n• Wound care and diabetic supplies\n• Hospital-to-home transfers\n• Respiratory equipment\n\nWhat type of supplies do you need delivered?",

    pricing_delivery: "**Delivery Pricing:**\n\n• Standard Delivery (4-6 hours): $12-18\n• Express Delivery (1-2 hours): $18-28\n• Emergency Delivery (under 1 hour): $28-45\n\n*Prices vary by distance and location*\n\nMonthly unlimited plans start at $39.99. Would you like details about our subscription options?",

    pricing_caregiver: "**Caregiver Service Rates:**\n\n• Companion Care: $22-28/hour\n• Personal Care: $26-32/hour\n• Skilled Nursing Care: $32-42/hour\n• Overnight Care: $140-200/night\n\n*All caregivers are licensed and insured*\n\nWhat level of care are you considering?",

    courier_application: "**Courier Requirements:**\n\n• Must be 21+ with clean driving record\n• Reliable, insured vehicle (2015 or newer)\n• Smartphone with GPS\n• Pass background check\n• Complete training program\n• Available 20+ hours per week\n\n**Earnings:** $20-32/hour plus bonuses\n\nWould you like to start the application process?",

    caregiver_application: "**Caregiver Requirements:**\n\n• Healthcare certification (CNA, HHA, etc.)\n• 2+ years of experience\n• Current CPR/First Aid certification\n• Clean background check\n• Professional references\n\n**Compensation:** $22-38/hour based on experience\n\nDo you meet these qualifications?",

    tracking: "**Order Tracking Features:**\n\n• Real-time GPS location\n• SMS and email notifications\n• Direct courier communication\n• Estimated arrival times\n• Photo delivery confirmation\n\nDo you have an order you need to track?",

    account: "**Creating an Account gives you:**\n\n• Faster ordering process\n• Order history tracking\n• Saved addresses and payment methods\n• Family member management\n• Mobile app access\n\nAccount creation takes about 2 minutes. Would you like to get started?",

    contact_redirect: "For personalized assistance and detailed information about your specific needs, I recommend speaking with our customer service team:\n\n📞 **Phone:** (555) 123-6334\n📧 **Email:** support@medideliver.com\n⏰ **Hours:** Monday-Friday 8AM-8PM EST\n\nThey can provide quotes, schedule services, and answer detailed questions about your situation.",

    fallback: [
      "I'd be happy to help you with that. Could you please be more specific about what information you're looking for?",
      "I want to make sure I give you accurate information. Could you clarify what aspect of our services you're interested in?",
      "I'm here to help with questions about MediDeliver's services. What specific information can I provide for you?",
      "Let me help you find the right information. What would you like to know about our delivery or caregiver services?"
    ]
  };

  // Intent recognition
  const getIntent = (message) => {
    const text = message.toLowerCase().trim();

    // Greetings
    if (/^(hi|hello|hey|good\s+(morning|afternoon|evening))/.test(text)) {
      return 'greeting';
    }

    // Services
    if (/(what|service|help|do|offer|provide)/.test(text) && /(service|help|do|offer)/.test(text)) {
      return 'services_general';
    }

    // Specific services
    if (/(medication|prescription|drug|pill|pharmacy|medicine)/.test(text)) {
      return 'medication_delivery';
    }

    if (/(caregiver|care|nursing|elderly|assistance|help)/.test(text) && !/(job|work|apply|become)/.test(text)) {
      return 'caregiver_services';
    }

    if (/(supply|equipment|medical supply|wheelchair|oxygen|dme)/.test(text)) {
      return 'medical_supplies';
    }

    // Pricing
    if (/(price|cost|how much|rate|fee|pricing|expensive|cheap)/.test(text)) {
      if (conversationContext.topics.includes('caregiver')) {
        return 'pricing_caregiver';
      }
      return 'pricing_delivery';
    }

    // Applications
    if (/(courier|driver|delivery).*(job|work|apply|become|interest)/.test(text) ||
      /(become|apply).*(courier|driver)/.test(text)) {
      return 'courier_application';
    }

    if (/(caregiver|nursing).*(job|work|apply|become|interest)/.test(text) ||
      /(become|apply).*(caregiver|nurse)/.test(text)) {
      return 'caregiver_application';
    }

    // Tracking
    if (/(track|tracking|where|status|order|delivery)/.test(text) && /(track|status|where)/.test(text)) {
      return 'tracking';
    }

    // Account
    if (/(account|sign up|register|create|login)/.test(text)) {
      return 'account';
    }

    return 'fallback';
  };

  // Generate response
  const generateResponse = (message) => {
    const intent = getIntent(message);

    // Update context
    if (intent === 'caregiver_services' || intent === 'caregiver_application') {
      if (!conversationContext.topics.includes('caregiver')) {
        conversationContext.topics.push('caregiver');
      }
    }
    if (intent === 'medication_delivery' || intent === 'courier_application') {
      if (!conversationContext.topics.includes('delivery')) {
        conversationContext.topics.push('delivery');
      }
    }

    // Check if should redirect to support
    if (conversationContext.messageCount >= 6 && !conversationContext.hasRedirected) {
      conversationContext.hasRedirected = true;
      return responses.contact_redirect;
    }

    // Return appropriate response
    if (Array.isArray(responses[intent])) {
      return responses[intent][Math.floor(Math.random() * responses[intent].length)];
    }

    return responses[intent] || responses.fallback[Math.floor(Math.random() * responses.fallback.length)];
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: inputMessage,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Update conversation context
    setConversationContext(prev => ({
      ...prev,
      messageCount: prev.messageCount + 1
    }));

    // Bot response delay
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: generateResponse(inputMessage),
        isBot: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const quickActions = [
    { text: "Medication Delivery", action: () => handleQuickAction("Tell me about medication delivery") },
    { text: "Caregiver Services", action: () => handleQuickAction("I need caregiver services") },
    { text: "Become a Courier", action: () => handleQuickAction("I want to become a courier") },
    { text: "Pricing Information", action: () => handleQuickAction("What are your prices?") },
    { text: "Track My Order", action: () => handleQuickAction("How do I track my order?") },
    { text: "Create Account", action: () => handleQuickAction("I want to create an account") }
  ];

  const handleQuickAction = (message) => {
    const newMessage = {
      id: Date.now(),
      text: message,
      isBot: false,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
    setIsTyping(true);

    setConversationContext(prev => ({
      ...prev,
      messageCount: prev.messageCount + 1
    }));

    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: generateResponse(message),
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 800);
  };

  const resetConversation = () => {
    setMessages([
      {
        id: 1,
        text: "Hello! I'm MediBot, your healthcare delivery assistant. I can help you learn about our services, pricing, and application processes. How can I assist you today?",
        isBot: true,
        timestamp: new Date()
      }
    ]);
    setConversationContext({
      messageCount: 0,
      topics: [],
      hasRedirected: false
    });
  };

  const handleChatToggle = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      // Reset when closing
      setTimeout(() => resetConversation(), 300);
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={handleChatToggle}
        className={`fixed bottom-6 right-6 w-16 h-16 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 z-50 flex items-center justify-center ${isOpen ? 'rotate-45' : ''
          }`}
        aria-label="Open chat"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
        {!isOpen && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
        )}
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-24 right-6 w-96 h-[500px] bg-white rounded-xl shadow-xl transition-all duration-300 transform z-40 ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
          }`}
      >
        {/* Chat Header */}
        <div className="bg-blue-600 text-white p-4 rounded-t-xl flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 1.592.367 3.099 1.024 4.439L2 22l5.561-1.024C9.901 21.633 11.408 22 13 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-sm">MediBot</h3>
              <p className="text-xs opacity-90">Customer Service</p>
            </div>
          </div>
          <button
            onClick={handleChatToggle}
            className="w-6 h-6 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors"
            aria-label="Close chat"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Messages Container */}
        <div className="h-80 overflow-y-auto p-4 space-y-3 bg-gray-50">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`max-w-xs px-3 py-2 rounded-lg text-sm ${message.isBot
                  ? 'bg-white text-gray-800 border border-gray-200'
                  : 'bg-blue-600 text-white'
                  } whitespace-pre-line`}
              >
                <p>{message.text}</p>
                <p className={`text-xs mt-1 ${message.isBot ? 'text-gray-500' : 'text-blue-200'}`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white px-3 py-2 rounded-lg border border-gray-200">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        {messages.length === 1 && (
          <div className="px-4 py-2 bg-white border-t border-gray-200">
            <p className="text-xs text-gray-600 mb-2">Quick options:</p>
            <div className="grid grid-cols-2 gap-2">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={action.action}
                  className="px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs rounded transition-colors duration-200"
                >
                  {action.text}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 bg-white rounded-b-xl">
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
              disabled={isTyping}
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isTyping}
              className="w-8 h-8 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-full flex items-center justify-center transition-colors duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default function Home() {

  useEffect(() => {
    const nav = document.getElementById("nav");

    const handleScroll = () => {
      if (!nav) return;
      if (window.scrollY > 100) {
        nav.classList.add("open");
      } else {
        nav.classList.remove("open");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [])

  return (
    <section className="min-h-screen flex flex-col items-center bg-gray-50">
      {/* Header */}
      <header id="nav" className="w-full p-6 nav-feature bg-white shadow-md text-center fixed top-0 z-100">
        <h1 className="text-4xl font-extrabold text-blue-600">MediDeliver</h1>
        <p className="text-gray-600 mt-2 text-lg">Connecting You to Healthcare Providers & Couriers</p>
      </header>

      {/* Hero Section with Background Image */}
      <main className="relative w-full h-[80vh] flex items-center justify-center text-center bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-[50px]">
        {/* Background Image Overlay */}
        <div className="absolute inset-0">
          <Image
            src="/hero.png"
            alt="Healthcare Delivery"
            layout="fill"
            objectFit="cover"
            className="opacity-30"
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-2xl mx-auto">
          <h1 className="text-4xl font-extrabold">
            Delivering Healthcare, One Package at a Time
          </h1>
          <p className="mt-4 text-lg max-w-lg mx-auto">
            Get medications and medical supplies delivered fast, securely, and hassle-free. Join our network of trusted caregivers and couriers today!
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              href="/createaccount"
              className="bg-white text-blue-600 px-6 py-3 rounded-full text-base font-medium shadow hover:bg-gray-100 hover:shadow-md transition-all duration-200"
            >
              Create an Account
            </Link>
            <Link
              href="/becomeacaregiver"
              className="bg-gray-900 text-white px-6 py-3 rounded-full text-base font-medium shadow hover:bg-gray-800 hover:shadow-md transition-all duration-200"
            >
              Become a Caregiver
            </Link>
            <Link
              href="/becomeacourier"
              className="bg-yellow-500 text-white px-6 py-3 rounded-full text-base font-medium shadow hover:bg-yellow-600 hover:shadow-md transition-all duration-200"
            >
              Become a Courier
            </Link>
          </div>
        </div>
      </main>

      {/* Search Section */}
      <div className="w-[90%] mt-10 p-6 bg-white/70 backdrop-blur-md shadow-xl rounded-2xl">
        <h3 className="text-center text-2xl text-blue-500 tracking-wide font-bold">
          Find a Medical Courier or Caregiver
        </h3>
        <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
          <div className="relative w-[90%]">
            <input
              type="text"
              placeholder="Enter your zip code or location"
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
            />
            <span className="absolute left-3 top-2.5 text-gray-500">
              🔍
            </span>
          </div>
          <button className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-2 rounded-full font-medium shadow-md hover:from-blue-600 hover:to-indigo-600 active:scale-95 transition-all duration-200">
            Search
          </button>
        </div>
      </div>

      {/* Why MediDeliver Section */}
      <div className="w-[90%] mt-10 bg-white shadow-md p-6 rounded-lg">
        <h3 className="text-2xl font-extrabold text-blue-600 mb-4">Why MediDeliver?</h3>
        <ul className="text-gray-700 space-y-3 text-lg">
          <li><strong>Effortless Access</strong> – Easily schedule medical deliveries.</li>
          <li><strong>Trusted Couriers</strong> – Verified professionals ensure safe handling.</li>
          <li><strong>Real-Time Tracking</strong> – Monitor your deliveries live.</li>
          <li><strong>Secure Compliance</strong> – Adheres to healthcare transport standards.</li>
          <li><strong>Integrated Solutions</strong> – Works seamlessly with hospitals & pharmacies.</li>
        </ul>
      </div>

      {/* Footer */}
      <footer className="w-full py-6 mt-8 bg-white text-center shadow-md">
        <p className="text-gray-600">© 2025 MediDeliver. All rights reserved.</p>
      </footer>

      {/* Chatbot */}
      <Chatbot />
    </section>
  );
}