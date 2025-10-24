import { Upload, Flame, Lightbulb, Send, DollarSign } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Upload",
    description: "Drop your resume and brace yourself",
    emoji: "📄",
  },
  {
    icon: Flame,
    title: "Get Roasted",
    description: "AI tears it apart with brutal honesty",
    emoji: "🔥",
  },
  {
    icon: Lightbulb,
    title: "Improve",
    description: "Actionable tips to fix the damage",
    emoji: "💡",
  },
  {
    icon: Send,
    title: "Apply",
    description: "Send it with confidence",
    emoji: "✉️",
  },
  {
    icon: DollarSign,
    title: "$$$",
    description: "Land the job and get paid",
    emoji: "💰",
  },
];

export const HowItWorks = () => {
  return (
    <section className="py-24 px-4 bg-stone-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-white">
            How It Works
          </h2>
          <p className="text-xl text-gray-400">
            5 simple steps from mediocre to hired
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="relative flex flex-col items-center text-center group"
              >
                {/* Arrow connector */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-red-500/50 to-transparent" />
                )}

                {/* Icon circle */}
                <div className="relative z-10 w-24 h-24 rounded-full bg-stone-900
                border-2 border-red-500/30 flex items-center justify-center mb-4
                 group-hover:scale-110 group-hover:border-red-500 transition-all duration-300">
                  <Icon className="w-10 h-10 text-red-500" />
                </div>

                {/* Step emoji */}
                <div className="text-4xl mb-2">{step.emoji}</div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-2 text-white">{step.title}</h3>
                <p className="text-sm text-gray-400">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
