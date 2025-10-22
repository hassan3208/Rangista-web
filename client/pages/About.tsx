export default function About() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-background via-muted/10 to-background">
      {/* Decorative Glow Backgrounds */}
      <div className="absolute -top-32 -left-40 w-96 h-96 bg-primary/20 blur-3xl rounded-full" />
      <div className="absolute bottom-0 -right-40 w-96 h-96 bg-accent/20 blur-3xl rounded-full" />

      <div className="container relative z-10 py-20 px-6">
        {/* Header Section */}
        <section className="text-center mb-20">
          <h1 className="font-serif text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            About Rangista
          </h1>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg leading-relaxed">
            Rangista is a creative world where art meets fashion. We design
            hand-painted, expressive apparel for women and children — pieces
            that blend tradition with modern charm. Every outfit tells a story
            of color, confidence, and individuality.
          </p>
        </section>

        {/* Story Section */}
        <section className="bg-white/5 backdrop-blur-sm border border-muted rounded-2xl p-10 shadow-sm hover:shadow-lg transition mb-16">
          <h2 className="font-serif text-3xl font-semibold mb-4 text-primary">
            Our Story
          </h2>
          <p className="text-muted-foreground leading-relaxed text-lg mb-4">
            Rangista began with a brush, a vision, and a deep love for culture.
            What started as small hand-painted designs grew into a brand that
            celebrates individuality through the language of colors. Each
            Rangista creation is made slowly, intentionally, and with emotion —
            because true art takes time.
          </p>
          <p className="text-muted-foreground leading-relaxed text-lg">
            Today, Rangista stands for sustainable, wearable art — crafted by
            talented local artisans and designed to bring beauty, joy, and
            meaning to your wardrobe.
          </p>
        </section>

        {/* Mission Section */}
        <section className="text-center mb-16">
          <h2 className="font-serif text-3xl font-semibold mb-4 text-primary">
            Our Mission
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground text-lg leading-relaxed">
            We aim to bring art into everyday fashion — creating unique,
            handcrafted pieces that inspire confidence and celebrate creativity.
            Rangista supports ethical craftsmanship, slow fashion, and
            sustainability, ensuring every piece carries a purpose and a
            heartbeat.
          </p>
        </section>

        {/* Values Section */}
        <section className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white/5 backdrop-blur-sm border border-muted rounded-2xl p-6 text-center hover:shadow-md transition">
            <h3 className="font-semibold text-xl mb-2 text-foreground">
              🎨 Creativity
            </h3>
            <p className="text-muted-foreground">
              Every design begins as a canvas — hand-painted with imagination,
              emotion, and purpose to make you feel one of a kind.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-muted rounded-2xl p-6 text-center hover:shadow-md transition">
            <h3 className="font-semibold text-xl mb-2 text-foreground">
              🌿 Sustainability
            </h3>
            <p className="text-muted-foreground">
              We embrace mindful production and slow fashion, ensuring that
              every Rangista piece is kind to the planet and to people.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-muted rounded-2xl p-6 text-center hover:shadow-md transition">
            <h3 className="font-semibold text-xl mb-2 text-foreground">
              🤝 Empowerment
            </h3>
            <p className="text-muted-foreground">
              Rangista empowers local women artisans by providing creative
              freedom, fair pay, and recognition for their craft.
            </p>
          </div>
        </section>

        {/* Closing Section */}
        <section className="text-center max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl font-semibold mb-4 text-foreground">
            Wear Art. Feel Joy.
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            Every Rangista outfit is more than clothing — it’s a work of art.
            When you wear Rangista, you carry the essence of creativity, culture,
            and confidence wherever you go.
          </p>
          <a
            href="https://www.instagram.com/_rangista/"
            target="_blank"
            rel="noreferrer"
            className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-full font-medium hover:bg-primary/90 transition"
          >
            Explore Our World
          </a>
        </section>
      </div>
    </div>
  );
}
