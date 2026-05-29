"use client";

import { Container, Section } from "@/components/ui/Layout";
import { useSchedule, useClasses } from "@/hooks/usePersistence";
import { Calendar as CalendarIcon, MapPin, User, Clock } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Transition, Variants, motion } from "framer-motion";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] as const;

const fadeInUp: Variants = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 }
};

export default function SchedulePage() {
  const { data: schedule } = useSchedule();
  const { data: classes } = useClasses();
  const [selectedDay, setSelectedDay] = useState<typeof DAYS[number]>("Monday");

  const filteredSchedule = schedule.filter(item => item.day === selectedDay).sort((a, b) => a.startTime.localeCompare(b.startTime));

  const getClassTitle = (classId: string) => classes.find(c => c.id === classId)?.title || "Yoga Session";

  return (
    <div className="pt-24 min-h-screen">
      <Section variant="beige" className="text-center pb-12">
        <Container>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{  duration: 0.8  } as Transition}>
            <h1 className="text-4xl md:text-6xl font-serif mb-6">Class Schedule</h1>
            <p className="text-brand-stone/60 max-w-2xl mx-auto text-lg">
              Find the perfect time for your practice. From sunrise flows to evening meditations.
            </p>
          </motion.div>
        </Container>
      </Section>

      <Section>
        <Container>
          {/* Day Selector */}
          <div className="flex overflow-x-auto pb-4 mb-12 gap-2 justify-center no-scrollbar">
            {DAYS.map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-6 py-3 rounded-full transition-all whitespace-nowrap text-sm font-medium tracking-widest uppercase ${
                  selectedDay === day
                    ? "bg-brand-sage text-white shadow-lg"
                    : "bg-brand-cream/50 text-brand-stone hover:bg-brand-cream"
                }`}
              >
                {day}
              </button>
            ))}
          </div>

          {/* Schedule List */}
          <div className="max-w-4xl mx-auto space-y-6">
            {filteredSchedule.length > 0 ? (
              filteredSchedule.map((item, idx) => (
                <motion.div
                  key={item.id}
                  variants={fadeInUp}
                  initial="initial"
                  whileInView="whileInView"
                  transition={{  delay: idx * 0.1  } as Transition}
                  viewport={{ once: true }}
                  className="bg-white p-6 md:p-10 rounded-[2rem] border border-brand-beige flex flex-col md:flex-row md:items-center justify-between gap-8 hover:shadow-xl hover:shadow-brand-sage/5 transition-all"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 text-brand-sage mb-4">
                      <Clock size={18} />
                      <span className="font-semibold tracking-widest text-sm uppercase">{item.startTime} — {item.endTime}</span>
                    </div>
                    <h3 className="text-3xl font-serif mb-4">{getClassTitle(item.classId)}</h3>
                    <div className="flex flex-wrap gap-8 text-brand-stone/50 text-sm font-medium uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        <User size={16} className="text-brand-sage/40" />
                        <span>{item.instructor}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-brand-sage/40" />
                        <span>{item.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Link href="/contact" className="w-full md:w-auto">
                      <Button className="w-full md:w-auto px-8 h-14 rounded-full">Book Spot</Button>
                    </Link>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-32 bg-brand-cream/20 rounded-[3rem] border-2 border-dashed border-brand-beige">
                <CalendarIcon size={48} className="mx-auto mb-6 text-brand-stone/20" />
                <p className="text-brand-stone/50 font-serif italic text-xl">No classes scheduled for {selectedDay}.</p>
              </div>
            )}
          </div>
        </Container>
      </Section>
    </div>
  );
}
