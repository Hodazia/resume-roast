import { Brain, Target, TrendingUp } from "lucide-react";

const benefits = [
  {
    icon: Brain,
    title: "Psychology Works",
    description:
      "Negative feedback sticks. When something hurts, you remember it. Our AI roasts are designed to be memorable so you actually fix the issues.",
    stat: "87% remember harsh feedback vs 34% for positive",
  },
  {
    icon: Target,
    title: "Brutal = Honest",
    description:
      "Recruiters won't sugar-coat why they rejected you. We prepare you for reality by being just as harsh (but constructive) as they would be.",
    stat: "Most resumes get 6 seconds of attention",
  },
  {
    icon: TrendingUp,
    title: "Results Speak",
    description:
      "Users who get roasted and apply our suggestions see 3x more interview callbacks. Sometimes the truth hurts, but it works.",
    stat: "3x more interviews after roasting",
  },
];

export const WhyRoasting = () => {
  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Why Roasting Actually Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Science-backed reasons why brutal honesty beats empty compliments
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="relative group bg-card border border-border rounded-2xl p-8 hover:border-primary/50 transition-all duration-300 hover:scale-105"
              >
                {/* Icon */}
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-8 h-8 text-primary" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground mb-4">
                  {benefit.description}
                </p>

                {/* Stat */}
                <div className="pt-4 border-t border-border">
                  <p className="text-sm font-mono text-primary font-bold">
                    {benefit.stat}
                  </p>
                </div>

                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            );
          })}
        </div>

        {/* Real examples */}
        <div className="mt-20 text-center">
          <h3 className="text-3xl font-bold mb-12">Before & After Glow-ups</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {/* Example 1 */}
            <div className="space-y-4">
              <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-6">
                <p className="text-sm font-mono text-left">
                  ❌ <strong>"Responsible for team management"</strong>
                  <br />
                  <span className="text-muted-foreground">
                    Vague, boring, zero impact
                  </span>
                </p>
              </div>
              <div className="text-2xl">↓</div>
              <div className="bg-primary/10 border border-primary/30 rounded-xl p-6">
                <p className="text-sm font-mono text-left">
                  ✅ <strong>"Led 12-person team to deliver $2M project 3 weeks early"</strong>
                  <br />
                  <span className="text-muted-foreground">
                    Specific, quantified, impressive
                  </span>
                </p>
              </div>
            </div>

            {/* Example 2 */}
            <div className="space-y-4">
              <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-6">
                <p className="text-sm font-mono text-left">
                  ❌ <strong>"Good at communication"</strong>
                  <br />
                  <span className="text-muted-foreground">
                    Everyone says this, meaningless
                  </span>
                </p>
              </div>
              <div className="text-2xl">↓</div>
              <div className="bg-primary/10 border border-primary/30 rounded-xl p-6">
                <p className="text-sm font-mono text-left">
                  ✅ <strong>"Presented to 500+ stakeholders, reducing Q&A by 60%"</strong>
                  <br />
                  <span className="text-muted-foreground">
                    Shows impact, not just claims
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
