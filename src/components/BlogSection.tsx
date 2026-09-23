import React, { useState } from 'react';
import { BookOpen, Calendar, Clock, User, ArrowRight, ArrowLeft, CheckCircle2, Stethoscope, Share2 } from 'lucide-react';
import { BLOG_POSTS } from '../data/hospitalData';
import { BlogPost } from '../types';

interface BlogSectionProps {
  isStandalonePage?: boolean;
  onOpenBooking?: () => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({
  isStandalonePage = false,
  onOpenBooking,
}) => {
  const [selectedArticle, setSelectedArticle] = useState<BlogPost | null>(null);

  return (
    <section id="blog" className={`py-10 sm:py-16 ${isStandalonePage ? 'bg-slate-50 min-h-screen' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* If viewing a full article */}
        {selectedArticle ? (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-md max-w-4xl mx-auto animate-in fade-in duration-200 space-y-6">
            
            {/* Back button */}
            <button
              type="button"
              onClick={() => setSelectedArticle(null)}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 font-bold text-xs transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>← Back to All Articles</span>
            </button>

            <div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-100 text-sky-800 uppercase tracking-wider">
                {selectedArticle.category}
              </span>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mt-3 leading-tight">
                {selectedArticle.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-3 pb-4 border-b border-slate-100">
                <span className="flex items-center gap-1.5">
                  <User className="w-4 h-4 text-sky-600" />
                  <strong>{selectedArticle.author}</strong> ({selectedArticle.authorRole})
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  {selectedArticle.date}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-slate-400" />
                  {selectedArticle.readTime}
                </span>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden aspect-16/9 bg-slate-100 shadow-xs">
              <img
                src={selectedArticle.imageUrl}
                alt={selectedArticle.title}
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="text-sm sm:text-base text-slate-700 space-y-4 leading-relaxed font-normal">
              <p className="font-semibold text-slate-900 text-base sm:text-lg">
                {selectedArticle.summary}
              </p>
              
              <p>
                In clinical practice, early presentation and proper diagnostic evaluation remain the cornerstone of effective disease management. At Prakash Hospital, Suriyawan, Bhadohi, our multi-disciplinary medical team integrates advanced laboratory biomarkers with digital imaging protocols to establish definitive diagnoses swiftly.
              </p>

              <h3 className="font-bold text-lg text-slate-900 pt-2">
                Understanding Risk Factors & Golden Hour Interventions
              </h3>

              <p>
                Whether managing sudden onset cardiac chest pains, neurological deficits such as slurred speech or facial droop, or acute abdominal distress, timely medical attention inside the first hour is critical to prevent irreversible organ damage. Our 24x7 emergency department is equipped with a digital cardiac catheterization lab and multi-slice CT scanning directly adjacent to resuscitation bays.
              </p>

              <div className="p-4 rounded-2xl bg-sky-50 border border-sky-100 text-sky-900 text-xs sm:text-sm font-medium">
                <strong>Medical Disclaimer:</strong> This article is published for educational awareness and does not replace personalized medical advice, diagnosis, or clinical treatment from an authorized physician. Always consult our attending doctor for health evaluations.
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => setSelectedArticle(null)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-bold transition-colors cursor-pointer"
              >
                ← Back to All Articles
              </button>

              {onOpenBooking && (
                <button
                  type="button"
                  onClick={onOpenBooking}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Stethoscope className="w-4 h-4" />
                  <span>Book Consultation with {selectedArticle.author}</span>
                </button>
              )}
            </div>

          </div>
        ) : (
          /* Main Articles Grid */
          <>
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 border border-sky-100 text-sky-700 text-xs font-bold tracking-wide uppercase mb-2">
                  <BookOpen className="w-3.5 h-3.5 text-sky-600" />
                  <span>Health Awareness & Doctor Insights</span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                  Hospital Blog & Preventive Medicine Advice
                </h2>
                <p className="mt-2 text-slate-600 text-sm sm:text-base max-w-2xl">
                  Medically verified clinical articles, golden hour awareness, and preventive wellness advice written by senior consultants at Prakash Hospital.
                </p>
              </div>
            </div>

            {/* Blog Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {BLOG_POSTS.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-lg transition-all duration-200 overflow-hidden flex flex-col justify-between group"
                >
                  <div>
                    {/* Post Image */}
                    <div className="relative aspect-16/10 overflow-hidden bg-slate-100">
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-sky-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                        {post.category}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 sm:p-6">
                      <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          {post.date}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          {post.readTime}
                        </span>
                      </div>

                      <h3 className="font-bold text-base sm:text-lg text-slate-900 group-hover:text-sky-600 transition-colors line-clamp-2">
                        {post.title}
                      </h3>

                      <p className="mt-2 text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                        {post.summary}
                      </p>
                    </div>
                  </div>

                  {/* Author Footer */}
                  <div className="px-5 sm:px-6 py-4 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-xs">
                        <User className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-800">{post.author}</div>
                        <div className="text-[10px] text-slate-500">{post.authorRole}</div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedArticle(post)}
                      className="px-3 py-1.5 rounded-lg text-sky-600 hover:text-sky-700 hover:bg-sky-50 transition-colors text-xs font-bold inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>Read Article</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </article>
              ))}
            </div>
          </>
        )}

      </div>
    </section>
  );
};
