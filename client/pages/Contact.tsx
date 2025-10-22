export default function Contact() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-background via-muted/10 to-background">
      {/* Decorative Blur Background */}
      <div className="absolute -top-32 -right-40 w-96 h-96 bg-primary/20 blur-3xl rounded-full" />
      <div className="absolute bottom-0 -left-40 w-96 h-96 bg-accent/20 blur-3xl rounded-full" />

      <div className="container relative z-10 py-20 px-6">
        {/* Header */}
        <section className="text-center mb-20">
          <h1 className="font-serif text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Get in Touch
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            We love connecting with people who share our passion for creativity
            and art-to-wear fashion. Whether it’s about collaborations,
            questions, or feedback — we’re just a message away.
          </p>
        </section>

        {/* Info Cards */}
        <section className="grid md:grid-cols-2 gap-10 mb-20">
          {/* Contact Info Card */}
          <div className="bg-white/5 backdrop-blur-sm border border-muted rounded-2xl p-8 shadow-sm hover:shadow-lg transition">
            <h2 className="font-serif text-2xl font-semibold mb-6 text-primary">
              Contact Information
            </h2>
            <ul className="space-y-4 text-muted-foreground text-lg">
              <li>
                <span className="font-medium text-foreground">WhatsApp:</span>{" "}
                <a
                  className="underline hover:text-primary transition"
                  href="https://wa.me/923340677883"
                  target="_blank"
                  rel="noreferrer"
                >
                  0334 0677883
                </a>
              </li>
              <li>
                <span className="font-medium text-foreground">Email:</span>{" "}
                <a
                  className="underline hover:text-primary transition"
                  href="mailto:rangistaarttowear@gmail.com"
                >
                  rangistaarttowear@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links Card */}
          <div className="bg-white/5 backdrop-blur-sm border border-muted rounded-2xl p-8 shadow-sm hover:shadow-lg transition">
            <h2 className="font-serif text-2xl font-semibold mb-6 text-primary">
              Connect on Social
            </h2>
            <ul className="space-y-4 text-muted-foreground text-lg">
              <li>
                <a
                  className="underline hover:text-primary transition"
                  href="https://www.facebook.com/profile.php?id=100065230491278"
                  target="_blank"
                  rel="noreferrer"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  className="underline hover:text-primary transition"
                  href="https://www.instagram.com/_rangista/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  className="underline hover:text-primary transition"
                  href="https://pin.it/6NW4U2K"
                  target="_blank"
                  rel="noreferrer"
                >
                  Pinterest
                </a>
              </li>
            </ul>
          </div>
        </section>

        {/* Divider */}
        <div className="my-20 border-t border-muted/50"></div>

        {/* Closing Note */}
        <section className="text-center max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl font-semibold mb-4 text-foreground">
            We’re Here for You
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-6">
            Whether it’s a styling question, a custom piece inquiry, or a kind
            word of appreciation — we always love hearing from our Rangista
            community. Your voice inspires our next creation.
          </p>
          <a
            href="https://wa.me/923340677883"
            target="_blank"
            rel="noreferrer"
            className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-full font-medium hover:bg-primary/90 transition"
          >
            Message on WhatsApp
          </a>
        </section>
      </div>
    </div>
  );
}
