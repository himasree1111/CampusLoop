import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const FAQSection = () => {
  const faqs = [
    {
      question: "How does CampusLoop work?",
      answer: "CampusLoop connects students who want to share or exchange resources they no longer need. Simply browse available items, request what you need, and coordinate pickup with the owner. It's a sustainable way to give items a second life while finding something useful for your campus life."
    },
    {
      question: "Is CampusLoop free to use?",
      answer: "Yes! CampusLoop is completely free to use for students. We believe in making resource sharing accessible to everyone. There are no listing fees, transaction fees, or membership costs."
    },
    {
      question: "What items can I find on CampusLoop?",
      answer: "You can find many useful campus items! Popular categories include textbooks, digital tools, lab equipment, furniture, transportation, study guides, and more. All items are specifically curated for student needs."
    },
    {
      question: "How do I ensure a safe exchange?",
      answer: "We recommend meeting in public places on campus during daylight hours. Many departments have designated exchange spots. Always trust your instincts, and consider bringing a friend if you're unsure. Check the item condition before finalizing the exchange."
    },
    {
      question: "What if I don't have anything to share?",
      answer: "While sharing is our primary focus, many community members are happy to give away items for free, especially to fellow students. You can also offer services like tutoring, help with projects, or assistance in exchange for items."
    },
    {
      question: "How do I post an item to share?",
      answer: "Create a free account, click 'Post Item', add photos and a description, select your preferred category and condition, and publish your listing. Your item will be visible to the campus community immediately."
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-cream">
      <div className="w-full px-4">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-forest/10 rounded-full">
              <HelpCircle className="h-8 w-8 text-forest" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-forest mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-nature max-w-2xl mx-auto">
            Everything you need to know about campus resource sharing
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-white rounded-lg shadow-card border-mint/20 px-6"
              >
                <AccordionTrigger className="text-left text-forest hover:text-sage transition-eco py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-foreground/80 pb-4 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;