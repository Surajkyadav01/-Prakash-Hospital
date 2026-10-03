import React, { useRef, useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Sparkles, 
  ZoomIn,
  Calendar,
  Eye
} from 'lucide-react';
import { HOSPITAL_CATALOGUE_ITEMS } from '../data/catalogueData';
import { CatalogueItem, Doctor } from '../types';
import { DOCTORS } from '../data/hospitalData';
import { ScrollReveal } from './ScrollReveal';

interface HospitalCatalogueSectionProps {
  onBookDoctor?: (doctor: Doctor) => void;
  onOpenBooking?: () => void;
}

// Single Pure Catalogue Banner Card (Displays only the authentic uploaded banner image)
const CatalogueBannerCard: React.FC<{
  item: CatalogueItem;
  onClick: () => void;
}> = ({ item, onClick }) => {
  const [imgSrc, setImgSrc] = useState(item.imageUrl);

  const handleImageError = () => {
    // If local asset failed for any reason, fallback to raw GitHub URL
    if (item.githubUrl && imgSrc !== item.githubUrl) {
      setImgSrc(item.githubUrl);
    }
  };

  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label={`View full catalogue banner for ${item.doctorName}`}
      className="w-[220px] sm:w-[245px] md:w-[265px] shrink-0 snap-start aspect-[383/570] rounded-2xl overflow-hidden border border-slate-200/90 shadow-md hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] cursor-pointer relative group bg-slate-100 select-none"
    >
      {/* Exact Uploaded Catalogue Banner PNG */}
      <img
        src={imgSrc}
        alt={`${item.doctorName} Catalogue Banner`}
        loading="lazy"
        onError={handleImageError}
        className="w-full h-full object-cover object-top rounded-2xl select-none"
      />

      {/* Sleek Hover Hint Overlay */}
      <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20 flex flex-col items-center justify-center gap-2 text-white p-4 backdrop-blur-[1.5px] rounded-2xl">
        <div className="w-11 h-11 rounded-full bg-sky-600/90 text-white flex items-center justify-center shadow-lg transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-200">
          <ZoomIn className="w-5 h-5" />
        </div>
        <span className="text-xs font-bold tracking-wide text-white drop-shadow">
          Full Banner देखें
        </span>
      </div>

      {/* Minimal Top-Right Tag */}
      <div className="absolute top-2.5 right-2.5 z-20 pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity">
        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-white bg-slate-950/70 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/20 shadow-xs">
          <Eye className="w-2.5 h-2.5 text-sky-300" />
          <span>Catalogue</span>
        </span>
      </div>
    </div>
  );
};

export const HospitalCatalogueSection: React.FC<HospitalCatalogueSectionProps> = ({
  onBookDoctor,
  onOpenBooking,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedCatalogue, setSelectedCatalogue] = useState<CatalogueItem | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  // Check scroll positions
  const checkScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

    const itemWidth = 260; // card width + gap
    const index = Math.round(scrollLeft / itemWidth);
    setActiveIndex(Math.min(Math.max(index, 0), HOSPITAL_CATALOGUE_ITEMS.length - 1));
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll, { passive: true });
      checkScroll();
      window.addEventListener('resize', checkScroll);
    }
    return () => {
      if (el) el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  // Keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedCatalogue) return;
      if (e.key === 'Escape') {
        setSelectedCatalogue(null);
      } else if (e.key === 'ArrowLeft') {
        navigateModal(-1);
      } else if (e.key === 'ArrowRight') {
        navigateModal(1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedCatalogue]);

  // Prevent background scroll when modal open
  useEffect(() => {
    if (selectedCatalogue) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedCatalogue]);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const cardWidth = container.firstElementChild 
      ? (container.firstElementChild as HTMLElement).offsetWidth + 20 
      : 265;
    const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  const scrollToIndex = (index: number) => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const items = container.children;
    if (items[index]) {
      (items[index] as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  };

  // Mouse drag implementation
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeftState(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollContainerRef.current.scrollLeft = scrollLeftState - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  // Modal navigation
  const navigateModal = (direction: number) => {
    if (!selectedCatalogue) return;
    const currentIndex = HOSPITAL_CATALOGUE_ITEMS.findIndex(item => item.id === selectedCatalogue.id);
    const newIndex = (currentIndex + direction + HOSPITAL_CATALOGUE_ITEMS.length) % HOSPITAL_CATALOGUE_ITEMS.length;
    setSelectedCatalogue(HOSPITAL_CATALOGUE_ITEMS[newIndex]);
  };

  const handleBookFromCatalogue = (item: CatalogueItem) => {
    setSelectedCatalogue(null);
    if (item.doctorId && onBookDoctor) {
      const doc = DOCTORS.find(d => d.id === item.doctorId);
      if (doc) {
        onBookDoctor(doc);
        return;
      }
    }
    if (onOpenBooking) {
      onOpenBooking();
    }
  };

  return (
    <section 
      id="hospital-catalogue-section" 
      className="py-14 md:py-18 bg-gradient-to-b from-slate-50 via-sky-50/20 to-white border-y border-slate-200/80 relative overflow-hidden"
    >
      {/* Decorative subtle glows */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-sky-100/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-emerald-100/25 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header: Centered & Clean (No controls here, as requested) */}
        <ScrollReveal animation="fade-up" durationMs={500}>
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-100/70 px-3.5 py-1 rounded-full mb-3 border border-sky-200/80">
              <Sparkles className="w-3.5 h-3.5 text-sky-600" />
              <span>हॉस्पिटल कैटलॉग</span>
              <span className="text-slate-300">|</span>
              <span className="text-slate-600 font-semibold">Doctor Catalogue</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              Hospital Catalogue &amp; Specialities
            </h2>
            <p className="text-base sm:text-lg font-semibold text-sky-800 mt-1">
              हॉस्पिटल कैटलॉग एंड स्पेशलिस्ट
            </p>
            
            <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
              Explore our specialized medical wings, treatments, and expert care services.
            </p>
          </div>
        </ScrollReveal>

        {/* Carousel / Slider Container with Vertically Centered Controls */}
        <div className="relative group/slider px-0 sm:px-4">
          
          {/* Middle Left Slide Arrow Control (Vertically Centered in Middle) */}
          <button
            type="button"
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            aria-label="Previous Catalogue Slide"
            className={`absolute -left-2 sm:-left-3 md:-left-5 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white hover:bg-sky-600 text-slate-800 hover:text-white shadow-xl border border-slate-200/90 flex items-center justify-center transition-all cursor-pointer disabled:opacity-0 disabled:pointer-events-none active:scale-95`}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Middle Right Slide Arrow Control (Vertically Centered in Middle) */}
          <button
            type="button"
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            aria-label="Next Catalogue Slide"
            className={`absolute -right-2 sm:-right-3 md:-right-5 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white hover:bg-sky-600 text-slate-800 hover:text-white shadow-xl border border-slate-200/90 flex items-center justify-center transition-all cursor-pointer disabled:opacity-0 disabled:pointer-events-none active:scale-95`}
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Cards Track (Horizontal Scroll) */}
          <div
            ref={scrollContainerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            className={`flex gap-4 sm:gap-5 overflow-x-auto py-3 px-2 sm:px-1 scrollbar-none snap-x snap-mandatory ${
              isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'
            }`}
            style={{ scrollBehavior: isDragging ? 'auto' : 'smooth' }}
          >
            {HOSPITAL_CATALOGUE_ITEMS.map((item) => (
              <CatalogueBannerCard
                key={item.id}
                item={item}
                onClick={() => setSelectedCatalogue(item)}
              />
            ))}
          </div>

        </div>

        {/* Centered Pagination Indicator Dots */}
        <div className="mt-6 flex items-center justify-center gap-1.5">
          {HOSPITAL_CATALOGUE_ITEMS.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => scrollToIndex(i)}
              aria-label={`Jump to slide ${i + 1}`}
              className={`transition-all duration-200 rounded-full cursor-pointer ${
                activeIndex === i
                  ? 'w-7 h-2 bg-sky-600'
                  : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>

      </div>

      {/* =========================================================================
          FULL-SCREEN HIGH-RESOLUTION CATALOGUE MODAL / LIGHTBOX
          ========================================================================= */}
      {selectedCatalogue && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 md:p-6 animate-in fade-in duration-200"
          onClick={() => setSelectedCatalogue(null)}
        >
          <div 
            className="relative w-full max-w-2xl max-h-[92vh] bg-slate-900 rounded-2xl shadow-2xl border border-slate-700/80 overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-3 sm:p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-3 text-white">
              <div className="min-w-0">
                <h3 className="font-extrabold text-base sm:text-lg text-white truncate">
                  {selectedCatalogue.doctorName}
                </h3>
                <p className="text-xs text-sky-300 font-semibold truncate">
                  {selectedCatalogue.hindiName} • {selectedCatalogue.specialty}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedCatalogue(null)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                aria-label="Close Catalogue Modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: Exact Full Uncropped Banner View */}
            <div className="relative flex-1 bg-black/95 flex items-center justify-center overflow-auto p-3 sm:p-5 min-h-[380px] max-h-[72vh]">
              {/* Previous Button */}
              <button
                type="button"
                onClick={() => navigateModal(-1)}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-slate-900/80 hover:bg-sky-600 text-white border border-slate-700 shadow-xl transition-all cursor-pointer"
                aria-label="Previous Doctor Banner"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Next Button */}
              <button
                type="button"
                onClick={() => navigateModal(1)}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-slate-900/80 hover:bg-sky-600 text-white border border-slate-700 shadow-xl transition-all cursor-pointer"
                aria-label="Next Doctor Banner"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Pure High-Resolution Banner Image */}
              <img
                src={selectedCatalogue.imageUrl}
                alt={`${selectedCatalogue.doctorName} Full Banner`}
                className="max-h-[70vh] w-auto max-w-full object-contain rounded-xl shadow-2xl select-none"
                onError={(e) => {
                  if (selectedCatalogue.githubUrl && e.currentTarget.src !== selectedCatalogue.githubUrl) {
                    e.currentTarget.src = selectedCatalogue.githubUrl;
                  }
                }}
              />
            </div>

            {/* Modal Footer: Consultation Booking */}
            <div className="p-3 sm:p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-3">
              <div className="text-xs text-slate-300 truncate">
                <span className="text-amber-400 font-bold">OPD: </span>
                <span>{selectedCatalogue.timing}</span>
              </div>

              <button
                type="button"
                onClick={() => handleBookFromCatalogue(selectedCatalogue)}
                className="py-2 px-4 rounded-xl bg-sky-600 hover:bg-sky-700 active:scale-95 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-md hover:shadow-lg cursor-pointer shrink-0"
              >
                <Calendar className="w-4 h-4" />
                <span>Book OPD Consultation</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
