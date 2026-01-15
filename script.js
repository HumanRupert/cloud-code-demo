/**
 * Semantic Marketing Website
 * Advanced animations, smooth transitions, and interactive elements
 */

(function() {
    'use strict';

    // ============================================
    // Utility Functions
    // ============================================

    const debounce = (fn, delay) => {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => fn(...args), delay);
        };
    };

    const lerp = (start, end, factor) => start + (end - start) * factor;

    // ============================================
    // Scroll-triggered Animations
    // ============================================

    class ScrollAnimator {
        constructor() {
            this.elements = document.querySelectorAll('.animate-on-scroll');
            this.observer = null;
            this.init();
        }

        init() {
            if ('IntersectionObserver' in window) {
                this.observer = new IntersectionObserver(
                    this.handleIntersection.bind(this),
                    {
                        root: null,
                        rootMargin: '-10% 0px -10% 0px',
                        threshold: 0.1
                    }
                );

                this.elements.forEach(el => this.observer.observe(el));
            } else {
                // Fallback for older browsers
                this.elements.forEach(el => el.classList.add('visible'));
            }
        }

        handleIntersection(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Optional: unobserve after animation
                    // this.observer.unobserve(entry.target);
                }
            });
        }
    }

    // ============================================
    // Architecture Diagram Line Animation
    // ============================================

    class ArchitectureAnimator {
        constructor() {
            this.diagram = document.querySelector('.arch-diagram');
            this.lines = document.querySelectorAll('.connection-line');
            this.observer = null;
            this.hasAnimated = false;
            this.init();
        }

        init() {
            if (!this.diagram || !this.lines.length) return;

            if ('IntersectionObserver' in window) {
                this.observer = new IntersectionObserver(
                    this.handleIntersection.bind(this),
                    {
                        root: null,
                        rootMargin: '0px',
                        threshold: 0.3
                    }
                );

                this.observer.observe(this.diagram);
            }
        }

        handleIntersection(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.hasAnimated) {
                    this.hasAnimated = true;
                    this.animateLines();
                }
            });
        }

        animateLines() {
            this.lines.forEach((line, index) => {
                setTimeout(() => {
                    line.classList.add('animate');
                }, index * 100);
            });
        }
    }

    // ============================================
    // Tab System
    // ============================================

    class TabSystem {
        constructor() {
            this.container = document.querySelector('.features-tabs');
            this.buttons = document.querySelectorAll('.tab-btn');
            this.contents = document.querySelectorAll('.tab-content');
            this.indicator = document.querySelector('.tab-indicator');
            this.currentTab = 'ecommerce';
            this.init();
        }

        init() {
            if (!this.container || !this.buttons.length) return;

            this.buttons.forEach(btn => {
                btn.addEventListener('click', () => this.switchTab(btn.dataset.tab));
            });

            // Initialize indicator position
            this.updateIndicator();

            // Handle window resize
            window.addEventListener('resize', debounce(() => this.updateIndicator(), 100));
        }

        switchTab(tabId) {
            if (tabId === this.currentTab) return;

            const currentContent = document.querySelector(`.tab-content[data-tab="${this.currentTab}"]`);
            const newContent = document.querySelector(`.tab-content[data-tab="${tabId}"]`);

            // Update buttons
            this.buttons.forEach(btn => {
                btn.classList.toggle('active', btn.dataset.tab === tabId);
            });

            // Animate out current content
            if (currentContent) {
                currentContent.classList.remove('active');
                currentContent.classList.add('exiting');

                setTimeout(() => {
                    currentContent.classList.remove('exiting');
                }, 300);
            }

            // Animate in new content
            if (newContent) {
                setTimeout(() => {
                    newContent.classList.add('active');
                }, 150);
            }

            this.currentTab = tabId;
            this.updateIndicator();
        }

        updateIndicator() {
            if (!this.indicator) return;

            const activeBtn = document.querySelector('.tab-btn.active');
            if (!activeBtn) return;

            // Check if we're in mobile view (stacked buttons)
            const isMobile = window.innerWidth <= 768;

            if (isMobile) {
                this.indicator.style.display = 'none';
            } else {
                this.indicator.style.display = 'block';
                const btnRect = activeBtn.getBoundingClientRect();
                const containerRect = this.container.querySelector('.tab-buttons').getBoundingClientRect();

                this.indicator.style.width = `${btnRect.width}px`;
                this.indicator.style.transform = `translateX(${btnRect.left - containerRect.left - 4}px)`;
            }
        }
    }

    // ============================================
    // Navbar Scroll Effect
    // ============================================

    class NavbarScroll {
        constructor() {
            this.navbar = document.querySelector('.navbar');
            this.lastScroll = 0;
            this.init();
        }

        init() {
            if (!this.navbar) return;

            window.addEventListener('scroll', () => this.handleScroll(), { passive: true });
        }

        handleScroll() {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 100) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }

            this.lastScroll = currentScroll;
        }
    }

    // ============================================
    // Smooth Anchor Scrolling
    // ============================================

    class SmoothScroll {
        constructor() {
            this.init();
        }

        init() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', (e) => {
                    const targetId = anchor.getAttribute('href');
                    if (targetId === '#') return;

                    const target = document.querySelector(targetId);
                    if (target) {
                        e.preventDefault();
                        const navHeight = document.querySelector('.navbar')?.offsetHeight || 0;
                        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;

                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                });
            });
        }
    }

    // ============================================
    // Logo Carousel Enhancement
    // ============================================

    class LogoCarousel {
        constructor() {
            this.track = document.querySelector('.logo-track');
            this.init();
        }

        init() {
            if (!this.track) return;

            // Pause animation on hover
            const wrapper = document.querySelector('.logo-carousel-wrapper');
            if (wrapper) {
                wrapper.addEventListener('mouseenter', () => {
                    this.track.style.animationPlayState = 'paused';
                });
                wrapper.addEventListener('mouseleave', () => {
                    this.track.style.animationPlayState = 'running';
                });
            }
        }
    }

    // ============================================
    // Agent Pill Hover Effects
    // ============================================

    class AgentPillEffects {
        constructor() {
            this.pills = document.querySelectorAll('.agent-pill');
            this.init();
        }

        init() {
            if (!this.pills.length) return;

            this.pills.forEach(pill => {
                pill.addEventListener('mouseenter', () => this.handleHover(pill, true));
                pill.addEventListener('mouseleave', () => this.handleHover(pill, false));
            });
        }

        handleHover(pill, isHovered) {
            // Could add particle effects or more complex animations here
            if (isHovered) {
                pill.style.transform = 'translateX(8px) scale(1.02)';
            } else {
                pill.style.transform = '';
            }
        }
    }

    // ============================================
    // Rail Hex Grid Animation
    // ============================================

    class RailHexAnimation {
        constructor() {
            this.hexes = document.querySelectorAll('.rail-hex');
            this.init();
        }

        init() {
            if (!this.hexes.length) return;

            this.hexes.forEach((hex, index) => {
                hex.addEventListener('mouseenter', () => {
                    // Subtle scale effect
                    hex.style.transform = 'translateY(-4px) scale(1.1)';
                    hex.style.zIndex = '10';
                });

                hex.addEventListener('mouseleave', () => {
                    hex.style.transform = '';
                    hex.style.zIndex = '';
                });
            });
        }
    }

    // ============================================
    // Semantic Hub Interaction
    // ============================================

    class SemanticHubEffect {
        constructor() {
            this.hub = document.querySelector('.semantic-hub');
            this.glow = document.querySelector('.hub-glow');
            this.init();
        }

        init() {
            if (!this.hub || !this.glow) return;

            this.hub.addEventListener('mouseenter', () => {
                this.glow.style.transform = 'scale(1.2)';
                this.glow.style.opacity = '0.3';
            });

            this.hub.addEventListener('mouseleave', () => {
                this.glow.style.transform = '';
                this.glow.style.opacity = '';
            });
        }
    }

    // ============================================
    // Button Ripple Effect
    // ============================================

    class ButtonRipple {
        constructor() {
            this.buttons = document.querySelectorAll('.btn-primary');
            this.init();
        }

        init() {
            this.buttons.forEach(btn => {
                btn.addEventListener('click', (e) => this.createRipple(e, btn));
            });
        }

        createRipple(event, button) {
            const circle = document.createElement('span');
            const diameter = Math.max(button.clientWidth, button.clientHeight);
            const radius = diameter / 2;

            const rect = button.getBoundingClientRect();

            circle.style.width = circle.style.height = `${diameter}px`;
            circle.style.left = `${event.clientX - rect.left - radius}px`;
            circle.style.top = `${event.clientY - rect.top - radius}px`;
            circle.style.position = 'absolute';
            circle.style.borderRadius = '50%';
            circle.style.background = 'rgba(255, 255, 255, 0.3)';
            circle.style.transform = 'scale(0)';
            circle.style.animation = 'ripple 0.6s ease-out';
            circle.style.pointerEvents = 'none';

            // Add ripple animation keyframes if not exists
            if (!document.querySelector('#ripple-styles')) {
                const style = document.createElement('style');
                style.id = 'ripple-styles';
                style.textContent = `
                    @keyframes ripple {
                        to {
                            transform: scale(4);
                            opacity: 0;
                        }
                    }
                `;
                document.head.appendChild(style);
            }

            button.appendChild(circle);

            setTimeout(() => circle.remove(), 600);
        }
    }

    // ============================================
    // Performance: Lazy Load Images
    // ============================================

    class LazyImageLoader {
        constructor() {
            this.images = document.querySelectorAll('img[loading="lazy"]');
            this.init();
        }

        init() {
            if ('loading' in HTMLImageElement.prototype) {
                // Browser supports native lazy loading
                return;
            }

            // Fallback for older browsers
            if ('IntersectionObserver' in window) {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const img = entry.target;
                            img.src = img.dataset.src || img.src;
                            observer.unobserve(img);
                        }
                    });
                });

                this.images.forEach(img => observer.observe(img));
            }
        }
    }

    // ============================================
    // Prefers Reduced Motion
    // ============================================

    class ReducedMotion {
        constructor() {
            this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
            this.init();
        }

        init() {
            if (this.prefersReducedMotion.matches) {
                document.documentElement.style.setProperty('--transition-fast', '0ms');
                document.documentElement.style.setProperty('--transition-base', '0ms');
                document.documentElement.style.setProperty('--transition-slow', '0ms');
                document.documentElement.style.setProperty('--transition-slower', '0ms');

                // Stop carousel animation
                const track = document.querySelector('.logo-track');
                if (track) {
                    track.style.animation = 'none';
                }

                // Show all animated elements immediately
                document.querySelectorAll('.animate-on-scroll').forEach(el => {
                    el.classList.add('visible');
                });
            }
        }
    }

    // ============================================
    // Vision Card Hover Effect
    // ============================================

    class VisionCardEffect {
        constructor() {
            this.cards = document.querySelectorAll('.vision-card');
            this.init();
        }

        init() {
            this.cards.forEach(card => {
                card.addEventListener('mousemove', (e) => this.handleMouseMove(e, card));
                card.addEventListener('mouseleave', (e) => this.handleMouseLeave(e, card));
            });
        }

        handleMouseMove(e, card) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        }

        handleMouseLeave(e, card) {
            card.style.transform = '';
        }
    }

    // ============================================
    // Initialize All Components
    // ============================================

    function init() {
        // Check for reduced motion preference first
        new ReducedMotion();

        // Initialize all components
        new ScrollAnimator();
        new ArchitectureAnimator();
        new TabSystem();
        new NavbarScroll();
        new SmoothScroll();
        new LogoCarousel();
        new AgentPillEffects();
        new RailHexAnimation();
        new SemanticHubEffect();
        new ButtonRipple();
        new LazyImageLoader();
        new VisionCardEffect();

        // Add loaded class to body for initial animations
        document.body.classList.add('loaded');
    }

    // Run initialization when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Optional: Re-initialize on dynamic content changes
    window.SemanticUI = {
        reinit: init,
        ScrollAnimator,
        TabSystem,
        ArchitectureAnimator
    };

})();
