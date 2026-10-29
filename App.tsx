/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header.tsx';
import { Hero } from './components/Hero.tsx';
import { OccasionFilters } from './components/OccasionFilters.tsx';
import { Catalogue } from './components/Catalogue.tsx';
import { CustomBuilder } from './components/CustomBuilder.tsx';
import { WhyChenille } from './components/WhyChenille.tsx';
import { HowToOrder } from './components/HowToOrder.tsx';
import { MakerStory } from './components/MakerStory.tsx';
import { FaqSection } from './components/FaqSection.tsx';
import { WhatsappConciergeBanner } from './components/WhatsappConciergeBanner.tsx';
import { QuickViewModal } from './components/QuickViewModal.tsx';
import { CartDrawer } from './components/CartDrawer.tsx';
import { CheckoutModal } from './components/CheckoutModal.tsx';
import { Footer } from './components/Footer.tsx';
import { PRODUCTS, POPULAR_CITIES } from './data/products.ts';
import { Product, CartItem, CustomBouquetConfig, Currency } from './types.ts';

export default function App() {
  const [products] = useState<Product[]>(PRODUCTS);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [currency, setCurrency] = useState<Currency>('LKR');

  // Initial cart with sample products matching the prototype badge "2"
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: PRODUCTS[0].id,
      name: PRODUCTS[0].name,
      priceLKR: PRODUCTS[0].priceLKR,
      quantity: 1,
      imageUrl: PRODUCTS[0].imageUrl,
    },
    {
      id: PRODUCTS[4].id,
      name: PRODUCTS[4].name,
      priceLKR: PRODUCTS[4].priceLKR,
      quantity: 1,
      imageUrl: PRODUCTS[4].imageUrl,
    },
  ]);

  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedCheckoutCity, setSelectedCheckoutCity] = useState(POPULAR_CITIES[0]);

  // Total quantity for header cart badge
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Cart actions
  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          priceLKR: product.priceLKR,
          quantity: 1,
          imageUrl: product.imageUrl,
        },
      ];
    });
    setIsCartOpen(true);
  };

  const handleAddCustomToCart = (config: CustomBouquetConfig) => {
    const customId = `custom-${Date.now()}`;
    const customItem: CartItem = {
      id: customId,
      name: `Custom Bouquet (${config.sizeName})`,
      priceLKR: config.sizePrice,
      quantity: 1,
      imageUrl: PRODUCTS[0].imageUrl,
      isCustom: true,
      customDetails: {
        size: config.sizeName,
        stems: config.stemsNote,
        flowers: config.flowers,
        palette: config.palette,
        wrapping: config.wrapping,
        recipientName: config.recipientName,
        cardMessage: config.personalMessage,
        deliveryCity: config.deliveryCity,
      },
    };
    setCart((prev) => [...prev, customItem]);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleSelectOccasion = (category: string) => {
    setActiveCategory(category);
    const catEl = document.getElementById('catalogue');
    if (catEl) {
      catEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToCatalogue = () => {
    const el = document.getElementById('catalogue');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToBuilder = () => {
    const el = document.getElementById('custom-builder');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleProceedCheckout = (city: typeof POPULAR_CITIES[0]) => {
    setSelectedCheckoutCity(city);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="min-h-screen bg-surface font-body-md text-on-surface antialiased flex flex-col selection:bg-secondary-fixed selection:text-on-secondary-fixed">
      {/* Top Navigation */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenBuilder={scrollToBuilder}
        currency={currency}
        onSelectCurrency={setCurrency}
      />

      {/* Main Content Area */}
      <main className="w-full pt-20 bg-surface flex-1">
        {/* Hero Section */}
        <Hero
          onExploreClick={scrollToCatalogue}
          onCustomizeClick={scrollToBuilder}
          onQuickView={(p) => setQuickViewProduct(p)}
          featuredProduct={products[0]}
          secondaryProduct={products[3]}
          currency={currency}
        />

        {/* Occasions Filter Bar */}
        <OccasionFilters
          activeCategory={activeCategory}
          onSelectOccasion={handleSelectOccasion}
        />

        {/* Catalogue Grid */}
        <Catalogue
          products={products}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          onQuickView={(p) => setQuickViewProduct(p)}
          onAddToCart={handleAddToCart}
          currency={currency}
        />

        {/* Custom Bouquet Interactive Studio */}
        <CustomBuilder
          onAddCustomToCart={handleAddCustomToCart}
          currency={currency}
        />

        {/* Why Chenille Flowers */}
        <WhyChenille />

        {/* How To Order & Delivery */}
        <HowToOrder />

        {/* Maker's Story: Surani */}
        <MakerStory />

        {/* FAQ & Care Guide */}
        <FaqSection />

        {/* WhatsApp Concierge Banner */}
        <WhatsappConciergeBanner onOpenBuilder={scrollToBuilder} />
      </main>

      {/* Floating WhatsApp Action Button */}
      <aside className="fixed bottom-6 right-6 z-40 group flex items-center gap-2">
        <div className="hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-inverse-surface text-inverse-on-surface font-label-sm text-label-sm px-3 py-1.5 rounded-full shadow-lg whitespace-nowrap">
          Order Bespoke Stems on WhatsApp
        </div>
        <a
          href="https://wa.me/94770000000?text=Hi%20Surani,%20I%20would%20like%20to%20order%20a%20handcrafted%20chenille%20bouquet"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp with Surani Blooms"
          className="flex items-center justify-center w-14 h-14 rounded-full bg-primary-container text-on-primary shadow-[0_12px_32px_rgba(190,18,60,0.35)] hover:scale-110 active:scale-95 transition-transform duration-200 ring-4 ring-white/60 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[30px]">chat</span>
        </a>
      </aside>

      {/* Modals & Slide-overs */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        currency={currency}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onProceedCheckout={handleProceedCheckout}
        currency={currency}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        deliveryCity={selectedCheckoutCity}
        onOrderSuccess={() => {
          handleClearCart();
        }}
        currency={currency}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
