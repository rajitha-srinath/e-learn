"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Award, BookOpen } from "lucide-react";
import Image from "next/image";

export function HeroSection() {
  return (
    <div className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight sm:text-5xl md:text-6xl">
              Transform Your Learning{" "}
              <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                Journey
              </span>
            </h1>
            <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
              Join E-Learn for Enhance Your Skills. Learn from best tutors and make your dream come true
            </p>
            <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="text-lg px-8">
                  <Link href="/courses" className="flex items-center">
                    Explore Courses
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="mt-12 grid grid-cols-3 gap-6 text-center">
                <div>
                  <div className="flex items-center justify-center">
                    <Users className="h-6 w-6 text-blue-600 mr-2" />
                    <span className="text-2xl font-bold text-gray-900">
                      50K+
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">Students</p>
                </div>
                <div>
                  <div className="flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-emerald-600 mr-2" />
                    <span className="text-2xl font-bold text-gray-900">
                      200+
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">Courses</p>
                </div>
                <div>
                  <div className="flex items-center justify-center">
                    <Award className="h-6 w-6 text-orange-600 mr-2" />
                    <span className="text-2xl font-bold text-gray-900">
                      95%
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">Success Rate</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
            <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
              <div className="relative block w-full bg-white rounded-lg overflow-hidden">
                <Image
                  className="w-full h-64 object-cover"
                  src="https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Students learning online"
                  width={400}
                  height={225}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
