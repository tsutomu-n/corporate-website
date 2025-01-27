import { motion } from "framer-motion";
import { Clock } from "lucide-react";

const history = [
  { year: "1974年", event: "山田建設株式会社設立" },
  { year: "1980年", event: "東京支店開設" },
  { year: "1995年", event: "ISO9001認証取得" },
  { year: "2000年", event: "環境事業部設立" },
  { year: "2010年", event: "本社ビル移転" },
  { year: "2020年", event: "創業50周年" },
];

export default function CompanyHistory() {
  return (
    <section id="history" className="py-16">
      <div className="container">
        <h2 className="text-3xl font-bold mb-12 text-center">沿革</h2>
        <div className="max-w-3xl mx-auto">
          {history.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.5,
                delay: index * 0.2 
              }}
              className="flex gap-4 pb-8 relative before:absolute before:left-[17px] before:top-8 before:h-full before:w-[2px] before:bg-border last:before:hidden"
            >
              <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.2 + 0.3 }}
                  className="font-medium"
                >
                  {item.year}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.2 + 0.4 }}
                  className="text-muted-foreground"
                >
                  {item.event}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
