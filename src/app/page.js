"use client";
import Image from "next/image";
import Link from "next/link";
// import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

// Enhanced Intelligent Chatbot Component
function EnhancedChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm MediBot, your intelligent healthcare delivery assistant. I can help you with services, pricing, applications, and more. What brings you here today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: null,
    interests: [],
    messageCount: 0,
    sessionStart: new Date(),
    previousQuestions: [],
    currentFlow: null,
    location: null,
    urgency: 'normal',
    needsHumanHelp: false
  });

  // Enhanced knowledge base with comprehensive information
  const knowledgeBase = {
    services: {
      medication_delivery: {
        description: "Fast, secure prescription delivery service",
        features: ["Same-day delivery available", "Temperature-controlled transport", "Insurance coordination", "Direct pharmacy partnerships", "Prescription verification", "Secure handling protocols"],
        pricing: "Standard: $12-18, Express: $18-28, Emergency: $28-45",
        timeframes: "Standard: 4-6 hours, Express: 1-2 hours, Emergency: Under 1 hour",
        coverage: "Available in 50+ major cities nationwide",
        insurance: "Most major insurance plans accepted, co-pays apply"
      },
      caregiver_services: {
        description: "Professional licensed in-home healthcare assistance",
        types: ["Companion care ($22-28/hr)", "Personal care ($26-32/hr)", "Skilled nursing ($32-42/hr)", "Overnight care ($140-200/night)"],
        qualifications: "All caregivers are licensed, insured, and background-checked",
        availability: "24/7 scheduling available with flexible options",
        specialties: ["Dementia care", "Post-surgery recovery", "Medication management", "Mobility assistance"]
      },
      medical_supplies: {
        description: "Medical equipment and supply delivery service",
        items: ["Durable medical equipment (DME)", "Mobility aids and wheelchairs", "Wound care supplies", "Diabetic supplies", "Respiratory equipment", "Hospital bed rentals"],
        delivery: "Same-day delivery available for urgent medical needs",
        insurance: "Direct billing to most insurance providers available"
      }
    },
    applications: {
      courier: {
        requirements: ["21+ years old", "Clean driving record (3+ years)", "Reliable insured vehicle (2015 or newer)", "Smartphone with GPS capability", "Pass comprehensive background check", "Complete medical transport training"],
        earnings: "$20-32/hour base pay plus performance bonuses and tips",
        schedule: "Flexible scheduling, minimum 20 hours/week commitment",
        benefits: ["Health insurance options", "Mileage reimbursement", "Performance bonuses", "Flexible hours", "Professional development"]
      },
      caregiver: {
        requirements: ["Valid healthcare certification (CNA, HHA, LPN, etc.)", "Minimum 2 years hands-on experience", "Current CPR/First Aid certification", "Clean background check and drug screening", "Professional references from healthcare employers"],
        compensation: "$22-38/hour based on experience level and certifications",
        schedule: "Full-time, part-time, and per-diem positions available",
        benefits: ["Comprehensive health insurance", "Continuing education support", "401k retirement plan", "Paid time off", "Career advancement opportunities"]
      }
    },
    faqs: {
      "how does delivery work": "It's simple: 1) Upload your prescription or call your pharmacy, 2) Choose your delivery time, 3) Track your courier in real-time, 4) Receive your medication with secure ID verification at your door.",
      "is delivery safe": "Absolutely! All medications are transported in temperature-controlled containers, sealed with tamper-evident packaging, and delivered by background-checked, trained couriers.",
      "insurance coverage": "We work with most major insurance plans including Medicare, Medicaid, and private insurers. Your normal co-pays and deductibles apply.",
      "service areas": "We currently serve 50+ major metropolitan areas. Enter your zip code on our website to check if we deliver to your location.",
      "emergency delivery": "Yes! We offer emergency delivery in under 1 hour for critical medications. This service is available 24/7 and costs $28-45 depending on your location.",
      "prescription requirements": "We work directly with your pharmacy or can coordinate with your doctor's office. Just provide your prescription details or pharmacy information.",
      "tracking orders": "You'll receive real-time GPS tracking, SMS notifications, and can communicate directly with your courier through our app.",
      "account setup": "Creating an account takes just 2 minutes and gives you faster ordering, saved payment methods, order history, and family member management."
    },
    customerSupport: {
      phone: "(555) 123-6334",
      email: "support@medideliver.com",
      hours: "Monday-Friday: 8AM-8PM EST, Saturday-Sunday: 9AM-5PM EST",
      emergencyLine: "(555) 911-MEDI (6334)",
      emergencyHours: "24/7 for urgent medical delivery needs"
    }
  };

  // Advanced intent recognition with context and sentiment analysis
  const analyzeIntent = (message, context = {}) => {
    const text = message.toLowerCase().trim();
    const words = text.split(/\s+/);
    const previousContext = context.currentFlow;

    // Detect frustration or need for human help
    const frustrationWords = ['frustrated', 'angry', 'upset', 'terrible', 'awful', 'horrible', 'worst', 'hate', 'stupid', 'useless', 'help me', 'speak to someone', 'human', 'representative', 'manager', 'supervisor', 'person', 'agent'];
    const needsHumanHelp = frustrationWords.some(word => text.includes(word)) ||
      text.includes('not helpful') ||
      text.includes('don\'t understand') ||
      context.messageCount > 8;

    // Urgent/Emergency detection
    const emergencyWords = ['emergency', 'urgent', 'critical', 'now', 'immediately', 'asap', 'life threatening', 'dying', 'pain', 'can\'t breathe', 'chest pain'];
    const isEmergency = emergencyWords.some(word => text.includes(word));

    // Greeting patterns
    if (/^(hi|hello|hey|good\s+(morning|afternoon|evening)|greetings|sup|yo)/.test(text)) {
      return { intent: 'greeting', confidence: 0.9, entities: [], needsHuman: false, isEmergency: false };
    }

    // Name extraction
    const nameMatch = text.match(/(?:i'm|i am|my name is|call me)\s+([a-z]+)/i);
    if (nameMatch) {
      return { intent: 'introduce_name', confidence: 0.95, entities: [{ type: 'name', value: nameMatch[1] }], needsHuman: false, isEmergency: false };
    }

    // Location extraction
    const locationMatch = text.match(/(?:in|from|at)\s+([a-z\s,]+)/i);
    if (locationMatch) {
      return { intent: 'location_info', confidence: 0.8, entities: [{ type: 'location', value: locationMatch[1] }], needsHuman: false, isEmergency: false };
    }

    // Service inquiries
    const serviceKeywords = {
      medication: ['medication', 'prescription', 'drug', 'pill', 'pharmacy', 'medicine', 'rx', 'refill', 'pickup'],
      caregiver: ['caregiver', 'care', 'nursing', 'elderly', 'assistance', 'help', 'nurse', 'aide', 'companion', 'home care'],
      supplies: ['supply', 'equipment', 'medical supply', 'wheelchair', 'oxygen', 'dme', 'supplies', 'walker', 'bed']
    };

    for (const [service, keywords] of Object.entries(serviceKeywords)) {
      if (keywords.some(keyword => text.includes(keyword))) {
        const confidence = keywords.filter(keyword => text.includes(keyword)).length * 0.3;
        return { intent: `${service}_inquiry`, confidence: Math.min(confidence, 0.9), entities: [], needsHuman: needsHumanHelp, isEmergency };
      }
    }

    // Pricing inquiries
    if (/(price|cost|how much|rate|fee|pricing|expensive|cheap|afford|money|payment)/.test(text)) {
      const serviceContext = previousContext || 'general';
      return { intent: 'pricing_inquiry', confidence: 0.85, entities: [{ type: 'service', value: serviceContext }], needsHuman: needsHumanHelp, isEmergency };
    }

    // Application/Job inquiries
    if (/(job|work|apply|become|career|employment|hiring|position|opportunity)/.test(text)) {
      if (/(courier|driver|delivery)/.test(text)) {
        return { intent: 'courier_application', confidence: 0.9, entities: [], needsHuman: needsHumanHelp, isEmergency: false };
      }
      if (/(caregiver|nursing|care)/.test(text)) {
        return { intent: 'caregiver_application', confidence: 0.9, entities: [], needsHuman: needsHumanHelp, isEmergency: false };
      }
      return { intent: 'general_application', confidence: 0.7, entities: [], needsHuman: needsHumanHelp, isEmergency: false };
    }

    // Customer support requests
    if (/(customer service|support|help|representative|human|person|agent|manager|supervisor|speak to someone|talk to someone)/.test(text)) {
      return { intent: 'customer_support', confidence: 0.95, entities: [], needsHuman: true, isEmergency };
    }

    // Account/Technical issues
    if (/(account|login|password|app|website|technical|problem|issue|bug|error)/.test(text)) {
      return { intent: 'technical_support', confidence: 0.8, entities: [], needsHuman: needsHumanHelp, isEmergency: false };
    }

    // Tracking inquiries
    if (/(track|tracking|where|status|order|delivery|courier|driver)/.test(text) && /(track|status|where)/.test(text)) {
      return { intent: 'tracking_inquiry', confidence: 0.85, entities: [], needsHuman: false, isEmergency };
    }

    // Process questions
    if (text.includes('?') || /^(how|what|where|when|why|can|do|does|is|are|will|would|should)/.test(text)) {
      return { intent: 'question', confidence: 0.8, entities: [], needsHuman: needsHumanHelp, isEmergency };
    }

    // Thank you/Goodbye
    if (/(thank|thanks|bye|goodbye|see you|ttyl)/.test(text)) {
      return { intent: 'farewell', confidence: 0.9, entities: [], needsHuman: false, isEmergency: false };
    }

    return { intent: 'unclear', confidence: 0.3, entities: [], needsHuman: needsHumanHelp, isEmergency };
  };

  // Intelligent response generation with human handoff capability
  const generateIntelligentResponse = (message, analysis) => {
    const { intent, confidence, entities, needsHuman, isEmergency } = analysis;
    const name = userProfile.name;
    const greeting = name ? `Hi ${name}` : "Hello";

    // Handle emergency situations immediately
    if (isEmergency) {
      setUserProfile(prev => ({ ...prev, needsHumanHelp: true }));
      return `🚨 **This sounds like an emergency!**\n\nFor immediate medical emergencies, please call 911 or go to your nearest emergency room.\n\nFor urgent medication delivery needs:\n📞 **Emergency Line:** ${knowledgeBase.customerSupport.emergencyLine}\n⏰ **Available:** ${knowledgeBase.customerSupport.emergencyHours}\n\nWe can arrange emergency delivery in under 1 hour. Is this a medication delivery emergency?`;
    }

    // Handle customer support requests
    if (intent === 'customer_support' || needsHuman || userProfile.messageCount > 10) {
      setUserProfile(prev => ({ ...prev, needsHumanHelp: true }));
      return `I understand you'd like to speak with a human representative. Here are your options for personalized assistance:\n\n📞 **Phone Support:**\n${knowledgeBase.customerSupport.phone}\n${knowledgeBase.customerSupport.hours}\n\n📧 **Email Support:**\n${knowledgeBase.customerSupport.email}\n\n🚨 **Emergency Line:**\n${knowledgeBase.customerSupport.emergencyLine}\n${knowledgeBase.customerSupport.emergencyHours}\n\nOur customer service team can help with:\n• Account setup and billing questions\n• Complex service requests\n• Insurance and coverage issues\n• Scheduling and specialized needs\n• Technical support\n\nWould you like me to help you prepare any information before you call?`;
    }

    // Handle name introduction
    if (intent === 'introduce_name') {
      const extractedName = entities.find(e => e.type === 'name')?.value;
      if (extractedName) {
        setUserProfile(prev => ({ ...prev, name: extractedName }));
        return `Nice to meet you, ${extractedName}! I'm here to help you with any questions about MediDeliver's services. What can I assist you with today?`;
      }
    }

    // Handle location
    if (intent === 'location_info') {
      const location = entities.find(e => e.type === 'location')?.value;
      setUserProfile(prev => ({ ...prev, location }));
      return `Thanks for sharing your location (${location}). This helps me provide more relevant information about our services in your area. Let me check our coverage for you!\n\nWhat specific service are you interested in?`;
    }

    // Contextual greetings
    if (intent === 'greeting') {
      const timeGreeting = getTimeBasedGreeting();
      if (userProfile.messageCount === 0) {
        return `${timeGreeting}! Welcome to MediDeliver. I'm MediBot, your intelligent healthcare delivery assistant.\n\nI can help you with:\n🚚 Medication delivery services\n👨‍⚕️ Caregiver services\n📦 Medical supply delivery\n💼 Career opportunities\n📱 Account setup\n\nWhat interests you most today?`;
      }
      return `${greeting}! Good to hear from you again. How can I help you now?`;
    }

    // Service-specific responses
    if (intent === 'medication_inquiry') {
      setUserProfile(prev => ({ ...prev, currentFlow: 'medication' }));
      const service = knowledgeBase.services.medication_delivery;
      return `${greeting}! Our **Medication Delivery Service** is perfect for you:\n\n✅ **Features:**\n${service.features.map(f => `• ${f}`).join('\n')}\n\n💰 **Pricing:** ${service.pricing}\n⏱️ **Timeframes:** ${service.timeframes}\n🏥 **Insurance:** ${service.insurance}\n\n**Quick Setup:** Just call your pharmacy or upload your prescription!\n\nWould you like to know about:\n• Pricing details\n• Coverage in your area\n• How to get started\n• Emergency delivery options`;
    }

    if (intent === 'caregiver_inquiry') {
      setUserProfile(prev => ({ ...prev, currentFlow: 'caregiver' }));
      const service = knowledgeBase.services.caregiver_services;
      return `${greeting}! Our **Professional Caregiver Services** provide:\n\n🏠 **Care Options:**\n${service.types.map(t => `• ${t}`).join('\n')}\n\n⭐ **Quality Assurance:** ${service.qualifications}\n📅 **Availability:** ${service.availability}\n\n🎯 **Specialties:**\n${service.specialties.map(s => `• ${s}`).join('\n')}\n\nAre you looking for:\n• Care for yourself or a family member?\n• Specific type of assistance?\n• Information about our caregivers?`;
    }

    if (intent === 'supplies_inquiry') {
      const service = knowledgeBase.services.medical_supplies;
      return `${greeting}! We handle **Medical Supply & Equipment Delivery**:\n\n📦 **Available Items:**\n${service.items.map(i => `• ${i}`).join('\n')}\n\n🚚 **Delivery:** ${service.delivery}\n💳 **Insurance:** ${service.insurance}\n\nWhat type of medical equipment or supplies do you need? I can provide specific information and pricing!`;
    }

    // Enhanced pricing responses
    if (intent === 'pricing_inquiry') {
      const serviceType = entities.find(e => e.type === 'service')?.value || userProfile.currentFlow;

      if (serviceType === 'medication') {
        return `**Medication Delivery Pricing:**\n\n🚚 **Standard Delivery (4-6 hours):** $12-18\n⚡ **Express Delivery (1-2 hours):** $18-28\n🚨 **Emergency Delivery (<1 hour):** $28-45\n\n💡 **Save with Monthly Plans:**\n• Unlimited Standard: $39.99/month\n• Unlimited Express: $79.99/month\n• Family Plan (4 members): $119.99/month\n\n*Prices vary by distance and location*\n\nMost insurance plans cover the medication cost - you only pay the delivery fee!\n\nWant me to connect you with customer service for a personalized quote?`;
      }

      if (serviceType === 'caregiver') {
        return `**Caregiver Service Rates:**\n\n👥 **Companion Care:** $22-28/hour\n🛁 **Personal Care:** $26-32/hour\n👩‍⚕️ **Skilled Nursing:** $32-42/hour\n🌙 **Overnight Care:** $140-200/night\n\n✅ **All rates include:**\n• Licensed, insured caregivers\n• Background-checked professionals\n• Flexible scheduling\n• Care plan customization\n\n💳 **Payment Options:** Most insurance plans accepted, private pay available\n\nWhat level of care are you considering? I can provide a more specific estimate!`;
      }

      return `**MediDeliver Pricing Overview:**\n\n🚚 **Medication Delivery:** $12-45 (speed & distance based)\n👨‍⚕️ **Caregiver Services:** $22-42/hour (care level based)\n📦 **Medical Supplies:** Varies by item and insurance coverage\n\n💰 **Payment:** Insurance accepted, flexible payment plans available\n\nWhich service interests you most? I can provide detailed pricing and help you get started!`;
    }

    // Application responses
    if (intent === 'courier_application') {
      const app = knowledgeBase.applications.courier;
      return `**Courier Opportunities** 🚗\n\n**Requirements:**\n${app.requirements.map(r => `• ${r}`).join('\n')}\n\n💰 **Earnings:** ${app.earnings}\n📅 **Schedule:** ${app.schedule}\n\n🎁 **Benefits:**\n${app.benefits.map(b => `• ${b}`).join('\n')}\n\n**Ready to apply?** Our application process takes about 15 minutes online, followed by a background check and training program.\n\nInterested in starting the application? I can direct you to our careers page!`;
    }

    if (intent === 'caregiver_application') {
      const app = knowledgeBase.applications.caregiver;
      return `**Professional Caregiver Positions** 👩‍⚕️\n\n**Requirements:**\n${app.requirements.map(r => `• ${r}`).join('\n')}\n\n💰 **Compensation:** ${app.compensation}\n📅 **Schedule:** ${app.schedule}\n\n🎁 **Benefits Package:**\n${app.benefits.map(b => `• ${b}`).join('\n')}\n\n**Application Process:** Online application → Interview → Reference check → Orientation\n\nDo you meet these qualifications? I'd love to help you get started with your application!`;
    }

    // Technical support
    if (intent === 'technical_support') {
      return `**Technical Support Available** 💻\n\nFor technical issues with:\n• Account login problems\n• App or website issues\n• Payment processing\n• Order tracking problems\n\n**Quick Solutions:**\n• Try clearing your browser cache\n• Check your internet connection\n• Update the app if using mobile\n\n**Need More Help?**\n📞 Technical Support: ${knowledgeBase.customerSupport.phone}\n📧 Email: ${knowledgeBase.customerSupport.email}\n\nWhat specific technical issue are you experiencing?`;
    }

    // Tracking inquiries
    if (intent === 'tracking_inquiry') {
      return `**Order Tracking** 📱\n\nYou can track your delivery through:\n• Real-time GPS tracking in our app\n• SMS notifications with updates\n• Email alerts for status changes\n• Direct messaging with your courier\n\n**Don't have tracking info?**\n• Check your email for order confirmation\n• Log into your account at medideliver.com\n• Call customer service: ${knowledgeBase.customerSupport.phone}\n\nDo you have an order number I can help you look up?`;
    }

    // Handle questions with FAQ lookup
    if (intent === 'question') {
      const question = message.toLowerCase();
      const faqMatch = Object.entries(knowledgeBase.faqs).find(([key, _]) =>
        question.includes(key) || key.split(' ').some(word => question.includes(word))
      );

      if (faqMatch) {
        const [_, answer] = faqMatch;
        return `${greeting}! ${answer}\n\nDo you have any other questions about this or our other services?`;
      }

      return `That's a great question! Let me help you find the answer. Could you be a bit more specific about what you'd like to know?\n\n**I can help with:**\n• How our services work\n• Pricing and insurance\n• Service areas and availability\n• Account setup and ordering\n• Application processes\n\nWhat specific aspect interests you most?`;
    }

    // Farewell
    if (intent === 'farewell') {
      return `${greeting}! Thanks for chatting with MediDeliver today. \n\n**Remember:**\n📞 Customer Service: ${knowledgeBase.customerSupport.phone}\n🚨 Emergency Delivery: ${knowledgeBase.customerSupport.emergencyLine}\n\nFeel free to come back anytime with questions. Take care! 😊`;
    }

    // Intelligent fallback with escalation suggestion
    if (confidence < 0.5 || userProfile.messageCount > 6) {
      const suggestions = generateContextualSuggestions();
      return `I want to make sure I give you the most helpful information${name ? `, ${name}` : ''}.\n\n**I can help with:**\n${suggestions.join('\n')}\n\n**Need more detailed help?** Our customer service team is available at:\n📞 ${knowledgeBase.customerSupport.phone}\n📧 ${knowledgeBase.customerSupport.email}\n\nWhat would you like to know more about?`;
    }

    return "I'm here to help with any questions about MediDeliver's healthcare delivery services. What would you like to know more about?";
  };

  // Generate contextual suggestions based on user behavior
  const generateContextualSuggestions = () => {
    const baseOptions = [
      "🚚 Medication delivery options and pricing",
      "👨‍⚕️ Caregiver services and rates",
      "📦 Medical supply delivery",
      "💼 Career opportunities (courier/caregiver)",
      "📱 Account setup and getting started"
    ];

    if (userProfile.location) {
      baseOptions.push(`🗺️ Service availability in ${userProfile.location}`);
    }

    if (userProfile.currentFlow) {
      const flowOptions = {
        medication: "💊 Emergency delivery and insurance coverage",
        caregiver: "🏠 Specialized care options and scheduling"
      };
      if (flowOptions[userProfile.currentFlow]) {
        baseOptions.unshift(flowOptions[userProfile.currentFlow]);
      }
    }

    return baseOptions.slice(0, 6);
  };

  // Time-based greeting
  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  // Enhanced message handling
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
    const currentInput = inputMessage;
    setInputMessage("");
    setIsTyping(true);

    // Update user profile
    setUserProfile(prev => ({
      ...prev,
      messageCount: prev.messageCount + 1,
      previousQuestions: [...prev.previousQuestions, currentInput].slice(-5)
    }));

    // Analyze intent and generate response
    setTimeout(() => {
      const analysis = analyzeIntent(currentInput, userProfile);
      const response = generateIntelligentResponse(currentInput, analysis);

      const botResponse = {
        id: Date.now() + 1,
        text: response,
        isBot: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 800 + Math.random() * 800);
  };

  // Smart quick actions based on context
  const getSmartQuickActions = () => {
    const baseActions = [
      { text: "Medication Delivery", action: () => handleQuickAction("Tell me about medication delivery") },
      { text: "Caregiver Services", action: () => handleQuickAction("I need caregiver services") },
      { text: "Pricing Info", action: () => handleQuickAction("What are your prices?") },
      { text: "Become a Courier", action: () => handleQuickAction("I want to become a courier") },
      { text: "Emergency Delivery", action: () => handleQuickAction("I need emergency medication delivery") },
      { text: "Customer Support", action: () => handleQuickAction("I want to speak to customer service") }
    ];

    if (userProfile.currentFlow === 'medication') {
      baseActions.unshift({ text: "Insurance Coverage", action: () => handleQuickAction("Does my insurance cover delivery?") });
    }

    if (userProfile.messageCount > 5 && !userProfile.needsHumanHelp) {
      baseActions.push({ text: "Speak to Human", action: () => handleQuickAction("I want to speak to a customer service representative") });
    }

    return baseActions.slice(0, 6);
  };

  const handleQuickAction = (message) => {
    const newMessage = {
      id: Date.now(),
      text: message,
      isBot: false,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
    setIsTyping(true);

    setUserProfile(prev => ({
      ...prev,
      messageCount: prev.messageCount + 1
    }));

    setTimeout(() => {
      const analysis = analyzeIntent(message, userProfile);
      const response = generateIntelligentResponse(message, analysis);

      const botResponse = {
        id: Date.now() + 1,
        text: response,
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 600);
  };

  const resetConversation = () => {
    setMessages([
      {
        id: 1,
        text: "Hi! I'm MediBot, your intelligent healthcare delivery assistant. I can help you with services, pricing, applications, and more. What brings you here today?",
        isBot: true,
        timestamp: new Date()
      }
    ]);
    setUserProfile({
      name: null,
      interests: [],
      messageCount: 0,
      sessionStart: new Date(),
      previousQuestions: [],
      currentFlow: null,
      location: null,
      urgency: 'normal',
      needsHumanHelp: false
    });
  };

  const handleChatToggle = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setTimeout(() => resetConversation(), 300);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={handleChatToggle}
        className={`fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 z-50 flex items-center justify-center ${isOpen ? 'rotate-45' : ''
          }`}
        aria-label="Toggle chat"
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
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
        )}
      </button>

      {/* Enhanced Chat Window */}
      <div
        className={`fixed bottom-24 right-6 w-96 h-[550px] bg-white rounded-xl shadow-2xl border border-gray-200 transition-all duration-300 transform z-40 ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
          }`}
      >
        {/* Enhanced Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-t-xl flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 1.592.367 3.099 1.024 4.439L2 22l5.561-1.024C9.901 21.633 11.408 22 13 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
                </svg>
              </div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h3 className="font-semibold text-sm">MediBot</h3>
              <p className="text-xs opacity-90">AI Assistant • Online</p>
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
        <div className="h-80 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-2xl text-sm ${message.isBot
                  ? 'bg-white text-gray-800 border border-gray-200 shadow-sm'
                  : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md'
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
              <div className="bg-white px-4 py-3 rounded-2xl border border-gray-200 shadow-sm">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Smart Quick Actions */}
        {(messages.length <= 2 || userProfile.messageCount < 4) && (
          <div className="px-4 py-3 bg-white border-t border-gray-100">
            <p className="text-xs text-gray-600 mb-2">Quick options:</p>
            <div className="grid grid-cols-2 gap-2">
              {getSmartQuickActions().map((action, index) => (
                <button
                  key={index}
                  onClick={action.action}
                  className="px-3 py-2 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 text-gray-700 text-xs rounded-lg transition-all duration-200 border border-gray-200 hover:shadow-sm"
                >
                  {action.text}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Enhanced Input Area */}
        <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 bg-white rounded-b-xl">
          <div className="flex items-center space-x-2">
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder={userProfile.name ? `Type your message, ${userProfile.name}...` : "Type your message..."}
                className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-gray-50 hover:bg-white transition-colors"
                disabled={isTyping}
              />
            </div>
            <button
              type="submit"
              disabled={!inputMessage.trim() || isTyping}
              className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white rounded-full flex items-center justify-center transition-all duration-200 shadow-md hover:shadow-lg"
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

      {/* Enhanced Intelligent Chatbot */}
      <EnhancedChatbot />
    </section>
  );
}