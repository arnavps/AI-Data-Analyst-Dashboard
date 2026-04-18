"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/Card";
import { 
  Database, 
  Search, 
  Zap, 
  Shield, 
  BarChart3, 
  MessageSquare 
} from "lucide-react";

const features = [
  {
    title: "Instant Ingestion",
    description: "Upload CSV, JSON, or Excel files. Our AI cleans and prepares your data automatically.",
    icon: <Database className="h-6 w-6" />,
    color: "bg-blue-500",
  },
  {
    title: "Natural Language Query",
    description: "Ask questions like 'What was our best performing region last quarter?' and get instant answers.",
    icon: <MessageSquare className="h-6 w-6" />,
    color: "bg-purple-500",
  },
  {
    title: "AI-Powered Insights",
    description: "Detect anomalies, predict trends, and uncover hidden patterns you might have missed.",
    icon: <Search className="h-6 w-6" />,
    color: "bg-green-500",
  },
  {
    title: "Real-time Processing",
    description: "Blazing fast analysis engine that handles millions of rows without breaking a sweat.",
    icon: <Zap className="h-6 w-6" />,
    color: "bg-yellow-500",
  },
  {
    title: "Interactive Charts",
    description: "Beautiful, interactive visualizations that help you tell a story with your data.",
    icon: <BarChart3 className="h-6 w-6" />,
    color: "bg-pink-500",
  },
  {
    title: "Enterprise Security",
    description: "Military-grade encryption and SOC2 compliance to keep your data private and secure.",
    icon: <Shield className="h-6 w-6" />,
    color: "bg-cyan-500",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 bg-white dark:bg-zinc-950">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-bold tracking-tight text-text-primary dark:text-white mb-6"
          >
            Everything you need for <br /> modern data intelligence
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-text-secondary"
          >
            We've built a suite of tools that make data analysis as easy as having a conversation.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full group hover:shadow-elevated hover:-translate-y-2 transition-all duration-300 border-zinc-100 dark:border-zinc-800">
                <CardHeader>
                  <div className={cn(
                    "h-12 w-12 rounded-xl flex items-center justify-center mb-4 text-white shadow-lg transition-transform group-hover:scale-110 group-hover:rotate-3",
                    feature.color
                  )}>
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { cn } from "@/app/lib/utils";
