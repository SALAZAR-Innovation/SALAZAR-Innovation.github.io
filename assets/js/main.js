
        // Toggle Menu Mobile
        const toggleMenu = document.getElementById('toggleMenu');
        const navLinks = document.getElementById('navLinks');
        const scrollTopBtn = document.getElementById('scrollTopBtn');

        if (toggleMenu) {
            toggleMenu.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                const icon = toggleMenu.querySelector('i');
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            });
        }

        // Cerrar menu al hacer click en un link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                if (toggleMenu) {
                    const icon = toggleMenu.querySelector('i');
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            });
        });

        // Smooth scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });

        function updateScrollTopButton() {
            if (!scrollTopBtn) return;
            scrollTopBtn.classList.toggle('visible', window.scrollY > 300);
        }

        const safeVibeBadge = document.querySelector('.safe-vibe-badge');

        if (safeVibeBadge) {
            setTimeout(() => {
                safeVibeBadge.classList.add('is-hidden');
            }, 3500);
        }

        function updateFloatingSocialBar() {
            const floatingBar = document.querySelector('.floating-social-bar');
            const footer = document.querySelector('.footer');

            if (!floatingBar || !footer) return;

            const footerRect = footer.getBoundingClientRect();
            const shouldHide = footerRect.top <= window.innerHeight * 0.9;

            floatingBar.classList.toggle('is-hidden', shouldHide);
        }

        window.addEventListener('scroll', () => {
            updateScrollTopButton();
            updateFloatingSocialBar();
        });

        window.addEventListener('resize', updateFloatingSocialBar);

        if (scrollTopBtn) {
            scrollTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }

        updateScrollTopButton();
        updateFloatingSocialBar();

        // Animación al scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observar elementos de secciones
        document.querySelectorAll('.filosofia-card, .valor-card, .hacemos-card, .diferencia-card').forEach(el => {
            el.style.opacity = '0';
            observer.observe(el);
        });

        // Efecto parallax en blobs
        document.addEventListener('mousemove', (e) => {
            const blobs = document.querySelectorAll('.gradient-blob');
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            blobs.forEach((blob, index) => {
                const offset = (index + 1) * 20;
                blob.style.transform = `translate(${x * offset}px, ${y * offset}px)`;
            });
        });

        const servicesTrigger = document.getElementById('servicios-trigger');
        const servicesDetails = document.getElementById('services-details');
        const servicesMore = servicesTrigger ? servicesTrigger.querySelector('.rama-more') : null;
        const servicesCtaButton = document.querySelector('.btn-service-cta');
        const unlimitedTrigger = document.getElementById('unlimited-trigger');
        const unlimitedDetails = document.getElementById('unlimited-details');
        const unlimitedMore = unlimitedTrigger ? unlimitedTrigger.querySelector('.rama-more') : null;
        const unlimitedCtaButton = document.querySelector('.btn-unlimited-cta');
        const ramasContainer = document.querySelector('.ramas-container');
        const unlimitedItem = unlimitedTrigger ? unlimitedTrigger.closest('.rama-item') : null;
        const servicesItem = servicesTrigger ? servicesTrigger.closest('.rama-item') : null;

        function syncProductDetailsPlacement() {
            if (!ramasContainer || !servicesDetails || !unlimitedDetails) return;

            const isMobile = window.innerWidth <= 640;

            if (isMobile) {
                if (unlimitedItem && unlimitedDetails.parentElement !== unlimitedItem) {
                    unlimitedItem.appendChild(unlimitedDetails);
                }

                if (servicesItem && servicesDetails.parentElement !== servicesItem) {
                    servicesItem.appendChild(servicesDetails);
                }

                return;
            }

            if (unlimitedDetails.parentElement !== ramasContainer) {
                ramasContainer.appendChild(unlimitedDetails);
            }

            if (servicesDetails.parentElement !== ramasContainer) {
                ramasContainer.appendChild(servicesDetails);
            }
        }

        syncProductDetailsPlacement();
        window.addEventListener('resize', syncProductDetailsPlacement);

        function setDetailsState(trigger, details, more, isOpen) {
            if (!trigger || !details) return;

            trigger.classList.toggle('is-active', isOpen);
            trigger.setAttribute('aria-expanded', String(isOpen));
            details.classList.toggle('is-open', isOpen);
            details.setAttribute('aria-hidden', String(!isOpen));

            if (more) {
                more.setAttribute('aria-expanded', String(isOpen));
                more.textContent = isOpen ? 'Ver menos' : 'Ver más';
            }

            if (!isOpen && document.activeElement === more) {
                more.blur();
            }
        }

        function closeAllBranchDetails() {
            setDetailsState(servicesTrigger, servicesDetails, servicesMore, false);
            setDetailsState(unlimitedTrigger, unlimitedDetails, unlimitedMore, false);
        }

        function toggleBranchPanel(panel) {
            const isCurrentlyOpen = panel.details.classList.contains('is-open');
            closeAllBranchDetails();

            if (!isCurrentlyOpen) {
                setDetailsState(panel.trigger, panel.details, panel.more, true);
            }
        }

        function toggleServicesDetails() {
            if (!servicesTrigger || !servicesDetails) return;
            toggleBranchPanel({ trigger: servicesTrigger, details: servicesDetails, more: servicesMore });
        }

        function toggleUnlimitedDetails() {
            if (!unlimitedTrigger || !unlimitedDetails) return;
            toggleBranchPanel({ trigger: unlimitedTrigger, details: unlimitedDetails, more: unlimitedMore });
        }

        if (servicesTrigger) {
            servicesTrigger.addEventListener('click', toggleServicesDetails);
            servicesTrigger.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    toggleServicesDetails();
                }
            });
        }

        if (unlimitedTrigger) {
            unlimitedTrigger.addEventListener('click', toggleUnlimitedDetails);
            unlimitedTrigger.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    toggleUnlimitedDetails();
                }
            });
        }

        if (servicesCtaButton) {
            servicesCtaButton.addEventListener('click', () => {
                const productsSection = document.getElementById('productos');

                if (productsSection) {
                    productsSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }

                setTimeout(() => {
                    if (servicesTrigger && !servicesTrigger.classList.contains('is-active')) {
                        toggleServicesDetails();
                    }

                    if (servicesTrigger) {
                        servicesTrigger.scrollIntoView({
                            behavior: 'smooth',
                            block: 'center'
                        });
                    }
                }, 250);
            });
        }

        if (unlimitedCtaButton) {
            unlimitedCtaButton.addEventListener('click', () => {
                const productsSection = document.getElementById('productos');

                if (productsSection) {
                    productsSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }

                setTimeout(() => {
                    if (unlimitedTrigger && !unlimitedTrigger.classList.contains('is-active')) {
                        toggleUnlimitedDetails();
                    }

                    if (unlimitedTrigger) {
                        unlimitedTrigger.scrollIntoView({
                            behavior: 'smooth',
                            block: 'center'
                        });
                    }
                }, 250);
            });
        }

        if (servicesDetails) {
            servicesDetails.querySelectorAll('.service-more').forEach(button => {
                button.addEventListener('click', (event) => {
                    event.stopPropagation();
                });
            });
        }

        if (unlimitedDetails) {
            unlimitedDetails.querySelectorAll('.service-more').forEach(button => {
                button.addEventListener('click', (event) => {
                    event.stopPropagation();
                });
            });
        }

        console.log('SALAZAR Innovation - Innovamos sin permiso. Creamos sin límites.');
    