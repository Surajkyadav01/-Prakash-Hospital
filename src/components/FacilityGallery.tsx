import React, { useState } from 'react';
import { Maximize2, X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/hospitalData';
import { GalleryItem } from '../types';
import { ScrollReveal } from './ScrollReveal';
import { getAssetUrl } from '../utils/assetPath';

export const FacilityGallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'facilities' | 'wards' | 'tech_labs'>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'facilities', label: 'Facilities' },
    { id: 'wards', label: 'Wards & Rooms' },
    { id: 'tech_labs', label: 'Tech & Labs' },
  ];

  const filteredItems = GALLERY_ITEMS.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedImage) return;
    const currentIndex = filteredItems.findIndex(i => i.id === selectedImage.id);
    const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setSelectedImage(filteredItems[prevIndex]);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedImage) return;
    const currentIndex = filteredItems.findIndex(i => i.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % filteredItems.length;
    setSelectedImage(filteredItems[nextIndex]);
  };

  return (
    <section id="services" className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <ScrollReveal animation="fade-up" durationMs={500}>
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 border border-sky-100 text-sky-700 text-xs font-bold tracking-wide uppercase mb-3">
              Infrastructure & Equipment
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Hospital Photo Gallery & Facilities Tour
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
              Take a virtual tour of our NABH-accredited facility including modular operation theatres, intensive care suites, and advanced robotic diagnostic setups.
            </p>
          </div>
        </ScrollReveal>

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-center gap-2 mb-8 overflow-x-auto pb-2">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredItems.map((item, idx) => (
            <ScrollReveal
              key={item.id}
              animation="zoom-in"
              delayMs={(idx % 4) * 60}
              durationMs={450}
              className="h-full"
            >
              <div
                onClick={() => setSelectedImage(item)}
                id={`gallery-item-${item.id}`}
                className="group relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-200/60 shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer aspect-4/3 flex flex-col justify-end h-full"
              >
                {/* Image */}
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  loading={idx === 0 ? "eager" : "lazy"}
                  decoding="async"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.dataset.triedJpg && item.id === 'gal-0') {
                      target.dataset.triedJpg = 'true';
                      target.src = getAssetUrl('/assets/prakash-hospital-real.jpg');
                    } else if (!target.dataset.triedFallback && item.fallbackUrl) {
                      target.dataset.triedFallback = 'true';
                      target.src = item.fallbackUrl;
                    }
                  }}
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/30 to-transparent" />

                {/* Top Tag & Zoom icon */}
                <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-white/90 text-slate-800 backdrop-blur-xs shadow-xs">
                    {item.categoryLabel}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-slate-900/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Bottom Caption */}
                <div className="relative p-4 text-white">
                  <h3 className="font-bold text-sm sm:text-base leading-snug group-hover:text-sky-300 transition-colors line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-slate-300 mt-1 line-clamp-2 leading-relaxed font-normal">
                    {item.caption}
                  </p>
                  <div className="mt-2 flex items-center gap-1 text-[11px] font-semibold text-sky-400">
                    <Eye className="w-3.5 h-3.5" />
                    <span>Click to expand</span>
                  </div>
                </div>

              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="relative max-w-4xl w-full bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-slate-800 bg-slate-900/90 text-white">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-sky-600 text-white">
                  {selectedImage.categoryLabel}
                </span>
                <h3 className="font-bold text-sm sm:text-base truncate">
                  {selectedImage.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image with Navigation buttons */}
            <div className="relative aspect-16/10 sm:aspect-16/9 bg-black flex items-center justify-center overflow-hidden">
              <img
                src={selectedImage.imageUrl}
                alt={selectedImage.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
                decoding="async"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.dataset.triedJpg && selectedImage.id === 'gal-0') {
                    target.dataset.triedJpg = 'true';
                    target.src = getAssetUrl('/assets/prakash-hospital-real.jpg');
                  } else if (!target.dataset.triedFallback && selectedImage.fallbackUrl) {
                    target.dataset.triedFallback = 'true';
                    target.src = selectedImage.fallbackUrl;
                  }
                }}
              />

              {/* Prev / Next Controls */}
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-900/70 text-white hover:bg-slate-900 transition-colors"
                title="Previous photo"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-900/70 text-white hover:bg-slate-900 transition-colors"
                title="Next photo"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Footer Caption */}
            <div className="p-4 sm:p-5 bg-slate-900 text-white border-t border-slate-800">
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {selectedImage.caption}
              </p>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
